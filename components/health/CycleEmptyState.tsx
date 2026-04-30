/**
 * CycleEmptyState
 *
 * Shown on the Cycle tab when the user skipped cycle tracking during onboarding.
 * No NaN, no broken prediction wheel — just a calm, branded empty state.
 */
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import Svg, { Circle, Defs, RadialGradient, Stop } from "react-native-svg";

import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { colors, spacing } from "@/lib/design-tokens";

function SoftOrb({ size }: { size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 200 200">
      <Defs>
        <RadialGradient id="cycleEmpty" cx="50%" cy="50%" r="50%">
          <Stop offset="0"   stopColor={colors.paleCoral}  stopOpacity="0.55" />
          <Stop offset="0.5" stopColor={colors.peachGlow}  stopOpacity="0.28" />
          <Stop offset="1"   stopColor={colors.warmWhite}  stopOpacity="0"    />
        </RadialGradient>
      </Defs>
      <Circle cx="100" cy="100" r="90"  fill="url(#cycleEmpty)" />
      <Circle cx="100" cy="100" r="62"  stroke={colors.paleCoral}  strokeWidth="1.2" strokeDasharray="4 6" fill="none" strokeOpacity="0.5" />
      <Circle cx="100" cy="100" r="38"  stroke={colors.primaryOrange} strokeWidth="1"   strokeDasharray="3 5" fill="none" strokeOpacity="0.3" />
      <Circle cx="100" cy="100" r="16"  fill={colors.peachGlow} />
    </Svg>
  );
}

export function CycleEmptyState() {
  const router = useRouter();

  return (
    <View style={styles.root}>
      <SoftOrb size={180} />
      <Text style={styles.title}>No cycle tracking yet</Text>
      <Text style={styles.body}>
        Set up cycle tracking to see your phase predictions, period countdown, and pattern charts.
      </Text>
      <PrimaryButton
        label="Set up cycle tracking"
        onPress={() => router.push("/(onboarding)/cycle-setup")}
        style={styles.cta}
      />
      <SecondaryButton
        label="Stay in wellness mode"
        onPress={() => {}}
        style={styles.secondary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xl,
    gap: spacing.md,
  },
  title: {
    color: colors.primaryText,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 20,
    lineHeight: 27,
    textAlign: "center",
    marginTop: spacing.sm,
  },
  body: {
    color: colors.secondaryText,
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    lineHeight: 22,
    textAlign: "center",
  },
  cta: {
    alignSelf: "stretch",
    marginTop: spacing.xs,
  },
  secondary: {
    alignSelf: "stretch",
    borderWidth: 0,
    backgroundColor: "transparent",
  },
});
