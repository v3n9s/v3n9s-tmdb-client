import { useMemo, type FC } from "react";
import MoviesListItem from "./MoviesListItem";
import type { FavoriteMovie, Movie } from "./types";
import { useRequest } from "./use-request";
import { Card, Center, Loader, useMantineTheme } from "@mantine/core";

const FavoriteMoviesListItem: FC<{ favoriteMovie: FavoriteMovie }> = ({
  favoriteMovie,
}) => {
  const theme = useMantineTheme();

  const request = useMemo(
    () => new Request(API_URL + "/3/movie/" + String(favoriteMovie.id)),
    [favoriteMovie.id],
  );

  const { data: movie } = useRequest<Movie>(request);

  return movie ? (
    <MoviesListItem movie={movie} />
  ) : (
    <Card w="482" h="218" radius="12">
      <Center h="100%">
        <Loader color={theme.other.colors.purple600} />
      </Center>
    </Card>
  );
};

export default FavoriteMoviesListItem;
