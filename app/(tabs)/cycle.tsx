import { Line, Path, Svg } from "react-native-svg";
import { useRouter } from "expo-router";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { CycleEmptyState } from "@/components/health/CycleEmptyState";
import { CycleWheel } from "@/components/health/CycleWheel";
import { SafeScreen } from "@/components/layout/SafeScreen";
import { AppCard } from "@/components/ui/AppCard";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { colors, shadows, spacing } from "@/lib/design-tokens";
import { strings } from "@/lib/strings";
import { useAppStore } from "@/store/app-store";

const sections = ["wheel", "phase", "prediction", "chart", "tip"] as const;
const tabScrollClearance = 94;

function TrendChart() {
  return (
    <Svg width="100%" height={120} viewBox="0 0 300 120">
      <Line x1="16" y1="98" x2="284" y2="98" stroke={colors.peachGlow} strokeWidth={1} />
      <Path
        d="M18 82 C58 70 78 52 112 64 C150 78 164 26 202 38 C232 46 244 74 282 58"
        stroke={colors.primaryOrange}
        strokeWidth={4}
        strokeLinecap="round"
        fill="none"
      />
      <Path
        d="M18 88 C72 84 104 78 139 82 C188 88 223 72 282 74"
        stroke={colors.softTeal}
        strokeWidth={3}
        strokeLinecap="round"
        fill="none"
        opacity={0.7}
      />
    </Svg>
  );
}

export default function CycleScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const cycleTrackingSkipped = useAppStore((s) => s.cycleTrackingSkipped);

  // User skipped cycle tracking → show graceful empty state, no NaN
  if (cycleTrackingSkipped) {
    return (
      <SafeScreen bottomInset={false} contentStyle={styles.content}>
        <CycleEmptyState />
      </SafeScreen>
    );
  }

  return (
    <SafeScreen bottomInset={false} contentStyle={styles.content}>
      <FlatList
        data={sections}
        keyExtractor={(item) => item}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.list,
          { paddingBottom: Math.max(insets.bottom, spacing.md) + tabScrollClearance },
        ]}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        ListHeaderComponent={
          <SectionHeader title={strings.cycle.title} subtitle={strings.cycle.subtitle} />
        }
        renderItem={({ item }) => {
          if (item === "wheel") {
            return (
              <AppCard style={styles.wheelCard}>
                <CycleWheel size={230} day={14} phase="Ovulation" />
              </AppCard>
            );
          }
          if (item === "phase") {
            return (
              <AppCard>
                <Text style={styles.cardTitle}>{strings.cycle.phaseTitle}</Text>
                <Text style={styles.cardBody}>{strings.cycle.phaseBody}</Text>
              </AppCard>
            );
          }
          if (item === "prediction") {
            return (
              <AppCard>
                <Text style={styles.cardTitle}>Prediction</Text>
                <Text style={styles.cardBody}>{strings.cycle.prediction}</Text>
              </AppCard>
            );
          }
          if (item === "chart") {
            return (
              <AppCard>
                <Text style={styles.cardTitle}>{strings.cycle.chartTitle}</Text>
                <TrendChart />
                <Text style={styles.chartHelp}>Soft orange: energy estimate. Teal: rest signal.</Text>
              </AppCard>
            );
          }
          return (
            <AppCard>
              <Text style={styles.cardTitle}>Phase tip</Text>
              <Text style={styles.cardBody}>{strings.cycle.tip}</Text>
              <PrimaryButton
                label={strings.cycle.cta}
                onPress={() => router.push("/(modals)/log-day")}
                style={styles.cta}
              />
            </AppCard>
          );
        }}
      />
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    flexDirection: "column",
    paddingHorizontal: spacing.lg,
  },
  list: {
    flexDirection: "column",
    paddingTop: spacing.xl,
    gap: spacing.lg,
  },
  wheelCard: {
    flexDirection: "column",
    alignItems: "center",
    borderRadius: 24,
    ...shadows.lg,
  },
  cardTitle: {
    color: colors.primaryText,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    lineHeight: 22,
  },
  cardBody: {
    color: colors.secondaryText,
    fontFamily: "Poppins_400Regular",
    fontSize: 15,
    lineHeight: 22,
    marginTop: spacing.xs,
  },
  chartHelp: {
    color: colors.secondaryText,
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    lineHeight: 17,
  },
  cta: {
    marginTop: spacing.md,
  },
});
