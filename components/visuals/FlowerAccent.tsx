import Svg, { Path } from "react-native-svg";

import { colors } from "@/lib/design-tokens";

type FlowerAccentProps = {
  size?: number;
  opacity?: number;
};

export function FlowerAccent({ size = 42, opacity = 0.34 }: FlowerAccentProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48" style={{ opacity }}>
      <Path
        d="M24 31c-8-7-8-17 0-25 8 8 8 18 0 25Z"
        fill="none"
        stroke={colors.paleCoral}
        strokeWidth={2.2}
        strokeLinecap="round"
      />
      <Path
        d="M15 33c-7-3-10-11-8-20 9 2 14 9 13 19M33 33c7-3 10-11 8-20-9 2-14 9-13 19M13 37c-7-1-12-6-15-13 10-1 18 4 24 12M35 37c7-1 12-6 15-13-10-1-18 4-24 12M12 39h24"
        fill="none"
        stroke={colors.roseGold}
        strokeWidth={2.2}
        strokeLinecap="round"
      />
    </Svg>
  );
}
