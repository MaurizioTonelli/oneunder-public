import Layout from "../components/Layout";

import { SelectedTournamentContext } from "../config/selectedTournamentContext";
import { useState } from "react";
import { Tournament } from "../types";
import { DividerElement } from "../components/Divider";
import { Button } from "@chakra-ui/react";
import { useAppManager } from "../api/useAppManager";

const MainContent = () => {
  const appManager = useAppManager();
  const [ownerIdFrom, setOwnerIdFrom] = useState("");
  const [ownerIdTo, setOwnerIdTo] = useState("");
  const [result, setResult] = useState<any[]>([]);
  const [isLoadingTransferOwnerId, setIsLoadingTransferOwnerId] =
    useState(false);

  const handleClick = async () => {
    if (confirm("Are you sure you want to execute this operation?")) {
      setIsLoadingTransferOwnerId(true);
      const result = await appManager.updateOwnerId(ownerIdFrom, ownerIdTo);
      console.log(result);
      setResult(result);
      setIsLoadingTransferOwnerId(false);
    }
  };
  return (
    <div className="flex flex-col gap-4">
      <DividerElement text="Transfer ownerId" />
      <div className="flex flex-row gap-4 items-center  justify-center">
        <div className="rounded-md px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
          <label
            htmlFor="ownerid1"
            className="block text-xs font-medium text-gray-900"
          >
            Owner Id From
          </label>
          <input
            type="text"
            value={ownerIdFrom}
            onChange={(e) => setOwnerIdFrom(e.target.value)}
            name="ownerid1"
            id="ownerid1"
            className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            placeholder="abc..."
          />
        </div>
        <p>To</p>
        <div className="rounded-md px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
          <label
            htmlFor="ownerid2"
            className="block text-xs font-medium text-gray-900"
          >
            Owner Id To
          </label>
          <input
            value={ownerIdTo}
            onChange={(e) => setOwnerIdTo(e.target.value)}
            type="text"
            name="ownerid2"
            id="ownerid2"
            className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            placeholder="abc..."
          />
        </div>
      </div>
      <div className="flex justify-center">
        <Button
          isLoading={isLoadingTransferOwnerId}
          colorScheme="blue"
          onClick={handleClick}
        >
          Transfer all
        </Button>
      </div>
      {result && result.length != 0 && (
        <>
          <div className="flex flex-col items-center justify-center mt-8">
            {result.map((result) => (
              <p className="text-neutral-400 text-sm">
                <strong>{result?.collection}: </strong>Matched{" "}
                {result.matchedCount} documents, modified {result.modifiedCount}
                .
              </p>
            ))}
          </div>
          <Button onClick={() => setResult([])}>Clear log</Button>
        </>
      )}
    </div>
  );
};

export const Dashboard = () => {
  const [selectedTournament, setSelectedTournament] = useState<
    Tournament | undefined
  >(undefined);

  return (
    <SelectedTournamentContext.Provider
      value={{ selectedTournament, setSelectedTournament }}
    >
      <Layout MainContent={<MainContent />} />
    </SelectedTournamentContext.Provider>
  );
};
