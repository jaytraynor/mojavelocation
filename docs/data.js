/* ============================================================
   CALAMITIES — LOCATION SCOUT  ·  DATA FILE
   ------------------------------------------------------------
   This is the ONLY file you edit day-to-day.
   1) Add your location options to the OPTIONS list at the bottom.
   2) Save, drag this file into your repo's /docs, commit — done.
   Everything else (index.html, app.js, styles.css) stays untouched.
   ============================================================ */

const CONFIG = {
  title: "CALAMITIES",
  subtitle: "Location Scout — cheating West Texas in Southern California",
  maxPerScene: 5,           // hard cap per scene, per region

  /* The scenes. Edit names/notes here if the script list changes. */
  scenes: [
    { id: "slaughterhouse", name: "Monty's Slaughterhouse", note: "industrial exterior + kill-floor build" },
    { id: "annies-house",   name: "Annie's House",          note: "rural home, open desert behind" },
    { id: "main-street",    name: "Main Street / Dead Town", note: "vacant retail, signage" },
    { id: "church",         name: "Church (Spirit First)",   note: "changeable letter-board sign" },
    { id: "high-school",    name: "High School (Sam Houston)", note: "" },
    { id: "gas-station",    name: "Gas Station (Jimbo's)",   note: "mom & pop + mini-mart" },
    { id: "myrtles-ranch",  name: "Grandma Myrtle's Ranch",  note: "isolated homestead" },
    { id: "motel",          name: "Longhorn Inn Motel",      note: "+ pool + explosion lot" },
    { id: "green-acres",    name: "Green Acres Diner",       note: "green neon" },
    { id: "red-eye-ranch",  name: "Red Eye Ranch / Grazeland", note: "cattle" },
    { id: "hospital",       name: "Enchantment Hospital",    note: "" },
    { id: "sheriff",        name: "Sheriff's Station",       note: "bullpen + office" },
    { id: "hilton",         name: "El Paso Hilton",          note: "ballroom + suite" },
    { id: "bank",           name: "First National Bank",     note: "lobby + vault" },
    { id: "texaco",         name: "Texaco (night)",          note: "rattier roadside station" },
    { id: "rodeo",          name: "Rodeo Fairgrounds",       note: "arena + rider trailers" },
    { id: "track-home",     name: "Track Home (massacre)",   note: "Latino tract, Mary-Star's" },
    { id: "hideout",        name: "Her's Hideout",           note: "small commandeered home" },
    { id: "wyden-home",     name: "Wyden's New Home",        note: "barren new build" },
    { id: "diner-lot",      name: "Diner Lot + DPS Car",     note: "" },
    { id: "vet-clinic",     name: "Veterinary Clinic",       note: "caged dogs" },
    { id: "press-church",   name: "Church — Press Conf.",    note: "big lot, crowd" },
    { id: "flashback-apt",  name: "Flashback Apartment",     note: "drug-den dress" },
    { id: "border-plate",   name: "Border / Juárez",         note: "VFX plate — no location" },
    { id: "desert-roads",   name: "Desert Roads",            note: "driving plates, connective" }
  ],

  /* Regions/bases with approximate town-center coordinates for the map.
     Only towns are pre-loaded — no scene locations. */
  regions: [
    {
      id: "av",
      name: "Antelope Valley",
      color: "#8A2417",
      crewParking: "Crew parking: Crown Valley Rd, Acton, CA 93510",
      center: [34.66, -118.10], zoom: 9,
      anchorTowns: [
        { name: "Lancaster", lat: 34.6868, lng: -118.1542 },
        { name: "Palmdale",  lat: 34.5794, lng: -118.1165 }
      ],
      peripheralTowns: [
        { name: "Mojave",                 lat: 35.0525, lng: -118.1740, note: "" },
        { name: "Rosamond",               lat: 34.8642, lng: -118.1631, note: "motel / gas / mine" },
        { name: "Antelope Acres",         lat: 34.7647, lng: -118.2842, note: "rural" },
        { name: "Quartz Hill",            lat: 34.6444, lng: -118.2176, note: "" },
        { name: "Littlerock / Pearblossom", lat: 34.5137, lng: -117.9472, note: "" },
        { name: "Acton",                  lat: 34.4703, lng: -118.1968, note: "30 mi" }
      ]
    },
    {
      id: "bakersfield",
      name: "Bakersfield",
      color: "#B0731A",
      crewParking: "",
      center: [35.44, -119.05], zoom: 9,
      anchorTowns: [
        { name: "Oildale",         lat: 35.4283, lng: -119.0223, note: "11 min" },
        { name: "East Bakersfield", lat: 35.3770, lng: -118.9860, note: "Old Town Kern" }
      ],
      peripheralTowns: [
        { name: "McFarland", lat: 35.6788, lng: -119.2290, note: "rodeo stadium · 30 min" }
      ]
    },
    {
      id: "ie",
      name: "Inland Empire",
      color: "#2C6E8F",
      crewParking: "",
      center: [34.03, -117.35], zoom: 10,
      anchorTowns: [
        { name: "San Bernardino", lat: 34.1083, lng: -117.2898 },
        { name: "Riverside",      lat: 33.9806, lng: -117.3755 }
      ],
      peripheralTowns: [
        { name: "Rialto",   lat: 34.1064, lng: -117.3703, note: "" },
        { name: "Banning",  lat: 33.9256, lng: -116.8764, note: "" },
        { name: "Beaumont", lat: 33.9295, lng: -116.9770, note: "" },
        { name: "Fontana",  lat: 34.0922, lng: -117.4350, note: "" },
        { name: "Ontario",  lat: 34.0633, lng: -117.6509, note: "" },
        { name: "Pomona",   lat: 34.0551, lng: -117.7500, note: "" }
      ]
    },
    {
      id: "highdesert",
      name: "High Desert",
      color: "#3E7D4E",
      crewParking: "",
      center: [34.62, -117.20], zoom: 9,
      anchorTowns: [
        { name: "Victorville",   lat: 34.5362, lng: -117.2928 },
        { name: "Apple Valley",  lat: 34.5008, lng: -117.1859 },
        { name: "Lucerne Valley", lat: 34.4436, lng: -116.9714 },
        { name: "Adelanto",      lat: 34.5828, lng: -117.4092 }
      ],
      peripheralTowns: [
        { name: "Barstow", lat: 34.8958, lng: -117.0173, note: "" },
        { name: "Boron",   lat: 35.0000, lng: -117.6503, note: "" }
      ]
    }
  ]
};

/* ============================================================
   YOUR LOCATION OPTIONS   (max 5 per scene, per region)
   ------------------------------------------------------------
   Copy the template block, fill it in, add it to the list.
   - region: "av" | "bakersfield" | "ie" | "highdesert"
   - scene:  must match a scene id from CONFIG.scenes above
   - status: "idea" | "to-scout" | "scouted" | "confirmed"
   - lat/lng: OPTIONAL. Add them and a pin appears on the map.
   - photo:  OPTIONAL. A filename in /docs/photos (e.g. "tropico.jpg")
             or a full URL. Leave "" for a placeholder.
   ============================================================ */

const OPTIONS = [

  /*  ——— TEMPLATE (copy me) ———
  {
    region:  "av",
    scene:   "slaughterhouse",
    name:    "Place name",
    town:    "Lancaster",
    address: "123 Example Rd, Lancaster, CA 93534",
    status:  "idea",
    notes:   "why it works / access notes",
    lat:     34.6868,
    lng:     -118.1542,
    photo:   ""
  },
  */

];
