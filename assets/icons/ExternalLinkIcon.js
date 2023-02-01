import * as React from "react";
import Svg, { Path } from "react-native-svg";
const ExternalLinkIcon = (props) => (
  <Svg
    width={props.width || 30}
    height={props.height || 30}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M11 4H4V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V13"
      stroke="#3366CC"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
    <Path
      d="M9 15L20 4"
      stroke="#3366CC"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
    <Path
      d="M15 4H20V9"
      stroke="#3366CC"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
  </Svg>
);
export default ExternalLinkIcon;
