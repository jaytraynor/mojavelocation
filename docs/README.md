# CALAMITIES — Enchantment Scout

A simple map + clickable location list for the shoot. Opens in **Enchantment (Rosamond)**.

## Using it
- Left = the location list (search at the top). Center = the map with your perimeter + pins.
- **Click any location** (list row or map pin) to open it: photos (Street View), address, notes,
  and buttons — **Open in Maps**, **Street View**, **More photos** (Google Images).
- **⌖ Enchantment** button re-zooms the map to the Rosamond perimeter.
- Top-right pills switch regions (Antelope Valley is the built-out one).

## Add your own photos (optional but best for the producer)
1. Drop image files into the **photos/** folder (e.g. `carls-1.jpg`, `carls-2.jpg`).
2. In `data.js`, find that location and add a `photos` list:
   ```js
   photos: ["photos/carls-1.jpg", "photos/carls-2.jpg"]
   ```
   Those show first in the gallery. With no photos, it auto-shows Street View.

## Add or edit a location
In `data.js`, `OPTIONS` list:
```js
{ region:"av", scene:"perimeter", name:"Carl's Motel", town:"Rosamond",
  address:"2529 Sierra Hwy, Rosamond, CA 93560", status:"to-scout",
  notes:"MOTEL → Longhorn Inn", lat:34.85, lng:-118.16, photos:[] }
```

## Send it to the producer (pick one)
- **Best — a live link:** put the `docs` folder in a GitHub repo → Settings → Pages →
  Deploy from branch → `main` `/docs`. You get `https://<you>.github.io/<repo>/`. Send that URL.
- **Quick — the folder:** send the whole `docs` folder; they open `index.html` (needs internet).

## Exact pins (recommended)
Pin positions are placed by address (approximate). For precise pins + your exact drawn
boundary, export your Google My Map as **KML** and drop the coordinates into `data.js`.
