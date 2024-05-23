import {
  Button,
  Center,
  Image,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import type { FC } from "react";
import { Link } from "react-router-dom";

const NotFoundPage: FC = () => {
  const theme = useMantineTheme();

  return (
    <Center h="900px">
      <Stack align="center" gap="0">
        <Image src="/404.svg" />
        <Text fz="20" fw="700" mt="35">
          We can&apos;t find the page you are looking for
        </Text>
        <Button
          component={Link}
          to="/movies"
          bg={theme.other.colors.purple500}
          c={theme.other.colors.white}
          w="103"
          h="40"
          mt="13"
          radius="8"
          fw="400"
        >
          Go Home
        </Button>
      </Stack>
    </Center>
  );
};

export default NotFoundPage;
