/* CALAMITIES — Enchantment Scout · simple app (edit locations in data.js) */
(function () {
  "use strict";

  const state = { region: "av", q: "", list: [], idx: 0, slide: 0, slides: [] };
  let map, baseGroup, townGroup, optGroup;
  const pinByName = {};

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const elc = (t, c, h) => { const e = document.createElement(t); if (c) e.className = c; if (h != null) e.innerHTML = h; return e; };
  const esc = (s) => (s == null ? "" : String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])));
  const regionById = (id) => CONFIG.regions.find(r => r.id === id);

  const qOf = (o) => encodeURIComponent(o.address || (o.lat != null ? o.lat + "," + o.lng : (o.name + " " + (o.town || ""))));
  const svEmbed = (o) => `https://maps.google.com/maps?q=&layer=c&cbll=${o.lat},${o.lng}&cbp=11,0,0,0,0&output=svembed`;
  const mapEmbed = (o) => `https://maps.google.com/maps?q=${qOf(o)}&z=16&output=embed`;
  const mapsLink = (o) => `https://www.google.com/maps/search/?api=1&query=${qOf(o)}`;
  const svLink = (o) => `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${o.lat},${o.lng}`;
  const imgLink = (o) => `https://www.google.com/search?tbm=isch&q=${encodeURIComponent((o.name || "") + " " + (o.town || "") + " CA")}`;
  const photosOf = (o) => (o.photos && o.photos.length ? o.photos : (o.photo ? [o.photo] : []));

  function filtered() {
    const q = state.q.toLowerCase();
    return OPTIONS.filter(o => o.region === state.region)
      .filter(o => !q || (o.name + " " + o.town + " " + (o.address || "") + " " + (o.notes || "")).toLowerCase().includes(q))
      .sort((a, b) => (a.name || "").localeCompare(b.name || ""));
  }

  /* ---- header pills ---- */
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
        `<span><span class="rn">${esc(o.name)}</span>` +
        `<span class="rs">${esc(o.address || o.town || "")}</span>` +
        (o.notes ? `<span class="rt">${esc(o.notes)}</span>` : "") +
        `</span><span class="go">›</span>`);
      row.addEventListener("click", () => openModal(o));
      row.dataset.name = o.name;
      box.appendChild(row);
    });
  }
  function markSelected(o) {
    $$(".row").forEach(r => r.classList.toggle("sel", r.dataset.name === (o && o.name)));
  }

  /* ---- map ---- */
  function initMap() {
    const r = regionById(state.region);
    const start = (r.baseAreas && r.baseAreas[0]) ? r.baseAreas[0] : r;
    map = L.map("map", { zoomControl: true, scrollWheelZoom: true }).setView(start.center, start.zoom);
    L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
      { attribution: "&copy; OpenStreetMap &copy; CARTO", maxZoom: 19, subdomains: "abcd" }).addTo(map);
    baseGroup = L.layerGroup().addTo(map);
    townGroup = L.layerGroup().addTo(map);
    optGroup = L.layerGroup().addTo(map);
  }
  function drawMap() {
    const r = regionById(state.region);
    baseGroup.clearLayers(); townGroup.clearLayers(); optGroup.clearLayers();
    for (const k in pinByName) delete pinByName[k];
    (r.baseAreas || []).forEach(b => b.ring &&
      baseGroup.addLayer(L.polygon(b.ring, { color: r.color, weight: 2, dashArray: "7 6", fillColor: r.color, fillOpacity: .05 })));
    const town = (t, big) => t.lat != null && townGroup.addLayer(
      L.circleMarker([t.lat, t.lng], { radius: big ? 7 : 5, color: "#fff", weight: 1.4, fillColor: r.color, fillOpacity: big ? .9 : .55 })
        .bindTooltip(t.name, { permanent: true, direction: "right", className: "town-tip", offset: [8, 0] }));
    r.anchorTowns.forEach(t => town(t, true)); r.peripheralTowns.forEach(t => town(t, false));
    filtered().forEach(o => {
      if (o.lat == null) return;
      const icon = L.divIcon({ className: "", iconSize: [16, 16], iconAnchor: [8, 8],
        html: `<div style="width:13px;height:13px;border-radius:50%;background:${r.color};border:2px solid #fff;box-shadow:0 1px 3px rgba(0,0,0,.5)"></div>` });
      const m = L.marker([o.lat, o.lng], { icon }).bindTooltip(o.name, { direction: "top" });
      m.on("click", () => openModal(o));
      optGroup.addLayer(m); pinByName[o.name] = m;
    });
  }
  function fitEnchantment() {
    const r = regionById(state.region);
    const b = r.baseAreas && r.baseAreas[0];
    if (b) map.flyTo(b.center, b.zoom, { duration: .6 });
    else map.flyTo(r.center, r.zoom, { duration: .6 });
  }

  /* ---- modal / gallery ---- */
  function buildSlides(o) {
    const s = [];
    photosOf(o).forEach(p => s.push({ type: "img", src: p, label: "Photo" }));
    if (o.lat != null) s.push({ type: "sv", src: svEmbed(o), label: "Street View" });
    s.push({ type: "map", src: mapEmbed(o), label: "Map" });
    return s;
  }
  function showSlide(i) {
    state.slide = i;
    const s = state.slides[i]; const g = $("#gallery");
    g.innerHTML = (s.type === "img")
      ? `<img src="${esc(s.src)}" alt="">`
      : `<iframe loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="${s.src}" title="${esc(s.label)}"></iframe>`;
    g.appendChild(elc("span", "slide-label", esc(s.label)));
    $$("#thumbs .thumb").forEach((t, k) => t.classList.toggle("act", k === i));
  }
  function openModal(o) {
    const list = state.list.length ? state.list : filtered();
    state.idx = list.indexOf(o);
    markSelected(o);
    if (pinByName[o.name]) { map.flyTo(pinByName[o.name].getLatLng(), Math.max(map.getZoom(), 15), { duration: .5 }); }
    $("#d-name").textContent = o.name || "Untitled";
    $("#d-tag").textContent = o.notes || "";
    $("#d-addr").textContent = o.address || o.town || "";
    $("#d-notes").textContent = "";
    const links = $("#d-links"); links.innerHTML = "";
    links.appendChild(mkLink(mapsLink(o), "Open in Maps ↗"));
    if (o.lat != null) links.appendChild(mkLink(svLink(o), "Street View ↗", true));
    links.appendChild(mkLink(imgLink(o), "More photos ↗", true));
    state.slides = buildSlides(o);
    const th = $("#thumbs"); th.innerHTML = "";
    state.slides.forEach((s, k) => {
      const t = elc("button", "thumb");
      t.innerHTML = s.type === "img" ? `<img src="${esc(s.src)}" alt="">` : `<span class="tv">${s.type === "sv" ? "STREET&nbsp;VIEW" : "MAP"}</span>`;
      t.addEventListener("click", () => showSlide(k));
      th.appendChild(t);
    });
    showSlide(0);
    $("#modal").hidden = false;
  }
  function mkLink(href, txt, alt) { const a = elc("a", alt ? "alt" : "", esc(txt)); a.href = href; a.target = "_blank"; a.rel = "noopener"; return a; }
  function closeModal() { $("#modal").hidden = true; markSelected(null); }
  function step(d) {
    const list = state.list.length ? state.list : filtered();
    if (!list.length) return;
    let i = state.idx + d; if (i < 0) i = list.length - 1; if (i >= list.length) i = 0;
    openModal(list[i]);
  }

  /* ---- region switch ---- */
  function switchRegion(id) {
    state.region = id; state.q = ""; $("#search").value = "";
    const r = regionById(id);
    document.documentElement.style.setProperty("--rc", r.color);
    $("#loc-label").textContent = (r.baseAreas && r.baseAreas[0]) ? (r.baseAreas[0].name + " · " + r.name) : r.name;
    $$(".pill").forEach((p, i) => p.setAttribute("aria-selected", CONFIG.regions[i].id === id));
    buildList(); drawMap(); fitEnchantment();
  }

  /* ---- boot ---- */
  document.addEventListener("DOMContentLoaded", () => {
    const r = regionById(state.region);
    document.documentElement.style.setProperty("--rc", r.color);
    $("#title").textContent = CONFIG.title;
    if (r.baseAreas && r.baseAreas[0]) $("#loc-label").textContent = r.baseAreas[0].name + " · " + r.name;
    buildPills();
    buildList();
    initMap();
    drawMap();
    $("#search").addEventListener("input", (e) => { state.q = e.target.value; buildList(); drawMap(); });
    $("#fit").addEventListener("click", fitEnchantment);
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
    $("#foot").innerHTML = "Click any location for photos (Street View) + address. Add your own photos in data.js: <b>photos:[\"photos/name.jpg\"]</b>.";
  });
})();
