# Productivity Tracker PWA

A minimalist React-based Progressive Web App designed to gamify productivity using customizable rewards, scores, and streaks.

---

## 🚀 Live Demo

**[Access the live application here](https://neolorenzo.github.io/productivity-pwa/)**

_(Note: Replace with your actual GitHub Pages URL)_

---

## 🧠 Project Vision

This app is designed to be a **frictionless productivity system** — one that feels rewarding, customizable, and genuinely fun to use. Unlike rigid task managers or gamified to-do lists that hand out arbitrary badges or XP, this app lets users define their **own reward logic** and convert effort into **meaningful personal incentives** (e.g. gaming time, social media use, etc.).

The core idea:  
> **"Discipline isn't deprivation — it's earned freedom."**

The app should:
- Let users assign point values to tasks, deadlines, or deep work
- Allow reward types to be user-defined (not hardcoded or gamified for its own sake)
- Support streak tracking to reinforce habit-building
- Minimize cognitive friction (logging should be near-effortless)
- Feel modular, like a toolkit — not a one-size-fits-all system

This is a **framework for customizing motivation** rather than enforcing someone else’s system.

Future features may include:
- Daily, weekly, or custom streak logic
- Real-time timers for deep work
- Push notifications as behavior nudges
- Data syncing and profiles via Firebase
- Competitions or collaborative tracking (long-term)

---

## 🛠️ Tech Stack

- **React** (via Vite) – Frontend framework
- **JavaScript** – Language
- **Vite** – Build tool
- **VS Code** – Development environment
- **GitHub** – Source control
- **PWA Support** – via `vite-plugin-pwa`
- **GitHub Actions** – For Continuous Integration & Deployment (CI/CD)
- **GitHub Pages** – For hosting
- **Firebase integration** (planned – for auth, data sync, push notifications)

---

## 🗂️ Current Folder Structure

.github/
└── workflows/
  └── deploy.yml → Automated deployment workflow
public/
├── index.html → App shell
├── pwa-192x192.png → PWA icon
└── pwa-512x512.png → PWA icon
src/
├── App.jsx → Root component
├── main.jsx → Entry point
├── constants.js → App-level constants
├── pages/
│ └── Home.jsx → Main working page
├── components/
│ └── ScoreDisplay.jsx → Displays the current score
├── hooks/
│ └── useScore.js → Manages score state and persistence
├── styles/
│ └── App.css → Global styling
└── vite.config.js → Vite configuration for build and PWA

---

## 📌 Active Files in VS Code

These files are currently open and will be the main ones touched during development:
- `App.jsx`
- `main.jsx`
- `pages/Home.jsx`
- `styles/App.css`
- `components/` (folder)
- `features/` (folder)
- `hooks/` (folder)
- `utils/` (folder)

---

## 🔜 Upcoming Features

- Core Point System (✅ Implemented)
- Timer/deep work tracker
- Streak logic and display
- Push notifications
- User-defined reward system

---

## 📦 Install & Run

```bash
npm install
npm run dev
```

Open http://localhost:5173
 to view it in the browser.

## 🧹 Cleaned Up

The following have been removed:

- Vite/React default assets (e.g. react.svg, vite.svg)
- README boilerplate

---

## 🧪 Development Notes

- **Framework**: This project uses React with functional components only (no class components).
- **State management**: Currently using React’s built-in `useState` and `useEffect`. No external state libraries yet.
- **File structure philosophy**:
  - `components/` → Reusable presentational elements (e.g. `ScoreDisplay`)
  - `features/` → Self-contained feature logic (e.g. `StreakTracker`, `TimerLogic`)
  - `pages/` → Page-level components for routing and layout
  - `hooks/` → Custom logic abstractions (e.g. `useScore`)
  - `utils/` → Pure utility functions (e.g. formatting, calculations)
- **Styling**: Plain CSS (`App.css`), no CSS modules or Tailwind yet
- **Routing**: Not yet added (may use `react-router-dom` later)
- **Testing**: Not a priority right now — no test suite or test runners installed
- **Gemini note**: AI has access to all open files listed in "📌 Active Files", so keep critical logic in those files or folders

---

## 🧭 Planned Tech/Architecture Decisions

- May switch to **Tailwind CSS** for faster UI iteration
- May use **Firebase Auth + Firestore** for syncing data across devices
- Push notifications will likely be handled via **service workers + Firebase**
- State may stay local for MVP, then expand to **global state or cloud-based sync**
- Modular feature logic in `features/` is intended to be **self-contained and plug-and-play**

---

## 🧱 Design Principles

- **Minimal friction** – The app should feel like a tool, not a chore.
- **User-defined structure** – Users define what counts as productivity and what earns rewards.
- **Composable features** – Each feature (e.g. streaks, timers, scores) should work independently and together.
- **No bloated gamification** – Avoid unnecessary points, badges, or dopamine loops that don’t reflect real value.

---

## 🚀 Deployment

This project uses **GitHub Actions** for automated deployment. Any push to the `main` branch will trigger a workflow that builds the application and deploys it to GitHub Pages.

The live version is automatically updated upon merging changes.