

declare module "*.svg" {
  import React from 'react';
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
};

declare module "*.png" {
  // import { ImageSourcePropType } from 'react-native';
  import { Source } from "react-native-fast-image"
  const value: Source;
  export default value;
}
declare module '@env' {
  export const API_TOKEN: string;
}
