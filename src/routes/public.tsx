import { lazyImport } from "@/utils/lazyImport";
import { NassauScores } from "../features/nassau-scores";
import { AuthRoutes } from "../features/auth";
import { Spinner } from "@chakra-ui/react";
import { MedalTournamentViewerPage } from "../features/medal-tournament";
import { HomePage as HomePageLanding } from "../features/home-page";
// const { AuthRoutes } = lazyImport(
//   () => import("@/features/auth"),
//   "AuthRoutes"
// );
const { HomePage } = lazyImport(
  () => import("@/features/dashboard-principal"),
  "HomePage"
);

export const publicRoutes = [
  {
    path: "/",
    element: <HomePageLanding />,
  },
  {
    path: "dashboard",
    element: <HomePage />,
  },
  // {
  //   path: "tournament-dashboard",
  //   element: <TournamentDashboard />,
  // },
  {
    path: "medal-tournament",
    element: <MedalTournamentViewerPage />,
  },
  {
    path: "scoring",
    element: <NassauScores />,
  },
  {
    path: "/auth/*",
    element: <AuthRoutes />,
  },
  {
    path: "*",
    element: <Spinner />,
  },
];
