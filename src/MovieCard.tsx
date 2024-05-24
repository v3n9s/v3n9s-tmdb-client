import {
  Anchor,
  Card,
  Flex,
  Image,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import type { FC, ReactNode } from "react";
import { Link } from "react-router-dom";
import { createPosterLink } from "./utils";
import Rating from "./Rating";
import Star from "./Star";
import type { MovieBase } from "./types";

const MovieCard: FC<{
  movie: MovieBase;
  children: ReactNode;
  isBig?: boolean | undefined;
}> = ({ movie, children, isBig = false }) => {
  const theme = useMantineTheme();

  return (
    <Card p="24" flex="400px 1 0" radius="12">
      <Flex>
        <Anchor
          component={Link}
          to={"/movies/" + String(movie.id)}
          flex={(isBig ? "250px" : "119px") + " 0 0"}
        >
          <Image
            src={createPosterLink(movie.poster_path)}
            h={isBig ? "352" : "170"}
            m="0"
          />
        </Anchor>
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
          {children}
        </Stack>
        <Star color={theme.other.colors.grey300} />
      </Flex>
    </Card>
  );
};

export default MovieCard;
