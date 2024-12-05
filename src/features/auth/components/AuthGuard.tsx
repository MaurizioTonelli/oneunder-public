import { AppContext } from "@/config/appContext";
import { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";

export default function AuthGuard({ children }: { children: ReactNode }) {
  const { appConfig } = useContext(AppContext);

  return (
    <>
      {appConfig && appConfig.currentUser && children}
      {appConfig && !appConfig.currentUser && <Navigate to="/auth/login" />}
    </>
  );
}
