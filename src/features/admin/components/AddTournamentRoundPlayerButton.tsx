import { AddIcon, PlusSquareIcon } from "@chakra-ui/icons";
import {
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { GiCancel } from "react-icons/gi";
import { SelectedTournamentContext } from "../config/selectedTournamentContext";
import { Course, Player, Tee } from "../types";
import { useTournamentManager } from "../api/useTournamentManager";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";
import { SelectedTournamentRoundContext } from "../config/selectedTournamentRoundContext";
import { useParams } from "react-router-dom";
import { useTournamentDay } from "../api/getTournamentDay";

export const AddTournamentRoundPlayerButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { selectedTournament } = useContext(SelectedTournamentContext);
  const { selectedTournamentRound } = useContext(
    SelectedTournamentRoundContext
  );
  const { dayid } = useParams();
  const queryClient = useQueryClient();
  const [playerId, setPlayerId] = useState("null");
  const [role, setRole] = useState("none");
  const [teeName, setTeeName] = useState("null");
  const tournamentManager = useTournamentManager();
  const tournamentDay = useTournamentDay({}, dayid ?? "");

  const addPlayer = async () => {
    if (playerId == "null") {
      alert("Select a player");
      return;
    }
    if (teeName == "null") {
      alert("Select a tee");
      return;
    }
    await tournamentManager.addTournamentDayPlayer(
      selectedTournamentRound?._id,
      playerId,
      (selectedTournamentRound?.course as Course).tees?.find(
        (tee) => tee.name == teeName
      ),
      role
    );
    toast.success("Added new player");
    queryClient.invalidateQueries("tournament-day");
  };
  return (
    <div>
      <Button
        mb={4}
        w={"full"}
        leftIcon={<PlusSquareIcon />}
        colorScheme="blue"
        onClick={onOpen}
      >
        Add player
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a new player</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>Player</FormLabel>
                <Select
                  value={playerId}
                  onChange={(e) => {
                    setPlayerId(e.target.value);
                  }}
                >
                  <option value="null">Select player</option>
                  {selectedTournament &&
                    tournamentDay.data &&
                    selectedTournament.poolOfPlayers
                      ?.filter(
                        (player: Player) =>
                          player.category == tournamentDay.data[0].category
                      )
                      .map((player: Player) => {
                        return (
                          <option value={player._id.toString()}>
                            {player.name}
                          </option>
                        );
                      })}
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Tee</FormLabel>
                <Select
                  value={teeName}
                  onChange={(e) => {
                    setTeeName(e.target.value);
                  }}
                >
                  <option value="null">Select tee</option>
                  {selectedTournamentRound &&
                    selectedTournamentRound.course &&
                    (selectedTournamentRound.course as Course).tees?.map(
                      (tee: Tee) => {
                        return <option value={tee.name}>{tee.name}</option>;
                      }
                    )}
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Role</FormLabel>
                <Select
                  value={role}
                  onChange={(e) => {
                    setRole(e.target.value);
                  }}
                >
                  <option value="none">None</option>
                  <option value="round-player">Round Player</option>
                  <option value="bet-manager">Bet Manager</option>
                  <option value="round-admin">Round Admin</option>
                </Select>
              </FormControl>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <ButtonGroup>
              <Button leftIcon={<GiCancel />} onClick={onClose}>
                Cancel
              </Button>
              <Button
                onClick={addPlayer}
                leftIcon={<AddIcon />}
                colorScheme="blue"
              >
                Add
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};
