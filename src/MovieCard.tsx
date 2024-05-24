import {
  Anchor,
  Box,
  Card,
  Flex,
  Image,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import type { FC, ReactNode } from "react";
import { Link } from "react-router-dom";
import { createImageLink } from "./utils";
import Rating from "./Rating";
import Star from "./Star";
import type { MovieBase } from "./types";
import { useFavorites } from "./FavoritesProvider";
import { starBoxClass } from "./movie-card.css";

const MovieCard: FC<{
  movie: MovieBase;
  children: ReactNode;
  isBig?: boolean | undefined;
}> = ({ movie, children, isBig = false }) => {
  const theme = useMantineTheme();

  const { getFavorites, addToFavorites, removeFromFavorites } = useFavorites();

  const isFavorite = getFavorites().some(
    (favoriteMovie) => favoriteMovie.id === movie.id,
  );

  return (
    <Card p="24" flex={isBig ? undefined : "482px 0 0"} radius="12">
      <Flex gap="8">
        <Anchor
          component={Link}
          to={"/movies/" + String(movie.id)}
          flex={(isBig ? "250px" : "119px") + " 0 0"}
        >
          <Image
            src={
              movie.poster_path !== null
                ? createImageLink(movie.poster_path)
                : "/no-poster.svg"
            }
            h={isBig ? "352" : "170"}
            m="0"
          />
        </Anchor>
        <Stack justify="space-between" flex="200px 1 0" ml="8">
          <Stack justify="start" gap="6">
            <Text
              component={Link}
              to={"/movies/" + String(movie.id)}
              c={theme.other.colors.purple500}
              fz="20"
              fw="600"
              lh="1.2"
              td="none"
              m="0"
            >
              {movie.original_title}
            </Text>
            <Text c={theme.other.colors.grey600} m="0">
              {movie.release_date?.slice(0, 4)}
            </Text>
            <Rating
              vote_average={movie.vote_average}
              vote_count={movie.vote_count}
            />
          </Stack>
          {children}
        </Stack>
        <Box
          className={starBoxClass}
          onClick={() => {
            (isFavorite ? removeFromFavorites : addToFavorites)({
              id: movie.id,
            });
          }}
        >
          <Star
            color={
              isFavorite
                ? theme.other.colors.purple500
                : theme.other.colors.grey300
            }
          />
        </Box>
      </Flex>
    </Card>
  );
};

export default MovieCard;
