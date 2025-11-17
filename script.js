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
const startScannerBtn = document.getElementById("startScannerBtn");
const scannerOverlay = document.getElementById("scannerOverlay");
const scannerList = document.getElementById("scannerList");
const feedCard = document.getElementById("feedCard");
const feedTitle = document.getElementById("feedTitle");
const feedRestaurant = document.getElementById("feedRestaurant");
const feedPrice = document.getElementById("feedPrice");
const feedMeta = document.getElementById("feedMeta");
const feedTags = document.getElementById("feedTags");
const feedCraving = document.getElementById("feedCraving");
const feedIndexLabel = document.getElementById("feedIndex");
const feedPreviewCard = document.getElementById("feedPreview");
const feedPreviewLabel = document.getElementById("feedPreviewLabel");
const feedPreviewTitle = document.getElementById("feedPreviewTitle");
const feedPreviewMeta = document.getElementById("feedPreviewMeta");
const feedNavButtons = document.querySelectorAll("[data-feed-nav]");
const backToListBtn = document.querySelector("[data-back-to-list]");
const closeScannerButtons = document.querySelectorAll("[data-close-scanner]");
const scannerCravingLabel = document.getElementById("scannerCravingLabel");
const swipeHintLeft = document.querySelector("[data-swipe-hint='left']");
const swipeHintRight = document.querySelector("[data-swipe-hint='right']");

let activeCravingId = cravings[0].id;
let activeFeedIndex = 0;
let pointerStart = null;
let dragIntent = null;
let currentFeedMeals = [];

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
  updateScannerCravingChip();
}

function buildFeedMeals(filterCravingId) {
  const lookup = cravings.reduce((acc, craving) => {
    acc[craving.id] = craving;
    return acc;
  }, {});

  const meals = [];
  const cravingIds = filterCravingId
    ? [filterCravingId]
    : Object.keys(menuMatches);

  cravingIds.forEach((cravingId) => {
    const entries = menuMatches[cravingId];
    if (!entries) return;
    entries.forEach((meal) => {
      meals.push({
        ...meal,
        cravingId,
        cravingLabel: lookup[cravingId]?.label ?? "Match",
        emoji: lookup[cravingId]?.emoji ?? "🍽️",
      });
    });
  });
  return meals;
}

function renderScannerList() {
  if (!scannerList) return;
  scannerList.innerHTML = "";
  if (!currentFeedMeals.length) {
    const emptyRow = document.createElement("li");
    emptyRow.className = "scanner-empty";
    emptyRow.textContent =
      "No dishes match this craving right now. We'll ping you the moment something pops!";
    scannerList.appendChild(emptyRow);
    return;
  }
  const fragment = document.createDocumentFragment();
  currentFeedMeals.forEach((meal, index) => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.className = "scanner-row-btn";
    button.type = "button";
    button.dataset.index = index;
    button.innerHTML = `
      <span class="scanner-row-emoji">${meal.emoji}</span>
      <div>
        <p class="scanner-row-title">${meal.name}</p>
        <p class="scanner-row-meta">${meal.restaurant} • ${meal.distance} • ${meal.price}</p>
        <div class="scanner-row-tags">
          ${meal.tags
            .slice(0, 3)
            .map((tag) => `<span class="badge">${tag}</span>`)
            .join("")}
        </div>
      </div>
      <span class="scanner-row-chevron">›</span>
    `;
    li.appendChild(button);
    fragment.appendChild(li);
  });

  scannerList.appendChild(fragment);
}

function openScanner() {
  if (!scannerOverlay) return;
  currentFeedMeals = buildFeedMeals(activeCravingId);
  activeFeedIndex = 0;
  renderScannerList();
  updateScannerCravingChip();
  updateFeedCard(0);
  scannerOverlay.classList.add("is-active");
  scannerOverlay.setAttribute("aria-hidden", "false");
  scannerOverlay.setAttribute("data-view", "list");
  document.body.classList.add("scanner-open");
  toggleScannerPanels("list");
}

