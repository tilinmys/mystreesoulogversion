import { StyleSheet, Text, View } from "react-native";
import Svg, { Circle, G } from "react-native-svg";

import { colors } from "@/lib/design-tokens";

type CycleWheelProps = {
  day?: number;
  phase?: string;
  size?: number;
};

export function CycleWheel({ day = 14, phase = "Ovulation", size = 210 }: CycleWheelProps) {
  const radius = 82;
  const circumference = 2 * Math.PI * radius;
  const segments = [
    { color: colors.paleCoral, dash: 0.18 },
    { color: colors.peachGlow, dash: 0.32 },
    { color: colors.primaryOrange, dash: 0.18 },
    { color: colors.lavenderMist, dash: 0.32 },
  ];

  return (
    <View style={[styles.wrap, { width: size, height: size }]}>
      <Svg width={size} height={size} viewBox="0 0 210 210">
        <G rotation="-90" origin="105,105">
          {segments.map((segment, index) => (
            <Circle
              key={segment.color}
              cx="105"
              cy="105"
              r={radius}
              stroke={segment.color}
              strokeWidth="18"
              strokeLinecap="round"
              fill="none"
              strokeDasharray={`${circumference * segment.dash} ${circumference}`}
              strokeDashoffset={-circumference * index * 0.25}
              opacity={index === 2 ? 1 : 0.62}
            />
          ))}
          <Circle
            cx="105"
            cy="23"
            r="8"
            fill={colors.primaryOrange}
            stroke={colors.backgroundWhite}
            strokeWidth="4"
          />
        </G>
      </Svg>
      <View style={styles.center}>
        <Text style={styles.day}>Day {day}</Text>
        <Text style={styles.phase}>{phase}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  center: {
    position: "absolute",
    alignItems: "center",
  },
  day: {
    color: colors.primaryText,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 28,
    lineHeight: 34,
    letterSpacing: 0,
  },
  phase: {
    color: colors.secondaryText,
    fontFamily: "Poppins_500Medium",
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 0,
  },
});
