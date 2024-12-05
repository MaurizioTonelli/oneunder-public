import { AppContext } from "@/config/appContext";
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
import { Tournament } from "../types";
import * as Realm from "realm-web";
import { useTournamentManager } from "../api/useTournamentManager";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";
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

const Form = ({
  tournamentName,
  setTournamentName,
  tournamentDate,
  setTournamentDate,
}: {
  tournamentName: any;
  setTournamentName: any;
  tournamentDate: any;
  setTournamentDate: any;
}) => {
  return (
    <Stack spacing={4}>
      <TextInput
        label="Date"
        size="md"
        type="date"
        value={tournamentDate}
        onChange={(e) => setTournamentDate(e.target.value)}
      />
      <TextInput
        label="Name"
        id="tournament-name"
        value={tournamentName}
        onChange={(e) => {
          setTournamentName(e.target.value);
        }}
      />
    </Stack>
  );
};

export const AddTournamentButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { appConfig } = useContext(AppContext);
  const tournamentManager = useTournamentManager();
  const [tournamentName, setTournamentName] = useState("");
  const [tournamentDate, setTournamentDate] = useState(new Date());
  const queryClient = useQueryClient();

  const addTournament = async () => {
    const tournament: Tournament = {
      _id: new ObjectId(),
      date: new Date(tournamentDate),
      ownerId: appConfig?.currentUser?.id ?? "",
      tournamentName: tournamentName,
      tournamentDays: [],
      poolOfPlayers: [],
      poolOfCoursesArray: [],
    };

    await tournamentManager.addTournament(tournament);
    toast.success("Added new tournament");
    queryClient.invalidateQueries("tournaments");
  };

  return (
    <>
      <Button
        w={"full"}
        leftIcon={<PlusSquareIcon />}
        colorScheme="blue"
        onClick={onOpen}
      >
        New Tournament
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a new tournament</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Form
              tournamentDate={tournamentDate}
              setTournamentDate={setTournamentDate}
              tournamentName={tournamentName}
              setTournamentName={setTournamentName}
            />
          </ModalBody>

          <ModalFooter>
            <ButtonGroup>
              <Button leftIcon={<GiCancel />} onClick={onClose}>
                Cancel
              </Button>
              <Button
                onClick={addTournament}
                leftIcon={<AddIcon />}
                colorScheme="blue"
              >
                Add
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
