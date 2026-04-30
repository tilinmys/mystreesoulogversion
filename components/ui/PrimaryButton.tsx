import {
  ActivityIndicator,
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
  type GestureResponderEvent,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from "react-native";
import { type ReactNode, useRef } from "react";

import { colors, radius, shadows, spacing } from "@/lib/design-tokens";

type PrimaryButtonProps = {
  label: string;
  onPress: (event: GestureResponderEvent) => void;
  accessibilityLabel?: string;
  disabled?: boolean;
  loading?: boolean;
  iconRight?: ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export function PrimaryButton({
  label,
  onPress,
  accessibilityLabel,
  disabled = false,
  loading = false,
  iconRight,
  style,
  textStyle,
}: PrimaryButtonProps) {
  const isDisabled = disabled || loading;
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    if (isDisabled) return;
    Animated.spring(scale, {
      toValue: 0.96,
      useNativeDriver: true,
      speed: 40,
      bounciness: 4,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 30,
      bounciness: 6,
    }).start();
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View
        style={[
          styles.button,
          {
            backgroundColor: isDisabled ? colors.softDisabled : colors.primaryGradientEnd,
            transform: [{ scale }],
          },
          isDisabled ? styles.disabledSurface : null,
          style,
        ]}
      >
        {!isDisabled ? <View pointerEvents="none" style={styles.gradientTop} /> : null}
        <View style={styles.content}>
          {loading ? <ActivityIndicator color={colors.whiteText} /> : null}
          {!loading ? (
            <Text style={[styles.label, isDisabled ? styles.disabledLabel : null, textStyle]}>
              {label}
            </Text>
          ) : null}
          {!loading && iconRight ? <View style={styles.iconWrap}>{iconRight}</View> : null}
        </View>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    minHeight: 56,
    flexShrink: 0,
    borderRadius: radius.button,
    backgroundColor: colors.primaryOrange,
    paddingHorizontal: spacing.lg,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    ...shadows.button,
  },
  disabledSurface: {
    shadowOpacity: 0,
    elevation: 0,
  },
  gradientTop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "56%",
    backgroundColor: colors.primaryGradientStart,
    opacity: 0.42,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
  },
  iconWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    flexShrink: 1,
    color: colors.whiteText,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: 0,
    textAlign: "center",
  },
  disabledLabel: {
    color: colors.disabledText,
  },
});
