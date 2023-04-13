import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { ComponentProps } from "react";


type TextTypes = "primary" | "secondary";

export type IoniconsThemedProps = ComponentProps<typeof Ionicons> & { text?: TextTypes };
export type FontAwesomeThemedProps = ComponentProps<typeof FontAwesome> & { text?: TextTypes };
