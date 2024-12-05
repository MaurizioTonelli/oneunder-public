import { Button } from "@chakra-ui/react";
import { useContext, useRef } from "react";
import { FaFileImport } from "react-icons/fa";
import { importPlayers } from "../utils/importPlayers";
import { Player } from "../types";
import * as Realm from "realm-web";
import { AppContext } from "@/config/appContext";
import { useTournamentManager } from "../api/useTournamentManager";
import { SelectedTournamentContext } from "../config/selectedTournamentContext";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";

const {
  BSON: { ObjectId, Double },
} = Realm;

export const ImportPlayersButton = () => {
  // Create a ref for the hidden file input with TypeScript type
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const { appConfig } = useContext(AppContext);
  const tournamentManager = useTournamentManager();
  const { selectedTournament } = useContext(SelectedTournamentContext);
  const queryClient = useQueryClient();

  // Method to simulate click on hidden file input
  const handleClick = () => {
    hiddenFileInput.current?.click();
  };

  const writePlayersToDatabase = async (data) => {
    let players: Player[] = [];
    data.map((playerData) => {
      const player: Player = {
        _id: new ObjectId(),
        ownerId: appConfig?.currentUser?.id ?? "",
        handicap_index: new Double(playerData["HCP Index"]),
        name: playerData["Name"],
        nickname: playerData["Nickname"],
        ghin: playerData["GHIN"],
        email: playerData["Email"],
        category: playerData["Category"],
        phone_number: playerData["Phone"],
        club: playerData["Club"],
      };
      players.push(player);
    });
    await tournamentManager.addTournamentPlayers(
      selectedTournament?._id,
      players
    );
    toast.success(`Added ${players.length} players to the tournament pool`);
    queryClient.invalidateQueries("tournaments");
    queryClient.invalidateQueries("tournament");
  };

  return (
    <>
      <Button
        mb={4}
        w={"full"}
        leftIcon={<FaFileImport />}
        colorScheme="blue"
        onClick={handleClick}
      >
        Import Players
      </Button>
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={(e) =>
          importPlayers(e, (data) => writePlayersToDatabase(data))
        }
        style={{ display: "none" }} // Hide the file input
        accept=".csv" // Optionally, ensure only CSV files can be selected
      />
    </>
  );
};
