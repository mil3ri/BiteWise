const cravings = [
  { id: "big_cheap", label: "Big & Cheap", description: "Hearty portions under $12", emoji: "🍛" },
  { id: "meaty", label: "Meaty", description: "Protein-packed mains", emoji: "🍖" },
  { id: "vegan", label: "Vegan", description: "Plant power meals", emoji: "🥗" },
  { id: "vegetarian", label: "Vegetarian", description: "Cheesy + veggie comfort", emoji: "🧀" },
  { id: "low_calorie", label: "Low calorie", description: "Under 500 kcals", emoji: "🥒" },
  { id: "spicy", label: "Spicy", description: "Heat seekers unite", emoji: "🌶️" },
  { id: "flavorful", label: "Flavorful", description: "Max umami hits", emoji: "🍲" },
  { id: "burger", label: "Burger", description: "Smash patties & buns", emoji: "🍔" },
  { id: "pizza", label: "Pizza", description: "Wood-fired slices", emoji: "🍕" },
];

const cravingsById = cravings.reduce((acc, craving) => {
  acc[craving.id] = craving;
  return acc;
}, {});

const MEALS_DATA_URL = "data/meals.json";
const listEl = document.getElementById("scannerList");
const statusEl = document.getElementById("scannerStatus");
const feedCraving = document.getElementById("feedCraving");
const feedTitle = document.getElementById("feedTitle");
const feedRestaurant = document.getElementById("feedRestaurant");
const feedPrice = document.getElementById("feedPrice");
const feedMeta = document.getElementById("feedMeta");
const feedTags = document.getElementById("feedTags");
const feedIndexLabel = document.getElementById("feedIndex");
const feedPreviewLabel = document.getElementById("feedPreview");
const navButtons = document.querySelectorAll("[data-feed-nav]");
const feedPanel = document.querySelector("[data-feed-panel]");
const feedOverlay = document.querySelector("[data-feed-overlay]");
const closeFeedButton = document.querySelector("[data-close-feed]");
const yearSlot = document.getElementById("scannerYear");
const desktopQuery = window.matchMedia("(min-width: 1024px)");

let meals = [];
let feedMeals = [];
let activeFeedIndex = 0;
let mobileFeedOpen = false;

init();

function init() {
  if (yearSlot) {
    yearSlot.textContent = new Date().getFullYear();
  }
  attachNavHandlers();
  attachFeedPanelHandlers();
  syncFeedPanelToViewport();
  loadAndRender();
}

function attachNavHandlers() {
  navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const dir = button.dataset.feedNav === "next" ? 1 : -1;
      moveFeed(dir);
      showFeedPanel();
    });
  });
}

function attachFeedPanelHandlers() {
  closeFeedButton?.addEventListener("click", hideFeedPanel);
  feedOverlay?.addEventListener("click", hideFeedPanel);
  if (typeof desktopQuery.addEventListener === "function") {
    desktopQuery.addEventListener("change", syncFeedPanelToViewport);
  } else if (typeof desktopQuery.addListener === "function") {
    desktopQuery.addListener(syncFeedPanelToViewport);
  }
}

async function loadAndRender() {
  setStatus("Loading matches…");
  meals = await loadMeals();
  feedMeals = buildFeedMeals(meals);
  renderList();
  activeFeedIndex = 0;
  updateFeedCard(activeFeedIndex);
  highlightActiveRow();
  const hasMeals = Boolean(feedMeals.length);
  setStatus(hasMeals ? "Tap a dish to open the swipe deck." : "No dishes available right now.");
  if (desktopQuery.matches && hasMeals) {
    showFeedPanel();
  }
}

async function loadMeals() {
  try {
    const response = await fetch(MEALS_DATA_URL, { cache: "no-cache" });
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }
    const payload = await response.json();
    return Array.isArray(payload) ? payload : payload?.meals ?? [];
  } catch (error) {
    console.error("Failed to load meals", error);
    return [];
  }
}

function buildFeedMeals(sourceMeals = []) {
  return sourceMeals.map((meal) => enrichMeal(meal));
}

function enrichMeal(meal) {
  const candidateId = meal.tags?.find((tag) => cravingsById[tag]) ?? cravings[0].id;
  const cravingMeta = cravingsById[candidateId] ?? cravings[0];
  return {
    ...meal,
    cravingId: candidateId,
    cravingLabel: cravingMeta.label,
    emoji: cravingMeta.emoji,
  };
}

