import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { useContext } from "react";
import { SelectedTournamentContext } from "../config/selectedTournamentContext";

//TODO: SUBSTITUTE BY TOURNAMENT TYPE
const environments = {
  Preview: "text-gray-400 bg-gray-400/10 ring-gray-400/20",
  Production: "text-oneunder-400 bg-oneunder-400/10 ring-oneunder-400/30",
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function TournamentList({
  tournaments,
}: {
  tournaments: any[];
}) {
  const { selectedTournament, setSelectedTournament } = useContext(
    SelectedTournamentContext,
  );
  return (
    <ul role="list" className="divide-y divide-white/5">
      {tournaments.map((tournament) => (
        <li
          key={tournament.id}
          onClick={() => {
            setSelectedTournament(tournament);
          }}
          className={`relative flex items-center space-x-4 rounded-md p-2 py-4 hover:cursor-pointer hover:shadow-sm active:shadow-md ${selectedTournament?._id == tournament._id ? " bg-oneunder-100" : ""}`}
        >
          <div className="min-w-0 flex-auto">
            <div className="flex items-center gap-x-3">
              <h2 className="min-w-0 text-sm font-semibold leading-6 text-neutral-900">
                <div className="flex gap-x-2">
                  <span className="truncate">{tournament.tournamentName}</span>
                </div>
              </h2>
            </div>
            <div className="mt-3 flex items-center gap-x-2.5 text-xs leading-5 text-neutral-500">
              <p className="truncate">
                {new Date(tournament.date).toLocaleDateString("es-mx")}
              </p>
              <svg
                viewBox="0 0 2 2"
                className="h-0.5 w-0.5 flex-none fill-neutral-300"
              >
                <circle cx={1} cy={1} r={1} />
              </svg>
              <p className="whitespace-nowrap">
                {tournament.tournamentDays.length} days
              </p>
            </div>
          </div>
          <div
            className={classNames(
              environments[tournament.environment],
              "flex-none rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset",
            )}
          >
            Medal
          </div>
          <ChevronRightIcon
            className="h-5 w-5 flex-none text-neutral-400"
            aria-hidden="true"
          />
        </li>
      ))}
    </ul>
  );
}
