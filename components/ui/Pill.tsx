import { type ReactNode, useRef } from "react";
import { Animated, Pressable, StyleSheet, Text, View, type GestureResponderEvent, type ViewStyle } from "react-native";

import { colors, radius, spacing } from "@/lib/design-tokens";

type PillProps = {
  label: string;
  selected?: boolean;
  icon?: ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
  style?: ViewStyle;
};

export function Pill({ label, selected = false, icon, onPress, style }: PillProps) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
      speed: 40,
      bounciness: 6,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 30,
      bounciness: 8,
    }).start();
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ selected }}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View
        style={[
          styles.pill,
          { transform: [{ scale }] },
          selected ? styles.selected : null,
          style,
        ]}
      >
        {icon ? <View style={styles.icon}>{icon}</View> : null}
        <Text style={[styles.label, selected ? styles.selectedLabel : null]}>{label}</Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pill: {
    minHeight: 48,
    borderRadius: radius.small,
    borderWidth: 1,
    borderColor: colors.divider,
    backgroundColor: colors.backgroundWhite,
    paddingHorizontal: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
  },
  selected: {
    backgroundColor: colors.orangeSoftSurface,
    borderColor: colors.primaryOrange,
  },
  icon: {
    width: 20,
    alignItems: "center",
  },
  label: {
    color: colors.secondaryText,
    fontFamily: "Poppins_500Medium",
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 0,
  },
  selectedLabel: {
    color: colors.primaryText,
    fontFamily: "Poppins_600SemiBold",
  },
});
