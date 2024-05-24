import { useMemo, type FC } from "react";
import { useParams } from "react-router-dom";
import MovieInfo from "./MovieInfo";
import type { MovieResponseBody, MovieSearchParams } from "../types";
import { getSearchParamsString } from "../utils";
import { useRequest } from "../common/use-request";
import { Center, Loader, Text, useMantineTheme } from "@mantine/core";

const MoviePage: FC = () => {
  const theme = useMantineTheme();

  const params = useParams();

  const request = useMemo(
    () =>
      new Request(
        API_URL +
          "/3/movie/" +
          (params["id"] as string) +
          getSearchParamsString({
            append_to_response: "videos",
          } satisfies MovieSearchParams),
      ),
    [params],
  );

  const { data: movie, isError } = useRequest<MovieResponseBody>(request);

  return isError ? (
    <Center>
      <Text>smth went wrong</Text>
    </Center>
  ) : movie && "status_message" in movie ? (
    <Center>
      <Text>{movie.status_message as string}</Text>
    </Center>
  ) : movie ? (
    <MovieInfo movie={movie} />
  ) : (
    <Center h="100%">
      <Loader color={theme.other.colors.purple600} />
    </Center>
  );
};

export default MoviePage;
