import { Navigate, useRoutes } from "react-router-dom";
import { publicRoutes } from "./public";
import { protectedRoutes } from "./protected";

export const AppRoutes = () => {
  // const auth = useAuth();
  const commonRoutes = [{ path: "/", element: <Navigate to="/" /> }];
  const element = useRoutes([
    ...protectedRoutes,
    ...publicRoutes,
    ...commonRoutes,
  ]);

  return <>{element}</>;
};
