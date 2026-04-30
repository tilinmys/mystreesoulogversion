import Svg, { Circle, Defs, Ellipse, G, LinearGradient, Path, RadialGradient, Stop } from "react-native-svg";

import { colors } from "@/lib/design-tokens";

type BloopAuraProps = {
  width?: number;
  height?: number;
};

export function BloopAura({ width = 300, height = 230 }: BloopAuraProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 300 230" accessibilityLabel="Bloop supportive aura">
      <Defs>
        <RadialGradient id="bloopAuraGlow" cx="50%" cy="45%" r="60%">
          <Stop offset="0" stopColor={colors.backgroundWhite} stopOpacity="0.98" />
          <Stop offset="0.5" stopColor={colors.lavenderMist} stopOpacity="0.48" />
          <Stop offset="0.84" stopColor={colors.peachGlow} stopOpacity="0.26" />
          <Stop offset="1" stopColor={colors.warmWhite} stopOpacity="0" />
        </RadialGradient>
        <LinearGradient id="bloopAuraOrb" x1="92" y1="50" x2="208" y2="176">
          <Stop offset="0" stopColor={colors.primaryOrange} />
          <Stop offset="0.58" stopColor={colors.paleCoral} />
          <Stop offset="1" stopColor={colors.softTeal} />
        </LinearGradient>
      </Defs>

      <Circle cx="150" cy="112" r="104" fill="url(#bloopAuraGlow)" />
      <G opacity="0.9">
        <Circle cx="150" cy="108" r="58" fill="url(#bloopAuraOrb)" opacity="0.68" />
        <Circle cx="150" cy="108" r="42" fill={colors.backgroundWhite} opacity="0.92" />
        <Ellipse cx="132" cy="104" rx="7" ry="9" fill={colors.primaryOrange} opacity="0.74" />
        <Ellipse cx="168" cy="104" rx="7" ry="9" fill={colors.primaryOrange} opacity="0.74" />
        <Path
          d="M132 130c12 10 25 10 37 0"
          stroke={colors.paleCoral}
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
          opacity="0.78"
        />
      </G>
      <Path
        d="M76 154c39-19 69-20 91-4 20 15 41 14 63-2"
        stroke={colors.softTeal}
        strokeOpacity="0.38"
        strokeWidth="7"
        strokeLinecap="round"
        fill="none"
      />
      <Circle cx="78" cy="70" r="3" fill={colors.backgroundWhite} opacity="0.86" />
      <Circle cx="224" cy="76" r="2.5" fill={colors.backgroundWhite} opacity="0.82" />
      <Circle cx="210" cy="160" r="3" fill={colors.backgroundWhite} opacity="0.72" />
    </Svg>
  );
}
