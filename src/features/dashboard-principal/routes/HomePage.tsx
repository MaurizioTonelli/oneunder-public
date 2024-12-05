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
} from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";
import {
  getCourseTeeHoles,
  getPureScores,
  getSortedScores,
} from "../utils/scoreUtils";
import { useState } from "react";
import toast from "react-hot-toast";
import { InfoIcon } from "@chakra-ui/icons";
import { TableHeader } from "../components/TableHeader";
import { StableFordRulesModal } from "../components/StableFordRulesModal";
import { AddRoundInput } from "../components/AddRoundInput";
import { HolesInfoHeader } from "../components/HolesInfoHeader";
import { ScoreRow } from "../components/ScoreRow";
import {
  RadioButtonGroup,
  RadioButton,
} from "@/components/elements/RadioButtonGroup";

export const HomePage = () => {
  const [searchParams] = useSearchParams();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [rounds, setRounds] = useState(searchParams.getAll("id"));
  const [roundInput, setRoundInput] = useState("");

  const roundsWithScores = useRoundsWithScores({}, rounds);
  const scores = getPureScores(roundsWithScores.data);
  const courseTeeHoles = getCourseTeeHoles(roundsWithScores.data, rounds[0]);

  const [scoreType, setScoreType] = useState("net");

  const addRound = (id: string) => {
    setRounds([...rounds, id]);
    toast.success("Round added to score view");
  };

  return (
    <ContentLayout>
      <StableFordRulesModal isOpen={isOpen} onClose={onClose} />
      <VStack gap={5} mt={5} mb={5}>
        <AddRoundInput
          roundInput={roundInput}
          setRoundInput={setRoundInput}
          addRound={addRound}
        />
        <Center>
          <Heading color={"muted"} size="md">
            Round scores
          </Heading>
        </Center>

        <Box bg="bg.surface" pt={{ base: "2", md: "4" }}>
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
        </Box>
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
                courseTeeHoles &&
                getSortedScores(scores, courseTeeHoles, scoreType).map(
                  (score, i: any) => {
                    return (
                      <ScoreRow
                        score={score}
                        scores={scores}
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
      </VStack>
    </ContentLayout>
  );
};
