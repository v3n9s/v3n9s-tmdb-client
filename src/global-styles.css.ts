import { globalFontFace, globalStyle } from "@vanilla-extract/css";
import { theme } from "./theme";

globalFontFace("Inter", {
  src: "url(/Inter.ttf)",
});

globalStyle("body", {
  backgroundColor: theme.other.colors.grey300,
});
