import { Eye, Lock, Server, ShieldCheck, Trash2 } from "lucide-react-native";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppCard } from "@/components/ui/AppCard";
import { colors, radius, spacing } from "@/lib/design-tokens";

const sections = [
  {
    icon: Server,
    iconColor: colors.softTeal,
    title: "Where is my data stored?",
    body: "In this demo build, all data lives only on your device in temporary memory. Nothing is sent to a server, cloud, or third party. Closing the app clears all data.",
  },
  {
    icon: Eye,
    iconColor: colors.roseGold,
    title: "Who can see my information?",
    body: "No one. This is a fully local, offline demo. No analytics, no tracking, no external SDKs with access to your health data.",
  },
  {
    icon: Lock,
    iconColor: colors.primaryOrange,
    title: "How will data be protected in production?",
    body: "When MyStree Soul launches, records will be encrypted at rest and in transit. Row-level security will ensure only you can access your data.",
  },
  {
    icon: ShieldCheck,
    iconColor: colors.paleCoral,
    title: "Health data sensitivity",
    body: "We treat your cycle, mood, and symptom data with the highest sensitivity. MyStree Soul will never sell, share, or use your health data for advertising.",
  },
  {
    icon: Trash2,
    iconColor: colors.mutedText,
    title: "Your right to delete",
    body: "You can reset or delete all demo data from your Profile at any time. In the production version, account deletion will permanently erase all stored records within 24 hours.",
  },
];

export default function PrivacyModal() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.root, { paddingBottom: insets.bottom }]}>
      <View style={styles.handle} />
      <View style={styles.header}>
        <Text style={styles.title}>Privacy & Data</Text>
        <TouchableOpacity
          onPress={() => {
            if (router.canGoBack()) {
              router.back();
            } else {
              router.replace("/(tabs)/home");
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
        <AppCard style={styles.heroBadge}>
          <ShieldCheck size={22} color={colors.primaryOrange} strokeWidth={2.2} />
          <Text style={styles.heroText}>MyStree Soul is privacy-first by design — not as an afterthought.</Text>
        </AppCard>

        {sections.map((s) => {
          const Icon = s.icon;
          return (
            <AppCard key={s.title} style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={[styles.iconBox, { backgroundColor: `${s.iconColor}18` }]}>
                  <Icon size={20} color={s.iconColor} strokeWidth={2.2} />
                </View>
                <Text style={styles.cardTitle}>{s.title}</Text>
              </View>
              <View style={styles.divider} />
              <Text style={styles.cardBody}>{s.body}</Text>
            </AppCard>
          );
        })}
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
  heroBadge: { flexDirection: "row", alignItems: "center", gap: spacing.sm, backgroundColor: colors.peachGlow, padding: spacing.md, marginBottom: spacing.xs },
  heroText: { flex: 1, color: colors.primaryOrange, fontFamily: "Poppins_500Medium", fontSize: 13, lineHeight: 20 },
  card: { padding: spacing.md, flexDirection: "column", gap: spacing.sm },
  cardHeader: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
  iconBox: { width: 38, height: 38, borderRadius: radius.small, alignItems: "center", justifyContent: "center", flexShrink: 0 },
  cardTitle: { flex: 1, color: colors.primaryText, fontFamily: "Poppins_600SemiBold", fontSize: 14, lineHeight: 20 },
  divider: { height: 1, backgroundColor: colors.cardBorder },
  cardBody: { color: colors.secondaryText, fontFamily: "Poppins_400Regular", fontSize: 13, lineHeight: 20 },
});
