import "@mantine/core/styles.css";
import "./styles/global-styles.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MantineProvider, TypographyStylesProvider } from "@mantine/core";
import { theme } from "./theme";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

const root = document.querySelector("#root");

if (root) {
  createRoot(root).render(
    <StrictMode>
      <MantineProvider theme={theme}>
        <TypographyStylesProvider>
          <RouterProvider router={router} />
        </TypographyStylesProvider>
      </MantineProvider>
    </StrictMode>,
  );
} else {
  console.error("unable to render react app to root element");
}
