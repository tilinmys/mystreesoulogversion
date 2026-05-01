# Changelog

## Founder Poster Repeat Fix

### Changed
- Added persisted `hasSeenFounderQuotes` state.
- Cycle Setup now sends users directly to Home after the founder/doctor poster flow has already been completed once.
- The founder/doctor poster flow marks itself complete only after the final poster continues to the dashboard.
- Returning login marks the poster flow as seen so signed-in users are not shown first-time poster content.

### Verified
- TypeScript passes with `npm run typecheck`.
- Web export passes with `npx expo export --platform web`.

## Login Flow Redesign

### Added
- Added a distinct post-login restoration screen at `app/(onboarding)/login-success.tsx`.
- Added returning-user edge handling so login restores consent/onboarding completion and skips first-run tutorial surfaces.

### Changed
- Rebuilt the Login screen as a white, keyboard-safe returning-user form with validation, password visibility, trust copy, and a new-user escape path.
- Rebuilt the logged-out/delete-data screen so the primary path goes to Login while "Start fresh" goes to the first-time Welcome flow.
- Changed Profile/Settings action surfaces to pure white with borders and readable dark text instead of orange-filled buttons.

### Verified
- TypeScript passes with `npm run typecheck`.
- Web export passes with `npx expo export --platform web`.

## Profile Surface Polish

### Changed
- Rebuilt the Profile screen header into a premium editable profile surface.
- Added a larger avatar/photo area with camera badge, private-profile chip, goal preview, cycle/period/goals metrics, and a primary edit-profile CTA.
- Restored important app settings while keeping the page disciplined: account health, privacy/data, reminders/Bloop, support/legal, and medical disclaimer.
- Improved spacing, warm shadows, row hierarchy, and touch targets across Profile settings.

### Verified
- TypeScript passes with `npm run typecheck`.
- Web export passes with `npx expo export --platform web`.

## Product Tour Navigation Update

### Changed
- Updated the first-run tutorial to match the new Home and navigation model.
- Added a dedicated spotlight for the Home avatar, which now opens Profile and Settings.
- Added a Daily Insights spotlight and refreshed the tab-bar step so it no longer says Profile lives in the bottom navigation.
- Made the tutorial scroll-aware for lower Home sections like Smart Check and Memory Vault.
- Restyled the tour card to a white premium surface with calmer overlay treatment and clearer action labels.
- Fixed the native synthetic-event pooling crash in tutorial layout measurement.

### Verified
- TypeScript passes with `npm run typecheck`.
- Web export passes with `npx expo export --platform web`.

## Settings Page Simplification

### Changed
- Removed the oversized "Your Space" title from the settings screen.
- Moved the profile photo/avatar to the top with camera and edit controls for profile editing.
- Collapsed settings into four necessary groups: Privacy & Control, Health & Data, Reminders & Bloop, and Support & Legal.
- Fixed row layout with stable icon columns, right-side chevrons/badges, and capped text scaling so rows do not visually break on device.

### Verified
- TypeScript passes with `npm run typecheck`.
- Web export passes with `npx expo export --platform web`.

## Settings Navigation And Trust Surface

### Changed
- Removed Profile from the visible bottom tab bar and kept it accessible from the Home header avatar.
- Rebuilt `app/(tabs)/profile.tsx` as a professional "Your Space" settings page with a back button.
- Focused settings on privacy/control, health data, reminders, Bloop preferences, data visibility, light profile details, support, and legal disclaimer.
- Removed cheap or confusing settings concepts such as refer-a-friend, secret chats, graphs/reports, and premium upsell from the settings surface.

### Verified
- TypeScript passes with `npm run typecheck`.
- Web export passes with `npx expo export --platform web`.

## Locked Upgrade Section And Startup Readability

### Changed
- Moved "Upgrade your health insights" from the Home Daily Insights carousel to a dedicated locked section at the bottom of the Home page.
- Added subtle locked preview chips for future advanced insights without using beta wording.
- Replaced the split-letter startup `MyStree` script rendering with a connected full-word Great Vibes animation plus a small writing sweep for better readability.

### Verified
- TypeScript passes with `npm run typecheck`.
- Web export passes with `npx expo export --platform web`.

## Home Dashboard Architecture Correction

