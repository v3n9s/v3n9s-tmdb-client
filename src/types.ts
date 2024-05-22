declare global {
  const API_URL: string;
  const IMAGES_URL: string;
}

type ProductionCompany = {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
};

type Video = {
  key: string;
  site: string;
  type: string;
  official: boolean;
};

export type MovieBase = {
  id: number;
  original_title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
};

export type MovieBaseWithGenres = MovieBase & { genres: Genre[] };

export type Movie = MovieBaseWithGenres & {
  runtime: number;
  budget: number;
  revenue: number;
  overview: string;
  production_companies: ProductionCompany[];
  videos: { results: Video[] };
};

export type MovieDiscovered = MovieBase & {
  genre_ids: number[];
};

export type Genre = {
  id: number;
  name: string;
};

export type DiscoverMovieSearchParams = {
  language?: string;
  page?: number;
  primary_release_year?: number;
  sort_by?: string;
  "vote_average.gte"?: number;
  "vote_average.lte"?: number;
  with_genres?: string;
};

export type DiscoverMovieResponseBody = {
  page: number;
  results: MovieDiscovered[];
  total_pages: number;
  total_results: number;
};

export type MovieSearchParams = {
  append_to_response?: string;
  language?: string;
};

export type MovieResponseBody = Movie;

export type GenreMovieListSearchParams = {
  language?: string;
};

export type GenreMovieListResponseBody = {
  genres: Genre[];
};
