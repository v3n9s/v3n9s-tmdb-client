import type { FC } from "react";
import { useLoaderData } from "react-router-dom";
import MovieInfo from "./MovieInfo";
import NotFoundPage from "./NotFoundPage";

const MoviePage: FC = () => {
  const data = useLoaderData() as object;

  return "success" in data && data["success"] === false ? (
    <NotFoundPage />
  ) : (
    <MovieInfo />
  );
};

export default MoviePage;
