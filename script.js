const cravings = [
  {
    id: "big_cheap",
    label: "Big & Cheap",
    description: "Hearty portions under $12",
    emoji: "🍛",
  },
  {
    id: "meaty",
    label: "Meaty",
    description: "Protein-packed mains",
    emoji: "🍖",
  },
  {
    id: "vegan",
    label: "Vegan",
    description: "Plant power meals",
    emoji: "🥗",
  },
  {
    id: "vegetarian",
    label: "Vegetarian",
    description: "Cheesy + veggie comfort",
    emoji: "🧀",
  },
  {
    id: "low_calorie",
    label: "Low calorie",
    description: "Under 500 kcals",
    emoji: "🥒",
  },
  {
    id: "spicy",
    label: "Spicy",
    description: "Heat seekers unite",
    emoji: "🌶️",
  },
  {
    id: "flavorful",
    label: "Flavorful",
    description: "Max umami hits",
    emoji: "🍲",
  },
  {
    id: "burger",
    label: "Burger",
    description: "Smash patties & buns",
    emoji: "🍔",
  },
  {
    id: "pizza",
    label: "Pizza",
    description: "Wood-fired slices",
    emoji: "🍕",
  },
];

const menuMatches = {
  big_cheap: [
    {
      name: "Triple Garlic Noodle Bowl",
      restaurant: "Wok & Roll",
      price: "$10.80",
      rating: 4.8,
      distance: "0.4 mi",
      eta: "22 min",
      tags: ["XL portion", "Sesame glaze", "Add tofu"],
    },
    {
      name: "Market Veggie Plate",
      restaurant: "Harvest Street",
      price: "$11.20",
      rating: 4.6,
      distance: "1.1 mi",
      eta: "17 min",
      tags: ["3 sides", "Cornbread", "Free delivery"],
    },
    {
      name: "Loaded Pozole",
      restaurant: "Casa Cielo",
      price: "$9.90",
      rating: 4.7,
      distance: "0.8 mi",
      eta: "24 min",
      tags: ["Hominy", "Chicharrón", "Feeds 2"],
    },
  ],
  meaty: [
    {
      name: "Bone-in Short Rib",
      restaurant: "Ember & Oak",
      price: "$23",
      rating: 4.9,
      distance: "1.4 mi",
      eta: "32 min",
      tags: ["Slow braised", "Smoky glaze", "26g protein"],
    },
    {
      name: "Harissa Lamb Wrap",
      restaurant: "Atlas Mezze",
      price: "$15.50",
      rating: 4.8,
      distance: "0.9 mi",
      eta: "18 min",
      tags: ["Fire grilled", "Garlic yogurt", "Pickled veg"],
    },
    {
      name: "Truffle Steak Frites",
      restaurant: "Salle 19",
      price: "$27",
      rating: 4.7,
      distance: "1.7 mi",
      eta: "35 min",
      tags: ["Prime sirloin", "Sea salt fries", "Fresh chimichurri"],
    },
  ],
  vegan: [
    {
      name: "Miso Maple Power Bowl",
      restaurant: "Sprout Society",
      price: "$13.20",
      rating: 4.8,
      distance: "0.5 mi",
      eta: "16 min",
      tags: ["Tempeh", "Charred broccolini", "Pickled radish"],
    },
    {
      name: "Crunchy Sushi Burrito",
      restaurant: "Plant Lab",
      price: "$12.70",
      rating: 4.6,
      distance: "0.7 mi",
      eta: "19 min",
      tags: ["Jackfruit", "Wasabi peas", "Gluten-free"],
    },
    {
      name: "Roasted Pepper Lasagna",
      restaurant: "Kindred Table",
      price: "$14.90",
      rating: 4.7,
      distance: "1.2 mi",
      eta: "28 min",
      tags: ["Cashew ricotta", "Fresh basil", "Feeds 2"],
    },
  ],
  vegetarian: [
    {
      name: "Wild Mushroom Pappardelle",
      restaurant: "Nona's",
      price: "$16.50",
      rating: 4.9,
      distance: "0.6 mi",
      eta: "25 min",
      tags: ["Handmade pasta", "Truffle oil", "Parmesan crisp"],
    },
    {
      name: "Char Paneer Taco Kit",
      restaurant: "Masala Cartel",
      price: "$15.70",
      rating: 4.7,
      distance: "1.3 mi",
      eta: "27 min",
      tags: ["Griddle paneer", "Ajwain slaw", "5 tacos"],
    },
    {
      name: "Burrata Citrus Salad",
      restaurant: "Clementine",
      price: "$13.40",
      rating: 4.6,
      distance: "0.9 mi",
      eta: "18 min",
      tags: ["Blood orange", "Pistachio crumble", "Honey vinaigrette"],
    },
  ],
  low_calorie: [
    {
      name: "Zesty Ginger Snap Bowl",
      restaurant: "Keen Kitchen",
      price: "$12",
      rating: 4.7,
      distance: "0.3 mi",
      eta: "15 min",
      tags: ["410 kcal", "Glass noodles", "Crunchy veggie"],
    },
    {
      name: "Citrus Herb Salmon",
      restaurant: "Dockside",
      price: "$18",
      rating: 4.8,
      distance: "1 mi",
      eta: "23 min",
      tags: ["480 kcal", "Omega-3", "Charred fennel"],
    },
    {
      name: "Garden Pho Lite",
      restaurant: "Pho Philo",
      price: "$11.30",
      rating: 4.5,
      distance: "0.8 mi",
      eta: "20 min",
      tags: ["Bone broth swap", "Zucchini noodles", "Fresh herbs"],
    },
  ],
  spicy: [
    {
      name: "Firecracker Gochu Bowl",
      restaurant: "Seoul Factory",
      price: "$11.90",
      rating: 4.8,
      distance: "0.6 mi",
      eta: "18 min",
      tags: ["Level 4 heat", "Crispy tofu", "Quick pickup"],
    },
    {
      name: "Aguachile Verde",
      restaurant: "Pacífico",
      price: "$16.20",
      rating: 4.7,
      distance: "1.1 mi",
      eta: "26 min",
      tags: ["Serrano", "Raw shrimp", "Cooling cucumber"],
    },
    {
      name: "Brimstone Birria Ramen",
      restaurant: "Caldera",
      price: "$14.80",
      rating: 4.9,
      distance: "1.4 mi",
      eta: "24 min",
      tags: ["Molten broth", "Quesabirria dip", "After 5pm"],
    },
  ],
  flavorful: [
    {
      name: "Smoked Umami Cauli Steak",
      restaurant: "Torch & Thyme",
      price: "$17.30",
      rating: 4.8,
      distance: "1 mi",
      eta: "30 min",
      tags: ["Black garlic", "Crunchy lentils", "Miso gremolata"],
    },
    {
      name: "XO Crispy Rice",
      restaurant: "Night Market",
      price: "$15.40",
      rating: 4.7,
      distance: "0.8 mi",
      eta: "22 min",
      tags: ["Furikake", "Soft egg", "Chile crunch"],
    },
    {
      name: "Umami Bomb Tostada",
      restaurant: "Luna Verde",
      price: "$13.60",
      rating: 4.6,
      distance: "0.5 mi",
      eta: "19 min",
      tags: ["Charred corn", "Mole drizzle", "Avocado mousse"],
    },
  ],
  burger: [
    {
      name: "Smoked Gouda Smash",
      restaurant: "Stacked Co.",
      price: "$14.20",
      rating: 4.7,
      distance: "0.4 mi",
      eta: "16 min",
      tags: ["Double patty", "Burnt onion jam", "Brioche"],
    },
    {
      name: "Katsu Patty Melt",
      restaurant: "901 Griddle",
      price: "$13.80",
      rating: 4.8,
      distance: "0.9 mi",
      eta: "21 min",
      tags: ["Panko crunch", "Tangy slaw", "House sauce"],
    },
    {
      name: "Green Chile Bison Burger",
      restaurant: "Mesita",
      price: "$15.60",
      rating: 4.9,
      distance: "1.2 mi",
      eta: "24 min",
      tags: ["Roasted chile", "Cotija", "Sweet potato bun"],
    },
  ],
  pizza: [
    {
      name: "Blistered Vodka Pie",
      restaurant: "Neon Crust",
      price: "$18 · 14in",
      rating: 4.9,
      distance: "0.7 mi",
      eta: "26 min",
      tags: ["Sourdough base", "Vodka sauce", "Hot honey"],
    },
    {
      name: "Garden Pistou Slice Pack",
      restaurant: "Sicilian Signal",
      price: "$12 (2 slices)",
      rating: 4.6,
      distance: "0.5 mi",
      eta: "14 min",
      tags: ["Thick crust", "Marinated tomato", "Vegan pesto"],
    },
    {
      name: "Carbonara Bianca",
      restaurant: "Fiamma",
      price: "$21 (whole)",
      rating: 4.8,
      distance: "1.3 mi",
      eta: "32 min",
      tags: ["Guanciale", "Runny yolk", "Aged pecorino"],
    },
  ],
};

