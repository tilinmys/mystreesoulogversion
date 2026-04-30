# Edge Cases

This file documents known onboarding and health edge cases and how MyStree Soul handles them.

## Onboarding Edge Cases

### 1. Empty Name
- **Trigger:** User skips or submits a blank name field.
- **Handling:** Default greeting falls back to "beautiful".
- **Copy:** "Hi, beautiful" — never an error.
- **Files:** `store/app-store.ts` (`skipCycleSetup`, `setCycleSetup` fallback).

### 2. User Does Not Remember Last Period
- **Trigger:** User selects "I don't remember" on Cycle Setup.
- **Handling:** `lastPeriodDate` is set to the string `"I don't remember"`. No crash.
- **Files:** `app/(onboarding)/cycle-setup.tsx`, `store/app-store.ts`.

### 3. User Does Not Track Cycles
- **Trigger:** User selects "I don't track cycles" on Cycle Setup.
- **Handling:** `cycleTrackingSkipped = true`, `wellnessMode = true`. Dashboard works in general wellness mode.
- **Files:** `app/(onboarding)/cycle-setup.tsx`, `store/app-store.ts` (`skipCycleSetup`).

### 4. User Skips Setup Entirely
- **Trigger:** User taps "Skip cycle setup".
- **Handling:** Calls `skipCycleSetup()` and routes to home. Dashboard loads with wellness mode defaults.
- **Copy:** No block. No error. No judgment.
- **Files:** `app/(onboarding)/cycle-setup.tsx`.

### 5. User Selects No Goal
- **Trigger:** User reaches Goals screen and taps Continue with zero goals selected.
- **Handling:** CTA becomes disabled (grayed). Calm message shown if needed. No harsh red errors.
- **Files:** `app/(onboarding)/goals.tsx`.

### 6. App Reopened Mid-Onboarding
- **Trigger:** App killed during onboarding.
- **Handling:** Zustand state persists locally with AsyncStorage. Returning users keep consent, selected goals, cycle setup, logs, records, vault unlock, and tour completion.
- **Note:** This is local-only demo persistence, not encrypted cloud storage.

### 7. Small Phones
- **How It Works scroll:** The screen uses one `ScrollView` with a fixed CTA footer and no forced blank min-height.
- **Compact layout:** `compactWidth = width < 380` triggers smaller paddings and font sizes.
- **Files:** `app/(onboarding)/how-it-works.tsx`.

### 8. Keyboard Covers Inputs
- **Handling:** Cycle Setup uses `KeyboardAvoidingView` via `SafeScreen keyboardAware`. Inputs scroll above the keyboard.
- **Files:** `components/layout/SafeScreen.tsx`, `app/(onboarding)/cycle-setup.tsx`.

---

## Health Safety Edge Cases

### Severe Pain
- If user logs pain ≥ 8:
  - Copy: "If this pain is severe, sudden, or unusual for you, consider contacting a healthcare professional."
  - Never the word "danger", "risk", or "disease".
- **Files:** `app/(modals)/log-day.tsx`.

### Heavy Bleeding (Future)
- Not yet logged as a separate field. When added: use calm copy "This may be worth discussing with a healthcare professional."

### Anxiety / Panic Mood
- No panic-specific copy triggers currently.
- If mood = "Anxious", Bloop copy stays supportive: "You logged feeling anxious. Patterns can sometimes be worth discussing with a doctor."

### Irregular Periods
- If last period was "I don't remember": Dashboard shows wellness mode. No alarmist copy.

### General Wellness Only
- `wellnessMode = true` disables cycle-specific predictions on the home screen.
- Dashboard greeting and content remain warm and usable.

### Vault-Only User
- A user who skips all health logging can still use the Vault.
- Vault does not require onboarding health data to function.

---

## Copy Rules

Always use:
```txt
"This may be worth discussing with a healthcare professional."
```

Never use:
```txt
abnormal / risk / diagnosis / disease / danger / you have / serious condition
```
