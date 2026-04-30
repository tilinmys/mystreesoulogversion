import Svg, { Circle, Defs, G, LinearGradient, Path, RadialGradient, Stop } from "react-native-svg";

import { colors } from "@/lib/design-tokens";

type CycleAuraProps = {
  width?: number;
  height?: number;
};

export function CycleAura({ width = 300, height = 230 }: CycleAuraProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 300 230" accessibilityLabel="Cycle rhythm aura">
      <Defs>
        <RadialGradient id="cycleAuraGlow" cx="50%" cy="46%" r="58%">
          <Stop offset="0" stopColor={colors.backgroundWhite} stopOpacity="1" />
          <Stop offset="0.52" stopColor={colors.peachGlow} stopOpacity="0.42" />
          <Stop offset="1" stopColor={colors.warmWhite} stopOpacity="0" />
        </RadialGradient>
        <LinearGradient id="cycleAuraWarm" x1="68" y1="42" x2="220" y2="184">
          <Stop offset="0" stopColor={colors.softOrange} />
          <Stop offset="0.52" stopColor={colors.paleCoral} />
          <Stop offset="1" stopColor={colors.roseGold} />
        </LinearGradient>
        <LinearGradient id="cycleAuraCool" x1="70" y1="176" x2="230" y2="54">
          <Stop offset="0" stopColor={colors.softTeal} />
          <Stop offset="1" stopColor={colors.lavenderMist} />
        </LinearGradient>
      </Defs>

      <Circle cx="150" cy="112" r="104" fill="url(#cycleAuraGlow)" />
      <G opacity="0.88">
        <Circle
          cx="150"
          cy="112"
          r="68"
          stroke={colors.peachGlow}
          strokeWidth="18"
          strokeOpacity="0.72"
          fill="none"
        />
        <Path
          d="M150 44a68 68 0 0 1 65 49"
          stroke="url(#cycleAuraWarm)"
          strokeWidth="18"
          strokeLinecap="round"
          fill="none"
        />
        <Path
          d="M215 130a68 68 0 0 1-92 42"
          stroke="url(#cycleAuraCool)"
          strokeWidth="18"
          strokeLinecap="round"
          fill="none"
          opacity="0.72"
        />
        <Circle cx="213" cy="94" r="9" fill={colors.backgroundWhite} />
        <Circle cx="213" cy="94" r="6" fill={colors.primaryOrange} opacity="0.82" />
        <Circle cx="150" cy="112" r="42" fill={colors.backgroundWhite} opacity="0.9" />
        <Path
          d="M132 114c9-17 21-29 37-36-2 20-14 33-37 36Z"
          fill="url(#cycleAuraWarm)"
          opacity="0.72"
        />
        <Path
          d="M137 133c18-7 34-6 48 5-18 10-34 8-48-5Z"
          fill="url(#cycleAuraCool)"
          opacity="0.58"
        />
      </G>
      <Circle cx="82" cy="72" r="2.5" fill={colors.backgroundWhite} opacity="0.82" />
      <Circle cx="226" cy="162" r="2.5" fill={colors.backgroundWhite} opacity="0.74" />
    </Svg>
  );
}
