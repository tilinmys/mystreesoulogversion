/**
 * crisis-support.tsx
 *
 * Dedicated Crisis & Medical Support Directory modal.
 *
 * Launched when:
 *  - User's pain score ≥ 9 or crisis mood detected in log-day
 *  - User navigates here directly from Profile > Support & Info
 *
 * Contains:
 *  - National emergency numbers
 *  - Women's health specific helplines
 *  - Mental health support hotlines
 *  - Clear medical disclaimer
 */
import {
  AlertTriangle,
  Heart,
  Phone,
  X,
} from "lucide-react-native";
import { useRouter } from "expo-router";
import {
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import { colors, radius, spacing } from "@/lib/design-tokens";

type HotlineEntry = {
  label: string;
  description: string;
  number: string;
  category: "emergency" | "mental" | "womens";
};

const HOTLINES: HotlineEntry[] = [
  {
    label: "Emergency Services",
    description: "Police, Ambulance, Fire",
    number: "112",
    category: "emergency",
  },
  {
    label: "Women's Helpline",
    description: "National Commission for Women",
    number: "1091",
    category: "womens",
  },
  {
    label: "iCall — Mental Health",
    description: "TISS counselling helpline",
    number: "9152987821",
    category: "mental",
  },
  {
    label: "NIMHANS Helpline",
    description: "National mental health support",
    number: "080-46110007",
    category: "mental",
  },
  {
    label: "Vandrevala Foundation",
    description: "24/7 mental health support",
    number: "1860-2662-345",
    category: "mental",
  },
  {
    label: "PCOD / Gynae Helpline",
    description: "Apollo Women's Health",
    number: "1860-500-1066",
    category: "womens",
  },
];

const CATEGORY_COLORS: Record<HotlineEntry["category"], string> = {
  emergency: colors.dangerText,
  mental: "#7C5CBF",
  womens: colors.paleCoral,
};

const CATEGORY_SURFACE: Record<HotlineEntry["category"], string> = {
  emergency: colors.dangerSurface,
  mental: "#F0EAFB",
  womens: "#FFF0EC",
};

export default function CrisisSupportModal() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.alertIconWrap}>
          <AlertTriangle size={22} color={colors.dangerText} strokeWidth={2.2} />
        </View>
        <View style={styles.headerText}>
          <Text style={styles.headerTitle}>Support Directory</Text>
          <Text style={styles.headerSubtitle}>You are not alone. Help is available.</Text>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Close"
          onPress={() => (router.canGoBack() ? router.back() : router.replace("/(tabs)/home"))}
          style={({ pressed }) => [styles.closeButton, pressed && styles.pressedOp]}
        >
          <X size={20} color={colors.mutedText} strokeWidth={2.2} />
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + spacing.xxl }]}
      >
        {/* Disclaimer Banner */}
        <View style={styles.disclaimer}>
          <Heart size={16} color={colors.dangerText} strokeWidth={2} />
          <Text style={styles.disclaimerText}>
            MyStree Soul is{" "}
            <Text style={styles.disclaimerBold}>not a medical diagnostic tool</Text>. If you are
            experiencing a medical emergency, please call 112 immediately.
          </Text>
        </View>

        {/* Emergency */}
        <Text style={styles.sectionLabel}>🚨  EMERGENCY</Text>
        {HOTLINES.filter((h) => h.category === "emergency").map((h) => (
          <HotlineRow key={h.number} entry={h} />
        ))}

        {/* Women's Health */}
        <Text style={[styles.sectionLabel, { marginTop: spacing.lg }]}>💜  WOMEN'S HEALTH</Text>
        {HOTLINES.filter((h) => h.category === "womens").map((h) => (
          <HotlineRow key={h.number} entry={h} />
        ))}

        {/* Mental Health */}
        <Text style={[styles.sectionLabel, { marginTop: spacing.lg }]}>🧠  MENTAL HEALTH</Text>
        {HOTLINES.filter((h) => h.category === "mental").map((h) => (
          <HotlineRow key={h.number} entry={h} />
        ))}

        {/* Footer note */}
        <Text style={styles.footerNote}>
          All helplines are free and confidential. Hours may vary by service.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function HotlineRow({ entry }: { entry: HotlineEntry }) {
  const tint = CATEGORY_COLORS[entry.category];
  const surface = CATEGORY_SURFACE[entry.category];

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Call ${entry.label}: ${entry.number}`}
      onPress={() => Linking.openURL(`tel:${entry.number}`)}
      style={({ pressed }) => [styles.hotlineCard, pressed && styles.pressedOp]}
    >
      <View style={[styles.hotlineIconWrap, { backgroundColor: surface }]}>
        <Phone size={18} color={tint} strokeWidth={2} />
      </View>
      <View style={styles.hotlineTextBlock}>
        <Text style={styles.hotlineLabel}>{entry.label}</Text>
        <Text style={styles.hotlineDesc}>{entry.description}</Text>
      </View>
      <Text style={[styles.hotlineNumber, { color: tint }]}>{entry.number}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
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
  alertIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.dangerSurface,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    color: colors.primaryText,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 17,
    lineHeight: 23,
  },
  headerSubtitle: {
    color: colors.mutedText,
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    lineHeight: 16,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.warmWhite,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.divider,
  },
  pressedOp: {
    opacity: 0.75,
  },
  scroll: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    gap: spacing.sm,
  },
  disclaimer: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.sm,
    padding: spacing.md,
    backgroundColor: colors.dangerSurface,
    borderRadius: 14,
    marginBottom: spacing.xs,
  },
  disclaimerText: {
    flex: 1,
    color: colors.dangerText,
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    lineHeight: 20,
  },
  disclaimerBold: {
    fontFamily: "Poppins_600SemiBold",
  },
  sectionLabel: {
    color: colors.mutedText,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 11,
    letterSpacing: 1.2,
    marginBottom: spacing.xs,
  },
  hotlineCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    padding: spacing.md,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.divider,
    marginBottom: spacing.xs,
  },
  hotlineIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  hotlineTextBlock: {
    flex: 1,
  },
  hotlineLabel: {
    color: colors.primaryText,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    lineHeight: 20,
  },
  hotlineDesc: {
    color: colors.mutedText,
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    lineHeight: 16,
  },
  hotlineNumber: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 13,
    lineHeight: 18,
  },
  footerNote: {
    color: colors.mutedText,
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    lineHeight: 18,
    textAlign: "center",
    marginTop: spacing.md,
  },
});
