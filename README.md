# YourEventHandler

A React Native (Expo) mobile app for managing events, participants, and attendance. Create events, track who's attending, and mark attendance — all backed by a local SQLite database that works fully offline.

<!-- Add a screenshot or short GIF here. Drop the file in the repo (e.g. assets/demo.gif) and link it: ![YourEventHandler demo](assets/demo.gif) -->

## What it does

- **Event management** — create, edit, and delete events, with the full list stored locally.
- **Participants and attendance** — add participants to an event and toggle their attendance with a tappable checkbox.
- **Member login** — sign in as a member to see and interact with events.
- **Offline-first** — everything runs on a local SQLite database, so the app works with no network and nothing leaves the device.

## Tech stack

- React Native (Expo)
- SQLite via `expo-sqlite`
- React Navigation (native stack)
- React Hooks (`useState`, `useEffect`, `useContext`) for state and shared context

## Running it locally

You'll need Node.js installed. Then, in this folder:

    npm install
    npx expo start

Once the dev server is running:

- Scan the QR code with the **Expo Go** app on your phone (Android or iOS), or
- Press `a` for an Android emulator, `i` for the iOS simulator, or `w` for web.

The Members table and a couple of sample events are seeded automatically, so the app is usable on first launch. At the Member Login screen, sign in with any of these usernames (no password): `alice`, `bob`, `charlie`, or `diana`.

## Project structure

    .
    ├── App.js                # Root: navigation, context, and DB init
    ├── app.json              # Expo config
    ├── package.json
    └── src/
        ├── styles.js         # Shared styles
        ├── context/
        │   └── AppContext.js # Current-member context
        ├── db/
        │   └── database.js   # SQLite setup and CRUD functions
        └── screens/
            ├── HomeScreen.js
            ├── MemberLoginScreen.js
            ├── EventListScreen.js
            ├── AdminConsoleScreen.js
            ├── CreateEventScreen.js
            ├── ManageEventsScreen.js
            ├── EditEventScreen.js
            └── ParticipantsScreen.js

## Notes

All seeded data is fictional (alice / bob / charlie / diana at example.com) — no real personal information is used, and the database is local-only.
