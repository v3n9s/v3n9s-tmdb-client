import type { FC, ReactNode } from "react";
import { Flex } from "@mantine/core";

const MoviesList: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Flex wrap="wrap" gap="16">
      {children}
    </Flex>
  );
};

export default MoviesList;
