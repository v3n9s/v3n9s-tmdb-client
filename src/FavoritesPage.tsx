import { Container, Stack, Title } from "@mantine/core";
import type { FC } from "react";
import MoviesList from "./MoviesList";
import { useFavorites } from "./FavoritesProvider";
import FavoriteMoviesListItem from "./FavoriteMovieItem";

const FavoritesPage: FC = () => {
  const { getFavorites } = useFavorites();

  return (
    <Container fluid p="90" pt="42">
      <Stack gap="40">
        <Title fz="32" lh="1.4" m="0">
          Rated movies
        </Title>
        <MoviesList>
          {getFavorites().map((favoriteMovie) => (
            <FavoriteMoviesListItem
              key={favoriteMovie.id}
              favoriteMovie={favoriteMovie}
            />
          ))}
        </MoviesList>
      </Stack>
    </Container>
  );
};

export default FavoritesPage;
