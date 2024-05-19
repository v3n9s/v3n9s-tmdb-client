import { createBrowserRouter, redirect } from "react-router-dom";
import App from "./App";
import SearchPage from "./SearchPage";
import FavoritesPage from "./FavoritesPage";
import NotFoundPage from "./NotFoundPage";

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
        element: <SearchPage />,
      },
      {
        path: "/favorites",
        element: <FavoritesPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
        handle: {
          hideNavbar: true,
        },
      },
    ],
  },
]);