function closeScanner() {
  if (!scannerOverlay) return;
  scannerOverlay.classList.remove("is-active");
  scannerOverlay.setAttribute("aria-hidden", "true");
  toggleScannerPanels("list");
  document.body.classList.remove("scanner-open");
}

function toggleScannerPanels(targetView) {
  if (!scannerOverlay) return;
  scannerOverlay.setAttribute("data-view", targetView);
  scannerOverlay.querySelectorAll("[data-view-panel]").forEach((panel) => {
    const isActive = panel.dataset.viewPanel === targetView;
    panel.setAttribute("aria-hidden", String(!isActive));
  });
}

function updateFeedCard(index) {
  if (!feedCard) return;
  if (!currentFeedMeals.length) {
    feedCraving.textContent = "No matches";
    feedTitle.textContent = "We’re still scanning nearby kitchens";
    feedRestaurant.textContent = "";
    feedPrice.textContent = "";
    feedMeta.textContent = "Check back in a few minutes";
    feedTags.innerHTML = "";
    feedIndexLabel.textContent = "0/0";
    feedNavButtons.forEach((button) => {
      button.disabled = true;
    });
    resetFeedPreview(true);
    return;
  }

  feedNavButtons.forEach((button) => {
    button.disabled = false;
  });

  activeFeedIndex =
    ((index % currentFeedMeals.length) + currentFeedMeals.length) %
    currentFeedMeals.length;
  const meal = currentFeedMeals[activeFeedIndex];
  feedCraving.textContent = `${meal.emoji} ${meal.cravingLabel}`;
  feedTitle.textContent = meal.name;
  feedRestaurant.textContent = `${meal.restaurant} • ${meal.distance}`;
  feedPrice.textContent = meal.price;
  feedMeta.textContent = `${meal.rating.toFixed(1)}★ · ${meal.eta}`;
  feedTags.innerHTML = meal.tags.map((tag) => `<span>${tag}</span>`).join("");
  feedIndexLabel.textContent = `${activeFeedIndex + 1}/${currentFeedMeals.length}`;
  feedCard.dataset.index = String(activeFeedIndex);
  setFeedPreview(1);
  resetFeedPreview();
}

function setFeedPreview(step = 1) {
  if (!feedPreviewCard || !currentFeedMeals.length) return;
  const max = currentFeedMeals.length;
  const previewIndex = (((activeFeedIndex + step) % max) + max) % max;
  const meal = currentFeedMeals[previewIndex];
  if (!meal) return;
  if (feedPreviewLabel) {
    feedPreviewLabel.textContent = `${meal.emoji} ${meal.cravingLabel}`;
  }
  if (feedPreviewTitle) {
    feedPreviewTitle.textContent = meal.name;
  }
  if (feedPreviewMeta) {
    feedPreviewMeta.textContent = `${meal.restaurant} • ${meal.distance} • ${meal.price}`;
  }
  feedPreviewCard.dataset.direction = step > 0 ? "next" : "prev";
}

function resetFeedPreview(clearContent = false) {
  if (!feedPreviewCard) return;
  feedPreviewCard.style.opacity = "";
  feedPreviewCard.style.transform = "";
  if (clearContent) {
    if (feedPreviewLabel) feedPreviewLabel.textContent = "";
    if (feedPreviewTitle) feedPreviewTitle.textContent = "";
    if (feedPreviewMeta) feedPreviewMeta.textContent = "";
  }
}

function updateSwipeHint(direction, progress) {
  const target = direction === "left" ? swipeHintLeft : swipeHintRight;
  const other = direction === "left" ? swipeHintRight : swipeHintLeft;
  if (target) {
    target.style.opacity = `${progress}`;
  }
  if (other && other !== target) {
    other.style.opacity = "";
  }
}

function resetSwipeHints() {
  [swipeHintLeft, swipeHintRight].forEach((hint) => {
    if (hint) {
      hint.style.opacity = "";
    }
  });
}

