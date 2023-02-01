import * as React from "react";
import Svg, { G, Line, Polygon, Polyline } from "react-native-svg";
const ReceiptIcon = (props) => (
  <Svg
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    width={props.width || 30}
    height={props.height || 30}
    viewBox="0 0 64 64"
    enableBackground="new 0 0 64 64"
    xmlSpace="preserve"
    {...props}
  >
    <G>
      <Line
        fill="none"
        stroke="#FFA500"
        strokeWidth={2}
        strokeMiterlimit={10}
        x1={32}
        y1={14.999}
        x2={46}
        y2={14.999}
      />
      <Line
        fill="none"
        stroke="#FFA500"
        strokeWidth={2}
        strokeMiterlimit={10}
        x1={18}
        y1={23.999}
        x2={46}
        y2={23.999}
      />
      <Line
        fill="none"
        stroke="#FFA500"
        strokeWidth={2}
        strokeMiterlimit={10}
        x1={18}
        y1={33.999}
        x2={46}
        y2={33.999}
      />
      <Line
        fill="none"
        stroke="#FFA500"
        strokeWidth={2}
        strokeMiterlimit={10}
        x1={18}
        y1={43.999}
        x2={46}
        y2={43.999}
      />
      <Line
        fill="none"
        stroke="#FFA500"
        strokeWidth={2}
        strokeMiterlimit={10}
        x1={18}
        y1={53.999}
        x2={46}
        y2={53.999}
      />
    </G>
    <G>
      <Polygon
        fill="none"
        stroke="#FFA500"
        strokeWidth={2}
        strokeMiterlimit={10}
        points="52,62.999 52,0.999 26,0.999 12,14.999  12,63 16,61 20,63 24,61 28,63 32,61 36,63 40,61 44,63 48,61  "
      />
      <Polyline
        fill="none"
        stroke="#FFA500"
        strokeWidth={2}
        strokeMiterlimit={10}
        points="12,14.999 26,14.999 26,0.999  "
      />
    </G>
  </Svg>
);
export default ReceiptIcon;
