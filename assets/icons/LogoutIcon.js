import * as React from "react";
import Svg, { Rect, Path } from "react-native-svg";
const LogoutIcon = (props) => (
  <Svg
    width={props.width || 30}
    height={props.height || 30}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Rect width={48} height={48} fill="white" fillOpacity={0.01} />
    <Path
      d="M23.9917 6L6 6L6 42H24"
      stroke="#FF0000"
      strokeWidth={4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M33 33L42 24L33 15"
      stroke="#FF0000"
      strokeWidth={4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16 23.9917H42"
      stroke="#FF0000"
      strokeWidth={4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default LogoutIcon;
