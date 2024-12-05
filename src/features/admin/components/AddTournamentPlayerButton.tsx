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
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { forwardRef, useContext, useState } from "react";
import { GiCancel } from "react-icons/gi";
import { Player } from "../types";
import * as Realm from "realm-web";
import { useTournamentManager } from "../api/useTournamentManager";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";
import { AppContext } from "@/config/appContext";
import { SelectedTournamentContext } from "../config/selectedTournamentContext";
const {
  BSON: { ObjectId, Double },
} = Realm;

const TextInput = forwardRef((props: any, ref) => {
  return (
    <FormControl>
      <FormLabel htmlFor={props.id}>{props.label}</FormLabel>
      <Input ref={ref} id={props.id} {...props} />
    </FormControl>
  );
});

export const AddTournamentPlayerButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { appConfig } = useContext(AppContext);
  const { selectedTournament } = useContext(SelectedTournamentContext);
  const queryClient = useQueryClient();
  const [handicapIndex, setHandicapIndex] = useState(8);
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [ghin, setGhin] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [club, setClub] = useState("");
  const tournamentManager = useTournamentManager();

  const addPlayer = async () => {
    const player: Player = {
      _id: new ObjectId(),
      ownerId: appConfig?.currentUser?.id ?? "",
      handicap_index: new Double(handicapIndex),
      name: name,
      nickname: nickname,
      ghin: ghin,
      email: email,
      category: category,
      phone_number: phoneNumber,
      club: club,
    };

    await tournamentManager.addTournamentPlayer(
      selectedTournament?._id,
      player
    );
    toast.success("Added new player");
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
        Add player
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a new player</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <TextInput
                type="number"
                label="Handicap Index"
                id="handicap-index"
                value={handicapIndex}
                onChange={(e) => {
                  setHandicapIndex(e.target.value);
                }}
              />
              <TextInput
                label="Name"
                id="name"
                defaultValue=""
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <TextInput
                label="Nickname"
                id="nickname"
                defaultValue=""
                value={nickname}
                onChange={(e) => {
                  setNickname(e.target.value);
                }}
              />
              <TextInput
                label="Ghin"
                id="ghin"
                defaultValue=""
                value={ghin}
                onChange={(e) => {
                  setGhin(e.target.value);
                }}
              />
              <TextInput
                label="Email"
                id="email"
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
                label="Phone Number"
                defaultValue=""
                type="tel"
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
