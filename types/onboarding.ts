// Onboarding-related types for the MyStree Soul frontend demo.
// No backend connection. All values are local Zustand/demo state.

export type OnboardingStep =
  | "splash"
  | "welcome"
  | "consent"
  | "trust-notes"
  | "how-it-works"
  | "goals"
  | "cycle-setup"
  | "home";

export type OnboardingState = {
  /** Current step in the onboarding flow. */
  currentStep: OnboardingStep;
  /** True when the user has accepted the privacy/consent screen. */
  consentAccepted: boolean;
  /** True when the full onboarding flow is complete. */
  completed: boolean;
};
