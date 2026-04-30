import { Animated, StyleSheet, View } from "react-native";
import { useEffect, useRef } from "react";

import { colors, radius, spacing } from "@/lib/design-tokens";

type ProgressDotsProps = {
  total: number;
  currentIndex: number;
};

function Dot({ active }: { active: boolean }) {
  const animatedValue = useRef(new Animated.Value(active ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(animatedValue, {
      toValue: active ? 1 : 0,
      useNativeDriver: false,
      speed: 30,
      bounciness: 6,
    }).start();
  }, [active, animatedValue]);

  const width = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [8, 28],
  });

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.peachGlow, colors.primaryOrange],
  });

  return <Animated.View style={[styles.dot, { width, backgroundColor }]} />;
}

export function ProgressDots({ total, currentIndex }: ProgressDotsProps) {
  return (
    <View
      accessibilityRole="progressbar"
      accessibilityValue={{
        min: 1,
        max: total,
        now: currentIndex + 1,
      }}
      style={styles.row}
    >
      {Array.from({ length: total }).map((_, index) => (
        <Dot key={index} active={index === currentIndex} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: spacing.xs,
  },
  dot: {
    height: 8,
    borderRadius: radius.full,
  },
});
