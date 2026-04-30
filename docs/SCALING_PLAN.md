# Scaling Plan

Scaling preparation for MyStree Soul, from 0 to 500 demo users and beyond.

## Current State (Demo Build)
- Frontend-only. No backend, no auth, no API.
- App state uses Zustand with AsyncStorage persistence for onboarding, goals, logs, records, vault unlock, and tour completion.
- State persists between app launches until the user taps Reset Demo or Delete My Data.
- Safe for single-device testing and internal demo reviews.

## Phase 1: Persistence (50 Users)
- AsyncStorage persistence is now enabled with `zustand/middleware/persist`.
- Each user's onboarding state, goals, logs, and demo vault records persist between app launches.
- No server needed. Still local-only.
- **Implemented in:** `store/app-store.ts`.

## Phase 2: Auth Foundation (100–500 Users)
- Placeholder: `services/auth/` is scaffolded and ready.
- When connecting: use Supabase Auth, Firebase Auth, or a custom JWT backend.
- Do not store real health data without encryption at rest.
- User ID must be stable and private (no PII in identifiers).

## Phase 3: Sync & Cloud Storage (500+ Users)
- Health logs and records sync to encrypted backend storage.
- Placeholder: `services/health/` and `services/records/` are scaffolded.
- Use row-level security on the database (e.g., Supabase RLS or equivalent).
- Vault uploads require signed URLs and server-side encryption.
- Never store raw medical documents in a public bucket.

## Phase 4: Analytics (Post-Launch)
- Placeholder: `services/analytics/` is scaffolded.
- Implement privacy-first analytics (no PII in events).
- Track onboarding drop-off, feature engagement, and tour completion.
- Do not track individual health entries without explicit consent.

## Phase 5: Push Notifications
- Gentle, opt-in cycle reminders.
- Never send health predictions as notification copy.
- Use calm, non-alarming language in all notification content.

## Folder Structure (Already Scaffolded)
```txt
services/
  api/        ← REST or GraphQL adapter layer
  auth/       ← Auth tokens, session management
  health/     ← Log, cycle, and symptom sync
  records/    ← Vault upload and retrieval
  analytics/  ← Privacy-first event tracking
types/
  user.ts
  health.ts
  record.ts
  onboarding.ts
```

## Frontend RAM Rules for 500 Users
- Use `FlatList` with `initialNumToRender={8}` for all data-driven lists.
- Paginate vault records (20 per page) when backend is connected.
- Never load all records into memory at once.
- Memoize cards with `React.memo` when list data is stable.