function applyVerticalDrag(deltaY) {
  if (!feedCard) return;
  const maxPull = 180;
  const clamped = Math.max(Math.min(deltaY, maxPull), -maxPull);
  if (Math.abs(clamped) < 4) {
    feedCard.style.transform = "";
    feedCard.style.opacity = "";
    resetFeedPreview();
    return;
  }

  const directionStep = clamped < 0 ? 1 : -1;
  setFeedPreview(directionStep);
  const progress = Math.min(Math.abs(clamped) / maxPull, 1);
  feedCard.style.transform = `translateY(${clamped * 0.3}px) scale(${1 - progress * 0.04})`;
  feedCard.style.opacity = `${1 - progress * 0.12}`;

  if (feedPreviewCard) {
    feedPreviewCard.style.opacity = `${progress}`;
    const baseOffset = directionStep > 0 ? 90 : -90;
    const previewY = baseOffset * (1 - progress);
    feedPreviewCard.style.transform = `translate(-50%, ${previewY}px) scale(${0.92 + progress * 0.08})`;
  }
}

function applyHorizontalDrag(deltaX) {
  if (!feedCard) return;
  const maxSlide = 140;
  const clamped = Math.max(Math.min(deltaX, maxSlide), -maxSlide);
  if (Math.abs(clamped) < 4) {
    feedCard.style.transform = "";
    feedCard.style.opacity = "";
    resetSwipeHints();
    return;
  }

  const progress = Math.min(Math.abs(clamped) / maxSlide, 1);
  feedCard.style.transform = `translateX(${clamped * 0.4}px) rotate(${(clamped / maxSlide) * 4}deg)`;
  feedCard.style.opacity = `${1 - progress * 0.08}`;
  const direction = clamped < 0 ? "left" : "right";
  updateSwipeHint(direction, progress);
}

function settleInteractiveCard() {
  if (!feedCard) return;
  feedCard.style.transition = "transform 220ms ease, opacity 220ms ease";
  feedCard.style.transform = "";
  feedCard.style.opacity = "";
  feedCard.addEventListener(
    "transitionend",
    () => {
      if (feedCard) {
        feedCard.style.transition = "";
      }
    },
    { once: true },
  );

  if (feedPreviewCard) {
    feedPreviewCard.style.transition =
      "transform 220ms ease, opacity 220ms ease";
    feedPreviewCard.style.transform = "";
    feedPreviewCard.style.opacity = "";
    feedPreviewCard.addEventListener(
      "transitionend",
      () => {
        if (feedPreviewCard) {
          feedPreviewCard.style.transition = "";
        }
      },
      { once: true },
    );
  }

  resetSwipeHints();
}

function enterFeedFromList(index) {
  if (!currentFeedMeals.length) return;
  updateFeedCard(index);
  toggleScannerPanels("feed");
}

function shiftFeed(step) {
  if (!currentFeedMeals.length) return;
  updateFeedCard(activeFeedIndex + step);
}

function openRestaurantPage() {
  const meal = currentFeedMeals[activeFeedIndex];
  if (!meal) return;
  const query = encodeURIComponent(`${meal.restaurant} ${meal.name}`);
  window.open(`https://www.google.com/search?q=${query}`, "_blank", "noopener");
}

function handleGesture(deltaX, deltaY, intent = null) {
  const horizontal = Math.abs(deltaX);
  const vertical = Math.abs(deltaY);
  const horizontalThreshold = 70;
  const verticalThreshold = 60;

  if (
    (intent === "horizontal" || horizontal > vertical) &&
    horizontal > horizontalThreshold
  ) {
    if (deltaX < 0) {
      openRestaurantPage();
    } else {
      toggleScannerPanels("list");
    }
    return;
  }

  if (
    (intent === "vertical" || vertical > horizontal) &&
    vertical > verticalThreshold
  ) {
    if (deltaY < 0) {
      shiftFeed(1);
    } else {
      shiftFeed(-1);
    }
  }
}

