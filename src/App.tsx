import type { FC } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import { Container, Flex, useMantineTheme } from "@mantine/core";
import GenresProvider from "./GenresProvider";
import FavoritesProvider from "./FavoritesProvider";

const App: FC = () => {
  const theme = useMantineTheme();

  return (
    <Container size="1440" p="0">
      <Flex>
        <NavBar />
        <Container fluid p="0" bg={theme.other.colors.grey100} w="100%">
          <GenresProvider>
            <FavoritesProvider>
              <Outlet />
            </FavoritesProvider>
          </GenresProvider>
        </Container>
      </Flex>
    </Container>
  );
};

export default App;
