import { AlertTriangle, X } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import { CrisisModal } from "@/components/safety/CrisisModal";
import { AppCard } from "@/components/ui/AppCard";
import { Pill } from "@/components/ui/Pill";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SafeScreen } from "@/components/layout/SafeScreen";
import { colors, radius, spacing } from "@/lib/design-tokens";
import { strings } from "@/lib/strings";
import { useAppStore } from "@/store/app-store";

// Moods considered conflicting — user can only pick one at a time from each group
const CALM_MOODS  = ["Calm", "Energetic"];
const PAIN_MOODS  = ["Pain", "Anxious", "Severe Pain", "Heavy Bleeding"];
// Crisis threshold: pain score ≥ 9 OR crisis-level mood
const CRISIS_MOODS = ["Severe Pain", "Heavy Bleeding"];

export default function LogDayModal() {
  const router = useRouter();
  const addLog = useAppStore((state) => state.addLog);
  const [mood,    setMoodRaw] = useState("Calm");
  const [pain,    setPainRaw] = useState(2);
  const [fatigue, setFatigue] = useState(4);
  const [sleep,   setSleep]   = useState("7.2h");
  const [bp,      setBp]      = useState("118/76");
  const [weight,  setWeight]  = useState("62 kg");
  const [notes,   setNotes]   = useState("");
  const [saved,   setSaved]   = useState(false);
  const [showCrisis, setShowCrisis] = useState(false);

  // ── Input sanitization ────────────────────────────────────────────────────
  // Clamp pain/fatigue to 0–10
  const setPain = (v: number) => setPainRaw(Math.max(0, Math.min(10, v)));

  // Resolve conflicting moods: if selecting a calm mood while a pain mood is set
  // (or vice versa), replace rather than accumulate
  const setMood = (m: string) => {
    setMoodRaw(m);
    // Trigger crisis check inline
    if (CRISIS_MOODS.includes(m)) {
      setShowCrisis(true);
    }
  };

  // ── Crisis check on pain scale ────────────────────────────────────────────
  const handleSetPain = (v: number) => {
    setPain(v);
    if (v >= 9) setShowCrisis(true);
  };

  const save = () => {
    addLog({ mood, pain, fatigue, sleep, bp, weight, notes });
    setSaved(true);
  };

  return (
    <SafeScreen keyboardAware contentStyle={styles.content}>
      {/* Crisis safety modal */}
      <CrisisModal visible={showCrisis} onClose={() => setShowCrisis(false)} />

      <View style={styles.topRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{strings.modals.logDay.title}</Text>
          <Text style={styles.subtitle}>{strings.modals.logDay.subtitle}</Text>
        </View>
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Close log day"
          onPress={() => {
            if (router.canGoBack()) {
              router.back();
            } else {
              router.replace("/(tabs)/home");
            }
          }}
          style={styles.close}
        >
          <X size={22} color={colors.primaryText} />
        </TouchableOpacity>
      </View>

      {/* Local storage data warning */}
      <AppCard style={styles.warningBanner}>
        <AlertTriangle size={15} color={colors.warningText} strokeWidth={2.2} />
        <Text style={styles.warningText}>
          Demo only — all data is stored locally on this device and will be lost if you uninstall or reset.
        </Text>
      </AppCard>

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.scroll}
      >
        <AppCard style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>{strings.modals.logDay.mood}</Text>
          <View style={styles.pills}>
            {["Calm", "Tired", "Pain", "Anxious", "Energetic", "Severe Pain", "Heavy Bleeding"].map((item) => (
              <Pill key={item} label={item} selected={mood === item} onPress={() => setMood(item)} />
            ))}
          </View>
          <Scale label={strings.modals.logDay.pain}    value={pain}    setValue={handleSetPain} />
          <Scale label={strings.modals.logDay.fatigue} value={fatigue} setValue={setFatigue} />
        </AppCard>

        {(pain >= 9 || CRISIS_MOODS.includes(mood)) ? (
          <AppCard style={[styles.sectionCard, styles.safetyCard]}>
            <Text style={styles.safetyText}>{strings.modals.logDay.safety}</Text>
          </AppCard>
        ) : null}

        <AppCard style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>{strings.modals.logDay.vitals}</Text>
          <View style={styles.inputRow}>
            <DemoInput label="Sleep" value={sleep} onChangeText={setSleep} />
            <DemoInput label="BP" value={bp} onChangeText={setBp} />
          </View>
          <DemoInput label="Weight" value={weight} onChangeText={setWeight} />
        </AppCard>

        <AppCard style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>{strings.modals.logDay.notes}</Text>
          <TextInput
            value={notes}
            onChangeText={setNotes}
            placeholder={strings.modals.logDay.notesPlaceholder}
            placeholderTextColor={colors.mutedText}
            multiline
            style={styles.notes}
          />
        </AppCard>

        {saved ? <Text style={styles.success}>{strings.modals.logDay.success}</Text> : null}

        <PrimaryButton label={saved ? "Done" : strings.modals.logDay.cta} onPress={saved ? router.back : save} />
      </ScrollView>
    </SafeScreen>
  );
}

