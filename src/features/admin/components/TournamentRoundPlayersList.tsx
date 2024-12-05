import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { forwardRef, useContext, useState } from "react";
import { SelectedTournamentRoundContext } from "../config/selectedTournamentRoundContext";
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
import { useQueryClient } from "react-query";
import { useTournamentManager } from "../api/useTournamentManager";
import { Course, Score, Tee, Player } from "../types";
import * as Realm from "realm-web";
import toast from "react-hot-toast";

import { GiCancel } from "react-icons/gi";
import { FaSave } from "react-icons/fa";
const {
  BSON: { Long },
} = Realm;

const environments = {
  player: "text-gray-600 bg-gray-300/10 ring-gray-300/20",
  betManager: "text-oneunder-400 bg-oneunder-400/10 ring-oneunder-400/30",
  admin: "text-oneunder-700 bg-oneunder-700/10 ring-oneunder-700/30",
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const TextInput = forwardRef((props: any, ref) => {
  return (
    <FormControl>
      <FormLabel htmlFor={props.id}>{props.label}</FormLabel>
      <Input ref={ref} id={props.id} {...props} />
    </FormControl>
  );
});

export const EditScoreButton = ({
  score,
  className,
  children,
}: {
  score: Score;
  className: string;
  children: any;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { selectedTournamentRound, setSelectedTournamentRound } = useContext(
    SelectedTournamentRoundContext
  );
  const queryClient = useQueryClient();
  const [handicap, setHandicap] = useState(score.handicap);
  const [role, setRole] = useState("none");
  const [teeName, setTeeName] = useState(score.tee);

  const tournamentManager = useTournamentManager();

  const updateScore = async () => {
    console.log(score._id.toString());
    if (teeName == "null") {
      alert("Select a tee");
      return;
    }
    const scoreModifications: any = {
      tee: teeName,
      handicap: new Long(Number(handicap)),
    };

    const result = await tournamentManager.updateTournamentDayPlayer(
      score._id.toString(),
      selectedTournamentRound?._id.toString() ?? "",
      scoreModifications,
      role,
      (score.player as unknown as Player).email
    );
    console.log(result);
    toast.success("Updated score");
    queryClient.invalidateQueries("tournaments");
    queryClient.invalidateQueries("tournament");
    queryClient.invalidateQueries("tournament-day");
    setSelectedTournamentRound(undefined);
  };
  return (
    <>
      <div className={className} onClick={onOpen}>
        {children}
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a new oyes</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <TextInput
                label="Handicap"
                type="number"
                defaultValue=""
                value={handicap}
                onChange={(e) => {
                  setHandicap(e.target.value);
                }}
              />
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
                onClick={updateScore}
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

export default function TournamentRoundPlayersList() {
  const { selectedTournamentRound } = useContext(
    SelectedTournamentRoundContext
  );
  return (
    <ul role="list" className="divide-y divide-white/5">
      {selectedTournamentRound &&
        selectedTournamentRound.scores &&
        selectedTournamentRound.scores.map((score) => (
          <li key={score._id}>
            <EditScoreButton
              score={score}
              className={`relative flex items-center space-x-4 rounded-md p-2 py-4 hover:cursor-pointer hover:shadow-sm active:shadow-md`}
            >
              <div className="min-w-0 flex-auto">
                <div className="flex items-center gap-x-3">
                  <h2 className="min-w-0 text-sm font-semibold leading-6 text-neutral-900">
                    <div className="flex gap-x-2">
                      <span className="truncate">{score.player.name}</span>
                      <span className="text-neutral-400">/</span>
                      <span className="truncate">{score.player.nickname}</span>
                    </div>
                  </h2>
                </div>
                <div className="mt-3 flex items-center gap-x-2.5 text-xs leading-5 text-neutral-500">
                  <p className="truncate">HCP: {score.handicap}</p>
                  <svg
                    viewBox="0 0 2 2"
                    className="h-0.5 w-0.5 flex-none fill-neutral-300"
                  >
                    <circle cx={1} cy={1} r={1} />
                  </svg>
                  <p className="whitespace-nowrap">
                    GHIN: {score.player.ghin}{" "}
                  </p>
                  <svg
                    viewBox="0 0 2 2"
                    className="h-0.5 w-0.5 flex-none fill-neutral-300"
                  >
                    <circle cx={1} cy={1} r={1} />
                  </svg>
                  <p className="whitespace-nowrap">ID: {score.player._id} </p>
                </div>
              </div>
              {}
              {selectedTournamentRound.tournamentPlayers?.includes(
                score.player.email
              ) && (
                <div
                  className={classNames(
                    environments["player"],
                    "flex-none rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset"
                  )}
                >
                  player
                </div>
              )}
              {selectedTournamentRound.betManagers?.includes(
                score.player.email
              ) && (
                <div
                  className={classNames(
                    environments["betManager"],
                    "flex-none rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset"
                  )}
                >
                  bet manager
                </div>
              )}
              {selectedTournamentRound.roundAdmins?.includes(
                score.player.email
              ) && (
                <div
                  className={classNames(
                    environments["admin"],
                    "flex-none rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset"
                  )}
                >
                  admin
                </div>
              )}
              <ChevronRightIcon
                className="h-5 w-5 flex-none text-neutral-400"
                aria-hidden="true"
              />
            </EditScoreButton>
          </li>
        ))}
    </ul>
  );
}
