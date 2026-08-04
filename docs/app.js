/* CALAMITIES — Enchantment Scout · app (edit locations in data.js) */
(function () {
  "use strict";

  const state = { region: "av", area: null, scene: "all", q: "", list: [], idx: 0, slides: [], slide: 0, current: null };
  let map, baseGroup, townGroup, optGroup;
  const pinByName = {};

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const elc = (t, c, h) => { const e = document.createElement(t); if (c) e.className = c; if (h != null) e.innerHTML = h; return e; };
  const esc = (s) => (s == null ? "" : String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])));
  const slug = (s) => (s || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const regionById = (id) => CONFIG.regions.find(r => r.id === id);
  const sceneById = (id) => (CONFIG.scenes || []).find(s => s.id === id);
  function townsOf(r) {
    return (r.anchorTowns || []).map(t => Object.assign({ type: "anchor", slug: slug(t.name) }, t))
      .concat((r.peripheralTowns || []).map(t => Object.assign({ type: "peripheral", slug: slug(t.name) }, t)));
  }
  const selectedTown = () => townsOf(regionById(state.region)).find(t => t.slug === state.area) || null;

  const KEY = (CONFIG.googleMapsKey || "").trim();
  const qOf = (o) => encodeURIComponent(o.address || (o.lat != null ? o.lat + "," + o.lng : (o.name + " " + (o.town || ""))));
  const mapsLink = (o) => `https://www.google.com/maps/search/?api=1&query=${qOf(o)}`;
  const imgLink = (o) => `https://www.google.com/search?tbm=isch&q=${encodeURIComponent((o.name || "") + " " + (o.town || "") + " CA")}`;
  const svStatic = (o) => `https://maps.googleapis.com/maps/api/streetview?size=800x450&location=${o.lat},${o.lng}&fov=80&pitch=0&key=${KEY}`;
  const svMeta = (o) => `https://maps.googleapis.com/maps/api/streetview/metadata?location=${o.lat},${o.lng}&key=${KEY}`;
  const photosOf = (o) => (o.photos && o.photos.length ? o.photos : (o.photo ? [o.photo] : []));

  function filtered() {
    const q = state.q.toLowerCase();
    return OPTIONS.filter(o => o.region === state.region)
      .filter(o => !state.area || o.area === state.area)
      .filter(o => state.scene === "all" || (o.scenes && o.scenes.indexOf(state.scene) !== -1))
      .filter(o => !q || (o.name + " " + o.town + " " + (o.address || "") + " " + (o.notes || "")).toLowerCase().includes(q))
      .sort((a, b) => (a.name || "").localeCompare(b.name || ""));
  }
  const inArea = (o) => !state.area || o.area === state.area;
  const sceneCount = (id) => OPTIONS.filter(o => o.region === state.region && inArea(o) && o.scenes && o.scenes.indexOf(id) !== -1).length;
  const areaCount = (sl) => OPTIONS.filter(o => o.region === state.region && o.area === sl).length;

  /* ---- pills / areas / scene dropdown ---- */
  function buildPills() {
    const box = $("#pills"); box.innerHTML = "";
    CONFIG.regions.forEach(r => {
      const n = OPTIONS.filter(o => o.region === r.id).length;
      const b = elc("button", "pill", `${esc(r.name)}<span class="c">${n}</span>`);
      b.setAttribute("aria-selected", r.id === state.region);
      b.addEventListener("click", () => switchRegion(r.id));
      box.appendChild(b);
    });
  }
  function buildAreas() {
    const box = $("#areas"); box.innerHTML = ""; box.style.display = "flex";
    const r = regionById(state.region);
    const all = elc("button", "apill all", `All ${esc(r.name)}`);
    all.setAttribute("aria-selected", !state.area);
    all.addEventListener("click", () => { state.area = null; state.scene = "all"; refresh(); fitArea(); });
    box.appendChild(all);
    const grp = (label, towns) => {
      if (!towns.length) return;
      box.appendChild(elc("span", "crumb", label));
      towns.forEach(t => {
        const n = areaCount(t.slug);
        const b = elc("button", "apill" + (t.type === "anchor" ? " anchor" : ""),
          `${esc(t.name)}${n ? `<span class="c">${n}</span>` : ""}`);
        b.setAttribute("aria-selected", t.slug === state.area);
        b.addEventListener("click", () => { state.area = t.slug; state.scene = "all"; refresh(); fitArea(); });
        box.appendChild(b);
      });
    };
    grp("Anchors:", (r.anchorTowns || []).map(t => Object.assign({ type: "anchor", slug: slug(t.name) }, t)));
    grp("Peripherals:", (r.peripheralTowns || []).map(t => Object.assign({ type: "peripheral", slug: slug(t.name) }, t)));
  }
  function buildSceneSelect() {
    const sel = $("#scene-select"); sel.innerHTML = "";
    const total = OPTIONS.filter(o => o.region === state.region && inArea(o)).length;
    sel.appendChild(new Option(`All locations (${total})`, "all"));
    (CONFIG.scenes || []).forEach(sc => sel.appendChild(new Option(`${sc.name} (${sceneCount(sc.id)})`, sc.id)));
    sel.value = state.scene;
  }

  /* ---- list ---- */
  function buildList() {
    state.list = filtered();
    const box = $("#list"); box.innerHTML = "";
    $("#count").textContent = `${state.list.length} location${state.list.length === 1 ? "" : "s"}`;
    if (!state.list.length) {
      box.appendChild(elc("div", "empty", "No locations here yet.<br>Add them in <b>data.js</b>."));
      return;
    }
    state.list.forEach((o) => {
      const st = (o.status || "idea").toLowerCase();
      const row = elc("button", "row s-" + st,
        `<span><span class="rn">${esc(o.name)}</span><span class="rs">${esc(o.address || o.town || "")}</span></span><span class="go">\u203A</span>`);
      row.dataset.name = o.name;
      row.addEventListener("click", () => openModal(o));
      box.appendChild(row);
    });
  }
  function markSelected(o) { $$(".row").forEach(r => r.classList.toggle("sel", r.dataset.name === (o && o.name))); }

  /* ---- map ---- */
  function initMap() {
    const t = selectedTown(); const r = regionById(state.region);
    const start = t ? { center: t.center || [t.lat, t.lng], zoom: t.zoom || 14 } : r;
    map = L.map("map", { zoomControl: true, scrollWheelZoom: true }).setView(start.center, start.zoom);
    L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
      { attribution: "&copy; OpenStreetMap &copy; CARTO", maxZoom: 19, subdomains: "abcd" }).addTo(map);
    baseGroup = L.layerGroup().addTo(map);
    townGroup = L.layerGroup().addTo(map);
    optGroup = L.layerGroup().addTo(map);
  }
  function townMarker(t, big) {
    if (t.lat == null) return;
    townGroup.addLayer(L.circleMarker([t.lat, t.lng], {
      radius: big ? 8 : (t.type === "anchor" ? 7 : 5), color: "#fff", weight: 1.4,
      fillColor: regionById(state.region).color, fillOpacity: t.type === "anchor" || big ? .9 : .55
    }).bindTooltip(t.name, { permanent: true, direction: "right", className: "town-tip", offset: [8, 0] }));
  }
  function drawMap() {
    const r = regionById(state.region); const t = selectedTown();
    baseGroup.clearLayers(); townGroup.clearLayers(); optGroup.clearLayers();
    for (const k in pinByName) delete pinByName[k];
    if (t && t.perimeter) baseGroup.addLayer(L.polygon(t.perimeter, { color: r.color, weight: 2.5, dashArray: "6 6", fillColor: r.color, fillOpacity: .05 }));
    if (!state.area) townsOf(r).forEach(tw => townMarker(tw));
    else if (t) townMarker(t, true);
    filtered().forEach(o => {
      if (o.lat == null) return;
      const icon = L.divIcon({ className: "", iconSize: [16, 16], iconAnchor: [8, 8],
        html: `<div style="width:13px;height:13px;border-radius:50%;background:${r.color};border:2px solid #fff;box-shadow:0 1px 3px rgba(0,0,0,.5)"></div>` });
      const m = L.marker([o.lat, o.lng], { icon }).bindTooltip(o.name, { direction: "top" });
      m.on("click", () => openModal(o));
      optGroup.addLayer(m); pinByName[o.name] = m;
    });
  }
  function fitArea() {
    const t = selectedTown(); const r = regionById(state.region);
    if (t && t.perimeter) map.flyTo(t.center || [t.lat, t.lng], t.zoom || 16, { duration: .6 });
    else if (t) map.flyTo([t.lat, t.lng], t.zoom || 14, { duration: .6 });
    else map.flyTo(r.center, r.zoom, { duration: .6 });
  }

  /* ---- modal / gallery ---- */
  function composeSlides(o, svOk) {
    const slides = photosOf(o).map((p, i) => ({ type: "img", src: p, label: "Photo " + (i + 1) }));
    if (svOk) slides.push({ type: "img", src: svStatic(o), label: "Street View" });
    while (slides.length < 3) slides.push({ type: "add", n: slides.length + 1 });
    return slides;
  }
  function renderThumbs() {
    const th = $("#thumbs"); th.innerHTML = "";
    state.slides.forEach((s, k) => {
      const t = elc("button", "thumb" + (s.type === "img" ? "" : " add"),
        s.type === "img" ? `<img src="${esc(s.src)}" loading="lazy" alt="">` : `<span class="addn">+ ${s.n}</span>`);
      t.addEventListener("click", () => showSlide(k));
      th.appendChild(t);
    });
    th.style.display = "flex";
  }
  function showSlide(i) {
    state.slide = i; const s = state.slides[i]; if (!s) return;
    const g = $("#gallery");
    if (s.type === "img") {
      g.innerHTML = `<img src="${esc(s.src)}" loading="lazy" alt="">`;
      g.appendChild(elc("span", "slide-label", esc(s.label || "Photo")));
    } else {
      g.innerHTML = `<div class="noimg"><div class="camera">\uD83D\uDCF7</div><div>Photo ${s.n || ""} of 3</div>` +
        `<div class="hint">Add in data.js (<code>photos:[…]</code>) or tap “View photos on Google”.</div></div>`;
    }
    $$("#thumbs .thumb").forEach((t, k) => t.classList.toggle("act", k === i));
  }
  function galStep(d) { const n = state.slides.length; if (!n) return; showSlide((state.slide + d + n) % n); }
  function openModal(o) {
    state.current = o;
    const list = state.list.length ? state.list : filtered();
    state.idx = list.indexOf(o);
    markSelected(o);
    if (pinByName[o.name]) map.flyTo(pinByName[o.name].getLatLng(), Math.max(map.getZoom(), 16), { duration: .5 });
    $("#d-name").textContent = o.name || "Untitled";
    $("#d-tag").textContent = "";
    $("#d-addr").textContent = o.address || o.town || "";
    const links = $("#d-links"); links.innerHTML = "";
    links.appendChild(mkLink(mapsLink(o), "\uD83D\uDCF7 View photos on Google", false));
    links.appendChild(mkLink(imgLink(o), "Image search \u2197", true));
    const imgs = photosOf(o);
    state.slides = composeSlides(o, false); renderThumbs(); showSlide(0);
    $("#modal").hidden = false;
    if (KEY && o.lat != null) {
      fetch(svMeta(o)).then(r => r.json()).then(j => {
        if (state.current !== o || !j || j.status !== "OK") return;
        state.slides = composeSlides(o, true); renderThumbs();
        if (!imgs.length) showSlide(0);
      }).catch(function () { });
    }
  }
  function mkLink(href, txt, alt) { const a = elc("a", alt ? "alt" : "", txt); a.href = href; a.target = "_blank"; a.rel = "noopener"; return a; }
  function closeModal() { $("#modal").hidden = true; state.current = null; markSelected(null); }
  function step(d) {
    const list = state.list.length ? state.list : filtered(); if (!list.length) return;
    let i = state.idx + d; if (i < 0) i = list.length - 1; if (i >= list.length) i = 0;
    openModal(list[i]);
  }

  /* ---- switch / refresh ---- */
  function switchRegion(id) {
    state.region = id; state.q = ""; state.scene = "all"; $("#search").value = "";
    const r = regionById(id);
    state.area = r.defaultArea || null;
    document.documentElement.style.setProperty("--rc", r.color);
    $$(".pill").forEach((p, i) => p.setAttribute("aria-selected", CONFIG.regions[i].id === id));
    refresh(); fitArea();
  }
  function refresh() {
    const r = regionById(state.region); const t = selectedTown();
    $("#loc-label").textContent = t ? t.name : ("All " + r.name);
    const rn = $("#rnote"); rn.textContent = r.note || ""; rn.style.display = r.note ? "block" : "none";
    buildAreas(); buildSceneSelect(); buildList(); drawMap();
  }

  /* ---- boot ---- */
  document.addEventListener("DOMContentLoaded", () => {
    const r = regionById(state.region);
    state.area = r.defaultArea || null;
    document.documentElement.style.setProperty("--rc", r.color);
    $("#title").textContent = CONFIG.title;
    buildPills();
    initMap();
    refresh();
    $("#search").addEventListener("input", (e) => { state.q = e.target.value; buildList(); drawMap(); });
    $("#scene-select").addEventListener("change", (e) => { state.scene = e.target.value; buildList(); drawMap(); });
    $("#fit").addEventListener("click", fitArea);
    $("#x").addEventListener("click", closeModal);
    $("#modal-bg").addEventListener("click", closeModal);
    $("#prev").addEventListener("click", () => step(-1));
    $("#next").addEventListener("click", () => step(1));
    $("#gprev").addEventListener("click", () => galStep(-1));
    $("#gnext").addEventListener("click", () => galStep(1));
    document.addEventListener("keydown", (e) => {
      if ($("#modal").hidden) return;
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowLeft") galStep(-1);
      if (e.key === "ArrowRight") galStep(1);
      if (e.key === "[") step(-1);
      if (e.key === "]") step(1);
    });
    $("#foot").innerHTML = "Photos: Street View auto-loads; ‹ › switches pictures; add up to 3 of your own per place in data.js.";
  });
})();