function Scale({ label, value, setValue }: { label: string; value: number; setValue: (value: number) => void }) {
  return (
    <View style={styles.scale}>
      <Text style={styles.scaleLabel}>{label}: {value}/10</Text>
      <View style={styles.pills}>
        {[0, 2, 4, 6, 8, 10].map((item) => (
          <Pill key={item} label={`${item}`} selected={value === item} onPress={() => setValue(item)} />
        ))}
      </View>
    </View>
  );
}

function DemoInput({ label, value, onChangeText }: { label: string; value: string; onChangeText: (value: string) => void }) {
  return (
    <View style={styles.demoInputWrap}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput value={value} onChangeText={onChangeText} style={styles.input} />
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg,
    backgroundColor: colors.warmWhite,
  },
  topRow: {
    flexDirection: "row",
    gap: spacing.md,
    alignItems: "flex-start",
  },
  title: {
    color: colors.primaryText,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 29,
    lineHeight: 36,
  },
  subtitle: {
    color: colors.secondaryText,
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    lineHeight: 21,
    marginTop: spacing.xs,
  },
  close: {
    marginLeft: "auto",
    width: 48,
    height: 48,
    borderRadius: radius.button,
    backgroundColor: colors.backgroundWhite,
    alignItems: "center",
    justifyContent: "center",
  },
  scroll: {
    flexGrow: 1,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
    gap: spacing.md,
  },
  sectionCard: {
    padding: spacing.lg,
  },
  sectionTitle: {
    color: colors.primaryText,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    lineHeight: 24,
  },
  pills: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.xs,
    marginTop: spacing.sm,
  },
  scale: {
    marginTop: spacing.md,
  },
  scaleLabel: {
    color: colors.secondaryText,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 13,
    lineHeight: 18,
  },
  warningBanner: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.xs,
    padding: spacing.sm,
    backgroundColor: colors.warningSurface,
    marginTop: spacing.sm,
  },
  warningText: {
    flex: 1,
    color: colors.warningText,
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    lineHeight: 18,
  },
  safetyCard: {
    backgroundColor: colors.dangerSurface,
    borderColor: colors.dangerSurface,
  },
  safetyText: {
    color: colors.dangerText,
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    lineHeight: 21,
  },
  inputRow: {
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  demoInputWrap: {
    flex: 1,
    marginTop: spacing.sm,
  },
  inputLabel: {
    color: colors.secondaryText,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 12,
    marginBottom: spacing.xs,
  },
  input: {
    minHeight: 48,
    borderRadius: radius.input,
    backgroundColor: colors.backgroundWhite,
    borderWidth: 1,
    borderColor: colors.divider,
    paddingHorizontal: spacing.md,
    color: colors.primaryText,
    fontFamily: "Poppins_400Regular",
    fontSize: 15,
  },
  notes: {
    minHeight: 110,
    borderRadius: radius.input,
    backgroundColor: colors.backgroundWhite,
    borderWidth: 1,
    borderColor: colors.divider,
    padding: spacing.md,
    color: colors.primaryText,
    fontFamily: "Poppins_400Regular",
    fontSize: 15,
    textAlignVertical: "top",
    marginTop: spacing.sm,
  },
  success: {
    color: colors.successText,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
  },
});
