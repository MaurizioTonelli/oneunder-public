import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./LoginPage";

// import { Login } from "./Login";

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
    </Routes>
  );
};
