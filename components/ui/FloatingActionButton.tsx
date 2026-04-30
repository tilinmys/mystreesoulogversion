import { type ReactNode } from "react";
import { Animated, Pressable, StyleSheet, type GestureResponderEvent, type ViewStyle } from "react-native";
import { useRef } from "react";

import { colors, radius, shadows } from "@/lib/design-tokens";

type FloatingActionButtonProps = {
  children: ReactNode;
  onPress: (event: GestureResponderEvent) => void;
  accessibilityLabel: string;
  style?: ViewStyle;
};

export function FloatingActionButton({
  children,
  onPress,
  accessibilityLabel,
  style,
}: FloatingActionButtonProps) {
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
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View style={[styles.button, { transform: [{ scale }] }, style]}>
        {children}
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 56,
    height: 56,
    flexShrink: 0,
    borderRadius: radius.full,
    backgroundColor: colors.primaryOrange,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    ...shadows.fab,
  },
});
