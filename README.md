# YourEventHandler — BIT351 Assessment 3 Part B

**Student:** Ashish Poudel — S1552923
**Package:** ashishpoudel_S1552923_A3

A React Native (Expo) mobile app for managing events, participants, and attendance — built per the Part A design.

## How to run

You need Node.js installed. Then, in this folder:

```bash
npm install
npx expo start
```

Once the dev server is running:
- Scan the QR code with the **Expo Go** app on your phone (Android/iOS), **or**
- Press `a` to open in an Android emulator, `i` for iOS simulator, `w` for web.

## Sample login

The Members table is seeded automatically. Use any of these usernames at the Member Login screen (no password):
- `alice`
- `bob`
- `charlie`
- `diana`

Sample events (`Tech Meetup`, `React Workshop`) are also seeded so the app is testable on first launch.

## Features mapped to the rubric

| Requirement | Implementation |
|---|---|
| Local database | SQLite via `expo-sqlite` (`src/db/database.js`) |
| Input screen | `CreateEventScreen` and `EditEventScreen` |
| List screens (≥3) | `EventList`, `ManageEvents`, `Participants` |
| CRUD on Events | Create/Read/Update/Delete in `database.js` and used across screens |
| Hooks: state, effect, context | `useState`, `useEffect`, `useContext` (see `App.js`, `AppContext.js`, every screen) |
| Navigation | React Navigation native stack (`App.js`) |
| Specialized component | Attendance checkbox toggle in `ParticipantsScreen` |

## Project structure

```
ashishpoudel_S1552923_A3/
├── App.js                    # Root: navigation + context + DB init
├── app.json                  # Expo config (package: com.ashishpoudel.s1552923.a3)
├── package.json
├── babel.config.js
└── src/
    ├── styles.js             # Tiny shared style sheet (minimal CSS)
    ├── context/
    │   └── AppContext.js     # useContext for current member
    ├── db/
    │   └── database.js       # SQLite + CRUD functions
    └── screens/
        ├── HomeScreen.js
        ├── MemberLoginScreen.js
        ├── EventListScreen.js
        ├── AdminConsoleScreen.js
        ├── CreateEventScreen.js
        ├── ManageEventsScreen.js
        ├── EditEventScreen.js
        └── ParticipantsScreen.js
```

## ICT Professional Ethics — sample data

All seeded names/emails are fictional placeholders (alice/bob/charlie/diana @example.com). No real personal data is used. The database is local-only — nothing is transmitted off-device.
