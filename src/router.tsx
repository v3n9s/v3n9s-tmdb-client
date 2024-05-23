import { createBrowserRouter, redirect } from "react-router-dom";
import App from "./App";
import MoviesPage from "./MoviesPage";
import MoviePage from "./MoviePage";
import FavoritesPage from "./FavoritesPage";
import NotFoundPage from "./NotFoundPage";
import { getSearchParamsString } from "./utils";
import type { MovieSearchParams } from "./types";

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
        path: "/movies/:id",
        element: <MoviePage />,
        loader: ({ params }) => {
          return fetch(
            API_URL +
              "/3/movie/" +
              (params["id"] as string) +
              getSearchParamsString({
                append_to_response: "videos",
              } satisfies MovieSearchParams),
          );
        },
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
