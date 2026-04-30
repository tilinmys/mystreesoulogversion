import { Check, Copy, X } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { LotusDivider } from "@/components/brand/LotusDivider";
import { AppCard } from "@/components/ui/AppCard";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { SafeScreen } from "@/components/layout/SafeScreen";
import { colors, radius, spacing } from "@/lib/design-tokens";
import { strings } from "@/lib/strings";

export default function DoctorPrepModal() {
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  return (
    <SafeScreen contentStyle={styles.content}>
      <View style={styles.topRow}>
        <View>
          <Text style={styles.title}>{strings.modals.doctorPrep.title}</Text>
          <Text style={styles.subtitle}>{strings.modals.doctorPrep.subtitle}</Text>
        </View>
        <Pressable accessibilityRole="button" accessibilityLabel="Close doctor prep" onPress={() => router.back()} style={styles.close}>
          <X size={22} color={colors.primaryText} />
        </Pressable>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.scroll}
      >
        <View style={styles.divider}>
          <LotusDivider />
        </View>
        <SummaryCard title="Cycle Overview" items={["Cycle Day 14", "Ovulation Window", "Next period in 5 days"]} />
        <SummaryCard title="This Week's Symptoms" items={["Fatigue: Moderate", "Mood: Stable", "Pain: Mild"]} />
        <SummaryCard title="Records to Mention" items={["PCOS Management Plan", "Blood Panel Results"]} />
        <SummaryCard
          title="Questions for Doctor"
          items={[
            "Could my fatigue be related to my cycle?",
            "Should I track anything before my next visit?",
            "Are these symptoms worth monitoring?",
          ]}
        />
        <AppCard style={styles.note}>
          <Text style={styles.noteTitle}>Bloop Note</Text>
          <Text style={styles.noteText}>{strings.modals.doctorPrep.bloopNote}</Text>
        </AppCard>
        {copied ? <Text style={styles.copied}>{strings.modals.doctorPrep.copied}</Text> : null}
        <View style={styles.buttons}>
          <SecondaryButton
            label={strings.modals.doctorPrep.copy}
            onPress={() => setCopied(true)}
            style={styles.button}
          />
          <PrimaryButton
            label={strings.modals.doctorPrep.done}
            onPress={() => router.back()}
            iconRight={<Check size={18} color={colors.whiteText} />}
            style={styles.button}
          />
        </View>
      </ScrollView>
    </SafeScreen>
  );
}

function SummaryCard({ title, items }: { title: string; items: string[] }) {
  const accent =
    title.includes("Cycle") ? colors.primaryOrange :
    title.includes("Symptoms") ? colors.paleCoral :
    title.includes("Records") ? colors.softTeal :
    colors.roseGold;

  return (
    <AppCard>
      <Text style={styles.cardTitle}>{title}</Text>
      <View style={styles.itemList}>
        {items.map((item) => (
          <View key={item} style={styles.itemRow}>
            <Copy size={14} color={accent} />
            <Text style={styles.itemText}>{item}</Text>
          </View>
        ))}
      </View>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg,
    backgroundColor: colors.warmWhite,
  },
  topRow: {
    flexDirection: "row",
    gap: spacing.md,
  },
  title: {
    color: colors.primaryText,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 29,
    lineHeight: 36,
  },
  subtitle: {
    color: colors.secondaryText,
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    lineHeight: 21,
    marginTop: spacing.xs,
  },
  close: {
    marginLeft: "auto",
    width: 48,
    height: 48,
    borderRadius: radius.button,
    backgroundColor: colors.backgroundWhite,
    alignItems: "center",
    justifyContent: "center",
  },
  scroll: {
    flexGrow: 1,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
    gap: spacing.md,
  },
  divider: {
    alignItems: "center",
  },
  cardTitle: {
    color: colors.primaryText,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 17,
    lineHeight: 23,
  },
  itemList: {
    gap: spacing.xs,
    marginTop: spacing.sm,
  },
  itemRow: {
    flexDirection: "row",
    gap: spacing.xs,
    alignItems: "flex-start",
  },
  itemText: {
    flex: 1,
    color: colors.secondaryText,
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    lineHeight: 21,
  },
  note: {
    backgroundColor: colors.orangeSoftSurface,
    borderWidth: 1,
    borderColor: colors.orangeBorder,
  },
  noteTitle: {
    color: colors.primaryText,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
  },
  noteText: {
    color: colors.primaryText,
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    lineHeight: 21,
    marginTop: spacing.xs,
  },
  copied: {
    color: colors.successText,
    fontFamily: "Poppins_600SemiBold",
    textAlign: "center",
  },
  buttons: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  button: {
    flex: 1,
  },
});
