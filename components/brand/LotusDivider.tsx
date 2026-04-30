import Svg, { Path } from "react-native-svg";

import { colors } from "@/lib/design-tokens";

type LotusDividerProps = {
  width?: number;
};

export function LotusDivider({ width = 144 }: LotusDividerProps) {
  return (
    <Svg width={width} height={30} viewBox="0 0 144 30" accessibilityLabel="Lotus divider">
      <Path d="M0 15h42" stroke={colors.paleCoral} strokeWidth={1} opacity={0.45} />
      <Path d="M102 15h42" stroke={colors.paleCoral} strokeWidth={1} opacity={0.45} />
      <Path
        d="M72 22c-8-7-8-16 0-22 8 6 8 15 0 22Z"
        fill="none"
        stroke={colors.paleCoral}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Path
        d="M61 23c-7-3-10-10-8-18 8 2 13 8 12 17M83 23c7-3 10-10 8-18-8 2-13 8-12 17M54 25c-6-1-12-5-15-12 9-1 17 3 22 10M90 25c6-1 12-5 15-12-9-1-17 3-22 10M51 26h42"
        fill="none"
        stroke={colors.paleCoral}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}
