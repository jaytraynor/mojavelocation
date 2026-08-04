# CALAMITIES — Enchantment Scout

Opens in **Antelope Valley › Rosamond (Enchantment)**. Left = searchable location list,
center = map with your perimeter + pins. Click any location for its photo + address.

## Get real photos (the fix for broken Street View) — ~5 min, free
1. Go to console.cloud.google.com → create a project.
2. APIs & Services → **Enable APIs** → enable **Street View Static API** (and **Maps Static API**).
3. Credentials → Create credentials → **API key** → copy it.
4. In `data.js`, paste it: `googleMapsKey: "YOUR_KEY_HERE"`.
Now every pin auto-shows a real Street View photo that actually loads.
(Free tier easily covers this — a few dollars of credit max, and Google gives $200/mo free.)

## Prefer your own photos
Drop images in `photos/`, then in `data.js` add to a location:
`photos: ["photos/carls-1.jpg","photos/carls-2.jpg"]` — those show first.

## Exact pins + your exact boundary
Pins are placed by address (approximate) and the perimeter is traced from your screenshot.
For pixel-exact pins and your exact drawn shape: in Google My Maps, three-dot menu →
**Export to KML** → send me the file → I drop in precise coordinates.

## Send it to the producer
Best: put the `docs` folder in a GitHub repo → Settings → Pages → Deploy from branch →
`main` `/docs`. Send the `https://you.github.io/repo/` link.
Quick: send the `docs` folder; they open `index.html` (needs internet).
