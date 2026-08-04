/* ============================================================
   CALAMITIES — LOCATION SCOUT  ·  DATA FILE
   ------------------------------------------------------------
   Edit THIS file to add/trim locations. Save, drop into /docs, commit.

   ROSAMOND is loaded from your "ENCHANTMENT LOCATION LIST MAP":
   the perimeter loop + every location, split into two categories
   at the top of the sidebar — "Rosamond Perimeter" & "Rosamond Area".
   Coords are APPROXIMATE (placed by street/address). For exact pins
   + your exact drawn boundary, export your Google My Map as KML and
   I can drop precise values in. Each card's Maps/Street View links
   are address-exact regardless.
   ============================================================ */

const CONFIG = {
  title: "CALAMITIES",
  subtitle: "Location Scout — cheating West Texas in Southern California",
  maxPerScene: 5,

  scenes: [
    { id: "perimeter", name: "\u25C6 Rosamond Perimeter", note: "the boundary loop", inventory: true },
    { id: "area",      name: "\u25C6 Rosamond Area",      note: "inside the perimeter", inventory: true },
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
    { id: "border-plate",   name: "Border / Ju\u00e1rez",    note: "VFX plate — no location" },
    { id: "desert-roads",   name: "Desert Roads",            note: "driving plates, connective" }
  ],

  regions: [
    {
      id: "av",
      name: "Antelope Valley",
      color: "#8A2417",
      crewParking: "Crew parking: Crown Valley Rd, Acton, CA 93510",
      center: [34.66, -118.10], zoom: 9,
      baseAreas: [
        {
          name: "Rosamond \u201cEnchantment\u201d",
          center: [34.8636, -118.1655], zoom: 15,
          ring: [[34.8674,-118.1583],[34.8674,-118.1728],[34.8598,-118.1728],[34.8598,-118.1583]]
        }
      ],
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
      id: "bakersfield", name: "Bakersfield", color: "#B0731A", crewParking: "",
      center: [35.44, -119.05], zoom: 9, baseAreas: [],
      anchorTowns: [
        { name: "Oildale",          lat: 35.4283, lng: -119.0223, note: "11 min" },
        { name: "East Bakersfield", lat: 35.3770, lng: -118.9860, note: "Old Town Kern" }
      ],
      peripheralTowns: [ { name: "McFarland", lat: 35.6788, lng: -119.2290, note: "rodeo stadium · 30 min" } ]
    },
    {
      id: "ie", name: "Inland Empire", color: "#2C6E8F", crewParking: "",
      center: [34.03, -117.35], zoom: 10, baseAreas: [],
      anchorTowns: [
        { name: "San Bernardino", lat: 34.1083, lng: -117.2898 },
        { name: "Riverside",      lat: 33.9806, lng: -117.3755 }
      ],
      peripheralTowns: [
        { name: "Rialto", lat: 34.1064, lng: -117.3703 }, { name: "Banning", lat: 33.9256, lng: -116.8764 },
        { name: "Beaumont", lat: 33.9295, lng: -116.9770 }, { name: "Fontana", lat: 34.0922, lng: -117.4350 },
        { name: "Ontario", lat: 34.0633, lng: -117.6509 }, { name: "Pomona", lat: 34.0551, lng: -117.7500 }
      ]
    },
    {
      id: "highdesert", name: "High Desert", color: "#3E7D4E", crewParking: "",
      center: [34.62, -117.20], zoom: 9, baseAreas: [],
      anchorTowns: [
        { name: "Victorville", lat: 34.5362, lng: -117.2928 }, { name: "Apple Valley", lat: 34.5008, lng: -117.1859 },
        { name: "Lucerne Valley", lat: 34.4436, lng: -116.9714 }, { name: "Adelanto", lat: 34.5828, lng: -117.4092 }
      ],
      peripheralTowns: [ { name: "Barstow", lat: 34.8958, lng: -117.0173 }, { name: "Boron", lat: 35.0000, lng: -117.6503 } ]
    }
  ]
};

