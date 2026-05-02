import { Download, FileText, Share2, X } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, ScrollView, Share, StyleSheet, Text, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import { colors, spacing } from "@/lib/design-tokens";
import { useAppStore } from "@/store/app-store";

export default function ExportDataModal() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const store = useAppStore();
  const [sharing, setSharing] = useState(false);

  const buildExportText = (): string => {
    const lines: string[] = [];
    lines.push("# MyStree Soul — Health Export");
    lines.push(`Exported: ${new Date().toDateString()}`);
    lines.push("─────────────────────────────────────\n");
    lines.push("## Profile");
    lines.push(`Name: ${store.userName || "—"}`);
    lines.push(`Date of Birth: ${store.dateOfBirth || "—"}`);
    lines.push(`Health Summary: ${store.healthGoalSummary || "—"}\n`);
    lines.push("## Cycle Settings");
    lines.push(`Last Period: ${store.lastPeriodDate || "—"}`);
    lines.push(`Cycle Length: ${store.cycleLength} days`);
    lines.push(`Period Length: ${store.periodLength} days`);
    lines.push(`Goals: ${store.selectedGoals.join(", ") || "—"}\n`);
    lines.push("## Daily Logs");
    if (store.logs.length === 0) {
      lines.push("No logs recorded yet.");
    } else {
      store.logs.slice(0, 30).forEach((log) => {
        lines.push(`Date: ${log.date}`);
        lines.push(`  Mood: ${log.mood} | Pain: ${log.pain}/10 | Fatigue: ${log.fatigue}/10`);
        lines.push(`  Sleep: ${log.sleep} | BP: ${log.bp} | Weight: ${log.weight}`);
        if (log.notes) lines.push(`  Notes: ${log.notes}`);
        lines.push("");
      });
    }
    lines.push("## Health Records");
    if (store.records.length === 0) {
      lines.push("No records saved.");
    } else {
      store.records.forEach((r) => {
        lines.push(`[${r.type}] ${r.title} — ${r.source} (${r.date})`);
        if (r.notes) lines.push(`  Notes: ${r.notes}`);
        lines.push("");
      });
    }
    lines.push("─────────────────────────────────────");
    lines.push("DISCLAIMER: For personal informational use only. Not a certified medical record.");
    return lines.join("\n");
  };

  const handleShare = async () => {
    try {
      setSharing(true);
      await Share.share({ message: buildExportText(), title: "MyStree Soul Health Export" });
    } catch {
      Alert.alert("Could not share", "Please try again.");
    } finally {
      setSharing(false);
    }
  };

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.screen}>
      <View style={styles.header}>
        <View style={styles.headerIconWrap}>
          <Download size={20} color={colors.primaryOrange} strokeWidth={2.2} />
        </View>
        <View style={styles.headerText}>
          <Text style={styles.headerTitle}>Export Health Data</Text>
          <Text style={styles.headerSubtitle}>Secure, on-device summary</Text>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Close"
          onPress={() => (router.canGoBack() ? router.back() : router.replace("/(tabs)/profile"))}
          style={({ pressed }) => [styles.closeButton, pressed && { opacity: 0.7 }]}
        >
          <X size={20} color={colors.mutedText} strokeWidth={2.2} />
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + spacing.xxl }]}
      >
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>What's included?</Text>
          <Text style={styles.infoBody}>
            Profile, cycle settings, your last 30 daily logs, and saved health records — formatted
            for sharing with your doctor or healthcare provider.
          </Text>
        </View>

        <View style={styles.statsRow}>
          <StatBox label="Daily Logs" value={store.logs.length} color={colors.primaryOrange} />
          <StatBox label="Records" value={store.records.length} color={colors.paleCoral} />
          <StatBox label="Goals" value={store.selectedGoals.length} color={colors.softTeal} />
        </View>

        <View style={styles.formatCard}>
          <FileText size={18} color={colors.mutedText} strokeWidth={1.8} />
          <View style={{ flex: 1 }}>
            <Text style={styles.formatTitle}>Plain Text · System Share Sheet</Text>
            <Text style={styles.formatBody}>
              Compatible with Notes, Email, WhatsApp, and more.
            </Text>
          </View>
        </View>

        <Text style={styles.privacyNote}>
          🔒  All data is processed entirely on your device. Nothing is sent to external servers.
        </Text>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Export and share health summary"
          onPress={handleShare}
          disabled={sharing}
          style={({ pressed }) => [styles.cta, (pressed || sharing) && { opacity: 0.85 }]}
        >
          <Share2 size={20} color="#FFFFFF" strokeWidth={2.2} />
          <Text style={styles.ctaText}>{sharing ? "Preparing…" : "Share Health Summary"}</Text>
        </Pressable>

        <Text style={styles.disclaimer}>
          This export is for personal use only and is NOT a certified medical record.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function StatBox({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <View style={styles.statBox}>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#FFFFFF" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
    gap: spacing.sm,
  },
  headerIconWrap: {
    width: 40, height: 40, borderRadius: 12,
    backgroundColor: colors.orangeSoftSurface,
    alignItems: "center", justifyContent: "center",
  },
  headerText: { flex: 1 },
  headerTitle: {
    color: colors.primaryText, fontFamily: "Poppins_600SemiBold", fontSize: 17, lineHeight: 23,
  },
  headerSubtitle: {
    color: colors.mutedText, fontFamily: "Poppins_400Regular", fontSize: 12, lineHeight: 16,
  },
  closeButton: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: colors.warmWhite, alignItems: "center", justifyContent: "center",
    borderWidth: 1, borderColor: colors.divider,
  },
  scroll: { paddingHorizontal: spacing.lg, paddingTop: spacing.lg, gap: spacing.md },
  infoCard: {
    padding: spacing.md, backgroundColor: colors.warmWhite,
    borderRadius: 16, borderWidth: 1, borderColor: colors.divider, gap: spacing.xs,
  },
  infoTitle: {
    color: colors.primaryText, fontFamily: "Poppins_600SemiBold", fontSize: 15, lineHeight: 21,
  },
  infoBody: {
    color: colors.secondaryText, fontFamily: "Poppins_400Regular", fontSize: 13, lineHeight: 20,
  },
  statsRow: { flexDirection: "row", gap: spacing.sm },
  statBox: {
    flex: 1, padding: spacing.md, backgroundColor: colors.warmWhite,
    borderRadius: 14, borderWidth: 1, borderColor: colors.divider,
    alignItems: "center", gap: 2,
  },
  statValue: { fontFamily: "Poppins_600SemiBold", fontSize: 26, lineHeight: 32 },
  statLabel: {
    color: colors.mutedText, fontFamily: "Poppins_400Regular", fontSize: 11, lineHeight: 15,
  },
  formatCard: {
    flexDirection: "row", alignItems: "flex-start", gap: spacing.sm,
    padding: spacing.md, backgroundColor: colors.warmWhite,
    borderRadius: 14, borderWidth: 1, borderColor: colors.divider,
  },
  formatTitle: {
    color: colors.primaryText, fontFamily: "Poppins_600SemiBold", fontSize: 13, lineHeight: 18,
  },
  formatBody: {
    color: colors.mutedText, fontFamily: "Poppins_400Regular", fontSize: 12, lineHeight: 17, marginTop: 2,
  },
  privacyNote: {
    color: colors.secondaryText, fontFamily: "Poppins_400Regular",
    fontSize: 13, lineHeight: 20, textAlign: "center",
  },
  cta: {
    height: 56, borderRadius: 16, backgroundColor: colors.primaryOrange,
    flexDirection: "row", alignItems: "center", justifyContent: "center", gap: spacing.sm,
  },
  ctaText: { color: "#FFFFFF", fontFamily: "Poppins_600SemiBold", fontSize: 16, lineHeight: 22 },
  disclaimer: {
    color: colors.mutedText, fontFamily: "Poppins_400Regular",
    fontSize: 11, lineHeight: 17, textAlign: "center",
  },
});
