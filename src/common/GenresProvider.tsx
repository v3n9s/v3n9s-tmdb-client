import {
  createContext,
  useContext,
  useMemo,
  type FC,
  type ReactNode,
} from "react";
import type {
  Genre,
  GenreMovieListResponseBody,
  GenreMovieListSearchParams,
} from "../types";
import { useRequest } from "./use-request";
import { getSearchParamsString } from "../utils";
import { Center, Loader, useMantineTheme } from "@mantine/core";

const genresContext = createContext(null as unknown as Genre[]);

export const useGenres = (): Genre[] => {
  return useContext(genresContext);
};

const GenresProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const theme = useMantineTheme();

  const request = useMemo(() => {
    return new Request(
      API_URL +
        "/3/genre/movie/list" +
        getSearchParamsString({
          language: "en-US",
        } satisfies GenreMovieListSearchParams),
    );
  }, []);

  const { data: genresData } = useRequest<GenreMovieListResponseBody>(request);

  return genresData ? (
    <genresContext.Provider value={genresData.genres}>
      {children}
    </genresContext.Provider>
  ) : (
    <Center h="100%">
      <Loader color={theme.other.colors.purple600} />
    </Center>
  );
};

export default GenresProvider;
