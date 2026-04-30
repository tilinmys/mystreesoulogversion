# Design System

## Design Principles
- Calm first: every screen should reduce cognitive load.
- Trust over decoration: visuals support health clarity, not spectacle.
- Warm clinical balance: soft and human, but still credible.
- Mobile-first: every element must work comfortably on small screens.
- Consistency: reuse tokens, components, spacing, and copy patterns.

## Colors

### Background
- App Background: `#FFF8F5`
- Pure Surface White: `#FFFFFF`
- Soft Surface Tint: `#FFF3EC`

### Primary
- Orange: `#F97316`
- Orange Gradient Start: `#FB923C`
- Orange Gradient End: `#F97316`
- Orange Soft Surface: `#FFF1E8`
- Orange Border: `#FED7AA`

### Accent
- Soft Teal: `#5BBFB5`
- Teal Soft Surface: `#E8F7F5`
- Coral: `#FF8A7A`
- Coral Soft Surface: `#FFE8E3`
- Soft Pink: `#F9A8D4`
- Pink Soft Surface: `#FCE7F3`
- Rose Gold: `#C98F7A`
- Peach: `#FDE7DC`
- Lavender Mist: `#EDE7F6`

### Text
- Primary Text: `#2D2A26`
- Secondary Text: `#6B665F`
- Muted Text: `#9B928A`
- White Text: `#FFFFFF`

### Status
- Success Text: `#2F7D55`
- Success Surface: `#EAF7EF`
- Warning Text: `#9A5B00`
- Warning Surface: `#FFF4D8`
- Danger Text: `#B94A48`
- Danger Surface: `#FDECEC`

## Color Usage Rules
- Use Warm White (`#FFF8F5`) for the main app background across onboarding, tabs, and modals.
- Use White for cards, sheets, and high-readability surfaces, separated by borders, spacing, and soft shadows.
- Avoid random tinted section backgrounds; use spacing, white cards, and hierarchy instead.
- Use Orange only for primary CTAs, active states, selected primary actions, send buttons, and key cycle emphasis.
- Use Coral and Pink for gentle emotional warmth, never as main CTA colors.
- Use Teal for privacy, vault trust, health metrics, and calm-success insights.
- Use Lavender for rest, Bloop thinking states, and emotional reflection.
- Use Primary Text for headings and important values.
- Use Secondary Text for explanations.
- Use Muted Text for metadata, timestamps, placeholders, and disabled text.
- Never create new colors without updating this file first.
- Never use pastel text for body copy.
- Never place orange text on peach/orange soft surfaces unless contrast is checked.
- Warning and danger states use soft surfaces with dark status text, never harsh red blocks.

## Typography

### Screen Title
- Size: 28
- Line height: 34
- Weight: 700
- Use for main screen titles only.

### Section Title
- Size: 20
- Line height: 26
- Weight: 700
- Use for card groups and screen sections.

### Body Text
- Size: 16
- Line height: 24
- Weight: 400
- Use for readable explanations, descriptions, and normal content.

### Helper Text
- Size: 13
- Line height: 18
- Weight: 400
- Use for hints, labels, metadata, and supportive notes.

### Button Text
- Size: 16
- Line height: 22
- Weight: 600 or 700
- Use for primary and secondary CTA labels.

## Typography Usage Rules
- Poppins is the primary UI font for normal screens, cards, tabs, buttons, inputs, and modals.
- Playfair Display and Great Vibes are reserved for brand/splash moments only.
- Hero headings: 32-40.
- Screen headings: 28-32.
- Section headings: 18-22.
- Body text: 14-16.
- Caption text: 12-13.
- Never use pure black text.

## Spacing Grid
Use the 8-point spacing system:

```txt
4, 8, 12, 16, 24, 32, 40
```

Rules:
- Use 16 for default screen horizontal padding.
- Use 24 for larger section separation.
- Use 8 or 12 for compact internal spacing.
- Use 32 or 40 only for major vertical separation.
- Do not invent arbitrary spacing values unless a platform issue requires it.

## Border Radius
```txt
Button: 8
Input: 8
Small: 16
Medium: 20
Large: 24
Full: 999
```

Rules:
- Use Large for AppCard.
- Use Button radius for primary and secondary CTA controls.
- Use Input radius for form fields, chat bars, and text areas.
- Do not use pill buttons for primary CTAs or form fields.
- Use Small for smaller pills or nested status elements.
- Use Full only for circular icons, avatars, dots, and the Bloop orb.

## Shadows
Use soft, subtle shadows only.

Recommended card shadow:
- Rose-gold or coral tinted.
- Low opacity.
- Medium blur.
- No harsh black elevation.
- Pair with a faint border when needed.

Recommended primary CTA shadow:
- Brand-tinted orange/coral shadow.
- Opacity: `0.08`
- Radius: `18`
- Elevation: `5`

Avoid:
- Heavy floating shadows.
- Dark glows.
- Multiple stacked shadows.
- Default gray/black shadows.

## Buttons

### Primary Button
- Orange background: subtle `#FB923C` to `#F97316` gradient effect
- White text: `#FFFFFF`
- Height: 56
- Border radius: 8
- Button text uses Button Text typography.
- Must have a clear action label.
- Never use low-contrast text.
- Do not place icons in primary buttons.
- Use one primary CTA per screen.

### Secondary Button
- Inline text-style action.
- Warm dark gray label.
- Minimum height: 44.
- No tiny links.
- Use when an action matters but is not the primary next step.

### Disabled Button
- Soft warm disabled surface.
- Disabled text remains readable.
- Do not use faded orange for disabled state.

### Icon Button
- Minimum touch target: 44x44.
- Preferred touch target: 48x48.
- Use Lucide React Native icons.
- Add accessibility labels.
- Do not use icon-only buttons without an accessible label.

### Floating Bloop Button
- Always floating above content.
- Never a bottom tab item.
- Uses Orange or a warm gradient-like composition only if implemented with design tokens.
- Minimum touch target: 56x56.
- Must not block core navigation or primary CTA.
- Opens Bloop as a modal or overlay.
- Sits above the floating tab bar with a soft coral/orange glow.

### Bottom Tab Bar
- White floating rounded rectangle.
- Border radius: 24.
- Soft brand-tinted shadow.
- Active icon/text: Orange `#F97316`.
- Inactive icon/text: Muted Text `#9B928A`.
- Must respect safe area and never turn Bloop into a tab.

## Cards
Cards must use:
- White background.
- Rounded 20 for standard cards, 24 for hero/floating surfaces.
- Padding 20 or 24.
- Subtle shadow or subtle border.
- Clear title.
- Short description.
- Content that is scannable on mobile.

Avoid:
- Nested cards.
- Dense paragraphs inside cards.
- Multiple competing actions in one card.
- Page-specific card styles when AppCard can be reused.

## Inputs And Forms
- White background.
- Border radius: 8.
- Minimum height: 48.
- Soft warm border.
- Clear label above the input.
- No pill input fields.
- Use 8-point spacing.
- Touch targets must remain at least 44.

## Modal Polish
- Modal backgrounds use Warm White.
- Modal content is chunked into White AppCard sections.
- Close buttons must be 48x48 with clear accessible labels.
- Safety cards use calm warm borders, never harsh red.
- Primary modal CTAs use the shared PrimaryButton style.
