# CALAMITIES — Location Scout

A map + region + scene board for the location search. **You only ever edit `data.js`.**

## Add a location
Open `data.js`, scroll to the `OPTIONS` list at the bottom, copy the template block, fill it in:

```js
{
  region:  "av",              // av | bakersfield | ie | highdesert
  scene:   "motel",           // must match a scene id in CONFIG.scenes
  name:    "Carl's Motel",
  town:    "Rosamond",
  address: "2529 Sierra Hwy, Rosamond, CA 93560",
  status:  "to-scout",        // idea | to-scout | scouted | confirmed
  notes:   "Old motor court, park-at-door, lot for the explosion.",
  lat:     34.8501,           // optional — adds a map pin
  lng:     -118.1637,
  photo:   "photos/carls.jpg" // optional — file in /photos or a URL
}
```

- **Cap:** 5 options per scene, per region. Keep it to your best few.
- **Pins** appear only when you add `lat`/`lng`. Grab coords from Google Maps (right-click a spot → the numbers at top → paste).
- **Photos:** drop image files in `docs/photos/` and reference `photos/name.jpg`, or paste any image URL. No photo = a placeholder card.

## Preview it
Double-click `index.html` (needs internet for the map tiles + fonts). Everything renders locally.

## Publish free on GitHub Pages
1. Put this `docs` folder in your repo (root is fine too — see below).
2. Repo → **Settings → Pages → Source: Deploy from a branch → Branch: main / `/docs`**.
3. Save. Your site is live at `https://<you>.github.io/<repo>/`.
4. To update: change `data.js` (or drop in photos), commit, push. Live in ~1 min.

*If you'd rather serve from the repo root, move the contents of `docs/` to the root and set Pages source to `/ (root)`.*

## What's pre-loaded
Regions, anchor/peripheral towns, crew parking, and the scene list — **no scene locations yet** (that's your part). Town markers are approximate town centers just to orient the map.
