import { createBrowserRouter, redirect } from "react-router-dom";
import App from "./App";
import MoviesPage from "./MoviesPage";
import FavoritesPage from "./FavoritesPage";
import NotFoundPage from "./NotFoundPage";

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        loader: () => redirect("/movies"),
      },
      {
        path: "/movies",
        element: <MoviesPage />,
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
