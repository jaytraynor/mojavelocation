# CALAMITIES — Enchantment Scout

Opens on Enchantment (Rosamond). 5 region tabs + "All regions"; each region's Anchor/Peripheral
TOWNS are clickable sub-sections. On phones, use the **List / Map** toggle.

## Photos come from Google (nothing to host)
Open a location and it pulls that place's **Google photo slideshow** (like the Maps preview) — swipe
with the ‹ › arrows. Click a photo to zoom (space/esc closes). No storage, no big zip.
For this to work the API key needs, in Google Cloud Console:
  - **Enable:** "Maps JavaScript API" **and** "Places API (New)"  (also "Street View Static API" for fallback)
  - **Restrict the key:** Application restrictions → HTTP referrers → `https://*.github.io/*` (+ `http://localhost/*`)
Cost: Google's $200/month free credit easily covers this; photos load on click and are cached.

Want your own photo on a featured place? Drop it in `photos/` and add `photos:["photos/x.jpg"]` — it shows first.

## Working features
- **Hover** a location → preview pops on the right. **Search** matches name/address/town/scene.
- **All regions** tab searches everywhere at once.
- **★ Favorites** + **status** (Idea→Scouting→Scouted→Cleared→Rejected) save in your browser; filter by them.
- **Show** = filter by scene. **Filter** = favorites / cleared / status.
- **Logistics** per location in data.js: contact, permit, access, bestTime, parking, power, cost, info.

## Scenes
AV pins came from your KML (exact coords, your names) by town. Scene tags are AUTO right now —
send me your scene list (the red PDF) and I'll make each scene show exactly the places you picked.

## Publish
`docs` → GitHub repo → Settings → Pages → main `/docs` → share the link.
