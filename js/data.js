const fallbackWorkers = [
  {
    id: 1,
    name: "Joy Baidya",
    service: "Electrician",
    location: "Deganga",
    rating: 4.9,
    rate: 650,
    experience: 8,
    availability: "Today",
    image: "assets/images/joy.jpg",
    skills: ["Wiring", "Switchboards", "Fan installation", "Fault repair"],
    bio: "Licensed electrician focused on home repairs, fixture installation, and urgent fault diagnosis.",
    reviews: ["Very punctual and fixed the wiring neatly.", "Explained the issue before starting work."]
  },
  {
    id: 2,
    name: "Dhabali Mondal",
    service: "Cleaner",
    location: "Newtown",
    rating: 4.8,
    rate: 380,
    experience: 5,
    availability: "This week",
    image: "assets/images/dhabali.png",
    skills: ["Deep cleaning", "Kitchen", "Move-in cleaning", "Sanitizing"],
    bio: "Detail-oriented cleaner for homes, rentals, and office spaces.",
    reviews: ["The kitchen looked new again.", "Easy to coordinate and thorough."]
  },
  {
    id: 3,
    name: "Nitish Mondal",
    service: "Plumber",
    location: "Beliaghata",
    rating: 4.7,
    rate: 550,
    experience: 7,
    availability: "Today",
    image: "assets/images/nitish.png",
    skills: ["Leak repair", "Bathroom fittings", "Water tanks", "Drainage"],
    bio: "Experienced plumber handling repairs, installations, and emergency leaks.",
    reviews: ["Stopped a leak quickly.", "Fair rate and clean work."]
  },
  {
    id: 4,
    name: "Jyoti Biswas",
    service: "Painter",
    location: "Barasat",
    rating: 4.6,
    rate: 500,
    experience: 6,
    availability: "This week",
    image: "assets/images/jyoti.jpg",
    skills: ["Interior paint", "Texture walls", "Touch-ups", "Waterproofing"],
    bio: "Painter for home refreshes, room makeovers, and finish repair.",
    reviews: ["Clean edges and good color advice.", "Finished before schedule."]
  },
  {
    id: 5,
    name: "Sumon Mandal",
    service: "Carpenter",
    location: "Kolkata",
    rating: 4.8,
    rate: 700,
    experience: 9,
    availability: "Today",
    image: "assets/images/sumon.jpg",
    skills: ["Furniture repair", "Shelving", "Door fitting", "Modular units"],
    bio: "Carpenter specializing in repair, installation, and custom storage jobs.",
    reviews: ["Strong shelves and precise measurements.", "Professional and tidy."]
  },
  {
    id: 6,
    name: "Bapi Ghosh",
    service: "Mover",
    location: "Madhyamgram",
    rating: 4.5,
    rate: 450,
    experience: 4,
    availability: "This week",
    image: "assets/images/bapi.jpeg",
    skills: ["Packing", "Loading", "Local shifting", "Furniture handling"],
    bio: "Local mover for small home shifts, packing support, and item transport.",
    reviews: ["Handled fragile boxes carefully.", "Helpful team and clear pricing."]
  }
];

async function getWorkers() {
  try {
    const response = await fetch("data/workers.json");
    if (!response.ok) throw new Error("Could not load workers.json");
    const workers = await response.json();
    if (!Array.isArray(workers) || !workers.length || !workers.every((worker) =>
      Number.isInteger(worker.id) && ["name", "service", "location", "image", "bio", "availability"].every((key) => typeof worker[key] === "string") &&
      ["rating", "rate", "experience"].every((key) => Number.isFinite(worker[key])) &&
      Array.isArray(worker.skills) && Array.isArray(worker.reviews))) {
      throw new Error("Invalid worker dataset");
    }
    return workers;
  } catch (error) {
    return fallbackWorkers;
  }
}

function getStoredBookings() {
  try {
    const bookings = JSON.parse(localStorage.getItem("laborconnectBookings") || "[]");
    return Array.isArray(bookings) ? bookings.filter((item) => item && typeof item === "object" && !Array.isArray(item)) : [];
  } catch { return []; }
}

function saveStoredBooking(booking) {
  const bookings = getStoredBookings();
  bookings.unshift(booking);
  try {
    localStorage.setItem("laborconnectBookings", JSON.stringify(bookings));
    return true;
  } catch { return false; }
}
