import { Box, Container, Heading, Stack } from "@chakra-ui/react";
import club from "@/assets/club-campestre.jpeg";

export const ScoresHeading = () => {
  return (
    <Box
      as="section"
      mt={24}
      bgImage={club}
      bgRepeat={"no-repeat"}
      bgSize={"cover"}
      bgPos={"center"}
      color="fg.accent.default"
      py={{ base: "12", md: "24" }}
      boxShadow={"inset 0 0 0 1000px #2b6cb079"}
    >
      <Container>
        <Stack spacing={{ base: "8", md: "10" }} align="center">
          <Stack spacing={{ base: "4", md: "6" }} textAlign="center">
            <Stack spacing="3">
              <Heading
                size={{ base: "md", md: "lg" }}
                color={"white"}
                fontWeight="semibold"
              >
                Torneo Calcuta Match Play
              </Heading>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};