const preferenceGrid = document.getElementById("preferenceGrid");
const matchList = document.getElementById("matchList");
const activeCravingLabel = document.getElementById("activeCraving");
const yearSlot = document.getElementById("year");

let activeCravingId = cravings[0].id;

const buildPill = ({ id, label, description, emoji }) => {
  const button = document.createElement("button");
  button.className = "pill-button";
  button.type = "button";
  button.dataset.craving = id;
  button.innerHTML = `
    <span class="pill-label">${emoji} ${label}</span>
    <span class="pill-desc">${description}</span>
  `;

  button.addEventListener("click", () => {
    if (activeCravingId !== id) {
      setActiveCraving(id);
    }
  });

  return button;
};

const buildMealCard = (meal) => {
  const card = document.createElement("article");
  card.className = "meal-card";
  card.innerHTML = `
      <div class="top-row">
        <div>
          <p class="title">${meal.name}</p>
          <p class="restaurant">${meal.restaurant}</p>
        </div>
        <span class="price">${meal.price}</span>
      </div>
      <div class="meta">
        <span>${meal.rating.toFixed(1)}★</span>
        <span>${meal.distance}</span>
        <span>${meal.eta}</span>
      </div>
      <div class="badges">
        ${meal.tags.map((tag) => `<span class="badge">${tag}</span>`).join("")}
      </div>
    `;
  return card;
};

