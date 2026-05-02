import { useRouter } from "expo-router";
import {
  ArrowLeft,
  Bell,
  ChevronRight,
  LogOut,
  RefreshCcw,
  ShieldCheck,
  Trash2,
  UserRound,
} from "lucide-react-native";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import { useAppStore } from "@/store/app-store";

const palette = {
  white: "#FFFFFF",
  primaryText: "#2C2A29",
  secondaryText: "#817673",
  mutedText: "#8D8582",
  divider: "#EDE4E1",
  coral: "#F97864",
  danger: "#FF5F4F",
  coralSoft: "#FFF3EF",
  coralBorder: "#FFB7A8",
  shadowTint: "#D98268",
};

const premiumShadow = {
  shadowColor: palette.shadowTint,
  shadowOffset: { width: 0, height: 16 },
  shadowOpacity: 0.06,
  shadowRadius: 32,
  elevation: 6,
};

function ProfileAvatar() {
  return (
    <View className="items-center justify-center" style={styles.avatar}>
      <UserRound size={72} color={palette.coral} strokeWidth={1.7} />
    </View>
  );
}

function SettingsGroup({ children }: { children: React.ReactNode }) {
  return <View style={styles.groupCard}>{children}</View>;
}

function SettingsRow({
  title,
  icon,
  onPress,
  danger = false,
  withDivider = false,
}: {
  title: string;
  icon: React.ReactNode;
  onPress: () => void;
  danger?: boolean;
  withDivider?: boolean;
}) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={title} onPress={onPress}>
      <View style={styles.row}>
        <View className="items-center justify-center" style={styles.rowIcon}>
          {icon}
        </View>
        <Text style={[styles.rowTitle, danger ? styles.dangerText : null]}>{title}</Text>
        <View className="items-center justify-center" style={styles.chevronTarget}>
          <ChevronRight size={30} color={palette.secondaryText} strokeWidth={2.3} />
        </View>
      </View>
      {withDivider ? <View style={styles.divider} /> : null}
    </Pressable>
  );
}

