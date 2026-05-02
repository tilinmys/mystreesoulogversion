import { Apple } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";

const colors = {
  surface: "#FFFFFF",
  textPrimary: "#2D2A26",
  border: "#FED7AA",
};

type SocialButtonProps = {
  provider: "google" | "apple";
  onPress: () => void;
};

export function SocialButton({ provider, onPress }: SocialButtonProps) {
  const isGoogle = provider === "google";
  const label = isGoogle ? "Continue with Google" : "Continue with Apple";

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      className="flex-row items-center justify-center bg-white"
      style={({ pressed }) => [styles.button, pressed ? styles.pressed : null]}
    >
      <View className="items-center justify-center" style={styles.iconSlot}>
        {isGoogle ? (
          <Text allowFontScaling={false} style={styles.googleMark}>
            G
          </Text>
        ) : (
          <Apple size={24} color={colors.textPrimary} fill={colors.textPrimary} strokeWidth={1.8} />
        )}
      </View>
      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.label}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 56,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: 16,
  },
  pressed: {
    opacity: 0.82,
  },
  iconSlot: {
    position: "absolute",
    left: 24,
    width: 28,
    height: 28,
  },
  googleMark: {
    color: "#4285F4",
    fontFamily: "Poppins_700Bold",
    fontSize: 22,
    lineHeight: 28,
  },
  label: {
    color: colors.textPrimary,
    fontFamily: "Poppins_500Medium",
    fontSize: 15,
    lineHeight: 22,
    letterSpacing: 0,
    textAlign: "center",
    paddingHorizontal: 44,
  },
});
