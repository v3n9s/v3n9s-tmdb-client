import { DEFAULT_THEME, createTheme, mergeMantineTheme } from "@mantine/core";
import { themeToVars } from "@mantine/vanilla-extract";

const t = createTheme({});

export const theme = mergeMantineTheme(DEFAULT_THEME, t);

export const vars = themeToVars(theme);
