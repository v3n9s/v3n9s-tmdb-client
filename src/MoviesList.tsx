import type { FC } from "react";
import type { MovieDiscovered } from "./types";
import MoviesListItem from "./MoviesListItem";
import { Flex } from "@mantine/core";

const MoviesList: FC<{ movies: MovieDiscovered[] }> = ({ movies }) => {
  return (
    <Flex wrap="wrap" gap="16">
      {movies.map((movie) => (
        <MoviesListItem key={movie.id} movie={movie} />
      ))}
    </Flex>
  );
};

export default MoviesList;
