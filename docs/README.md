# CALAMITIES — Enchantment Scout

Opens in **Antelope Valley › Rosamond (Enchantment)**. Region tabs (AV / Bakersfield / IE /
High Desert) up top; under AV you can switch **Rosamond** ↔ **All Antelope Valley**. Left = the
location list (search + a **Show ▾** scene filter); center = the map. Click any location for its
photo + address.

## Photos (your own — they lazy-load, so they never slow the site)
1. Drop image files into `photos/` (e.g. `carls-1.jpg`, `carls-2.jpg`).
2. In `data.js`, add to that location: `photos: ["photos/carls-1.jpg","photos/carls-2.jpg"]`
No photo yet = a clean placeholder + a **View photos on Google** button.

## Pins in the right place
- **Rosamond** pins are placed by address (approximate). Exact fix: Google My Maps → three-dot
  menu → **Export to KML** → send it to me and I drop in precise coordinates + your exact boundary.
- **Other regions** are town-level approximate. To fix any pin: right-click it in Google Maps,
  click the coordinates to copy, and paste into that location's `lat`/`lng` in `data.js`.

## Publish
Put `docs` in a GitHub repo → Settings → Pages → Deploy from branch → `main` `/docs` →
send the `https://you.github.io/repo/` link. (Or send the folder; they open `index.html`.)
