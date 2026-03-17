# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

React Conf 2025 mobile app built with Expo SDK 55, React Native 0.83, and TypeScript. Cross-platform (iOS, Android, web). Uses file-based routing via Expo Router.

## Commands

```bash
bun install              # Install dependencies (use Bun, not npm/yarn)
npx expo start           # Start dev server
npx expo run:ios         # Compile and run on iOS simulator
npx expo run:android     # Compile and run on Android emulator
bun run lint             # ESLint (expo lint)
bun run typecheck        # TypeScript check (tsc --noEmit)
bun run test             # Jest tests
bun run flt              # Format + lint + typecheck (all three)
bun run format           # Prettier formatting
bun run sync-api         # Fetch latest session data from Sessionize API
```

CI runs `bun run lint` and `bun tsc --noEmit` on PRs and pushes to main.

## Architecture

### Routing (Expo Router)

File-based routing in `src/app/`. Route files are thin — they import and re-export screen components from `src/screens/`.

- `src/app/(tabs)/` — Tab navigation using NativeTabs API (calendar, bookmarks, speakers, info)
- `src/app/talk/[talkId].tsx` — Talk detail (modal presentation)
- `src/app/speaker/[speakerId].tsx` — Speaker detail (modal presentation)

### State Management (Zustand + MMKV)

Two stores in `src/store/`, both persisted to device via react-native-mmkv:

- `react-conf-store.ts` — Conference schedule data, timezone preference, API refresh logic (5-min TTL)
- `bookmark-store.ts` — Bookmarked talks with notification IDs

### Styling (Tailwind v4 + Uniwind)

Tailwind CSS v4 integrated via Uniwind for React Native. Theme defined in `src/global.css` using CSS custom properties in OKLCH color space with light/dark variants.

- Use `cn()` from `src/utils/cn.ts` (clsx + tailwind-merge) for combining class names
- Semantic color tokens: `foreground`, `muted`, `background`, `overlay`, `surface`, `danger`, `accent`, `accent-soft`, `divider`
- Font family tokens: `font-light`, `font-medium`, `font-semibold`, `font-bold` (and italic variants) — all Montserrat

### Data Flow

Session data fetched from Sessionize API with fallback to bundled test data (`src/data/allSessions.json`). Mapping logic in `src/utils/sessions.ts` transforms API response to internal `Session` type.

### Platform-Specific Code

Uses `.ios.tsx` file suffixes for iOS-specific implementations alongside default `.tsx` files. Also uses `Platform.select()` / `Platform.OS` for conditional rendering.

## Code Style

- No semicolons, single quotes, no trailing commas, no parens on single arrow params
- Prettier with tailwind class sorting plugin (configured for `cn`, `clsx`, `twMerge`)
- React Compiler enabled (babel + eslint plugin)
- ESLint includes react-native plugin rules for styles, platform components, and color literals
- Path aliases: `@/*` → `./src/*`, `@/assets/*` → `./assets/*`
- `gh` CLI is installed and available
- Use `knip` to remove unused code when making large changes

## TypeScript

- Prefer `interface` over `type`
- Never use `enum`; use `as const` instead
- Don't add unnecessary `try`/`catch` blocks
- Don't cast to `any`. Avoid `as` unless absolutely necessary
- Only create abstractions when actually needed
- Prefer clear function/variable names over inline comments
- Avoid helper functions when a simple inline expression suffices
- Avoid braces `{}` when possible (single-line returns, single-line if statements)
- Prefer switch statements with a default branch that throws using `satisfies never` for exhaustive union handling

## React

- Break massive JSX into smaller composed components
- Colocate code that changes together
- Avoid `useEffect` unless absolutely necessary
- Don't use `useMemo`, `useCallback`, or `React.memo` by default — trust the React Compiler. Only add memoization if lint issues prevent file-level memoization

## UI/UX

- Use default HeroUI Native component styling — built-in variants, props, and sizes over custom class names
- Keep designs minimalistic following iOS design principles
- This app is local-first — loading states are rarely needed

<!-- HEROUI-NATIVE-AGENTS-MD-START -->

[HeroUI Native Docs Index]|root: ./.heroui-docs/native|STOP. What you remember about HeroUI Native is WRONG for this project. Always search docs and read before any task.|If docs missing, run this command first: heroui agents-md --native --output AGENTS.md|components/(buttons):{button.mdx,close-button.mdx}|components/(collections):{menu.mdx,tag-group.mdx}|components/(controls):{slider.mdx,switch.mdx}|components/(data-display):{chip.mdx}|components/(feedback):{alert.mdx,skeleton-group.mdx,skeleton.mdx,spinner.mdx}|components/(forms):{checkbox.mdx,control-field.mdx,description.mdx,field-error.mdx,input-group.mdx,input-otp.mdx,input.mdx,label.mdx,radio-group.mdx,search-field.mdx,select.mdx,text-area.mdx,text-field.mdx}|components/(layout):{card.mdx,separator.mdx,surface.mdx}|components/(media):{avatar.mdx}|components/(navigation):{accordion.mdx,list-group.mdx,tabs.mdx}|components/(overlays):{bottom-sheet.mdx,dialog.mdx,popover.mdx,toast.mdx}|components/(utilities):{pressable-feedback.mdx,scroll-shadow.mdx}|getting-started/(handbook):{animation.mdx,colors.mdx,composition.mdx,portal.mdx,provider.mdx,styling.mdx,theming.mdx}|getting-started/(overview):{design-principles.mdx,quick-start.mdx}|getting-started/(ui-for-agents):{agent-skills.mdx,agents-md.mdx,llms-txt.mdx,mcp-server.mdx}|releases:{beta-10.mdx,beta-11.mdx,beta-12.mdx,beta-13.mdx,rc-1.mdx,rc-2.mdx,rc-3.mdx,rc-4.mdx}

<!-- HEROUI-NATIVE-AGENTS-MD-END -->
