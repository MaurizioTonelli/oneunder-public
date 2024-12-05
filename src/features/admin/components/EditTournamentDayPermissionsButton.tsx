import { AddIcon, DeleteIcon, PlusSquareIcon } from "@chakra-ui/icons";
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

import { useTournamentManager } from "../api/useTournamentManager";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";

import { useParams } from "react-router-dom";

import { SelectedTournamentRoundContext } from "../config/selectedTournamentRoundContext";

const TextInput = forwardRef((props: any, ref) => {
  return (
    <FormControl>
      <FormLabel htmlFor={props.id}>{props.label}</FormLabel>
      <Input ref={ref} id={props.id} {...props} />
    </FormControl>
  );
});

export const EditTournamentDayPermissionsButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { setSelectedTournamentRound } = useContext(
    SelectedTournamentRoundContext
  );
  const queryClient = useQueryClient();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("none");
  const tournamentManager = useTournamentManager();
  const { dayid } = useParams();

  const removePermissions = async () => {
    if (
      confirm(
        "Are you sure you want to remove all permissions for this tournament day?"
      )
    ) {
      await tournamentManager.removePermissions(dayid);
      toast.success("Removed permissions");
      queryClient.invalidateQueries("tournament-day");
      setSelectedTournamentRound(undefined);
    }
  };

  const addPermissions = async () => {
    if (role == "none") {
      alert("Select a role");
      return;
    }
    if (email == "") {
      alert("Email is required");
      return;
    }

    if (!dayid) {
      alert("Tournament day not selected");
      return;
    }

    await tournamentManager.addPermissions(dayid, email, role);
    toast.success("Added permissions");
    queryClient.invalidateQueries("tournament-day");
    setSelectedTournamentRound(undefined);
  };
  return (
    <>
      <Button
        w={"full"}
        leftIcon={<PlusSquareIcon />}
        colorScheme="blue"
        onClick={onOpen}
      >
        Edit permissions
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a new round</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <TextInput
                label="Email"
                type="text"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
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
              <Button
                onClick={removePermissions}
                leftIcon={<DeleteIcon />}
                colorScheme="red"
              >
                Remove all permissions for Tournament Day
              </Button>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <ButtonGroup>
              <Button leftIcon={<GiCancel />} onClick={onClose}>
                Cancel
              </Button>
              <Button
                onClick={addPermissions}
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