function renderList() {
  if (!listEl) return;
  listEl.innerHTML = "";
  if (!feedMeals.length) {
    const empty = document.createElement("li");
    empty.className = "rounded-2xl border border-dashed border-gray-300 bg-white/60 px-4 py-6 text-center text-sm text-gray-500";
    empty.textContent = "No dishes to show yet.";
    listEl.appendChild(empty);
    return;
  }

  const fragment = document.createDocumentFragment();
  feedMeals.forEach((meal, index) => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.index = index;
    button.className = rowClass(index === activeFeedIndex);
    button.innerHTML = `
      <span class="text-2xl">${meal.emoji}</span>
      <div class="flex-1 text-left">
        <p class="font-semibold text-gray-900">${meal.name}</p>
        <p class="text-xs text-gray-500">${meal.restaurant} • ${meal.distance} • ${meal.price}</p>
        <div class="mt-1 flex flex-wrap gap-1 text-[11px] text-gray-500">
          ${(meal.badges ?? meal.tags ?? [])
            .slice(0, 3)
            .map((tag) => `<span class="rounded-full bg-gray-100 px-2 py-0.5">${tag}</span>`)
            .join("")}
        </div>
      </div>
      <span class="text-gray-400">›</span>
    `;
    button.addEventListener("click", () => {
      activeFeedIndex = index;
      updateFeedCard(activeFeedIndex);
      showFeedPanel();
    });
    li.appendChild(button);
    fragment.appendChild(li);
  });
  listEl.appendChild(fragment);
}

function rowClass(isActive) {
  const base = "scanner-row-btn flex w-full items-center gap-4 rounded-2xl border px-4 py-3 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-300";
  return `${base} ${isActive ? "border-pink-400 bg-pink-50 shadow-sm" : "border-gray-200 bg-white hover:border-gray-300"}`;
}

function highlightActiveRow() {
  if (!listEl) return;
  listEl.querySelectorAll("button[data-index]").forEach((button) => {
    const index = Number(button.dataset.index);
    button.className = rowClass(index === activeFeedIndex);
  });
}

function updateFeedCard(index) {
  if (!feedMeals.length) {
    feedCraving.textContent = "No results";
    feedTitle.textContent = "—";
    feedRestaurant.textContent = "";
    feedPrice.textContent = "";
    feedMeta.innerHTML = "";
    feedTags.innerHTML = "";
    feedIndexLabel.textContent = "0 / 0";
    feedPreviewLabel.textContent = "";
    return;
  }

  const safeIndex = ((index % feedMeals.length) + feedMeals.length) % feedMeals.length;
  activeFeedIndex = safeIndex;
  const meal = feedMeals[safeIndex];
  feedCraving.textContent = `${meal.emoji} ${meal.cravingLabel}`;
  feedTitle.textContent = meal.name;
  feedRestaurant.textContent = `${meal.restaurant} • ${meal.distance}`;
  feedPrice.textContent = meal.price;
  const ratingText = typeof meal.rating === "number" ? meal.rating.toFixed(1) : meal.rating ?? "—";
  const etaText = meal.eta ?? meal.delivery ?? "—";
  const nutritionText = meal.calories ?? meal.macros ?? "Clean ingredients";
  feedMeta.innerHTML = `
    <span>${ratingText} ★</span>
    <span>${etaText}</span>
    <span>${nutritionText}</span>
  `;
  feedTags.innerHTML = (meal.badges ?? meal.tags ?? [])
    .slice(0, 4)
    .map((tag) => `<span class="rounded-full bg-pink-100 px-3 py-1 text-xs text-pink-600">${tag}</span>`)
    .join("");
  feedIndexLabel.textContent = `${safeIndex + 1} / ${feedMeals.length}`;
  const next = feedMeals[(safeIndex + 1) % feedMeals.length];
  feedPreviewLabel.textContent = next ? `${next.emoji} ${next.name}` : "End of queue";
  highlightActiveRow();
}

function moveFeed(delta) {
  if (!feedMeals.length) return;
  const next = (activeFeedIndex + delta + feedMeals.length) % feedMeals.length;
  updateFeedCard(next);
}

function showFeedPanel() {
  if (!feedPanel) return;
  if (!desktopQuery.matches) {
    mobileFeedOpen = true;
  }
  syncFeedPanelToViewport();
}

function hideFeedPanel() {
  if (!feedPanel || desktopQuery.matches) return;
  mobileFeedOpen = false;
  syncFeedPanelToViewport();
}

function syncFeedPanelToViewport() {
  if (!feedPanel) return;
  if (desktopQuery.matches) {
    feedPanel.classList.remove("hidden");
    feedPanel.setAttribute("aria-hidden", "false");
    feedOverlay?.classList.add("hidden");
    feedOverlay?.setAttribute("aria-hidden", "true");
    return;
  }

  if (mobileFeedOpen) {
    feedPanel.classList.remove("hidden");
    feedPanel.setAttribute("aria-hidden", "false");
    feedOverlay?.classList.remove("hidden");
    feedOverlay?.setAttribute("aria-hidden", "false");
  } else {
    feedPanel.classList.add("hidden");
    feedPanel.setAttribute("aria-hidden", "true");
    feedOverlay?.classList.add("hidden");
    feedOverlay?.setAttribute("aria-hidden", "true");
  }
}

function setStatus(message) {
  if (statusEl) {
    statusEl.textContent = message;
  }
}
