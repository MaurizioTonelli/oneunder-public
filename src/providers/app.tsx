import * as React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { QueryClientProvider } from "react-query";
import { BrowserRouter as Router } from "react-router-dom";
import { queryClient } from "@/lib/react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Center, Spinner } from "@chakra-ui/react";
import { AppContext } from "../config/appContext";
import { useState } from "react";
import * as Realm from "realm-web";

const ErrorFallback = () => {
  return (
    <div
      className="flex h-screen w-screen flex-col items-center justify-center text-red-500"
      role="alert"
    >
      <h2 className="text-lg font-semibold">Ups, algo salio mal :( </h2>
      <button onClick={() => window.location.assign(window.location.origin)}>
        Actualizar página
      </button>
    </div>
  );
};

type AppProviderProps = {
  children: React.ReactNode;
};
const app = new Realm.App({ id: "" });

export const AppProvider = ({ children }: AppProviderProps) => {
  const [appConfig, setAppConfig] = useState<Realm.App>(app);

  return (
    <React.Suspense
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
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <QueryClientProvider client={queryClient}>
          {process.env.NODE_ENV !== "test" && <ReactQueryDevtools />}
          <AppContext.Provider value={{ appConfig, setAppConfig }}>
            <Router>{children}</Router>
          </AppContext.Provider>
        </QueryClientProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};
