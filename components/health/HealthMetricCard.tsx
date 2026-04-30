import { type ReactNode } from "react";
import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from "react-native";

import { AppCard } from "@/components/ui/AppCard";
import { colors, spacing } from "@/lib/design-tokens";

type HealthMetricCardProps = {
  label: string;
  value: string;
  icon?: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export function HealthMetricCard({ label, value, icon, style }: HealthMetricCardProps) {
  return (
    <AppCard style={[styles.card, style]}>
      <View style={styles.iconRow}>{icon}</View>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minHeight: 112,
    padding: spacing.lg,
  },
  iconRow: {
    minHeight: 22,
    marginBottom: spacing.xs,
  },
  value: {
    color: colors.primaryText,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 22,
    lineHeight: 30,
    letterSpacing: 0,
  },
  label: {
    color: colors.secondaryText,
    fontFamily: "Poppins_500Medium",
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 0,
    marginTop: 2,
  },
});
