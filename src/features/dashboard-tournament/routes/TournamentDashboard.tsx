import { ContentLayout } from "@/components/Layout";
import { useRoundsWithScores } from "../api/getRoundsWithScores";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  TableContainer,
  Heading,
  Center,
  VStack,
  Box,
  Container,
  Stack,
  IconButton,
  useDisclosure,
  Select,
  Text,
  // Button,
} from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";
import { getCourseTeeHoles, getSortedScores } from "../utils/scoreUtils";
import { useState } from "react";
import { InfoIcon } from "@chakra-ui/icons";
import { TableHeader } from "../components/TableHeader";
import { StableFordRulesModal } from "../components/StableFordRulesModal";
import { HolesInfoHeader } from "../components/HolesInfoHeader";
import { ScoreRow } from "../components/ScoreRow";
import {
  RadioButtonGroup,
  RadioButton,
} from "@/components/elements/RadioButtonGroup";
import { useTournament } from "@/api/getTournament";
// import { useScoreManager } from "../api/useScoreManager";

const RoundTable = ({ scoreType, scores, roundId }) => {
  const courseTeeHoles = getCourseTeeHoles([scores], roundId);

  return (
    <>
      {scores && courseTeeHoles && (
        <TableContainer>
          <Table size={"sm"} variant="striped" colorScheme="teal">
            <Thead>
              <TableHeader scoreType={scoreType} />
            </Thead>
            {courseTeeHoles && (
              <HolesInfoHeader courseTeeHoles={courseTeeHoles} />
            )}
            <Tbody>
              {scores &&
                scores.scores &&
                courseTeeHoles &&
                getSortedScores(scores.scores, courseTeeHoles, scoreType).map(
                  (score, i: any) => {
                    return (
                      <ScoreRow
                        score={score}
                        scores={scores.scores}
                        courseTeeHoles={courseTeeHoles}
                        scoreType={scoreType}
                        i={i}
                      />
                    );
                  }
                )}
            </Tbody>
            <Tfoot>
              <TableHeader scoreType={scoreType} />
            </Tfoot>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

const getTournamentCategories = (tournament: any) => {
  if (!tournament) return [];
  const categoriesArray = tournament.tournamentDays.map((day) => {
    return day.category;
  });
  const uniqueCategories: string[] = Array.from(
    new Set(
      categoriesArray.filter(
        (item: string) => item !== null && item !== undefined
      )
    )
  );
  return uniqueCategories;
};

export const TournamentDashboard = () => {
  const [searchParams] = useSearchParams();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const tournament = useTournament({}, searchParams.get("id") ?? "");
  const categories = getTournamentCategories(
    tournament.data ? tournament.data[0] : null
  );
  // const scoreManager = useScoreManager();

  // const updatePlayerEmails = async () => {
  //   if (tournament.data && tournament.data[0]) {
  //     console.log(tournament.data[0].poolOfPlayers);
  //     const playersToModify = tournament.data[0].poolOfPlayers.map(
  //       (player) => ({ id: player._id, name: player.name })
  //     );
  //     await scoreManager.updatePlayerEmails(playersToModify);
  //   }
  // };

  const [category, setCategory] = useState(categories ? categories[0] : "");
  const [day, setDay] = useState("1");

  const rounds =
    tournament.data &&
    tournament.data &&
    tournament.data[0].tournamentDays
      .filter(
        (tournamentDay) =>
          tournamentDay.day == Number(day) && tournamentDay.category == category
      )
      .map((tournamentDay) => tournamentDay.rounds)
      .flat()
      .map((round) => round._id);

  // const [rounds] = useState(searchParams.getAll("id"));
  const roundsWithScores = useRoundsWithScores({}, rounds);
  const [scoreType, setScoreType] = useState("net");

  return (
    <ContentLayout>
      <StableFordRulesModal isOpen={isOpen} onClose={onClose} />
      <VStack gap={5} mt={100} mb={5}>
        <Center>
          <Heading color={"muted"} size="md">
            Tournament scores
          </Heading>
        </Center>

        {/* <Button onClick={updatePlayerEmails}>Update player emails</Button> */}
        <Box
          bg="bg.surface"
          pt={{ base: "2", md: "4" }}
          display={"flex"}
          gap={4}
          alignItems={"center"}
          flexDir={"column"}
        >
          <Container maxW="lg">
            <Stack spacing="5">
              <RadioButtonGroup
                value={scoreType}
                onChange={(value) => {
                  setScoreType(value);
                }}
                defaultValue="net"
                size={"md"}
              >
                <RadioButton value={"gross"}>Gross</RadioButton>
                <RadioButton value={"net"}>Net</RadioButton>
                <RadioButton value={"stableford"} gap={1}>
                  Stableford
                  <IconButton
                    onClick={onOpen}
                    variant={"ghost"}
                    size={"sm"}
                    aria-label="Add to friends"
                    icon={<InfoIcon />}
                  />
                </RadioButton>
              </RadioButtonGroup>
            </Stack>
          </Container>
          <Container maxW={{ base: "xs", sm: "lg" }} overflow={"auto"}>
            <Stack spacing="5">
              <Text>Selecciona la categoría</Text>
              <Select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              >
                {categories &&
                  categories.map((category: string) => {
                    return <option value={category}>{category}</option>;
                  })}
              </Select>
            </Stack>
            {/* <Stack spacing="5">
              <RadioButtonGroup
                maxW={200}
                overflowX={"scroll"}
                display={"flex"}
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
                      <RadioButton value={category}>{category}</RadioButton>
                    );
                  })}
              </RadioButtonGroup>
            </Stack> */}
          </Container>
          <Container maxW={{ base: "xs", sm: "lg" }} overflow={"auto"}>
            <Stack spacing="5">
              <Text>Selecciona el día del torneo</Text>
              <Select
                value={day}
                onChange={(e) => {
                  setDay(e.target.value);
                }}
              >
                <option value="1">Day 1</option>
                <option value="2">Day 2</option>
                <option value="3">Day 3</option>
              </Select>
            </Stack>
          </Container>
        </Box>
        {tournament &&
          rounds &&
          roundsWithScores &&
          roundsWithScores.data &&
          roundsWithScores.data.map((roundWithScores) => {
            return (
              <Container
                display={"flex"}
                flexDir={"column"}
                alignItems={"center"}
                mt={8}
                gap={2}
              >
                <div>{roundWithScores.name}</div>
                <RoundTable
                  scoreType={scoreType}
                  scores={roundWithScores}
                  roundId={roundWithScores.id}
                />
              </Container>
            );
          })}
      </VStack>
    </ContentLayout>
  );
};