### Changed
- Corrected `app/(tabs)/home.tsx` to use a Warm White (`#FFF8F5`) `SafeAreaView` root and vertical `ScrollView` page.
- Kept all static content on an exact 32px horizontal grid.
- Kept the Daily Insights rail as a full-width horizontal `FlatList` with `contentContainerStyle` padding of 32px and a 16px gap, without wrapper margins.
- Added Soft Pink, Warm Yellow, Premium Orange, and Calming Red card tones for women-health context.
- Changed the insight CTA controls into real `Link asChild`/`Pressable` pill buttons with 48px minimum height and context-specific routing.

### Verified
- TypeScript passes with `npm run typecheck`.
- Web export passes with `npx expo export --platform web`.

## Startup Overlay Uranian Blue Animation

### Changed
- Updated the root startup overlay background to Uranian Blue (`#AFDBF5`) with soft sky bloom depth.
- Changed the startup text reveal from a simple fade to a written letter-by-letter animation.
- Kept `MyStree` in Great Vibes and changed `Soul` to Playfair Display for a distinct premium font pairing.
- Rebuilt the heart as a clean Unicode heart with pop, rotate, and pulse animation so it no longer risks broken-character rendering.

### Verified
- TypeScript passes with `npm run typecheck`.
- Web export passes with `npx expo export --platform web`.

## Home Dashboard Full Rebuild

### Added
- Rebuilt `app/(tabs)/home.tsx` as a complete native Home dashboard, not just a card section.
- Added a pure-white page root with a 32px fixed horizontal grid, modern welcome header, profile avatar placeholder, prediction hero, Daily Insights rail, Smart Check area, Quick Actions, and Memory Vault preview.
- Translated the six supplied HTML concepts into horizontally scrollable pastel panels: Prediction, Mid-Cycle Vitality, Smart Check, Cycle History, Symptom Patterns, and Upgrade Health Insights.
- Added local icon-based visual treatments and reused the optimized local Bloop WebP image where a character image is needed.
- Added elevated soft-UI pill CTAs with 50px height, color-matched glow shadows, and subtle white top highlights.

### Changed
- Changed the Home page background to Pure White for the requested layout direction.
- Applied exact 32px static gutters and a full-width horizontal FlatList with `paddingHorizontal: 32` and 16px gaps so the grid does not overflow the screen.
- Changed the six panels from white cards to alternating premium pastel Soft Pink, Warm Yellow, and Premium Orange surfaces with dark readable text.
- Preserved existing app destinations, Bloop intro overlay, and product-tour target measurement while changing the screen layout.

### Verified
- TypeScript passes with `npm run typecheck`.
- Web export passes with `npx expo export --platform web`.

## Phase 0 - Project Setup

### Added
- Documentation-first workflow
- Design system rules
- UI/UX rules
- Accessibility rules
- Health copy rules
- Routing plan
- Component rules
- Development plan
- Agent instructions
- Expo TypeScript project foundation
- Expo Router entry and route group layouts
- NativeWind, Tailwind, Babel, and Metro configuration
- EAS config placeholder
- Placeholder project folders
- Mock health data placeholder
- Design token placeholder
- Zustand app store placeholder
- TypeScript verification script

### Changed
- Updated app metadata for MyStree Soul
- Updated TypeScript configuration with strict path aliases
- Replaced starter Expo entry with Expo Router entry

### Verified
- TypeScript passes with `npm run typecheck`
- Expo public config resolves with the expected app metadata and plugins

## Phase 3 - Splash Screen

### Added
- MyStree Soul animated splash route at `app/(onboarding)/splash.tsx`
- Root redirect to the splash route
- Temporary warm-white Welcome route target for the splash redirect
- Font loading for Playfair Display, Great Vibes, and Poppins
- Native SVG logo mark, lotus divider, pastel wave background, sparkles, and loading icon
- Gentle fade, scale, aura pulse, wave movement, and loader pulse animations
- React Native Web dependency for local Expo web preview

### Changed
- Root layout now waits for brand fonts before hiding the native Expo splash screen
- Global web background now fills the viewport with Warm White

### Verified
- TypeScript passes with `npm run typecheck`
- Web export passes with `npx expo export --platform web`
- Local Expo web preview responds at `http://localhost:8081`

## Phase 3 - Welcome Screen

### Added
- Real Welcome screen at `app/(onboarding)/welcome.tsx`
- Reusable `SafeScreen` layout component
- Reusable `PrimaryButton` component
- Reusable `ProgressDots` component
- Temporary Intro placeholder route for the Welcome CTA target
- Refined SVG women-health illustration for the Welcome screen
- Compact-height Welcome layout that keeps the primary CTA visible on short screens

