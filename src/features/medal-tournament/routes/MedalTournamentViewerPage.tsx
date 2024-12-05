import { ContentLayout } from "@/components/Layout";
import {
  // Heading,
  Center,
  VStack,
  Box,
  Container,
  Stack,
  TableContainer,
  Table,
  Text,
  Thead,
  Tfoot,
  Tbody,
  FormControl,
  FormLabel,
  Switch,
  Select,
  Image,
  // AspectRatio,
} from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";

import { useEffect, useRef, useState } from "react";
import {
  RadioButtonGroup,
  RadioButton,
} from "@/components/elements/RadioButtonGroup";
import { useTournament } from "@/api/getTournament";
import { TableHeader } from "../components/TableHeader";
import { ScoreRow } from "../components/ScoreRow";
import { MedalTournamentManager } from "@/utils/scoreUtils";
import OyesList from "../components/OyesList";
import { useFavoritePlayers } from "../api/useFavoritePlayers";
import banner from "@/assets/oneunderbanner.png";
import mgLogo from "@/assets/mg-logo.png";
import rogmaiLogo from "@/assets/rogmai-logo.png";

const getTournamentCategories = (tournament: any) => {
  if (!tournament) return [];
  const categoriesArray = tournament.tournamentDays.map((day) => {
    return day.category;
  });
  const uniqueCategories: string[] = Array.from(
    new Set(
      categoriesArray.filter(
        (item: string) => item !== null && item !== undefined,
      ),
    ),
  );
  return uniqueCategories;
};

