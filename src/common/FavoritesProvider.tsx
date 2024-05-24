import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type FC,
  type ReactNode,
} from "react";
import type { FavoriteMovie } from "../types";

type FavoritesContext = [FavoriteMovie[], Dispatch<FavoriteMovie[]>];

const favoritesContext = createContext(null as unknown as FavoritesContext);

export const useFavorites = (): {
  getFavorites: () => FavoriteMovie[];
  addToFavorites: (arg: FavoriteMovie) => void;
  removeFromFavorites: (arg: FavoriteMovie) => void;
} => {
  const [favorites, setFavorites] = useContext(favoritesContext);

  const getFavorites = (): FavoriteMovie[] => {
    return favorites;
  };

  const addToFavorites = (movie: FavoriteMovie): void => {
    setFavorites([...favorites, movie]);
  };

  const removeFromFavorites = ({ id }: FavoriteMovie): void => {
    setFavorites(favorites.filter((movie) => movie.id !== id));
  };

  return { getFavorites, addToFavorites, removeFromFavorites };
};

const FavoritesProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<FavoriteMovie[]>(() => {
    try {
      return (JSON.parse(String(localStorage.getItem("favoriteMovies"))) ??
        []) as FavoriteMovie[];
    } catch {
      return [];
    }
  });

  const setFavoritesAdvanced = (movies: FavoriteMovie[]): void => {
    try {
      localStorage.setItem("favoriteMovies", JSON.stringify(movies));
      setFavorites(movies);
    } catch {}
  };

  return (
    <favoritesContext.Provider value={[favorites, setFavoritesAdvanced]}>
      {children}
    </favoritesContext.Provider>
  );
};

export default FavoritesProvider;