### Changed
- Replaced the blank Welcome placeholder with a complete onboarding entry screen
- Global web styles now prevent horizontal overflow in local preview
- Redesigned Welcome Screen to match pixel-perfect layout reference, using exact typography and branding ("Meet MyStree Soul♡"), soft pastel waves, centered content block, and full-width pill-shaped CTA.

### Verified
- TypeScript passes with `npm run typecheck`
- Web export passes with `npx expo export --platform web`
- Welcome screen visually checked in normal and compact mobile web viewports

## Phase 3 - Onboarding Visual Foundation Cleanup

### Added
- Shared `BrandSymbol`, `BrandWordmark`, `LotusDivider`, `PastelWaves`, and `SparkleField` components

### Changed
- Splash and Welcome now use native vector artwork instead of generated image files
- Splash alignment was corrected with a true aura layer, centered brand stack, stable wave band, and fixed loader placement
- Welcome was simplified into a focused onboarding screen with one primary CTA and no clutter
- Welcome copy and hierarchy were tightened to follow the one-primary-action onboarding rule
- `SafeScreen` now provides a full-width content container for future screen alignment

### Verified
- TypeScript passes with `npm run typecheck`
- Onboarding screen code no longer references generated image assets

## Complete Frontend Demo

### Added
- Centralized English copy in `lib/strings.ts`
- Expanded local Zustand demo state for onboarding, goals, cycle setup, daily mood, logs, records, vault unlock, and reset behavior
- Full onboarding flow: Welcome, Intro, Goals, and Cycle Setup
- Full tab demo: Home, Cycle Hub, Memory Vault, and Profile
- Modal flows completed: Bloop, Log Day, Upload Record, and Doctor Prep
- First-Run Product Tour feature across main dashboard sections
- Bloop floating action button added above the tab bar
- Reusable UI components: `AppCard`, `SecondaryButton`, `SectionHeader`, `Pill`, and `FloatingActionButton`
- Reusable visual components: `AuraBlob`, `FlowerAccent`, and visual lotus re-export
- Reusable health components: `CycleWheel`, `HealthMetricCard`, `QuickLogCard`, and `RecordCard`

### Changed
- Tabs layout now uses four bottom tabs with Lucide icons and proper active/inactive colors
- Welcome screen now follows the requested `Start Demo` flow and privacy/support copy
- Cycle Hub now includes phase explanation, prediction, simple hormone trend, and log CTA
- Vault now uses a simulated protected state before showing records
- Profile now exposes demo goals, cycle settings, devices, privacy sections, and reset behavior
- Routing docs now include `doctor-prep.tsx`

### Verified
- TypeScript passes with `npm run typecheck`
- Web export passes with `npx expo export --platform web`
- No backend, real authentication, or API connections were added

## Premium Onboarding Repair

### Added
- Privacy/Consent screen at `app/(onboarding)/consent.tsx`
- Clean reusable logo system: `BrandMark`, `BrandWordmark`, and `BrandLockup`
- Abstract reusable SVG aura visuals: `AuraHero`, `PrivacyAura`, `CycleAura`, and `BloopAura`
- Local demo state for consent acceptance, skipped cycle tracking, and general wellness mode
- Demo medical-record disclaimer on Consent and Profile privacy areas

### Changed
- Welcome now routes to Privacy/Consent before Intro
- Welcome, Intro, Goals, and Cycle Setup now use modern Poppins-led typography and abstract aura visuals
- Goals copy and options were simplified for a calmer onboarding decision
- Cycle Setup now supports "I don't remember", "I don't track cycles", and skip-cycle setup paths
- Primary buttons now use a 12px radius instead of a large pill shape
- Routing plan now documents Welcome -> Consent -> Intro -> Goals -> Cycle Setup -> Dashboard
- Splash keeps its original brand styling through the splash wordmark variant

### Verified
- TypeScript passes with `npm run typecheck`
- Web export passes with `npx expo export --platform web`
- No backend, real authentication, or API connections were added

## Tab Scroll Spacing Polish

### Changed
- Reduced bottom scroll padding on Home, Cycle, Vault, and Profile from 132px to 88px.
- Reduced Home list section gap from 24px to 16px for a tighter scrolled layout.

### Verified
- TypeScript passes with `npm run typecheck`.

