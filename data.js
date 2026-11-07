/* EDIT THIS FILE to add, remove, or update Sakibana listings.
   Duplicate one item object, give it a unique id, and update its details and photos.
   Photo paths can be local files such as my-car-1.jpg. */
/* "icon" = small icon name (car, truck, excavator, tractor, medical)
   "image" = the photo shown on the home page category card */
const CATEGORIES = [
  { id: "cars", name: "Cars", icon: "car", image: "cat-cars.jpg", description: "New and used passenger vehicles" },
  { id: "trucks-trailers", name: "Truck / Trailers", icon: "truck", image: "cat-trucks.jpg", description: "Commercial trucks and trailers" },
  { id: "construction", name: "Construction Equipment", icon: "excavator", image: "cat-construction.jpg", description: "Excavators, loaders, cranes and more" },
  { id: "agri", name: "Agri Equipment", icon: "tractor", image: "cat-agri.jpg", description: "Tractors and agricultural machinery" },
  { id: "medical", name: "Medical Equipment", icon: "medical", image: "cat-medical.jpg", description: "Diagnostic and hospital equipment" }
];

const INVENTORY = [
  {
    id: "CAR-001", category: "cars", title: "Sample Passenger Vehicle", make: "Example make", model: "Example model",
    year: "2020", condition: "Used", mileage: "65,000 km", fuel: "Diesel / Petrol — confirm",
    transmission: "Automatic — confirm", engine: "To be confirmed", location: "Japan",
    availability: "Sample listing — replace before publishing", price: "Price upon request",
    description: "Replace this sample description with the actual vehicle condition, equipment, service history, and any known defects.",
    photos: ["cat-cars.jpg"], specs: { "Reference": "CAR-001", "Manufacturer": "Example make", "Model": "Example model", "Year": "2020", "Mileage": "65,000 km", "Fuel type": "To be confirmed", "Transmission": "To be confirmed", "Steering": "To be confirmed", "Condition": "Used", "Location": "Japan" }
  },
  {
    id: "CON-001", category: "construction", title: "Sample Hydraulic Excavator", make: "Example make", model: "Example model",
    year: "2021", condition: "Used", mileage: "1,200 operating hours", fuel: "Diesel", transmission: "Hydraulic",
    engine: "To be confirmed", location: "Japan", availability: "Sample listing — replace before publishing",
    price: "Price upon request", description: "Replace with actual machine details, maintenance history, attachments, and operating condition.",
    photos: ["cat-construction.jpg"], specs: { "Reference": "CON-001", "Manufacturer": "Example make", "Model": "Example model", "Year": "2021", "Operating hours": "1,200 h", "Operating weight": "To be confirmed", "Engine power": "To be confirmed", "Bucket capacity": "To be confirmed", "Condition": "Used", "Location": "Japan" }
  },
  {
    id: "AGRI-001", category: "agri", title: "Sample Agricultural Tractor", make: "Example make", model: "Example model",
    year: "2022", condition: "Used", mileage: "850 operating hours", fuel: "Diesel", transmission: "To be confirmed",
    engine: "To be confirmed", location: "Japan", availability: "Sample listing — replace before publishing",
    price: "Price upon request", description: "Replace with actual tractor specifications, implements included, maintenance records, and condition.",
    photos: ["cat-agri.jpg"], specs: { "Reference": "AGRI-001", "Manufacturer": "Example make", "Model": "Example model", "Year": "2022", "Operating hours": "850 h", "Engine power": "To be confirmed", "Drive": "2WD / 4WD — confirm", "PTO": "To be confirmed", "Condition": "Used", "Location": "Japan" }
  }
];