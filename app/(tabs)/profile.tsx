import { Bell, Bot, ChevronRight, Heart, RefreshCcw, Shield, SlidersHorizontal, Watch, Pencil, CheckCircle2 } from "lucide-react-native";
import { useRouter } from "expo-router";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { SafeScreen } from "@/components/layout/SafeScreen";
import { AppCard } from "@/components/ui/AppCard";
import { Pill } from "@/components/ui/Pill";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { colors, radius, shadows, spacing } from "@/lib/design-tokens";
import { strings } from "@/lib/strings";
import { useAppStore } from "@/store/app-store";

const sections = ["identity", "goals", "cycle", "devices", "settings"] as const;
const tabScrollClearance = 94;

export default function ProfileScreen() {
  const router = useRouter();
  const store = useAppStore();
  const insets = useSafeAreaInsets();

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
        ListHeaderComponent={<SectionHeader title={strings.profile.title} />}
        renderItem={({ item }) => {
          if (item === "identity") {
            const filledFields = [store.userName, store.dateOfBirth, store.phone, store.healthGoalSummary].filter(Boolean);
            const pct = Math.round((filledFields.length / 4) * 100);
            const isComplete = pct === 100;

            return (
              <View style={styles.identitySection}>
                {/* Completion Banner */}
                {!isComplete && (
                  <TouchableOpacity
                    style={styles.completionBanner}
                    onPress={() => router.push("/(modals)/edit-profile")}
                    activeOpacity={0.8}
                  >
                    <View style={styles.completionRow}>
                      <Text style={styles.completionText}>{pct}% profile complete</Text>
                      <Text style={styles.completionCta}>Complete now →</Text>
                    </View>
                    <View style={styles.completionTrack}>
                      <View style={[styles.completionFill, { width: `${pct}%` as any }]} />
                    </View>
                  </TouchableOpacity>
                )}
                {isComplete && (
                  <View style={styles.completionBannerDone}>
                    <CheckCircle2 size={16} color={colors.successText} strokeWidth={2.2} />
                    <Text style={styles.completionTextDone}>Profile complete ✨</Text>
                  </View>
                )}

                {/* Identity Card */}
                <AppCard style={styles.identity}>
                  <View style={styles.avatarWrap}>
                    <View style={styles.avatar}>
                      <Text style={styles.avatarText}>{store.userName.slice(0, 1).toUpperCase()}</Text>
                    </View>
                  </View>
                  <View style={styles.identityInfo}>
                    <Text style={styles.name}>{store.userName}</Text>
                    {store.dateOfBirth ? (
                      <Text style={styles.meta}>Born {store.dateOfBirth}</Text>
                    ) : (
                      <Text style={styles.meta}>Demo member · MyStree Soul</Text>
                    )}
                    {store.phone ? <Text style={styles.metaPhone}>{store.phone}</Text> : null}
                  </View>
                  <TouchableOpacity
                    style={styles.editBtn}
                    onPress={() => router.push("/(modals)/edit-profile")}
                    hitSlop={8}
                    accessibilityLabel="Edit profile"
                  >
                    <Pencil size={16} color={colors.primaryOrange} strokeWidth={2} />
                  </TouchableOpacity>
                </AppCard>
              </View>
            );
          }
          if (item === "goals") {
            return (
              <AppCard>
                <SectionHeader title={strings.profile.goals} />
                <View style={styles.pills}>
                  {store.selectedGoals.map((goal) => (
                    <Pill key={goal} label={goal} selected />
                  ))}
                </View>
                <SecondaryButton
                  label={strings.profile.editGoals}
                  onPress={() => router.push("/(onboarding)/goals")}
                  style={styles.cardButton}
                />
              </AppCard>
            );
          }
          if (item === "cycle") {
            return (
              <AppCard>
                <SectionHeader title="Cycle settings" />
                <Text style={styles.settingText}>Last period: {store.lastPeriodDate}</Text>
                <Text style={styles.settingText}>Cycle length: {store.cycleLength} days</Text>
                <Text style={styles.settingText}>Period length: {store.periodLength} days</Text>
              </AppCard>
            );
          }
          if (item === "devices") {
            const devices = ["Manual Input", "Apple Watch Demo", "Aura Kiosk Demo"];
            return (
              <AppCard>
                <SectionHeader title="Connected devices demo" />
                <View style={styles.deviceList}>
                  {devices.map((device) => (
                    <View key={device} style={styles.deviceRow}>
                      <Watch size={18} color={colors.roseGold} />
                      <Text style={styles.settingText}>{device}</Text>
                    </View>
                  ))}
                </View>
              </AppCard>
            );
          }
          return (
            <View style={styles.settings}>
              <SettingsCard icon={<Bell size={20} color={colors.primaryOrange} />} title={strings.profile.notifications} onPress={() => router.push("/(modals)/notifications")} />
              <SettingsCard icon={<Shield size={20} color={colors.primaryOrange} />} title={strings.profile.privacy} onPress={() => router.push("/(modals)/privacy")} />
              <AppCard style={styles.disclaimerCard}>
                <Shield size={20} color={colors.softTeal} />
                <Text style={styles.disclaimerText}>{strings.profile.demoDisclaimer}</Text>
              </AppCard>
              <SettingsCard icon={<SlidersHorizontal size={20} color={colors.primaryOrange} />} title={strings.profile.preferences} onPress={() => router.push("/(modals)/preferences")} />
              <SettingsCard icon={<Bot size={20} color={colors.primaryOrange} />} title={strings.profile.aboutBloop} onPress={() => router.push("/(modals)/about-bloop")} />
              <SecondaryButton label={strings.profile.privacySettings} onPress={() => router.push("/(modals)/privacy")} />
              <PrimaryButton
                label={strings.profile.resetDemo}
                onPress={() => {
                  store.resetDemo();
                  router.replace("/(onboarding)/logged-out");
                }}
                iconRight={<RefreshCcw size={18} color={colors.whiteText} />}
              />
              <SecondaryButton
                label="Revoke Consent"
                onPress={() => {
                  store.resetDemo();
                  router.replace("/(onboarding)/logged-out");
                }}
                style={styles.revokeButton}
                labelStyle={styles.revokeButtonText}
              />
              <SecondaryButton
                label="Delete My Data"
                onPress={() => {
                  store.resetDemo();
                  router.replace("/(onboarding)/logged-out");
                }}
                style={styles.deleteButton}
                labelStyle={styles.deleteButtonText}
              />
            </View>
          );
        }}
      />
    </SafeScreen>
  );
}

