import { CalendarDays, ChevronRight, ShieldCheck, Sparkles, Vault } from "lucide-react-native";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import { colors, spacing } from "@/lib/design-tokens";
import { useAppStore } from "@/store/app-store";

export default function LoginSuccessScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const userName = useAppStore((state) => state.userName);
  const records = useAppStore((state) => state.records);

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.screen}>
      <StatusBar style="dark" />
      <View style={[styles.content, { paddingBottom: Math.max(insets.bottom, spacing.lg) }]}>
        <View style={styles.hero}>
          <View style={styles.successMark}>
            <ShieldCheck size={34} color={colors.softTeal} strokeWidth={2.2} />
          </View>
          <Text maxFontSizeMultiplier={1.1} style={styles.title}>
            You are signed in
          </Text>
          <Text maxFontSizeMultiplier={1.1} style={styles.body}>
            Welcome back{userName ? `, ${userName}` : ""}. Your sanctuary is ready with your saved rhythm,
            records, and privacy controls.
          </Text>
        </View>

        <View style={styles.restoreCard}>
          <RestoreRow
            icon={<CalendarDays size={19} color={colors.primaryOrange} strokeWidth={2.2} />}
            title="Cycle profile restored"
            detail="28 day cycle / 5 day period"
          />
          <RestoreRow
            icon={<Vault size={19} color={colors.softTeal} strokeWidth={2.2} />}
            title="Memory Vault ready"
            detail={`${records.length} record${records.length === 1 ? "" : "s"} available`}
          />
          <RestoreRow
            icon={<Sparkles size={19} color={colors.roseGold} strokeWidth={2.2} />}
            title="Tutorial skipped"
            detail="Returning users go straight to the app"
          />
        </View>

        <View style={styles.footer}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Continue to dashboard"
            onPress={() => router.replace("/(tabs)/home")}
            style={({ pressed }) => [styles.primaryButton, pressed ? styles.pressed : null]}
          >
            <Text style={styles.primaryText}>Continue to dashboard</Text>
            <ChevronRight size={18} color={colors.whiteText} strokeWidth={2.4} />
          </Pressable>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Review privacy settings"
            onPress={() => router.push("/(modals)/privacy")}
            style={({ pressed }) => [styles.secondaryButton, pressed ? styles.pressed : null]}
          >
            <Text style={styles.secondaryText}>Review privacy settings</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

function RestoreRow({ icon, title, detail }: { icon: React.ReactNode; title: string; detail: string }) {
  return (
    <View style={styles.restoreRow}>
      <View style={styles.restoreIcon}>{icon}</View>
      <View style={styles.restoreCopy}>
        <Text maxFontSizeMultiplier={1.1} numberOfLines={1} style={styles.restoreTitle}>
          {title}
        </Text>
        <Text maxFontSizeMultiplier={1.1} numberOfLines={1} style={styles.restoreDetail}>
          {detail}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.backgroundWhite,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
  },
  hero: {
    alignItems: "center",
    paddingTop: spacing.xl,
    paddingBottom: spacing.xl,
  },
  successMark: {
    width: 78,
    height: 78,
    borderRadius: 30,
    backgroundColor: colors.tealSoftSurface,
    borderWidth: 1,
    borderColor: "rgba(91, 191, 181, 0.22)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.lg,
  },
  title: {
    color: colors.primaryText,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 32,
    lineHeight: 40,
    textAlign: "center",
  },
  body: {
    color: colors.secondaryText,
    fontFamily: "Poppins_400Regular",
    fontSize: 15,
    lineHeight: 24,
    textAlign: "center",
    marginTop: spacing.sm,
    maxWidth: 338,
  },
  restoreCard: {
    borderRadius: 28,
    backgroundColor: colors.backgroundWhite,
    borderWidth: 1,
    borderColor: colors.divider,
    paddingVertical: spacing.xs,
    shadowColor: colors.coralShadow,
    shadowOpacity: 0.05,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 3,
  },
  restoreRow: {
    minHeight: 72,
    paddingHorizontal: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(241, 230, 221, 0.72)",
  },
  restoreIcon: {
    width: 42,
    height: 42,
    borderRadius: 16,
    backgroundColor: colors.softSurfaceTint,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.sm,
  },
  restoreCopy: {
    flex: 1,
    minWidth: 0,
  },
  restoreTitle: {
    color: colors.primaryText,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 15,
    lineHeight: 21,
  },
  restoreDetail: {
    color: colors.secondaryText,
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    lineHeight: 17,
    marginTop: 1,
  },
  footer: {
    marginTop: "auto",
    gap: spacing.sm,
  },
  primaryButton: {
    minHeight: 56,
    borderRadius: 28,
    backgroundColor: colors.primaryOrange,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
    shadowColor: colors.orangeShadow,
    shadowOpacity: 0.12,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
  },
  primaryText: {
    color: colors.whiteText,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 15,
    lineHeight: 21,
  },
  secondaryButton: {
    minHeight: 48,
    borderRadius: 24,
    backgroundColor: colors.backgroundWhite,
    borderWidth: 1,
    borderColor: colors.divider,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryText: {
    color: colors.primaryText,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    lineHeight: 20,
  },
  pressed: {
    opacity: 0.86,
    transform: [{ scale: 0.99 }],
  },
});
