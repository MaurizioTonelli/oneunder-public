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
import { SelectedTournamentContext } from "../config/selectedTournamentContext";
import { EditIcon } from "@chakra-ui/icons";
import { useTournamentManager } from "../api/useTournamentManager";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";

export const TournamentInfoCard = () => {
  const tournamentManager = useTournamentManager();
  const queryClient = useQueryClient();
  const { selectedTournament, setSelectedTournament } = useContext(
    SelectedTournamentContext
  );
  const [isEditing, setIsEditing] = useState(false);
  const [tournamentName, setTournamentName] = useState(
    selectedTournament?.tournamentName
  );
  const [tournamentDate, setTournamentDate] = useState(
    selectedTournament?.date
  );
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  useEffect(() => {
    setIsEditing(false);
    setTournamentDate(selectedTournament?.date);
    setTournamentName(selectedTournament?.tournamentName);
  }, [selectedTournament]);

  const deleteTournament = async () => {
    const confirmation = confirm(
      "Are you sure you want to delete this tournament? All Tournament Days, Rounds, Scores and Players including their bets will be deleted."
    );
    if (confirmation) {
      setLoadingDelete(true);
      await tournamentManager.deleteTournament(
        selectedTournament?._id.toString() ?? ""
      );
      toast.success("Tournament deleted");
      queryClient.invalidateQueries("tournaments");
      queryClient.invalidateQueries("tournament");
      setLoadingDelete(false);
      setSelectedTournament(undefined);
    }
  };

  const saveTournamentInfo = async () => {
    setLoading(true);
    await tournamentManager.updateTournament(
      selectedTournament?._id.toString() ?? "",
      {
        date: new Date(tournamentDate ?? ""),
        tournamentName: tournamentName,
      }
    );
    toast.success("Tournament saved");
    queryClient.invalidateQueries("tournaments");
    queryClient.invalidateQueries("tournament");
    setIsEditing(false);
    setLoading(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setTournamentName(selectedTournament?.tournamentName);
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
                    value={tournamentName}
                    onChange={(e) => setTournamentName(e.target.value)}
                  />
                )}
                {!isEditing && (
                  <Text textStyle="lg" fontWeight="medium" flex={"row"}>
                    {selectedTournament?.tournamentName}
                  </Text>
                )}
                <Text fontSize="xs" color="fg.muted">
                  ID: {selectedTournament?._id.toString()}
                </Text>
              </Stack>
              <Stack direction="row" alignItems={"center"}>
                {isEditing && (
                  <>
                    <Button onClick={handleCancelEdit}>Cancel</Button>
                    <Button
                      colorScheme="blue"
                      onClick={saveTournamentInfo}
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
                  onClick={deleteTournament}
                >
                  Delete tournament
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
                    value={new Date(tournamentDate ?? "")
                      .toISOString()
                      .slice(0, 10)}
                    onChange={(e) => {
                      setTournamentDate(e.target.value);
                    }}
                  />
                )}
                {!isEditing && (
                  <Text color="fg.muted">
                    {new Date(
                      selectedTournament?.date ?? ""
                    ).toLocaleDateString("es-MX")}
                  </Text>
                )}
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};
