import {
  Box,
  Button,
  Container,
  SimpleGrid,
  useColorModeValue,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { TournamentCard } from "./TournamentCard";
import { PlayerCount } from "./PlayerCount";
import { TournamentInfo } from "./TournamentInfo";
import { usePublicTournaments } from "../../misc/api/getPublicTournaments";
import { useEffect } from "react";

export const TournamentCards = () => {
  const tournaments = usePublicTournaments();
  useEffect(() => {
    if (tournaments.data) {
      console.log(tournaments.data);
    }
  }, [tournaments.data]);
  return (
    <Container>
      <Stack spacing={{ base: "12", md: "16" }}>
        <Stack
          spacing={{ base: "4", md: "5" }}
          maxW="3xl"
          mb={{ base: "8", md: "12" }}
        >
          <Stack spacing="3">
            <Heading size={{ base: "sm", md: "md" }}>
              Some tournaments we've been part of
            </Heading>
          </Stack>
          <Text color="fg.muted" fontSize={{ base: "lg", md: "xl" }}>
            We accomodate to many tournament styles and rulesets
          </Text>
        </Stack>
      </Stack>
      <Box
        bg={useColorModeValue("gray.100", "gray.800")}
        px={{ base: "6", md: "8" }}
        py="12"
      >
        <Box as="section" maxW={{ base: "xs", md: "5xl" }} mx="auto">
          <SimpleGrid columns={{ base: 1, md: 4 }} spacing="6">
            {tournaments.data &&
              tournaments.data.map((tournament, i) => {
                const { tournamentName, date, poolOfPlayers, livescoreLink } =
                  tournament;
                return (
                  <TournamentCard key={i} livescoreLink={livescoreLink}>
                    <TournamentInfo
                      mt="20"
                      name={tournamentName}
                      bio={new Date(date).toDateString()}
                    />
                    <PlayerCount my="4" count={poolOfPlayers.length} />
                    <Button
                      variant="tertiary"
                      colorScheme="blue"
                      rounded="full"
                      size="sm"
                      width="full"
                    >
                      View Tournament
                    </Button>
                  </TournamentCard>
                );
              })}
          </SimpleGrid>
        </Box>
      </Box>
    </Container>
  );
};
