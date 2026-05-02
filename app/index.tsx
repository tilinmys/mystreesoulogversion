import { Redirect } from "expo-router";
import { StyleSheet, View } from "react-native";

import { useAppStore } from "@/store/app-store";

export default function IndexRoute() {
  const hasHydrated = useAppStore((state) => state.hasHydrated);
  const hasCompletedOnboarding = useAppStore((state) => state.hasCompletedOnboarding);
  const onboardingCompleted = useAppStore((state) => state.onboardingCompleted);

  if (!hasHydrated) {
    return <View style={styles.skeleton} />;
  }

  return <Redirect href={hasCompletedOnboarding || onboardingCompleted ? "/(tabs)/home" : "/(onboarding)/welcome"} />;
}

const styles = StyleSheet.create({
  skeleton: {
    flex: 1,
    backgroundColor: "#FFF8F5",
  },
});
