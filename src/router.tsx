import { createBrowserRouter, redirect } from "react-router-dom";
import App from "./App";

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        loader: () => redirect("/search"),
      },
      {
        path: "/search",
      },
      {
        path: "/favorites",
      },
      {
        path: "*",
        handle: {
          hideNavbar: true,
        },
      },
    ],
  },
]);
