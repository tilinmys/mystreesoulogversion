import { Bell, BellOff, Moon, Smartphone } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppCard } from "@/components/ui/AppCard";
import { colors, radius, spacing } from "@/lib/design-tokens";

type NotifRow = {
  id: string;
  icon: typeof Bell;
  iconColor: string;
  title: string;
  subtitle: string;
};

const rows: NotifRow[] = [
  { id: "cycle",   icon: Bell,       iconColor: colors.paleCoral,    title: "Cycle reminders",     subtitle: "Gentle nudges before your next period" },
  { id: "checkin", icon: Smartphone, iconColor: colors.softTeal,     title: "Daily check-in",      subtitle: "Remind me to log my mood each morning" },
  { id: "bloop",   icon: Bell,       iconColor: colors.primaryOrange, title: "Bloop responses",     subtitle: "Get notified when Bloop replies" },
  { id: "quiet",   icon: Moon,       iconColor: colors.roseGold,     title: "Quiet mode (9 pm–7 am)", subtitle: "No notifications during sleep hours" },
  { id: "updates", icon: BellOff,    iconColor: colors.mutedText,    title: "App updates",          subtitle: "Feature announcements and release notes" },
];

export default function NotificationsModal() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [enabled, setEnabled] = useState<Record<string, boolean>>({
    cycle: true, checkin: true, bloop: false, quiet: true, updates: false,
  });

  return (
    <View style={[styles.root, { paddingBottom: insets.bottom }]}>
      {/* Handle */}
      <View style={styles.handle} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Notifications</Text>
        <TouchableOpacity
          onPress={() => {
            if (router.canGoBack()) {
              router.back();
            } else {
              router.replace("/(tabs)/profile");
            }
          }}
          style={styles.closeBtn}
          accessibilityRole="button"
          accessibilityLabel="Close"
        >
          <Text style={styles.closeText}>Done</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <Text style={styles.caption}>
          Notifications are gentle and never alarming. You control everything here.
        </Text>

        {rows.map((row) => {
          const Icon = row.icon;
          return (
            <AppCard key={row.id} style={styles.row}>
              <View style={[styles.iconBox, { backgroundColor: `${row.iconColor}18` }]}>
                <Icon size={20} color={row.iconColor} strokeWidth={2.2} />
              </View>
              <View style={styles.rowCopy}>
                <Text style={styles.rowTitle}>{row.title}</Text>
                <Text style={styles.rowSub}>{row.subtitle}</Text>
              </View>
              <Switch
                value={enabled[row.id]}
                onValueChange={(val) => setEnabled((p) => ({ ...p, [row.id]: val }))}
                trackColor={{ false: colors.cardBorder, true: colors.paleCoral }}
                thumbColor={enabled[row.id] ? colors.primaryOrange : colors.mutedText}
                accessibilityLabel={row.title}
              />
            </AppCard>
          );
        })}

        <AppCard style={styles.noteCard}>
          <Text style={styles.noteText}>
            🔔  Notifications are demo-only and will not send on this build. Real push notifications require a production build with APNs/FCM setup.
          </Text>
        </AppCard>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.warmWhite },
  handle: { width: 40, height: 4, borderRadius: 2, backgroundColor: colors.cardBorder, alignSelf: "center", marginTop: spacing.sm, marginBottom: spacing.xs },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: spacing.xl, paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.cardBorder },
  title: { color: colors.primaryText, fontFamily: "Poppins_600SemiBold", fontSize: 18, lineHeight: 24 },
  closeBtn: { minHeight: 44, justifyContent: "center", paddingHorizontal: spacing.xs },
  closeText: { color: colors.primaryOrange, fontFamily: "Poppins_600SemiBold", fontSize: 15 },
  scroll: { padding: spacing.xl, gap: spacing.sm, flexDirection: "column" },
  caption: { color: colors.secondaryText, fontFamily: "Poppins_400Regular", fontSize: 14, lineHeight: 21, marginBottom: spacing.xs },
  row: { flexDirection: "row", alignItems: "center", gap: spacing.md, padding: spacing.md },
  iconBox: { width: 40, height: 40, borderRadius: radius.small, alignItems: "center", justifyContent: "center", flexShrink: 0 },
  rowCopy: { flex: 1 },
  rowTitle: { color: colors.primaryText, fontFamily: "Poppins_600SemiBold", fontSize: 14, lineHeight: 20 },
  rowSub: { color: colors.secondaryText, fontFamily: "Poppins_400Regular", fontSize: 12, lineHeight: 18, marginTop: 2 },
  noteCard: { backgroundColor: colors.peachGlow, padding: spacing.md, marginTop: spacing.xs },
  noteText: { color: colors.primaryOrange, fontFamily: "Poppins_400Regular", fontSize: 13, lineHeight: 20 },
});
