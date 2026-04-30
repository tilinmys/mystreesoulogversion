// User-related types for the MyStree Soul frontend demo.
// No backend connection. All values are local Zustand/demo state.

export type GoalOption =
  | "Track my period"
  | "Understand symptoms"
  | "Manage PCOS patterns"
  | "Prepare for doctor visits"
  | "Organize health records"
  | "General wellness";

export type UserProfile = {
  /** Display name or nickname. Defaults to "beautiful" if empty. */
  name: string;
  /** Goals chosen during onboarding. */
  selectedGoals: GoalOption[];
  /** Whether the user completed the full onboarding flow. */
  onboardingCompleted: boolean;
};
