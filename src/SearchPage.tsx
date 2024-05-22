import { useMemo, type FC } from "react";
import MoviesList from "./MoviesList";
import {
  Center,
  Container,
  Loader,
  Text,
  useMantineTheme,
} from "@mantine/core";
import type { DiscoverMovieResponseBody } from "./types";
import { useRequest } from "./use-request";

const SearchPage: FC = () => {
  const theme = useMantineTheme();

  const request = useMemo(() => new Request(API_URL + "/3/discover/movie"), []);

  const { data: moviePageData, isError } =
    useRequest<DiscoverMovieResponseBody>(request);

  return (
    <Container fluid p="90" h="100%">
      {isError ? (
        <Center>
          <Text>smth went wrong</Text>
        </Center>
      ) : moviePageData?.results.length === 0 ? (
        <Center>
          <Text>Empty</Text>
        </Center>
      ) : moviePageData ? (
        <MoviesList movies={moviePageData.results} />
      ) : (
        <Center h="100%">
          <Loader color={theme.other.colors.purple600} />
        </Center>
      )}
    </Container>
  );
};

export default SearchPage;
