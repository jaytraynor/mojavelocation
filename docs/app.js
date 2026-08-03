/* CALAMITIES — Location Scout · app logic (don't edit to add locations; use data.js) */
(function () {
  "use strict";

  const state = { region: CONFIG.regions[0].id, scene: "all", q: "" };
  let map, townGroup, optGroup;
  const optMarkers = {};   // key -> leaflet marker

  const $ = (s, r = document) => r.querySelector(s);
  const elc = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
  const esc = (s) => (s == null ? "" : String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])));

  const regionById = (id) => CONFIG.regions.find(r => r.id === id);
  const sceneById = (id) => CONFIG.scenes.find(s => s.id === id);

  function optsFor(region, scene, q) {
    return OPTIONS.filter(o => o.region === region)
      .filter(o => scene === "all" || o.scene === scene)
      .filter(o => {
        if (!q) return true;
        const hay = (o.name + " " + o.town + " " + (o.address || "") + " " + (o.notes || "")).toLowerCase();
        return hay.includes(q.toLowerCase());
      });
  }
  function countsByScene(region) {
    const m = {};
    OPTIONS.filter(o => o.region === region).forEach(o => { m[o.scene] = (m[o.scene] || 0) + 1; });
    return m;
  }
  const okey = (o) => `${o.region}|${o.scene}|${o.name}`;

  /* ---------- header ---------- */
  function buildHeader() {
    $("#brand-title").textContent = CONFIG.title;
    $("#brand-sub").textContent = CONFIG.subtitle;
    const tabs = $("#tabs");
    tabs.innerHTML = "";
    CONFIG.regions.forEach(r => {
      const n = OPTIONS.filter(o => o.region === r.id).length;
      const b = elc("button", "tab",
        `<span class="dot"></span>${esc(r.name)}<span class="cnt">${n}</span>`);
      b.style.setProperty("--rc", r.color);
      b.setAttribute("role", "tab");
      b.setAttribute("aria-selected", r.id === state.region);
      b.addEventListener("click", () => selectRegion(r.id));
      tabs.appendChild(b);
    });
  }

  /* ---------- sidebar (scenes) ---------- */
  function buildScenes() {
    const r = regionById(state.region);
    const counts = countsByScene(state.region);
    const list = $("#scene-list");
    list.innerHTML = "";
    list.style.setProperty("--rc", r.color);

    const total = OPTIONS.filter(o => o.region === state.region).length;
    const allBtn = elc("button", "scene-btn",
      `<span>All scenes<small>every option in this region</small></span><span class="badge ${total ? "has" : ""}">${total}</span>`);
    allBtn.style.setProperty("--rc", r.color);
    allBtn.setAttribute("aria-current", state.scene === "all");
    allBtn.addEventListener("click", () => selectScene("all"));
    list.appendChild(allBtn);

    CONFIG.scenes.forEach(sc => {
      const n = counts[sc.id] || 0;
      const b = elc("button", "scene-btn",
        `<span>${esc(sc.name)}${sc.note ? `<small>${esc(sc.note)}</small>` : ""}</span>` +
        `<span class="badge ${n ? "has" : ""}">${n}</span>`);
      b.style.setProperty("--rc", r.color);
      b.setAttribute("aria-current", state.scene === sc.id);
      b.addEventListener("click", () => selectScene(sc.id));
      list.appendChild(b);
    });
  }

  /* ---------- region strip ---------- */
  function buildRegionStrip() {
    const r = regionById(state.region);
    const strip = $("#region-strip");
    strip.style.setProperty("--rc", r.color);
    const chip = (t, cls, note) =>
      `<span class="chip ${cls}">${esc(t)}${note ? ` <span class="n">· ${esc(note)}</span>` : ""}</span>`;
    strip.innerHTML =
      `<span class="rname">${esc(r.name)}</span>` +
      `<span class="lbl">Anchors</span><span class="chips">${r.anchorTowns.map(t => chip(t.name, "anchor", t.note)).join("")}</span>` +
      `<span class="lbl">Peripherals</span><span class="chips">${r.peripheralTowns.map(t => chip(t.name, "", t.note)).join("")}</span>` +
      (r.crewParking ? `<span class="parking">${esc(r.crewParking)}</span>` : "");
  }

  /* ---------- map ---------- */
  function initMap() {
    const r = regionById(state.region);
    map = L.map("map", { zoomControl: true, scrollWheelZoom: true }).setView(r.center, r.zoom);
    L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; OpenStreetMap &copy; CARTO', maxZoom: 19, subdomains: "abcd"
    }).addTo(map);
    townGroup = L.layerGroup().addTo(map);
    optGroup = L.layerGroup().addTo(map);
  }
  function drawTowns() {
    townGroup.clearLayers();
    const r = regionById(state.region);
    const add = (t, isAnchor) => {
      if (t.lat == null) return;
      const m = L.circleMarker([t.lat, t.lng], {
        radius: isAnchor ? 8 : 6, color: "#fff", weight: 1.5,
        fillColor: r.color, fillOpacity: isAnchor ? 0.95 : 0.6
      });
      m.bindTooltip(t.name, { permanent: true, direction: "right", className: "town-tip", offset: [8, 0] });
      townGroup.addLayer(m);
    };
    r.anchorTowns.forEach(t => add(t, true));
    r.peripheralTowns.forEach(t => add(t, false));
  }
  function drawOptions() {
    optGroup.clearLayers();
    for (const k in optMarkers) delete optMarkers[k];
    const r = regionById(state.region);
    optsFor(state.region, state.scene, state.q).forEach(o => {
      if (o.lat == null || o.lng == null) return;
      const icon = L.divIcon({
        className: "", iconSize: [16, 16], iconAnchor: [8, 8],
        html: `<div style="width:14px;height:14px;border-radius:50%;background:${r.color};border:2px solid #fff;box-shadow:0 1px 3px rgba(0,0,0,.5)"></div>`
      });
      const m = L.marker([o.lat, o.lng], { icon });
      m.bindPopup(
        `<span class="pn">${esc(o.name)}</span>` +
        (o.town ? `<span class="pa">${esc(o.town)}</span>` : "") +
        (o.address ? `<span class="pa">${esc(o.address)}</span>` : "")
      );
      optGroup.addLayer(m);
      optMarkers[okey(o)] = m;
    });
  }
  function flyTo(o) {
    const m = optMarkers[okey(o)];
    if (!m) return;
    map.flyTo(m.getLatLng(), Math.max(map.getZoom(), 13), { duration: .6 });
    m.openPopup();
  }

  /* ---------- cards ---------- */
  function buildCards() {
    const r = regionById(state.region);
    const list = optsFor(state.region, state.scene, state.q);
    const head = $("#cards-head");
    const sceneName = state.scene === "all" ? "All scenes" : sceneById(state.scene).name;
    const cap = state.scene === "all" ? "" :
      `${list.length}/${CONFIG.maxPerScene} options`;
    head.innerHTML =
      `<h2>${esc(sceneName)}</h2><span class="cap">${esc(cap)}</span>`;
    const search = elc("input", "search");
    search.type = "search"; search.placeholder = "Filter options…"; search.value = state.q;
    search.addEventListener("input", (e) => { state.q = e.target.value; buildCards(); drawOptions(); });
    head.appendChild(search);

    const wrap = $("#cards");
    wrap.innerHTML = "";
    if (!list.length) {
      const sceneId = state.scene === "all" ? "slaughterhouse" : state.scene;
      const e = elc("div", "empty",
        `<b>No options yet</b><div style="margin-top:6px">Add up to ${CONFIG.maxPerScene} in <code>data.js</code> ` +
        `— set <code>region:"${state.region}"</code>${state.scene !== "all" ? ` and <code>scene:"${sceneId}"</code>` : ""}.</div>` +
        `<div class="slots">${Array.from({ length: CONFIG.maxPerScene }, () => '<span class="slot"></span>').join("")}</div>`);
      wrap.appendChild(e);
      return;
    }
    list.forEach(o => wrap.appendChild(cardEl(o, r)));
  }
  function cardEl(o, r) {
    const c = elc("article", "card");
    c.style.setProperty("--rc", r.color);
    const thumb = o.photo
      ? `<img src="${esc(o.photo)}" alt="${esc(o.name)}" loading="lazy" onerror="this.parentNode.innerHTML='<span class=&quot;ph&quot;>photo not found:<br>${esc(o.photo)}</span>'">`
      : `<span class="ph">▣ add photo<br><small>${esc(o.photo || "photos/…")}</small></span>`;
    const status = (o.status || "idea").toLowerCase();
    const hasPin = o.lat != null && o.lng != null;
    c.innerHTML =
      `<div class="thumb">${thumb}</div>` +
      `<div class="body">` +
      `<span class="cname">${esc(o.name || "Untitled")}</span>` +
      (o.town ? `<span class="ctown">${esc(o.town)}</span>` : "") +
      (o.address ? `<span class="caddr">${esc(o.address)}</span>` : "") +
      (o.notes ? `<span class="cnotes">${esc(o.notes)}</span>` : "") +
      `<div class="foot"><span class="status ${status}">${esc(status)}</span>` +
      `<button class="pinbtn" ${hasPin ? "" : "disabled"}>${hasPin ? "◎ show on map" : "no pin"}</button></div>` +
      `</div>`;
    if (hasPin) $(".pinbtn", c).addEventListener("click", () => flyTo(o));
    return c;
  }

  /* ---------- selection ---------- */
  function selectRegion(id) {
    if (state.region === id) return;
    state.region = id; state.scene = "all"; state.q = "";
    const r = regionById(id);
    document.documentElement.style.setProperty("--rc", r.color);
    $$(".tab").forEach((t, i) => t.setAttribute("aria-selected", CONFIG.regions[i].id === id));
    buildScenes(); buildRegionStrip(); buildCards();
    drawTowns(); drawOptions();
    map.flyTo(r.center, r.zoom, { duration: .6 });
  }
  function selectScene(id) {
    state.scene = id; state.q = "";
    buildScenes(); buildCards(); drawOptions();
    // fit map to this scene's pins if any
    const pts = optsFor(state.region, state.scene, "").filter(o => o.lat != null).map(o => [o.lat, o.lng]);
    if (pts.length) map.flyToBounds(pts, { padding: [40, 40], maxZoom: 13, duration: .6 });
  }
  const $$ = (s) => Array.from(document.querySelectorAll(s));

  /* ---------- boot ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    document.documentElement.style.setProperty("--rc", regionById(state.region).color);
    buildHeader();
    buildScenes();
    buildRegionStrip();
    initMap();
    drawTowns();
    drawOptions();
    buildCards();
    $("#year").textContent = new Date().getFullYear();
  });
})();
