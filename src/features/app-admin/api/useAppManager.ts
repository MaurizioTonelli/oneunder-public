import { useCallback, useContext } from "react";

import { AppContext } from "@/config/appContext";

//TODO: Aqui van las funciones para modificar todo lo que tenga que ver con el torneo a partir del realm sdk
export function useAppManager() {
  const { appConfig } = useContext(AppContext);

  // React hook example that uses the updateOwnerId function
  const updateOwnerId = useCallback(
    async (oldOwnerId: string, newOwnerId: string) => {
      try {
        //This is a serverless function located inside App Services, only responds to two set user id's: Gonz & Mau
        const result =
          await appConfig?.currentUser?.functions.transferOwnerIdData(
            oldOwnerId,
            newOwnerId
          );
        return result;
      } catch (error) {
        console.error("Error updating owner IDs:", error);
        return "error";
      }
    },
    [appConfig]
  );

  return {
    updateOwnerId,
  };
}
