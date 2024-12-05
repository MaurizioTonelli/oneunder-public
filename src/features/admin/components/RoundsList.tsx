import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { useContext } from "react";
import { SelectedTournamentRoundContext } from "../config/selectedTournamentRoundContext";

//TODO: SUBSTITUTE BY TOURNAMENT TYPE
// const environments = {
//   Preview: "text-gray-400 bg-gray-400/10 ring-gray-400/20",
//   Production: "text-oneunder-400 bg-oneunder-400/10 ring-oneunder-400/30",
// };

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

export default function RoundsList({ rounds }: { rounds: any[] }) {
  const { selectedTournamentRound, setSelectedTournamentRound } = useContext(
    SelectedTournamentRoundContext
  );
  return (
    <ul role="list" className="divide-y divide-white/5">
      {rounds &&
        rounds.map((round) => (
          <li
            key={round.id}
            onClick={() => {
              setSelectedTournamentRound(round);
            }}
            className={`relative flex items-center space-x-4 rounded-md p-2 py-4 hover:cursor-pointer hover:shadow-sm active:shadow-md ${selectedTournamentRound?._id == round._id ? " bg-oneunder-100" : ""}`}
            // ${selectedTournament?._id == tournament._id ? " bg-oneunder-100" : ""}}
          >
            <div className="min-w-0 flex-auto">
              <div className="flex items-center gap-x-3">
                <h2 className="min-w-0 text-sm font-semibold leading-6 text-neutral-900">
                  <div className="flex gap-x-2">
                    <span className="truncate">{round.name}</span>
                  </div>
                </h2>
              </div>
              {round.course && (
                <div className="flex items-center gap-x-2.5 text-xs leading-5 text-neutral-500">
                  <p className="truncate">{round.course.name}</p>
                </div>
              )}
              <div className="mt-3 flex items-center gap-x-2.5 text-xs leading-5 text-neutral-500">
                <p className="truncate">
                  {new Date(round.dateCreated).toLocaleDateString("es-mx")}
                </p>
                <svg
                  viewBox="0 0 2 2"
                  className="h-0.5 w-0.5 flex-none fill-neutral-300"
                >
                  <circle cx={1} cy={1} r={1} />
                </svg>
                <p className="whitespace-nowrap">
                  Starting Hole: {round.startingHole}
                </p>
              </div>
            </div>
            {/* <div
            className={classNames(
              environments[round.environment],
              "flex-none rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset",
            )}
          >
            {round.course}
          </div> */}
            <ChevronRightIcon
              className="h-5 w-5 flex-none text-neutral-400"
              aria-hidden="true"
            />
          </li>
        ))}
    </ul>
  );
}