## Expo Go Mobile Layout Repair

### Changed
- Onboarding screens now calculate content width from the actual device width instead of using a fixed 320px layout.
- Welcome content is scroll-safe on compact devices so the post-splash buttons remain reachable.
- Intro, Goals, Consent, and Cycle Setup reduce side padding and hero height on smaller phones.
- Home cycle summary now uses a smaller cycle visual on narrow phones.
- Home health metric cards wrap into two-column cards instead of squeezing three cards into one row.
- Secondary buttons now use the same 12px premium radius language as primary buttons.

### Verified
- TypeScript passes with `npm run typecheck`.
- Web export passes with `npx expo export --platform web`.

## Premium UI Polish Pass

### Changed
- Set the shared visual system around Warm White screens and White card surfaces.
- Added semantic design tokens for card borders, brand-tinted shadows, disabled surfaces, button radius, and input radius.
- Modernized PrimaryButton with 56px height, 8px radius, semibold Poppins text, readable disabled state, and premium orange/coral shadow.
- Converted SecondaryButton to an inline text-style action with a 44px minimum touch target.
- Updated AppCard, Pill, SectionHeader, FloatingActionButton, and health cards for consistent premium spacing and typography.
- Upgraded the bottom tab bar into a floating rounded white surface with brand-tinted shadow.
- Polished the Bloop FAB as a glowing orb that sits above the floating tab bar.
- Polished Log Day, Bloop, Upload Record, and Doctor Prep modals with warm backgrounds, white card sections, modern inputs, and calmer close buttons.
- Removed normal-screen Playfair usage outside the brand/splash wordmark path.

### Verified
- TypeScript passes with `npm run typecheck`.
- Web export passes with `npx expo export --platform web`.

## Native Mobile Layout Stabilization

### Changed
- Hardened `SafeScreen` with `SafeAreaView`, safe-area bottom padding, optional scroll rendering, keyboard-aware wrapping, and native scroll defaults.
- Stabilized onboarding screens so scrollable content sits above fixed CTA areas and CTAs remain reachable above the home indicator.
- Added keyboard-aware behavior and native scroll tap handling to Cycle Setup, Bloop, Log Day, and Upload Record flows.
- Added dynamic safe-area bottom padding to Home, Cycle, Vault, and Profile so bottom content is not hidden by the floating tab bar or Bloop FAB.
- Updated the floating tab bar and Bloop FAB to use real native safe-area insets.
- Clamped the first-run product tour tooltip inside the visible device bounds when target coordinates are missing or near screen edges.
- Preserved route order, state behavior, copy, and existing feature logic.

### Verified
- TypeScript passes with `npm run typecheck`.
- Web export passes with `npx expo export --platform web`.
- Expo/Metro server was already listening on port `8081`.

## Trust & Guidance Layer

### Added
- Trust Notes screen at `app/(onboarding)/trust-notes.tsx` — premium cards from doctors, founders, and tech team with TeamAvatar fallback initials.
- How It Works screen at `app/(onboarding)/how-it-works.tsx` — four feature explanation cards before user goals.
- Reusable `TeamAvatar` component at `components/team/TeamAvatar.tsx` — circular, coral border, fallback initials, ready for real photos.
- Frontend type system: `types/user.ts`, `types/health.ts`, `types/record.ts`, `types/onboarding.ts`.
- Service folder scaffold: `services/api/`, `services/auth/`, `services/health/`, `services/records/`, `services/analytics/` — each with README indicating backend is not connected.
- New docs: `EDGE_CASES.md`, `PERFORMANCE_RULES.md`, `SCALING_PLAN.md`, `TESTING_PLAN.md`, `ERROR_LOG.md`.
- Error Log pre-populated with all major errors encountered: layout clipping, Pressable/NativeWind bug, Dimensions ReferenceError, and Metro cache staleness.

### Changed
- Consent screen CTA now routes to `trust-notes` instead of `intro`.
- Onboarding flow: Welcome → Consent → Trust Notes → How It Works → Goals → Cycle Setup → Dashboard.
- Profile screen now includes "Delete My Data" button that clears demo state and returns to Welcome.
- `ROUTING_PLAN.md` updated to reflect the new full onboarding route sequence.

### Verified
- TypeScript passes with `npx tsc --noEmit`.
- No backend, real authentication, or API connections were added.

## Splash Word Animation

