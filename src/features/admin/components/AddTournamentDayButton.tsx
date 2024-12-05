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
import { TournamentDay } from "../types";
import * as Realm from "realm-web";
import { useTournamentManager } from "../api/useTournamentManager";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";
import { AppContext } from "@/config/appContext";
import { SelectedTournamentContext } from "../config/selectedTournamentContext";
const {
  BSON: { ObjectId, Int32 },
} = Realm;

const TextInput = forwardRef((props: any, ref) => {
  return (
    <FormControl>
      <FormLabel htmlFor={props.id}>{props.label}</FormLabel>
      <Input ref={ref} id={props.id} {...props} />
    </FormControl>
  );
});

export const AddTournamentDayButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { appConfig } = useContext(AppContext);
  const { selectedTournament } = useContext(SelectedTournamentContext);
  const queryClient = useQueryClient();
  const [tournamentDayDate, setTournamentDayDate] = useState(new Date());
  const [label, setLabel] = useState("");
  const [category, setCategory] = useState("");
  const [day, setDay] = useState(1);
  const tournamentManager = useTournamentManager();

  const addTournamentDay = async () => {
    const tournamentDay: TournamentDay = {
      _id: new ObjectId(),
      date: new Date(tournamentDayDate),
      ownerId: appConfig?.currentUser?.id ?? "",
      label: label,
      day: new Int32(day),
      category: category,
    };

    await tournamentManager.addTournamentDay(
      selectedTournament?._id,
      tournamentDay
    );
    toast.success("Added new tournament day");
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
        Add Tournament Day
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a Tournament Day</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <TextInput
                label="Date"
                size="md"
                type="date"
                value={tournamentDayDate}
                onChange={(e) => setTournamentDayDate(e.target.value)}
              />
              <TextInput
                label="Day"
                size="md"
                type="number"
                value={day}
                onChange={(e) => setDay(e.target.value)}
              />
              <TextInput
                label="Label"
                id="label"
                defaultValue=""
                value={label}
                onChange={(e) => setLabel(e.target.value)}
              />
              <TextInput
                label="Category"
                id="category"
                defaultValue=""
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Stack>
          </ModalBody>

          <ModalFooter>
            <ButtonGroup>
              <Button leftIcon={<GiCancel />} onClick={onClose}>
                Cancel
              </Button>
              <Button
                onClick={addTournamentDay}
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