export const MedalTournamentViewerPage = () => {
  const [searchParams] = useSearchParams();

  const tournament = useTournament({}, searchParams.get("id") ?? "");
  const categories = getTournamentCategories(
    tournament.data ? tournament.data[0] : null,
  );

  const [category, setCategory] = useState(categories ? categories[0] : "");
  const [page, setPage] = useState("scores");
  const [isNet, setIsNet] = useState(true);

  const [autoScrollResults, setAutoScrollResults] = useState(false);
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const scroller = useRef<NodeJS.Timeout | null>(null);
  const favoritePlayers = useFavoritePlayers();

  const handleStart = () => {
    window.scrollTo({ top: 100 });
    let increment = 1;
    scroller.current = setInterval(() => {
      const isOnTopOfPage = window.scrollY <= 0;
      const isOnBottomOfPage =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 100;
      if (isOnBottomOfPage) {
        // window.scrollTo({ top: 300 });
        window.scrollTo({ top: 100 });
      }
      if (isOnTopOfPage) {
        increment = 1;
      }
      window.scrollBy({ top: increment });
    }, 30);
  };
  const handleReset = () => {
    if (scroller.current !== null) {
      clearInterval(scroller.current);
    }
  };
  useEffect(() => {
    if (scroller.current !== null) {
      clearInterval(scroller.current);
    }
  }, []);

  useEffect(() => {
    if (autoScrollResults) {
      handleStart();
    } else {
      handleReset();
    }
  }, [autoScrollResults]);

  //sets default category to first on list
  useEffect(() => {
    if (categories.length > 0 && !category) {
      setCategory(categories[0]);
    }
  }, [tournament.data]);

  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const timerId = setInterval(() => {
      const arr = [
        //"D-E",
        //"Senior",
        //"SuperSenior",
        //"DamasA",
        //"DamasB",
        //"DamasC",
        "AA",
      ];
      if (autoScrollResults) {
        const nextIndex = (currentIndex + 1) % arr.length;
        window.scrollTo({ top: 100 });
        setCurrentIndex(nextIndex);
        setCategory(arr[nextIndex]);
      }
    }, 50000);

    return () => clearInterval(timerId);
  }, [currentIndex, categories]);

  const tournamentDays = tournament.data
    ? tournament.data[0]?.tournamentDays.filter((day) => {
        return day.category == category;
      })
    : [];

  let categoryPlayers = tournament.data
    ? tournament.data[0]?.poolOfPlayers?.filter(
        (player) => player.category == category,
      )
    : [];

  const sortedCategoryPlayers = [
    ...categoryPlayers
      ?.filter((player) => {
        if (
          MedalTournamentManager.hasDisqualifyingStrokes(player, tournamentDays)
        )
          return false;
        return true;
      })
      .sort((playerA, playerB) => {
        const scorePlayerA =
          MedalTournamentManager.getPlayerScoresPerTournamentDay(
            tournamentDays,
            playerA,
            isNet ? "net" : "gross",
          );
        const scorePlayerB =
          MedalTournamentManager.getPlayerScoresPerTournamentDay(
            tournamentDays,
            playerB,
            isNet ? "net" : "gross",
          );
        let totalScoreSubstraction =
          scorePlayerA.totalScore - scorePlayerB.totalScore;
        let last9Substraction =
          scorePlayerA.last9Score - scorePlayerB.last9Score;
        let last6Substraction =
          scorePlayerA.last6Score - scorePlayerB.last6Score;
        let last3Substraction =
          scorePlayerA.last3Score - scorePlayerB.last3Score;
        let last1Substraction =
          scorePlayerA.last1Score - scorePlayerB.last1Score;
        if (
          category == "D" ||
          category == "E" ||
          category == "D-E" ||
          category == "DamasC" ||
          category == "Damas2da"
        ) {
          return -(totalScoreSubstraction == 0
            ? last9Substraction == 0
              ? last6Substraction == 0
                ? last3Substraction == 0
                  ? last1Substraction
                  : last3Substraction
                : last6Substraction
              : last9Substraction
            : totalScoreSubstraction);
        } else {
          return totalScoreSubstraction == 0
            ? last9Substraction == 0
              ? last6Substraction == 0
                ? last3Substraction == 0
                  ? last1Substraction
                  : last3Substraction
                : last6Substraction
              : last9Substraction
            : totalScoreSubstraction;
        }
      }),
    ...categoryPlayers
      ?.filter((player) => {
        if (
          MedalTournamentManager.hasDisqualifyingStrokes(player, tournamentDays)
        )
          return true;
        return false;
      })
      .sort((playerA, playerB) => {
        const scorePlayerA =
          MedalTournamentManager.getPlayerScoresPerTournamentDay(
            tournamentDays,
            playerA,
            isNet ? "net" : "gross",
          );

        const scorePlayerB =
          MedalTournamentManager.getPlayerScoresPerTournamentDay(
            tournamentDays,
            playerB,
            isNet ? "net" : "gross",
          );
        let totalScoreSubstraction =
          scorePlayerA.totalScore - scorePlayerB.totalScore;
        let last9Substraction =
          scorePlayerA.last9Score - scorePlayerB.last9Score;
        let last6Substraction =
          scorePlayerA.last6Score - scorePlayerB.last6Score;
        let last3Substraction =
          scorePlayerA.last3Score - scorePlayerB.last3Score;
        let last1Substraction =
          scorePlayerA.last1Score - scorePlayerB.last1Score;
        if (
          category == "D" ||
          category == "E" ||
          category == "D-E" ||
          category == "DamasC" ||
          category == "Damas2da"
        ) {
          return -(totalScoreSubstraction == 0
            ? last9Substraction == 0
              ? last6Substraction == 0
                ? last3Substraction == 0
                  ? last1Substraction
                  : last3Substraction
                : last6Substraction
              : last9Substraction
            : totalScoreSubstraction);
        } else {
          return totalScoreSubstraction == 0
            ? last9Substraction == 0
              ? last6Substraction == 0
                ? last3Substraction == 0
                  ? last1Substraction
                  : last3Substraction
                : last6Substraction
              : last9Substraction
            : totalScoreSubstraction;
        }
      }),
  ];
  return (
    <>
      <Image
        src={mgLogo}
        position={"sticky"}
        width={100}
        top={"80vh"}
        left={"100%"}
        zIndex={1000000}
      />
      <Image
        zIndex={1000000}
        src={rogmaiLogo}
        position={"sticky"}
        width={100}
        top={"90vh"}
        left={"100%"}
      />
      <ContentLayout>
        {/* <StableFordRulesModal isOpen={isOpen} onClose={onClose} /> */}
        <VStack gap={5} mt={28} mb={5}>
          <Center>
            <div>
              {/* <Heading
              color={"muted"}
              size={{ base: "sm", md: "md" }}
              textAlign={"center"}
              mt={{ base: 8, sm: 0 }}
            >
              {(tournament.data && tournament.data[0]?.tournamentName) ??
                "Medal Tournament Scores"}
            </Heading> */}

              <Image maxW="full" src={banner} />
            </div>
          </Center>
          <Container
            pt={{ base: "2", md: "4" }}
            maxW={{ base: "xs", sm: "lg" }}
            overflow={"auto"}
            display={"flex"}
            justifyContent={"center"}
          >
            <Stack spacing="5">
              <RadioButtonGroup
                value={page}
                onChange={(value) => {
                  setPage(value);
                }}
                defaultValue="net"
                size={"md"}
              >
                <RadioButton color="bg-accent" value={"scores"}>
                  Scores
                </RadioButton>
                <RadioButton color="bg-accent" value={"oyes"}>
                  Oyes
                </RadioButton>
              </RadioButtonGroup>
            </Stack>
          </Container>
          <Text
            color={"muted"}
            size={{ base: "xs", md: "sm" }}
            textAlign={"center"}
            mt={{ base: 8, sm: 0 }}
          >
            *Scorecard no oficial
          </Text>

          {page == "scores" && (
            <>
              <Box bg="bg.surface">
                <Container maxW={{ base: "xs", sm: "lg" }} overflow={"auto"}>
                  <Stack spacing="5">
                    <RadioButtonGroup
                      display={{ base: "none", md: "flex" }}
                      value={category}
                      onChange={(value) => {
                        setCategory(value);
                      }}
                      defaultValue="net"
                      size={"md"}
                    >
                      {categories &&
                        categories.map((category: string) => {
                          return (
                            <RadioButton value={category}>
                              {category}
                            </RadioButton>
                          );
                        })}
                    </RadioButtonGroup>
                  </Stack>
                </Container>
                <FormControl
                  alignItems={"center"}
                  display={{ base: "flex", md: "none" }}
                >
                  <FormLabel w={"full"}>Categories</FormLabel>
                  <Select
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value);
                    }}
                    w={"full"}
                  >
                    {categories &&
                      categories.map((category: string) => {
                        return <option value={category}>{category}</option>;
                      })}
                  </Select>
                </FormControl>
              </Box>

              <div className="flex flex-col items-center md:flex-row gap-1 md:gap-4">
                <FormControl
                  w={"fit"}
                  display="flex"
                  alignItems="center"
                  mb={6}
                >
                  <FormLabel mb="0">Autoscroll results</FormLabel>
                  <Switch
                    id="email-alerts"
                    isChecked={autoScrollResults}
                    onChange={(e) => {
                      setAutoScrollResults(e.target.checked);
                      // window.scrollTo({ top: 400 });
                      // window.scrollBy({ top: 5 });
                    }}
                  />
                </FormControl>
                <FormControl
                  w={"fit"}
                  display="flex"
                  alignItems="center"
                  mb={6}
                >
                  <FormLabel mb="0">Favorites only</FormLabel>
                  <Switch
                    id="email-alerts"
                    isChecked={favoritesOnly}
                    onChange={(e) => {
                      setFavoritesOnly(e.target.checked);
                      // window.scrollTo({ top: 400 });
                      // window.scrollBy({ top: 5 });
                    }}
                  />
                </FormControl>
                {category == "Damas1ra" ||
                  (category == "SuperSenior" && (
                    <FormControl
                      w={"fit"}
                      display="flex"
                      alignItems="center"
                      mb={6}
                    >
                      <FormLabel mb="0">Net</FormLabel>
                      <Switch
                        isChecked={isNet}
                        onChange={(e) => {
                          setIsNet(e.target.checked);
                        }}
                      />
                    </FormControl>
                  ))}
              </div>

              <Container
                display={"flex"}
                justifyContent={"center"}
                position={{ base: "static", md: "sticky" }}
                top={85}
              >
                <Box
                  bg={"#F7FAFC"}
                  borderWidth={1}
                  borderColor={"lightgray"}
                  rounded={"lg"}
                  px={10}
                  py={2}
                >
                  <Text size={"xl"} fontWeight={"bold"}>
                    {category}
                  </Text>
                </Box>
              </Container>

              <TableContainer
                overflowX={{ base: "auto", md: "unset" }}
                overflowY={{ base: "auto", md: "unset" }}
              >
                <Table
                  size={{ base: "sm", md: "md" }}
                  variant="striped"
                  colorScheme="teal"
                >
                  <Thead
                    position={{ base: "static", md: "sticky" }}
                    top={{ base: 0, md: 129 }}
                    bg={"white"}
                  >
                    <TableHeader
                      tournamentDays={tournamentDays.sort(
                        (a, b) => a.day - b.day,
                      )}
                    />
                  </Thead>

                  <Tbody>
                    {sortedCategoryPlayers &&
                      sortedCategoryPlayers?.map((player, i: any) => {
                        return (
                          <>
                            {!favoritesOnly && (
                              <ScoreRow
                                player={player}
                                tournamentDays={tournamentDays.sort(
                                  (a, b) => a.day - b.day,
                                )}
                                i={i}
                                category={category}
                                favoritePlayers={favoritePlayers}
                                isGross={!isNet}
                              />
                            )}
                            {favoritesOnly &&
                              favoritePlayers.list.includes(player._id) && (
                                <ScoreRow
                                  player={player}
                                  tournamentDays={tournamentDays.sort(
                                    (a, b) => a.day - b.day,
                                  )}
                                  i={i}
                                  category={category}
                                  favoritePlayers={favoritePlayers}
                                  isGross={!isNet}
                                />
                              )}
                          </>
                        );
                      })}
                  </Tbody>
                  <Tfoot>
                    <TableHeader
                      tournamentDays={tournamentDays.sort(
                        (a, b) => a.day - b.day,
                      )}
                    />
                  </Tfoot>
                </Table>
              </TableContainer>
            </>
          )}
          {tournament.data && page == "oyes" && (
            <OyesList oyesList={tournament.data[0].oyesList} />
          )}
        </VStack>
      </ContentLayout>
    </>
  );
};
