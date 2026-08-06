/* CALAMITIES — Enchantment Scout · app (edit locations in data.js) */
(function () {
  "use strict";

  const STATUSES = [
    { id: "idea", name: "Idea" }, { id: "scouting", name: "Scouting" },
    { id: "scouted", name: "Scouted" }, { id: "cleared", name: "Cleared \u2713" },
    { id: "rejected", name: "Rejected" }
  ];
  const LOGI = [
    ["contact", "Contact"], ["permit", "Permit"], ["access", "Access"],
    ["bestTime", "Best time"], ["parking", "Parking"], ["power", "Power"],
    ["cost", "Cost"], ["info", "Notes"]
  ];

  const state = { region: "av", area: null, scene: "all", filter: "all", q: "", allRegions: false,
    list: [], idx: 0, slides: [], slide: 0, current: null };
  let map, baseGroup, townGroup, optGroup;
  const pinByName = {};
  let hoverTimer = null;

  /* ---- tiny storage (localStorage w/ in-memory fallback) ---- */
  const mem = {};
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return k in mem ? mem[k] : d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { mem[k] = v; } }
  };
  let FAVS = store.get("cal_favs", {});
  let STAT = store.get("cal_status", {});

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
  const idOf = (o) => o.region + "|" + o.name;
  const isFav = (o) => !!FAVS[idOf(o)];
  const getStatus = (o) => STAT[idOf(o)] || o.status || "idea";
  const statusName = (id) => (STATUSES.find(s => s.id === id) || { name: id }).name;
  function toggleFav(o) { const k = idOf(o); if (FAVS[k]) delete FAVS[k]; else FAVS[k] = 1; store.set("cal_favs", FAVS); }
  function setStatus(o, s) { STAT[idOf(o)] = s; store.set("cal_status", STAT); }

  const qOf = (o) => encodeURIComponent(o.address || (o.lat != null ? o.lat + "," + o.lng : (o.name + " " + (o.town || ""))));
  const mapsLink = (o) => `https://www.google.com/maps/search/?api=1&query=${qOf(o)}`;
  const imgLink = (o) => `https://www.google.com/search?tbm=isch&q=${encodeURIComponent((o.name || "") + " " + (o.town || "") + " CA")}`;
  const svLoc = (o) => (o.lat != null ? o.lat + "," + o.lng : encodeURIComponent(o.address || o.name || ""));
  const svStatic = (o) => `https://maps.googleapis.com/maps/api/streetview?size=800x450&location=${svLoc(o)}&fov=80&pitch=0&key=${KEY}`;
  const svMeta = (o) => `https://maps.googleapis.com/maps/api/streetview/metadata?location=${svLoc(o)}&key=${KEY}`;

  /* ---- Google Places photos (the Maps preview slideshow) ---- */
  const photoCache = {};
  let placesResolve; const placesReady = new Promise(r => placesResolve = r);
  window.__initGMaps = async function () { try { const lib = await google.maps.importLibrary("places"); window.__Place = lib.Place; } catch (e) { } placesResolve(); };
  setTimeout(() => placesResolve(), 9000);
  async function googlePhotos(o) {
    const k = idOf(o); if (k in photoCache) return photoCache[k];
    await placesReady;
    if (!window.__Place) { photoCache[k] = []; return []; }
    try {
      const res = await window.__Place.searchByText({ textQuery: (o.name + ", " + (o.town || "") + " CA"), fields: ["photos"], maxResultCount: 1 });
      const pl = res && res.places && res.places[0];
      const urls = (pl && pl.photos) ? pl.photos.slice(0, 12).map(p => p.getURI({ maxWidthPx: 1200 })) : [];
      photoCache[k] = urls; return urls;
    } catch (e) { photoCache[k] = []; return []; }
  }
  function svOk(o) { return fetch(svMeta(o)).then(r => r.json()).then(j => !!(j && j.status === "OK")).catch(() => false); }
  async function loadPhotos(o) {
    const own = photosOf(o);
    let urls = await googlePhotos(o); let sv = false;
    if (state.current !== o) return;
    if (!urls || !urls.length) {
      if (KEY && o.lat != null && await svOk(o)) { if (state.current !== o) return; urls = [svStatic(o)]; sv = true; }
      else urls = [];
    }
    const g = (urls || []).map((u, i) => ({ type: "img", src: u, label: sv ? "Street View" : "Google Photo " + (i + 1) }));
    let slides = own.map((p, i) => ({ type: "img", src: p, label: "Photo " + (i + 1) })).concat(g);
    if (!slides.length) slides = [{ type: "add", n: 1 }, { type: "add", n: 2 }, { type: "add", n: 3 }];
    state.slides = slides; renderThumbs();
    if (!own.length) showSlide(0);
  }
  const photosOf = (o) => (o.photos && o.photos.length ? o.photos : (o.photo ? [o.photo] : []));

  function matchQ(o) {
    if (!state.q) return true;
    const sc = (o.scenes || []).map(id => (sceneById(id) || {}).name || id).join(" ");
    const hay = (o.name + " " + (o.town || "") + " " + (o.address || "") + " " + (o.notes || "") + " " + sc + " " + o.region).toLowerCase();
    return hay.includes(state.q.toLowerCase());
  }
  function passFilter(o) {
    const f = state.filter;
    if (f === "all") return true;
    if (f === "fav") return isFav(o);
    if (f === "cleared") return getStatus(o) === "cleared";
    if (f === "uncleared") return getStatus(o) !== "cleared";
    return getStatus(o) === f;
  }
  function filtered() {
    return OPTIONS.filter(o => state.allRegions || o.region === state.region)
      .filter(o => state.allRegions || !state.area || o.area === state.area)
      .filter(o => state.scene === "all" || (o.scenes && o.scenes.indexOf(state.scene) !== -1))
      .filter(passFilter).filter(matchQ)
      .sort((a, b) => (a.name || "").localeCompare(b.name || ""));
  }
  const inArea = (o) => !state.area || o.area === state.area;
  const sceneCount = (id) => OPTIONS.filter(o => o.region === state.region && inArea(o) && o.scenes && o.scenes.indexOf(id) !== -1).length;
  const areaCount = (sl) => OPTIONS.filter(o => o.region === state.region && o.area === sl).length;

  /* ---- pills / areas / dropdowns ---- */
  function buildPills() {
    const box = $("#pills"); box.innerHTML = "";
    CONFIG.regions.forEach(r => {
      const n = OPTIONS.filter(o => o.region === r.id).length;
      const b = elc("button", "pill", `${esc(r.name)}<span class="c">${n}</span>`);
      b.setAttribute("aria-selected", !state.allRegions && r.id === state.region);
      b.addEventListener("click", () => switchRegion(r.id));
      box.appendChild(b);
    });
    const allb = elc("button", "pill allregions", "All regions");
    allb.setAttribute("aria-selected", state.allRegions);
    allb.addEventListener("click", () => { state.allRegions = !state.allRegions; if (state.allRegions) state.area = null; refresh(); if (state.allRegions) fitPins(); else fitArea(); });
    box.appendChild(allb);
  }
  function buildAreas() {
    const box = $("#areas"); box.innerHTML = "";
    if (state.allRegions) { box.style.display = "none"; return; }
    box.style.display = "flex";
    const r = regionById(state.region);
    const all = elc("button", "apill all", `All ${esc(r.name)}`);
    all.setAttribute("aria-selected", !state.area);
    all.addEventListener("click", () => { state.area = null; refresh(); fitArea(); });
    box.appendChild(all);
    const grp = (label, towns) => {
      if (!towns.length) return;
      box.appendChild(elc("span", "crumb", label));
      towns.forEach(t => {
        const tt = Object.assign({ slug: slug(t.name) }, t);
        const n = areaCount(tt.slug);
        const b = elc("button", "apill" + (label[0] === "A" ? " anchor" : ""),
          `${esc(t.name)}${n ? `<span class="c">${n}</span>` : ""}`);
        b.setAttribute("aria-selected", tt.slug === state.area);
        b.addEventListener("click", () => { state.area = tt.slug; refresh(); fitArea(); });
        box.appendChild(b);
      });
    };
    grp("Anchors:", r.anchorTowns || []);
    grp("Peripherals:", r.peripheralTowns || []);
  }
  function buildSceneSelect() {
    const sel = $("#scene-select"); sel.innerHTML = "";
    const total = OPTIONS.filter(o => (state.allRegions || o.region === state.region) && (state.allRegions || inArea(o))).length;
    sel.appendChild(new Option(`All scenes (${total})`, "all"));
    (CONFIG.scenes || []).forEach(sc => sel.appendChild(new Option(`${sc.name}`, sc.id)));
    sel.value = state.scene;
  }
  function buildFilterSelect() {
    const sel = $("#filter-select"); if (!sel) return; sel.innerHTML = "";
    sel.appendChild(new Option("All", "all"));
    sel.appendChild(new Option("\u2605 Favorites", "fav"));
    sel.appendChild(new Option("Cleared \u2713", "cleared"));
    sel.appendChild(new Option("Not cleared", "uncleared"));
    STATUSES.filter(s => s.id !== "cleared").forEach(s => sel.appendChild(new Option(s.name, s.id)));
    sel.value = state.filter;
  }

  /* ---- list ---- */
  function buildList() {
    state.list = filtered();
    const box = $("#list"); box.innerHTML = "";
    $("#count").textContent = `${state.list.length} location${state.list.length === 1 ? "" : "s"}`;
    if (!state.list.length) { box.appendChild(elc("div", "empty", "No matches.<br>Try All regions, or clear the filter.")); return; }
    state.list.forEach((o) => {
      const st = getStatus(o);
      const row = elc("button", "row st-" + st,
        `<span class="rstar${isFav(o) ? " on" : ""}" data-fav="1">${isFav(o) ? "\u2605" : "\u2606"}</span>` +
        `<span class="rmid"><span class="rn">${esc(o.name)}</span>` +
        `<span class="rs">${esc(o.address || o.town || "")}${state.allRegions ? " \u00B7 " + esc(regionById(o.region).name) : ""}</span></span>` +
        `<span class="rdot" title="${esc(statusName(st))}"></span>`);
      row.dataset.name = o.name; row.dataset.region = o.region;
      row.addEventListener("click", (e) => {
        if (e.target.closest(".rstar")) { toggleFav(o); buildList(); return; }
        openModal(o);
      });
      row.addEventListener("mouseenter", () => { clearTimeout(hoverTimer); hoverTimer = setTimeout(() => previewShow(o), 120); });
      row.addEventListener("mouseleave", () => { clearTimeout(hoverTimer); hoverTimer = setTimeout(previewHide, 200); });
      box.appendChild(row);
    });
  }
  function markSelected(o) { $$(".row").forEach(r => r.classList.toggle("sel", r.dataset.name === (o && o.name) && r.dataset.region === (o && o.region))); }

  /* ---- hover preview ---- */
  function previewShow(o) {
    const box = $("#preview");
    let imgs = photosOf(o).slice(0, 3).map(p => `<img src="${esc(p)}" loading="lazy" alt="">`);
    const cached = photoCache[idOf(o)];
    if (cached && cached.length) imgs = imgs.concat(cached.slice(0, Math.max(0, 3 - imgs.length)).map(u => `<img src="${u}" loading="lazy" alt="">`));
    else if (KEY && o.lat != null) imgs.push(`<img src="${svStatic(o)}" loading="lazy" alt="" onerror="this.style.display='none'">`);
    box.innerHTML = `<div class="pv-name">${esc(o.name)}</div>` +
      `<div class="pv-sub">${esc(o.address || o.town || "")}</div>` +
      `<div class="pv-imgs">${imgs.length ? imgs.join("") : '<div class="pv-none">No photo yet</div>'}</div>` +
      `<div class="pv-hint">click for full size</div>`;
    box.style.display = "block";
  }
  function previewHide() { $("#preview").style.display = "none"; }

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
    if (!state.allRegions) {
      if (t && t.perimeter) baseGroup.addLayer(L.polygon(t.perimeter, { color: r.color, weight: 2.5, dashArray: "6 6", fillColor: r.color, fillOpacity: .05 }));
      if (!state.area) townsOf(r).forEach(tw => townMarker(tw));
      else if (t) townMarker(t, true);
    }
    filtered().forEach(o => {
      if (o.lat == null) return;
      const col = regionById(o.region).color;
      const icon = L.divIcon({ className: "", iconSize: [16, 16], iconAnchor: [8, 8],
        html: `<div style="width:13px;height:13px;border-radius:50%;background:${col};border:2px solid ${isFav(o) ? "#F2C14E" : "#fff"};box-shadow:0 1px 3px rgba(0,0,0,.5)"></div>` });
      const m = L.marker([o.lat, o.lng], { icon }).bindTooltip(o.name, { direction: "top" });
      m.on("click", () => openModal(o));
      m.on("mouseover", () => previewShow(o)); m.on("mouseout", () => setTimeout(previewHide, 200));
      optGroup.addLayer(m); pinByName[idOf(o)] = m;
    });
  }
  function fitArea() {
    const t = selectedTown(); const r = regionById(state.region);
    if (t && t.perimeter) map.flyTo(t.center || [t.lat, t.lng], t.zoom || 16, { duration: .6 });
    else if (t) map.flyTo([t.lat, t.lng], t.zoom || 14, { duration: .6 });
    else map.flyTo(r.center, r.zoom, { duration: .6 });
  }
  function fitPins() {
    const pts = filtered().filter(o => o.lat != null).map(o => [o.lat, o.lng]);
    if (pts.length) map.flyToBounds(pts, { padding: [40, 40], maxZoom: 15, duration: .6 });
  }

  /* ---- gallery / modal ---- */
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
      g.innerHTML = "";
      const im = elc("img"); im.src = s.src; im.loading = "lazy"; im.alt = "";
      im.addEventListener("click", () => openLightbox(s.src));
      g.appendChild(im);
      g.appendChild(elc("span", "slide-label", esc(s.label || "Photo")));
    } else {
      g.innerHTML = `<div class="noimg"><div class="camera">\uD83D\uDCF7</div><div>Photo ${s.n || ""} of 3</div>` +
        `<div class="hint">Add in data.js (<code>photos:[…]</code>) or tap “View photos on Google”.</div></div>`;
    }
    $$("#thumbs .thumb").forEach((t, k) => t.classList.toggle("act", k === i));
  }
  function galStep(d) { const n = state.slides.length; if (!n) return; showSlide((state.slide + d + n) % n); }

  function buildActions(o) {
    const box = $("#d-actions"); box.innerHTML = "";
    const fav = elc("button", "favbtn" + (isFav(o) ? " on" : ""), (isFav(o) ? "\u2605" : "\u2606") + " Favorite");
    fav.addEventListener("click", () => { toggleFav(o); buildActions(o); buildList(); drawMap(); });
    box.appendChild(fav);
    const cur = getStatus(o);
    STATUSES.forEach(s => {
      const b = elc("button", "stbtn st-" + s.id + (cur === s.id ? " on" : ""), s.name);
      b.addEventListener("click", () => { setStatus(o, s.id); buildActions(o); buildList(); drawMap(); });
      box.appendChild(b);
    });
  }
  function buildLogistics(o) {
    const box = $("#d-logistics"); box.innerHTML = "";
    const rows = LOGI.filter(([k]) => o[k]).map(([k, label]) => `<div class="lg"><span class="lgk">${label}</span><span class="lgv">${esc(o[k])}</span></div>`);
    box.innerHTML = rows.join("");
  }
  function openModal(o) {
    state.current = o; previewHide();
    const list = state.list.length ? state.list : filtered();
    state.idx = list.indexOf(o);
    markSelected(o);
    if (pinByName[idOf(o)]) map.flyTo(pinByName[idOf(o)].getLatLng(), Math.max(map.getZoom(), 16), { duration: .5 });
    $("#d-name").textContent = o.name || "Untitled";
    $("#d-addr").textContent = (o.address || o.town || "") + (state.allRegions ? "  ·  " + regionById(o.region).name : "");
    const links = $("#d-links"); links.innerHTML = "";
    links.appendChild(mkLink(mapsLink(o), "\uD83D\uDCF7 View photos on Google", false));
    links.appendChild(mkLink(imgLink(o), "Image search \u2197", true));
    buildActions(o); buildLogistics(o);
    const own = photosOf(o);
    state.slides = own.length ? own.map((p, i) => ({ type: "img", src: p, label: "Photo " + (i + 1) })) : [{ type: "add", n: 1 }, { type: "add", n: 2 }, { type: "add", n: 3 }];
    renderThumbs(); showSlide(0);
    $("#modal").hidden = false;
    loadPhotos(o);
  }
  function mkLink(href, txt, alt) { const a = elc("a", alt ? "alt" : "", txt); a.href = href; a.target = "_blank"; a.rel = "noopener"; return a; }
  function closeModal() { $("#modal").hidden = true; state.current = null; markSelected(null); }
  function step(d) {
    const list = state.list.length ? state.list : filtered(); if (!list.length) return;
    let i = state.idx + d; if (i < 0) i = list.length - 1; if (i >= list.length) i = 0;
    openModal(list[i]);
  }

  /* ---- lightbox ---- */
  let lbZoom = 1;
  function openLightbox(src) { const lb = $("#lightbox"); $("#lb-img").src = src; lbZoom = 1; applyZoom(); lb.hidden = false; }
  function closeLightbox() { $("#lightbox").hidden = true; }
  function applyZoom() { $("#lb-img").style.transform = "scale(" + lbZoom + ")"; }
  function zoomBy(f) { lbZoom = Math.min(6, Math.max(1, lbZoom * f)); applyZoom(); }

  /* ---- switch / refresh ---- */
  function switchRegion(id) {
    state.allRegions = false; state.region = id; state.q = ""; state.scene = "all"; state.filter = "all";
    $("#search").value = "";
    const r = regionById(id);
    state.area = r.defaultArea || null;
    document.documentElement.style.setProperty("--rc", r.color);
    refresh(); fitArea();
  }
  function refresh() {
    const r = regionById(state.region); const t = selectedTown();
    document.documentElement.style.setProperty("--rc", state.allRegions ? "#6b5d47" : r.color);
    $("#loc-label").textContent = state.allRegions ? "All regions" : (t ? t.name : "All " + r.name);
    const rn = $("#rnote"); const note = state.allRegions ? "" : (r.note || "");
    rn.textContent = note; rn.style.display = note ? "block" : "none";
    $$(".pill").forEach((p, i) => { if (i < CONFIG.regions.length) p.setAttribute("aria-selected", !state.allRegions && CONFIG.regions[i].id === state.region); });
    const allp = $(".pill.allregions"); if (allp) allp.setAttribute("aria-selected", state.allRegions);
    buildAreas(); buildSceneSelect(); buildFilterSelect(); buildList(); drawMap();
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
    $("#search").addEventListener("input", (e) => { state.q = e.target.value; buildList(); drawMap(); if (state.q) fitPins(); });
    $("#scene-select").addEventListener("change", (e) => { state.scene = e.target.value; buildList(); drawMap(); });
    $("#filter-select").addEventListener("change", (e) => { state.filter = e.target.value; buildList(); drawMap(); });
    $("#fit").addEventListener("click", () => state.allRegions ? fitPins() : fitArea());
    $("#x").addEventListener("click", closeModal);
    $("#modal-bg").addEventListener("click", closeModal);
    $("#prev").addEventListener("click", () => step(-1));
    $("#next").addEventListener("click", () => step(1));
    $("#gprev").addEventListener("click", () => galStep(-1));
    $("#gnext").addEventListener("click", () => galStep(1));
    // lightbox
    $("#lb-bg").addEventListener("click", closeLightbox);
    $("#lb-close").addEventListener("click", closeLightbox);
    $("#lb-img").addEventListener("click", (e) => { e.stopPropagation(); zoomBy(1.5); });
    $("#lightbox").addEventListener("wheel", (e) => { e.preventDefault(); zoomBy(e.deltaY < 0 ? 1.15 : 1 / 1.15); }, { passive: false });
    document.addEventListener("keydown", (e) => {
      if (!$("#lightbox").hidden) {
        if (e.key === "Escape" || e.key === " ") { e.preventDefault(); closeLightbox(); }
        if (e.key === "+" || e.key === "=") zoomBy(1.25);
        if (e.key === "-") zoomBy(1 / 1.25);
        return;
      }
      if ($("#modal").hidden) return;
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowLeft") galStep(-1);
      if (e.key === "ArrowRight") galStep(1);
      if (e.key === "[") step(-1);
      if (e.key === "]") step(1);
    });
    const tl = $("#tab-list"), tm = $("#tab-map");
    if (tl && tm) {
      tl.addEventListener("click", () => { document.body.classList.remove("show-map"); document.body.classList.add("show-list"); });
      tm.addEventListener("click", () => { document.body.classList.remove("show-list"); document.body.classList.add("show-map"); setTimeout(() => map.invalidateSize(), 120); });
    }
    if (window.innerWidth <= 820) document.body.classList.add("show-list");
    $("#foot").innerHTML = "Photos load from Google (like Maps preview) · hover to peek · click a photo to zoom (space/esc closes) · \u2605 & status save in your browser.";
  });
})();
