import Svg, { Circle, Defs, G, LinearGradient, Path, RadialGradient, Stop } from "react-native-svg";

import { colors } from "@/lib/design-tokens";

type PrivacyAuraProps = {
  width?: number;
  height?: number;
};

export function PrivacyAura({ width = 300, height = 230 }: PrivacyAuraProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 300 230" accessibilityLabel="Private health aura">
      <Defs>
        <RadialGradient id="privacyAuraGlow" cx="50%" cy="47%" r="58%">
          <Stop offset="0" stopColor={colors.backgroundWhite} stopOpacity="1" />
          <Stop offset="0.54" stopColor={colors.peachGlow} stopOpacity="0.48" />
          <Stop offset="1" stopColor={colors.warmWhite} stopOpacity="0" />
        </RadialGradient>
        <LinearGradient id="privacyAuraShield" x1="80" y1="34" x2="216" y2="190">
          <Stop offset="0" stopColor={colors.softOrange} />
          <Stop offset="0.55" stopColor={colors.paleCoral} />
          <Stop offset="1" stopColor={colors.roseGold} />
        </LinearGradient>
        <LinearGradient id="privacyAuraRing" x1="54" y1="186" x2="248" y2="52">
          <Stop offset="0" stopColor={colors.softTeal} stopOpacity="0.58" />
          <Stop offset="1" stopColor={colors.lavenderMist} stopOpacity="0.74" />
        </LinearGradient>
      </Defs>

      <Circle cx="150" cy="112" r="104" fill="url(#privacyAuraGlow)" />
      <Circle
        cx="150"
        cy="112"
        r="82"
        stroke="url(#privacyAuraRing)"
        strokeWidth="8"
        strokeOpacity="0.3"
        fill="none"
      />
      <G opacity="0.92">
        <Path
          d="M150 52c23 15 46 22 68 20 2 55-20 91-68 108-48-17-70-53-68-108 22 2 45-5 68-20Z"
          fill="url(#privacyAuraShield)"
          opacity="0.72"
        />
        <Path
          d="M150 72c16 10 31 15 47 15 0 37-15 60-47 73-32-13-47-36-47-73 16 0 31-5 47-15Z"
          fill={colors.backgroundWhite}
          opacity="0.86"
        />
        <Path
          d="M126 118c12 12 25 19 40 22 12-19 23-38 34-57"
          stroke={colors.primaryOrange}
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.68"
        />
      </G>
      <Circle cx="84" cy="68" r="3" fill={colors.backgroundWhite} opacity="0.86" />
      <Circle cx="226" cy="76" r="2.5" fill={colors.backgroundWhite} opacity="0.8" />
      <Circle cx="92" cy="168" r="2.5" fill={colors.backgroundWhite} opacity="0.72" />
    </Svg>
  );
}
