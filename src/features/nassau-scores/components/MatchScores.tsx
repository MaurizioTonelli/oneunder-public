import { HStack, Text, VStack } from "@chakra-ui/react";
import {
  getHandicapAdvantagedHoles,
  getScores,
  getThruScore,
  isGameOver,
} from "../utils/scoreUtils";
import { ScoreCircle } from "./ScoreCircle";

function shiftArray(arr: any[], shiftBy: number) {
  const length = arr.length;
  if (length > 0) {
    shiftBy = shiftBy % length; // To handle shifts larger than array length
    for (let i = 0; i < shiftBy; i++) {
      const firstElement = arr.shift();
      arr.push(firstElement);
    }
  }
  return arr;
}

export const MatchScores = ({
  match,
  index,
  mobile,
}: {
  match: any;
  index: number;
  mobile?: boolean;
}) => {
  const thruScore = getThruScore(match.playerAStrokes);
  const scores = getScores(
    match.playerAStrokes,
    match.playerBStrokes,
    match.playerAHandicap,
    match.playerBHandicap,
    match.course.tees.holes.map((hole: any) => ({
      number: hole.number,
      advantage: hole.advantage,
    }))
  );
  const gameOver = isGameOver(scores);

  const advantagesPerHole = getHandicapAdvantagedHoles(
    Number(match.playerAHandicap) -
      Math.min(Number(match.playerAHandicap), Number(match.playerBHandicap)),
    Number(match.playerBHandicap) -
      Math.min(Number(match.playerAHandicap), Number(match.playerBHandicap)),
    match.course.tees.holes.map((hole: any) => ({
      number: hole.number,
      advantage: hole.advantage,
    }))
  );

  return (
    <>
      {mobile && (
        <VStack
          display={{ base: "flex", xl: "none" }}
          bg="bg-surface"
          borderWidth={"0px 1px 1px 1px"}
          borderStyle={"solid"}
          borderColor={"lightgray"}
          borderRadius={"0px 0px 5px 5px"}
          p={3}
        >
          <Text
            fontStyle={"italic"}
            display={{ base: "none", xl: "flex" }}
            gap={2}
          >
            Match {index + 1} {" - "}
            <Text fontSize={"md"} fontStyle={"normal"} fontWeight={"bold"}>
              {" "}
              {thruScore == "F" ? "Final" : `Thru ${thruScore}`}
            </Text>
          </Text>

          <HStack gap={0.5}>
            {shiftArray(scores, Number(match.startingHole) - 1).map(
              (result, i) => (
                <ScoreCircle
                  index={i}
                  tiny
                  result={result}
                  hole={
                    (i + 1 + (match.startingHole - 1)) % 18 == 0
                      ? 18
                      : (i + 1 + (match.startingHole - 1)) % 18
                  }
                  isGameOver={gameOver}
                  advantage={
                    advantagesPerHole.find(
                      (hole) =>
                        hole.number ==
                        ((i + 1 + (match.startingHole - 1)) % 18 == 0
                          ? 18
                          : (i + 1 + (match.startingHole - 1)) % 18)
                    )?.advantage ?? 0
                  }
                />
              )
            )}
          </HStack>
        </VStack>
      )}
      {!mobile && (
        <VStack display={{ base: "none", xl: "flex" }}>
          <Text fontStyle={"italic"} display={"flex"} gap={2}>
            Match {index + 1} {" - "}
            <Text fontSize={"md"} fontStyle={"normal"} fontWeight={"bold"}>
              {" "}
              {thruScore == "F" ? "Final" : `Thru ${thruScore}`}
            </Text>
          </Text>

          <HStack gap={1}>
            {shiftArray(scores, Number(match.startingHole) - 1).map(
              (result, i) => (
                <ScoreCircle
                  index={i}
                  result={result}
                  hole={
                    (i + 1 + (match.startingHole - 1)) % 18 == 0
                      ? 18
                      : (i + 1 + (match.startingHole - 1)) % 18
                  }
                  isGameOver={gameOver}
                  advantage={
                    advantagesPerHole.find(
                      (hole) =>
                        hole.number ==
                        ((i + 1 + (match.startingHole - 1)) % 18 == 0
                          ? 18
                          : (i + 1 + (match.startingHole - 1)) % 18)
                    )?.advantage ?? 0
                  }
                />
              )
            )}
          </HStack>
        </VStack>
      )}
    </>
  );
};
