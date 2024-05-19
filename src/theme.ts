import { DEFAULT_THEME, createTheme, mergeMantineTheme } from "@mantine/core";
import { themeToVars } from "@mantine/vanilla-extract";

const other = {
  colors: {
    yellow: "#fab005",
    purple100: "#f2ecfa",
    purple200: "#e5d5fa",
    purple300: "#d1b4f8",
    purple400: "#bd93f7",
    purple500: "#9854f6",
    purple600: "#541f9d",
    white: "#ffffff",
    grey100: "#f5f5f6",
    grey200: "#eaebed",
    grey300: "#d5d6dc",
    grey500: "#acadb9",
    grey600: "#7b7c88",
    black: "#232134",
  },
};

type Other = typeof other;

const t = createTheme({
  fontFamily: "Inter",
  other,
});

export const theme = mergeMantineTheme(DEFAULT_THEME, t);

export const vars = themeToVars(theme);

declare module "@mantine/core" {
  export interface MantineThemeOther extends Other {}
}
