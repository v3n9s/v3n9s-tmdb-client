import {
  Button,
  Center,
  Container,
  Image,
  Pagination,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useState, type FC } from "react";
import MoviesList from "./MoviesList";
import { useFavorites } from "./FavoritesProvider";
import FavoriteMoviesListItem from "./FavoriteMovieItem";
import { Link } from "react-router-dom";

const FavoritesPage: FC = () => {
  const elementsPerPage = 4;

  const theme = useMantineTheme();

  const { getFavorites } = useFavorites();

  const favorites = getFavorites();

  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(favorites.length / elementsPerPage);

  const currentPageFavorites = favorites.slice(
    elementsPerPage * (page - 1),
    elementsPerPage * page,
  );

  return (
    <Container fluid p="90" pt="42">
      {favorites.length ? (
        <Stack gap="40">
          <Title fz="32" lh="1.4" m="0">
            Rated movies
          </Title>
          <Stack>
            <MoviesList>
              {currentPageFavorites.map((favoriteMovie) => (
                <FavoriteMoviesListItem
                  key={favoriteMovie.id}
                  favoriteMovie={favoriteMovie}
                />
              ))}
            </MoviesList>
            <Pagination
              total={totalPages}
              siblings={2}
              color={theme.other.colors.purple500}
              value={page}
              onChange={setPage}
              style={{ alignSelf: "center" }}
            />
          </Stack>
        </Stack>
      ) : (
        <Center h="720">
          <Stack align="center" gap="16">
            <Image src="/favorites-empty.svg" w="400" h="300" m="0" />
            <Text fz="20" lh="1.1" fw="700">
              You haven&apos;t rated any films yet
            </Text>
            <Button
              component={Link}
              to="/movies"
              bg={theme.other.colors.purple500}
              c={theme.other.colors.white}
              h="40"
              mt="0"
              radius="8"
              fw="400"
              td="none"
            >
              Find movies
            </Button>
          </Stack>
        </Center>
      )}
    </Container>
  );
};

export default FavoritesPage;
