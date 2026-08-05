/* ============================================================
   CALAMITIES — LOCATION SCOUT · DATA FILE
   ------------------------------------------------------------
   ROSAMOND pins + boundary are EXACT (from your Enchantment KML) and
   use your own pin names, so each name matches its plotted spot.
   Street View is on (key set) — RESTRICT the key: HTTP referrers
   https://*.github.io/* and API = Street View Static + Maps Static.
   PHOTOS: up to 3 of your own per place override Street View:
     photos: ["photos/name-1.jpg","photos/name-2.jpg","photos/name-3.jpg"]
   Recommended size: 1600x900 (16:9) or 1280x720 JPG, < ~300KB each.
   Every base lists its anchor/peripheral TOWNS as sub-sections.
   ============================================================ */

const CONFIG = {
  title: "CALAMITIES",
  subtitle: "Location Scout",
  googleMapsKey: "AIzaSyDM5JNRlHkIRkK4YCcUJcVYFjrRj0ZBGLQ",

  scenes: [
    { id:"slaughterhouse", name:"Monty's Slaughterhouse" }, { id:"annies-house", name:"Annie's House" },
    { id:"main-street", name:"Main Street / Dead Town" }, { id:"church", name:"Church (Spirit First)" },
    { id:"high-school", name:"High School" }, { id:"gas-station", name:"Gas Station (Jimbo's)" },
    { id:"myrtles-ranch", name:"Grandma Myrtle's Ranch" }, { id:"motel", name:"Longhorn Inn Motel" },
    { id:"green-acres", name:"Green Acres Diner" }, { id:"red-eye-ranch", name:"Red Eye Ranch / Grazeland" },
    { id:"hospital", name:"Hospital" }, { id:"sheriff", name:"Sheriff's Station / Civic" },
    { id:"hilton", name:"El Paso Hilton (ballroom)" }, { id:"bank", name:"First National Bank" },
    { id:"texaco", name:"Texaco (night)" }, { id:"rodeo", name:"Rodeo Fairgrounds" },
    { id:"track-home", name:"Track Home (massacre)" }, { id:"hideout", name:"Her's Hideout" },
    { id:"wyden-home", name:"Wyden's New Home" }, { id:"diner-lot", name:"Diner Lot + DPS Car" },
    { id:"vet-clinic", name:"Veterinary Clinic" }, { id:"press-church", name:"Church — Press Conference" },
    { id:"flashback-apt", name:"Flashback Apartment" }, { id:"border-plate", name:"Border / Juarez (VFX)" },
    { id:"desert-roads", name:"Desert Roads" }
  ],

  regions: [
    {
      id:"av", name:"Antelope Valley", color:"#8A2417",
      note:"Basecamp / parking: Lancaster or Palmdale (not Acton).",
      center:[34.66,-118.12], zoom:9, defaultArea:"rosamond",
      anchorTowns:[
        { name:"Lancaster", lat:34.6868, lng:-118.1542 },
        { name:"Palmdale", lat:34.5794, lng:-118.1165 }
      ],
      peripheralTowns:[
        { name:"Rosamond", lat:34.8642, lng:-118.1631, zoom:16, center:[34.86089, -118.166314], perimeter:[ [34.864308, -118.169063], [34.861148, -118.169031], [34.861192, -118.167153], [34.857123, -118.167087], [34.857141, -118.162216], [34.86443, -118.163332] ] },
        { name:"Antelope Acres", lat:34.7647, lng:-118.2842 },
        { name:"Quartz Hill", lat:34.6444, lng:-118.2176 },
        { name:"Mojave", lat:35.0525, lng:-118.1740 },
        { name:"Littlerock / Pearblossom", lat:34.5137, lng:-117.9472 },
        { name:"Acton", lat:34.4703, lng:-118.1968 }
      ]
    },
    {
      id:"bakersfield", name:"Bakersfield", color:"#B0731A",
      note:"Rodeo = Kern County Fair (in Bakersfield).",
      center:[35.35,-119.10], zoom:9,
      anchorTowns:[
        { name:"Bakersfield", lat:35.3733, lng:-119.0187 },
        { name:"Oildale", lat:35.4283, lng:-119.0223 },
        { name:"East Bakersfield (Old Town)", lat:35.3770, lng:-118.9860 }
      ],
      peripheralTowns:[
        { name:"Taft / Maricopa", lat:35.1425, lng:-119.4568 },
        { name:"Arvin / Lamont / Weedpatch", lat:35.2091, lng:-118.8283 },
        { name:"McFarland (cattle salesyard)", lat:35.6788, lng:-119.2290 },
        { name:"Buttonwillow / Lost Hills", lat:35.4003, lng:-119.4718 }
      ]
    },
    {
      id:"ie", name:"Inland Empire", color:"#2C6E8F",
      note:"Colton = hospital (Arrowhead).",
      center:[34.02,-117.30], zoom:9,
      anchorTowns:[
        { name:"San Bernardino", lat:34.1083, lng:-117.2898 },
        { name:"Riverside", lat:33.9806, lng:-117.3755 },
        { name:"Colton (hospital)", lat:34.0739, lng:-117.3136 }
      ],
      peripheralTowns:[
        { name:"Rialto", lat:34.1064, lng:-117.3703 },
        { name:"Fontana", lat:34.0922, lng:-117.4350 },
        { name:"Ontario", lat:34.0633, lng:-117.6509 },
        { name:"Pomona", lat:34.0551, lng:-117.7500 },
        { name:"Banning", lat:33.9256, lng:-116.8764 },
        { name:"Beaumont", lat:33.9295, lng:-116.9770 }
      ]
    },
    {
      id:"highdesert", name:"High Desert", color:"#3E7D4E",
      note:"",
      center:[34.66,-117.10], zoom:8,
      anchorTowns:[
        { name:"Victorville", lat:34.5362, lng:-117.2928 },
        { name:"Apple Valley", lat:34.5008, lng:-117.1859 }
      ],
      peripheralTowns:[
        { name:"Barstow", lat:34.8958, lng:-117.0173 },
        { name:"Boron", lat:35.0000, lng:-117.6503 },
        { name:"Lucerne Valley", lat:34.4436, lng:-116.9714 },
        { name:"Adelanto", lat:34.5828, lng:-117.4092 },
        { name:"Oro Grande", lat:34.6089, lng:-117.3389 },
        { name:"Newberry Springs", lat:34.8281, lng:-116.6872 }
      ]
    },
    {
      id:"imperial", name:"Imperial Valley", color:"#7A4FA3",
      note:"Border towns on the Mexicali line \u2014 border cheats.",
      center:[32.83,-115.55], zoom:10,
      anchorTowns:[
        { name:"Brawley", lat:32.9787, lng:-115.5303 },
        { name:"El Centro", lat:32.7920, lng:-115.5631 },
        { name:"Calexico", lat:32.6789, lng:-115.4989 }
      ],
      peripheralTowns:[
        { name:"Imperial", lat:32.8475, lng:-115.5694 },
        { name:"Heber", lat:32.7314, lng:-115.5297 }
      ]
    }
  ]
};

