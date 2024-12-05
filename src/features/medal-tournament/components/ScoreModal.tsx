import {
  RadioButton,
  RadioButtonGroup,
} from "@/components/elements/RadioButtonGroup";
import {
  Box,
  Container,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Select,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import { MatchTable } from "./MatchTable/MatchTable";
import { UserCard } from "./UserCard/UserCard";
import { PlayerStatBar } from "./PlayerStatBar/PlayerStatBar";

function findFirstScoreByPlayerId(rounds, playerId) {
  if (!rounds) return null;
  for (let round of rounds) {
    // Find the score in the current round for the given player ID
    const score = round.scores.find((score) => score.player._id === playerId);
    if (score) {
      return score; // Return the first score found for the player
    }
  }
  return null; // Return null if no score is found for the player in any round
}

const ScoreInfo = ({
  player,
  tournamentDays,
  scorePerDay,
  position,
}: {
  player: any;
  tournamentDays: any;
  scorePerDay: any;
  position: any;
}) => {
  const [selectedDay, setSelectedDay] = useState(tournamentDays[0]._id);

  const selectedTournamentDay = tournamentDays.find((day: any) => {
    return day._id.toString() == selectedDay.toString();
  });

  const playerScore = findFirstScoreByPlayerId(
    selectedTournamentDay?.rounds,
    player._id
  );

  return (
    <div className="bg-white py-16">
      <UserCard player={player} />
      <PlayerStatBar
        tournamentDays={tournamentDays}
        scorePerDay={scorePerDay}
        position={position}
      />

      <Box bg="bg.surface" pt={{ base: "2", md: "4" }}>
        <Container maxW={{ base: "xs", sm: "lg" }} overflow={"auto"}>
          <Stack spacing="5">
            <RadioButtonGroup
              display={{ base: "none", md: "flex" }}
              value={selectedDay}
              onChange={(value) => {
                setSelectedDay(value);
              }}
              defaultValue="net"
              size={"md"}
            >
              {tournamentDays &&
                tournamentDays.map((day: any) => {
                  return (
                    <RadioButton value={day._id.toString()}>
                      {day.label}
                    </RadioButton>
                  );
                })}
            </RadioButtonGroup>
          </Stack>
        </Container>
        <FormControl
          alignItems={"center"}
          display={{ base: "flex", md: "none" }}
        >
          <FormLabel w={"full"}>Tournament day</FormLabel>
          <Select
            onChange={(e) => {
              setSelectedDay(e.target.value);
            }}
            w={"full"}
          >
            {tournamentDays &&
              tournamentDays.map((day: any) => {
                return <option value={day._id.toString()}>{day.label}</option>;
              })}
          </Select>
        </FormControl>
      </Box>
      <MatchTable
        score={playerScore}
        course={selectedTournamentDay?.rounds[0]?.course}
      />
    </div>
  );
};

export default function ScoreModal({
  isOpen,
  onClose,
  player,
  tournamentDays,
  scorePerDay,
  position,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"5xl"}>
      <ModalOverlay zIndex="1500" />
      <ModalContent
        containerProps={{
          zIndex: "1501",
        }}
      >
        <ModalCloseButton />
        <ModalBody>
          <ScoreInfo
            player={player}
            tournamentDays={tournamentDays}
            scorePerDay={scorePerDay}
            position={position}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
