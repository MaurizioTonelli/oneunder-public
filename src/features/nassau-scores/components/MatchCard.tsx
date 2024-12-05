import {
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
  Heading,
  VStack,
  Text,
} from "@chakra-ui/react";
import { getMatchResult, getResult, getThruScore } from "../utils/scoreUtils";
import { PlayerSection } from "./PlayerSection";
import { MatchTable } from "./MatchTable";
import { MatchScores } from "./MatchScores";

const MobileScoreHeading = ({
  scoreText,
  match,
  index,
}: {
  scoreText: string;
  match: any;
  index: number;
}) => {
  const thruScore = getThruScore(match.playerAStrokes);
  const matchResult = getMatchResult(
    match.playerAStrokes,
    match.playerBStrokes,
    match.playerAHandicap,
    match.playerBHandicap,
    match.course.tees.holes.map((hole: any) => ({
      number: hole.number,
      advantage: hole.advantage,
    }))
  );
  return (
    <VStack gap={0} display={{ base: "flex", xl: "none" }}>
      <Text fontStyle={"italic"} fontSize={"xs"} display={"flex"} gap={2}>
        Match {index + 1} {" - "}
        <Text fontSize={"xs"} fontStyle={"normal"} fontWeight={"bold"}>
          {" "}
          {thruScore == "F" ? "Final" : `Thru ${thruScore}`}
        </Text>
      </Text>
      <Heading
        color={
          matchResult.yourPoints == 0
            ? "black"
            : matchResult.yourPoints > 0
            ? "blue.600"
            : "red.600"
        }
        zIndex={1}
        size={"sm"}
        fontWeight={"black"}
        display={"flex"}
        alignItems={"center"}
      >
        {scoreText?.slice(0, 1)}
        <Heading size="xs" fontWeight="extrabold">
          {scoreText?.slice(1)}
        </Heading>
      </Heading>
    </VStack>
  );
};

export const MatchCard = ({ match, index }: { match: any; index: number }) => {
  const matchResult = getMatchResult(
    match.playerAStrokes,
    match.playerBStrokes,
    match.playerAHandicap,
    match.playerBHandicap,
    match.course.tees.holes.map((hole: any) => ({
      number: hole.number,
      advantage: hole.advantage,
    }))
  );

  const scoreText =
    matchResult.holesLeft != 0
      ? Math.abs(matchResult.yourPoints) + "&" + matchResult.holesLeft
      : Math.abs(matchResult.yourPoints) + "UP";

  return (
    <>
      <Box
        as="section"
        bg="bg-surface"
        border={"1px solid lightgray"}
        position={"relative"}
        borderRadius={{ base: "10px 10px 0px 0px", xl: 10 }}
        overflow="hidden"
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        height={{ base: 100, xl: 150 }}
      >
        <PlayerSection
          ghin={match.playerA.ghin}
          name={match.playerA.name}
          scoreText={scoreText}
          side="left"
          result={getResult(
            match.playerAStrokes,
            match.playerBStrokes,
            match.playerAHandicap,
            match.playerBHandicap,
            match.course.tees.holes.map((hole: any) => ({
              number: hole.number,
              advantage: hole.advantage,
            })),
            "blue"
          )}
          handicap={match.playerAHandicap}
        />
        <PlayerSection
          ghin={match.playerB.ghin}
          name={match.playerB.name}
          scoreText={scoreText}
          side="right"
          result={getResult(
            match.playerAStrokes,
            match.playerBStrokes,
            match.playerAHandicap,
            match.playerBHandicap,
            match.course.tees.holes.map((hole: any) => ({
              number: hole.number,
              advantage: hole.advantage,
            })),
            "red"
          )}
          handicap={match.playerBHandicap}
        />
        <MatchScores match={match} index={index} />

        <MobileScoreHeading scoreText={scoreText} match={match} index={index} />

        <AccordionButton
          position={"absolute"}
          bottom={0}
          display={"flex"}
          justifyContent={"center"}
        >
          <AccordionIcon />
        </AccordionButton>
      </Box>

      <MatchScores match={match} index={index} mobile />

      <AccordionPanel pb={4}>
        <MatchTable match={match} />
      </AccordionPanel>
    </>
  );
};
