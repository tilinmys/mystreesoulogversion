import { Bot, Brain, FileText, Heart, ShieldCheck } from "lucide-react-native";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppCard } from "@/components/ui/AppCard";
import { colors, radius, spacing } from "@/lib/design-tokens";

const cards = [
  {
    icon: Bot,
    iconColor: colors.primaryOrange,
    title: "What is Bloop?",
    body: "Bloop is your AI-powered health companion. She listens without judgment and helps you make sense of your cycle, symptoms, and records through calm, supportive conversation.",
  },
  {
    icon: Brain,
    iconColor: colors.softTeal,
    title: "How does Bloop think?",
    body: "Bloop uses pattern recognition across your logged moods, cycle phases, and symptoms to offer context-aware responses. She never guesses — she always grounds responses in what you've shared.",
  },
  {
    icon: Heart,
    iconColor: colors.paleCoral,
    title: "What can I ask Bloop?",
    body: "Ask Bloop about your cycle phase, why you feel a certain way, what to discuss at your next doctor's visit, or simply how to understand a symptom. She is here to help you feel informed.",
  },
  {
    icon: FileText,
    iconColor: colors.roseGold,
    title: "Doctor prep notes",
    body: "Bloop can generate a structured summary of your recent health logs to bring to your next appointment. Doctors appreciate patients who arrive prepared.",
  },
  {
    icon: ShieldCheck,
    iconColor: colors.primaryOrange,
    title: "Is Bloop a medical service?",
    body: "No. Bloop is not a doctor and does not provide medical diagnosis or treatment. She is a supportive companion designed to help you understand your own patterns and communicate better with your care team.",
  },
];

export default function AboutBloopModal() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.root, { paddingBottom: insets.bottom }]}>
      <View style={styles.handle} />
      <View style={styles.header}>
        <Text style={styles.title}>Meet Bloop ✦</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn} accessibilityRole="button" accessibilityLabel="Close">
          <Text style={styles.closeText}>Done</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Hero */}
        <AppCard style={styles.hero}>
          <View style={[styles.iconBox, { backgroundColor: `${colors.primaryOrange}18` }]}>
            <Bot size={32} color={colors.primaryOrange} strokeWidth={2} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.heroTitle}>Your AI health companion</Text>
            <Text style={styles.heroSub}>Calm · Supportive · Always available</Text>
          </View>
        </AppCard>

        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <AppCard key={c.title} style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={[styles.iconBox, { backgroundColor: `${c.iconColor}18` }]}>
                  <Icon size={20} color={c.iconColor} strokeWidth={2.2} />
                </View>
                <Text style={styles.cardTitle}>{c.title}</Text>
              </View>
              <View style={styles.divider} />
              <Text style={styles.cardBody}>{c.body}</Text>
            </AppCard>
          );
        })}

        <AppCard style={styles.noteCard}>
          <Text style={styles.noteText}>
            💬  In this demo, Bloop's responses are illustrative examples. Production Bloop will use a secure, privacy-preserving AI model trained on anonymised women's health data.
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
  hero: { flexDirection: "row", alignItems: "center", gap: spacing.md, padding: spacing.lg, backgroundColor: colors.peachGlow },
  heroTitle: { color: colors.primaryText, fontFamily: "Poppins_600SemiBold", fontSize: 15, lineHeight: 21 },
  heroSub: { color: colors.primaryOrange, fontFamily: "Poppins_400Regular", fontSize: 13, lineHeight: 19, marginTop: 2 },
  iconBox: { width: 48, height: 48, borderRadius: radius.small, alignItems: "center", justifyContent: "center", flexShrink: 0 },
  card: { padding: spacing.md, flexDirection: "column", gap: spacing.sm },
  cardHeader: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
  cardTitle: { flex: 1, color: colors.primaryText, fontFamily: "Poppins_600SemiBold", fontSize: 14, lineHeight: 20 },
  divider: { height: 1, backgroundColor: colors.cardBorder },
  cardBody: { color: colors.secondaryText, fontFamily: "Poppins_400Regular", fontSize: 13, lineHeight: 20 },
  noteCard: { backgroundColor: colors.peachGlow, padding: spacing.md },
  noteText: { color: colors.primaryOrange, fontFamily: "Poppins_400Regular", fontSize: 13, lineHeight: 20 },
});
