import { Box, Flex, Image, Text, useMantineTheme } from "@mantine/core";
import type { FC } from "react";
import { logoClass } from "../styles/logo.css";

const Logo: FC = () => {
  const theme = useMantineTheme();

  return (
    <Box style={{ position: "relative" }}>
      <Flex className={logoClass} gap="12" align="center">
        <Image src="/logo.svg" w="32" h="32" m="0" />
        <Text c={theme.other.colors.purple500} fz="24" fw="600">
          ArrowFlicks
        </Text>
      </Flex>
    </Box>
  );
};

export default Logo;
