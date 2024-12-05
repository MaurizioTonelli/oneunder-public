import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { forwardRef, useContext, useState } from "react";
import { SelectedTournamentContext } from "../config/selectedTournamentContext";
import { TournamentDay } from "../types";
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
import { useQueryClient } from "react-query";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

import toast from "react-hot-toast";
import { useTournamentManager } from "../api/useTournamentManager";
import { GiCancel } from "react-icons/gi";
import { FaSave } from "react-icons/fa";

const TextInput = forwardRef((props: any, ref) => {
  return (
    <FormControl>
      <FormLabel htmlFor={props.id}>{props.label}</FormLabel>
      <Input ref={ref} id={props.id} {...props} />
    </FormControl>
  );
});

const environments = {
  default: "text-oneunder-400 bg-oneunder-400/10 ring-oneunder-400/30",
  na: "text-gray-400 bg-gray-400/10 ring-gray-400/30",
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const EditTournamentDayButton = ({
  tournamentDay,
}: {
  tournamentDay: TournamentDay;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const queryClient = useQueryClient();

  const [date, setDate] = useState(
    new Date(tournamentDay.date ?? "").toLocaleDateString("en-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
  );
  const [day, setDay] = useState(tournamentDay.day);
  const [label, setLabel] = useState(tournamentDay.label);
  const [category, setCategory] = useState(tournamentDay.category);

  const tournamentManager = useTournamentManager();

  const updateTournamentDay = async () => {
    const tournamentDayModifications: any = {
      date: new Date(date),
      day: Number(day),
      label,
      category,
    };

    await tournamentManager.updateTournamentDay(
      tournamentDay._id.toString(),
      tournamentDayModifications
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
                label="Date"
                size="md"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
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
                onClick={updateTournamentDay}
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

export default function TournamentDayList({ isEditing }) {
  const { selectedTournament } = useContext(SelectedTournamentContext);
  const tournamentManager = useTournamentManager();
  const queryClient = useQueryClient();

  const handleDelete = async (tournamentDay) => {
    if (
      !confirm(
        "Are you sure you want the tournamentDay " +
          tournamentDay.label +
          " from the tournament?"
      )
    )
      return;

    await tournamentManager.deleteTournamentDay(
      tournamentDay._id,
      selectedTournament?._id.toString() ?? ""
    );
    toast.success("Deleted tournament day");
    queryClient.invalidateQueries("tournaments");
    queryClient.invalidateQueries("tournament");
  };
  return (
    <ul role="list" className="divide-y divide-white/5">
      {selectedTournament &&
        selectedTournament.tournamentDays &&
        selectedTournament.tournamentDays.map((tournamentDay, i) => (
          <li key={i}>
            <div className="w-full flex flex-row items-center gap-4">
              {isEditing && (
                <div className="flex flex-row gap-2">
                  <DeleteIcon
                    onClick={() => handleDelete(tournamentDay)}
                    boxSize={5}
                    color={"lightgray"}
                    _hover={{ color: "gray", cursor: "pointer" }}
                  />
                  <EditTournamentDayButton tournamentDay={tournamentDay} />
                </div>
              )}
              <a
                href={`/app/admin/tournament-days/${selectedTournament._id}/${tournamentDay._id}`}
                className={`relative w-full flex items-center space-x-4 rounded-md p-2 py-4 hover:cursor-pointer hover:shadow-sm active:shadow-md`}
              >
                <div className="min-w-0 flex-auto">
                  <div className="flex items-center gap-x-3">
                    <h2 className="min-w-0 text-sm font-semibold leading-6 text-neutral-900">
                      <div className="flex gap-x-2">
                        <span className="truncate">{tournamentDay.label}</span>
                        <span className="text-neutral-400">/</span>
                        <span className="truncate">
                          Day {Number(tournamentDay.day)}{" "}
                          {tournamentDay.category}
                        </span>
                      </div>
                    </h2>
                  </div>
                  <div className="mt-3 flex items-center gap-x-2.5 text-xs leading-5 text-neutral-500">
                    <p className="truncate">
                      {new Date(tournamentDay.date ?? "").toLocaleDateString(
                        "es-mx"
                      )}
                    </p>
                    <svg
                      viewBox="0 0 2 2"
                      className="h-0.5 w-0.5 flex-none fill-neutral-300"
                    >
                      <circle cx={1} cy={1} r={1} />
                    </svg>
                    <p className="whitespace-nowrap">
                      {tournamentDay.rounds?.length} rounds
                    </p>
                  </div>
                </div>
                <div
                  className={classNames(
                    environments[tournamentDay.category ? "default" : "na"],
                    "flex-none rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset"
                  )}
                >
                  {tournamentDay.category ?? "N/A"}
                </div>
                <ChevronRightIcon
                  className="h-5 w-5 flex-none text-neutral-400"
                  aria-hidden="true"
                />
              </a>
            </div>
          </li>
        ))}
    </ul>
  );
}
