import { useCallback, useContext } from "react";
import * as Realm from "realm-web";
import { AppContext } from "@/config/appContext";
const {
  BSON: { ObjectId },
} = Realm;

const removeAccents = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};
//TODO: Aqui van las funciones para modificar todo lo que tenga que ver con el torneo a partir del realm sdk
export function useScoreManager() {
  const { appConfig } = useContext(AppContext);
  const mongo = appConfig?.currentUser?.mongoClient("mongodb-atlas");
  const players = mongo?.db("oneundermx-db").collection("Player");
  const scores = mongo?.db("oneundermx-db").collection("Score");

  const updateTournamentPlayer = useCallback(
    async (playerId: string, playerUpdates) => {
      const result = await players?.updateOne(
        { _id: new ObjectId(playerId) },
        { $set: playerUpdates }
      );
      return result;
    },
    [appConfig]
  );

  const updatePlayerEmails = useCallback(
    async (playersArray) => {
      const formatEmail = (fullName) => {
        return (
          removeAccents(
            fullName.toLowerCase().replace(/\s+/g, "").replace(/ñ/g, "n")
          ) + "@ccq2024.com"
        );
      };

      for (const player of playersArray) {
        const formattedEmail = formatEmail(player.name);
        console.log("Name: ", player.name, " . new email: ", formattedEmail);
        await players?.updateOne(
          { _id: new ObjectId(player.id) },
          { $set: { email: formattedEmail } }
        );
      }

      return "Update complete";
    },
    [appConfig]
  );

  const updateScore = useCallback(
    async (scoreId: string, scoreUpdates) => {
      console.log(scoreId);
      const result = await scores?.updateOne(
        { _id: new ObjectId(scoreId) },
        {
          $set: scoreUpdates,
        }
      );
      return result;
    },
    [appConfig]
  );

  return {
    updateTournamentPlayer,
    updatePlayerEmails,
    updateScore,
  };
}
