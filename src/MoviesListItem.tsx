import type { FC } from "react";
import type { MovieDiscovered } from "./types";
import { Card, Flex, Image, Stack, Text, useMantineTheme } from "@mantine/core";
import Star from "./Star";
import { useGenres } from "./GenresProvider";
import { createPosterLink } from "./utils";

const MoviesListItem: FC<{ movie: MovieDiscovered }> = ({ movie }) => {
  const theme = useMantineTheme();

  const genres = useGenres();

  const genreNames = movie.genre_ids
    .map((id) => genres.find(({ id: i }) => i === id)?.name ?? "unknown")
    .join(", ");

  return (
    <Card p="24" flex="400px 1 0" radius="12">
      <Flex>
        <Image
          src={createPosterLink(movie.poster_path)}
          h="170"
          flex="119px 0 0"
          m="0"
        />
        <Stack justify="space-between" flex="200px 1 0" ml="16">
          <Stack justify="start" gap="0">
            <Text
              c={theme.other.colors.purple500}
              fz="20"
              fw="600"
              lh="1.2"
              m="0"
            >
              {movie.original_title}
            </Text>
            <Text c={theme.other.colors.grey600} m="0" mt="6">
              {movie.release_date.slice(0, 4)}
            </Text>
            <Flex align="center" mt="5">
              <Star color={theme.other.colors.yellow} />
              <Text span fw="600" lh="1.5" ms="4">
                {movie.vote_average}
              </Text>
              <Text span c={theme.other.colors.grey600} lh="1.5" ms="8">
                ({movie.vote_count})
              </Text>
            </Flex>
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