function wireFeedGestures() {
  if (!feedCard) return;
  const resetPointer = () => {
    pointerStart = null;
    dragIntent = null;
  };

  feedCard.addEventListener("pointerdown", (event) => {
    pointerStart = {
      x: event.clientX,
      y: event.clientY,
      pointerId: event.pointerId,
    };
    dragIntent = null;
    feedCard.setPointerCapture(event.pointerId);
    feedCard.style.transition = "";
    if (feedPreviewCard) {
      feedPreviewCard.style.transition = "";
    }
    resetSwipeHints();
    resetFeedPreview();
  });

  feedCard.addEventListener("pointermove", (event) => {
    if (!pointerStart) return;
    const deltaX = event.clientX - pointerStart.x;
    const deltaY = event.clientY - pointerStart.y;

    if (!dragIntent) {
      if (Math.abs(deltaX) > 8 || Math.abs(deltaY) > 8) {
        dragIntent =
          Math.abs(deltaY) > Math.abs(deltaX) ? "vertical" : "horizontal";
      } else {
        return;
      }
    }

    if (dragIntent === "vertical") {
      applyVerticalDrag(deltaY);
    } else {
      applyHorizontalDrag(deltaX);
    }
  });

  feedCard.addEventListener("pointerup", (event) => {
    if (!pointerStart) return;
    const deltaX = event.clientX - pointerStart.x;
    const deltaY = event.clientY - pointerStart.y;
    handleGesture(deltaX, deltaY, dragIntent);
    feedCard.releasePointerCapture(pointerStart.pointerId);
    settleInteractiveCard();
    resetPointer();
  });

  feedCard.addEventListener("pointercancel", () => {
    if (!pointerStart) return;
    feedCard.releasePointerCapture(pointerStart.pointerId);
    settleInteractiveCard();
    resetPointer();
  });
}

function handleScannerKeyNav(event) {
  if (!scannerOverlay || !scannerOverlay.classList.contains("is-active"))
    return;

  if (event.key === "Escape") {
    closeScanner();
    return;
  }

  const view = scannerOverlay.getAttribute("data-view");
  if (view !== "feed") return;
  const key = event.key;
  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(key)) {
    event.preventDefault();
  }

  switch (key) {
    case "ArrowUp":
      shiftFeed(-1);
      break;
    case "ArrowDown":
      shiftFeed(1);
      break;
    case "ArrowLeft":
      openRestaurantPage();
      break;
    case "ArrowRight":
      toggleScannerPanels("list");
      break;
    default:
      break;
  }
}

function initScanner() {
  if (!startScannerBtn || !scannerOverlay || !scannerList) return;
  startScannerBtn.addEventListener("click", () => {
    openScanner();
  });

  closeScannerButtons.forEach((button) => {
    button.addEventListener("click", closeScanner);
  });

  scannerOverlay.addEventListener("click", (event) => {
    if (
      event.target === scannerOverlay ||
      event.target.classList.contains("scanner-backdrop")
    ) {
      closeScanner();
    }
  });

  scannerList.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-index]");
    if (!trigger) return;
    enterFeedFromList(Number(trigger.dataset.index));
  });

  feedNavButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const step = button.dataset.feedNav === "next" ? 1 : -1;
      shiftFeed(step);
    });
  });

  backToListBtn?.addEventListener("click", () => {
    toggleScannerPanels("list");
  });

  wireFeedGestures();
  document.addEventListener("keydown", handleScannerKeyNav);
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

function updateScannerCravingChip() {
  if (!scannerCravingLabel) return;
  const craving = cravings.find((item) => item.id === activeCravingId);
  if (!craving) {
    scannerCravingLabel.textContent = "All cravings";
    return;
  }
  scannerCravingLabel.textContent = `${craving.emoji} ${craving.label}`;
}

function init() {
  renderPills();
  setActiveCraving(activeCravingId);
  wireScrollButtons();
  wireCtaForm();
  initYear();
  initScanner();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
