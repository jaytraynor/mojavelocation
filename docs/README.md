# CALAMITIES — Enchantment Scout

Opens on Enchantment (Rosamond). Region tabs + "All regions" up top; each region's Anchor/Peripheral
TOWNS are clickable sub-sections. Click a location for photos + logistics.

## Working features
- **Hover a location** (list or pin) → a preview pops up on the right showing its photos.
- **Click a photo** → full-size lightbox; scroll or click to zoom; **space/esc** closes.
- **★ Favorites** and **status** (Idea → Scouting → Scouted → Cleared → Rejected) — toggle in the
  detail panel; they save in your browser. Filter by them with the **Filter** dropdown.
- **Search** matches name, address, town, notes, and scene names. Turn on **All regions** to search
  everywhere at once.
- **Show** dropdown filters by scene.

## Photos (your own)
Drop files in `photos/`, list up to 3 per place: `photos: ["photos/x-1.jpg","photos/x-2.jpg","photos/x-3.jpg"]`.
Size: ~1600–2560px wide JPG, 1–3 MB is fine (they lazy-load).

## Logistics fields (optional, per location in data.js)
`contact`, `permit`, `access`, `bestTime`, `parking`, `power`, `cost`, `info` — any you add show in the
detail panel. `status` and `cleared` can be set live in the UI.

## Street View key
Set in `data.js`. RESTRICT it: Google Cloud Console → your key → HTTP referrers `https://*.github.io/*`,
API restrictions = Street View Static + Maps Static.

## Publish
`docs` → GitHub repo → Settings → Pages → main `/docs` → share the link.
