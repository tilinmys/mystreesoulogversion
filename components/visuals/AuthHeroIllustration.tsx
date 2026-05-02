import { StyleSheet, View } from "react-native";
import Svg, { Circle, G, Path } from "react-native-svg";

type AuthHeroIllustrationProps = {
  height?: number;
};

export function AuthHeroIllustration({ height = 248 }: AuthHeroIllustrationProps) {
  return (
    <View pointerEvents="none" style={[styles.wrapper, { height }]}>
      <Svg width="100%" height="100%" viewBox="0 0 420 280">
        <Circle cx="286" cy="112" r="112" fill="#FFF1E8" opacity={0.9} />
        <Circle cx="102" cy="142" r="132" fill="#FFF6F1" opacity={0.86} />
        <Circle cx="352" cy="234" r="88" fill="#FFE4D6" opacity={0.26} />

        <G opacity={0.26}>
          <Path
            d="M296 62 C267 62 244 82 237 112 C232 137 243 164 266 181 C290 198 323 195 342 175 C321 170 301 155 291 135 C281 115 283 88 296 62Z"
            fill="#C46D58"
          />
          <Path
            d="M266 104 C284 80 321 71 350 88 C382 107 393 146 377 181 C361 217 323 233 287 220 C306 206 315 185 310 162 C306 141 290 120 266 104Z"
            fill="#E08D78"
          />
          <Path
            d="M241 120 C222 132 214 154 221 175 C229 198 250 212 273 211 C260 196 253 181 253 164 C253 146 259 132 241 120Z"
            fill="#E7A08D"
          />
          <Path
            d="M285 99 C272 101 260 108 253 119 C246 130 246 143 253 152 C263 166 283 165 293 151 C303 137 299 112 285 99Z"
            fill="#B85D4E"
          />
          <Path
            d="M252 153 C242 173 231 190 216 204 C244 210 272 202 288 181 C276 178 263 167 252 153Z"
            fill="#D88470"
          />
        </G>

        <G opacity={0.2} stroke="#F97316" strokeWidth={2.8} strokeLinecap="round" strokeLinejoin="round">
          <Path d="M323 66 C364 96 384 142 379 201" fill="none" />
          <Path d="M347 97 C363 84 381 82 399 91 C385 107 365 111 347 97Z" fill="#F97316" />
          <Path d="M365 127 C383 116 401 117 416 128 C399 142 381 143 365 127Z" fill="#F97316" />
          <Path d="M371 160 C389 154 405 159 417 172 C399 182 383 178 371 160Z" fill="#F97316" />
          <Path d="M331 92 C326 73 333 57 349 47 C357 67 351 83 331 92Z" fill="#F97316" />
          <Path d="M351 121 C345 101 352 85 368 74 C377 95 370 112 351 121Z" fill="#F97316" />
        </G>

        <G opacity={0.16} stroke="#F97316" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
          <Path d="M190 172 C149 170 112 185 82 218" fill="none" />
          <Path d="M146 177 C138 158 121 150 101 152 C110 172 127 181 146 177Z" fill="#F97316" />
          <Path d="M112 197 C96 184 79 183 62 193 C76 210 95 212 112 197Z" fill="#F97316" />
          <Path d="M86 220 C69 212 53 216 40 229 C58 240 76 236 86 220Z" fill="#F97316" />
        </G>
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    overflow: "visible",
  },
});
