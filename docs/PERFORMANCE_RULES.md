# Performance Rules

Performance and RAM rules for MyStree Soul frontend demo.

## Image Assets
1. Avoid large PNG/JPEG backgrounds. Use SVG aura visuals instead.
2. Do not store image blobs or binary data in Zustand state.
3. Compress any static team or brand images before adding to `/images`.
4. Use `resizeMode="cover"` on all `<Image>` components.

## Animations
5. Avoid infinite animations on every screen simultaneously.
6. Use `useIsFocused()` or navigation listeners to pause heavy animations when the screen is off-screen.
7. Keep splash animations short and use native driver (`useNativeDriver: true`) where possible.

## Lists
8. Use `FlatList` for any list that may exceed 6–8 items. Never use `ScrollView` + `.map()` for data-driven lists.
9. Memoize repeated card components with `React.memo` if re-renders are observed.
10. Avoid nested `ScrollView` components.

## State
11. Keep Zustand state lightweight. No binary files, no large arrays of blobs.
12. Store mock/demo data in `/data`, not inline in components.
13. Keep visible copy in `lib/strings.ts`, not scattered across components.

## Modals
14. Lazy-load modal content only if it is simple and safe to do so.
15. Each modal handles one focused task. No nested modal flows.

## Network
16. No API calls in this demo build.
17. Do not add network-dependent packages unless explicitly planned.

## Component Rules
18. Do not add unnecessary npm packages for tasks achievable with React Native primitives.
19. Reuse shared design tokens from `lib/design-tokens.ts` — do not invent new colors or spacing values.

## Scaling Notes (500 users)
- Zustand state works well for up to ~1000 items per list before pagination is needed.
- For 500 real users: add AsyncStorage persistence + server-side sync before launch.
- FlatList with `initialNumToRender={8}` and `maxToRenderPerBatch={6}` is sufficient for Vault and Log lists.
