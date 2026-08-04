/* ============================================================
   CALAMITIES — LOCATION SCOUT · DATA FILE
   ------------------------------------------------------------
   ROSAMOND pins + boundary are now EXACT (from your Enchantment.kml).
   Street View is on (googleMapsKey set) — with exact coords it shows
   the right building. RESTRICT the key in Google Cloud Console:
     HTTP referrers -> https://*.github.io/*  (+ localhost)
     API restrictions -> Street View Static API + Maps Static API
   PHOTOS: up to 3 of your own per place override Street View:
     photos: ["photos/carls-1.jpg","photos/carls-2.jpg","photos/carls-3.jpg"]
   Other bases show your anchor/peripheral TOWNS (add locations later).
   ============================================================ */

const CONFIG = {
  title: "CALAMITIES",
  subtitle: "Location Scout",
  googleMapsKey: "AIzaSyDM5JNRlHkIRkK4YCcUJcVYFjrRj0ZBGLQ",

  scenes: [
    { id: "slaughterhouse", name: "Monty's Slaughterhouse" },
    { id: "annies-house",   name: "Annie's House" },
    { id: "main-street",    name: "Main Street / Dead Town" },
    { id: "church",         name: "Church (Spirit First)" },
    { id: "high-school",    name: "High School" },
    { id: "gas-station",    name: "Gas Station (Jimbo's)" },
    { id: "myrtles-ranch",  name: "Grandma Myrtle's Ranch" },
    { id: "motel",          name: "Longhorn Inn Motel" },
    { id: "green-acres",    name: "Green Acres Diner" },
    { id: "red-eye-ranch",  name: "Red Eye Ranch / Grazeland" },
    { id: "hospital",       name: "Hospital" },
    { id: "sheriff",        name: "Sheriff's Station / Civic" },
    { id: "hilton",         name: "El Paso Hilton (ballroom)" },
    { id: "bank",           name: "First National Bank" },
    { id: "texaco",         name: "Texaco (night)" },
    { id: "rodeo",          name: "Rodeo Fairgrounds" },
    { id: "track-home",     name: "Track Home (massacre)" },
    { id: "hideout",        name: "Her's Hideout" },
    { id: "wyden-home",     name: "Wyden's New Home" },
    { id: "diner-lot",      name: "Diner Lot + DPS Car" },
    { id: "vet-clinic",     name: "Veterinary Clinic" },
    { id: "press-church",   name: "Church — Press Conference" },
    { id: "flashback-apt",  name: "Flashback Apartment" },
    { id: "border-plate",   name: "Border / Juarez (VFX)" },
    { id: "desert-roads",   name: "Desert Roads" }
  ],

  regions: [
    {
      id: "av", name: "Antelope Valley", color: "#8A2417",
      note: "Basecamp / parking: Lancaster or Palmdale (not Acton).",
      center: [34.66, -118.12], zoom: 9,
      areas: [
        { id: "rosamond", name: "Rosamond \u2014 Enchantment", center: [34.86089, -118.166314], zoom: 16,
          perimeter: [ [34.864308, -118.169063], [34.861148, -118.169031], [34.861192, -118.167153], [34.857123, -118.167087], [34.857141, -118.162216], [34.86443, -118.163332] ]
        }
      ],
      anchorTowns: [
        { name: "Lancaster", lat: 34.6868, lng: -118.1542 },
        { name: "Palmdale",  lat: 34.5794, lng: -118.1165 }
      ],
      peripheralTowns: [
        { name: "Rosamond", lat: 34.8642, lng: -118.1631 },
        { name: "Antelope Acres", lat: 34.7647, lng: -118.2842 },
        { name: "Quartz Hill", lat: 34.6444, lng: -118.2176 },
        { name: "Mojave", lat: 35.0525, lng: -118.1740 },
        { name: "Littlerock / Pearblossom", lat: 34.5137, lng: -117.9472 },
        { name: "Acton", lat: 34.4703, lng: -118.1968 }
      ]
    },
    {
      id: "bakersfield", name: "Bakersfield", color: "#B0731A",
      note: "Rodeo = Kern County Fair (in Bakersfield).",
      center: [35.35, -119.10], zoom: 9, areas: [],
      anchorTowns: [
        { name: "Bakersfield", lat: 35.3733, lng: -119.0187 },
        { name: "Oildale", lat: 35.4283, lng: -119.0223 },
        { name: "East Bakersfield (Old Town)", lat: 35.3770, lng: -118.9860 }
      ],
      peripheralTowns: [
        { name: "Taft / Maricopa", lat: 35.1425, lng: -119.4568 },
        { name: "Arvin / Lamont / Weedpatch", lat: 35.2091, lng: -118.8283 },
        { name: "McFarland (cattle salesyard)", lat: 35.6788, lng: -119.2290 },
        { name: "Buttonwillow / Lost Hills", lat: 35.4003, lng: -119.4718 }
      ]
    },
    {
      id: "ie", name: "Inland Empire", color: "#2C6E8F",
      note: "Colton = hospital (Arrowhead). West vs East peripherals.",
      center: [34.02, -117.30], zoom: 9, areas: [],
      anchorTowns: [
        { name: "San Bernardino", lat: 34.1083, lng: -117.2898 },
        { name: "Riverside", lat: 33.9806, lng: -117.3755 },
        { name: "Colton (hospital)", lat: 34.0739, lng: -117.3136 }
      ],
      peripheralTowns: [
        { name: "Rialto", lat: 34.1064, lng: -117.3703 },
        { name: "Fontana", lat: 34.0922, lng: -117.4350 },
        { name: "Ontario", lat: 34.0633, lng: -117.6509 },
        { name: "Pomona", lat: 34.0551, lng: -117.7500 },
        { name: "Banning", lat: 33.9256, lng: -116.8764 },
        { name: "Beaumont", lat: 33.9295, lng: -116.9770 }
      ]
    },
    {
      id: "highdesert", name: "High Desert", color: "#3E7D4E",
      note: "",
      center: [34.66, -117.10], zoom: 8, areas: [],
      anchorTowns: [
        { name: "Victorville", lat: 34.5362, lng: -117.2928 },
        { name: "Apple Valley", lat: 34.5008, lng: -117.1859 }
      ],
      peripheralTowns: [
        { name: "Barstow", lat: 34.8958, lng: -117.0173 },
        { name: "Boron", lat: 35.0000, lng: -117.6503 },
        { name: "Lucerne Valley", lat: 34.4436, lng: -116.9714 },
        { name: "Adelanto", lat: 34.5828, lng: -117.4092 },
        { name: "Oro Grande", lat: 34.6089, lng: -117.3389 },
        { name: "Newberry Springs", lat: 34.8281, lng: -116.6872 }
      ]
    }
  ]
};

