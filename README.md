# 📅 Interactive Wall Calendar Component

A polished, interactive **wall calendar** component built with **Next.js 16** and **React 19**, inspired by a physical wall calendar aesthetic. Features date range selection, integrated notes with persistence, theme switching, and fully responsive design.

![Wall Calendar](https://images.unsplash.com/photo-1418985991508-e47386d96a71?w=800&h=400&fit=crop)

---

## ✨ Features

### Core
- **Wall Calendar Aesthetic** — Spiral binding, hero imagery with seasonal photos, blue wave SVG separator, and paper-like feel
- **Day Range Selector** — Click to set start date, click again for end date, with clear visual states (start/end/in-between/today)
- **Integrated Notes** — Add notes tied to selected date ranges, persisted in localStorage
- **Fully Responsive** — Desktop (side-by-side layout) → Tablet → Mobile (stacked), touch-optimized

### Creative Extras
- 🌙 **Dark/Light Theme** — Toggle with smooth transitions, respects system preference
- 📖 **Page Flip Animation** — Framer Motion-powered transitions between months
- 🎌 **Holiday Markers** — Indian + International holidays shown as colored dots with emoji tooltips
- 📅 **Year Overview** — Click month name to see a compact 12-month grid
- ⌨️ **Keyboard Navigation** — Arrow keys for months, Escape to clear selection
- 🖨️ **Print Stylesheet** — Optimized CSS for printing
- ♿ **Accessibility** — ARIA labels, semantic HTML, focus management, reduced-motion support

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| UI Library | React 19 |
| Styling | Vanilla CSS + CSS Modules |
| Animations | Framer Motion |
| Icons | Lucide React |
| Fonts | Geist (via next/font) |
| Persistence | localStorage |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm 9+

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd striver_frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## 📁 Architecture

```
src/app/
├── layout.js                  # Root layout with fonts & metadata
├── page.js                    # Main page with ThemeProvider
├── globals.css                # Design system (tokens, themes, resets)
│
├── components/
│   ├── CalendarApp/           # Main orchestrator
│   ├── HeroImage/             # Seasonal hero image + wave overlay
│   ├── SpiralBinding/         # Decorative spiral rings
│   ├── MonthNavigator/        # Prev/Next/Today controls
│   ├── CalendarGrid/          # 7-column date grid
│   ├── DayCell/               # Individual day with states (memoized)
│   ├── NotesPanel/            # Notes CRUD interface
│   ├── ThemeToggle/           # Dark/Light switch
│   └── YearOverview/          # 12-month mini calendar modal
│
├── hooks/
│   ├── useCalendar.js         # Date navigation state
│   ├── useSelection.js        # Range selection logic
│   └── useNotes.js            # Notes with localStorage
│
├── context/
│   └── ThemeContext.js         # Theme provider + persistence
│
└── utils/
    ├── dateUtils.js           # Date math helpers
    ├── holidays.js            # Holiday data
    └── monthImages.js         # Seasonal Unsplash URLs
```

### Design Decisions

1. **CSS Modules** — Scoped styling prevents conflicts while keeping vanilla CSS' power intact. No utility-class overhead.

2. **Custom Hooks** — Clean separation of concerns: `useCalendar` owns navigation, `useSelection` owns range logic, `useNotes` owns persistence. Components stay thin.

3. **Memoized DayCell** — With up to 42 cells re-rendering on every interaction, `React.memo` on `DayCell` prevents unnecessary work.

4. **Native `<img>` for external images** — Using plain `<img>` tags for Unsplash URLs with gradient fallbacks, avoiding Next/Image remote pattern complexity for a smoother DX.

5. **CSS Custom Properties for Theming** — Single source of truth for colors, shadows, and spacing. Theme switch changes `data-theme` attribute, CSS variables cascade naturally.

6. **localStorage for Persistence** — Per the problem statement (no backend). Notes and theme preference survive page reloads.

---

## 🎯 Key Interactions

| Action | Result |
|--------|--------|
| Click a date | Sets start date (blue circle) |
| Click another date | Sets end date, highlights range |
| Click again | Resets and starts new selection |
| Type in notes input + Enter | Adds note attached to selected range |
| Click month/year text | Opens year overview modal |
| Press ← / → | Navigate months |
| Press Escape | Clear selection |
| Click 🌙 / ☀️ | Toggle dark/light theme |

---

## 📱 Responsive Breakpoints

| Breakpoint | Layout |
|-----------|--------|
| ≥1024px | Side-by-side (notes left, calendar right) |
| 768–1023px | Stacked (notes below calendar) |
| <768px | Stacked, optimized touch targets |
| <480px | Compact mobile layout |

---

## 📄 License

This project was built as part of a frontend engineering challenge.

---

Made with ❤️ by Divyansh Rai
