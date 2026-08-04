/* CALAMITIES — Enchantment Scout · app (edit locations + key in data.js) */
(function () {
  "use strict";

  const KEY = (CONFIG.googleMapsKey || "").trim();
  const state = { region: "av", area: null, q: "", list: [], idx: 0, slide: 0, slides: [] };
  let map, baseGroup, townGroup, optGroup;
  const pinByName = {};

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const elc = (t, c, h) => { const e = document.createElement(t); if (c) e.className = c; if (h != null) e.innerHTML = h; return e; };
  const esc = (s) => (s == null ? "" : String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])));
  const regionById = (id) => CONFIG.regions.find(r => r.id === id);
  const areaObj = () => { const r = regionById(state.region); return (r.areas || []).find(a => a.id === state.area) || null; };

  const qOf = (o) => encodeURIComponent(o.address || (o.lat != null ? o.lat + "," + o.lng : (o.name + " " + (o.town || ""))));
  const mapsLink = (o) => `https://www.google.com/maps/search/?api=1&query=${qOf(o)}`;
  const svLink = (o) => `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${o.lat},${o.lng}`;
  const imgLink = (o) => `https://www.google.com/search?tbm=isch&q=${encodeURIComponent((o.name || "") + " " + (o.town || "") + " CA")}`;
  const svStatic = (o) => `https://maps.googleapis.com/maps/api/streetview?size=800x450&location=${o.lat},${o.lng}&fov=80&pitch=0&key=${KEY}`;
  const photosOf = (o) => (o.photos && o.photos.length ? o.photos : (o.photo ? [o.photo] : []));

  function filtered() {
    const q = state.q.toLowerCase();
    return OPTIONS.filter(o => o.region === state.region)
      .filter(o => !state.area || o.area === state.area)
      .filter(o => !q || (o.name + " " + o.town + " " + (o.address || "") + " " + (o.notes || "")).toLowerCase().includes(q))
      .sort((a, b) => (a.name || "").localeCompare(b.name || ""));
  }

  /* ---- region + area pills ---- */
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
    const box = $("#areas"); box.innerHTML = "";
    const r = regionById(state.region);
    if (!r.areas || !r.areas.length) { box.style.display = "none"; return; }
    box.style.display = "flex";
    box.appendChild(elc("span", "crumb", `${esc(r.name)} \u203A`));
    r.areas.forEach(a => {
      const n = OPTIONS.filter(o => o.region === r.id && o.area === a.id).length;
      const b = elc("button", "apill", `${esc(a.name)}<span class="c">${n}</span>`);
      b.setAttribute("aria-selected", a.id === state.area);
      b.addEventListener("click", () => { state.area = a.id; refresh(); fitArea(); });
      box.appendChild(b);
    });
  }

  /* ---- list ---- */
  function buildList() {
    state.list = filtered();
    const box = $("#list"); box.innerHTML = "";
    $("#count").textContent = `${state.list.length} location${state.list.length === 1 ? "" : "s"}`;
    if (!state.list.length) { box.appendChild(elc("div", "empty", "No locations here yet.<br>Add them in <b>data.js</b>.")); return; }
    state.list.forEach((o) => {
      const st = (o.status || "idea").toLowerCase();
      const row = elc("button", "row s-" + st,
        `<span><span class="rn">${esc(o.name)}</span><span class="rs">${esc(o.address || o.town || "")}</span>` +
        (o.notes ? `<span class="rt">${esc(o.notes)}</span>` : "") + `</span><span class="go">\u203A</span>`);
      row.dataset.name = o.name;
      row.addEventListener("click", () => openModal(o));
      box.appendChild(row);
    });
  }
  function markSelected(o) { $$(".row").forEach(r => r.classList.toggle("sel", r.dataset.name === (o && o.name))); }

  /* ---- map ---- */
  function initMap() {
    const a = areaObj(); const r = regionById(state.region);
    const start = a || r;
    map = L.map("map", { zoomControl: true, scrollWheelZoom: true }).setView(start.center, start.zoom);
    L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
      { attribution: "&copy; OpenStreetMap &copy; CARTO", maxZoom: 19, subdomains: "abcd" }).addTo(map);
    baseGroup = L.layerGroup().addTo(map);
    townGroup = L.layerGroup().addTo(map);
    optGroup = L.layerGroup().addTo(map);
  }
  function drawMap() {
    const r = regionById(state.region); const a = areaObj();
    baseGroup.clearLayers(); townGroup.clearLayers(); optGroup.clearLayers();
    for (const k in pinByName) delete pinByName[k];
    (r.areas || []).forEach(ar => ar.perimeter &&
      baseGroup.addLayer(L.polygon(ar.perimeter, { color: r.color, weight: 2.5, dashArray: "6 6", fillColor: r.color, fillOpacity: .05 })));
    if (!a) {
      const town = (t, big) => t.lat != null && townGroup.addLayer(
        L.circleMarker([t.lat, t.lng], { radius: big ? 7 : 5, color: "#fff", weight: 1.4, fillColor: r.color, fillOpacity: big ? .9 : .55 })
          .bindTooltip(t.name, { permanent: true, direction: "right", className: "town-tip", offset: [8, 0] }));
      r.anchorTowns.forEach(t => town(t, true)); r.peripheralTowns.forEach(t => town(t, false));
    }
    filtered().forEach(o => {
      if (o.lat == null) return;
      const icon = L.divIcon({ className: "", iconSize: [16, 16], iconAnchor: [8, 8],
        html: `<div style="width:13px;height:13px;border-radius:50%;background:${r.color};border:2px solid #fff;box-shadow:0 1px 3px rgba(0,0,0,.5)"></div>` });
      const m = L.marker([o.lat, o.lng], { icon }).bindTooltip(o.name, { direction: "top" });
      m.on("click", () => openModal(o));
      optGroup.addLayer(m); pinByName[o.name] = m;
    });
  }
  function fitArea() { const a = areaObj(); const r = regionById(state.region); const t = a || r; map.flyTo(t.center, t.zoom, { duration: .6 }); }

  /* ---- modal / gallery ---- */
  function buildSlides(o) {
    const s = [];
    photosOf(o).forEach(p => s.push({ type: "img", src: p, label: "Photo" }));
    if (KEY && o.lat != null) s.push({ type: "img", src: svStatic(o), label: "Street View" });
    if (!s.length) s.push({ type: "placeholder" });
    return s;
  }
  function showSlide(i) {
    state.slide = i; const s = state.slides[i]; const g = $("#gallery");
    if (s.type === "img") {
      g.innerHTML = `<img src="${esc(s.src)}" alt="">`;
      g.appendChild(elc("span", "slide-label", esc(s.label)));
    } else {
      g.innerHTML = `<div class="noimg"><div class="camera">\uD83D\uDCF7</div><div>No photo loaded yet</div>` +
        `<div class="hint">${KEY ? "No Street View here — use the buttons below." : "Add a Google Maps key in data.js for auto photos, or use the buttons below."}</div></div>`;
    }
    $$("#thumbs .thumb").forEach((t, k) => t.classList.toggle("act", k === i));
  }
  function openModal(o) {
    const list = state.list.length ? state.list : filtered();
    state.idx = list.indexOf(o);
    markSelected(o);
    if (pinByName[o.name]) map.flyTo(pinByName[o.name].getLatLng(), Math.max(map.getZoom(), 15), { duration: .5 });
    $("#d-name").textContent = o.name || "Untitled";
    $("#d-tag").textContent = o.notes || "";
    $("#d-addr").textContent = o.address || o.town || "";
    const links = $("#d-links"); links.innerHTML = "";
    links.appendChild(mkLink(mapsLink(o), "\uD83D\uDCF7 View photos on Google", false));
    links.appendChild(mkLink(imgLink(o), "Image search \u2197", true));
    if (o.lat != null) links.appendChild(mkLink(svLink(o), "Street View \u2197", true));
    state.slides = buildSlides(o);
    const th = $("#thumbs"); th.innerHTML = "";
    if (state.slides.length > 1 || (state.slides[0] && state.slides[0].type === "img")) {
      state.slides.forEach((s, k) => {
        if (s.type !== "img") return;
        const t = elc("button", "thumb", `<img src="${esc(s.src)}" alt="">`);
        t.addEventListener("click", () => showSlide(k));
        th.appendChild(t);
      });
    }
    th.style.display = th.children.length ? "flex" : "none";
    showSlide(0);
    $("#modal").hidden = false;
  }
  function mkLink(href, txt, alt) { const a = elc("a", alt ? "alt" : "", txt); a.href = href; a.target = "_blank"; a.rel = "noopener"; return a; }
  function closeModal() { $("#modal").hidden = true; markSelected(null); }
  function step(d) {
    const list = state.list.length ? state.list : filtered(); if (!list.length) return;
    let i = state.idx + d; if (i < 0) i = list.length - 1; if (i >= list.length) i = 0;
    openModal(list[i]);
  }

  /* ---- region switch + refresh ---- */
  function switchRegion(id) {
    state.region = id; state.q = ""; $("#search").value = "";
    const r = regionById(id);
    state.area = (r.areas && r.areas[0]) ? r.areas[0].id : null;
    document.documentElement.style.setProperty("--rc", r.color);
    $$(".pill").forEach((p, i) => p.setAttribute("aria-selected", CONFIG.regions[i].id === id));
    refresh(); fitArea();
  }
  function refresh() {
    const r = regionById(state.region); const a = areaObj();
    $("#loc-label").textContent = a ? (a.name) : r.name;
    buildAreas(); buildList(); drawMap();
  }

  /* ---- boot ---- */
  document.addEventListener("DOMContentLoaded", () => {
    const r = regionById(state.region);
    state.area = (r.areas && r.areas[0]) ? r.areas[0].id : null;
    document.documentElement.style.setProperty("--rc", r.color);
    $("#title").textContent = CONFIG.title;
    buildPills();
    initMap();
    refresh();
    $("#search").addEventListener("input", (e) => { state.q = e.target.value; buildList(); drawMap(); });
    $("#fit").addEventListener("click", fitArea);
    $("#x").addEventListener("click", closeModal);
    $("#modal-bg").addEventListener("click", closeModal);
    $("#prev").addEventListener("click", () => step(-1));
    $("#next").addEventListener("click", () => step(1));
    document.addEventListener("keydown", (e) => {
      if ($("#modal").hidden) return;
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    });
    $("#foot").innerHTML = KEY
      ? "Photos load from Street View. Click a location for its photo + address."
      : "Tip: add a free Google Maps key in <b>data.js</b> for real photos on every pin. Meanwhile, click \u201cView photos on Google\u201d.";
  });
})();
