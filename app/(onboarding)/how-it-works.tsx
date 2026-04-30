import { Archive, Bot, Heart, NotebookPen } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";

import { SafeScreen } from "@/components/layout/SafeScreen";
import { AppCard } from "@/components/ui/AppCard";
import { OnboardingBackButton } from "@/components/ui/OnboardingBackButton";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { colors, radius, spacing } from "@/lib/design-tokens";
import { preloadFounderQuoteImages } from "@/lib/image-preloader";

const MAX_CONTENT_WIDTH = 340;

const steps = [
  {
    icon: Heart,
    color: colors.paleCoral,
    number: "01",
    title: "Track your rhythm",
    body: "See cycle phase, period predictions, and gentle body patterns.",
  },
  {
    icon: NotebookPen,
    color: colors.softTeal,
    number: "02",
    title: "Log gently",
    body: "Record mood, pain, fatigue, sleep, and notes with quick taps.",
  },
  {
    icon: Archive,
    color: colors.primaryOrange,
    number: "03",
    title: "Keep records together",
    body: "Use the demo vault to organize reports, notes, and summaries.",
  },
  {
    icon: Bot,
    color: colors.roseGold,
    number: "04",
    title: "Ask Bloop",
    body: "Get supportive explanations and doctor-prep notes without judgment.",
  },
];

export default function HowItWorksScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const compactWidth = width < 380;
  const sidePadding = compactWidth ? spacing.lg : spacing.xl;
  const contentWidth = Math.max(272, Math.min(width - sidePadding * 2, MAX_CONTENT_WIDTH));

  useEffect(() => preloadFounderQuoteImages(), []);

  return (
    <SafeScreen bottomInset={false} contentStyle={[styles.content, { paddingHorizontal: sidePadding }]}>
      <OnboardingBackButton />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.scroll}
      >
        {/* Header */}
        <View style={[styles.header, { width: contentWidth }]}>
          <Text style={[styles.title, compactWidth && styles.titleCompact]}>
            How MyStree Soul works
          </Text>
          <Text style={styles.subtitle}>
            A simple flow to help you understand your body without feeling overwhelmed.
          </Text>
        </View>

        {/* Step Cards */}
        <View style={[styles.steps, { width: contentWidth }]}>
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <AppCard key={step.title} style={styles.card}>
                <View style={[styles.iconWrap, { backgroundColor: `${step.color}18` }]}>
                  <Icon size={22} color={step.color} strokeWidth={2.2} />
                </View>
                <View style={styles.stepBody}>
                  <View style={styles.stepTitleRow}>
                    <Text style={[styles.stepNumber, { color: step.color }]}>{step.number}</Text>
                    <Text style={styles.stepTitle}>{step.title}</Text>
                  </View>
                  <Text style={styles.stepText}>{step.body}</Text>
                </View>
              </AppCard>
            );
          })}
        </View>

        {/* Footer note */}
        <View style={[styles.noteBox, { width: contentWidth }]}>
          <Text style={styles.noteText}>
            MyStree Soul does not diagnose. It helps you notice patterns and prepare better conversations with your doctor.
          </Text>
        </View>
      </ScrollView>

      {/* Fixed CTA */}
      <View style={[styles.footer, { width: contentWidth, alignSelf: "center" }]}>
        <PrimaryButton
          label="Personalize My Experience"
          onPress={() => router.push("/(onboarding)/goals")}
          accessibilityLabel="Continue to personalize your goals"
        />
      </View>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    flexDirection: "column",
    paddingTop: spacing.md,
    paddingBottom: 0,
    backgroundColor: colors.warmWhite,
  },
  scrollView: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: spacing.sm,
    gap: spacing.md,
  },
  header: {
    flexDirection: "column",
    alignItems: "center",
    gap: spacing.xs,
    marginBottom: spacing.xxs,
  },
  title: {
    color: colors.primaryText,
    fontFamily: "Poppins_500Medium",
    fontSize: 27,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0,
  },
  titleCompact: {
    fontSize: 23,
    lineHeight: 31,
  },
  subtitle: {
    color: colors.secondaryText,
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    lineHeight: 22,
    textAlign: "center",
    letterSpacing: 0,
  },
  steps: {
    flexDirection: "column",
    gap: spacing.sm,
  },
  card: {
    padding: spacing.md,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.md,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: radius.small,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    marginTop: 2,
  },
  stepBody: {
    flex: 1,
    flexDirection: "column",
    gap: 4,
  },
  stepTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  stepNumber: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 11,
    lineHeight: 18,
    letterSpacing: 0.5,
  },
  stepTitle: {
    color: colors.primaryText,
    fontFamily: "Poppins_500Medium",
    fontSize: 15,
    lineHeight: 21,
    letterSpacing: 0,
  },
  stepText: {
    color: colors.secondaryText,
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    lineHeight: 20,
    letterSpacing: 0,
  },
  noteBox: {
    backgroundColor: colors.warmWhite,
    borderRadius: radius.small,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginTop: spacing.xxs,
  },
  noteText: {
    color: colors.secondaryText,
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    lineHeight: 18,
    textAlign: "center",
    letterSpacing: 0,
  },
  footer: {
    flexDirection: "column",
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
    backgroundColor: colors.warmWhite,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
  },
});
