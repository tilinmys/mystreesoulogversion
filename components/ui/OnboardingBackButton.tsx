/**
 * OnboardingBackButton
 *
 * Premium back button for onboarding screens.
 * - 44×44 touch target (accessibility standard)
 * - 32pt from left edge — matches layout grid
 * - ChevronLeft icon in dark tinted gray
 * - Placed inside SafeAreaView so notch never hides it
 * - Uses router.back() — cleanly pops the navigation stack
 */
import { ChevronLeft } from "lucide-react-native";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet } from "react-native";

import { colors } from "@/lib/design-tokens";

export function OnboardingBackButton() {
  const router = useRouter();

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    }
  };

  return (
    <Pressable
      onPress={handleBack}
      accessibilityRole="button"
      accessibilityLabel="Go back"
      style={({ pressed }) => [styles.btn, pressed && styles.pressed]}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
    >
      <ChevronLeft size={24} color={colors.primaryText} strokeWidth={2.2} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    // 44×44 touch target, 32pt from left edge per 8pt grid
    width: 44,
    height: 44,
    marginLeft: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 22,
  },
  pressed: {
    opacity: 0.5,
  },
});
