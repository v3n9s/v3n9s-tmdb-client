import type { Genre, MovieBaseWithGenres, MovieDiscovered } from "./types";

export const getSearchParamsString = (
  ...init: ConstructorParameters<typeof URLSearchParams>
): string => {
  return "?" + new URLSearchParams(...init).toString();
};

export const createPosterLink = (path: string): string => {
  return IMAGES_URL + "/t/p/w92" + path;
};

export const formatTime = (time: number): string => {
  return (
    String(Math.floor(time / 60)) +
    "h " +
    String(time % 60).padStart(2, "0") +
    "m"
  );
};

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString("en-US", { dateStyle: "long" });
};

export const addGenresToMovie = (
  { genre_ids, ...movie }: MovieDiscovered,
  genres: Genre[],
): MovieBaseWithGenres => {
  return {
    ...movie,
    genres: genre_ids.map(
      (genreId) => genres.find((genre) => genre.id === genreId) as Genre,
    ),
  };
};
