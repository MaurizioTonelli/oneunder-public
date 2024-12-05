import { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";

import AuthGuard from "@/features/auth/components/AuthGuard";
import { Center, Spinner } from "@chakra-ui/react";
import { TournamentsPage } from "../features/admin";
import { TournamentDayPage } from "../features/admin/routes/TournamentDayPage";
import { Dashboard } from "../features/app-admin/routes";
import { TournamentDashboard } from "../features/dashboard-tournament";

const App = () => {
  return (
    <Suspense
      fallback={
        <Center>
          <Spinner
            thickness="8px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />{" "}
        </Center>
      }
    >
      <Outlet />
    </Suspense>
  );
};

export const protectedRoutes = [
  {
    path: "/app",
    element: (
      <AuthGuard>
        <App />
      </AuthGuard>
    ),
    children: [
      {
        path: "app-admin/dashboard",
        element: <Dashboard />,
      },
      {
        path: "admin/tournaments/tournament-dashboard",
        element: <TournamentDashboard />,
      },
      {
        path: "admin/tournaments",
        element: <TournamentsPage />,
      },
      {
        path: "admin/tournaments/:id",
        element: <TournamentsPage />,
      },
      {
        path: "admin/tournament-days/:tournamentid/:dayid",
        element: <TournamentDayPage />,
      },
      { path: "*", element: <Navigate to="/dashboard" /> },
    ],
  },
];
