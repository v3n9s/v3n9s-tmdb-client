import { useMemo, useState, type ChangeEvent, type FC } from "react";
import MoviesList from "./MoviesList";
import {
  Button,
  Center,
  Container,
  Flex,
  Loader,
  NativeSelect,
  NumberInput,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import type {
  DiscoverMovieResponseBody,
  DiscoverMovieSearchParams,
} from "./types";
import { useRequest } from "./use-request";
import MoviesListItem from "./MoviesListItem";
import { addGenresToMovie, getSearchParamsString } from "./utils";
import { useGenres } from "./GenresProvider";
import { inputLabelClass } from "./movies-page.css";
import { useDebouncedCallback } from "@mantine/hooks";

type SearchParams = {
  [K in keyof DiscoverMovieSearchParams]?: string;
};

const MoviesPage: FC = () => {
  const theme = useMantineTheme();

  const genres = useGenres();

  const genreSelectValues = [
    { label: "Select genre", value: "" },
    ...genres.map((v) => ({
      label: v.name,
      value: String(v.id),
    })),
  ];

  const sortBySelectValues = [
    { label: "", value: "" },
    { label: "Title ascending", value: "original_title.asc" },
    { label: "Title descending", value: "original_title.desc" },
    { label: "Popularity ascending", value: "popularity.asc" },
    { label: "Popularity descending", value: "popularity.desc" },
    { label: "Revenue ascending", value: "revenue.asc" },
    { label: "Revenue descending", value: "revenue.desc" },
    { label: "Title ascending", value: "title.asc" },
    { label: "Title descending", value: "title.desc" },
    { label: "Year ascending", value: "primary_release_date.asc" },
    { label: "Year descending", value: "primary_release_date.desc" },
    { label: "Vote ascending", value: "vote_average.asc" },
    { label: "Vote descending", value: "vote_average.desc" },
    { label: "Vote count ascending", value: "vote_count.asc" },
    { label: "Vote count descending", value: "vote_count.desc" },
  ];

  const [searchParams, setSearchParams] = useState<SearchParams>({});

  const setSearchParamsDebounced = useDebouncedCallback(setSearchParams, 500);

  const handleValueChange = (
    prev: SearchParams,
    key: string,
    value: string,
  ): SearchParams => {
    if (value) {
      return { ...prev, [key]: value };
    }
    return Object.fromEntries(
      Object.entries(prev).filter(([itemKey]) => itemKey !== key),
    );
  };

  const request = useMemo(
    () =>
      new Request(
        API_URL + "/3/discover/movie" + getSearchParamsString(searchParams),
      ),
    [searchParams],
  );

  const { data: moviePageData, isError } =
    useRequest<DiscoverMovieResponseBody>(request);

  const createSelectOnChangeHandler =
    (key: string) => (e: ChangeEvent<HTMLSelectElement>) => {
      setSearchParams((prev) => handleValueChange(prev, key, e.target.value));
    };

  const createNumberOnChangeHandler =
    (key: string) => (value: string | number) => {
      setSearchParamsDebounced((prev) =>
        handleValueChange(prev, key, String(value)),
      );
    };

  return (
    <Container fluid p="90" pt="42">
      <Title fz="32" lh="1.4">
        Movies
      </Title>
      <Stack gap="24" mt="40" mb="24">
        <Flex gap="16">
          <NativeSelect
            label="Genres"
            size="md"
            radius="8"
            flex="100px 1 0"
            classNames={{ label: inputLabelClass }}
            data={genreSelectValues}
            onChange={createSelectOnChangeHandler("with_genres")}
          />
          <NumberInput
            label="Release year"
            size="md"
            radius="8"
            flex="100px 1 0"
            classNames={{ label: inputLabelClass }}
            onChange={createNumberOnChangeHandler("primary_release_year")}
          />
          <Flex gap="8" flex="100px 1 0" align="end">
            <NumberInput
              label="Ratings"
              size="md"
              radius="8"
              min={0}
              max={10}
              classNames={{ label: inputLabelClass }}
              onChange={createNumberOnChangeHandler("vote_average.gte")}
            />
            <NumberInput
              size="md"
              radius="8"
              min={0}
              max={10}
              classNames={{ label: inputLabelClass }}
              onChange={createNumberOnChangeHandler("vote_average.lte")}
            />
          </Flex>
          <Button
            variant="transparent"
            p="0"
            h="42"
            c={theme.other.colors.grey600}
            style={{ alignSelf: "end" }}
            onClick={() => {
              setSearchParams({});
            }}
          >
            Reset filters
          </Button>
        </Flex>
        <NativeSelect
          label="Sort by"
          size="md"
          radius="8"
          w="284px"
          style={{ alignSelf: "end" }}
          classNames={{ label: inputLabelClass }}
          data={sortBySelectValues}
          onChange={createSelectOnChangeHandler("sort_by")}
        />
      </Stack>
      {isError ? (
        <Center>
          <Text>smth went wrong</Text>
        </Center>
      ) : moviePageData?.results.length === 0 ? (
        <Center>
          <Text>Empty</Text>
        </Center>
      ) : moviePageData ? (
        <MoviesList>
          {moviePageData.results.map((movie) => (
            <MoviesListItem
              key={movie.id}
              movie={addGenresToMovie(movie, genres)}
            />
          ))}
        </MoviesList>
      ) : (
        <Center h="100%">
          <Loader color={theme.other.colors.purple600} />
        </Center>
      )}
    </Container>
  );
};

export default MoviesPage;
