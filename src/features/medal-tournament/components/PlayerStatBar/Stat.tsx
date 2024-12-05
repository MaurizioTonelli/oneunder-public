import { Box, BoxProps, Heading, HStack, Stack, Text } from "@chakra-ui/react";

interface Props extends BoxProps {
  label: string;
  value: string;
  type?: string;
  forcedLabel?: string;
  index?: number;
}
export const Stat = (props: Props) => {
  const { label, forcedLabel, index, value, type, ...boxProps } = props;
  const valueIsPositiveScore = !isNaN(Number(value)) && Number(value) > 0;
  return (
    <Box px={{ base: "4", md: "6" }} py={{ base: "5", md: "6" }} {...boxProps}>
      <Stack
        justifyContent={{ base: "space-between", md: "center" }}
        direction={{ base: "column", md: "column" }}
      >
        <HStack justify="center">
          <Text
            display={{ base: "none", md: "flex" }}
            fontSize={"sm"}
            fontWeight={"medium"}
            color="gray.600"
          >
            {label}
          </Text>
          <Text
            display={{ base: "flex", md: "none" }}
            fontSize={"sm"}
            fontWeight={"medium"}
            color="gray.600"
          >
            {forcedLabel ? forcedLabel : `R${index}`}
          </Text>
        </HStack>
        <Stack spacing="4" justifyContent={"center"}>
          <Heading
            color={
              valueIsPositiveScore
                ? "red"
                : isNaN(Number(value))
                  ? "black"
                  : "green"
            }
            size={{ base: "xs", md: "sm" }}
            textAlign={"center"}
          >
            {valueIsPositiveScore ? "+" : ""}
            {value}
          </Heading>
        </Stack>
      </Stack>
    </Box>
  );
};
