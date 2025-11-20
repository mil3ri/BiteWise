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

const MEALS_DATA_URL = "data/meals.json";

const cravingsById = cravings.reduce((acc, craving) => {
  acc[craving.id] = craving;
  return acc;
}, {});

const filterChipGrid = document.getElementById("filterChipGrid");
const filterSummary = document.getElementById("filterSummary");
const filterApplyButton = document.querySelector("[data-filter-apply]");
const filterSelectAllButton = document.querySelector(
  "[data-filter-select-all]",
);
const openFilterButtons = document.querySelectorAll("[data-open-filters]");
const betaModal = document.getElementById("betaModal");
const betaForm = document.getElementById("betaForm");
const betaStatus = document.getElementById("betaStatus");
const betaSuccess = document.getElementById("betaSuccess");
const betaError = document.getElementById("betaError");
const betaOpenButtons = document.querySelectorAll("[data-open-beta]");
const betaCloseButtons = document.querySelectorAll("[data-close-beta]");

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
let allMeals = [];
let currentFeedMeals = [];
let selectedTagIds = new Set(cravings.map((craving) => craving.id));
const BETA_ENDPOINT =
  (typeof window !== "undefined" && window.BITEWISE_BETA_ENDPOINT) ||
  "https://formspree.io/f/yourFormId";
