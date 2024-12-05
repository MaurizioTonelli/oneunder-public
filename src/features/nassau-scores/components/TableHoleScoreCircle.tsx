import { Box, Text } from "@chakra-ui/react";

export const TableHoleScoreCircle = ({
  score,
  result,
  player,
}: {
  score: number;
  result: number | null;
  player: string;
}) => {
  const bgColor =
    result == null
      ? "transparent"
      : result == -1 && player == "B"
      ? "red.600"
      : result == 1 && player == "A"
      ? "blue.600"
      : "lightgray";
  const fgColor =
    bgColor == "red.600" || bgColor == "blue.600" ? "white" : "black";
  return (
    <Box
      width={6}
      height={6}
      bg={bgColor}
      borderRadius={"full"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Text fontSize={"sm"} color={fgColor} fontWeight={"bold"}>
        {score}
      </Text>
    </Box>
  );
};
