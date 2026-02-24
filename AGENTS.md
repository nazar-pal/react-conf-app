# AGENTS.md

## Cursor Cloud specific instructions

This is a **React Conf 2025** mobile conference companion app built with Expo SDK 55 (preview) and React Native 0.83. It is a single app (not a monorepo) with no backend — data comes from a bundled JSON file and a public Sessionize API.

### Package manager

Uses **Bun** (`bun.lock`). Install dependencies with `bun install`.

### Key commands

See `package.json` scripts. Summary:

| Task | Command |
|------|---------|
| Install deps | `bun install` |
| Lint | `bun run lint` |
| Typecheck | `bun run typecheck` |
| Tests | `bun run test` |
| Dev server (web) | `npx expo start --web` |
| Format + lint + typecheck | `bun run flt` |

### Running in web mode (Linux / Cloud VMs)

The app is primarily a React Native mobile app, but can run in web mode via `npx expo start --web`. Web dependencies (`react-native-web`, `react-dom`, `@expo/metro-runtime`) must be installed first — they are not in the committed `package.json` but are installed by the update script.

### Known caveats

- **Case-sensitive filesystem**: The file `src/components/Button.tsx` was renamed to `src/components/button.tsx` to match its imports (`./button`). This is a macOS-vs-Linux case-sensitivity issue. If the upstream repo reverts this, imports will break on Linux.
- **Web compatibility**: Several components use native-only APIs (Skia canvas, expo-notifications, jetpack-compose). Platform checks have been added so the app runs in web mode on Linux VMs. Native builds require macOS (iOS) or Android SDK.
- **Pre-existing lint/typecheck errors**: There are 3 pre-existing errors about a missing `@/components/button` module in `not-found.tsx`, `discord-info.tsx`, and `live-stream-info.tsx` — these are resolved by the Button.tsx rename.
- **No `.env` or secrets needed**: The API URL is hardcoded; no environment variables are required.