function renderPills() {
  const fragment = document.createDocumentFragment();
  cravings.forEach((craving) => {
    fragment.appendChild(buildPill(craving));
  });
  preferenceGrid.appendChild(fragment);
}

function renderMatches() {
  matchList.innerHTML = "";
  const matches = menuMatches[activeCravingId] || [];

  if (!matches.length) {
    const empty = document.createElement("p");
    empty.textContent = "No matches yet. Check back soon!";
    matchList.appendChild(empty);
    return;
  }

  const fragment = document.createDocumentFragment();
  matches.forEach((meal) => fragment.appendChild(buildMealCard(meal)));
  matchList.appendChild(fragment);
}

function updateActiveStates() {
  document.querySelectorAll(".pill-button").forEach((button) => {
    const isActive = button.dataset.craving === activeCravingId;
    button.classList.toggle("active", isActive);
  });

  const craving = cravings.find((item) => item.id === activeCravingId);
  const heroPrimaryPill = document.querySelector(".mini-pill");
  if (heroPrimaryPill && craving) {
    heroPrimaryPill.textContent = `${craving.emoji} ${craving.label}`;
    heroPrimaryPill.classList.add("active");
  }

  if (activeCravingLabel && craving) {
    activeCravingLabel.textContent = craving.label;
  }
}

function setActiveCraving(id) {
  activeCravingId = id;
  updateActiveStates();
  renderMatches();
}

function wireScrollButtons() {
  document.querySelectorAll("[data-scroll]").forEach((button) => {
    button.addEventListener("click", (event) => {
      const target = document.querySelector(button.dataset.scroll);
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

function wireCtaForm() {
  const form = document.querySelector(".cta-form");
  if (!form) return;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const button = form.querySelector("button");
    const input = form.querySelector("input");
    if (!input.value) return;
    button.textContent = "You're on the list";
    button.disabled = true;
    form.classList.add("submitted");
  });
}

function initYear() {
  if (yearSlot) {
    yearSlot.textContent = new Date().getFullYear();
  }
}

function init() {
  renderPills();
  setActiveCraving(activeCravingId);
  wireScrollButtons();
  wireCtaForm();
  initYear();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
