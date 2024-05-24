import type { FC } from "react";
import type { Genre, MovieBase } from "../types";
import { Text, useMantineTheme } from "@mantine/core";
import MovieCard from "./MovieCard";

const MoviesListItem: FC<{ movie: MovieBase & { genres: Genre[] } }> = ({
  movie,
}) => {
  const theme = useMantineTheme();

  const genreNames = movie.genres.map((genre) => genre.name).join(", ");

  return (
    <MovieCard movie={movie}>
      <Text c={theme.other.colors.grey600}>
        Genres
        <Text c={theme.other.colors.black} fw="500" span ms="8">
          {genreNames}
        </Text>
      </Text>
    </MovieCard>
  );
};

export default MoviesListItem;
