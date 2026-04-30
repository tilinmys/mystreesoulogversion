import Svg, { Circle, Defs, Ellipse, G, LinearGradient, Path, RadialGradient, Stop } from "react-native-svg";

import { colors } from "@/lib/design-tokens";

type AuraHeroProps = {
  width?: number;
  height?: number;
};

export function AuraHero({ width = 320, height = 240 }: AuraHeroProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 320 240" accessibilityLabel="Soft abstract aura">
      <Defs>
        <RadialGradient id="auraHeroGlow" cx="50%" cy="42%" r="58%">
          <Stop offset="0" stopColor={colors.backgroundWhite} stopOpacity="0.98" />
          <Stop offset="0.48" stopColor={colors.peachGlow} stopOpacity="0.5" />
          <Stop offset="0.78" stopColor={colors.lavenderMist} stopOpacity="0.22" />
          <Stop offset="1" stopColor={colors.warmWhite} stopOpacity="0" />
        </RadialGradient>
        <LinearGradient id="auraHeroRibbon" x1="24" y1="178" x2="296" y2="112">
          <Stop offset="0" stopColor={colors.paleCoral} stopOpacity="0.42" />
          <Stop offset="0.52" stopColor={colors.lavenderMist} stopOpacity="0.36" />
          <Stop offset="1" stopColor={colors.softTeal} stopOpacity="0.44" />
        </LinearGradient>
        <LinearGradient id="auraHeroWarm" x1="80" y1="26" x2="232" y2="170">
          <Stop offset="0" stopColor={colors.softOrange} stopOpacity="0.82" />
          <Stop offset="1" stopColor={colors.paleCoral} stopOpacity="0.66" />
        </LinearGradient>
      </Defs>

      <Circle cx="160" cy="106" r="106" fill="url(#auraHeroGlow)" />
      <G opacity="0.78">
        <Ellipse cx="154" cy="120" rx="86" ry="94" fill={colors.warmWhite} />
        <Path
          d="M160 42c26 19 39 43 37 72-2 34-23 59-60 74 12-24 9-42-7-62-22-28-12-63 30-84Z"
          fill="url(#auraHeroWarm)"
          opacity="0.44"
        />
        <Path
          d="M178 64c4 26-7 47-34 64-16 10-26 24-30 43-8-32 1-58 26-78 18-14 30-24 38-29Z"
          fill={colors.backgroundWhite}
          opacity="0.82"
        />
      </G>
      <Path
        d="M8 174c54-34 104-37 151-9 50 30 100 28 153-5v46c-58 30-111 30-159 1-43-25-91-22-145 12v-45Z"
        fill="url(#auraHeroRibbon)"
      />
      <Path
        d="M18 165c52-24 96-24 135 1 47 30 96 31 149 2"
        stroke={colors.backgroundWhite}
        strokeOpacity="0.42"
        strokeWidth="1.4"
        fill="none"
      />
      <Circle cx="74" cy="64" r="3" fill={colors.backgroundWhite} opacity="0.84" />
      <Circle cx="242" cy="82" r="2.5" fill={colors.backgroundWhite} opacity="0.8" />
      <Circle cx="214" cy="178" r="2.5" fill={colors.backgroundWhite} opacity="0.78" />
    </Svg>
  );
}
