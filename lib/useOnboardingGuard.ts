import { useEffect } from "react";
import { InteractionManager } from "react-native";
import { useRootNavigationState, useRouter, useSegments } from "expo-router";

import { useAppStore } from "@/store/app-store";

export function useOnboardingGuard() {
  const router = useRouter();
  const segments = useSegments();
  const rootNavigationState = useRootNavigationState();

  const hasHydrated = useAppStore((s) => s.hasHydrated);
  const consentAccepted = useAppStore((s) => s.consentAccepted);
  const selectedGoals = useAppStore((s) => s.selectedGoals);
  const hasCompletedOnboarding = useAppStore((s) => s.hasCompletedOnboarding);

  useEffect(() => {
    if (!rootNavigationState?.key || !hasHydrated) return;
    if (segments[0] === "(onboarding)") return;

    let target:
      | "/(onboarding)/consent"
      | "/(onboarding)/intro"
      | "/(onboarding)/cycle-setup"
      | null = null;

    if (!consentAccepted) {
      target = "/(onboarding)/consent";
    } else if (selectedGoals.length === 0) {
      target = "/(onboarding)/intro";
    } else if (!hasCompletedOnboarding) {
      target = "/(onboarding)/cycle-setup";
    }

    if (!target) return;

    const task = InteractionManager.runAfterInteractions(() => {
      router.replace(target);
    });

    return () => task.cancel();
  }, [
    hasHydrated,
    consentAccepted,
    selectedGoals,
    hasCompletedOnboarding,
    segments,
    rootNavigationState?.key,
    router,
  ]);
}
