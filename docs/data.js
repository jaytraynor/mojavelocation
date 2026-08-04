/* ============================================================
   CALAMITIES — LOCATION SCOUT  ·  DATA FILE
   ------------------------------------------------------------
   REAL PHOTOS: paste a free Google Maps API key below and every
   location auto-shows a real Street View photo that actually loads.
   How to get one (free, ~5 min):
     1. console.cloud.google.com  → create a project
     2. APIs & Services → Enable: "Street View Static API" (+ "Maps Static API")
     3. Credentials → Create credentials → API key → copy it
     4. Paste it between the quotes on the googleMapsKey line.
   (No key? Cards show a "View photos on Google" button instead.)

   Prefer your own photos? Drop files in /photos and list them per
   location:  photos: ["photos/carls-1.jpg","photos/carls-2.jpg"]
   ============================================================ */

const CONFIG = {
  title: "CALAMITIES",
  subtitle: "Location Scout",
  googleMapsKey: "AIzaSyDM5JNRlHkIRkK4YCcUJcVYFjrRj0ZBGLQ",              // <-- paste your key here for real photos

  regions: [
    {
      id: "av",
      name: "Antelope Valley",
      color: "#8A2417",
      crewParking: "Crew parking: Crown Valley Rd, Acton, CA 93510",
      center: [34.66, -118.10], zoom: 9,
      /* Sub-areas of Antelope Valley (Rosamond = Enchantment) */
      areas: [
        { id: "rosamond", name: "Rosamond \u2014 Enchantment", center: [34.8625, -118.1618], zoom: 15,
          /* perimeter traced from your Google My Map screenshot */
          perimeter: [
            [34.8664, -118.1690], [34.8664, -118.1566], [34.8586, -118.1548],
            [34.8586, -118.1660], [34.8624, -118.1660], [34.8624, -118.1690]
          ]
        }
      ],
      anchorTowns: [
        { name: "Lancaster", lat: 34.6868, lng: -118.1542 },
        { name: "Palmdale",  lat: 34.5794, lng: -118.1165 }
      ],
      peripheralTowns: [
        { name: "Mojave", lat: 35.0525, lng: -118.1740 },
        { name: "Rosamond", lat: 34.8642, lng: -118.1631 },
        { name: "Antelope Acres", lat: 34.7647, lng: -118.2842 },
        { name: "Quartz Hill", lat: 34.6444, lng: -118.2176 },
        { name: "Littlerock / Pearblossom", lat: 34.5137, lng: -117.9472 },
        { name: "Acton", lat: 34.4703, lng: -118.1968 }
      ]
    },
    { id:"bakersfield", name:"Bakersfield", color:"#B0731A", center:[35.44,-119.05], zoom:9, areas:[],
      anchorTowns:[{name:"Oildale",lat:35.4283,lng:-119.0223},{name:"East Bakersfield",lat:35.3770,lng:-118.9860}],
      peripheralTowns:[{name:"McFarland",lat:35.6788,lng:-119.2290}] },
    { id:"ie", name:"Inland Empire", color:"#2C6E8F", center:[34.03,-117.35], zoom:10, areas:[],
      anchorTowns:[{name:"San Bernardino",lat:34.1083,lng:-117.2898},{name:"Riverside",lat:33.9806,lng:-117.3755}],
      peripheralTowns:[{name:"Rialto",lat:34.1064,lng:-117.3703},{name:"Fontana",lat:34.0922,lng:-117.4350},{name:"Ontario",lat:34.0633,lng:-117.6509},{name:"Pomona",lat:34.0551,lng:-117.7500},{name:"Banning",lat:33.9256,lng:-116.8764},{name:"Beaumont",lat:33.9295,lng:-116.9770}] },
    { id:"highdesert", name:"High Desert", color:"#3E7D4E", center:[34.62,-117.20], zoom:9, areas:[],
      anchorTowns:[{name:"Victorville",lat:34.5362,lng:-117.2928},{name:"Apple Valley",lat:34.5008,lng:-117.1859},{name:"Lucerne Valley",lat:34.4436,lng:-116.9714},{name:"Adelanto",lat:34.5828,lng:-117.4092}],
      peripheralTowns:[{name:"Barstow",lat:34.8958,lng:-117.0173},{name:"Boron",lat:35.0000,lng:-117.6503}] }
  ]
};

