# Testing Plan

Internal testing plan for MyStree Soul (demo phase).

## Manual Testing Checklist

### Onboarding Flow
- [ ] Splash screen loads and auto-redirects to Welcome
- [ ] Welcome "Start Demo" navigates to Consent
- [ ] "I already have an account" is visible and tappable
- [ ] Consent screen cards are readable and scroll on small phones
- [ ] Consent CTA navigates to How It Works
- [ ] TeamAvatar fallback initials render when no image provided
- [ ] How It Works cards scroll; CTA visible at bottom of small screens
- [ ] Onboarding screens do not leave a large blank area after the last card when scrolled to the bottom
- [ ] Goals screen CTA is disabled when no goal is selected
- [ ] Goals selection and deselection works correctly
- [ ] Cycle Setup name input works; blank name falls back to "beautiful"
- [ ] Onboarding progress persists after closing and reopening the app
- [ ] "I don't remember" option stores skip state correctly
- [ ] "I don't track cycles" enters wellness mode
- [ ] Skip cycle setup navigates to Home without crashing
- [ ] Dashboard opens correctly after full onboarding

### Dashboard
- [ ] Home tab loads with correct user name
- [ ] Bloop intro overlay appears only on first Home visit and dismisses with "Nice to meet you, Bloop"
- [ ] Bloop intro appears before the product tour and does not overlap the tab bar
- [ ] After dismissing Bloop intro, the first product tour spotlight targets the Bloop chat button
- [ ] Feature tour starts only after Zustand hydration and non-zero target measurements
- [ ] Cycle phase and prediction display correctly
- [ ] Mood check-in taps register and persist in state
- [ ] Home uses one vertical dashboard scroll; mood buttons wrap without creating a nested scroll conflict
- [ ] Quick actions open the correct modals
- [ ] Vault preview opens Vault tab
- [ ] Bloop FAB opens Bloop modal
- [ ] Product tour appears on first visit
- [ ] Tour cards do not overlap the tab bar

### Vault
- [ ] Vault shows locked state before unlock
- [ ] Unlock Vault transitions correctly
- [ ] Record cards display title, type, source, date, and notes
- [ ] Upload Record modal opens from Vault

### Profile
- [ ] User name, goals, and cycle settings display correctly
- [ ] Testing disclaimer is visible
- [ ] Reset Demo clears state and routes to Welcome
- [ ] Delete My Data clears state and routes to Welcome

### Modals
- [ ] Bloop modal opens, accepts input, shows demo response
- [ ] Log Day modal saves and reflects mood in Home state
- [ ] Upload Record modal adds a record to Vault
- [ ] Doctor Prep summary loads and shows copy button

### Small Screen / Device Tests
- [ ] All onboarding screens scroll on SE-sized devices (width < 380)
- [ ] CTAs are reachable above the home indicator
- [ ] Keyboard does not cover input fields
- [ ] Tab bar does not cover content
- [ ] No text overlaps

### Expo Go Device Testing
- [ ] Scan QR code with Expo Go (iOS/Android)
- [ ] All button backgrounds render correctly (not invisible)
- [ ] Cards have visible borders and backgrounds
- [ ] Safe areas respected on notch/island devices

## Devices to Test
1. iPhone SE (compact: 375pt)
2. iPhone 15 Pro (notch/dynamic island)
3. Android mid-range (navigation bar)
4. Web preview (localhost) for layout reference

## Known Limitations (Demo Build)
- No real auth. No backend. No cloud storage.
- AsyncStorage persistence is local-only and not encrypted backend storage.
- Real medical records must NOT be uploaded to this demo build.
