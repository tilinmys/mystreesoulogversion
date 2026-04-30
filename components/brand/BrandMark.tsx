import Svg, {
  Circle,
  Defs,
  G,
  LinearGradient,
  Path,
  RadialGradient,
  Stop,
} from "react-native-svg";

import { colors } from "@/lib/design-tokens";

type BrandMarkProps = {
  size?: number;
  opacity?: number;
};

export function BrandMark({ size = 72, opacity = 1 }: BrandMarkProps) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 96 96"
      accessibilityLabel="MyStree Soul brand mark"
    >
      <Defs>
        <RadialGradient id="brandMarkAura" cx="50%" cy="50%" r="52%">
          <Stop offset="0" stopColor={colors.backgroundWhite} stopOpacity="0.96" />
          <Stop offset="0.54" stopColor={colors.peachGlow} stopOpacity="0.5" />
          <Stop offset="1" stopColor={colors.warmWhite} stopOpacity="0" />
        </RadialGradient>
        <LinearGradient id="brandMarkWarm" x1="22" y1="10" x2="76" y2="86">
          <Stop offset="0" stopColor={colors.softOrange} />
          <Stop offset="0.52" stopColor={colors.paleCoral} />
          <Stop offset="1" stopColor={colors.roseGold} />
        </LinearGradient>
        <LinearGradient id="brandMarkTeal" x1="18" y1="78" x2="82" y2="20">
          <Stop offset="0" stopColor={colors.softTeal} stopOpacity="0.72" />
          <Stop offset="1" stopColor={colors.primaryOrange} stopOpacity="0.84" />
        </LinearGradient>
      </Defs>

      <G opacity={opacity}>
        <Circle cx="48" cy="48" r="44" fill="url(#brandMarkAura)" />
        <Path
          d="M49 14c14 10 20 23 17 39-3 18-16 29-34 34 7-13 6-24-2-35-10-15-4-31 19-38Z"
          fill="url(#brandMarkWarm)"
          opacity="0.92"
        />
        <Path
          d="M56 22c5 16 0 29-15 39-8 5-13 12-15 21-3-15 1-28 13-38 9-8 15-14 17-22Z"
          fill={colors.backgroundWhite}
          opacity="0.88"
        />
        <Path
          d="M26 69c18-4 33-13 45-28"
          stroke="url(#brandMarkTeal)"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
          opacity="0.82"
        />
        <Path
          d="M62 59c11-6 21-5 30 3-10 8-20 8-30-3Z"
          fill="url(#brandMarkWarm)"
          opacity="0.76"
        />
        <Path
          d="M48 70c-1-10 4-18 14-23 2 11-2 18-14 23Z"
          fill="url(#brandMarkWarm)"
          opacity="0.78"
        />
      </G>
    </Svg>
  );
}