const OPTIONS = [
  { region:"av", area:"rosamond", name:"Las Margaritas Cocina & Cantina", town:"Rosamond", address:"2701 Sierra Hwy, Rosamond, CA 93560",
    status:"idea", notes:"Latino eatery / diner", scenes:["diner-lot", "green-acres"], lat:34.860432, lng:-118.163032, photos:[] },
  { region:"av", area:"rosamond", name:"Mavericks Sports Bar and Grill", town:"Rosamond", address:"2763 Sierra Hwy, Rosamond, CA 93560",
    status:"idea", notes:"bar / diner", scenes:["diner-lot", "green-acres"], lat:34.861234, lng:-118.163238, photos:[] },
  { region:"av", area:"rosamond", name:"AMT Market (Gas Station)", town:"Rosamond", address:"1700 Center St, Rosamond, CA 93560",
    status:"idea", notes:"gas / mini-mart", scenes:["gas-station"], lat:34.85983, lng:-118.163083, photos:[] },
  { region:"av", area:"rosamond", name:"Pat's Liquor Store", town:"Rosamond", address:"2769 Sierra Hwy, Rosamond, CA 93560",
    status:"idea", notes:"liquor / mini-mart", scenes:["gas-station"], lat:34.861306, lng:-118.163011, photos:[] },
  { region:"av", area:"rosamond", name:"K S Grocery", town:"Rosamond", address:"2817 Sierra Hwy, Rosamond, CA 93560",
    status:"idea", notes:"market / grocery", scenes:["gas-station"], lat:34.861801, lng:-118.16312, photos:[] },
  { region:"av", area:"rosamond", name:"Ricky's Highway Cafe", town:"Rosamond", address:"2835 Sierra Hwy, Rosamond, CA 93560",
    status:"idea", notes:"diner / cafe", scenes:["diner-lot", "green-acres"], lat:34.862107, lng:-118.163238, photos:[] },
  { region:"av", area:"rosamond", name:"Plum Tree Collective", town:"Rosamond", address:"2873 Sierra Hwy, Rosamond, CA 93560",
    status:"idea", notes:"strip anchor", scenes:["main-street"], lat:34.862528, lng:-118.163184, photos:[] },
  { region:"av", area:"rosamond", name:"MRP Auto & Transmission Repair", town:"Rosamond", address:"2949 Sierra Hwy, Rosamond, CA 93560",
    status:"idea", notes:"auto / industrial", scenes:["hideout", "slaughterhouse"], lat:34.863555, lng:-118.163398, photos:[] },
  { region:"av", area:"rosamond", name:"Kieffe & Sons Ford Used Cars", town:"Rosamond", address:"2969 Sierra Hwy, Rosamond, CA 93560",
    status:"idea", notes:"car lot", scenes:["hideout", "slaughterhouse"], lat:34.863763, lng:-118.163518, photos:[] },
  { region:"av", area:"rosamond", name:"California Real Estate", town:"Rosamond", address:"2978 Diamond St, Rosamond, CA 93560",
    status:"idea", notes:"office", scenes:[], lat:34.864135, lng:-118.164412, photos:[] },
  { region:"av", area:"rosamond", name:"Karl's Hardware & Rental", town:"Rosamond", address:"2700 Diamond St, Rosamond, CA 93560",
    status:"idea", notes:"hardware store", scenes:[], lat:34.860232, lng:-118.163534, photos:[] },
  { region:"av", area:"rosamond", name:"The Tire Store - Rosamond", town:"Rosamond", address:"1816 W Rosamond Blvd, Rosamond, CA 93560",
    status:"idea", notes:"tire / industrial", scenes:["hideout", "slaughterhouse"], lat:34.864132, lng:-118.164975, photos:[] },
  { region:"av", area:"rosamond", name:"Reaper Restorations", town:"Rosamond", address:"1840 Rosamond Blvd, Rosamond, CA 93560",
    status:"idea", notes:"auto / industrial", scenes:["hideout", "slaughterhouse"], lat:34.864154, lng:-118.165387, photos:[] },
  { region:"av", area:"rosamond", name:"Rosamond Construction Office", town:"Rosamond", address:"1858 W Rosamond Blvd, Rosamond, CA 93560",
    status:"idea", notes:"construction", scenes:["hideout", "slaughterhouse"], lat:34.864182, lng:-118.165728, photos:[] },
  { region:"av", area:"rosamond", name:"Patty's Cafe / On Point Barber", town:"Rosamond", address:"2997 Desert St, Rosamond, CA 93560",
    status:"idea", notes:"cafe / barber", scenes:["diner-lot", "green-acres"], lat:34.863939, lng:-118.166371, photos:[] },
  { region:"av", area:"rosamond", name:"United States Postal Service", town:"Rosamond", address:"1950 W Rosamond Blvd, Rosamond, CA 93560",
    status:"idea", notes:"civic / post office", scenes:["sheriff"], lat:34.863766, lng:-118.166732, photos:[] },
  { region:"av", area:"rosamond", name:"Devonshire Inn Motel", town:"Rosamond", address:"2076 W Rosamond Blvd, Rosamond, CA 93560",
    status:"idea", notes:"MOTEL", scenes:["motel"], lat:34.863838, lng:-118.168144, photos:[] },
  { region:"av", area:"rosamond", name:"Fosters Freeze", town:"Rosamond", address:"2080 W Rosamond Blvd, Rosamond, CA 93560",
    status:"idea", notes:"diner / neon", scenes:["diner-lot", "green-acres"], lat:34.863924, lng:-118.168646, photos:[] },
  { region:"av", area:"rosamond", name:"Bryan Manor Apartments", town:"Rosamond", address:"2910 B St, Rosamond, CA 93560",
    status:"idea", notes:"apartment", scenes:["flashback-apt"], lat:34.862887, lng:-118.168648, photos:[] },
  { region:"av", area:"rosamond", name:"The Church On B Street", town:"Rosamond", address:"2850 B St, Rosamond, CA 93560",
    status:"idea", notes:"CHURCH", scenes:["church", "press-church"], lat:34.862026, lng:-118.168661, photos:[] },
  { region:"av", area:"rosamond", name:"The Church On B Street", town:"Rosamond", address:"2850 B St, Rosamond, CA 93560",
    status:"idea", notes:"CHURCH", scenes:["church", "press-church"], lat:34.862327, lng:-118.169285, photos:[] },
  { region:"av", area:"rosamond", name:"The Church On B Street", town:"Rosamond", address:"2850 B St, Rosamond, CA 93560",
    status:"idea", notes:"CHURCH", scenes:["church", "press-church"], lat:34.861322, lng:-118.169403, photos:[] },
  { region:"av", area:"rosamond", name:"2057 Gobi Ave", town:"Rosamond", address:"Rosamond, CA 93560",
    status:"idea", notes:"2057 Gobi Ave", scenes:[], lat:34.861372, lng:-118.168396, photos:[] },
  { region:"av", area:"rosamond", name:"First Baptist Church - Rosamond", town:"Rosamond", address:"2787 20th St W, Rosamond, CA 93560",
    status:"idea", notes:"CHURCH", scenes:["church", "press-church"], lat:34.860813, lng:-118.167443, photos:[] },
  { region:"av", area:"rosamond", name:"El Chulo Burgers", town:"Rosamond", address:"2787 20th St W, Rosamond, CA 93560",
    status:"idea", notes:"diner / burger / Latino", scenes:["diner-lot", "green-acres"], lat:34.862636, lng:-118.167374, photos:[] },
  { region:"av", area:"rosamond", name:"Praise Inn (church)", town:"Rosamond", address:"2700 20th St W, Rosamond, CA 93560",
    status:"idea", notes:"CHURCH", scenes:["church", "press-church"], lat:34.860077, lng:-118.166894, photos:[] },
  { region:"av", area:"rosamond", name:"Hummell Community Center", town:"Rosamond", address:"2500 20th St W, Rosamond, CA 93560",
    status:"idea", notes:"civic / community center", scenes:["sheriff"], lat:34.857503, lng:-118.166712, photos:[] },
  { region:"av", area:"rosamond", name:"Carl's Motel", town:"Rosamond", address:"2529 Sierra Hwy, Rosamond, CA 93560",
    status:"idea", notes:"MOTEL", scenes:["motel"], lat:34.857923, lng:-118.162799, photos:[] },
  { region:"av", area:"rosamond", name:"Dollar General", town:"Rosamond", address:"2475 Sierra Hwy, Rosamond, CA 93560",
    status:"idea", notes:"store", scenes:["gas-station"], lat:34.856751, lng:-118.162569, photos:[] },
  { region:"av", area:"rosamond", name:"Joshua Motel", town:"Rosamond", address:"2561 Sierra Hwy, Rosamond, CA 93560",
    status:"idea", notes:"MOTEL", scenes:["motel"], lat:34.858221, lng:-118.162911, photos:[] },
  { region:"av", area:"rosamond", name:"Rosamond Auto Sales", town:"Rosamond", address:"2609 Sierra Hwy, Rosamond, CA 93560",
    status:"idea", notes:"car lot", scenes:["hideout", "slaughterhouse"], lat:34.859028, lng:-118.162797, photos:[] },
  { region:"av", area:"rosamond", name:"Mr Donut & More", town:"Rosamond", address:"2689 Sierra Hwy, Rosamond, CA 93560",
    status:"idea", notes:"diner / donut", scenes:["diner-lot", "green-acres"], lat:34.859552, lng:-118.16291, photos:[] },
  { region:"av", area:"rosamond", name:"Desert Search and Rescue", town:"Rosamond", address:"2980 Desert St, Rosamond, CA 93560",
    status:"idea", notes:"civic", scenes:["sheriff"], lat:34.863817, lng:-118.165682, photos:[] },
  { region:"av", area:"rosamond", name:"Corner home (B St & Gobi)", town:"Rosamond", address:"2805 B St, Rosamond, CA 93560",
    status:"idea", notes:"home", scenes:["annies-house", "track-home"], lat:34.860082, lng:-118.165059, photos:[] },
  { region:"av", area:"rosamond", name:"Family Faith Center Church of God", town:"Rosamond", address:"2572 Desert St, Rosamond, CA 93560",
    status:"idea", notes:"CHURCH", scenes:["church", "press-church"], lat:34.858388, lng:-118.164804, photos:[] },
  { region:"av", area:"rosamond", name:"Hall Ambulance Rosamond Station", town:"Rosamond", address:"2970 Diamond St, Rosamond, CA 93560",
    status:"idea", notes:"ambulance / hospital", scenes:["hospital"], lat:34.863858, lng:-118.164133, photos:[] },
  { region:"av", area:"rosamond", name:"Plane Building", town:"Rosamond", address:"2873 Diamond St, Rosamond, CA 93560",
    status:"idea", notes:"industrial / quirky", scenes:["hideout", "slaughterhouse"], lat:34.863095, lng:-118.164033, photos:[] },
  { region:"av", area:"rosamond", name:"Deluxe Auto Interiors", town:"Rosamond", address:"2951 Diamond St, Rosamond, CA 93560",
    status:"idea", notes:"auto / industrial", scenes:["hideout", "slaughterhouse"], lat:34.862863, lng:-118.164209, photos:[] },
  { region:"av", area:"rosamond", name:"Adobe Church (1933)", town:"Rosamond", address:"1746 Locust St, Rosamond, CA 93560",
    status:"idea", notes:"CHURCH — period 1933 adobe", scenes:["church", "press-church"], lat:34.862482, lng:-118.164038, photos:[] },
  { region:"av", area:"rosamond", name:"Plane Building", town:"Rosamond", address:"2873 Diamond St, Rosamond, CA 93560",
    status:"idea", notes:"industrial / quirky", scenes:["hideout", "slaughterhouse"], lat:34.862423, lng:-118.164586, photos:[] },
  { region:"av", area:"rosamond", name:"Rosamond Chamber of Commerce", town:"Rosamond", address:"2861 Diamond St, Rosamond, CA 93560",
    status:"idea", notes:"civic / chamber", scenes:["sheriff"], lat:34.862245, lng:-118.164551, photos:[] },
  { region:"av", area:"rosamond", name:"Rosamond Self-Service Car Wash", town:"Rosamond", address:"2825 Diamond St, Rosamond, CA 93560",
    status:"idea", notes:"car wash", scenes:["hideout", "slaughterhouse"], lat:34.86179, lng:-118.16449, photos:[] },
  { region:"av", area:"rosamond", name:"Prime Auto Parts", town:"Rosamond", address:"2769 Diamond St, Rosamond, CA 93560",
    status:"idea", notes:"auto", scenes:["hideout", "slaughterhouse"], lat:34.861009, lng:-118.164434, photos:[] },
  { region:"av", area:"rosamond", name:"Bucketloader Lot", town:"Rosamond", address:"2760 Diamond St, Rosamond, CA 93560",
    status:"idea", notes:"lot / industrial", scenes:["hideout", "slaughterhouse"], lat:34.861018, lng:-118.163859, photos:[] },
  { region:"av", area:"rosamond", name:"E&N General Discount Store (closed)", town:"Rosamond", address:"2743 Diamond St, Rosamond, CA 93560",
    status:"idea", notes:"closed store", scenes:["gas-station", "main-street"], lat:34.860676, lng:-118.164498, photos:[] },
  { region:"av", area:"rosamond", name:"Diamond Hair Designs", town:"Rosamond", address:"2748 Diamond St, Rosamond, CA 93560",
    status:"idea", notes:"salon", scenes:[], lat:34.860784, lng:-118.16391, photos:[] },
  { region:"av", area:"rosamond", name:"Rosamond Construction Office", town:"Rosamond", address:"1858 W Rosamond Blvd, Rosamond, CA 93560",
    status:"idea", notes:"construction", scenes:["hideout", "slaughterhouse"], lat:34.86039, lng:-118.163797, photos:[] },
  { region:"av", area:"rosamond", name:"Rosamond Liquor Market", town:"Rosamond", address:"2671 Diamond St, Rosamond, CA 93560",
    status:"idea", notes:"market", scenes:["gas-station"], lat:34.859798, lng:-118.164207, photos:[] },
  { region:"av", area:"rosamond", name:"Aqua Azul", town:"Rosamond", address:"2660 Diamond St, Rosamond, CA 93560",
    status:"idea", notes:"business", scenes:[], lat:34.859766, lng:-118.163627, photos:[] },
  { region:"av", area:"rosamond", name:"Rosamond Cleaners", town:"Rosamond", address:"2650 Diamond St, Rosamond, CA 93560",
    status:"idea", notes:"cleaners", scenes:[], lat:34.8595, lng:-118.163581, photos:[] },
  { region:"av", area:"rosamond", name:"Rosamond Community Center", town:"Rosamond", address:"2645 Diamond St, Rosamond, CA 93560",
    status:"idea", notes:"civic / community center", scenes:["sheriff"], lat:34.859422, lng:-118.164125, photos:[] },
  { region:"av", area:"rosamond", name:"J's Hideaway Restaurant & Bar", town:"Rosamond", address:"2635 Diamond St, Rosamond, CA 93560",
    status:"idea", notes:"restaurant / bar / hideaway", scenes:["diner-lot", "green-acres", "hideout"], lat:34.859266, lng:-118.164114, photos:[] },
  { region:"av", area:"rosamond", name:"The Green Mile Collective", town:"Rosamond", address:"2613 Diamond St, Rosamond, CA 93560",
    status:"idea", notes:"dispensary", scenes:[], lat:34.858949, lng:-118.164038, photos:[] },
  { region:"av", area:"rosamond", name:"Ol' Dusty Sales Yard", town:"Rosamond", address:"1963 Locust St, Rosamond, CA 93560",
    status:"idea", notes:"sales yard / industrial", scenes:["hideout", "slaughterhouse"], lat:34.862526, lng:-118.166883, photos:[] },
  { region:"av", area:"rosamond", name:"Blue Home", town:"Rosamond", address:"1923 Locust St, Rosamond, CA 93560",
    status:"idea", notes:"home", scenes:["annies-house", "track-home"], lat:34.862648, lng:-118.166246, photos:[] },
  { region:"av", area:"rosamond", name:"Nice-View Home", town:"Rosamond", address:"1938 Poplar St, Rosamond, CA 93560",
    status:"idea", notes:"home", scenes:["annies-house", "track-home"], lat:34.860744, lng:-118.16618, photos:[] },
  { region:"av", area:"rosamond", name:"Rosamond Auto Sales", town:"Rosamond", address:"2609 Sierra Hwy, Rosamond, CA 93560",
    status:"idea", notes:"car lot", scenes:["hideout", "slaughterhouse"], lat:34.861009, lng:-118.164434, photos:[] },
  { region:"av", area:"rosamond", name:"Hachiban Ramen Sushi Bar & Grill", town:"Rosamond", address:"2763 Sierra Hwy, Rosamond, CA 93560",
    status:"idea", notes:"restaurant", scenes:["diner-lot", "green-acres"], lat:34.861234, lng:-118.163238, photos:[] },
  { region:"av", area:"rosamond", name:"Brick Home", town:"Rosamond", address:"1857 Center St, Rosamond, CA 93560",
    status:"idea", notes:"home", scenes:["annies-house", "track-home"], lat:34.860108, lng:-118.165069, photos:[] },
  { region:"av", area:"rosamond", name:"El Coyote Cantina & Cocina (closed)", town:"Rosamond", address:"2701 Sierra Hwy, Rosamond, CA 93560",
    status:"idea", notes:"closed cantina", scenes:["diner-lot", "green-acres"], lat:34.860432, lng:-118.163032, photos:[] },
  { region:"av", area:"rosamond", name:"'Texas Shit' House", town:"Rosamond", address:"1954 Elm St, Rosamond, CA 93560",
    status:"idea", notes:"HOME — Annie's / Texas home", scenes:["annies-house", "track-home"], lat:34.858256, lng:-118.166086, photos:[] }
];
