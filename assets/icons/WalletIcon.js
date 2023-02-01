import * as React from "react";
import Svg, {
  Path,
  Polygon,
  Circle,
  Rect,
  Polyline,
  G,
} from "react-native-svg";
const WalletIcon = (props) => (
  <Svg
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    height={props.height || 30}
    width={props.width || 30}
    viewBox="0 0 496 496"
    style={{
      enableBackground: "new 0 0 496 496",
    }}
    xmlSpace="preserve"
    {...props}
  >
    <Path
      style={{
        fill: "#C67217",
      }}
      d="M456,56H68.8C39.2,56,16,79.2,16,108l0,0c0,28.8,23.2,52,52.8,52H456"
    />
    <Path
      style={{
        fill: "#FCA12A",
      }}
      d="M456,56v104H68.8C40,160,16,136,16,104l0,0v336l0,0c0,32,24,56,52.8,56H456V392l0,0v-28.8v-40v-65.6 V56L456,56z"
    />
    <Path
      style={{
        fill: "#C67217",
      }}
      d="M454.4,204c14.4,0,25.6,12,25.6,25.6l0,0c0,14.4-11.2,25.6-25.6,25.6"
    />
    <Polygon
      style={{
        fill: "#EF861D",
      }}
      points="456,392 456,392 456,363.2 456,344.8 280.8,345.6 264.8,396.8 362.4,496 456,496 "
    />
    <Path
      style={{
        fill: "#F4DBA8",
      }}
      d="M264,256h190.4c14.4,0,25.6-11.2,25.6-25.6l0,0v140v1.6c0,14.4-12,28-25.6,28H264v-56l0,0v-12.8v4.8 v-32"
    />
    <Path
      style={{
        fill: "#E5BD76",
      }}
      d="M453.6,258.4c14.4,0,25.6-12.8,25.6-26.4v-0.8v140v1.6c0,14.4-12,28-25.6,28H264v-56l0,0V332v68"
    />
    <Circle
      style={{
        fill: "#3CC676",
      }}
      cx={328}
      cy={327.2}
      r={32.8}
    />
    <Path
      style={{
        fill: "#0AA06E",
      }}
      d="M354.4,308c11.2,14.4,8,34.4-6.4,45.6s-34.4,8-45.6-6.4"
    />
    <Path
      style={{
        fill: "#A0520B",
      }}
      d="M456,120H92.8c-9.6,0-16.8-6.4-16.8-16l0,0c0-9.6,8-16,16.8-16H456"
    />
    <Rect
      x={112}
      style={{
        fill: "#3CC676",
      }}
      width={248}
      height={120}
    />
    <Polyline
      style={{
        fill: "#2EAF62",
      }}
      points="360,0 360,120 112,120 "
    />
    <Rect
      x={144}
      y={32}
      style={{
        fill: "#0AA06E",
      }}
      width={184}
      height={88}
    />
    <Polyline
      style={{
        fill: "#078457",
      }}
      points="328,32 328,120 144,120 "
    />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
  </Svg>
);
export default WalletIcon;
