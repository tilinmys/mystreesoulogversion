import { Globe, Moon, Palette, Type } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppCard } from "@/components/ui/AppCard";
import { colors, radius, spacing } from "@/lib/design-tokens";

const themes   = ["Pure White", "Soft Blush", "Calm Sage"] as const;
const textSizes = ["Small", "Default", "Large"] as const;
const languages = ["English", "Hindi", "Tamil", "Malayalam"] as const;

export default function PreferencesModal() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [theme,    setTheme]    = useState<string>("Pure White");
  const [textSize, setTextSize] = useState<string>("Default");
  const [lang,     setLang]     = useState<string>("English");
  const [darkMode, setDarkMode] = useState(false);

  return (
    <View style={[styles.root, { paddingBottom: insets.bottom }]}>
      <View style={styles.handle} />
      <View style={styles.header}>
        <Text style={styles.title}>Preferences</Text>
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

        {/* Theme */}
        <AppCard style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={[styles.iconBox, { backgroundColor: `${colors.paleCoral}20` }]}>
              <Palette size={20} color={colors.paleCoral} strokeWidth={2.2} />
            </View>
            <Text style={styles.sectionTitle}>App theme</Text>
          </View>
          <View style={styles.chipRow}>
            {themes.map((t) => (
              <TouchableOpacity
                key={t} activeOpacity={0.7}
                onPress={() => setTheme(t)}
                style={[styles.chip, theme === t && styles.chipActive]}
                accessibilityRole="button" accessibilityLabel={t}
              >
                <Text style={[styles.chipText, theme === t && styles.chipTextActive]}>{t}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </AppCard>

        {/* Text size */}
        <AppCard style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={[styles.iconBox, { backgroundColor: `${colors.softTeal}20` }]}>
              <Type size={20} color={colors.softTeal} strokeWidth={2.2} />
            </View>
            <Text style={styles.sectionTitle}>Text size</Text>
          </View>
          <View style={styles.chipRow}>
            {textSizes.map((s) => (
              <TouchableOpacity
                key={s} activeOpacity={0.7}
                onPress={() => setTextSize(s)}
                style={[styles.chip, textSize === s && styles.chipActive]}
                accessibilityRole="button" accessibilityLabel={s}
              >
                <Text style={[styles.chipText, textSize === s && styles.chipTextActive]}>{s}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </AppCard>

        {/* Language */}
        <AppCard style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={[styles.iconBox, { backgroundColor: `${colors.roseGold}20` }]}>
              <Globe size={20} color={colors.roseGold} strokeWidth={2.2} />
            </View>
            <Text style={styles.sectionTitle}>Language</Text>
          </View>
          <View style={styles.chipRow}>
            {languages.map((l) => (
              <TouchableOpacity
                key={l} activeOpacity={0.7}
                onPress={() => setLang(l)}
                style={[styles.chip, lang === l && styles.chipActive]}
                accessibilityRole="button" accessibilityLabel={l}
              >
                <Text style={[styles.chipText, lang === l && styles.chipTextActive]}>{l}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </AppCard>

        {/* Dark mode */}
        <AppCard style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={[styles.iconBox, { backgroundColor: `${colors.primaryOrange}18` }]}>
              <Moon size={20} color={colors.primaryOrange} strokeWidth={2.2} />
            </View>
            <Text style={styles.sectionTitle}>Dark mode</Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setDarkMode((d) => !d)}
            style={[styles.chip, darkMode && styles.chipActive]}
            accessibilityRole="button" accessibilityLabel="Toggle dark mode"
          >
            <Text style={[styles.chipText, darkMode && styles.chipTextActive]}>
              {darkMode ? "On" : "Off — coming soon"}
            </Text>
          </TouchableOpacity>
        </AppCard>

        <AppCard style={styles.noteCard}>
          <Text style={styles.noteText}>
            ⚙️  Preferences are saved for this session only. Full persistence will be available in the production build.
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
  section: { padding: spacing.md, flexDirection: "column", gap: spacing.md },
  sectionHeader: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
  iconBox: { width: 38, height: 38, borderRadius: radius.small, alignItems: "center", justifyContent: "center" },
  sectionTitle: { color: colors.primaryText, fontFamily: "Poppins_600SemiBold", fontSize: 15, lineHeight: 21 },
  chipRow: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm },
  chip: { paddingHorizontal: spacing.md, paddingVertical: spacing.xs, borderRadius: radius.full, borderWidth: 1.5, borderColor: colors.cardBorder, backgroundColor: colors.backgroundWhite },
  chipActive: { borderColor: colors.primaryOrange, backgroundColor: colors.peachGlow },
  chipText: { color: colors.secondaryText, fontFamily: "Poppins_500Medium", fontSize: 13, lineHeight: 19 },
  chipTextActive: { color: colors.primaryOrange },
  noteCard: { backgroundColor: colors.peachGlow, padding: spacing.md },
  noteText: { color: colors.primaryOrange, fontFamily: "Poppins_400Regular", fontSize: 13, lineHeight: 20 },
});