function SettingsCard({ icon, title, onPress }: { icon: React.ReactNode; title: string; onPress?: () => void }) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={styles.settingsCard}
      accessibilityRole="button"
      accessibilityLabel={title}
    >
      <AppCard style={styles.settingsCardInner}>
        {icon}
        <Text style={styles.settingsText}>{title}</Text>
        <ChevronRight size={16} color={colors.mutedText} strokeWidth={2.2} />
      </AppCard>
    </TouchableOpacity>
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
  identitySection: {
    gap: spacing.sm,
  },
  completionBanner: {
    backgroundColor: colors.orangeSoftSurface,
    borderRadius: radius.medium,
    padding: spacing.md,
    gap: spacing.xs,
    borderWidth: 1,
    borderColor: colors.orangeBorder,
  },
  completionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  completionText: {
    color: colors.primaryText,
    fontFamily: "Poppins_500Medium",
    fontSize: 13,
  },
  completionCta: {
    color: colors.primaryOrange,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 12,
  },
  completionTrack: {
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.orangeBorder,
    overflow: "hidden",
  },
  completionFill: {
    height: "100%",
    borderRadius: 3,
    backgroundColor: colors.primaryOrange,
  },
  completionBannerDone: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    backgroundColor: colors.successSurface,
    borderRadius: radius.medium,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  completionTextDone: {
    color: colors.successText,
    fontFamily: "Poppins_500Medium",
    fontSize: 13,
  },
  identity: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    borderRadius: radius.large,
    ...shadows.lg,
  },
  avatarWrap: {
    position: "relative",
  },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: radius.full,
    backgroundColor: colors.orangeSoftSurface,
    alignItems: "center",
    justifyContent: "center",
    ...shadows.xs,
  },
  avatarText: {
    color: colors.primaryText,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 28,
  },
  identityInfo: {
    flex: 1,
    gap: 2,
  },
  name: {
    color: colors.primaryText,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 20,
    lineHeight: 26,
  },
  meta: {
    color: colors.secondaryText,
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    lineHeight: 18,
  },
  metaPhone: {
    color: colors.mutedText,
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    lineHeight: 17,
  },
  editBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.orangeSoftSurface,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.orangeBorder,
  },
  pills: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.xs,
    marginTop: spacing.md,
  },
  cardButton: {
    marginTop: spacing.md,
  },
  settingText: {
    color: colors.secondaryText,
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    lineHeight: 21,
    marginTop: spacing.xs,
  },
  deviceList: {
    flexDirection: "column",
    marginTop: spacing.sm,
    gap: spacing.xs,
  },
  deviceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  settings: {
    flexDirection: "column",
    gap: spacing.md,
  },
  settingsCard: {
    // wrapper TouchableOpacity — no visual style, handled by AppCard inside
  },
  settingsCardInner: {
    padding: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  disclaimerCard: {
    padding: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: colors.tealSoftSurface,
  },
  settingsText: {
    color: colors.primaryText,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 15,
    lineHeight: 21,
  },
  disclaimerText: {
    flex: 1,
    color: colors.secondaryText,
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    lineHeight: 19,
    letterSpacing: 0,
  },
  revokeButton: {
    marginTop: spacing.xs,
    backgroundColor: colors.warmWhite,
    borderColor: colors.dangerText,
    borderWidth: 1,
  },
  revokeButtonText: {
    color: colors.dangerText,
  },
  deleteButton: {
    marginTop: spacing.xs,
    backgroundColor: colors.dangerSurface,
    borderWidth: 0,
  },
  deleteButtonText: {
    color: colors.dangerText,
  },
});