/* ============================================================
   LOCATIONS  (Rosamond loaded from your Enchantment list)
   ============================================================ */

const OPTIONS = [
  { region:"av", area:"rosamond", scene:"perimeter", name:"AMT Market (Gas Station)", town:"Rosamond",
    address:"1700 Center St, Rosamond, CA 93560", status:"idea", notes:"gas / mini-mart → Jimbo's", lat:34.8636, lng:-118.1566, photos:[] },
  { region:"av", area:"rosamond", scene:"perimeter", name:"Las Margaritas Cocina & Cantina", town:"Rosamond",
    address:"2701 Sierra Hwy, Rosamond, CA 93560", status:"idea", notes:"Latino eatery / diner", lat:34.86236, lng:-118.1566, photos:[] },
  { region:"av", area:"rosamond", scene:"perimeter", name:"Mavericks Sports Bar and Grill", town:"Rosamond",
    address:"2763 Sierra Hwy, Rosamond, CA 93560", status:"idea", notes:"bar / diner", lat:34.863239, lng:-118.1566, photos:[] },
  { region:"av", area:"rosamond", scene:"perimeter", name:"Pat's Liquor Store", town:"Rosamond",
    address:"2769 Sierra Hwy, Rosamond, CA 93560", status:"idea", notes:"liquor / mini-mart", lat:34.863324, lng:-118.1566, photos:[] },
  { region:"av", area:"rosamond", scene:"perimeter", name:"K S Grocery", town:"Rosamond",
    address:"2817 Sierra Hwy, Rosamond, CA 93560", status:"idea", notes:"market", lat:34.864005, lng:-118.1566, photos:[] },
  { region:"av", area:"rosamond", scene:"perimeter", name:"Ricky's Highway Cafe", town:"Rosamond",
    address:"2835 Sierra Hwy, Rosamond, CA 93560", status:"idea", notes:"diner → Green Acres", lat:34.86426, lng:-118.1566, photos:[] },
  { region:"av", area:"rosamond", scene:"perimeter", name:"Plum Tree Collective", town:"Rosamond",
    address:"2873 Sierra Hwy, Rosamond, CA 93560", status:"idea", notes:"strip anchor", lat:34.864799, lng:-118.1566, photos:[] },
  { region:"av", area:"rosamond", scene:"perimeter", name:"MRP Auto & Transmission Repair", town:"Rosamond",
    address:"2949 Sierra Hwy, Rosamond, CA 93560", status:"idea", notes:"auto / industrial", lat:34.865877, lng:-118.1566, photos:[] },
  { region:"av", area:"rosamond", scene:"perimeter", name:"Speed Knocks Boxing", town:"Rosamond",
    address:"2969 Sierra Hwy, Rosamond, CA 93560", status:"idea", notes:"gym / industrial", lat:34.86616, lng:-118.1566, photos:[] },
  { region:"av", area:"rosamond", scene:"perimeter", name:"Kieffe & Sons Ford Used Cars", town:"Rosamond",
    address:"2969 Sierra Hwy, Rosamond, CA 93560", status:"idea", notes:"car lot", lat:34.86616, lng:-118.1563, photos:[] },
  { region:"av", area:"rosamond", scene:"perimeter", name:"California Real Estate", town:"Rosamond",
    address:"2978 Diamond St, Rosamond, CA 93560", status:"idea", notes:"office", lat:34.866288, lng:-118.16, photos:[] },
  { region:"av", area:"rosamond", scene:"perimeter", name:"Karl's Hardware & Rental", town:"Rosamond",
    address:"2700 Diamond St, Rosamond, CA 93560", status:"idea", notes:"hardware → Ace Hardware vibe", lat:34.862345, lng:-118.16, photos:[] },
  { region:"av", area:"rosamond", scene:"perimeter", name:"The Tire Store - Rosamond", town:"Rosamond",
    address:"1816 W Rosamond Blvd, Rosamond, CA 93560", status:"idea", notes:"industrial", lat:34.8664, lng:-118.160196, photos:[] },
  { region:"av", area:"rosamond", scene:"perimeter", name:"Reaper Restorations", town:"Rosamond",
    address:"1840 Rosamond Blvd, Rosamond, CA 93560", status:"idea", notes:"auto shop / industrial", lat:34.8664, lng:-118.16094, photos:[] },
  { region:"av", area:"rosamond", scene:"perimeter", name:"Rosamond Construction Office", town:"Rosamond",
    address:"1858 W Rosamond Blvd, Rosamond, CA 93560", status:"idea", notes:"construction", lat:34.8664, lng:-118.161498, photos:[] },
  { region:"av", area:"rosamond", scene:"perimeter", name:"Patty's Cafe / On Point Barber", town:"Rosamond",
    address:"2997 Desert St, Rosamond, CA 93560", status:"idea", notes:"cafe / barber", lat:34.866557, lng:-118.1628, photos:[] },
  { region:"av", area:"rosamond", scene:"perimeter", name:"United States Postal Service", town:"Rosamond",
    address:"1950 W Rosamond Blvd, Rosamond, CA 93560", status:"idea", notes:"civic / post office", lat:34.8664, lng:-118.16435, photos:[] },
  { region:"av", area:"rosamond", scene:"perimeter", name:"Devonshire Inn Motel", town:"Rosamond",
    address:"2076 W Rosamond Blvd, Rosamond, CA 93560", status:"idea", notes:"MOTEL → Longhorn Inn", lat:34.8664, lng:-118.168256, photos:[] },
  { region:"av", area:"rosamond", scene:"perimeter", name:"Fosters Freeze", town:"Rosamond",
    address:"2080 W Rosamond Blvd, Rosamond, CA 93560", status:"idea", notes:"diner / neon → Green Acres", lat:34.8664, lng:-118.16838, photos:[] },
  { region:"av", area:"rosamond", scene:"perimeter", name:"Bryan Manor Apartments", town:"Rosamond",
    address:"2910 B St, Rosamond, CA 93560", status:"idea", notes:"apartment → flashback apt", lat:34.865324, lng:-118.169, photos:[] },
  { region:"av", area:"rosamond", scene:"perimeter", name:"The Church On B Street", town:"Rosamond",
    address:"2850 B St, Rosamond, CA 93560", status:"idea", notes:"CHURCH", lat:34.864473, lng:-118.169, photos:[] },
  { region:"av", area:"rosamond", scene:"perimeter", name:"Home (across from church)", town:"Rosamond",
    address:"2869 B St, Rosamond, CA 93560", status:"idea", notes:"home", lat:34.864742, lng:-118.169, photos:[] },
  { region:"av", area:"rosamond", scene:"perimeter", name:"Corner home (B St & Gobi)", town:"Rosamond",
    address:"2805 B St, Rosamond, CA 93560", status:"idea", notes:"home / corner", lat:34.863835, lng:-118.169, photos:[] },
  { region:"av", area:"rosamond", scene:"perimeter", name:"'Happy Bday' house", town:"Rosamond",
    address:"2057 Gobi Ave, Rosamond, CA 93560", status:"idea", notes:"home / party house", lat:34.8624, lng:-118.167667, photos:[] },
  { region:"av", area:"rosamond", scene:"perimeter", name:"First Baptist Church - Rosamond", town:"Rosamond",
    address:"2787 20th St W, Rosamond, CA 93560", status:"idea", notes:"CHURCH", lat:34.863579, lng:-118.166, photos:[] },
  { region:"av", area:"rosamond", scene:"perimeter", name:"El Chulo Burgers", town:"Rosamond",
    address:"2787 20th St W, Rosamond, CA 93560", status:"idea", notes:"diner / Latino", lat:34.863579, lng:-118.1657, photos:[] },
  { region:"av", area:"rosamond", scene:"perimeter", name:"Praise Inn (church)", town:"Rosamond",
    address:"2700 20th St W, Rosamond, CA 93560", status:"idea", notes:"CHURCH", lat:34.862345, lng:-118.166, photos:[] },
  { region:"av", area:"rosamond", scene:"perimeter", name:"Hummell Community Center", town:"Rosamond",
    address:"2500 20th St W, Rosamond, CA 93560", status:"idea", notes:"civic / community center", lat:34.859509, lng:-118.166, photos:[] },
  { region:"av", area:"rosamond", scene:"perimeter", name:"Carl's Motel", town:"Rosamond",
    address:"2529 Sierra Hwy, Rosamond, CA 93560", status:"idea", notes:"MOTEL → Longhorn Inn", lat:34.85992, lng:-118.1566, photos:[] },
  { region:"av", area:"rosamond", scene:"perimeter", name:"Dollar General", town:"Rosamond",
    address:"2475 Sierra Hwy, Rosamond, CA 93560", status:"idea", notes:"store", lat:34.859155, lng:-118.1566, photos:[] },
  { region:"av", area:"rosamond", scene:"perimeter", name:"Joshua Motel", town:"Rosamond",
    address:"2561 Sierra Hwy, Rosamond, CA 93560", status:"idea", notes:"MOTEL → Longhorn Inn", lat:34.860374, lng:-118.1566, photos:[] },
  { region:"av", area:"rosamond", scene:"perimeter", name:"Rosamond Auto Sales", town:"Rosamond",
    address:"2609 Sierra Hwy, Rosamond, CA 93560", status:"idea", notes:"car lot", lat:34.861055, lng:-118.1566, photos:[] },
  { region:"av", area:"rosamond", scene:"perimeter", name:"Mr Donut & More", town:"Rosamond",
    address:"2689 Sierra Hwy, Rosamond, CA 93560", status:"idea", notes:"diner / donut shop", lat:34.862189, lng:-118.1566, photos:[] },
  { region:"av", area:"rosamond", scene:"area", name:"Desert Search and Rescue", town:"Rosamond",
    address:"2980 Desert St, Rosamond, CA 93560", status:"idea", notes:"civic / sheriff-adjacent", lat:34.866316, lng:-118.1628, photos:[] },
  { region:"av", area:"rosamond", scene:"area", name:"Home (corner of Center)", town:"Rosamond",
    address:"2700 Desert St, Rosamond, CA 93560", status:"idea", notes:"home", lat:34.862345, lng:-118.1628, photos:[] },
  { region:"av", area:"rosamond", scene:"area", name:"Family Faith Center Church of God", town:"Rosamond",
    address:"2572 Desert St, Rosamond, CA 93560", status:"idea", notes:"CHURCH", lat:34.86053, lng:-118.1628, photos:[] },
  { region:"av", area:"rosamond", scene:"area", name:"Hall Ambulance Rosamond Station", town:"Rosamond",
    address:"2970 Diamond St, Rosamond, CA 93560", status:"idea", notes:"ambulance → hospital-adjacent", lat:34.866175, lng:-118.16, photos:[] },
  { region:"av", area:"rosamond", scene:"area", name:"Deluxe Auto Interiors", town:"Rosamond",
    address:"2951 Diamond St, Rosamond, CA 93560", status:"idea", notes:"auto / industrial", lat:34.865905, lng:-118.16, photos:[] },
  { region:"av", area:"rosamond", scene:"area", name:"Adobe Church (1933)", town:"Rosamond",
    address:"1746 Locust St, Rosamond, CA 93560", status:"idea", notes:"PERIOD CHURCH — 1933 adobe", lat:34.8612, lng:-118.158026, photos:[] },
  { region:"av", area:"rosamond", scene:"area", name:"Plane Building", town:"Rosamond",
    address:"2873 Diamond St, Rosamond, CA 93560", status:"idea", notes:"quirky / industrial", lat:34.864799, lng:-118.16, photos:[] },
  { region:"av", area:"rosamond", scene:"area", name:"Rosamond Chamber of Commerce", town:"Rosamond",
    address:"2861 Diamond St, Rosamond, CA 93560", status:"idea", notes:"civic", lat:34.864629, lng:-118.16, photos:[] },
  { region:"av", area:"rosamond", scene:"area", name:"Rosamond Self-Service Car Wash", town:"Rosamond",
    address:"2825 Diamond St, Rosamond, CA 93560", status:"idea", notes:"car wash", lat:34.864118, lng:-118.16, photos:[] },
  { region:"av", area:"rosamond", scene:"area", name:"Prime Auto Parts", town:"Rosamond",
    address:"2769 Diamond St, Rosamond, CA 93560", status:"idea", notes:"auto", lat:34.863324, lng:-118.16, photos:[] },
  { region:"av", area:"rosamond", scene:"area", name:"Bucketloader Lot", town:"Rosamond",
    address:"2760 Diamond St, Rosamond, CA 93560", status:"idea", notes:"lot / industrial", lat:34.863196, lng:-118.16, photos:[] },
  { region:"av", area:"rosamond", scene:"area", name:"E&N General Discount Store (closed)", town:"Rosamond",
    address:"2743 Diamond St, Rosamond, CA 93560", status:"idea", notes:"closed store → supermarket-lot vibe", lat:34.862955, lng:-118.16, photos:[] },
  { region:"av", area:"rosamond", scene:"area", name:"Diamond Hair Designs", town:"Rosamond",
    address:"2748 Diamond St, Rosamond, CA 93560", status:"idea", notes:"salon", lat:34.863026, lng:-118.16, photos:[] },
  { region:"av", area:"rosamond", scene:"area", name:"Rosamond Liquor Market", town:"Rosamond",
    address:"2671 Diamond St, Rosamond, CA 93560", status:"idea", notes:"market", lat:34.861934, lng:-118.16, photos:[] },
  { region:"av", area:"rosamond", scene:"area", name:"Aqua Azul", town:"Rosamond",
    address:"2660 Diamond St, Rosamond, CA 93560", status:"idea", notes:"business", lat:34.861778, lng:-118.16, photos:[] },
  { region:"av", area:"rosamond", scene:"area", name:"Rosamond Cleaners", town:"Rosamond",
    address:"2650 Diamond St, Rosamond, CA 93560", status:"idea", notes:"cleaners", lat:34.861636, lng:-118.16, photos:[] },
  { region:"av", area:"rosamond", scene:"area", name:"Rosamond Community Center", town:"Rosamond",
    address:"2645 Diamond St, Rosamond, CA 93560", status:"idea", notes:"civic", lat:34.861565, lng:-118.16, photos:[] },
  { region:"av", area:"rosamond", scene:"area", name:"J's Hideaway Restaurant & Bar", town:"Rosamond",
    address:"2635 Diamond St, Rosamond, CA 93560", status:"idea", notes:"diner / bar → Her's Hideaway", lat:34.861424, lng:-118.16, photos:[] },
  { region:"av", area:"rosamond", scene:"area", name:"The Green Mile Collective", town:"Rosamond",
    address:"2613 Diamond St, Rosamond, CA 93560", status:"idea", notes:"dispensary", lat:34.861112, lng:-118.16, photos:[] },
  { region:"av", area:"rosamond", scene:"area", name:"Ol' Dusty Sales Yard", town:"Rosamond",
    address:"1963 Locust St, Rosamond, CA 93560", status:"idea", notes:"sales yard → Western / industrial", lat:34.8612, lng:-118.164753, photos:[] },
  { region:"av", area:"rosamond", scene:"area", name:"Blue Home", town:"Rosamond",
    address:"1923 Locust St, Rosamond, CA 93560", status:"idea", notes:"home", lat:34.8612, lng:-118.163513, photos:[] },
  { region:"av", area:"rosamond", scene:"area", name:"Nice-View Home", town:"Rosamond",
    address:"1938 Poplar St, Rosamond, CA 93560", status:"idea", notes:"home", lat:34.863, lng:-118.163978, photos:[] },
  { region:"av", area:"rosamond", scene:"area", name:"Revival Center Lot", town:"Rosamond",
    address:"1732 Gobi Ave, Rosamond, CA 93560", status:"idea", notes:"church lot", lat:34.8624, lng:-118.157592, photos:[] },
  { region:"av", area:"rosamond", scene:"area", name:"Hachiban Ramen Sushi Bar & Grill", town:"Rosamond",
    address:"2763 Sierra Hwy, Rosamond, CA 93560", status:"idea", notes:"restaurant", lat:34.863239, lng:-118.1563, photos:[] },
  { region:"av", area:"rosamond", scene:"area", name:"Brick Home", town:"Rosamond",
    address:"1857 Center St, Rosamond, CA 93560", status:"idea", notes:"home", lat:34.8636, lng:-118.161467, photos:[] },
  { region:"av", area:"rosamond", scene:"area", name:"El Coyote Cantina & Cocina (closed)", town:"Rosamond",
    address:"2701 Sierra Hwy, Rosamond, CA 93560", status:"idea", notes:"closed cantina", lat:34.86236, lng:-118.1563, photos:[] },
  { region:"av", area:"rosamond", scene:"area", name:"'Texas Shit' House", town:"Rosamond",
    address:"1954 Elm St, Rosamond, CA 93560", status:"idea", notes:"HOME → Annie's house / Texas home", lat:34.86, lng:-118.164474, photos:[] },
  { region:"av", area:"rosamond", scene:"area", name:"Pepes Kitchen", town:"Rosamond",
    address:"1900 Elm St, Rosamond, CA 93560", status:"idea", notes:"Latino diner (from your map)", lat:34.86, lng:-118.1628, photos:[] }
];