### Changed
- Replaced the static splash wordmark with a letter-by-letter written animation for "MyStree Soul".
- Kept the existing splash aura, waves, lotus divider, loader, and redirect timing.

### Verified
- TypeScript passes with `npm run typecheck`.

## Uploaded Artwork Integration

### Added
- Transparent optimized logo-style artwork assets for splash, welcome hero, and privacy onboarding screens.
- Alpha-preserving WebP versions of the onboarding artwork assets.

### Changed
- Splash, Welcome, and Consent now use bounded uploaded artwork with `contain` sizing so images stay separated from text and actions.
- Replaced heavier cropped assets with edge-connected background-removed PNGs reduced by roughly 89-92% from the originals.
- Switched Splash, Welcome, and Consent image requires from PNG to WebP for faster loading.
- Improved the transparent matte with a stricter Python background-removal pass.
- Replaced the splash illustration asset with a true tiny logo-style WebP.
- Added lightweight native-driver float, scale, and glow motion to onboarding artwork.

### Verified
- TypeScript passes with `npm run typecheck`.
- Expo web export emits the WebP artwork assets correctly.

## Onboarding Readiness Pass

### Added
- Local AsyncStorage persistence for onboarding state, selected goals, cycle setup, daily logs, vault records, vault unlock, and tour completion.

### Changed
- Consent now routes into Trust Notes before How It Works, matching the documented onboarding flow.
- Blank cycle setup names now fall back to "beautiful".
- Replaced generic onboarding and tour button labels with clearer action-oriented copy.
- Updated scaling, testing, and edge-case docs to reflect local persistence.

### Verified
- TypeScript passes with `npm run typecheck`.
- Expo web export passes with `npx expo export --platform web`.

## Tab Scroll Bottom Spacing

### Changed
- Reduced bottom scroll padding on Home, Cycle, Vault, and Profile from an oversized fixed reserve to the actual floating tab bar clearance.

### Verified
- TypeScript passes with `npm run typecheck`.

## Splash Logo Correction

### Changed
- Replaced the raster splash logo with the vector `BrandSymbol` so the loading screen logo has no background-removal artifacts.
- Centered the logo in a stable circular plate with the existing soft glow animation.

### Verified
- TypeScript passes with `npm run typecheck`.
- Expo web export passes with `npx expo export --platform web`.

## Pure White Background And Scroll Tightening

### Changed
- Switched the shared app background token, web root background, Tailwind warm background token, and native splash/adaptive icon background to pure White.
- Kept primary CTA buttons on mandatory Orange `#F97316`.
- Removed SafeScreen bottom inset from Home, Cycle, Vault, and Profile so scrolling lists do not double-reserve bottom spacing.
- Updated design system and Preferences theme label to match the pure white background rule.

### Verified
- TypeScript passes with `npm run typecheck`.

## Native Image And Scroll Alignment Repair

### Changed
- Removed forced onboarding scroll min-heights and double bottom insets on Welcome, Consent, Trust Notes, How It Works, Intro, Goals, and Cycle Setup.
- Kept fixed onboarding CTAs compact while preserving explicit scroll areas above them.
- Restored Consent -> Trust Notes -> How It Works route order.
- Replaced Home's nested horizontal mood FlatList with a wrapping row of native touch targets.
- Reduced splash wordmark letter sizing and bounded the wordmark container to prevent text crossover.
- Switched Trust Notes avatar images from JPG to optimized WebP.
- Updated root layout startup gating to preload key local onboarding WebP assets before hiding the native splash screen.

### Verified
- TypeScript passes with `npm run typecheck`.
- Expo web export passes with `npx expo export --platform web`.

## Guided With Care Removal

### Changed
- Removed the Trust Notes / Guided with care onboarding route.
- Consent now routes directly to How It Works.
- Updated the active routing and testing docs for the shorter onboarding flow.

### Verified
- TypeScript passes with `npm run typecheck`.

## Bloop Intro Overlay

### Added
- First-run Bloop introduction overlay on the Home dashboard.
- Persisted `hasSeenBloopIntro` Zustand state and setter.
- Frosted `expo-blur` background, slide/fade animation, pure white chat bubble, and mandatory orange CTA.

### Changed
- Home product tour waits until the Bloop introduction has been dismissed.

### Verified
- TypeScript passes with `npm run typecheck`.

## Tight Onboarding Flow Gates

