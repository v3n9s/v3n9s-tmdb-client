export const getSearchParamsString = (
  ...init: ConstructorParameters<typeof URLSearchParams>
): string => {
  return "?" + new URLSearchParams(...init).toString();
};
