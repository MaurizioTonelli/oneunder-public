import { createContext } from "react";
import { Round } from "../types";

export const SelectedTournamentRoundContext = createContext<{
  selectedTournamentRound?: Round;
  setSelectedTournamentRound: (value: Round | undefined) => void;
}>({
  selectedTournamentRound: undefined,
  setSelectedTournamentRound: () => {},
});