### Added
- `hasHydrated` store gate so first-run overlays wait for persisted state before rendering.
- Strict onboarding flow documentation in `docs/ONBOARDING_FLOW_RULES.md`.

### Changed
- Completing or skipping Cycle Setup resets Bloop intro, app tour, and tour step state for the new onboarding session.
- The feature tour now starts with the Bloop chat button before showing the rest of the app features.
- Reset Demo keeps hydration active during the current session so the next onboarding flow cannot stall.

### Verified
- TypeScript passes with `npm run typecheck`.

## Premium Visual System Refinement

### Changed
- Updated global visual tokens for warm blush app background, white surfaces, refined orange/coral accents, softer text colors, warm divider, disabled colors, and four warm shadow levels.
- Normalized radii across buttons, inputs, small cards, standard cards, hero cards, tab dock, and FAB.
- Polished shared UI primitives: PrimaryButton, SecondaryButton, AppCard, Pill, SectionHeader, FloatingActionButton, health metric cards, quick log cards, and record cards.
- Refined the Home dashboard, Cycle, Vault, Profile, tab bar, Bloop FAB, onboarding sticky footers, modal inputs, Bloop intro overlay, and native/web background surfaces.
- Removed pure-black fallback background and avoided black shadow usage.

### Verified
- TypeScript passes with `npm run typecheck`.

## Accessibility Color System Refinement

### Changed
- Updated `lib/design-tokens.ts` to match the approved women's wellness palette, including orange action surfaces, coral/pink emotional surfaces, teal trust surfaces, lavender rest surfaces, and calm success/warning/danger colors.
- Replaced remaining hardcoded UI colors in app and component files with shared tokens.
- Adjusted Home mood colors, Cycle wheel segments, Vault trust accents, Profile danger/privacy styling, Log Day warning/danger/success states, Upload Record dropzone, Doctor Prep section accents, Bloop input controls, and Product Tour overlay/card colors.
- Set Product Tour cards to pure white with a warm soft overlay and orange spotlight/action accents.
- Updated Tailwind color aliases and documentation so future code follows the same palette.

### Verified
- TypeScript passes with `npm run typecheck`.
- Web export passes with `npx expo export --platform web`.

## First-Run Education And Startup Guard Fix

### Changed
- Cycle setup completion and skip no longer reset `hasSeenBloopIntro`, `hasSeenAppTour`, or `tourStep`, preventing the Bloop intro/product tour from showing again after cycle details are created or edited.
- Root layout now mounts the Expo Router `Stack` immediately while the native splash remains visible during font/image loading.
- Onboarding guard now waits for root navigation readiness and Zustand hydration before calling `router.replace`.
- Bloop floating button now uses the centered Bloop image on the primary orange orb.

### Verified
- TypeScript passes with `npm run typecheck`.
- Web export passes with `npx expo export --platform web`.

## Animated Splash Brand Lockup

### Changed
- Rebuilt the splash screen around a text-led `MyStree Soul` lockup inspired by the supplied HTML reference.
- Animated `MyStree` and `Soul` letter-by-letter with native `Animated` timing for a written reveal effect.
- Added soft coral/teal blooms, ambient aura, floating flower accents, a tiny spark, bottom pastel wave wash, and a petal-style loader.
- Removed the splash logo plate from the first screen so the brand name is the hero signal.

### Verified
- TypeScript passes with `npm run typecheck`.
- Web export passes with `npx expo export --platform web`.

## Expo Router Root Mount Fix

### Changed
- Removed onboarding guard execution from `app/_layout.tsx`.
- Simplified the root layout so it returns only the root `Stack` navigator.
- Moved the onboarding guard into the tabs layout, where redirects can only happen after the root navigator is mounted.
- Deferred guard redirects with `InteractionManager.runAfterInteractions`.

### Verified
- TypeScript passes with `npm run typecheck`.
- Web export passes with `npx expo export --platform web`.

## Logged-Out Continuation Screen

### Added
- New `app/(onboarding)/logged-out.tsx` screen for logout, revoke-consent, reset-demo, and delete-data exits.
- Uses the local `images/animegirl.png` cartoon illustration with a clean white/warm-white layout inspired by the provided reference.
- Adds top-right Login action and bottom Continue CTA to resume the onboarding/login flow.

### Changed
- Profile Reset Demo, Revoke Consent, and Delete My Data now reset local state and route to the logged-out continuation screen instead of jumping directly to Welcome.

