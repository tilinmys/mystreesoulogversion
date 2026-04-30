import Svg, { Circle, Defs, RadialGradient, Stop } from "react-native-svg";

import { colors } from "@/lib/design-tokens";

type AuraBlobProps = {
  size?: number;
  opacity?: number;
};

export function AuraBlob({ size = 220, opacity = 0.72 }: AuraBlobProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 220 220" style={{ opacity }}>
      <Defs>
        <RadialGradient id="auraBlobGradient" cx="50%" cy="50%" r="50%">
          <Stop offset="0" stopColor={colors.backgroundWhite} stopOpacity="1" />
          <Stop offset="0.45" stopColor={colors.peachGlow} stopOpacity="0.6" />
          <Stop offset="0.72" stopColor={colors.lavenderMist} stopOpacity="0.22" />
          <Stop offset="1" stopColor={colors.softTeal} stopOpacity="0" />
        </RadialGradient>
      </Defs>
      <Circle cx="110" cy="110" r="108" fill="url(#auraBlobGradient)" />
    </Svg>
  );
}
