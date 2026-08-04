# CALAMITIES — Enchantment Scout

Opens in **Antelope Valley › Rosamond (Enchantment)**. Left = location list, center = map + your
perimeter. Click any location for its **photo (Street View)** + address. Use **Show ▾** to filter by scene.

## Your API key is already set — but RESTRICT it now
Your key is in `data.js`. Because the site is public, lock the key in Google Cloud Console →
Credentials → your key:
- **Application restrictions:** HTTP referrers → `https://*.github.io/*` (and `http://localhost/*`)
- **API restrictions:** Street View Static API + Maps Static API
- Make sure **Street View Static API** is **Enabled** (APIs & Services → Enable APIs).
If photos don't load, it's almost always: API not enabled, or referrer restriction blocking your URL.

## Two views
- **All locations** (default) — every Rosamond spot.
- **Show ▾ → a scene** — only the options tagged for that scene (motel, church, diner, etc.).

## Add your own photo to any location
Drop files in `photos/`, then in `data.js`: `photos: ["photos/carls-1.jpg"]` (shows before Street View).

## Exact pins + exact boundary
Pins are placed by address (close, not pixel-exact); perimeter is traced from your screenshot.
For exact: Google My Maps → three-dot menu → **Export to KML** → send it to me.

## Publish
Put `docs` in a GitHub repo → Settings → Pages → Deploy from branch → `main` `/docs` →
send the `https://you.github.io/repo/` link.
