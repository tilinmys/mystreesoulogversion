import { ChevronLeft, Eye, EyeOff } from "lucide-react-native";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from "react-native";

import { SafeScreen } from "@/components/layout/SafeScreen";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { colors, radius, spacing, shadows } from "@/lib/design-tokens";

export default function LoginScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeScreen bottomInset={false} contentStyle={styles.container}>
      <StatusBar style="dark" />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => router.back()}
              style={styles.backButton}
              accessibilityLabel="Go back"
            >
              <ChevronLeft size={24} color={colors.primaryText} />
            </TouchableOpacity>
          </View>

          {/* Typography Anchor */}
          <View style={styles.titleAnchor}>
            <Text style={styles.title}>Welcome back.</Text>
            <Text style={styles.subtitle}>Sign in to access your sanctuary.</Text>
          </View>

          {/* Social Logins */}
          <View style={styles.socialAnchor}>
            <TouchableOpacity activeOpacity={0.8} style={styles.socialButton}>
              {/* Note: In a real app, use react-native-svg for precise vectors. Using a generic colored View as placeholder for logo */}
              <View style={[styles.logoPlaceholder, { backgroundColor: "#DB4437" }]}>
                <Text style={styles.logoText}>G</Text>
              </View>
              <Text style={styles.socialButtonText}>Continue with Google</Text>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.8} style={styles.socialButton}>
              <View style={[styles.logoPlaceholder, { backgroundColor: "#000000" }]}>
                <Text style={[styles.logoText, { color: colors.whiteText }]}></Text>
              </View>
              <Text style={styles.socialButtonText}>Continue with Apple</Text>
            </TouchableOpacity>
          </View>

          {/* Divider */}
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or continue with email</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Form */}
          <View style={styles.formAnchor}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email or Username</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor={colors.mutedText}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Enter your password"
                  placeholderTextColor={colors.mutedText}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                >
                  {showPassword ? (
                    <EyeOff size={20} color={colors.secondaryText} />
                  ) : (
                    <Eye size={20} color={colors.secondaryText} />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity activeOpacity={0.7} style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot password?</Text>
            </TouchableOpacity>

            <PrimaryButton
              label="Sign In"
              onPress={() => router.push("/(tabs)/home")}
              style={styles.signInBtn}
              textStyle={styles.signInBtnText}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.warmWhite,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  header: {
    height: 56,
    justifyContent: "center",
    marginBottom: spacing.md,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.backgroundWhite,
    alignItems: "center",
    justifyContent: "center",
    ...shadows.sm,
  },
  titleAnchor: {
    marginBottom: spacing.xl,
  },
  title: {
    color: colors.primaryText,
    fontFamily: "PlayfairDisplay_600SemiBold",
    fontSize: 34,
    lineHeight: 42,
    marginBottom: spacing.xs,
  },
  subtitle: {
    color: colors.secondaryText,
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    lineHeight: 24,
  },
  socialAnchor: {
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 54,
    borderRadius: radius.large,
    backgroundColor: colors.backgroundWhite,
    borderWidth: 1,
    borderColor: colors.divider,
    ...shadows.sm,
  },
  logoPlaceholder: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    left: spacing.lg,
  },
  logoText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  socialButtonText: {
    color: colors.primaryText,
    fontFamily: "Poppins_500Medium",
    fontSize: 15,
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.xl,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.divider,
  },
  dividerText: {
    color: colors.secondaryText,
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    paddingHorizontal: spacing.md,
  },
  formAnchor: {
    gap: spacing.lg,
  },
  inputGroup: {
    gap: spacing.xs,
  },
  label: {
    color: colors.primaryText,
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    marginLeft: spacing.xs,
  },
  input: {
    height: 56,
    borderRadius: radius.medium,
    backgroundColor: colors.backgroundWhite,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    paddingHorizontal: spacing.md,
    fontFamily: "Poppins_400Regular",
    fontSize: 15,
    color: colors.primaryText,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 56,
    borderRadius: radius.medium,
    backgroundColor: colors.backgroundWhite,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  passwordInput: {
    flex: 1,
    height: "100%",
    paddingHorizontal: spacing.md,
    fontFamily: "Poppins_400Regular",
    fontSize: 15,
    color: colors.primaryText,
  },
  eyeIcon: {
    padding: spacing.md,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginTop: -spacing.sm,
    paddingVertical: spacing.xs,
  },
  forgotPasswordText: {
    color: colors.primaryOrange,
    fontFamily: "Poppins_500Medium",
    fontSize: 13,
  },
  signInBtn: {
    marginTop: spacing.sm,
    height: 56,
    borderRadius: radius.large,
    shadowColor: colors.primaryOrange,
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
  },
  signInBtnText: {
    fontFamily: "Poppins_600SemiBold",
    letterSpacing: 1,
    fontSize: 15,
  },
});
