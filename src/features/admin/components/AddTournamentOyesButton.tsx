import { AddIcon, PlusSquareIcon } from "@chakra-ui/icons";
import {
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Input,
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
import { forwardRef, useContext, useState } from "react";
import { GiCancel } from "react-icons/gi";
import { Oyes } from "../types";
import * as Realm from "realm-web";
import { useTournamentManager } from "../api/useTournamentManager";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";
import { AppContext } from "@/config/appContext";
import { SelectedTournamentContext } from "../config/selectedTournamentContext";
const {
  BSON: { ObjectId },
} = Realm;

const TextInput = forwardRef((props: any, ref) => {
  return (
    <FormControl>
      <FormLabel htmlFor={props.id}>{props.label}</FormLabel>
      <Input ref={ref} id={props.id} {...props} />
    </FormControl>
  );
});

export const AddTournamentOyesButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { appConfig } = useContext(AppContext);
  const { selectedTournament } = useContext(SelectedTournamentContext);
  const queryClient = useQueryClient();
  const [hole, setHole] = useState("");
  const [place] = useState("");
  const [distance, setDistance] = useState("");
  const [playerId, setPlayerId] = useState("null");
  const tournamentManager = useTournamentManager();

  const addOyes = async () => {
    if (playerId == "null") {
      alert("Select a player");
      return;
    }

    const oyes: Oyes = {
      _id: new ObjectId(),
      ownerId: appConfig?.currentUser?.id ?? "",
      hole: hole,
      distance: distance,
      place: place,
      player: new ObjectId(playerId),
    };

    await tournamentManager.addTournamentOyes(selectedTournament?._id, oyes);
    toast.success("Added new oyes");
    queryClient.invalidateQueries("tournaments");
    queryClient.invalidateQueries("tournament");
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
        Add oyes
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a new oyes</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <TextInput
                label="Hole"
                defaultValue=""
                value={hole}
                onChange={(e) => {
                  setHole(e.target.value);
                }}
              />
              <TextInput
                label="Distance from Hole (in cm's)"
                defaultValue=""
                type="number"
                value={distance}
                onChange={(e) => {
                  setDistance(e.target.value);
                }}
              />
              <FormControl>
                <FormLabel>Player</FormLabel>

                <Select
                  value={playerId}
                  onChange={(e) => setPlayerId(e.target.value)}
                >
                  <option value="null">-- Select a player --</option>
                  {selectedTournament?.poolOfPlayers?.map((player) => (
                    <option value={player._id.toString()}>
                      {player.name} | {player.ghin}
                    </option>
                  ))}
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
                onClick={addOyes}
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
