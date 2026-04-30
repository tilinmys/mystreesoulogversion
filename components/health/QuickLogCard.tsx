import { type ReactNode, useRef } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";

import { colors, radius, spacing } from "@/lib/design-tokens";

type QuickLogCardProps = {
  label: string;
  icon?: ReactNode;
  selected?: boolean;
  selectedBg?: string;   // per-mood accent color
  onPress: () => void;
};

export function QuickLogCard({
  label,
  icon,
  selected = false,
  selectedBg,
  onPress,
}: QuickLogCardProps) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.93,
      useNativeDriver: true,
      speed: 40,
      bounciness: 6,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: selected ? 1.04 : 1,
      useNativeDriver: true,
      speed: 30,
      bounciness: 8,
    }).start();
  };

  const bg = selected && selectedBg ? selectedBg : selected ? colors.peachGlow : colors.backgroundWhite;

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
          styles.card,
          { backgroundColor: bg, transform: [{ scale }] },
          selected ? styles.selected : null,
        ]}
      >
        <View style={styles.icon}>{icon}</View>
        <Text style={[styles.label, selected ? styles.selectedLabel : null]}>{label}</Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    minWidth: 90,
    minHeight: 90,
    borderRadius: radius.medium,
    borderWidth: 1,
    borderColor: colors.divider,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
    padding: spacing.sm,
  },
  selected: {
    borderColor: colors.primaryOrange,
    shadowColor: colors.orangeShadow,
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  icon: {
    minHeight: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    color: colors.secondaryText,
    fontFamily: "Poppins_500Medium",
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 0,
    textAlign: "center",
  },
  selectedLabel: {
    color: colors.primaryText,
  },
});
