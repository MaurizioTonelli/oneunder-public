import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import campopen1 from "@/assets/campopen/campopen1.png";
import campopen2 from "@/assets/campopen/campopen2.png";
import campopen3 from "@/assets/campopen/campopen3.png";
import campopen4 from "@/assets/campopen/campopen4.png";
import campopen5 from "@/assets/campopen/campopen5.png";
import campopen6 from "@/assets/campopen/campopen6.png";
export const Features = () => (
  <Box as="section" bg="bg.surface">
    <Container py={{ base: "16", md: "24" }}>
      <Stack spacing={{ base: "12", md: "16" }}>
        <Stack spacing={{ base: "4", md: "5" }} maxW="3xl">
          <Stack spacing="3">
            <Text
              fontSize={{ base: "sm", md: "md" }}
              fontWeight="semibold"
              color="accent"
            >
              Tournaments
            </Text>
            <Heading size={{ base: "sm", md: "md" }}>
              We bring live scoring to your tournaments
            </Heading>
          </Stack>
          <Text color="fg.muted" fontSize={{ base: "lg", md: "xl" }}>
            All players in and outside the tournament can know the current
            results at any time, making it a much more engaging experience.
          </Text>
        </Stack>
      </Stack>
      <SimpleGrid
        mt={{ base: "12", md: "18" }}
        columns={{ base: 1, md: 2, lg: 3 }}
        columnGap={8}
        rowGap={{ base: 10, md: 16 }}
      >
        <Image objectFit="cover" src={campopen1} alt="OneUnder app" />
        <Image objectFit="cover" src={campopen2} alt="OneUnder app" />
        <Image objectFit="cover" src={campopen3} alt="OneUnder app" />
        <Image objectFit="cover" src={campopen4} alt="OneUnder app" />
        <Image objectFit="cover" src={campopen5} alt="OneUnder app" />
        <Image objectFit="cover" src={campopen6} alt="OneUnder app" />
      </SimpleGrid>
    </Container>
  </Box>
);
