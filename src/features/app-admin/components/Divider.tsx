import { Box, Container, HStack, Divider, Text } from "@chakra-ui/react";

export const DividerElement = ({ text }: { text: string }) => {
  return (
    <Box bg="bg.surface">
      <Container py={{ base: "4", md: "8" }}>
        <HStack>
          <Divider />
          <Text textStyle="md" fontWeight="medium" whiteSpace="nowrap">
            {text}
          </Text>
          <Divider />
        </HStack>
      </Container>
    </Box>
  );
};
