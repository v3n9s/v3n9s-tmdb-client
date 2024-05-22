export const getSearchParamsString = (
  ...init: ConstructorParameters<typeof URLSearchParams>
): string => {
  return "?" + new URLSearchParams(...init).toString();
};

export const createPosterLink = (path: string): string => {
  return IMAGES_URL + "/t/p/w92" + path;
};
