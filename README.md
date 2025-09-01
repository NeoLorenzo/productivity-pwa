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

This section outlines the planned features and improvements for the application, serving as a public roadmap.

### 🎯 Priority 1: The Harmony Update
*This is a fundamental evolution of the app's core philosophy, shifting the focus from pure productivity to a holistic balance between focused work and guilt-free play. The central goal for the user will be to achieve "Harmony."*

-   **Phase 1: Foundational Logic & Data Model**
    -   [ ] **Evolve Session Data Model:** Add a `type` field to all session documents in Firestore. This field will accept one of two string values—`'productivity'` or `'play'`—to differentiate sessions at the database level.
    -   [ ] **Implement Data Migration:** Ensure backward compatibility by retroactively assigning `type: 'productivity'` to all existing sessions. This will be handled via a logic check that updates any session document where the `type` field is missing.
    -   [ ] **Introduce "Play Points" Formula:** Update the formula system to include a `playTimeDivisor`. This will be used to calculate "Play Points" based purely on the duration of 'play' sessions, creating a separate scoring system for leisure.
    -   [ ] **Create the "Harmony Score":** Implement the app's new core metric, calculated as `Harmony = Total Productivity Points - Total Play Points`. The user's primary goal will be to keep this score near zero, representing a balanced lifestyle.
    -   [ ] **Enhance Data Aggregation:** The `aggregateSessionsByDay` utility will be updated to track and return daily totals for play duration, play points, and the resulting daily harmony score.

-   **Phase 2: New Timer Experience**
    -   [ ] **Create a Dedicated Timer Page:** The app's landing page (`/`) for authenticated users will become a new, dedicated Timer page, making it the primary interaction point.
    -   [ ] **Implement Timer Mode Toggle:** A prominent UI switch on the Timer page will allow users to toggle between 'Productivity' and 'Play' modes before starting a session.
    -   [ ] **Dynamic UI Feedback:** The screen's background or key elements will change color to reflect the timer's state: a cool blue for active focus, a warm color for active play, yellow for paused, and neutral for stopped.
    -   [ ] **Streamline the Play Session Flow:** The "Session Complete" modal for 'play' sessions will be simplified to only prompt for notes, hiding the task selection and location-tagging features to reduce friction.

-   **Phase 3: Redesigned Dashboard & Strategy UI**
    -   [ ] **Create a New Dashboard Page:** The current homepage content (heatmaps, stats, etc.) will be moved to a new, dedicated `/dashboard` page.
    -   [ ] **Design a Central Harmony Card:** The dashboard's centerpiece will be a "Harmony" card that prominently displays the current Harmony score. It will also show the contributing Productivity and Play point totals as secondary metrics.
    -   [ ] **Implement Dual Heatmaps:** The dashboard will feature two sets of activity heatmaps: one for visualizing Productivity metrics (duration/points) and another for visualizing Play duration.
    -   [ ] **Update the Strategy Page:** The "Formula Settings" section will be updated with UI controls to manage the new `playTimeDivisor`, with clear explanations for each formula.

-   **Phase 4: App-wide Integration & Polish**
    -   [ ] **Enhance the History Page:** The session log will be updated to visually differentiate between 'productivity' and 'play' sessions (e.g., using colored tags). The daily summary view will include columns for play duration and harmony score.
    -   [ ] **Update App Navigation:** The main navigation (header and bottom nav) will be reworked to link to the new Dashboard, with the Timer page serving as the implicit home.

---

### 👥 Social & Profile Features
-   [ ] **User Profiles & Identity:** Allow users to set a customizable display name and a unique username, moving beyond the default Google account name.
-   [ ] **Profile Statistics:** Enhance the profile page to showcase key stats, achievements, and long-term trends, such as current streak, longest streak, and total hours focused.
-   [ ] **Profile Customization:** Give users tools to personalize their public-facing profile with themes, featured stats, and earned badges, inspired by platforms like Steam.
-   [ ] **Social Sharing:** Add a button to the profile that allows users to generate and share a summary of their stats or achievements to social media.
-   [ ] **Friend System:** Implement functionality to send friend requests and view the (privacy-controlled) profiles and stats of friends.

### ✍️ Journaling & Reflections
-   [ ] **Post-Session Reflection Prompt:** After completing a session, prompt the user with optional fields to reflect on their experience, including rating their sleep, energy, and mood on a 1-5 scale.
-   [ ] **Structured Note-Taking:** Evolve the "notes" field into two distinct prompts: "Note about self" (to capture feelings and mental state) and "Note to self" (to capture ideas and information to remember).
-   [ ] **Dedicated Journaling Feature:** Create a separate, more robust journaling tracker for daily entries, independent of timed sessions.

### 📊 New Trackers & Integrations
-   [ ] **Task Modification History:** Log all changes to tasks (creations, edits, deletions) into a separate, viewable "Task History" log, with an option to clear this history in the settings.
-   [ ] **GitHub Integration:** Implement an optional feature to connect a GitHub account and automatically award points or log tasks based on commit activity (e.g., lines of code written).
-   [ ] **Basic Fitness Tracker:** Add a simple module to log workouts or physical activities, contributing to the overall life balance.

### 🌐 Data, Offline & Location Services
-   [ ] **Full Offline Mode:** Implement a "local-first" data strategy. All data will be saved to the device's local storage immediately and then synced with Firebase in the background when a connection is available.
-   [ ] **Sign-in Flexibility:** Allow users to use the app in a limited, local-only mode without signing in. The option to sign in and sync data will be available on the profile page.
-   [ ] **Location Intelligence:** Integrate a reverse geocoding API to convert raw location coordinates (latitude, longitude) into human-readable place names (e.g., "City Park Library") in the session history.
-   [ ] **Location Heatmap:** Create a new map-based visualization that shows the locations where the user is most productive.

### ✨ UI/UX Enhancements
-   [ ] **Central Action Button:** Replace the static bottom navigation with a central `+` button (Floating Action Button style). Tapping it will reveal primary actions like "Start Focus," "Start Play," and "Log Activity," making core functions more accessible.
-   [ ] **Visual Polish & Theming:** Continue replacing text-based buttons with intuitive icons, refine the overall color scheme, and implement a dark/light mode switch in the settings.
-   [ ] **PWA Onboarding Prompt:** For users on a mobile browser, implement a non-intrusive UI element that explains the benefits of installing the app to their home screen and provides simple instructions.

### 🔔 Notifications & Nudges
-   [ ] **Customizable Push Notifications:** Implement opt-in push notifications for reminders. Users will be able to choose a "motivator persona" that changes the tone of the notifications.
-   [ ] **Flexible Nudges:** Allow users to set intelligent reminders, such as time-boxed nudges ("If I haven't started a session by 2 PM, remind me") or contextual nags ("If I pause more than twice in a 25-minute session, suggest a shorter work block").

### 🔧 Technical & Administrative
-   [ ] **Custom Authentication Domain:** Configure Firebase Auth to display the app's name during the Google Sign-In flow, replacing the default `productivity-pwa-3780a.firebaseapp.com` URL.
-   [ ] **Public Legal Pages:** Refactor the routing to make the Privacy Policy and Terms of Service pages accessible to users *before* they sign in, ensuring compliance and transparency.

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