import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { ComponentProps } from "react";


type TextTypes = "primary" | "secondary";
type Text = { text?: TextTypes }

export type IoniconsThemedProps = ComponentProps<typeof Ionicons> & Text
export type FontAwesomeThemedProps = ComponentProps<typeof FontAwesome> & Text
export type AntDesignThemedProps = ComponentProps<typeof AntDesign> & Text