export default function ProfileScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const userName = useAppStore((state) => state.userName);
  const resetDemo = useAppStore((state) => state.resetDemo);
  const resumeExistingSession = useAppStore((state) => state.resumeExistingSession);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  /** Bulletproof safe-exit: overlay → clear state → replace route (no back-swipe). */
  const safeExit = async (shouldClearData: boolean) => {
    if (isProcessing) return; // Prevent double-tap
    setIsProcessing(true);
    setDeleteModalVisible(false);

    try {
      // Step 1: Clear Zustand + AsyncStorage
      if (shouldClearData) {
        resetDemo();
        await AsyncStorage.removeItem("mystree-soul-demo-state").catch(() => undefined);
      } else {
        resumeExistingSession();
      }

      // Step 2: Small delay to ensure state propagation
      await new Promise((r) => setTimeout(r, 300));

      // Step 3: Replace route — wipes navigation stack, no back-swipe
      router.replace(
        shouldClearData
          ? { pathname: "/(auth)/login", params: { mode: "login" } }
          : "/(onboarding)/logged-out",
      );
    } catch {
      setIsProcessing(false);
    }
  };

  const confirmReset = () => {
    Alert.alert("Reset demo data?", "This restores the local demo app state.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Reset",
        style: "destructive",
        onPress: () => safeExit(true),
      },
    ]);
  };

  const confirmDelete = () => {
    setDeleteModalVisible(true);
  };

  const deleteEverything = () => safeExit(true);

  const signOut = () => safeExit(false);

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "left", "right"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 32 }]}
      >
        <View className="px-6">
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Go back"
            onPress={() => router.back()}
            className="items-center justify-center"
            style={styles.backButton}
          >
            <ArrowLeft size={24} color={palette.primaryText} strokeWidth={2.2} />
          </Pressable>

          <View className="items-center" style={styles.profileHeader}>
            <ProfileAvatar />
            <Text style={styles.name}>{userName || "Aarya"}</Text>
            <Text style={styles.email}>ananya.sharma@email.com</Text>
          </View>

          <SettingsGroup>
            <SettingsRow
              title="Account Preferences"
              icon={<UserRound size={32} color={palette.secondaryText} strokeWidth={2} />}
              onPress={() => router.push("/(modals)/edit-profile")}
              withDivider
            />
            <SettingsRow
              title="Notifications"
              icon={<Bell size={32} color={palette.secondaryText} strokeWidth={2} />}
              onPress={() => router.push("/(modals)/notifications")}
              withDivider
            />
            <SettingsRow
              title="Privacy & Consent"
              icon={<ShieldCheck size={32} color={palette.secondaryText} strokeWidth={2} />}
              onPress={() => router.push("/(modals)/privacy")}
            />
          </SettingsGroup>

          <View style={styles.sectionGap}>
            <SettingsGroup>
              <SettingsRow
                title="Reset Demo Data"
                icon={<RefreshCcw size={32} color={palette.secondaryText} strokeWidth={2} />}
                onPress={confirmReset}
                withDivider
              />
              <SettingsRow
                title="Delete My Data"
                icon={<Trash2 size={32} color={palette.danger} strokeWidth={2} />}
                onPress={confirmDelete}
                danger
              />
            </SettingsGroup>
          </View>

          <Text style={styles.demoNote}>This is a demo version for testing.{"\n"}Data is stored locally.</Text>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Sign out"
            onPress={signOut}
            className="flex-row items-center justify-center"
            style={styles.signOutButton}
          >
            <LogOut size={34} color={palette.secondaryText} strokeWidth={2} />
            <Text style={styles.signOutText}>Sign Out</Text>
          </Pressable>
        </View>
      </ScrollView>

      <Modal
        transparent
        visible={deleteModalVisible}
        animationType="fade"
        onRequestClose={() => setDeleteModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.deleteModalCard}>
            <Text style={styles.deleteModalTitle}>Erase Sanctuary Data?</Text>
            <Text style={styles.deleteModalBody}>
              This will reset your local MyStree Soul data on this device. This action cannot be undone.
            </Text>
            <View className="flex-row" style={styles.deleteModalActions}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Cancel data deletion"
                onPress={() => setDeleteModalVisible(false)}
                className="items-center justify-center"
                style={styles.cancelButton}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </Pressable>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Delete everything"
                onPress={deleteEverything}
                className="items-center justify-center"
                style={styles.deleteEverythingButton}
              >
                <Text numberOfLines={1} adjustsFontSizeToFit style={styles.deleteEverythingText}>
                  Delete Everything
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Full-screen processing overlay — prevents interaction during logout/delete */}
      {isProcessing ? <ProcessingOverlay /> : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginTop: 16,
    backgroundColor: palette.white,
    borderWidth: 1,
    borderColor: palette.divider,
    ...premiumShadow,
  },
  profileHeader: {
    paddingTop: 40,
    paddingBottom: 40,
  },
  avatar: {
    width: 112,
    height: 112,
    borderRadius: 56,
    backgroundColor: palette.coralSoft,
    borderWidth: 2,
    borderColor: palette.coralBorder,
    ...premiumShadow,
  },
  name: {
    color: palette.primaryText,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 32,
    lineHeight: 40,
    textAlign: "center",
    letterSpacing: 0,
    marginTop: 24,
  },
  email: {
    color: palette.secondaryText,
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    letterSpacing: 0,
    marginTop: 8,
  },
  groupCard: {
    backgroundColor: palette.white,
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingVertical: 8,
    ...premiumShadow,
  },
  row: {
    minHeight: 80,
    flexDirection: "row",
    alignItems: "center",
  },
  rowIcon: {
    width: 48,
    height: 48,
  },
  rowTitle: {
    flex: 1,
    color: palette.primaryText,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 0,
    marginLeft: 24,
  },
  dangerText: {
    color: palette.danger,
  },
  chevronTarget: {
    width: 48,
    height: 48,
    marginLeft: 8,
  },
  divider: {
    height: 1,
    backgroundColor: palette.divider,
    marginLeft: 72,
  },
  sectionGap: {
    marginTop: 24,
  },
  demoNote: {
    color: palette.mutedText,
    fontFamily: "Poppins_400Regular",
    fontSize: 15,
    fontStyle: "italic",
    lineHeight: 24,
    textAlign: "center",
    letterSpacing: 0,
    marginTop: 40,
  },
  signOutButton: {
    minHeight: 64,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: palette.divider,
    marginTop: 40,
    marginBottom: 32,
    gap: 16,
  },
  signOutText: {
    color: palette.secondaryText,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 0,
  },
  modalBackdrop: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(44, 42, 41, 0.4)",
    paddingHorizontal: 32,
  },
  deleteModalCard: {
    width: "100%",
    borderRadius: 16,
    backgroundColor: palette.white,
    padding: 24,
    ...premiumShadow,
  },
  deleteModalTitle: {
    color: palette.primaryText,
    fontFamily: "Poppins_700Bold",
    fontSize: 18,
    lineHeight: 26,
    letterSpacing: 0,
  },
  deleteModalBody: {
    color: palette.secondaryText,
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0,
    marginTop: 8,
  },
  deleteModalActions: {
    gap: 12,
    marginTop: 24,
  },
  cancelButton: {
    flex: 1,
    minHeight: 48,
    borderRadius: 14,
    backgroundColor: "#F2EEEE",
    paddingHorizontal: 12,
  },
  cancelButtonText: {
    color: palette.primaryText,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0,
  },
  deleteEverythingButton: {
    flex: 1,
    minHeight: 48,
    borderRadius: 14,
    backgroundColor: palette.danger,
    paddingHorizontal: 12,
  },
  deleteEverythingText: {
    color: palette.white,
    fontFamily: "Poppins_700Bold",
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 0,
    textAlign: "center",
  },
  processingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 248, 245, 0.92)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
  },
  processingText: {
    color: palette.secondaryText,
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    marginTop: 16,
  },
});

function ProcessingOverlay() {
  return (
    <View style={styles.processingOverlay}>
      <ActivityIndicator size="large" color={palette.coral} />
      <Text style={styles.processingText}>Securing your data…</Text>
    </View>
  );
}
