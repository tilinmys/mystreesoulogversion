import { Camera, Check, User, X } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { sanitizeInput, sanitizeName, sanitizePhone, sanitizeDob } from "@/lib/sanitize";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Image } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors, radius, shadows, spacing } from "@/lib/design-tokens";
import { useAppStore } from "@/store/app-store";

export default function EditProfileScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const store = useAppStore();
  const updateProfile = useAppStore((s) => s.updateProfile);

  const [name, setName] = useState(store.userName);
  const [dob, setDob] = useState(store.dateOfBirth);
  const [phone, setPhone] = useState(store.phone);
  const [summary, setSummary] = useState(store.healthGoalSummary);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    updateProfile({
      userName: sanitizeName(name),
      dateOfBirth: sanitizeDob(dob),
      phone: sanitizePhone(phone),
      healthGoalSummary: sanitizeInput(summary, 800),
    });
    setIsSaved(true);
    setTimeout(() => {
      if (router.canGoBack()) {
        router.back();
      } else {
        router.replace("/(tabs)/profile");
      }
    }, 600);
  };

  const canSave = name.trim().length > 0;

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* Handle */}
      <View style={styles.handle} />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top > 0 ? insets.top : spacing.md }]}>
        <TouchableOpacity
          style={styles.headerBtn}
          onPress={() => {
            if (router.canGoBack()) {
              router.back();
            } else {
              router.replace("/(tabs)/profile");
            }
          }}
          hitSlop={12}
        >
          <X size={22} color={colors.primaryText} strokeWidth={2} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <TouchableOpacity
          style={[styles.headerBtn, styles.saveBtn, !canSave && styles.saveBtnDisabled]}
          onPress={handleSave}
          disabled={!canSave}
          hitSlop={12}
        >
          {isSaved ? (
            <Check size={20} color={colors.successText} strokeWidth={2.5} />
          ) : (
            <Text style={[styles.saveBtnText, !canSave && styles.saveBtnTextDisabled]}>Save</Text>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: Math.max(insets.bottom, spacing.md) + spacing.xl },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Avatar */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarRing}>
            {store.avatarUri ? (
              <Image source={{ uri: store.avatarUri }} contentFit="cover" transition={300} style={styles.avatarImage} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <User size={36} color={colors.primaryOrange} strokeWidth={1.8} />
              </View>
            )}
            <Pressable style={styles.cameraOverlay}>
              <Camera size={16} color={colors.whiteText} strokeWidth={2} />
            </Pressable>
          </View>
          <Text style={styles.avatarHint}>Tap to change photo</Text>
        </View>

        {/* Completion Banner */}
        <CompletionBar name={name} dob={dob} phone={phone} summary={summary} />

        {/* Fields */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>PERSONAL</Text>
          <View style={styles.card}>
            <FieldRow
              label="Full Name"
              value={name}
              onChange={setName}
              placeholder="Your name"
              autoCapitalize="words"
              maxLength={60}
            />
            <Divider />
            <FieldRow
              label="Date of Birth"
              value={dob}
              onChange={setDob}
              placeholder="DD / MM / YYYY"
              keyboardType="numbers-and-punctuation"
              maxLength={15}
            />
            <Divider />
            <FieldRow
              label="Phone"
              value={phone}
              onChange={setPhone}
              placeholder="+91 00000 00000"
              keyboardType="phone-pad"
              maxLength={20}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>HEALTH CONTEXT</Text>
          <View style={styles.card}>
            <View style={styles.fieldRow}>
              <Text style={styles.fieldLabel}>Health Summary</Text>
              <TextInput
                style={[styles.fieldInput, styles.multilineInput]}
                value={summary}
                onChangeText={setSummary}
                placeholder="e.g. PCOS, irregular cycles, tracking for fertility"
                placeholderTextColor={colors.mutedText}
                multiline
                numberOfLines={3}
                maxLength={800}
                textAlignVertical="top"
              />
            </View>
          </View>
          <Text style={styles.fieldHint}>
            This helps personalise Bloop's guidance. Never shared without your consent.
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

/* ── Helpers ────────────────────────────────────────────── */

function CompletionBar({
  name, dob, phone, summary,
}: { name: string; dob: string; phone: string; summary: string }) {
  const fields = [name.trim(), dob.trim(), phone.trim(), summary.trim()];
  const filled = fields.filter(Boolean).length;
  const pct = (filled / fields.length) * 100;
  const isComplete = pct === 100;

  return (
    <View style={bannerStyles.wrap}>
      <View style={bannerStyles.row}>
        <Text style={bannerStyles.label}>
          {isComplete ? "✨ Profile complete!" : `Profile ${Math.round(pct)}% complete`}
        </Text>
        <Text style={bannerStyles.count}>{filled}/{fields.length} fields</Text>
      </View>
      <View style={bannerStyles.track}>
        <View style={[bannerStyles.fill, { width: `${pct}%` as any, backgroundColor: isComplete ? colors.successText : colors.primaryOrange }]} />
      </View>
    </View>
  );
}

function FieldRow({
  label, value, onChange, placeholder, autoCapitalize, keyboardType, maxLength,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  keyboardType?: any;
  maxLength?: number;
}) {
  return (
    <View style={styles.fieldRow}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        style={styles.fieldInput}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={colors.mutedText}
        autoCapitalize={autoCapitalize ?? "none"}
        keyboardType={keyboardType ?? "default"}
        maxLength={maxLength}
      />
    </View>
  );
}

function Divider() {
  return <View style={styles.divider} />;
}

/* ── Styles ─────────────────────────────────────────────── */

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.warmWhite,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    marginTop: "auto",
    maxHeight: "95%",
    ...shadows.lg,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.softDisabled,
    alignSelf: "center",
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  headerBtn: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.full,
    backgroundColor: colors.backgroundWhite,
    ...shadows.xs,
  },
  headerTitle: {
    color: colors.primaryText,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 17,
    lineHeight: 24,
  },
  saveBtn: {
    backgroundColor: colors.primaryOrange,
    paddingHorizontal: spacing.md,
    width: "auto",
  },
  saveBtnDisabled: {
    backgroundColor: colors.softDisabled,
  },
  saveBtnText: {
    color: colors.whiteText,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
  },
  saveBtnTextDisabled: {
    color: colors.disabledText,
  },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    gap: spacing.lg,
  },
  avatarSection: {
    alignItems: "center",
    gap: spacing.xs,
  },
  avatarRing: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 3,
    borderColor: colors.orangeBorder,
    ...shadows.lg,
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    borderRadius: 44,
  },
  avatarPlaceholder: {
    flex: 1,
    backgroundColor: colors.orangeSoftSurface,
    borderRadius: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  cameraOverlay: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primaryOrange,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: colors.warmWhite,
  },
  avatarHint: {
    color: colors.mutedText,
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
  },
  section: { gap: spacing.xs },
  sectionLabel: {
    color: colors.mutedText,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 11,
    letterSpacing: 1.2,
  },
  card: {
    backgroundColor: colors.backgroundWhite,
    borderRadius: radius.large,
    overflow: "hidden",
    ...shadows.sm,
  },
  fieldRow: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: 4,
  },
  fieldLabel: {
    color: colors.mutedText,
    fontFamily: "Poppins_500Medium",
    fontSize: 11,
    letterSpacing: 0.4,
  },
  fieldInput: {
    color: colors.primaryText,
    fontFamily: "Poppins_400Regular",
    fontSize: 15,
    lineHeight: 22,
    padding: 0,
  },
  multilineInput: {
    minHeight: 64,
    lineHeight: 21,
  },
  divider: {
    height: 1,
    backgroundColor: colors.divider,
    marginHorizontal: spacing.md,
  },
  fieldHint: {
    color: colors.mutedText,
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    lineHeight: 17,
    paddingHorizontal: spacing.xs,
  },
});

const bannerStyles = StyleSheet.create({
  wrap: {
    backgroundColor: colors.backgroundWhite,
    borderRadius: radius.medium,
    padding: spacing.md,
    gap: spacing.xs,
    ...shadows.xs,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  label: {
    color: colors.primaryText,
    fontFamily: "Poppins_500Medium",
    fontSize: 13,
  },
  count: {
    color: colors.mutedText,
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
  },
  track: {
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.divider,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    borderRadius: 3,
  },
});
