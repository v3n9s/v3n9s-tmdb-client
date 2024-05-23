import { Flex, Text, useMantineTheme } from "@mantine/core";
import type { FC } from "react";
import Star from "./Star";
import type { Movie } from "./types";

const Rating: FC<Pick<Movie, "vote_average" | "vote_count">> = ({
  vote_average,
  vote_count,
}) => {
  const theme = useMantineTheme();

  return (
    <Flex align="center">
      <Star color={theme.other.colors.yellow} />
      <Text span fw="600" lh="1.5" ms="4">
        {vote_average}
      </Text>
      <Text span c={theme.other.colors.grey600} lh="1.5" ms="8">
        ({vote_count})
      </Text>
    </Flex>
  );
};

export default Rating;
