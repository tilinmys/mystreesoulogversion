import { Eye, EyeOff, type LucideIcon } from "lucide-react-native";
import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  TextInput,
  type KeyboardTypeOptions,
  type ReturnKeyTypeOptions,
  type TextInputProps,
  View,
} from "react-native";

const colors = {
  surface: "#FFFFFF",
  primary: "#F97316",
  softTint: "#FFF1E8",
  textPrimary: "#2D2A26",
  textSecondary: "#6B665F",
  border: "#FED7AA",
};

type AuthInputProps = {
  icon: LucideIcon;
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  autoComplete?: "email" | "password" | "name" | "username" | "tel" | "off";
  textContentType?: TextInputProps["textContentType"];
  returnKeyType?: ReturnKeyTypeOptions;
};

export function AuthInput({
  icon: Icon,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = "default",
  autoCapitalize = "none",
  autoComplete,
  textContentType,
  returnKeyType = "next",
}: AuthInputProps) {
  const [focused, setFocused] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const isPassword = secureTextEntry;

  return (
    <View
      className="flex-row items-center bg-white"
      style={[styles.container, focused ? styles.containerFocused : null]}
    >
      <View className="items-center justify-center" style={styles.iconBlock}>
        <Icon size={23} color={colors.primary} strokeWidth={2.1} />
      </View>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        secureTextEntry={isPassword && !passwordVisible}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        autoComplete={autoComplete}
        textContentType={textContentType}
        returnKeyType={returnKeyType}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="flex-1"
        style={styles.input}
      />

      {isPassword ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={passwordVisible ? "Hide password" : "Show password"}
          onPress={() => setPasswordVisible((current) => !current)}
          className="items-center justify-center"
          style={styles.eyeTarget}
        >
          {passwordVisible ? (
            <EyeOff size={23} color={colors.textSecondary} strokeWidth={2.1} />
          ) : (
            <Eye size={23} color={colors.textSecondary} strokeWidth={2.1} />
          )}
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 64,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 8,
    gap: 12,
  },
  containerFocused: {
    borderColor: colors.primary,
  },
  iconBlock: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: colors.softTint,
  },
  input: {
    minHeight: 56,
    color: colors.textPrimary,
    fontFamily: "Poppins_400Regular",
    fontSize: 15,
    lineHeight: 22,
    letterSpacing: 0,
    paddingVertical: 0,
  },
  eyeTarget: {
    width: 48,
    height: 48,
    borderRadius: 14,
  },
});
