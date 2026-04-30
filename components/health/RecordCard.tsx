import { FileText } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";

import { AppCard } from "@/components/ui/AppCard";
import { colors, radius, spacing } from "@/lib/design-tokens";
import type { HealthRecord } from "@/store/app-store";

type RecordCardProps = {
  record: HealthRecord;
};

export function RecordCard({ record }: RecordCardProps) {
  return (
    <AppCard style={styles.card}>
      <View style={styles.icon}>
        <FileText size={20} color={colors.primaryOrange} strokeWidth={2.2} />
      </View>
      <View style={styles.copy}>
        <View style={styles.row}>
          <Text style={styles.title}>{record.title}</Text>
          <Text style={styles.date}>{record.date}</Text>
        </View>
        <Text style={styles.meta}>
          {record.type} | {record.source}
        </Text>
        <Text style={styles.notes}>{record.notes}</Text>
      </View>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: spacing.md,
    flexDirection: "row",
    gap: spacing.md,
  },
  icon: {
    width: 48,
    height: 48,
    borderRadius: radius.small,
    backgroundColor: colors.peachGlow,
    alignItems: "center",
    justifyContent: "center",
  },
  copy: {
    flex: 1,
    minWidth: 0,
  },
  row: {
    flexDirection: "row",
    gap: spacing.xs,
    alignItems: "flex-start",
  },
  title: {
    flex: 1,
    color: colors.primaryText,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: 0,
  },
  date: {
    color: colors.mutedText,
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 0,
  },
  meta: {
    color: colors.secondaryText,
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: 0,
    marginTop: spacing.xxs,
  },
  notes: {
    color: colors.secondaryText,
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    lineHeight: 20,
    letterSpacing: 0,
    marginTop: spacing.xs,
  },
});
