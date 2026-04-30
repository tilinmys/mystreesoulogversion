import Svg, { Defs, LinearGradient, Path, Stop } from "react-native-svg";

import { colors } from "@/lib/design-tokens";

type PastelWavesProps = {
  width: number;
  height: number;
  opacity?: number;
};

export function PastelWaves({ width, height, opacity = 0.9 }: PastelWavesProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 430 180"
      preserveAspectRatio="none"
      style={{ opacity }}
    >
      <Defs>
        <LinearGradient id="pastelWavePeach" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor={colors.softOrange} stopOpacity="0.38" />
          <Stop offset="0.46" stopColor={colors.paleCoral} stopOpacity="0.28" />
          <Stop offset="1" stopColor={colors.lavenderMist} stopOpacity="0.18" />
        </LinearGradient>
        <LinearGradient id="pastelWaveTeal" x1="0" y1="0" x2="1" y2="0">
          <Stop offset="0" stopColor={colors.lavenderMist} stopOpacity="0.16" />
          <Stop offset="0.55" stopColor={colors.backgroundWhite} stopOpacity="0.22" />
          <Stop offset="1" stopColor={colors.softTeal} stopOpacity="0.4" />
        </LinearGradient>
        <LinearGradient id="pastelWaveLine" x1="0" y1="0" x2="1" y2="0">
          <Stop offset="0" stopColor={colors.backgroundWhite} stopOpacity="0.14" />
          <Stop offset="0.5" stopColor={colors.roseGold} stopOpacity="0.18" />
          <Stop offset="1" stopColor={colors.softTeal} stopOpacity="0.2" />
        </LinearGradient>
      </Defs>
      <Path
        d="M-20 64C44 31 86 55 132 92c56 45 110 54 174 28 58-24 91-68 144-44v104H-20Z"
        fill="url(#pastelWavePeach)"
      />
      <Path
        d="M-20 104C56 73 96 92 151 122c69 37 128 29 191-9 42-26 69-32 108-19v86H-20Z"
        fill="url(#pastelWaveTeal)"
      />
      {Array.from({ length: 7 }).map((_, index) => (
        <Path
          key={index}
          d={`M-18 ${52 + index * 8}C58 ${25 + index * 6} 98 ${60 + index * 6} 158 ${96 + index * 3}C221 ${134 + index * 2} 284 ${125 - index * 2} 448 ${68 + index * 5}`}
          stroke="url(#pastelWaveLine)"
          strokeWidth={index % 2 === 0 ? 1.15 : 0.75}
          fill="none"
          opacity={0.36 - index * 0.03}
        />
      ))}
    </Svg>
  );
}
