# BiteWise Landing Demo

## Concept & Story

BiteWise is a smart meal-matching companion. The landing page should communicate that users simply tell the app what they are craving ("big and cheap", "meaty", "vegan", etc.) and BiteWise instantly scans menus from nearby restaurants to curate the best dishes. The demo highlights:

- Instant craving selection with playful, tappable pills
- Automatic scanning of nearby menus, powered by BiteWise's AI engine
- A live-feeling feed of matched dishes with prices, ratings, and tags
- Trust signals (coverage stats, partner badges) and a bold call-to-action

## Page Structure

1. **Hero** – product tagline, short value prop, and clear CTA buttons.
2. **Craving Selector** – pill grid of moods and dietary styles with subtle animation.
3. **Smart Matches Feed** – cards that update when a craving is selected.
4. **How It Works** – three simple steps that explain scanning + curation.
5. **Proof & Metrics** – coverage numbers and partner mentions for credibility.
6. **Final CTA** – reiterates the promise and invites early access signups.

## Visual Language

- Warm gradients with a punchy accent color for CTA buttons.
- Rounded cards, glassmorphism blur, and soft drop shadows for a modern feel.
- Responsive grid that collapses gracefully on mobile.

## Implementation Notes

- Pure HTML/CSS/JS (no build tooling required).
- Store craving data + sample menu matches directly in `script.js`.
- Animate state changes with CSS transitions and requestAnimationFrame where helpful.
- Keep assets lightweight so the page can be opened locally by double-clicking `index.html`.

## Built Demo

- **Interactive craving selector** populated from `script.js` data.
- **Live match feed** that swaps cards based on the active craving.
- **Hero preview, proof block, and CTA** styled with glassy cards and gradient accents.

### File map

| File         | Purpose                                                |
| ------------ | ------------------------------------------------------ |
| `index.html` | Page markup and section structure.                     |
| `styles.css` | Visual system, layout, and responsive rules.           |
| `script.js`  | Craving definitions, menu data, and DOM interactivity. |

## Run the demo

1. `cd` into the project folder.
2. Open `index.html` in any modern browser (Chrome, Edge, Safari, Firefox).
3. Tap the craving pills to watch the matches refresh instantly.

Want a lightweight local server for mobile testing?

```bash
python -m http.server 4173
```

Then visit `http://localhost:4173` and open `index.html`.

## Extend the concept

- Swap the static data in `script.js` with a fetch to your menu intelligence API.
- Animate the hero preview so it mirrors the active craving.
- Pipe the CTA form into a service like Resend, Loops, or Supabase for real signups.
