import { type ReactNode, useRef } from "react";
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  type GestureResponderEvent,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
  View,
} from "react-native";

import { colors, radius, spacing } from "@/lib/design-tokens";

type SecondaryButtonProps = {
  label: string;
  onPress: (event: GestureResponderEvent) => void;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  iconRight?: ReactNode;
};

export function SecondaryButton({ label, onPress, accessibilityLabel, style, labelStyle, iconRight }: SecondaryButtonProps) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
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
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View style={[styles.button, { transform: [{ scale }] }, style]}>
        <View style={styles.content}>
          <Text style={[styles.label, labelStyle]}>{label}</Text>
          {iconRight ? <View style={styles.iconWrap}>{iconRight}</View> : null}
        </View>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 44,
    flexShrink: 0,
    borderRadius: radius.button,
    backgroundColor: "transparent",
    paddingHorizontal: spacing.md,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    textAlign: "center",
    color: colors.primaryOrange,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 15,
    lineHeight: 21,
    letterSpacing: 0,
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
});