/* ============================================================
   LOCATION OPTIONS
   Rosamond loaded from your list (perimeter + area). Add more
   anywhere: region "av|bakersfield|ie|highdesert", scene = an id
   above, status idea|to-scout|scouted|confirmed, lat/lng optional
   (adds a pin), photo optional (file in /photos or a URL).
   ============================================================ */

const OPTIONS = [
  { region:"av", scene:"perimeter", name:"AMT Market (Gas Station)", town:"Rosamond",
    address:"1700 Center St, Rosamond, CA 93560", status:"idea", notes:"gas / mini-mart → Jimbo's", lat:34.8632, lng:-118.1585, photo:"" },
  { region:"av", scene:"perimeter", name:"Las Margaritas Cocina & Cantina", town:"Rosamond",
    address:"2701 Sierra Hwy, Rosamond, CA 93560", status:"idea", notes:"Latino eatery / diner", lat:34.863486, lng:-118.1585, photo:"" },
  { region:"av", scene:"perimeter", name:"Mavericks Sports Bar and Grill", town:"Rosamond",
    address:"2763 Sierra Hwy, Rosamond, CA 93560", status:"idea", notes:"bar / diner", lat:34.864347, lng:-118.1585, photo:"" },
  { region:"av", scene:"perimeter", name:"Pat's Liquor Store", town:"Rosamond",
    address:"2769 Sierra Hwy, Rosamond, CA 93560", status:"idea", notes:"liquor / mini-mart", lat:34.864431, lng:-118.1585, photo:"" },
  { region:"av", scene:"perimeter", name:"K S Grocery", town:"Rosamond",
    address:"2817 Sierra Hwy, Rosamond, CA 93560", status:"idea", notes:"market", lat:34.865097, lng:-118.1585, photo:"" },
  { region:"av", scene:"perimeter", name:"Ricky's Highway Cafe", town:"Rosamond",
    address:"2835 Sierra Hwy, Rosamond, CA 93560", status:"idea", notes:"diner → Green Acres", lat:34.865347, lng:-118.1585, photo:"" },
  { region:"av", scene:"perimeter", name:"Plum Tree Collective", town:"Rosamond",
    address:"2873 Sierra Hwy, Rosamond, CA 93560", status:"idea", notes:"strip anchor", lat:34.865875, lng:-118.1585, photo:"" },
  { region:"av", scene:"perimeter", name:"MRP Auto & Transmission Repair", town:"Rosamond",
    address:"2949 Sierra Hwy, Rosamond, CA 93560", status:"idea", notes:"auto / industrial", lat:34.866931, lng:-118.1585, photo:"" },
  { region:"av", scene:"perimeter", name:"Speed Knocks Boxing", town:"Rosamond",
    address:"2969 Sierra Hwy, Rosamond, CA 93560", status:"idea", notes:"gym / industrial", lat:34.867208, lng:-118.1585, photo:"" },
  { region:"av", scene:"perimeter", name:"Kieffe & Sons Ford Used Cars", town:"Rosamond",
    address:"2969 Sierra Hwy, Rosamond, CA 93560", status:"idea", notes:"car lot", lat:34.867208, lng:-118.15815, photo:"" },
  { region:"av", scene:"perimeter", name:"California Real Estate", town:"Rosamond",
    address:"2978 Diamond St, Rosamond, CA 93560", status:"idea", notes:"office", lat:34.867333, lng:-118.162, photo:"" },
  { region:"av", scene:"perimeter", name:"Karl's Hardware & Rental", town:"Rosamond",
    address:"2700 Diamond St, Rosamond, CA 93560", status:"idea", notes:"hardware → Ace Hardware vibe", lat:34.863472, lng:-118.162, photo:"" },
  { region:"av", scene:"perimeter", name:"The Tire Store - Rosamond", town:"Rosamond",
    address:"1816 W Rosamond Blvd, Rosamond, CA 93560", status:"idea", notes:"industrial", lat:34.8672, lng:-118.162705, photo:"" },
  { region:"av", scene:"perimeter", name:"Reaper Restorations", town:"Rosamond",
    address:"1840 Rosamond Blvd, Rosamond, CA 93560", status:"idea", notes:"auto shop / industrial", lat:34.8672, lng:-118.163575, photo:"" },
  { region:"av", scene:"perimeter", name:"Rosamond Construction Office", town:"Rosamond",
    address:"1858 W Rosamond Blvd, Rosamond, CA 93560", status:"idea", notes:"construction", lat:34.8672, lng:-118.164228, photo:"" },
  { region:"av", scene:"perimeter", name:"Patty's Cafe / On Point Barber", town:"Rosamond",
    address:"2997 Desert St, Rosamond, CA 93560", status:"idea", notes:"cafe / barber", lat:34.867597, lng:-118.1655, photo:"" },
  { region:"av", scene:"perimeter", name:"United States Postal Service", town:"Rosamond",
    address:"1950 W Rosamond Blvd, Rosamond, CA 93560", status:"idea", notes:"civic / post office", lat:34.8672, lng:-118.167563, photo:"" },
  { region:"av", scene:"perimeter", name:"Devonshire Inn Motel", town:"Rosamond",
    address:"2076 W Rosamond Blvd, Rosamond, CA 93560", status:"idea", notes:"MOTEL → Longhorn Inn", lat:34.8672, lng:-118.17213, photo:"" },
  { region:"av", scene:"perimeter", name:"Fosters Freeze", town:"Rosamond",
    address:"2080 W Rosamond Blvd, Rosamond, CA 93560", status:"idea", notes:"diner / neon → Green Acres", lat:34.8672, lng:-118.172275, photo:"" },
  { region:"av", scene:"perimeter", name:"Bryan Manor Apartments", town:"Rosamond",
    address:"2910 B St, Rosamond, CA 93560", status:"idea", notes:"apartment → flashback apt", lat:34.866389, lng:-118.1725, photo:"" },
  { region:"av", scene:"perimeter", name:"The Church On B Street", town:"Rosamond",
    address:"2850 B St, Rosamond, CA 93560", status:"idea", notes:"CHURCH", lat:34.865556, lng:-118.1725, photo:"" },
  { region:"av", scene:"perimeter", name:"Home (across from church)", town:"Rosamond",
    address:"2869 B St, Rosamond, CA 93560", status:"idea", notes:"home", lat:34.865819, lng:-118.1725, photo:"" },
  { region:"av", scene:"perimeter", name:"Corner home (B St & Gobi)", town:"Rosamond",
    address:"2805 B St, Rosamond, CA 93560", status:"idea", notes:"home / corner", lat:34.864931, lng:-118.1725, photo:"" },
  { region:"av", scene:"perimeter", name:"'Happy Bday' house", town:"Rosamond",
    address:"2057 Gobi Ave, Rosamond, CA 93560", status:"idea", notes:"home / party house", lat:34.8652, lng:-118.171441, photo:"" },
  { region:"av", scene:"perimeter", name:"First Baptist Church - Rosamond", town:"Rosamond",
    address:"2787 20th St W, Rosamond, CA 93560", status:"idea", notes:"CHURCH", lat:34.864681, lng:-118.169, photo:"" },
  { region:"av", scene:"perimeter", name:"El Chulo Burgers", town:"Rosamond",
    address:"2787 20th St W, Rosamond, CA 93560", status:"idea", notes:"diner / Latino", lat:34.864681, lng:-118.16865, photo:"" },
  { region:"av", scene:"perimeter", name:"Praise Inn (church)", town:"Rosamond",
    address:"2700 20th St W, Rosamond, CA 93560", status:"idea", notes:"CHURCH", lat:34.863472, lng:-118.169, photo:"" },
  { region:"av", scene:"perimeter", name:"Hummell Community Center", town:"Rosamond",
    address:"2500 20th St W, Rosamond, CA 93560", status:"idea", notes:"civic / community center", lat:34.860694, lng:-118.169, photo:"" },
  { region:"av", scene:"perimeter", name:"Carl's Motel", town:"Rosamond",
    address:"2529 Sierra Hwy, Rosamond, CA 93560", status:"idea", notes:"MOTEL → Longhorn Inn", lat:34.861097, lng:-118.1585, photo:"" },
  { region:"av", scene:"perimeter", name:"Dollar General", town:"Rosamond",
    address:"2475 Sierra Hwy, Rosamond, CA 93560", status:"idea", notes:"store", lat:34.860347, lng:-118.1585, photo:"" },
  { region:"av", scene:"perimeter", name:"Joshua Motel", town:"Rosamond",
    address:"2561 Sierra Hwy, Rosamond, CA 93560", status:"idea", notes:"MOTEL → Longhorn Inn", lat:34.861542, lng:-118.1585, photo:"" },
  { region:"av", scene:"perimeter", name:"Rosamond Auto Sales", town:"Rosamond",
    address:"2609 Sierra Hwy, Rosamond, CA 93560", status:"idea", notes:"car lot", lat:34.862208, lng:-118.1585, photo:"" },
  { region:"av", scene:"perimeter", name:"Mr Donut & More", town:"Rosamond",
    address:"2689 Sierra Hwy, Rosamond, CA 93560", status:"idea", notes:"diner / donut shop", lat:34.863319, lng:-118.1585, photo:"" },
  { region:"av", scene:"area", name:"Desert Search and Rescue", town:"Rosamond",
    address:"2980 Desert St, Rosamond, CA 93560", status:"idea", notes:"civic / sheriff-adjacent", lat:34.867361, lng:-118.1655, photo:"" },
  { region:"av", scene:"area", name:"Home (corner of Center)", town:"Rosamond",
    address:"2700 Desert St, Rosamond, CA 93560", status:"idea", notes:"home", lat:34.863472, lng:-118.1655, photo:"" },
  { region:"av", scene:"area", name:"Family Faith Center Church of God", town:"Rosamond",
    address:"2572 Desert St, Rosamond, CA 93560", status:"idea", notes:"CHURCH", lat:34.861694, lng:-118.1655, photo:"" },
  { region:"av", scene:"area", name:"Hall Ambulance Rosamond Station", town:"Rosamond",
    address:"2970 Diamond St, Rosamond, CA 93560", status:"idea", notes:"ambulance → hospital-adjacent", lat:34.867222, lng:-118.162, photo:"" },
  { region:"av", scene:"area", name:"Building", town:"Rosamond",
    address:"2924 Diamond St, Rosamond, CA 93560", status:"idea", notes:"building", lat:34.866583, lng:-118.162, photo:"" },
  { region:"av", scene:"area", name:"Deluxe Auto Interiors", town:"Rosamond",
    address:"2951 Diamond St, Rosamond, CA 93560", status:"idea", notes:"auto / industrial", lat:34.866958, lng:-118.162, photo:"" },
  { region:"av", scene:"area", name:"Adobe Church (1933)", town:"Rosamond",
    address:"1746 Locust St, Rosamond, CA 93560", status:"idea", notes:"PERIOD CHURCH — 1933 adobe", lat:34.862, lng:-118.160168, photo:"" },
  { region:"av", scene:"area", name:"Plane Building", town:"Rosamond",
    address:"2873 Diamond St, Rosamond, CA 93560", status:"idea", notes:"quirky / industrial", lat:34.865875, lng:-118.162, photo:"" },
  { region:"av", scene:"area", name:"Rosamond Chamber of Commerce", town:"Rosamond",
    address:"2861 Diamond St, Rosamond, CA 93560", status:"idea", notes:"civic", lat:34.865708, lng:-118.162, photo:"" },
  { region:"av", scene:"area", name:"Rosamond Self-Service Car Wash", town:"Rosamond",
    address:"2825 Diamond St, Rosamond, CA 93560", status:"idea", notes:"car wash", lat:34.865208, lng:-118.162, photo:"" },
  { region:"av", scene:"area", name:"Prime Auto Parts", town:"Rosamond",
    address:"2769 Diamond St, Rosamond, CA 93560", status:"idea", notes:"auto", lat:34.864431, lng:-118.162, photo:"" },
  { region:"av", scene:"area", name:"Bucketloader Lot", town:"Rosamond",
    address:"2760 Diamond St, Rosamond, CA 93560", status:"idea", notes:"lot / industrial", lat:34.864306, lng:-118.162, photo:"" },
  { region:"av", scene:"area", name:"E&N General Discount Store (closed)", town:"Rosamond",
    address:"2743 Diamond St, Rosamond, CA 93560", status:"idea", notes:"closed store → supermarket-lot vibe", lat:34.864069, lng:-118.162, photo:"" },
  { region:"av", scene:"area", name:"Diamond Hair Designs", town:"Rosamond",
    address:"2748 Diamond St, Rosamond, CA 93560", status:"idea", notes:"salon", lat:34.864139, lng:-118.162, photo:"" },
  { region:"av", scene:"area", name:"Construction Lot", town:"Rosamond",
    address:"2704 Diamond St, Rosamond, CA 93560", status:"idea", notes:"lot", lat:34.863528, lng:-118.162, photo:"" },
  { region:"av", scene:"area", name:"Rosamond Liquor Market", town:"Rosamond",
    address:"2671 Diamond St, Rosamond, CA 93560", status:"idea", notes:"market", lat:34.863069, lng:-118.162, photo:"" },
  { region:"av", scene:"area", name:"Aqua Azul", town:"Rosamond",
    address:"2660 Diamond St, Rosamond, CA 93560", status:"idea", notes:"business", lat:34.862917, lng:-118.162, photo:"" },
  { region:"av", scene:"area", name:"Rosamond Cleaners", town:"Rosamond",
    address:"2650 Diamond St, Rosamond, CA 93560", status:"idea", notes:"cleaners", lat:34.862778, lng:-118.162, photo:"" },
  { region:"av", scene:"area", name:"Rosamond Community Center", town:"Rosamond",
    address:"2645 Diamond St, Rosamond, CA 93560", status:"idea", notes:"civic", lat:34.862708, lng:-118.162, photo:"" },
  { region:"av", scene:"area", name:"J's Hideaway Restaurant & Bar", town:"Rosamond",
    address:"2635 Diamond St, Rosamond, CA 93560", status:"idea", notes:"diner / bar → Her's Hideaway", lat:34.862569, lng:-118.162, photo:"" },
  { region:"av", scene:"area", name:"The Green Mile Collective", town:"Rosamond",
    address:"2613 Diamond St, Rosamond, CA 93560", status:"idea", notes:"dispensary", lat:34.862264, lng:-118.162, photo:"" },
  { region:"av", scene:"area", name:"Ol' Dusty Sales Yard", town:"Rosamond",
    address:"1963 Locust St, Rosamond, CA 93560", status:"idea", notes:"sales yard → Western / industrial", lat:34.862, lng:-118.168034, photo:"" },
  { region:"av", scene:"area", name:"Blue Home", town:"Rosamond",
    address:"1923 Locust St, Rosamond, CA 93560", status:"idea", notes:"home", lat:34.862, lng:-118.166584, photo:"" },
  { region:"av", scene:"area", name:"Nice-View Home", town:"Rosamond",
    address:"1938 Poplar St, Rosamond, CA 93560", status:"idea", notes:"home", lat:34.8646, lng:-118.167128, photo:"" },
  { region:"av", scene:"area", name:"Revival Center Lot", town:"Rosamond",
    address:"1732 Gobi Ave, Rosamond, CA 93560", status:"idea", notes:"church lot", lat:34.8652, lng:-118.15966, photo:"" },
  { region:"av", scene:"area", name:"Hachiban Ramen Sushi Bar & Grill", town:"Rosamond",
    address:"2763 Sierra Hwy, Rosamond, CA 93560", status:"idea", notes:"restaurant", lat:34.864347, lng:-118.15815, photo:"" },
  { region:"av", scene:"area", name:"Brick Home", town:"Rosamond",
    address:"1857 Center St, Rosamond, CA 93560", status:"idea", notes:"home", lat:34.8632, lng:-118.164191, photo:"" },
  { region:"av", scene:"area", name:"El Coyote Cantina & Cocina (closed)", town:"Rosamond",
    address:"2701 Sierra Hwy, Rosamond, CA 93560", status:"idea", notes:"closed cantina", lat:34.863486, lng:-118.15815, photo:"" },
  { region:"av", scene:"area", name:"'Texas Shit' House", town:"Rosamond",
    address:"1954 Elm St, Rosamond, CA 93560", status:"idea", notes:"HOME → Annie's house / Texas home", lat:34.8612, lng:-118.167708, photo:"" }
];
