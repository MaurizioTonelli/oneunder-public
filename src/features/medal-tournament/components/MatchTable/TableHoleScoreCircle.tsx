import { Box, Text } from "@chakra-ui/react";

export const TableHoleScoreCircle = ({ score }: { score: number }) => {
  const bgColor = "blue.600";
  const fgColor = bgColor == "blue.600" ? "white" : "black";
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
