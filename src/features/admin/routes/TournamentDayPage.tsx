import Layout from "../components/Layout";
import { SelectedTournamentContext } from "../config/selectedTournamentContext";
import { useContext, useEffect, useState } from "react";
import { Round, Tournament } from "../types";
import { DividerElement } from "../components/Divider";
import Breadcrumbs from "@/components/elements/Breadcrumbs";
import { useParams } from "react-router-dom";
import { useTournament } from "../../../api/getTournament";
import { useTournamentDay } from "../api/getTournamentDay";
import RoundsList from "../components/RoundsList";
import { AddTournamentRoundButton } from "../components/AddTournamentRoundButton";
import { SelectedTournamentRoundContext } from "../config/selectedTournamentRoundContext";
import TournamentRoundPlayersList from "../components/TournamentRoundPlayersList";
import { AddTournamentRoundPlayerButton } from "../components/AddTournamentRoundPlayerButton";
import { RoundInfoCard } from "../components/RoundInfoCard";
import { EditTournamentDayPermissionsButton } from "../components/EditTournamentDayPermissionsButton";

const MainContent = () => {
  const { selectedTournamentRound } = useContext(
    SelectedTournamentRoundContext
  );

  const handleEdit = () => {};

  return (
    <div>
      {selectedTournamentRound && (
        <>
          <DividerElement text={"Round Info"} />
          <RoundInfoCard />
          <DividerElement text="Round Players" />
          <div className="flex flex-row items-center justify-between gap-4">
            <AddTournamentRoundPlayerButton />
            <a
              onClick={handleEdit}
              className="text-oneunder-500 underline hover:cursor-pointer"
            >
              Edit
            </a>
          </div>
          <TournamentRoundPlayersList />
        </>
      )}
    </div>
  );
};

const SecondaryContent = () => {
  const { tournamentid, dayid } = useParams();
  const { setSelectedTournament } = useContext(SelectedTournamentContext);

  const tournament = useTournament({}, tournamentid);
  const tournamentDay = useTournamentDay({}, dayid);

  useEffect(() => {
    if (tournament.status == "success" && tournament.data) {
      setSelectedTournament(tournament.data[0]);
    }
  }, [tournament, tournament.data]);

  return (
    <div className="flex flex-col gap-8">
      {/* {tournament.status == "error" && <Navigate to="/app/admin/tournaments" />}
      {tournamentDay.status == "error" && (
        <Navigate to="/app/admin/tournaments" />
      )} */}
      {tournament.data && (
        <Breadcrumbs
          tournamentId={tournamentid ?? ""}
          tournamentName={tournament.data[0].tournamentName}
        />
      )}
      <div className="flex flex-col gap-2">
        <AddTournamentRoundButton />
        <EditTournamentDayPermissionsButton />
      </div>
      {tournamentDay.data && tournamentDay.data[0] && (
        <RoundsList rounds={tournamentDay.data[0].rounds} />
      )}
    </div>
  );
};

export const TournamentDayPage = () => {
  const [selectedTournament, setSelectedTournament] = useState<
    Tournament | undefined
  >(undefined);
  const [selectedTournamentRound, setSelectedTournamentRound] = useState<
    Round | undefined
  >(undefined);

  return (
    <SelectedTournamentContext.Provider
      value={{ selectedTournament, setSelectedTournament }}
    >
      <SelectedTournamentRoundContext.Provider
        value={{ selectedTournamentRound, setSelectedTournamentRound }}
      >
        <Layout
          MainContent={<MainContent />}
          SecondaryContent={<SecondaryContent />}
        />
      </SelectedTournamentRoundContext.Provider>
    </SelectedTournamentContext.Provider>
  );
};
