# Accessibility Rules

## Touch Targets
- Minimum touch target: 44x44.
- Preferred touch target: 48x48.
- Floating Bloop button target: at least 56x56.
- Close buttons must have enough invisible padding.

## Text Readability
- Use readable font sizes.
- Body text should generally be 16 or larger.
- Helper text should not be used for critical information.
- Keep line length comfortable on mobile.
- Ensure button text is visible and not clipped.

## Labels And Semantics
- Add accessibility labels to icon-only controls.
- Add clear labels to inputs.
- Make toggles and switches understandable without color alone.
- Use accessible role and state props where appropriate.

## Color And Contrast
- Do not rely only on color to communicate status.
- Pair colors with labels, icons, or text.
- Maintain strong contrast for text and buttons.
- Never place Muted Text on low-contrast backgrounds for important content.

## Layout And Safe Areas
- Respect device safe area on every screen.
- Use `SafeScreen` once available.
- Avoid placing important actions under notches, home indicators, or bottom bars.
- Support keyboard behavior on forms.

## Charts
- Avoid tiny chart labels.
- Provide text summaries near charts.
- Use chart colors from the design system.
- Do not make health-critical information available only through chart color.

## Motion
- Keep animation gentle and optional where possible.
- Avoid rapid flashing, intense pulsing, or distracting loops.
- Bloop animations should feel calm and supportive.
