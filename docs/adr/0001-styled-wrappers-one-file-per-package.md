# Styled wrappers: one file per npm package, no barrel

## Context

Uniwind requires `withUniwind(Component)` to add `className` support to third-party components, but the same wrapper must **not** be applied to `react-native` or `react-native-reanimated` components (it breaks them). We previously centralized all wraps in a single `src/components/styled.ts` barrel that re-exported names like `Pressable`, `ScrollView`, `Image`. At every call site the import line gave no clue which underlying library a given symbol came from — e.g. `Pressable` could be the one from `react-native-gesture-handler` (needs the wrap) but it read identically to `react-native`'s `Pressable` (must not be wrapped). The only way to find out was to open `styled.ts`.

## Decision

Replace the single `styled.ts` with a flat `src/components/styled/` directory containing **one file per npm package**. Each file's name is the exact npm package name (scoped packages: drop `@`, replace `/` with `-`). Callers import from the specific path, e.g.:

```ts
import { Pressable } from '@/components/styled/react-native-gesture-handler'
import { Image } from '@/components/styled/expo-image'
```

There is **no `index.ts` barrel** — `@/components/styled` is deliberately unresolvable. The provenance is the import path; the convention enforces itself because there is nothing else to import.

Export names are preserved as-is from the previous `styled.ts`. Notably, `MaterialCommunityIcons` is exported from `react-native-vector-icons-material-design-icons.ts` even though the file name reflects the npm package's rename — the icon set's brand name didn't change.

**Going-forward rule** (mirrors the Uniwind skill's shared-wrap guidance):

- A new wrap used in **one** file → wrap inline in that file
- A new wrap that gains a **second** consumer → move it to `styled/<exact-npm-package>.ts` and update both call sites in the same commit

## Considered alternatives

- **Prefix in the export name** (`GHPressable`, `ExpoImage`) — rejected: still requires a barrel that hides provenance, and pollutes every JSX site with prefixes.
- **One file per library family** (e.g., `vector-icons.ts` grouping all four icon packages) — rejected: hides which exact npm package each export comes from, which was the whole problem.
- **Keep the barrel and rely on docs/IDE hover** — rejected: out-of-band knowledge that decays; the file's existence re-creates the original problem.
- **Nested directories by scope** (`@react-native-vector-icons/feather.ts`) — rejected: filename-as-package-name is a stronger, simpler invariant than directory-as-scope.
- **Rename `MaterialCommunityIcons` → `MaterialDesignIcons`** to match the package rename — rejected: the npm package was renamed, the icon set wasn't; using the historical name is what every other project does.
