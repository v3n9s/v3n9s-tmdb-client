import type { FC } from "react";
import type { MovieDiscovered } from "./types";
import MoviesListItem from "./MoviesListItem";
import { Flex } from "@mantine/core";
import { useGenres } from "./GenresProvider";
import { addGenresToMovie } from "./utils";

const MoviesList: FC<{ movies: MovieDiscovered[] }> = ({ movies }) => {
  const genres = useGenres();

  return (
    <Flex wrap="wrap" gap="16">
      {movies.map((movie) => (
        <MoviesListItem
          key={movie.id}
          movie={addGenresToMovie(movie, genres)}
        />
      ))}
    </Flex>
  );
};

export default MoviesList;
