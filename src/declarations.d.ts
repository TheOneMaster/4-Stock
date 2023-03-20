declare module "*.svg" {
  import React from 'react';
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
};

declare module "*.png" {
  import { ImageSourcePropType } from 'react-native';
  const value: ImageSourcePropType;
  export default value;
}
declare module '@env' {
  export const API_TOKEN: string;
  export const USER_ID: string;
}
