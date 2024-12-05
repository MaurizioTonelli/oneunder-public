import { AppRoutes } from "@/routes";
import { AppProvider } from "@/providers/app";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <AppProvider>
      <Toaster />
      <AppRoutes />
    </AppProvider>
  );
}

export default App;
