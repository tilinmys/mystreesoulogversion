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

type BrandSymbolProps = {
  size?: number;
  showAura?: boolean;
};

export function BrandSymbol({ size = 152, showAura = true }: BrandSymbolProps) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 180 180"
      accessibilityLabel="MyStree Soul brand symbol"
    >
      <Defs>
        <RadialGradient id="brandAura" cx="50%" cy="50%" r="50%">
          <Stop offset="0" stopColor={colors.backgroundWhite} stopOpacity="1" />
          <Stop offset="0.58" stopColor={colors.peachGlow} stopOpacity="0.58" />
          <Stop offset="1" stopColor={colors.warmWhite} stopOpacity="0" />
        </RadialGradient>
        <LinearGradient id="brandCoral" x1="28" y1="18" x2="154" y2="158">
          <Stop offset="0" stopColor={colors.softOrange} />
          <Stop offset="0.52" stopColor={colors.paleCoral} />
          <Stop offset="1" stopColor={colors.roseGold} />
        </LinearGradient>
        <LinearGradient id="brandTeal" x1="42" y1="132" x2="146" y2="104">
          <Stop offset="0" stopColor={colors.roseGold} />
          <Stop offset="1" stopColor={colors.softTeal} />
        </LinearGradient>
      </Defs>

      {showAura ? <Circle cx="90" cy="90" r="84" fill="url(#brandAura)" /> : null}

      <G opacity="0.98">
        <Path
          d="M82 23c15 27 6 48-23 68-22 15-31 36-26 62-18-18-25-42-18-66 6-22 22-37 47-53 11-7 17-11 20-11Z"
          fill="url(#brandCoral)"
        />
        <Path
          d="M101 25c23 23 30 51 18 82-6 17-1 30 15 43-28 8-55 0-70-19-14-17-11-40 8-58 21-20 35-34 29-48Z"
          fill="url(#brandCoral)"
          opacity="0.92"
        />
        <Path
          d="M91 38c8 23-5 42-27 61-16 14-22 31-18 51-9-21-5-43 12-62 15-17 29-29 33-50Z"
          fill={colors.warmWhite}
          opacity="0.96"
        />
        <Path
          d="M111 65c12 15 16 31 13 48 9 4 16 10 21 18-10 6-23 4-34-5-12-10-14-24-5-42 3-6 4-12 5-19Z"
          fill={colors.warmWhite}
          opacity="0.95"
        />
        <Path
          d="M76 152c22-31 50-49 86-55"
          stroke="url(#brandTeal)"
          strokeWidth="7"
          strokeLinecap="round"
          fill="none"
        />
        <Path
          d="M99 119c-2 20-10 33-24 39-5-20 3-33 24-39Z"
          fill="url(#brandCoral)"
        />
        <Path
          d="M124 111c17-15 33-18 50-9-10 18-27 22-50 9Z"
          fill="url(#brandCoral)"
          opacity="0.9"
        />
        <Path
          d="M119 137c19-9 36-7 50 6-16 14-33 12-50-6Z"
          fill="url(#brandCoral)"
          opacity="0.9"
        />
      </G>
    </Svg>
  );
}
