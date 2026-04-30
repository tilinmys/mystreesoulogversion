import { StyleSheet, View, type ViewStyle } from "react-native";

import { spacing } from "@/lib/design-tokens";

import { BrandMark } from "./BrandMark";
import { BrandWordmark } from "./BrandWordmark";

type BrandLockupProps = {
  compact?: boolean;
  orientation?: "horizontal" | "vertical";
  style?: ViewStyle;
};

export function BrandLockup({
  compact = false,
  orientation = "vertical",
  style,
}: BrandLockupProps) {
  const isHorizontal = orientation === "horizontal";

  return (
    <View
      accessibilityLabel="MyStree Soul"
      style={[styles.base, isHorizontal ? styles.horizontal : styles.vertical, style]}
    >
      <BrandMark size={compact ? 44 : 72} />
      <BrandWordmark compact={compact} />
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    justifyContent: "center",
  },
  vertical: {
    gap: spacing.sm,
  },
  horizontal: {
    flexDirection: "row",
    gap: spacing.sm,
  },
});
