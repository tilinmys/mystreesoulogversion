# UI/UX Rules

## Core Rules
- Design mobile-first at all times.
- Use one primary CTA per screen.
- Use `SafeScreen` everywhere once the component exists.
- Use consistent bottom tabs for Home, Cycle, Vault, and Profile.
- Bloop is always a floating action button, not a tab.
- Avoid clutter and visual noise.
- Avoid too many inputs at once.
- Chunk complex forms into small, supportive steps.
- Use friendly empty states.
- Use modal or bottom sheet patterns for quick actions.
- Use `FlatList` for complex or long scrolling screens.
- Avoid nested `ScrollView` structures.
- Keep health insights simple and readable.

## Screen Structure
- Every screen should have one clear purpose.
- Begin with the most important user context.
- Group related actions together.
- Keep summaries short and expandable when needed.
- Preserve bottom navigation space and safe area spacing.

## Navigation
- Onboarding screens do not show bottom tabs.
- Main tabs are Home, Cycle, Vault, and Profile.
- Bloop opens as a modal, overlay, or floating companion interaction.
- Log Day opens as a quick modal or bottom sheet.
- Upload Record opens from Vault.

## Forms
- Ask only for what is needed.
- Prefer tap choices, pills, sliders, steppers, and date pickers over long typing.
- Break complex health logs into small sections.
- Save partial user input when possible.
- Make validation gentle and specific.

## Empty States
- Empty states should be reassuring and useful.
- Offer one next action.
- Avoid guilt or urgency.
- Example: "No records yet. Add a report when you are ready."

## Health Insights
- Show one insight at a time when possible.
- Explain patterns in plain language.
- Use soft qualifiers such as "may", "might", and "could".
- Never present predictions as certainty.
- Encourage professional care for serious, sudden, or concerning symptoms.
