import Svg, { Circle, G } from "react-native-svg";

import { colors } from "@/lib/design-tokens";

type SparkleFieldProps = {
  width: number;
  height: number;
};

export function SparkleField({ width, height }: SparkleFieldProps) {
  const points = [
    [0.22, 0.22, 1.8],
    [0.34, 0.33, 1.3],
    [0.76, 0.28, 1.7],
    [0.19, 0.62, 1.4],
    [0.82, 0.5, 1.8],
    [0.3, 0.79, 1.9],
  ] as const;

  return (
    <Svg width={width} height={height} style={{ position: "absolute", inset: 0 }}>
      {points.map(([x, y, r], index) => (
        <G key={index}>
          <Circle cx={width * x} cy={height * y} r={r} fill={colors.backgroundWhite} opacity={0.82} />
          <Circle cx={width * x} cy={height * y} r={r * 3.2} fill={colors.backgroundWhite} opacity={0.12} />
        </G>
      ))}
    </Svg>
  );
}
