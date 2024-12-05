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
import { SelectedTournamentContext } from "../config/selectedTournamentContext";
import { Course, Round } from "../types";
import * as Realm from "realm-web";
import { useTournamentManager } from "../api/useTournamentManager";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";
import { AppContext } from "@/config/appContext";
import { useParams } from "react-router-dom";
const {
  BSON: { ObjectId, Long },
} = Realm;

const TextInput = forwardRef((props: any, ref) => {
  return (
    <FormControl>
      <FormLabel htmlFor={props.id}>{props.label}</FormLabel>
      <Input ref={ref} id={props.id} {...props} />
    </FormControl>
  );
});

export const AddTournamentRoundButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { appConfig } = useContext(AppContext);
  const { selectedTournament } = useContext(SelectedTournamentContext);
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [startingHole, setStartingHole] = useState(1);
  const [course, setCourse] = useState("null");
  const tournamentManager = useTournamentManager();
  const { dayid } = useParams();

  const addRound = async () => {
    if (course == "null") {
      alert("Select a course");
      return;
    }
    const round: Round = {
      _id: new ObjectId(),
      ownerId: appConfig?.currentUser?.id ?? "",
      name: name,
      startingHole: new Long(startingHole),
      handicapAdjustment: 0,
      inverseHcp: false,
      course: new ObjectId(course),
      dateCreated: new Date(),
    };

    await tournamentManager.addTournamentDayRound(dayid, round);
    toast.success("Added new round");
    queryClient.invalidateQueries("tournament-day");
  };
  return (
    <>
      <Button
        w={"full"}
        leftIcon={<PlusSquareIcon />}
        colorScheme="blue"
        onClick={onOpen}
      >
        New Round
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a new round</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <TextInput
                label="Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <TextInput
                type="number"
                value={startingHole}
                label="Starting Hole"
                onChange={(e) => {
                  setStartingHole(e.target.value);
                }}
              />

              <FormControl>
                <FormLabel>Course</FormLabel>
                <Select
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                >
                  <option value={"null"}>Select a course</option>
                  {selectedTournament &&
                    selectedTournament.poolOfCoursesArray?.map(
                      (course: Course) => {
                        return (
                          <option value={course._id}>{course.name}</option>
                        );
                      }
                    )}
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
                onClick={addRound}
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
