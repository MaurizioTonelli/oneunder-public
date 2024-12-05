import defaultProfile from "@/assets/default-profile-picture.png";
import { Player } from "../types";
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
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { forwardRef, useContext, useState } from "react";
import { SelectedTournamentContext } from "../config/selectedTournamentContext";
import { useQueryClient } from "react-query";
import { useTournamentManager } from "../api/useTournamentManager";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { GiCancel } from "react-icons/gi";
import { FaSave } from "react-icons/fa";
import toast from "react-hot-toast";
import * as Realm from "realm-web";

const {
  BSON: { Double },
} = Realm;

const TextInput = forwardRef((props: any, ref) => {
  return (
    <FormControl>
      <FormLabel htmlFor={props.id}>{props.label}</FormLabel>
      <Input ref={ref} id={props.id} {...props} />
    </FormControl>
  );
});

export const EditPlayerButton = ({ player }: { player: Player }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const queryClient = useQueryClient();
  const [name, setName] = useState(player.name);
  const [nickname, setNickname] = useState(player.nickname);
  const [ghin, setGhin] = useState(player.ghin);
  const [hcp, setHcp] = useState(player.handicap_index);
  const [email, setEmail] = useState(player.email);
  const [category, setCategory] = useState(player.category);
  const [phoneNumber, setPhoneNumber] = useState(player.phone_number);
  const [club, setClub] = useState(player.club);

  const tournamentManager = useTournamentManager();

  const updatePlayer = async () => {
    const playerModifications: any = {
      name,
      nickname,
      handicap_index: new Double(Number(hcp)),
      ghin,
      email,
      category,
      phone_number: phoneNumber,
      club,
    };

    await tournamentManager.updateTournamentPlayer(
      player._id.toString(),
      playerModifications
    );
    toast.success("Updated player");
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
                label="Name"
                defaultValue=""
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <TextInput
                label="Nickname"
                defaultValue=""
                value={nickname}
                onChange={(e) => {
                  setNickname(e.target.value);
                }}
              />
              <TextInput
                label="HCP"
                defaultValue=""
                value={hcp}
                onChange={(e) => {
                  setHcp(e.target.value);
                }}
              />
              <TextInput
                label="GHIN"
                defaultValue=""
                value={ghin}
                onChange={(e) => {
                  setGhin(e.target.value);
                }}
              />
              <TextInput
                label="Email"
                defaultValue=""
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <TextInput
                label="Category"
                defaultValue=""
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              />
              <TextInput
                label="Phone"
                defaultValue=""
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                }}
              />
              <TextInput
                label="Club"
                defaultValue=""
                value={club}
                onChange={(e) => {
                  setClub(e.target.value);
                }}
              />
            </Stack>
          </ModalBody>

          <ModalFooter>
            <ButtonGroup>
              <Button leftIcon={<GiCancel />} onClick={onClose}>
                Cancel
              </Button>
              <Button
                onClick={updatePlayer}
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

export default function TournamentPlayerPool({
  players,
  isEditing,
}: {
  players?: Player[];
  isEditing: boolean;
}) {
  const tournamentManager = useTournamentManager();
  const queryClient = useQueryClient();
  const { selectedTournament } = useContext(SelectedTournamentContext);
  const handleDelete = async (player) => {
    if (
      !confirm(
        "Are you sure you want the player " +
          player.name +
          " from the tournament pool?"
      )
    )
      return;

    await tournamentManager.deleteTournamentPlayer(
      player._id,
      selectedTournament?._id.toString() ?? ""
    );
    toast.success("Deleted player");
    queryClient.invalidateQueries("tournaments");
    queryClient.invalidateQueries("tournament");
  };
  return (
    <>
      <ul role="list" className="divide-y divide-gray-100">
        {players &&
          players.map((player, i) => (
            <li key={i} className="flex justify-between gap-x-6 py-2">
              <div className="flex flex-row items-center gap-4">
                {isEditing && (
                  <div className="flex flex-row gap-2">
                    <DeleteIcon
                      onClick={() => handleDelete(player)}
                      boxSize={5}
                      color={"lightgray"}
                      _hover={{ color: "gray", cursor: "pointer" }}
                    />
                    <EditPlayerButton player={player} />
                  </div>
                )}
                <div className="flex min-w-0 gap-x-4">
                  <img
                    className="h-12 w-12 flex-none rounded-full bg-gray-50"
                    src={defaultProfile}
                    alt=""
                  />
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      {player.name}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {player.nickname}
                    </p>
                  </div>
                </div>
              </div>
              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 text-gray-900">
                  Ghin: <span className="font-medium">{player.ghin}</span>
                </p>
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  HCP: {Number(player.handicap_index)}
                </p>
              </div>
            </li>
          ))}
      </ul>
    </>
  );
}
