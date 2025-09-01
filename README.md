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

- **Firebase Authentication**: Users can sign in with their Google account to sync data across devices.
- **Cloud-Synced Data**: All session, task, goal, and formula data is tied to the user's account and synced with Firestore.
- **Comprehensive Strategy Page**: A central hub to manage your productivity system, including:
    - **User-Defined Tasks**: Create a personal list of tasks, each with a custom point value.
    - **Goal Setting & Tracking**: Set daily average goals for time worked, tasks completed, or points earned, and visualize your progress.
    - **Customizable Productivity Formula**: Adjust how time and task scores are weighted to calculate your total "Productivity Points."
- **Focus Timer & Session Logging**: A robust timer that logs work duration, notes, location, and completed tasks for each session.
- **Advanced Session Management**:
    - **Manual Session Entry**: "Quick Add" past sessions without using the live timer.
    - **Edit & Delete**: Modify the details of any past session or delete multiple sessions at once.
- **Data Visualization & History**:
    - **Daily Summary**: View aggregated totals for work duration, session counts, and points earned per day.
    - **Activity Heatmaps**: Visualize daily work duration and scores on a GitHub-style contribution graph.
- **Data Portability**:
    - **CSV Import**: Import past sessions from a CSV file.
    - **CSV Export**: Export your entire session history for analysis elsewhere.
- **Responsive & Installable (PWA)**: A seamless experience on any device, with mobile-first navigation and the ability to install the app to your home screen.
- **User Profile & Settings**:
    - **Profile Page**: View your account details and sign out.
    - **Customizable Display**: Change date and time formats to your preference.
    - **Data Management**: Clear your entire session history from the settings menu.

## 🔜 Upcoming Features

- Give users customizable full names and user names.
- Allow users to send friend requests to each other and be able to view other profiles.

- Make the profile page shows stats, such as streaks.
- Make the profile highly customizable, kinda like the steam profiles.
- Add badges that are available in the profile.
- Share button on profile that allows to share certain stats to social media



- Every time the user modifies a task (for example creates one, deletes one, or edits one) save the change to "task history" but hide it by default.
- Add a button to settings to clear task change history like the rest of the clear buttons that also displays a warning.



- Allow the user to use the app locally without signing in, and put the sign in button in the profile page.
- Add functionality to save to local storage first and sync to Firebase after, enabling offline mode.



- Add a way to turn location data into names and display those names in session history.
- Create a heatmap using the location data where each location is color coded.



- Reflection prompt after completed session which will ask how the user felt (note about self), info they want to keep/remember (note to self), and maybe certain environment features (ex. were they with friends / how well they slept, etc.)
- Add reflection tags rate sleep out of 5.
- Add reflection tags rate energy out of 5.
- Add reflection tags rate mood out of 5.



- Split history page into 2 sections, one session history section, and one play history section.
- Add a way to easily select multiple session histories to delete.



- Move timer stuff to a new timer page.
- Split the focus timer into 2 timers, the focus timer and the play timer.
- When the timer is on the screen should change color to blue, if its pause it should change to yellow, and when it stops it should go back to grey.



- Add a button in the center of the nav that has a + svg and when the user clicks it it should pop out a card of buttons.
- Add a button to the + card that sends the user to the focus timer page.
- Add a button to the + card that sends the user to the play timer page.



- Detect if the user is on a mobile browser and show them how to install the app as a PWA.



- Add feature which auto converts github lines written to task score
- Basic fitness tracker / workout tracker
- Basic journaling tracker
- Add a button to the + card that sends the user to the workout page, coding page, and jorurnaling page.



- Create page which serves as a resource on how to be more productive and / or have a more balanced work + play relationship.



- Continue replacing text buttons with icons for a cleaner UI.
- Improve app color scheme
- Add dark mode light mode switch in settings



- Push notifications for reminders which will sound different based on selected motivator persona
- Flexible nudges
  - Time-boxed reminders: “If no session by 14:00, nudge me.”
  - Contextual nags: “If 2+ pauses in a 25m, suggest shorter block.”



- When the user signs in the google sign in says "to continue to productivity-pwa-3780a.firebaseapp.com" change this so it isnt ugly. (still an issue).
- Privacy Policy and TOS only viewable if the user is signed in which is a problem if they try to read it in the google sign in page before signing in.

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