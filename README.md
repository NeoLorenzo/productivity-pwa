# Productivity Tracker PWA

A minimalist React-based Progressive Web App designed to gamify productivity using customizable rewards, scores, and streaks.

---

## 🚀 Live Demo

**[Access the live application here](https://neolorenzo.github.io/productivity-pwa/)**

---

## 🧠 Project Vision

In a world of digital distractions engineered to exploit our attention, this app is a tool to **reclaim your agency**. It's designed to be a frictionless system for anyone who feels their potential is being capped by the guilt of misplaced time or the friction of starting meaningful work.

Our philosophy is built on three states of being: **Productivity, Play, and Rest.**

-   **Productivity** is the focused, deep work that drives you toward your goals.
-   **Play** is the rejuvenation and enjoyment you've earned, free from guilt.
-   **Rest** is the deliberate, untracked disengagement necessary for recovery.

By consciously tracking and balancing these states, you can engage more purposefully with your life. Think of it as a "time diet" tracker. Just as a food tracker gives you the awareness to build a healthy diet, this app provides the contextualized knowledge to build a healthy, balanced, and fulfilling life.

The core idea:
> **"Discipline isn't deprivation — it's earned freedom."**

This is more than an app; it's a framework for an intentional lifestyle.

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
- **Cloud-Synced Data**: All session and task data is tied to the user's account and synced with Firestore.
- **Responsive Mobile & Desktop Layouts**: The UI adapts for a seamless experience on any device size.
- **Mobile-First Bottom Navigation**: A dedicated navigation bar on mobile provides quick access to all pages.
- **Progressive Web App (PWA) Support**: The application can be installed on mobile and desktop devices for an app-like experience.
- **User-Defined Task Rewards**: Users can create and manage a personal list of tasks, each with a custom point value.
- **Focus Timer with Task Integration**: At the end of a timer session, users can select the tasks they completed to automatically calculate and log their score.
- **Manual Session Entry**: A "Quick Add" feature allows users to log sessions without using the live timer.
- **Session Logging & History**: All completed timer sessions are logged, showing work duration, completed tasks, and the score earned for that session.
- **Daily Summary**: The history page includes a summary of total work duration, session counts, and total points earned per day.
- **Activity Heatmaps**: The home page features GitHub-style heatmaps to visualize daily work duration and scores earned over time.
- **Data Import/Export**: Users can import past sessions from a CSV file and export their entire session history.
- **Customizable Display**: Date and time formats can be changed in the settings.
- **Data Management**: Users can clear their entire session history.

## 🔜 Upcoming Features

- When the user signs in the google sign in says "to continue to productivity-pwa-3780a.firebaseapp.com" change this so it isnt ugly.

- Add a way to select and delete sessions from the history page.
- Add a way to edit sessions in session history.
- Improve the mobile usability of the session history table.

- Add functionality to save to local storage first and sync to Firebase after, enabling offline mode.

- Create a profile view which shows stats, such as streaks.
- Move sign out and settings buttons to the new profile view.

- The bottom nav on mobile is far too short making it harder to click the buttons, add padding to the bottom.

- Every time the user modifies a task (for example creates one, deletes one, or edits one) save the history to "task history" but hide it by default.

- Rename "Tasks" to "Strategy".
- Add a button with a + symbol to the top left corner of the "Your Tasks" card which will bring up a pop up card which is the current "Add a New Task" card. Do the same with the edit functionality.

- Add a customizable formula to strategy which uses deep work time and task score to calculate prods (short for productivity points)
- Add a display to the home page that displays total prods which takes into account the entire user history, this means that prods have to be calculated for each day and summed.

- In the "Strategy" page allow the user to set a goal in terms of task score, time worked, or prods for the day/week/month.
- Show the percentage to goal at the top of the "Strategy" page.

- Move timer stuff to a new timer page.
- Split the focus timer into 2 timers, the focus timer and the play timer.
- When the timer is on the screen should change color to blue, if its pause it should change to yellow, and when it stops it should go back to grey.

- Add a button in the center of the nav that has a + svg and when the user clicks it it should pop out a card of buttons.
- Add a button to the + card that sends the user to the focus timer page.
- Add a button to the + card that sends the user to the play timer page.

- Reflection prompt after completed session which will ask how the user felt (note about self), info they want to keep/remember (note to self), and maybe certain environment features (ex. were they with friends / how well they slept, etc.)
- Add reflection tags rate sleep out of 5.
- Add reflection tags rate energy out of 5.
- Add reflection tags rate mood out of 5.

- Detect if the user is on a mobile browser and show them how to install the app as a PWA.

- Add feature which auto converts github lines written to task score
- Basic fitness tracker / workout tracker which will also give rewards
- Add a button to the + card that sends the user to the workout page.
- Create page which serves as a resource on how to be more productive and / or have a more balanced work + play relationship.

- Continue replacing text buttons with icons for a cleaner UI.
- Improve app color scheme
- Add dark mode light mode switch in settings

- Push notifications for reminders which will sound different based on selected motivator persona
- Flexible nudges
  - Time-boxed reminders: “If no session by 14:00, nudge me.”
  - Contextual nags: “If 2+ pauses in a 25m, suggest shorter block.”

- Share button on profile that allows to share certain stats to social media

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

- **Minimal Friction** – The app must feel like a natural extension of the user's workflow, not a chore. Every core action should be achievable in two taps or less.
- **User-Defined Structure** – Users define what counts as productivity and what earns rewards. The system provides the tools; the user provides the context.
- **Balance Over Burnout** – The goal is sustainable performance. The app empowers guilt-free play and deliberate rest as critical components of a productive life.
- **No Bloated Gamification** – Avoid unnecessary points, badges, or dopamine loops that don’t reflect real, user-defined value.

---

## 🚀 Deployment

This project uses **GitHub Actions** for automated deployment. Any push to the `main` branch will trigger a workflow that builds the application and deploys it to GitHub Pages.

The live version is automatically updated upon merging changes.