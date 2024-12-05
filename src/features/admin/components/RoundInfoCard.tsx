import {
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  StackDivider,
  Text,
  Input,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { EditIcon } from "@chakra-ui/icons";
import { useTournamentManager } from "../api/useTournamentManager";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";
import { SelectedTournamentRoundContext } from "../config/selectedTournamentRoundContext";
import { useParams } from "react-router-dom";
import * as Realm from "realm-web";

const {
  BSON: { Long },
} = Realm;

export const RoundInfoCard = () => {
  const tournamentManager = useTournamentManager();
  const { dayid } = useParams();
  const queryClient = useQueryClient();
  const { selectedTournamentRound, setSelectedTournamentRound } = useContext(
    SelectedTournamentRoundContext
  );
  const [isEditing, setIsEditing] = useState(false);
  const [roundName, setRoundName] = useState(selectedTournamentRound?.name);
  const [roundDate, setRoundDate] = useState(
    selectedTournamentRound?.dateCreated
  );
  const [roundStartingHole, setRoundStartingHole] = useState(
    selectedTournamentRound?.startingHole
  );
  const [roundHandicapAdjustment, setRoundHandicapAdjustment] = useState(
    selectedTournamentRound?.handicapAdjustment
  );
  const [inverseHcp, setInverseHcp] = useState(
    selectedTournamentRound?.inverseHcp
  );

  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  useEffect(() => {
    setIsEditing(false);
    setRoundDate(selectedTournamentRound?.dateCreated);
    setRoundName(selectedTournamentRound?.name);
  }, [selectedTournamentRound]);

  const deleteRound = async () => {
    const confirmation = confirm(
      "Are you sure you want to delete this round? "
    );
    if (confirmation) {
      setLoadingDelete(true);
      await tournamentManager.deleteTournamentDayRound(
        selectedTournamentRound?._id.toString() ?? "",
        dayid ?? ""
      );
      toast.success("Round deleted");
      queryClient.invalidateQueries("tournaments");
      queryClient.invalidateQueries("tournament");
      queryClient.invalidateQueries("tournament-day");
      setLoadingDelete(false);
      setSelectedTournamentRound(undefined);
    }
  };

  const saveRoundInfo = async () => {
    setLoading(true);
    await tournamentManager.updateTournamentDayRound(
      selectedTournamentRound?._id.toString() ?? "",
      {
        dateCreated: new Date(roundDate ?? ""),
        name: roundName,
        handicapAdjustment: new Long(roundHandicapAdjustment),
        startingHole: new Long(Number(roundStartingHole)),
        inverseHcp: inverseHcp,
      }
    );
    toast.success("Round saved");
    queryClient.invalidateQueries("tournaments");
    queryClient.invalidateQueries("tournament");
    queryClient.invalidateQueries("tournament-day");

    setIsEditing(false);
    setLoading(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setRoundName(selectedTournamentRound?.name);
  };
  return (
    <Box as="section" py={{ base: "4", md: "8" }}>
      <Container maxW="3xl">
        <Box
          bg="bg.surface"
          boxShadow="sm"
          borderRadius="lg"
          p={{ base: "4", md: "6" }}
        >
          <Stack spacing="5" divider={<StackDivider />}>
            <Stack
              justify="space-between"
              direction={{ base: "column", sm: "row" }}
              spacing="5"
            >
              <Stack spacing="1">
                {isEditing && (
                  <Input
                    value={roundName}
                    onChange={(e) => setRoundName(e.target.value)}
                  />
                )}
                {!isEditing && (
                  <Text textStyle="lg" fontWeight="medium" flex={"row"}>
                    {selectedTournamentRound?.name}
                  </Text>
                )}
                <Text fontSize="xs" color="fg.muted">
                  ID: {selectedTournamentRound?._id.toString()}
                </Text>
              </Stack>
              <Stack direction="row" alignItems={"center"}>
                {isEditing && (
                  <>
                    <Button onClick={handleCancelEdit}>Cancel</Button>
                    <Button
                      colorScheme="blue"
                      onClick={saveRoundInfo}
                      isLoading={loading}
                    >
                      Save changes
                    </Button>
                  </>
                )}
                {!isEditing && (
                  <IconButton
                    aria-label="Search database"
                    icon={<EditIcon />}
                    onClick={() => setIsEditing(true)}
                  />
                )}

                <Button
                  isLoading={loadingDelete}
                  colorScheme="red"
                  onClick={deleteRound}
                >
                  Delete round
                </Button>
              </Stack>
            </Stack>
            <Stack justify="space-between" direction="row" spacing="4">
              <Stack spacing="0.5" fontSize="sm">
                <Text color="fg.emphasized" fontWeight="medium">
                  Date
                </Text>
                {isEditing && (
                  <Input
                    type="date"
                    value={new Date(roundDate ?? "").toISOString().slice(0, 10)}
                    onChange={(e) => {
                      setRoundDate(e.target.value);
                    }}
                  />
                )}
                {!isEditing && (
                  <Text color="fg.muted">
                    {new Date(
                      selectedTournamentRound?.dateCreated ?? ""
                    ).toLocaleDateString("es-MX")}
                  </Text>
                )}
              </Stack>
              <Stack spacing="0.5" fontSize="sm">
                <Text color="fg.emphasized" fontWeight="medium">
                  Starting hole
                </Text>
                {isEditing && (
                  <Input
                    type="number"
                    value={Number(roundStartingHole)}
                    onChange={(e) => {
                      setRoundStartingHole(Number(e.target.value));
                    }}
                  />
                )}
                {!isEditing && (
                  <Text color="fg.muted">{roundStartingHole?.toString()}</Text>
                )}
              </Stack>
              <Stack spacing="0.5" fontSize="sm">
                <Text color="fg.emphasized" fontWeight="medium">
                  Handicap Adjustment
                </Text>
                {isEditing && (
                  <Input
                    type="number"
                    value={Number(roundHandicapAdjustment)}
                    onChange={(e) => {
                      setRoundHandicapAdjustment(Number(e.target.value));
                    }}
                  />
                )}
                {!isEditing && (
                  <Text color="fg.muted">
                    {roundHandicapAdjustment?.toString()}
                  </Text>
                )}
              </Stack>
              <Stack spacing="0.5" fontSize="sm">
                <Text color="fg.emphasized" fontWeight="medium">
                  Inverse Hcp
                </Text>
                {isEditing && (
                  <input
                    type="checkbox"
                    checked={inverseHcp}
                    onChange={(e) => {
                      setInverseHcp(e.target.checked);
                    }}
                  />
                )}
                {!isEditing && (
                  <Text color="fg.muted">{inverseHcp?.toString()}</Text>
                )}
              </Stack>
            </Stack>
            <Stack
              justify="space-between"
              direction={{ base: "column", sm: "column" }}
              spacing="5"
            >
              <Stack direction="row" alignItems={"center"}>
                <Button
                  isLoading={loadingDelete}
                  colorScheme="blue"
                  onClick={() => {
                    alert("Por implementar");
                  }}
                >
                  Add permission
                </Button>
              </Stack>
              <Stack spacing="1">
                <Text textStyle="md" fontWeight="medium" flex={"row"}>
                  Round players
                </Text>
                {selectedTournamentRound?.tournamentPlayers?.map((player) => {
                  return (
                    <Text fontSize="xs" color="fg.muted">
                      {player}
                    </Text>
                  );
                })}
                <Text textStyle="md" fontWeight="medium" flex={"row"}>
                  Round Admins
                </Text>
                {selectedTournamentRound?.roundAdmins?.map((player) => {
                  return (
                    <Text fontSize="xs" color="fg.muted">
                      {player}
                    </Text>
                  );
                })}
                <Text textStyle="md" fontWeight="medium" flex={"row"}>
                  Bet Managers
                </Text>
                {selectedTournamentRound?.betManagers?.map((player) => {
                  return (
                    <Text fontSize="xs" color="fg.muted">
                      {player}
                    </Text>
                  );
                })}
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};
