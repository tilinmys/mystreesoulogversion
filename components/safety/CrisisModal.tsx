/**
 * CrisisModal
 *
 * Triggered when a user logs:
 *  - Pain ≥ 9/10, OR
 *  - Mood = "Severe Pain" | "Heavy Bleeding"
 *
 * Shifts Bloop from casual to medical-safety tone.
 * Prominently states: app is NOT a diagnostic tool.
 * Offers emergency numbers and a "close" path back to the log.
 */
import { AlertTriangle, Phone, X } from "lucide-react-native";
import { useRouter } from "expo-router";
import {
  Linking,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppCard } from "@/components/ui/AppCard";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { colors, radius, spacing } from "@/lib/design-tokens";

const HOTLINES = [
  { label: "Emergency Services",    number: "112" },
  { label: "iCall (Mental Health)", number: "9152987821" },
  { label: "NIMHANS Helpline",      number: "080-46110007" },
];

type Props = {
  visible: boolean;
  onClose: () => void;
};

export function CrisisModal({ visible, onClose }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      statusBarTranslucent
      onRequestClose={onClose}
      accessibilityViewIsModal
    >
      <View style={[styles.overlay, { paddingBottom: insets.bottom }]}>
        <View style={styles.sheet}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.alertIcon}>
              <AlertTriangle size={24} color={colors.dangerText} strokeWidth={2.2} />
            </View>
            <TouchableOpacity
              onPress={onClose}
              style={styles.close}
              accessibilityRole="button"
              accessibilityLabel="Close"
            >
              <X size={20} color={colors.mutedText} />
            </TouchableOpacity>
          </View>

          <Text style={styles.title}>Are you okay?</Text>
          <Text style={styles.body}>
            You've logged severe symptoms. MyStree Soul is{" "}
            <Text style={styles.bold}>not a medical diagnostic tool</Text> and cannot
            replace professional care.{"\n\n"}
            If you're in pain or distress, please reach out to a healthcare provider or
            emergency services immediately.
          </Text>

          {/* Hotlines */}
          <AppCard style={styles.hotlineCard}>
            {HOTLINES.map((h, i) => (
              <TouchableOpacity
                key={h.number}
                style={[styles.hotlineRow, i > 0 && styles.hotlineDivider]}
                onPress={() => Linking.openURL(`tel:${h.number}`)}
                accessibilityRole="button"
                accessibilityLabel={`Call ${h.label}: ${h.number}`}
              >
                <Phone size={16} color={colors.primaryOrange} strokeWidth={2.2} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.hotlineLabel}>{h.label}</Text>
                  <Text style={styles.hotlineNumber}>{h.number}</Text>
                </View>
                <Text style={styles.callText}>Call</Text>
              </TouchableOpacity>
            ))}
          </AppCard>

          <PrimaryButton
            label="I'm okay, continue logging"
            onPress={onClose}
            style={styles.cta}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: colors.tourOverlay,
  },
  sheet: {
    backgroundColor: colors.warmWhite,
    borderTopLeftRadius: radius.large,
    borderTopRightRadius: radius.large,
    padding: spacing.xl,
    paddingBottom: spacing.xl,
    gap: spacing.md,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  alertIcon: {
    width: 48,
    height: 48,
    borderRadius: radius.small,
    backgroundColor: colors.dangerSurface,
    alignItems: "center",
    justifyContent: "center",
  },
  close: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: colors.primaryText,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 22,
    lineHeight: 29,
  },
  body: {
    color: colors.secondaryText,
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    lineHeight: 22,
  },
  bold: {
    fontFamily: "Poppins_600SemiBold",
    color: colors.primaryText,
  },
  hotlineCard: {
    padding: 0,
    overflow: "hidden",
  },
  hotlineRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    padding: spacing.md,
  },
  hotlineDivider: {
    borderTopWidth: 1,
    borderTopColor: colors.cardBorder,
  },
  hotlineLabel: {
    color: colors.primaryText,
    fontFamily: "Poppins_500Medium",
    fontSize: 13,
    lineHeight: 18,
  },
  hotlineNumber: {
    color: colors.dangerText,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    lineHeight: 20,
  },
  callText: {
    color: colors.primaryOrange,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 13,
  },
  cta: {
    marginTop: spacing.xs,
  },
});