const BETA_STORAGE_KEY = "bitewiseBetaQueue";

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
  const badges = meal.badges ?? meal.tags ?? [];
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
        ${badges.map((tag) => `<span class="badge">${tag}</span>`).join("")}
      </div>
    `;
  return card;
};

const buildFilterChip = ({ id, label, description, emoji }) => {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "filter-chip";
  button.dataset.filterTag = id;
  button.setAttribute("aria-pressed", String(selectedTagIds.has(id)));
  button.innerHTML = `
    <span class="filter-chip-label">${emoji} ${label}</span>
    <span class="filter-chip-desc">${description}</span>
  `;

  if (selectedTagIds.has(id)) {
    button.classList.add("is-active");
  }

  button.addEventListener("click", () => {
    toggleFilterTag(id);
  });

  return button;
};

function renderFilterChips() {
  if (!filterChipGrid) return;
  filterChipGrid.innerHTML = "";
  const fragment = document.createDocumentFragment();
  cravings.forEach((craving) => {
    fragment.appendChild(buildFilterChip(craving));
  });
  filterChipGrid.appendChild(fragment);
}

function toggleFilterTag(tagId) {
  if (!selectedTagIds.has(tagId) && !cravingsById[tagId]) {
    return;
  }

  const isActive = selectedTagIds.has(tagId);
  if (isActive && selectedTagIds.size === 1) {
    return;
  }

  if (isActive) {
    selectedTagIds.delete(tagId);
  } else {
    selectedTagIds.add(tagId);
  }

  updateFilterChipStates();
  updateFilterSummary();
}

function updateFilterChipStates() {
  if (!filterChipGrid) return;
  filterChipGrid.querySelectorAll(".filter-chip").forEach((chip) => {
    const tagId = chip.dataset.filterTag;
    const isActive = selectedTagIds.has(tagId);
    chip.classList.toggle("is-active", isActive);
    chip.setAttribute("aria-pressed", String(isActive));
  });
}

function updateFilterSummary() {
  if (!filterSummary) return;
  const total = selectedTagIds.size;
  if (total === cravings.length) {
    filterSummary.textContent = "All cravings active";
  } else if (total === 1) {
    const onlyId = Array.from(selectedTagIds)[0];
    filterSummary.textContent =
      cravingsById[onlyId]?.label ?? "1 craving active";
  } else {
    filterSummary.textContent = `${total} cravings active`;
  }
  updateScannerCravingChip();
}

function selectAllFilters() {
  selectedTagIds = new Set(cravings.map((craving) => craving.id));
  updateFilterChipStates();
  updateFilterSummary();
}

function applyFilterSelections() {
  if (!selectedTagIds.size) {
    return;
  }
  currentFeedMeals = buildFeedMeals(Array.from(selectedTagIds));
  activeFeedIndex = 0;
  renderScannerList();
  updateFeedCard(0);
  toggleScannerPanels("list");
}

async function loadMeals() {
  try {
    const response = await fetch(MEALS_DATA_URL, { cache: "no-cache" });
    if (!response.ok) {
      throw new Error(`Unable to load meals (${response.status})`);
    }
    const payload = await response.json();
    allMeals = Array.isArray(payload) ? payload : (payload?.meals ?? []);
  } catch (error) {
    console.error("Failed to load meals", error);
    allMeals = [];
  }
}

function getMealsForCraving(cravingId) {
  if (!cravingId) {
    return [...allMeals];
  }
  return allMeals.filter(
    (meal) => Array.isArray(meal.tags) && meal.tags.includes(cravingId),
  );
}

function getMealsForTagSet(tagIds = []) {
  const ids = Array.isArray(tagIds) ? tagIds : [tagIds].filter(Boolean);
  if (!ids.length) {
    return [...allMeals];
  }
  return allMeals.filter(
    (meal) =>
      Array.isArray(meal.tags) && meal.tags.some((tag) => ids.includes(tag)),
  );
}

function enrichMealForCraving(meal, preferredIds) {
  const priorities = Array.isArray(preferredIds)
    ? preferredIds
    : preferredIds
      ? [preferredIds]
      : [];
  const candidateId =
    priorities.find((id) => meal.tags?.includes(id)) ??
    meal.tags?.find((tag) => cravingsById[tag]);
  const cravingMeta = candidateId ? cravingsById[candidateId] : null;
  return {
    ...meal,
    cravingId: candidateId ?? cravings[0].id,
    cravingLabel: cravingMeta?.label ?? "Match",
    emoji: cravingMeta?.emoji ?? "🍽️",
  };
}

function renderPills() {
  if (!preferenceGrid) return;
  const fragment = document.createDocumentFragment();
  cravings.forEach((craving) => {
    fragment.appendChild(buildPill(craving));
  });
  preferenceGrid.appendChild(fragment);
}

function renderMatches() {
  if (!matchList) return;
  matchList.innerHTML = "";
  const matches = getMealsForCraving(activeCravingId);

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

function buildFeedMeals(preferredTags) {
  const filtered = Array.isArray(preferredTags)
    ? getMealsForTagSet(preferredTags)
    : getMealsForCraving(preferredTags);
  return filtered.map((meal) => enrichMealForCraving(meal, preferredTags));
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
          ${(meal.badges ?? meal.tags ?? [])
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
  renderFilterChips();
  updateFilterSummary();
  currentFeedMeals = buildFeedMeals(Array.from(selectedTagIds));
  activeFeedIndex = 0;
  renderScannerList();
  updateFeedCard(0);
  scannerOverlay.classList.add("is-active");
  scannerOverlay.setAttribute("aria-hidden", "false");
  document.body.classList.add("scanner-open");
  toggleScannerPanels("filters");
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
  const badges = meal.badges ?? meal.tags ?? [];
  feedTags.innerHTML = badges.map((tag) => `<span>${tag}</span>`).join("");
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

  filterApplyButton?.addEventListener("click", applyFilterSelections);
  filterSelectAllButton?.addEventListener("click", selectAllFilters);
  openFilterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      toggleScannerPanels("filters");
    });
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
  const selected = Array.from(selectedTagIds);
  if (!selected.length || selected.length === cravings.length) {
    scannerCravingLabel.textContent = "All cravings";
    return;
  }
  if (selected.length === 1) {
    const craving = cravingsById[selected[0]];
    scannerCravingLabel.textContent = craving
      ? `${craving.emoji} ${craving.label}`
      : "1 craving";
    return;
  }
  const [firstId, ...rest] = selected;
  const first = cravingsById[firstId];
  const label = first ? `${first.emoji} ${first.label}` : "Multiple cravings";
  scannerCravingLabel.textContent = `${label} +${rest.length} more`;
}

function persistBetaSignup(record) {
  try {
    if (typeof localStorage === "undefined") return;
    const existingRaw = localStorage.getItem(BETA_STORAGE_KEY);
    const existing = existingRaw ? JSON.parse(existingRaw) : [];
    existing.push(record);
    localStorage.setItem(BETA_STORAGE_KEY, JSON.stringify(existing));
  } catch (error) {
    console.warn("Unable to persist beta signup locally", error);
  }
}

function resetBetaFeedback() {
  if (betaStatus) betaStatus.textContent = "";
  if (betaSuccess) {
    betaSuccess.textContent = "";
    betaSuccess.classList.add("hidden");
  }
  if (betaError) {
    betaError.textContent = "";
    betaError.classList.add("hidden");
  }
}

function setBetaStatus(message, variant) {
  if (!betaStatus) return;
  betaStatus.textContent = message;
  betaStatus.classList.toggle("text-pink-500", variant === "loading");
  betaStatus.classList.toggle("text-gray-500", variant !== "loading");
}

function openBetaModal() {
  if (!betaModal) return;
  betaModal.classList.remove("hidden");
  betaModal.classList.add("flex");
  document.body.classList.add("overflow-hidden");
  resetBetaFeedback();
  betaForm?.reset();
  document.getElementById("betaEmail")?.focus();
}

function closeBetaModal() {
  if (!betaModal) return;
  betaModal.classList.add("hidden");
  betaModal.classList.remove("flex");
  document.body.classList.remove("overflow-hidden");
}

async function submitBetaForm(event) {
  event.preventDefault();
  if (!betaForm) return;
  resetBetaFeedback();
  const submitBtn = betaForm.querySelector("button[type='submit']");
  const formData = new FormData(betaForm);
  const payload = {
    email: (formData.get("email") ?? "").trim(),
    firstName: (formData.get("firstName") ?? "").trim(),
    lastName: (formData.get("lastName") ?? "").trim(),
    phone: (formData.get("phone") ?? "").trim(),
    submittedAt: new Date().toISOString(),
    source: "bitewise-web",
  };

  if (!payload.email) {
    if (betaError) {
      betaError.textContent = "Email is required to reserve a beta invite.";
      betaError.classList.remove("hidden");
    }
    return;
  }

  submitBtn?.setAttribute("disabled", "true");
  setBetaStatus("Sending your request…", "loading");

  try {
    const response = await fetch(BETA_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json().catch(() => ({}));
    if (!response.ok || result?.ok === false) {
      throw new Error(result?.error || `Beta API error (${response.status})`);
    }

    const record = {
      ...payload,
      submissionId: result?.submission_id ?? result?.id ?? null,
    };
    persistBetaSignup(record);

    if (betaSuccess) {
      betaSuccess.textContent = "You're on the list! We received your info and will reach out soon.";
      if (record.submissionId) {
        const badge = document.createElement("span");
        badge.className = "ml-2 inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-800";
        badge.textContent = `Ticket #${record.submissionId}`;
        betaSuccess.appendChild(badge);
      }
      betaSuccess.classList.remove("hidden");
    }
    setBetaStatus("We'll email you as soon as slots open.");
    betaForm.reset();
  } catch (error) {
    console.error("Unable to submit beta request", error);
    persistBetaSignup({ ...payload, storageFailure: true });
    if (betaError) {
      betaError.textContent =
        "We saved your info locally but couldn't reach the signup service. Please check your connection and try again.";
      betaError.classList.remove("hidden");
    }
    setBetaStatus("Tap submit again when you're back online.");
  } finally {
    submitBtn?.removeAttribute("disabled");
  }
}

function wireBetaModal() {
  if (!betaModal) return;
  betaOpenButtons.forEach((button) =>
    button.addEventListener("click", () => {
      openBetaModal();
    }),
  );
  betaCloseButtons.forEach((button) =>
    button.addEventListener("click", () => {
      closeBetaModal();
    }),
  );
  betaModal.addEventListener("click", (event) => {
    if (event.target === betaModal) {
      closeBetaModal();
    }
  });
  betaForm?.addEventListener("submit", submitBetaForm);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !betaModal.classList.contains("hidden")) {
      closeBetaModal();
    }
  });
}

async function init() {
  renderPills();
  await loadMeals();
  setActiveCraving(activeCravingId);
  wireScrollButtons();
  wireCtaForm();
  wireBetaModal();
  initYear();
  initScanner();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    init();
  });
} else {
  init();
}
