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
- **Firebase** – For authentication (Auth) and data persistence (Firestore)
- **VS Code** – Development environment
- **GitHub** – Source control
- **PWA Support** – via `vite-plugin-pwa`
- **GitHub Actions** – For Continuous Integration & Deployment (CI/CD)
- **GitHub Pages** – For hosting

---

## 🗂️ Current Folder Structure

.github/
└── workflows/
    └── deploy.yml
public/
├── pwa-192x192.png
└── pwa-512x512.png
src/
├── components/
│   ├── Auth.jsx
│   ├── DisplaySettings.jsx
│   ├── ScoreDisplay.jsx
│   ├── SessionNotesModal.jsx
│   └── SettingsManager.jsx
├── features/
│   └── Timer/
│       ├── index.jsx
│       ├── SessionImporter.jsx
│       ├── SessionLog.jsx
│       ├── TimerControls.jsx
│       └── TimerDisplay.jsx
├── hooks/
│   ├── useAuth.jsx
│   ├── useScore.jsx
│   ├── useSettings.jsx
│   └── useTimer.jsx
├── pages/
│   └── Home.jsx
├── styles/
│   └── App.css
├── utils/
│   ├── csvParser.jsx
│   └── formatters.js
├── App.jsx
├── constants.js
├── firebase.js
├── main.jsx
└── vite.config.js

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

## ✅ Implemented Features

- **Firebase Authentication**: Users can sign in with their Google account.
- **Cloud-Synced Score**: Score is tied to the user's account and synced with Firestore.
- **Focus Timer**: A full-featured timer to track work sessions with start, pause, and stop functionality.
- **Session Logging**: All completed timer sessions are logged with duration, breaks, and user notes.
- **Session Import**: Users can import past sessions from a CSV file.
- **Customizable Display**: Date and time formats can be changed in the settings.
- **Data Management**: Users can clear their score or session history.

## 🔜 Upcoming Features

- Streak logic and display
- Push notifications for reminders
- User-defined reward system
- More comprehensive task score system
- Ability to start timer and leave it running while quitting application

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
- **State management**: Uses a combination of React's built-in hooks (`useState`, `useEffect`) for component-level state and **Firebase (Firestore)** for persistent, cloud-synced data like the user's score. Session data is currently persisted to `localStorage`.
- **File structure philosophy**:
  - `components/` → Reusable, often stateless UI components used across the app (e.g., `Button`, `Modal`).
  - `features/` → Self-contained modules that represent a major piece of functionality, complete with their own components and logic (e.g., `Timer`).
  - `pages/` → Top-level components that compose features and components into a full view (e.g., `Home`).
  - `hooks/` → Custom hooks that encapsulate complex, reusable logic (e.g., `useAuth`, `useTimer`).
  - `utils/` → Pure, shared utility functions that have no state or side effects (e.g., `formatDate`, `parseCSV`).
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