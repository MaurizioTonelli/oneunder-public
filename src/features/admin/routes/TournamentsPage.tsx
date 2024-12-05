import Layout from "../components/Layout";
import { useTournaments } from "../api/getTournaments";
import TournamentList from "../components/TournamentList";
import { AddTournamentButton } from "../components/AddTournamentButton";
import { SelectedTournamentContext } from "../config/selectedTournamentContext";
import { useContext, useEffect, useState } from "react";
import { Tournament } from "../types";
import TournamentDayList from "../components/TournamentDayList";
import { DividerElement } from "../components/Divider";
import TournamentPlayerPool from "../components/TournamentPlayerPool";
import { AddTournamentPlayerButton } from "../components/AddTournamentPlayerButton";
import { AddTournamentDayButton } from "../components/AddTournamentDayButton";
import { useParams } from "react-router-dom";
import { useTournament } from "../../../api/getTournament";
import TournamentCoursesPool from "../components/TournamentCoursesPool";
import { ImportPlayersButton } from "../components/ImportPlayersButton";
import { TournamentInfoCard } from "../components/TournamentInfoCard";
import TournamentOyesPool from "../components/TournamentOyesPool";
import { AddTournamentOyesButton } from "../components/AddTournamentOyesButton";

const MainContent = () => {
  const { selectedTournament } = useContext(SelectedTournamentContext);

  const [isEditingOyes, setIsEditingOyes] = useState(false);
  const [isEditingPlayersPool, setIsEditingPlayersPool] = useState(false);
  const [isEditingTournamentDays, setIsEditingTournamentDays] = useState(false);

  return (
    <div>
      {selectedTournament && (
        <>
          <DividerElement text={"Tournament Info"} />
          <TournamentInfoCard />
          <DividerElement text="Tournament Days" />
          <div className="flex flex-row items-center justify-between gap-4">
            <AddTournamentDayButton />
            <a
              onClick={() => {
                setIsEditingTournamentDays(!isEditingTournamentDays);
              }}
              className="text-oneunder-500 underline hover:cursor-pointer"
            >
              {isEditingTournamentDays ? "Cancel" : "Edit"}
            </a>
          </div>
          <TournamentDayList isEditing={isEditingTournamentDays} />
          <DividerElement text="Pool of Courses" />

          <TournamentCoursesPool
            courses={selectedTournament.poolOfCoursesArray}
          />
          <DividerElement text="Oyes" />
          <div className="flex flex-row items-center justify-between gap-4">
            <div className="flex flex-row gap-2">
              <AddTournamentOyesButton />
            </div>
            <a
              onClick={() => {
                setIsEditingOyes(!isEditingOyes);
              }}
              className="text-oneunder-500 underline hover:cursor-pointer"
            >
              {isEditingOyes ? "Cancel" : "Edit"}
            </a>
          </div>
          <TournamentOyesPool
            oyesList={selectedTournament.oyesList}
            isEditing={isEditingOyes}
          />
          <DividerElement text="Pool of Players" />
          <div className="flex flex-row items-center justify-between gap-4">
            <div className="flex flex-row gap-2">
              <AddTournamentPlayerButton />
              <ImportPlayersButton />
              {/* <ChangePlayerEmailsButton /> */}
            </div>
            <a
              onClick={() => {
                setIsEditingPlayersPool(!isEditingPlayersPool);
              }}
              className="text-oneunder-500 underline hover:cursor-pointer"
            >
              {isEditingPlayersPool ? "Cancel" : "Edit"}
            </a>
          </div>
          <TournamentPlayerPool
            players={selectedTournament.poolOfPlayers}
            isEditing={isEditingPlayersPool}
          />
        </>
      )}
    </div>
  );
};

const SecondaryContent = () => {
  const { id } = useParams();
  const [tournamentId, setTournamentId] = useState(id);
  const { selectedTournament, setSelectedTournament } = useContext(
    SelectedTournamentContext
  );
  const tournaments = useTournaments();
  const selectedTournamentQuery = useTournament({}, tournamentId);

  useEffect(() => {
    if (
      selectedTournamentQuery.status == "success" &&
      selectedTournamentQuery.data &&
      selectedTournamentQuery.data[0]
    ) {
      setSelectedTournament(selectedTournamentQuery.data[0]);
    }
  }, [selectedTournamentQuery.data]);

  useEffect(() => {
    if (selectedTournament) {
      setTournamentId(selectedTournament?._id.toString());
    }
  }, [selectedTournament]);

  return (
    <div className="flex flex-col gap-4">
      <AddTournamentButton />

      {tournaments.data && <TournamentList tournaments={tournaments.data} />}
    </div>
  );
};

export const TournamentsPage = () => {
  const [selectedTournament, setSelectedTournament] = useState<
    Tournament | undefined
  >(undefined);

  return (
    <SelectedTournamentContext.Provider
      value={{ selectedTournament, setSelectedTournament }}
    >
      <Layout
        MainContent={<MainContent />}
        SecondaryContent={<SecondaryContent />}
      />
    </SelectedTournamentContext.Provider>
  );
};
