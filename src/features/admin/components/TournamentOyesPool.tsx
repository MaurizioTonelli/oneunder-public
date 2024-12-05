import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Image,
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
import { useTournamentManager } from "../api/useTournamentManager";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";
import { forwardRef, useContext, useEffect, useState } from "react";
import { SelectedTournamentContext } from "../config/selectedTournamentContext";
import * as Realm from "realm-web";
import { GiCancel } from "react-icons/gi";
import { Oyes, Player } from "../types";
import { FaSave } from "react-icons/fa";

const {
  BSON: { ObjectId },
} = Realm;

function transformArray(inputArray) {
  // Group objects by the 'hole' property
  const groupedByHole = inputArray.reduce((acc, item) => {
    if (!acc[item.hole]) {
      acc[item.hole] = [];
    }
    acc[item.hole].push(item);
    return acc;
  }, {});

  // Transform the grouped objects into the desired array structure
  const transformedArray = Object.keys(groupedByHole).map((hole) => ({
    hole: hole,
    list: groupedByHole[hole],
  }));

  return transformedArray;
}

const TextInput = forwardRef((props: any, ref) => {
  return (
    <FormControl>
      <FormLabel htmlFor={props.id}>{props.label}</FormLabel>
      <Input ref={ref} id={props.id} {...props} />
    </FormControl>
  );
});

export const EditOyesButton = ({ oyes }: { oyes: Oyes }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { selectedTournament } = useContext(SelectedTournamentContext);
  const queryClient = useQueryClient();
  const [hole, setHole] = useState(oyes.hole);
  const [place, setPlace] = useState(oyes.place);
  const [distance, setDistance] = useState(oyes.distance);
  const [playerId, setPlayerId] = useState("");
  const tournamentManager = useTournamentManager();
  useEffect(() => {
    if (oyes.player && (oyes.player as Player)._id) {
      setPlayerId((oyes.player as Player)._id.toString());
    }
  }, []);

  const updateOyes = async () => {
    if (playerId == "null") {
      alert("Select a player");
      return;
    }

    const oyesModifications: any = {
      hole: hole,
      distance: distance,
      place: place,
      player: new ObjectId(playerId),
    };

    await tournamentManager.updateTournamentOyes(
      oyes._id.toString(),
      oyesModifications
    );
    toast.success("Updated oyes");
    queryClient.invalidateQueries("tournaments");
    queryClient.invalidateQueries("tournament");
  };
  return (
    <>
      <EditIcon
        onClick={onOpen}
        boxSize={5}
        color={"lightgray"}
        _hover={{ color: "gray", cursor: "pointer" }}
      />

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
                label="Place"
                defaultValue=""
                value={place}
                onChange={(e) => {
                  setPlace(e.target.value);
                }}
              />
              <TextInput
                label="Distance from Hole"
                defaultValue=""
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
                onClick={updateOyes}
                leftIcon={<FaSave />}
                colorScheme="blue"
              >
                Update
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default function TournamentOyesPool({ oyesList, isEditing }) {
  const oyes = transformArray(oyesList);
  const tournamentManager = useTournamentManager();
  const queryClient = useQueryClient();
  const { selectedTournament } = useContext(SelectedTournamentContext);

  const handleDelete = async (oyes) => {
    if (
      !confirm(
        "Are you sure you want to delete the oyes from player " +
          oyes.player.name
      )
    )
      return;

    await tournamentManager.deleteTournamentOyes(
      oyes._id,
      selectedTournament?._id.toString() ?? ""
    );
    toast.success("Deleted oyes");
    queryClient.invalidateQueries("tournaments");
    queryClient.invalidateQueries("tournament");
  };

  return (
    <div className="w-full" aria-label="Directory">
      {oyes.map((oyesRow, i) => (
        <div key={i} className="relative ">
          <div className="flex justify-center sticky top-0 z-10 border-y border-b-gray-200 border-t-gray-100 bg-white px-3 py-1.5 text-md font-semibold leading-6 text-oneunder-700">
            <h3>Oyes for hole {oyesRow.hole}</h3>
          </div>
          <ul role="list" className="divide-y divide-gray-100">
            {oyesRow.list
              .sort((a, b) => a.distance - b.distance)
              .map((oyes, i) => (
                <li
                  key={i}
                  className="flex gap-x-4 px-3 py-5 items-center justify-between"
                >
                  <div className="flex gap-x-4 px-3 py-5 items-center">
                    {isEditing && (
                      <>
                        <DeleteIcon
                          onClick={() => handleDelete(oyes)}
                          boxSize={5}
                          color={"lightgray"}
                          _hover={{ color: "gray", cursor: "pointer" }}
                        />
                        <EditOyesButton oyes={oyes} />
                      </>
                    )}
                    <Image
                      className="h-12 w-12 flex-none rounded-full bg-gray-50"
                      src={`https://m6whsbmjlbhr6evj.public.blob.vercel-storage.com/0-oneunder-tournament-photos/${oyes.player?.ghin}.png`}
                      fallbackSrc="https://m6whsbmjlbhr6evj.public.blob.vercel-storage.com/0-oneunder-tournament-photos/undefined.png"
                      alt=""
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {oyes.player?.name}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {oyes.distance} cm
                      </p>
                    </div>
                  </div>
                  <p className="mt-1 truncate text-xl leading-5 text-gray-500">
                    {oyes.place}
                  </p>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
