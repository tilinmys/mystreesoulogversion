# Component Rules

## Planned Component Structure
```txt
components/
  layout/
    SafeScreen.tsx
    TopHeader.tsx
    BottomTabBar.tsx

  ui/
    AppCard.tsx
    PrimaryButton.tsx
    SecondaryButton.tsx
    IconButton.tsx
    SectionHeader.tsx
    FloatingActionButton.tsx
    ProgressDots.tsx
    Pill.tsx

  health/
    CycleWheel.tsx
    CyclePhaseCard.tsx
    HealthMetricCard.tsx
    QuickLogCard.tsx
    RecordCard.tsx

  bloop/
    FloatingBloopButton.tsx
    BloopOverlay.tsx
    AuraAnimation.tsx
```

## Global Rules
- Never create random button styles.
- Reuse `PrimaryButton` for main CTAs.
- Reuse `SecondaryButton` for secondary actions.
- Reuse `IconButton` for icon-only actions.
- Reuse `AppCard` for cards.
- Reuse `SafeScreen` on every screen.
- Do not invent new colors outside the design system.
- Do not create page-specific UI styles unless necessary.
- Do not create nested cards.
- Keep components small, composable, and typed.

## Layout Components
- `SafeScreen` applies safe area, default background, and screen padding.
- `TopHeader` handles screen titles, optional back actions, and compact header actions.
- `BottomTabBar` owns consistent tab styling and spacing.

## UI Components
- `AppCard` is the default content surface.
- `PrimaryButton` is the only main CTA style.
- `SecondaryButton` is for non-primary actions.
- `IconButton` uses Lucide React Native icons and accessibility labels.
- `SectionHeader` keeps section titles consistent.
- `FloatingActionButton` is the base for Bloop and other floating actions.
- `ProgressDots` is used in onboarding.
- `Pill` is used for tags, filters, symptom chips, and selectable compact states.

## Health Components
- `CycleWheel` is visual and must include readable text context nearby.
- `CyclePhaseCard` summarizes current phase in plain language.
- `HealthMetricCard` shows one metric at a time.
- `QuickLogCard` enables fast symptom, mood, or sleep logging.
- `RecordCard` summarizes uploaded health records.

## Bloop Components
- `FloatingBloopButton` is always floating, never a tab.
- `BloopOverlay` handles companion interactions.
- `AuraAnimation` must be gentle and not distracting.

## Styling Rules
- Prefer design tokens and NativeWind utility classes.
- Use the 8-point spacing system.
- Keep health screens readable before decorative.
- Add page-specific styles only when reusable components cannot express the need.
