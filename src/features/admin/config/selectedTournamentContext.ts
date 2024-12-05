import { createContext } from "react";
import { Tournament } from "../types";

export const SelectedTournamentContext = createContext<{
  selectedTournament?: Tournament;
  setSelectedTournament: (value: Tournament | undefined) => void;
}>({
  selectedTournament: undefined,
  setSelectedTournament: () => {},
});
