import {
  AspectRatio,
  Button,
  Container,
  Heading,
  Image,
  Link,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import heroImage from "@/assets/hero-image.png";

export const HeroSection = () => (
  <Container mt={{ base: "16", md: "24" }} py={{ base: "16", md: "24" }}>
    <SimpleGrid columns={{ base: 1, md: 2 }} gap={16}>
      <Stack spacing={{ base: "8", md: "12" }} justifyContent="center">
        <Stack spacing={{ base: "4", md: "6" }}>
          <Heading size={{ base: "md", md: "xl" }}>
            <Text className="text-oneunder-600">OneUnderApp</Text>
          </Heading>
          <Text fontSize={{ base: "lg", md: "xl" }} color="fg.muted">
            The easiest way to track your scorecards and bets
          </Text>
        </Stack>
        <Stack spacing="3">
          <Stack direction={{ base: "column", md: "row" }} spacing="3">
            <Button
              as={Link}
              href="https://apps.apple.com/mx/app/one-under-golf/id6450483742"
              target="_blank"
              size={{ base: "lg", md: "xl" }}
            >
              Download the app
            </Button>
          </Stack>
        </Stack>
      </Stack>
      <AspectRatio ratio={1}>
        <Image objectFit="cover" src={heroImage} alt="OneUnder app" />
      </AspectRatio>
    </SimpleGrid>
  </Container>
);
