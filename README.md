# Productivity Tracker PWA

A minimalist React-based Progressive Web App designed to gamify productivity using customizable rewards, scores, and streaks.

---

## 🚀 Live Demo

**[Access the live application here](https://neolorenzo.github.io/productivity-pwa/)**

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

---

## 🛠️ Tech Stack

- **React** (via Vite) – Frontend framework
- **JavaScript** – Language
- **Vite** – Build tool
- **Firebase** – For authentication (Auth) and data persistence (Firestore)
- **React Router** – For client-side routing (`react-router-dom`)
- **VS Code** – Development environment
- **GitHub** – Source control
- **PWA Support** – via `vite-plugin-pwa`
- **GitHub Actions** – For Continuous Integration & Deployment (CI/CD)
- **GitHub Pages** – For hosting

---

## ✅ Implemented Features

- **Firebase Authentication**: Users can sign in with their Google account.
- **User-Defined Task Rewards**: Users can create and manage a personal list of tasks, each with a custom point value.
- **Cloud-Synced Data**: All session and task data is tied to the user's account and synced with Firestore.
- **Focus Timer with Task Integration**: At the end of a timer session, users can select the tasks they completed to automatically calculate and log their score.
- **Multi-Page Navigation**: Uses React Router to provide separate pages for the timer, session history, and task management.
- **Session Logging & History**: All completed timer sessions are logged, showing work duration, completed tasks, and the score earned for that session.
- **Daily Summary**: The history page includes a summary of total work duration, session counts, and total points earned per day.
- **Session Import**: Users can import past sessions from a CSV file.
- **Customizable Display**: Date and time formats can be changed in the settings.
- **Data Management**: Users can clear their entire session history.

## 🔜 Upcoming Features

- Create page which serves as a resource on how to be more productive and / or have a more balanced work + play relationship.

- Basic fitness tracker / workout tracker which will also give rewards

- Create profile view which shows stats, such as streaks.
- Share button that allows to share certain stats to social media
- Move Sign Out button to profile.

- Add a way to select session and delete them
- Add a way to edit sessions in session history
- History on mobile is mega annoying to use.
- Settings popup takes up entire screen, it should be its own page

- Reflection prompt after completed session which will ask how the user felt (note about self), info they want to keep/remember (note to self), and maybe certain environment features (ex. were they with friends / how well they slept, etc.)
- Add reflection tags rate sleep out of 5, etc.

- Add functionality to save to local first and sync to firebase after, just in case users lose connection or something. App should work offline.

- Allow the user to set a goal in terms of task score or time worked for the day/week/month and show a goal percentage in the dashboard

- Push notifications for reminders which will sound different based on selected motivator persona
- Flexible nudges
  - Time-boxed reminders: “If no session by 14:00, nudge me.”
  - Contextual nags: “If 2+ pauses in a 25m, suggest shorter block.”

- Replace text buttons with icons (if possible.)
- Improve app color scheme
- Add dark mode light mode switch in settings

- Add feature which auto converts github lines written to task score

- Detect if the user is on a mobile browser and show them how to install the app as a PWA.

---

## 🧪 Development Notes

- **Framework**: This project uses React with functional components only (no class components).
- **State management**: Uses a combination of React's built-in hooks (`useState`, `useEffect`) for component-level state. **Firebase (Firestore)** is used for persistent, cloud-synced data like the user's score and session history. UI settings are persisted to `localStorage`.
- **File structure philosophy**:
  - `components/` → Reusable, often stateless UI components used across the app (e.g., `Button`, `Modal`).
  - `features/` → Self-contained modules that represent a major piece of functionality, complete with their own components and logic (e.g., `Timer`).
  - `pages/` → Top-level components that compose features and components into a full view (e.g., `Home`).
  - `hooks/` → Custom hooks that encapsulate complex, reusable logic (e.g., `useAuth`, `useTimer`).
  - `utils/` → Pure, shared utility functions that have no state or side effects (e.g., `formatDate`, `parseCSV`).
- **Styling**: Plain CSS (`App.css`), no CSS modules or Tailwind yet.
- **Routing**: Handled by `react-router-dom` to manage different pages like Home and History.
- **Testing**: Not a priority right now — no test suite or test runners installed.
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