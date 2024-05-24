import { useMemo, type FC } from "react";
import { Link, useLoaderData } from "react-router-dom";
import type { Movie } from "./types";
import {
  Anchor,
  Avatar,
  Breadcrumbs,
  Card,
  Container,
  Divider,
  Flex,
  NumberFormatter,
  Stack,
  Table,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { createPosterLink, formatDate, formatTime } from "./utils";
import MovieCard from "./MovieCard";

const MovieInfo: FC = () => {
  const movie = useLoaderData() as Movie;

  const theme = useMantineTheme();

  const breadCrumbs = useMemo(
    () => [
      { name: "Movies", link: "/movies" },
      { name: movie.original_title, link: "/movies/" + String(movie.id) },
    ],
    [movie],
  );

  const tableData = useMemo(
    () => [
      {
        name: "Duration",
        value: formatTime(movie.runtime),
      },
      {
        name: "Premiere",
        value: formatDate(movie.release_date),
      },
      {
        name: "Budget",
        value: (
          <NumberFormatter value={movie.budget} prefix="$" thousandSeparator />
        ),
      },
      {
        name: "Gross worldwide",
        value: (
          <NumberFormatter value={movie.revenue} prefix="$" thousandSeparator />
        ),
      },
      {
        name: "Genres",
        value: movie.genres.map((genre) => genre.name).join(", "),
      },
    ],
    [movie],
  );

  const trailer = movie.videos.results.find(
    (video) =>
      video.official && video.type === "Trailer" && video.site === "YouTube",
  );

  return (
    <Container key={movie.id} fluid h="100%" p="180" pt="40" pb="40">
      <Flex direction="column" gap="20">
        <Breadcrumbs>
          {breadCrumbs.map(({ name, link }) => (
            <Anchor
              key={link}
              component={Link}
              to={link}
              td="none"
              fz="14"
              lh="140%"
              c={theme.other.colors.purple500}
            >
              {name}
            </Anchor>
          ))}
        </Breadcrumbs>
        <MovieCard movie={movie} isBig={true}>
          <Table withRowBorders={false}>
            <Table.Tbody>
              {tableData.map(({ name, value }) => (
                <Table.Tr key={name}>
                  <Table.Td
                    c={theme.other.colors.grey600}
                    w="140"
                    fz="16"
                    p="0"
                    pt="5"
                  >
                    {name}
                  </Table.Td>
                  <Table.Td p="0" pl="8" pt="6" fz="16" fw="500">
                    {value}
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </MovieCard>
        <Card radius="12" p="24">
          <Stack gap="20">
            <Stack gap="16">
              <Text fz="20" fw="700" lh="1">
                Trailer
              </Text>
              {trailer && (
                <iframe
                  width="500"
                  height="281"
                  style={{
                    border: "4px solid" + theme.other.colors.grey100,
                    borderRadius: "9px",
                  }}
                  src={"https://www.youtube.com/embed/" + trailer.key}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              )}
            </Stack>
            <Divider />
            <Stack gap="16">
              <Text fz="20" fw="700" lh="1">
                Description
              </Text>
              <Text fw="500" lh="1.39">
                {movie.overview}
              </Text>
            </Stack>
            <Divider />
            <Stack gap="16">
              <Text fz="20" fw="700" lh="1">
                Production
              </Text>
              <Stack gap="12">
                {movie.production_companies.map((company) => (
                  <Flex key={company.id} align="center" gap="8">
                    <Avatar
                      src={
                        company.logo_path !== null
                          ? createPosterLink(company.logo_path)
                          : "/clapperboard.svg"
                      }
                      w="40"
                      h="40"
                      styles={{
                        root: {
                          border: "1px solid " + theme.other.colors.grey100,
                        },
                        image: {
                          objectFit: "contain",
                          ...(company.logo_path === null
                            ? { padding: "9px" }
                            : null),
                        },
                      }}
                    />
                    <Text fw="700">{company.name}</Text>
                  </Flex>
                ))}
              </Stack>
            </Stack>
          </Stack>
        </Card>
      </Flex>
    </Container>
  );
};

export default MovieInfo;
