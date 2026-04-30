# Error Log

This file records recurring development errors, their causes, and fixes for MyStree Soul.

## Format

### Error: Short error title
- **Date:**
- **Area:**
- **Symptoms:**
- **Root Cause:**
- **Fix Applied:**
- **Prevention Rule:**
- **Related Files:**

---

## Logged Issues

### Error: Expo Go layout differs from localhost
- **Date:** 2026-04-28
- **Area:** Native mobile layout
- **Symptoms:** Buttons squeezed, CTAs hidden, text misaligned, screens not scrolling correctly on Expo Go.
- **Root Cause:** Web preview is forgiving, while native devices require SafeAreaView, explicit flex layouts, ScrollView/FlatList, and keyboard-aware behavior.
- **Fix Applied:** Hardened SafeScreen, added scroll behavior, fixed bottom safe-area spacing, stabilized CTAs, and audited native layout assumptions.
- **Prevention Rule:** Every screen must use SafeScreen, avoid fixed heights, respect safe areas, and use scroll for content that can exceed viewport.
- **Related Files:** `components/layout/SafeScreen.tsx`, onboarding screens, modal screens, tab screens.

---

### Error: Broken generated visual assets
- **Date:** 2026-04-28
- **Area:** Brand visuals
- **Symptoms:** Logo or women illustrations appear stretched, misaligned, or low quality.
- **Root Cause:** Generated image assets were not scalable and did not fit React Native layouts consistently.
- **Fix Applied:** Prefer reusable SVG visual components for aura, brand marks, and abstract onboarding visuals.
- **Prevention Rule:** Use SVG for abstract visuals and only use compressed static images for approved team photos.
- **Related Files:** `components/brand`, `components/visuals`.

---

### Error: Pressable styling stripped by NativeWind Babel compiler
- **Date:** 2026-04-28
- **Area:** Interactive components, physical device rendering
- **Symptoms:** Buttons, cards, and interactive elements lost all styling (no background, no border, no padding) on Expo Go physical devices. Looked fine on web browser.
- **Root Cause:** NativeWind's Babel compiler fails to parse the `({ pressed }) => [...]` style function callback used by `<Pressable>`. The entire `style` prop is stripped at runtime on mobile, leaving unstyled elements.
- **Fix Applied:** Replaced all `<Pressable style={({ pressed }) => [...]} >` usages with `<TouchableOpacity style={[...]} activeOpacity={0.7}>`.
- **Prevention Rule:** Never use function-form style callbacks with `<Pressable>` in NativeWind projects. Always use `<TouchableOpacity>` with static style arrays for interactive components.
- **Related Files:** `app/(onboarding)/goals.tsx`, `app/(onboarding)/cycle-setup.tsx`, `app/(onboarding)/intro.tsx`, `app/(tabs)/home.tsx`, `components/health/QuickLogCard.tsx`, `components/ui/Pill.tsx`, `components/ui/FloatingActionButton.tsx`.

---

### Error: ReferenceError: Property 'Dimensions' doesn't exist
- **Date:** 2026-04-28
- **Area:** home.tsx runtime, Expo Go iOS
- **Symptoms:** App crashes on device with `ReferenceError: Property 'Dimensions' doesn't exist` pointing to `useEffect` in `home.tsx`.
- **Root Cause:** The `Dimensions` import from `react-native` was accidentally removed during a refactoring pass, but the `useEffect` still called `Dimensions.get("window")`. TypeScript passed because the project's module resolution cached a stale build.
- **Fix Applied:** Removed `Dimensions.get("window")` call from the `useEffect`. Used `width` and `height` from the already-present `useWindowDimensions()` hook instead. Also destructured `height` from the hook call.
- **Prevention Rule:** Prefer `useWindowDimensions()` hook over `Dimensions.get("window")` inside function components. The hook is always available in component scope and does not require a separate import. Run `npx tsc --noEmit` after every import refactor to catch missing references before pushing.
- **Related Files:** `app/(tabs)/home.tsx`.

---

### Error: Expo bundler stale cache persists old broken code after fixes
- **Date:** 2026-04-28
- **Area:** Metro bundler, Expo Go hot reload
- **Symptoms:** Device continues to show `ReferenceError` even after the source file is corrected. Fast Refresh does not pick up the fix.
- **Root Cause:** Metro bundler caches compiled module graphs. When a module-level import error existed in a previous bundle, the cache can persist the broken state through normal Fast Refresh cycles.
- **Fix Applied:** Restarted Expo with `npx expo start --tunnel --clear` to force a full cache clear and fresh bundle.
- **Prevention Rule:** If a fix is applied but the device still shows the old error after 2 Fast Refresh cycles, always restart with `--clear`. Never assume Fast Refresh will automatically resolve a broken cached module.
- **Related Files:** Metro bundler config (`metro.config.js`), `npx expo start`.
