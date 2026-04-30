# Routing Plan

## Route Structure
```txt
app/
  _layout.tsx

  (onboarding)/
    _layout.tsx
    splash.tsx
    welcome.tsx
    consent.tsx
    how-it-works.tsx
    intro.tsx
    goals.tsx
    cycle-setup.tsx

  (tabs)/
    _layout.tsx
    home.tsx
    cycle.tsx
    vault.tsx
    profile.tsx

  (modals)/
    bloop.tsx
    log-day.tsx
    upload-record.tsx
    doctor-prep.tsx
```

## Route Group Rules
- `(onboarding)` has no bottom tabs.
- `(tabs)` has Home, Cycle, Vault, and Profile.
- `(modals)` contains Bloop, Log Day, Upload Record, and Doctor Prep.
- Bloop opens as modal or FAB-triggered overlay.
- Log Day opens as a bottom sheet or modal.
- Upload Record opens from Vault.
- Doctor Prep opens from Home quick actions.

## Root Layout
- `app/_layout.tsx` owns the root stack.
- Route groups stay separated by user flow.
- Modal routes use modal presentation.

## Onboarding
- Splash, Welcome, Privacy/Consent, How It Works, Goals, and Cycle Setup live in `(onboarding)`.
- The active onboarding flow is Welcome -> Consent -> How It Works -> Goals -> Cycle Setup -> Dashboard.
- How It Works explains the app's four core features before asking for user goals.
- These screens must be calm, short, and supportive.
- No bottom tabs appear during onboarding.

## Tabs
- Home is the daily overview.
- Cycle is for cycle phase, prediction, and symptom pattern views.
- Vault is for private records and visit context.
- Profile is for settings, privacy, preferences, and cycle setup updates.

## Modals
- Bloop is opened from the floating action button.
- Log Day is opened from Home, Cycle, or Bloop.
- Upload Record is opened from Vault.
- Doctor Prep is opened from Home quick actions.
- Modals should keep one focused task per route.
