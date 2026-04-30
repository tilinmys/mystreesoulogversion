# Agent Instructions

## Required Reading
Before coding any page, read all docs in `/docs`.

## Product Rules
- Follow the design system exactly.
- Build with placeholder data first.
- Do not add backend unless requested.
- Do not connect auth unless requested.
- Do not create new colors without updating `DESIGN_SYSTEM.md`.
- Do not create new button styles.
- Do not ignore accessibility.
- Keep health language gentle, clear, and non-diagnostic.
- Use mock data only until backend work is explicitly requested.

## Development Rules
- Update `CURRENT_PROGRESS.md` after every completed task.
- Update `CHANGELOG.md` after every meaningful change.
- Explain what was changed and why.
- Keep code clean and reusable.
- Build one page or feature at a time.
- Ask before making major architecture changes.
- Reuse existing components before creating new ones.
- Keep files focused and typed.
- Prefer Expo-compatible libraries and patterns.
- Keep screens mobile-first.

## UI Rules
- Reuse `SafeScreen` on every screen after it exists.
- Reuse `PrimaryButton` for main CTAs.
- Reuse `AppCard` for cards.
- Use Lucide React Native icons for icon buttons.
- Use the 8-point spacing system.
- Keep one primary CTA per screen.
- Bloop must remain a floating action button, not a tab.
- Avoid nested `ScrollView` usage.
- Use `FlatList` for complex lists.

## Health Safety Rules
- Do not diagnose users.
- Do not create fear.
- Do not overstate predictions.
- Encourage professional care for serious, sudden, persistent, or unusual symptoms.
- Explain health terms simply.
- Avoid medical jargon when plain language works.

## Documentation Discipline
- If a design rule changes, update the relevant doc in `/docs`.
- If a route changes, update `ROUTING_PLAN.md`.
- If a reusable component changes, update `COMPONENT_RULES.md`.
- If copy patterns change, update `HEALTH_COPY_RULES.md`.
- Keep `CURRENT_PROGRESS.md` truthful and current.