const OPTIONS = [
  { region:"av", area:"rosamond", name:"Las Margaritas Cocina & Cantina (mexican restaurant)", town:"Rosamond", address:"2701 Sierra Hwy, Rosamond, CA 93560",
    status:"idea", notes:"Las Margaritas Cocina & Cantina (mexican restaurant)", scenes:["diner-lot", "green-acres"], lat:34.860432, lng:-118.163032, photos:[] },
  { region:"av", area:"rosamond", name:"Mavericks Sports Bar and Grill", town:"Rosamond", address:"2763 Sierra Hwy, Rosamond, CA 93560",
    status:"idea", notes:"Mavericks Sports Bar and Grill", scenes:["diner-lot"], lat:34.861234, lng:-118.163238, photos:[] },
  { region:"av", area:"rosamond", name:"AMT Market", town:"Rosamond", address:"1700 Center St, Rosamond, CA 93560",
    status:"idea", notes:"AMT Market", scenes:["gas-station"], lat:34.85983, lng:-118.163083, photos:[] },
  { region:"av", area:"rosamond", name:"Pat's Liquor Store", town:"Rosamond", address:"2769 Sierra Hwy, Rosamond, CA 93560",
    status:"idea", notes:"Pat's Liquor Store", scenes:["gas-station"], lat:34.861306, lng:-118.163011, photos:[] },
  { region:"av", area:"rosamond", name:"K S Grocery", town:"Rosamond", address:"2817 Sierra Hwy, Rosamond, CA 93560",
    status:"idea", notes:"K S Grocery", scenes:["gas-station"], lat:34.861801, lng:-118.16312, photos:[] },
  { region:"av", area:"rosamond", name:"Ricky's Highway Cafe", town:"Rosamond", address:"2835 Sierra Hwy, Rosamond, CA 93560",
    status:"idea", notes:"Ricky's Highway Cafe", scenes:["diner-lot", "green-acres"], lat:34.862107, lng:-118.163238, photos:[] },
  { region:"av", area:"rosamond", name:"Plum tree collective", town:"Rosamond", address:"2873 Sierra Hwy, Rosamond, CA 93560",
    status:"idea", notes:"Plum tree collective", scenes:["main-street"], lat:34.862528, lng:-118.163184, photos:[] },
  { region:"av", area:"rosamond", name:"MRP Auto & Transmission repair", town:"Rosamond", address:"2949 Sierra Hwy, Rosamond, CA 93560",
    status:"idea", notes:"MRP Auto & Transmission repair", scenes:["hideout", "slaughterhouse"], lat:34.863555, lng:-118.163398, photos:[] },
  { region:"av", area:"rosamond", name:"Kieffe & Sons Ford Used Cars", town:"Rosamond", address:"2969 Sierra Hwy, Rosamond, CA 93560",
    status:"idea", notes:"Kieffe & Sons Ford Used Cars", scenes:["hideout", "slaughterhouse"], lat:34.863763, lng:-118.163518, photos:[] },
  { region:"av", area:"rosamond", name:"California Real Estate", town:"Rosamond", address:"2978 Diamond St, Rosamond, CA 93560",
    status:"idea", notes:"California Real Estate", scenes:[], lat:34.864135, lng:-118.164412, photos:[] },
  { region:"av", area:"rosamond", name:"Karl's Hardware & RENTAL", town:"Rosamond", address:"2700 Diamond St, Rosamond, CA 93560",
    status:"idea", notes:"Karl's Hardware & RENTAL", scenes:[], lat:34.860232, lng:-118.163534, photos:[] },
  { region:"av", area:"rosamond", name:"The Tire Store - Rosamond", town:"Rosamond", address:"1816 W Rosamond Blvd, Rosamond, CA 93560",
    status:"idea", notes:"The Tire Store - Rosamond", scenes:["hideout", "slaughterhouse"], lat:34.864132, lng:-118.164975, photos:[] },
  { region:"av", area:"rosamond", name:"Reaper Restorations", town:"Rosamond", address:"1840 W Rosamond Blvd, Rosamond, CA 93560",
    status:"idea", notes:"Reaper Restorations", scenes:["hideout", "slaughterhouse"], lat:34.864154, lng:-118.165387, photos:[] },
  { region:"av", area:"rosamond", name:"Rosamond Construction Office", town:"Rosamond", address:"1858 W Rosamond Blvd, Rosamond, CA 93560",
    status:"idea", notes:"Rosamond Construction Office", scenes:["hideout", "slaughterhouse"], lat:34.864182, lng:-118.165728, photos:[] },
  { region:"av", area:"rosamond", name:"Patty's Cafe / On Point Barber", town:"Rosamond", address:"2997 Desert St, Rosamond, CA 93560",
    status:"idea", notes:"Patty's Cafe / On Point Barber", scenes:["diner-lot", "green-acres"], lat:34.863939, lng:-118.166371, photos:[] },
  { region:"av", area:"rosamond", name:"United States Postal Service", town:"Rosamond", address:"1950 W Rosamond Blvd, Rosamond, CA 93560",
    status:"idea", notes:"United States Postal Service", scenes:["sheriff"], lat:34.863766, lng:-118.166732, photos:[] },
  { region:"av", area:"rosamond", name:"Devonshire Inn Motel", town:"Rosamond", address:"2076 W Rosamond Blvd, Rosamond, CA 93560",
    status:"idea", notes:"Devonshire Inn Motel", scenes:["motel"], lat:34.863838, lng:-118.168144, photos:[] },
  { region:"av", area:"rosamond", name:"Fosters Freeze", town:"Rosamond", address:"2080 W Rosamond Blvd, Rosamond, CA 93560",
    status:"idea", notes:"Fosters Freeze", scenes:["diner-lot", "green-acres"], lat:34.863924, lng:-118.168646, photos:[] },
  { region:"av", area:"rosamond", name:"Bryan Manor Apartments", town:"Rosamond", address:"2910 B St, Rosamond, CA 93560",
    status:"idea", notes:"Bryan Manor Apartments", scenes:["flashback-apt"], lat:34.862887, lng:-118.168648, photos:[] },
  { region:"av", area:"rosamond", name:"The Church On B Street", town:"Rosamond", address:"2850 B St, Rosamond, CA 93560",
    status:"idea", notes:"The Church On B Street", scenes:["church", "press-church"], lat:34.862026, lng:-118.168661, photos:[] },
  { region:"av", area:"rosamond", name:"2869 B St", town:"Rosamond", address:"2869 B St, Rosamond, CA 93560",
    status:"idea", notes:"2869 B St", scenes:[], lat:34.862327, lng:-118.169285, photos:[] },
  { region:"av", area:"rosamond", name:"2805 B St", town:"Rosamond", address:"2805 B St, Rosamond, CA 93560",
    status:"idea", notes:"2805 B St", scenes:[], lat:34.861322, lng:-118.169403, photos:[] },
  { region:"av", area:"rosamond", name:"2057 Gobi Ave", town:"Rosamond", address:"2057 Gobi Ave, Rosamond, CA 93560",
    status:"idea", notes:"2057 Gobi Ave", scenes:[], lat:34.861372, lng:-118.168396, photos:[] },
  { region:"av", area:"rosamond", name:"First Baptist Church-Rosamond", town:"Rosamond", address:"2787 20th St W, Rosamond, CA 93560",
    status:"idea", notes:"First Baptist Church-Rosamond", scenes:["church", "press-church"], lat:34.860813, lng:-118.167443, photos:[] },
  { region:"av", area:"rosamond", name:"El Chulo Burgers", town:"Rosamond", address:"2787 20th St W, Rosamond, CA 93560",
    status:"idea", notes:"El Chulo Burgers", scenes:["diner-lot", "green-acres"], lat:34.862636, lng:-118.167374, photos:[] },
  { region:"av", area:"rosamond", name:"Praise Inn", town:"Rosamond", address:"2700 20th St W, Rosamond, CA 93560",
    status:"idea", notes:"Praise Inn", scenes:["church", "press-church"], lat:34.860077, lng:-118.166894, photos:[] },
  { region:"av", area:"rosamond", name:"Hummell Community Center", town:"Rosamond", address:"2500 20th St W, Rosamond, CA 93560",
    status:"idea", notes:"Hummell Community Center", scenes:["sheriff"], lat:34.857503, lng:-118.166712, photos:[] },
  { region:"av", area:"rosamond", name:"Carl's Motel", town:"Rosamond", address:"2529 Sierra Hwy, Rosamond, CA 93560",
    status:"idea", notes:"Carl's Motel", scenes:["motel"], lat:34.857923, lng:-118.162799, photos:[] },
  { region:"av", area:"rosamond", name:"Dollar General", town:"Rosamond", address:"2475 Sierra Hwy, Rosamond, CA 93560",
    status:"idea", notes:"Dollar General", scenes:["gas-station"], lat:34.856751, lng:-118.162569, photos:[] },
  { region:"av", area:"rosamond", name:"Joshua Motel", town:"Rosamond", address:"2561 Sierra Hwy, Rosamond, CA 93560",
    status:"idea", notes:"Joshua Motel", scenes:["motel"], lat:34.858221, lng:-118.162911, photos:[] },
  { region:"av", area:"rosamond", name:"Rosamond Auto Sales", town:"Rosamond", address:"2609 Sierra Hwy, Rosamond, CA 93560",
    status:"idea", notes:"Rosamond Auto Sales", scenes:["hideout", "slaughterhouse"], lat:34.859028, lng:-118.162797, photos:[] },
  { region:"av", area:"rosamond", name:"Mr Donut & More", town:"Rosamond", address:"2689 Sierra Hwy, Rosamond, CA 93560",
    status:"idea", notes:"Mr Donut & More", scenes:["diner-lot", "green-acres"], lat:34.859552, lng:-118.16291, photos:[] },
  { region:"av", area:"rosamond", name:"Desert Search and Rescue", town:"Rosamond", address:"2980 Desert St, Rosamond, CA 93560",
    status:"idea", notes:"Desert Search and Rescue", scenes:["sheriff"], lat:34.863817, lng:-118.165682, photos:[] },
  { region:"av", area:"rosamond", name:"Home corner of Center", town:"Rosamond", address:"2700 Desert St, Rosamond, CA 93560",
    status:"idea", notes:"Home corner of Center", scenes:["annies-house", "track-home"], lat:34.860082, lng:-118.165059, photos:[] },
  { region:"av", area:"rosamond", name:"Family Faith Center Church of God", town:"Rosamond", address:"2572 Desert St, Rosamond, CA 93560",
    status:"idea", notes:"Family Faith Center Church of God", scenes:["church", "press-church"], lat:34.858388, lng:-118.164804, photos:[] },
  { region:"av", area:"rosamond", name:"Hall Ambulance Rosamond Station", town:"Rosamond", address:"2970 Diamond St, Rosamond, CA 93560",
    status:"idea", notes:"Hall Ambulance Rosamond Station", scenes:["hospital"], lat:34.863858, lng:-118.164133, photos:[] },
  { region:"av", area:"rosamond", name:"building", town:"Rosamond", address:"2924 Diamond St, Rosamond, CA 93560",
    status:"idea", notes:"building", scenes:["hideout", "slaughterhouse"], lat:34.863095, lng:-118.164033, photos:[] },
  { region:"av", area:"rosamond", name:"deluxe auto interiors", town:"Rosamond", address:"2951 Diamond St, Rosamond, CA 93560",
    status:"idea", notes:"deluxe auto interiors", scenes:["hideout", "slaughterhouse"], lat:34.862863, lng:-118.164209, photos:[] },
  { region:"av", area:"rosamond", name:"Adobe Church, 1933", town:"Rosamond", address:"1746 Locust St, Rosamond, CA 93560",
    status:"idea", notes:"Adobe Church, 1933", scenes:["church", "press-church"], lat:34.862482, lng:-118.164038, photos:[] },
  { region:"av", area:"rosamond", name:"painted plane building", town:"Rosamond", address:"2924 Diamond St, Rosamond, CA 93560",
    status:"idea", notes:"painted plane building", scenes:["hideout", "slaughterhouse"], lat:34.862423, lng:-118.164586, photos:[] },
  { region:"av", area:"rosamond", name:"Rosamond Chamber of Commerce", town:"Rosamond", address:"2861 Diamond St, Rosamond, CA 93560",
    status:"idea", notes:"Rosamond Chamber of Commerce", scenes:["sheriff"], lat:34.862245, lng:-118.164551, photos:[] },
  { region:"av", area:"rosamond", name:"Rosamond self service Car Wash", town:"Rosamond", address:"2825 Diamond St, Rosamond, CA 93560",
    status:"idea", notes:"Rosamond self service Car Wash", scenes:["hideout", "slaughterhouse"], lat:34.86179, lng:-118.16449, photos:[] },
  { region:"av", area:"rosamond", name:"Prime Auto Parts", town:"Rosamond", address:"2769 Diamond St, Rosamond, CA 93560",
    status:"idea", notes:"Prime Auto Parts", scenes:["hideout", "slaughterhouse"], lat:34.861009, lng:-118.164434, photos:[] },
  { region:"av", area:"rosamond", name:"BucketLoader Lot", town:"Rosamond", address:"2760 Diamond St, Rosamond, CA 93560",
    status:"idea", notes:"BucketLoader Lot", scenes:["hideout", "slaughterhouse"], lat:34.861018, lng:-118.163859, photos:[] },
  { region:"av", area:"rosamond", name:"E&N General Discount Store (closed)", town:"Rosamond", address:"2743 Diamond St, Rosamond, CA 93560",
    status:"idea", notes:"E&N General Discount Store (closed)", scenes:[], lat:34.860676, lng:-118.164498, photos:[] },
  { region:"av", area:"rosamond", name:"Diamond Hair Designs", town:"Rosamond", address:"2748 Diamond St, Rosamond, CA 93560",
    status:"idea", notes:"Diamond Hair Designs", scenes:[], lat:34.860784, lng:-118.16391, photos:[] },
  { region:"av", area:"rosamond", name:"Construction Lot", town:"Rosamond", address:"2704 Diamond St, Rosamond, CA 93560",
    status:"idea", notes:"Construction Lot", scenes:["hideout", "slaughterhouse"], lat:34.86039, lng:-118.163797, photos:[] },
  { region:"av", area:"rosamond", name:"Rosamond liquor market", town:"Rosamond", address:"2671 Diamond St, Rosamond, CA 93560",
    status:"idea", notes:"Rosamond liquor market", scenes:["gas-station"], lat:34.859798, lng:-118.164207, photos:[] },
  { region:"av", area:"rosamond", name:"Aqua Azul", town:"Rosamond", address:"2660 Diamond St, Rosamond, CA 93560",
    status:"idea", notes:"Aqua Azul", scenes:[], lat:34.859766, lng:-118.163627, photos:[] },
  { region:"av", area:"rosamond", name:"Rosamond Cleaners", town:"Rosamond", address:"2650 Diamond St, Rosamond, CA 93560",
    status:"idea", notes:"Rosamond Cleaners", scenes:[], lat:34.8595, lng:-118.163581, photos:[] },
  { region:"av", area:"rosamond", name:"Rosamond Community Center", town:"Rosamond", address:"2645 Diamond St, Rosamond, CA 93560",
    status:"idea", notes:"Rosamond Community Center", scenes:["sheriff"], lat:34.859422, lng:-118.164125, photos:[] },
  { region:"av", area:"rosamond", name:"J's Hideaway Restaurant & Bar / Pepes Kitchen", town:"Rosamond", address:"2635 Diamond St, Rosamond, CA 93560",
    status:"idea", notes:"J's Hideaway Restaurant & Bar / Pepes Kitchen", scenes:["diner-lot", "green-acres", "hideout"], lat:34.859266, lng:-118.164114, photos:[] },
  { region:"av", area:"rosamond", name:"The Green Mile Collective", town:"Rosamond", address:"2613 Diamond St, Rosamond, CA 93560",
    status:"idea", notes:"The Green Mile Collective", scenes:[], lat:34.858949, lng:-118.164038, photos:[] },
  { region:"av", area:"rosamond", name:"Ol' Dusty Sales Yard", town:"Rosamond", address:"1963 Locust St, Rosamond, CA 93560",
    status:"idea", notes:"Ol' Dusty Sales Yard", scenes:["hideout", "slaughterhouse"], lat:34.862526, lng:-118.166883, photos:[] },
  { region:"av", area:"rosamond", name:"Random Blue Home", town:"Rosamond", address:"1923 Locust St, Rosamond, CA 93560",
    status:"idea", notes:"Random Blue Home", scenes:["annies-house", "track-home"], lat:34.862648, lng:-118.166246, photos:[] },
  { region:"av", area:"rosamond", name:"Random View Home", town:"Rosamond", address:"1938 Poplar St, Rosamond, CA 93560",
    status:"idea", notes:"Random View Home", scenes:["annies-house", "track-home"], lat:34.860744, lng:-118.16618, photos:[] },
  { region:"av", area:"rosamond", name:"NAPA Auto Parts - Rosamond Auto Parts (CLOSED)", town:"Rosamond", address:"2609 Sierra Hwy, Rosamond, CA 93560",
    status:"idea", notes:"NAPA Auto Parts - Rosamond Auto Parts (CLOSED)", scenes:["hideout", "slaughterhouse"], lat:34.861009, lng:-118.164434, photos:[] },
  { region:"av", area:"rosamond", name:"HACHIBAN RAMEN SUSHI BAR & GRILL", town:"Rosamond", address:"2763 Sierra Hwy, Rosamond, CA 93560",
    status:"idea", notes:"HACHIBAN RAMEN SUSHI BAR & GRILL", scenes:["diner-lot", "green-acres"], lat:34.861234, lng:-118.163238, photos:[] },
  { region:"av", area:"rosamond", name:"RANDOM BRICK HOME", town:"Rosamond", address:"1857 Center St, Rosamond, CA 93560",
    status:"idea", notes:"RANDOM BRICK HOME", scenes:["annies-house", "track-home"], lat:34.860108, lng:-118.165069, photos:[] },
  { region:"av", area:"rosamond", name:"El Coyote Cantina & Cocina (closed)", town:"Rosamond", address:"2701 Sierra Hwy, Rosamond, CA 93560",
    status:"idea", notes:"El Coyote Cantina & Cocina (closed)", scenes:["diner-lot", "green-acres"], lat:34.860432, lng:-118.163032, photos:[] },
  { region:"av", area:"rosamond", name:"Random Shitty Texas House", town:"Rosamond", address:"1954 Elm St, Rosamond, CA 93560",
    status:"idea", notes:"Random Shitty Texas House", scenes:["annies-house", "track-home"], lat:34.858256, lng:-118.166086, photos:[] }
];
