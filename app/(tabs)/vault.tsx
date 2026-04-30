import { LockKeyhole, ShieldCheck } from "lucide-react-native";
import { useRouter } from "expo-router";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { RecordCard } from "@/components/health/RecordCard";
import { SafeScreen } from "@/components/layout/SafeScreen";
import { AppCard } from "@/components/ui/AppCard";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { colors, radius, shadows, spacing } from "@/lib/design-tokens";
import { strings } from "@/lib/strings";
import { useAppStore } from "@/store/app-store";

const tabScrollClearance = 94;

export default function VaultScreen() {
  const router = useRouter();
  const vaultUnlocked = useAppStore((state) => state.vaultUnlocked);
  const unlockVault = useAppStore((state) => state.unlockVault);
  const records = useAppStore((state) => state.records);
  const insets = useSafeAreaInsets();

  if (!vaultUnlocked) {
    return (
    <SafeScreen bottomInset={false} contentStyle={styles.lockedContent}>
        <View style={styles.lockOrb}>
          <LockKeyhole size={54} color={colors.softTeal} strokeWidth={2} />
        </View>
        <Text style={styles.lockTitle}>{strings.vault.lockedTitle}</Text>
        <Text style={styles.lockSubtitle}>{strings.vault.lockedSubtitle}</Text>
        <PrimaryButton label={strings.vault.unlock} onPress={unlockVault} style={styles.unlockButton} />
      </SafeScreen>
    );
  }

  return (
    <SafeScreen bottomInset={false} contentStyle={styles.content}>
      <FlatList
        data={records}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.list,
          { paddingBottom: Math.max(insets.bottom, spacing.md) + tabScrollClearance },
        ]}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        ListHeaderComponent={
          <View style={styles.header}>
            <View style={styles.badge}>
              <ShieldCheck size={16} color={colors.softTeal} />
              <Text style={styles.badgeText}>{strings.vault.trustBadge}</Text>
            </View>
            <SectionHeader title={strings.vault.title} subtitle={strings.vault.subtitle} />
            <PrimaryButton
              label={strings.vault.upload}
              onPress={() => router.push("/(modals)/upload-record")}
            />
            <AppCard style={styles.contextCard}>
              <Text style={styles.contextText}>{strings.vault.bloopContext}</Text>
            </AppCard>
          </View>
        }
        renderItem={({ item }) => <RecordCard record={item} />}
      />
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  lockedContent: {
    flexDirection: "column",
    paddingHorizontal: spacing.xl,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: spacing.giant,
    backgroundColor: colors.warmWhite,
  },
  lockOrb: {
    flexDirection: "column",
    width: 132,
    height: 132,
    borderRadius: radius.full,
    backgroundColor: colors.tealSoftSurface,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.lg,
    ...shadows.lg,
  },
  lockTitle: {
    color: colors.primaryText,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 32,
    lineHeight: 40,
    textAlign: "center",
  },
  lockSubtitle: {
    color: colors.secondaryText,
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    marginTop: spacing.sm,
  },
  unlockButton: {
    width: "100%",
    marginTop: spacing.xl,
  },
  content: {
    flexDirection: "column",
    paddingHorizontal: spacing.lg,
  },
  list: {
    flexDirection: "column",
    paddingTop: spacing.xl,
    gap: spacing.lg,
  },
  header: {
    flexDirection: "column",
    gap: spacing.lg,
  },
  badge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    gap: spacing.xs,
    alignItems: "center",
    backgroundColor: colors.tealSoftSurface,
    borderRadius: radius.full,
    paddingHorizontal: spacing.sm,
    minHeight: 36,
    ...shadows.xs,
  },
  badgeText: {
    color: colors.primaryText,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 12,
  },
  contextCard: {
    flexDirection: "column",
    padding: spacing.md,
  },
  contextText: {
    color: colors.secondaryText,
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    lineHeight: 21,
  },
});
