# Productivity Tracker PWA

A minimalist React-based Progressive Web App designed to help you find a healthy, sustainable balance between focused work and guilt-free leisure.

---

## 🚀 Live Demo

**[Access the live application here](https://neolorenzo.github.io/productivity-pwa/)**

---

## 🧠 Project Vision

In a world of digital distractions engineered to exploit our attention, this app is a tool to **reclaim your agency**. It's designed to be a frictionless system for anyone who feels their potential is being capped by the guilt of misplaced time or the friction of starting meaningful work.

Our philosophy is built on two tracked states of being: **Productivity and Play.**

-   **Productivity** is the focused, deep work that drives you toward your goals.
-   **Play** is the rejuvenation and enjoyment you've earned, free from guilt.

By consciously tracking and balancing these states, you can engage more purposefully with your life. The app's central metric, the **Harmony Score**, provides a tangible measure of this balance, guiding you to avoid burnout and enjoy your leisure time without reservation.

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

### Core Philosophy: The Harmony Score
The app's central concept, designed to promote a balanced lifestyle.
-   **Core Calculation**: The Harmony Score is calculated as `Total Productivity Points - Total Play Points`. The user's goal is to keep this score as close to zero as possible.
-   **Intuitive Feedback Card**: The dashboard features a dedicated card that provides at-a-glance feedback on the user's current Harmony Score.
-   **Visual Scale & Arrow**: A color-coded scale (Play-Balanced-Productivity) with a dynamic arrow shows the user's current position.
-   **Actionable Guidance**: The card displays clear, contextual text that explains what the current score means and suggests an action (e.g., "Time to play!" or "Time to focus!").

### The Timer Page (The App's Hub)
The new landing page and primary interaction point for the user.
-   **Dual-Mode Timer**: A prominent toggle allows users to switch between **Productivity** and **Play** modes before starting a session.
-   **Dynamic UI Feedback**: The entire page background changes color to reflect the timer's state: a cool blue for active productivity, a warm yellow for active play, and a neutral gray when paused.
-   **Streamlined Session Logging**: When a 'Play' session is completed, the app presents a simplified modal that only asks for notes, removing the irrelevant task and location fields for a frictionless experience.
-   **Quick Add Functionality**: Users can manually log past sessions directly from the timer page without using the live timer.

### The Dashboard (Your Progress at a Glance)
A dedicated page for visualizing trends and long-term progress.
-   **Central Harmony Card**: The dashboard is headlined by the intuitive Harmony Score feedback card.
-   **Triple Activity Heatmaps**: Users can track their progress through three distinct, color-coded heatmaps:
    1.  **Productivity Duration** (Green scale)
    2.  **Play Duration** (Orange/Yellow scale)
    3.  **Daily Harmony Score** (Red-to-Blue diverging scale)

### The Strategy Page (Define Your System)
A central control panel for customizing the app's logic to fit the user's personal goals.
-   **Customizable Formulas**: Users can independently adjust the divisors for both `Productivity Points` and `Play Points`, giving them full control over how work and leisure are weighted.
-   **User-Defined Tasks**: A complete task manager where users can create, edit, and delete custom tasks, each with its own point value.
-   **Goal Setting & Tracking**: Set and track progress towards daily average goals for time worked, task scores, or productivity points.

### History & Data Management
Comprehensive tools for reviewing and managing session data.
-   **Enhanced Session Log**: The detailed history table now includes a "Type" column with colored tags to visually differentiate between 'Productivity' and 'Play' sessions.
-   **Upgraded Daily Summary**: The summary view now includes columns for `Play Duration` and `Daily Harmony Score`, providing a complete daily overview.
-   **Full Session Editing**: Users can edit any detail of a past session, including its **type**, allowing them to easily re-categorize a session from 'Productivity' to 'Play' and vice-versa.
-   **Data Portability**: Users can import and export their entire session history as a CSV file.

### Core Technical Features
-   **Firebase Authentication**: Secure sign-in with a Google account.
-   **Cloud Data Sync**: All session, task, goal, and formula data is synced with Firestore in real-time, ensuring consistency across devices.
-   **Responsive & Installable (PWA)**: A seamless, mobile-first experience that is fully installable on any device.

---

## 🔜 Upcoming Features

This section outlines the planned features and improvements for the application, serving as a public roadmap.

- Add a way to toggle between daily, weekly, monthly, and all time view for average day chart and harmony score.
- Improve heatmap modal when user clicks on heatmap, hoinestly we could just toss it and allow the user to scroll/select different months/years.

---

### 👥 Social & Profile Features
-   [ ] **User Profiles & Identity:** Allow users to set a customizable display name and a unique username, moving beyond the default Google account name.
-   [ ] **Profile Statistics:** Enhance the profile page to showcase key stats, achievements, and long-term trends, such as current streak, longest streak, and total hours focused.
-   [ ] **Profile Customization:** Give users tools to personalize their public-facing profile with themes, featured stats, and earned badges, inspired by platforms like Steam.
-   [ ] **Social Sharing:** Add a button to the profile that allows users to generate and share a summary of their stats or achievements to social media.
-   [ ] **Friend System:** Implement functionality to send friend requests and view the (privacy-controlled) profiles and stats of friends.

### ✍️ Journaling & Reflections
-   [ ] **Post-Session Reflection Prompt:** After completing a session, prompt the user with optional fields to reflect on their experience, including rating their sleep, energy, mood, and focus on a 1-5 scale.
-   [ ] **Structured Note-Taking:** Evolve the "notes" field into two distinct prompts: "Note about self" (to capture feelings and mental state) and "Note to self" (to capture ideas and information to remember).
-   [ ] **Dedicated Journaling Feature:** Create a separate, more robust journaling tracker for daily entries, independent of timed sessions.

### 📱 Mindful Tech Usage
-   [ ] **Manual Screen Time Logging:** Introduce a dedicated page for users to manually log their daily screen time. This feature turns a technical limitation (inability to auto-track) into a tool for mindfulness, requiring users to consciously confront their digital habits.
-   [ ] **Frictionless Entry:** The UI will be optimized for speed. At the end of the day, the user can open their device's native screen time report, check the screen time, and input it into the PWA.
-   [ ] **Categorization & Integration:** Users can log their total screen time or optionally break it down by specific apps they wish to monitor (e.g., Instagram, YouTube). This logged time will be categorized as 'Play,' directly impacting the Harmony Score and the "Average Day" visualization.

### 🗓️ Scheduling & Pacing
-   [ ] **Recurring Task Scheduler:** Implement a new system for creating tasks that repeat on a flexible schedule (e.g., "Publish article every 3 days").
-   [ ] **Visual Task Calendar:** A dedicated calendar view will automatically plot all past and future instances of recurring tasks. Users can see their entire schedule at a glance and quickly mark a task as complete, which updates its next due date.
-   [ ] **The "Pacing Score":** Introduce a new daily metric that gamifies consistency. This score calculates whether the user is ahead of, on track with, or behind schedule across all their recurring tasks.
-   [ ] **Dynamic Point System:** The Pacing Score will directly influence the user's daily Productivity Points. Being ahead of schedule will provide a daily point bonus, rewarding proactive work. Falling behind will apply a small daily penalty, encouraging users to stay on track.

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
-   [ ] **Central Action Button:** Replace the static bottom navigation with a central `+` button (Floating Action Button style). Tapping it will reveal more pages like "Timer" and the rest of the new pages.
-   [ ] **Visual Polish & Theming:** Continue replacing text-based buttons with intuitive icons, refine the overall color scheme, and implement a dark/light mode switch in the settings.
-   [ ] **PWA Onboarding Prompt:** For users on a mobile browser, implement a non-intrusive UI element that explains the benefits of installing the app to their home screen and provides simple instructions.

### 🔔 Notifications & Nudges
-   [ ] **Customizable Push Notifications:** Implement opt-in push notifications for reminders. Users will be able to choose a "motivator persona" that changes the tone of the notifications.
-   [ ] **Flexible Nudges:** Allow users to set intelligent reminders, such as time-boxed nudges ("If I haven't started a session by 2 PM, remind me") or contextual nags ("If I pause more than twice in a 25-minute session, suggest a shorter work block").

### 🔧 Technical & Administrative
-   [ ] **Custom Authentication Domain:** Configure Firebase Auth to display the app's name during the Google Sign-In flow, replacing the default `productivity-pwa-3e780a.firebaseapp.com` URL.
-   [ ] **Public Legal Pages:** Refactor the routing to make the Privacy Policy and Terms of Service pages accessible to users *before* they sign in, ensuring compliance and transparency.
-   [ ] **Encrypt Location Data:** Ensure that user location data is encrypted in firebase in case of data leak.

---

## 🧪 Development Notes

- **Framework**: This project uses React with functional components only (no class components).
- **State management**: Uses a combination of React's built-in hooks (`useState`, `useEffect`) for component-level state. **Firebase (Firestore)** is used for persistent, cloud-synced data like the user's score and session history. UI settings are persisted to `localStorage`.
- **File structure philosophy**:
  - `components/` → Reusable, often stateless UI components used across the app (e.g., `Button`, `Modal`).
  - `features/` → Self-contained modules that represent a major piece of functionality, complete with their own components and logic (e.g., `Timer`).
  - `pages/` → Top-level components that compose features and components into a full view (e.g., `Dashboard`, `TimerPage`).
  - `hooks/` → Custom hooks that encapsulate complex, reusable logic (e.g., `useAuth`, `useTimer`).
  - `utils/` → Pure, shared utility functions that have no state or side effects (e.g., `formatDate`, `parseCSV`).
- **Styling**: Plain CSS (`App.css`), no CSS modules or Tailwind yet.
- **Routing**: Handled by `react-router-dom` to manage different pages.
- **Testing**: Not a priority right now — no test suite or test runners installed.

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