### Verified
- TypeScript passes with `npm run typecheck`.
- Web export passes with `npx expo export --platform web`.

## Founder Section Image Replacement

### Changed
- Replaced the founder quotes carousel with the single `images/foundersection1.png` full-screen founder section.
- Removed old `founder1.webp` and `cofounder.webp` usage from the founder quote flow and preload path.
- Added early image prefetch in the root layout and Cycle Setup screen so the founder section is loaded before the user taps through.
- Added native top-left Back and orange Next overlay controls aligned to the supplied image.

### Verified
- TypeScript passes with `npm run typecheck`.
- Web export passes with `npx expo export --platform web`.

## Splash Timing And Love Symbol Animation

### Changed
- Set the splash route transition timer to exactly 3000ms.
- Tightened the staged writing animation so `MyStree`, `Soul`, and the love symbol complete cleanly within the 3-second splash window.
- Animated the love symbol with a small native-driver pop after the handwritten `Soul` reveal.

### Verified
- TypeScript passes with `npm run typecheck`.
- Web export passes with `npx expo export --platform web`.

## Founder Image Preload Algorithm

### Added
- Shared `lib/image-preloader.ts` with a `Map` promise cache, bounded concurrency, and interaction-safe scheduling.
- Founder image warming starts on How It Works, continues on Goals, and repeats safely on Cycle Setup so assets are ready before the founder screen opens.
- Dev-only `sharp` optimizer for local asset conversion.

### Changed
- Converted the latest founder/cofounder uploads into scaled WebP assets at 720px width.
- Founder quotes now use the latest founder/cofounder uploads as a two-slide flow.
- Both founder images mount on the screen at once and crossfade, allowing the second slide to decode before the user taps Next.
- Back and Next controls are white with black/dark text/icons for contrast on pink/orange backgrounds.
- Founder Back button size was reduced for a lighter overlay.
- Removed heavy founder image startup preload from root layout so initial app boot is not slowed by later onboarding assets.

### Verified
- TypeScript passes with `npm run typecheck`.
- Web export passes with `npx expo export --platform web`.

## Global Image Optimization And Splash Startup

### Added
- Expanded the shared image preloader into an onboarding pipeline covering opening artwork, Bloop, logged-out artwork, and founder images.
- Added promise-level `Map` caching with bounded concurrency so repeated preload calls reuse the same work instead of decoding the same asset again.

### Changed
- Converted remaining runtime PNG artwork to scaled WebP assets, including `animegirl`, Bloop pink/blue, and legacy large screen images.
- Converted the uploaded `mystreesoullogo` image to optimized WebP and used it in the Welcome reveal.
- Updated logged-out, Bloop intro, and floating Bloop button components to use the optimized WebP files.
- Changed root startup so the native Expo splash is hidden after fonts load, then images continue preloading in the background. This keeps the animated splash as the first visible app screen instead of a delayed second screen.
- Added a root-level startup splash overlay so the loading screen cannot be skipped by Expo Router redirects or restored navigation state.
- Tightened splash wordmark dimensions and reserved more lower-screen space so the written brand animation, love symbol, loader, and loading text do not overlap.
- Restored backward-compatible image preloader function exports after the asset loader refactor so onboarding screens no longer crash in Expo Go.
- Swapped the Welcome hero to the optimized WebP asset and kept startup image caching non-blocking.
- Added `PrimaryButton.textStyle` support and restored the `dividerText` token used by Welcome/Login.
- Restored Welcome as the normal second screen and moved the core `Animated` native-driver reveal to the real startup overlay.
- Rebuilt the startup overlay with a flex-column logo/text hierarchy and permanent 24px text margin so the logo and `MyStree Soul` text cannot overlap during animation.
- Enlarged the startup logo and split the wordmark into separate `MyStree`, `Soul`, and heart elements with flex spacing.
- Changed the Welcome wordmark to a stacked layout so the `MyStree` script no longer crosses into `Soul`.
- Reworked startup text into a vertical wordmark so `MyStree` no longer gets squeezed by the `Soul` cluster.
- Enlarged the Welcome `MyStree` script and allowed the wordmark area to render without clipping.
- Rebuilt the goals onboarding screen to match the supplied selection-grid design using local lucide icons instead of network images for instant Expo rendering.

### Verified
- TypeScript passes with `npm run typecheck`.
- Web export passes with `npx expo export --platform web`.
