import { Box, Text } from "@chakra-ui/react";

export const ScoreCircle = ({
  result,
  hole,
  tiny,
  isGameOver,
  advantage,
  index,
}: {
  result: number | null;
  hole: number;
  tiny?: boolean;
  isGameOver: { gameOver: boolean; gameStopsAtHole: number | null };
  advantage: number;
  index: number;
}) => {
  const bgColor =
    result == null
      ? "transparent"
      : result == -1
      ? "red.600"
      : result == 1
      ? "blue.600"
      : "lightgray";
  const fgColor =
    bgColor == "red.600" || bgColor == "blue.600" ? "white" : "black";
  return (
    <Box
      width={tiny ? "15px" : 6}
      height={tiny ? "15px" : 6}
      bg={bgColor}
      border={result == null ? "1px dashed lightgray" : "none"}
      borderRadius={"full"}
      display={"flex"}
      position={"relative"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Text
        fontSize={tiny ? "9px" : "sm"}
        color={fgColor}
        fontWeight={"bold"}
        textDecoration={
          (isGameOver.gameOver && result == null) ||
          (isGameOver.gameOver &&
            isGameOver.gameStopsAtHole &&
            index + 1 > isGameOver.gameStopsAtHole)
            ? "solid line-through 2px"
            : "null"
        }
      >
        {hole}
      </Text>
      {advantage != 0 && (
        <Box
          width={tiny ? "10px" : 3}
          height={tiny ? "10px" : 3}
          bg={advantage > 0 ? "blue.600" : "red.600"}
          border={"1px solid white"}
          borderRadius={"full"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          position={"absolute"}
          top={-1}
          right={-1}
        >
          <Text fontSize={"8px"} color="white" fontWeight={"extrabold"}>
            {Math.abs(advantage)}
          </Text>
        </Box>
      )}
    </Box>
  );
};
