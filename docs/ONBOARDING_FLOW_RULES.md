# Onboarding Flow Rules

These rules define the required first-run sequence for MyStree Soul. The app should follow this order every time a new user completes onboarding.

## Required Sequence
1. Splash loads app fonts and key local image assets.
2. Welcome sends the user to Consent.
3. Consent sends the user to How It Works.
4. How It Works sends the user to Goals.
5. Goals sends the user to Cycle Setup.
6. Cycle Setup captures the user's name and cycle preferences.
7. Founder Quotes may play after setup.
8. Home opens only after `onboardingCompleted` is true.
9. Home waits for Zustand hydration before showing first-run education.
10. Bloop Intro appears first.
11. After the Bloop Intro CTA, the tour spotlights the Bloop chat button.
12. After Bloop is introduced, the feature tour continues through cycle summary, daily check-in, navigation, and vault.

## State Gates
- `hasHydrated` must be true before Home can show first-run overlays.
- `onboardingCompleted` must be true before the Bloop intro can render.
- `hasSeenBloopIntro` must be false for the Bloop intro to render.
- `hasSeenAppTour` must be false for the feature tour to render.
- The feature tour must not start until `hasSeenBloopIntro` is true.
- The feature tour must not start until all target layouts have non-zero measurements.

## Reset Rules
- Completing Cycle Setup must not reset `hasSeenBloopIntro`, `hasSeenAppTour`, or `tourStep` after a user has already seen first-run education.
- Skipping Cycle Setup follows the same no-repeat education rule.
- Reset Demo must keep `hasHydrated` true during the active app session so the next onboarding run does not stall.
- First-run education is allowed only for a fresh first login where the persisted education flags are still false.

## Order Of Feature Education
1. Bloop chat button
2. Cycle summary
3. Daily check-in
4. Navigation bar
5. Memory Vault

## Do Not Break
- Do not show the feature tour before the Bloop intro.
- Do not show overlays before persisted state has hydrated.
- Do not depend on screenshots or visual timing guesses for tour positioning.
- Do not add nested vertical scroll containers to Home onboarding education.
- Do not use HTML tags in React Native screens.
