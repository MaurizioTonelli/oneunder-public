import { Button } from "@chakra-ui/react";
import { useContext } from "react";
import { FaFileImport } from "react-icons/fa";
import { useTournamentManager } from "../api/useTournamentManager";
import { SelectedTournamentContext } from "../config/selectedTournamentContext";

export const ChangePlayerEmailsButton = () => {
  // Create a ref for the hidden file input with TypeScript type
  const tournamentManager = useTournamentManager();
  const { selectedTournament } = useContext(SelectedTournamentContext);

  const playerIds = selectedTournament?.poolOfPlayers?.map(
    (player) => player._id
  );

  const changeEmails = async () => {
    if (playerIds) {
      await tournamentManager.changeTournamentEmailsToOneunderEmail(
        playerIds as string[]
      );
    }
  };

  return (
    <Button
      mb={4}
      w={"full"}
      leftIcon={<FaFileImport />}
      colorScheme="blue"
      onClick={changeEmails}
    >
      Change all emails to oneunderapp@gmail.com
    </Button>
  );
};
