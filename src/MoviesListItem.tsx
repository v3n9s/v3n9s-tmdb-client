import type { FC } from "react";
import type { MovieDiscovered } from "./types";
import { Card, Flex, Image, Stack, Text, useMantineTheme } from "@mantine/core";
import Star from "./Star";
import { useGenres } from "./GenresProvider";
import { createPosterLink } from "./utils";
import Rating from "./Rating";
import { Link } from "react-router-dom";

const MoviesListItem: FC<{ movie: MovieDiscovered }> = ({ movie }) => {
  const theme = useMantineTheme();

  const genres = useGenres();

  const genreNames = movie.genre_ids
    .map((id) => genres.find(({ id: i }) => i === id)?.name ?? "unknown")
    .join(", ");

  return (
    <Card p="24" flex="400px 1 0" radius="12">
      <Flex>
        <Link to={"/movies/" + String(movie.id)}>
          <Image
            src={createPosterLink(movie.poster_path)}
            h="170"
            flex="119px 0 0"
            m="0"
          />
        </Link>
        <Stack justify="space-between" flex="200px 1 0" ml="16">
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
              {movie.release_date.slice(0, 4)}
            </Text>
            <Rating
              vote_average={movie.vote_average}
              vote_count={movie.vote_count}
            />
          </Stack>
          <Text c={theme.other.colors.grey600}>
            Genres
            <Text c={theme.other.colors.black} fw="500" span ms="8">
              {genreNames}
            </Text>
          </Text>
        </Stack>
        <Star color={theme.other.colors.grey300} />
      </Flex>
    </Card>
  );
};

export default MoviesListItem;
