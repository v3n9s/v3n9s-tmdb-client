import { Button, Stack, useMantineTheme } from "@mantine/core";
import type { FC } from "react";
import { Link, matchPath, useLocation, useMatches } from "react-router-dom";

const links = [
  { name: "Movies", path: "/movies" },
  { name: "Rated movies", path: "/favorites" },
];

const NavBar: FC = () => {
  const matches = useMatches();

  const isHideNavbar = matches.some((match) => {
    if (
      match.handle != null &&
      typeof match.handle === "object" &&
      "hideNavbar" in match.handle
    ) {
      return match.handle.hideNavbar;
    }
  });

  const location = useLocation();

  const theme = useMantineTheme();

  return (
    isHideNavbar || (
      <Stack p="24" pt="140" flex="280px 0 0" bg={theme.other.colors.purple100}>
        {links.map((v, i) => {
          const isMatchedPath = matchPath(v.path, location.pathname);
          return (
            <Button
              component={Link}
              to={v.path}
              key={i}
              variant={isMatchedPath ? "light" : "transparent"}
              justify="start"
              px="9"
              h="42"
              fz="16"
              c={
                isMatchedPath
                  ? theme.other.colors.purple500
                  : theme.other.colors.black
              }
              bg={isMatchedPath ? theme.other.colors.purple200 : "transparent"}
              fw={isMatchedPath ? "700" : "500"}
              td="none"
              radius="8"
            >
              {v.name}
            </Button>
          );
        })}
      </Stack>
    )
  );
};

export default NavBar;
