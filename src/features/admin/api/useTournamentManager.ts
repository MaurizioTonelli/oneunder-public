import { useCallback, useContext } from "react";
import {
  HoleScore,
  Oyes,
  Player,
  PlayerEarningsInRound,
  Round,
  Score,
  Tee,
  Tournament,
  TournamentDay,
} from "../types";
import * as Realm from "realm-web";
import { AppContext } from "@/config/appContext";
const {
  BSON: { ObjectId, Long },
} = Realm;

//TODO: Aqui van las funciones para modificar todo lo que tenga que ver con el torneo a partir del realm sdk
export function useTournamentManager() {
  const { appConfig } = useContext(AppContext);
  const mongo = appConfig?.currentUser?.mongoClient("mongodb-atlas");
  const tournaments = mongo?.db("oneundermx-db").collection("Tournament");
  const tournamentDays = mongo?.db("oneundermx-db").collection("TournamentDay");
  const players = mongo?.db("oneundermx-db").collection("Player");
  const oyes = mongo?.db("oneundermx-db").collection("Oyes");
  const rounds = mongo?.db("oneundermx-db").collection("Round");
  const scores = mongo?.db("oneundermx-db").collection("Score");
  const playerEarningsInRound = mongo
    ?.db("oneundermx-db")
    .collection("PlayerEarningsInRound");

  const addTournament = useCallback(
    async (tournament: Tournament) => {
      const result = await tournaments?.insertOne(tournament);
      return result;
    },
    [appConfig]
  );

  const updateTournament = useCallback(
    async (tournamentId: string, tournamentUpdates) => {
      const result = await tournaments?.updateOne(
        { _id: new ObjectId(tournamentId) },
        { $set: tournamentUpdates }
      );
      return result;
    },
    [appConfig]
  );

  const deleteTournament = useCallback(
    async (tournamentId: string) => {
      const result = await tournaments?.deleteOne({
        _id: new ObjectId(tournamentId),
      });
      return result;
    },
    [appConfig] // Assuming `appConfig` is relevant to your database connection or configuration
  );

  const addTournamentDay = useCallback(
    async (
      tournamentId: string | Realm.BSON.ObjectID | undefined,
      tournamentDay: TournamentDay
    ) => {
      const insertedTournamentDay =
        await tournamentDays?.insertOne(tournamentDay);

      //updated tournament
      await tournaments?.updateOne(
        { _id: new ObjectId(tournamentId) },
        {
          $push: {
            tournamentDays: new ObjectId(insertedTournamentDay?.insertedId),
          },
        }
      );
      return insertedTournamentDay;
    },
    [appConfig]
  );

  const deleteTournamentDay = useCallback(
    async (tournamentDayId: string, tournamentId: string) => {
      const result = await tournamentDays?.deleteOne({
        _id: new ObjectId(tournamentDayId),
      });
      await tournaments?.updateOne(
        { _id: new ObjectId(tournamentId) },
        {
          $pull: {
            tournamentDays: new ObjectId(tournamentDayId),
          },
        }
      );
      return result;
    },
    [appConfig] // Assuming `appConfig` is relevant to your database connection or configuration
  );
  const updateTournamentDay = useCallback(
    async (playerId: string, tournamentDayUpdates) => {
      const result = await tournamentDays?.updateOne(
        { _id: new ObjectId(playerId) },
        { $set: tournamentDayUpdates }
      );
      return result;
    },
    [appConfig]
  );

  const addTournamentPlayer = useCallback(
    async (
      tournamentId: string | Realm.BSON.ObjectID | undefined,
      player: Player
    ) => {
      const insertedPlayer = await players?.insertOne(player);

      //updated tournament
      await tournaments?.updateOne(
        { _id: new ObjectId(tournamentId) },
        {
          $push: {
            poolOfPlayers: new ObjectId(insertedPlayer?.insertedId),
          },
        }
      );
      return insertedPlayer;
    },
    [appConfig]
  );
  const deleteTournamentPlayer = useCallback(
    async (oyesId: string, tournamentId: string) => {
      await tournaments?.updateOne(
        { _id: new ObjectId(tournamentId) },
        {
          $pull: {
            poolOfPlayers: new ObjectId(oyesId),
          },
        }
      );
    },
    [appConfig] // Assuming `appConfig` is relevant to your database connection or configuration
  );
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

  const addTournamentOyes = useCallback(
    async (
      tournamentId: string | Realm.BSON.ObjectID | undefined,
      oyesObj: Oyes
    ) => {
      const insertedOyes = await oyes?.insertOne(oyesObj);

      //updated tournament
      await tournaments?.updateOne(
        { _id: new ObjectId(tournamentId) },
        {
          $push: {
            oyesList: new ObjectId(oyesObj._id),
          },
        }
      );
      return insertedOyes;
    },
    [appConfig]
  );

  const updateTournamentOyes = useCallback(
    async (oyesId: string, oyesUpdates) => {
      const result = await oyes?.updateOne(
        { _id: new ObjectId(oyesId) },
        { $set: oyesUpdates }
      );
      return result;
    },
    [appConfig]
  );

  const deleteTournamentOyes = useCallback(
    async (oyesId: string, tournamentId: string) => {
      const result = await oyes?.deleteOne({
        _id: new ObjectId(oyesId),
      });
      await tournaments?.updateOne(
        { _id: new ObjectId(tournamentId) },
        {
          $pull: {
            oyesList: new ObjectId(oyesId),
          },
        }
      );
      return result;
    },
    [appConfig] // Assuming `appConfig` is relevant to your database connection or configuration
  );

  const changeTournamentEmailsToOneunderEmail = useCallback(
    async (poolOfPlayers: string[]) => {
      // Change the emails
      const result = await players?.updateMany(
        { _id: { $in: poolOfPlayers.map((id) => new ObjectId(id)) } },
        { $set: { email: "oneunderapp@gmail.com" } }
      );
      return result;
    },
    [appConfig] // Assuming appConfig is relevant for the MongoDB connection
  );
  const addTournamentPlayers = useCallback(
    async (
      tournamentId: string | Realm.BSON.ObjectID | undefined,
      playersArray: Player[]
    ) => {
      // Insert multiple players
      const insertedPlayersResult = await players?.insertMany(playersArray);
      const insertedIds = Object.values(
        insertedPlayersResult?.insertedIds ?? {}
      ).map((id) => new ObjectId(id));

      // Update the tournament with the new player IDs
      await tournaments?.updateOne(
        { _id: new ObjectId(tournamentId) },
        {
          $push: {
            poolOfPlayers: {
              $each: insertedIds, // Use $each to push each ID
            },
          },
        }
      );
      return insertedPlayersResult;
    },
    [appConfig] // Assuming appConfig is relevant for the MongoDB connection
  );

  const addTournamentDayRound = useCallback(
    async (
      tournamentDayId: string | Realm.BSON.ObjectID | undefined,
      round: Round
    ) => {
      const insertedRound = await rounds?.insertOne(round);

      await tournamentDays?.updateOne(
        { _id: new ObjectId(tournamentDayId) },
        {
          $push: {
            rounds: new ObjectId(insertedRound?.insertedId),
          },
        }
      );
      return insertedRound;
    },
    [appConfig]
  );

  const deleteTournamentDayRound = useCallback(
    async (roundId: string, tournamentDayId: string) => {
      const result = await rounds?.deleteOne({
        _id: new ObjectId(roundId),
      });
      await tournamentDays?.updateOne(
        { _id: new ObjectId(tournamentDayId) },
        {
          $pull: {
            rounds: new ObjectId(tournamentDayId),
          },
        }
      );
      return result;
    },
    [appConfig] // Assuming `appConfig` is relevant to your database connection or configuration
  );
  const updateTournamentDayRound = useCallback(
    async (roundId: string, roundUpdates) => {
      const result = await rounds?.updateOne(
        { _id: new ObjectId(roundId) },
        { $set: roundUpdates }
      );
      return result;
    },
    [appConfig]
  );

  // const calculateHandicap = (hcp, slope) => {
  //   return (hcp * slope) / 113;
  // };
  const addTournamentDayPlayer = useCallback(
    async (
      roundId: string | Realm.BSON.ObjectID | undefined,
      playerId: string,
      selectedTee: Tee,
      role: string
    ) => {
      //crea el score primero
      const ownerId = appConfig?.currentUser?.id ?? "";
      const holeStrokesList: HoleScore[] = Array.from(
        { length: 18 },
        (_, i) => i + 1
      ).map((number) => ({
        number: number.toString(),
        ownerId: ownerId,
        strokes: 0,
      }));

      const player: Player = await players?.findOne({
        _id: new ObjectId(playerId),
      });

      const score: Score = {
        _id: new ObjectId(),
        ownerId: ownerId,
        handicap: new Long(player.handicap_index.toString()),
        player: new ObjectId(playerId),
        tee: selectedTee.name,
        hole_strokes_list: holeStrokesList,
      };

      //crea el playerEarningsInRound y ponerselo al player primero
      const playerEarnings: PlayerEarningsInRound = {
        _id: new ObjectId(),
        ownerId: ownerId,
        player_id: new ObjectId(playerId),
        round_id: new ObjectId(roundId),
        best_ball: new Long(0),
        match_ind: new Long(0),
        match_teams: new Long(0),
        medal: new Long(0),
        nassau: new Long(0),
        nassauPair: new Long(0),
        rabbits: new Long(0),
        skins: new Long(0),
        total: new Long(0),
        units: new Long(0),
        wolf: new Long(0),
      };
      const insertedEarningsInRound =
        await playerEarningsInRound?.insertOne(playerEarnings);

      await players?.updateOne(
        { _id: new ObjectId(playerId) },
        {
          $push: {
            earnings_per_round: new ObjectId(
              insertedEarningsInRound?.insertedId
            ),
          },
        }
      );

      const insertedScore = await scores?.insertOne(score);

      let pushObject: any = {
        scores: new ObjectId(insertedScore?.insertedId),
      };

      if (role == "round-player") {
        pushObject.tournamentPlayers = player.email;
      } else if (role == "round-admin") {
        pushObject.roundAdmins = player.email;
      } else if (role == "bet-manager") {
        pushObject.betManagers = player.email;
      }

      // // por ultimo, meterle el score creado al round
      await rounds?.updateOne(
        { _id: new ObjectId(roundId) },
        {
          $push: pushObject,
        }
      );

      // return insertedPlayer;
    },
    [appConfig]
  );

  const updateTournamentDayPlayer = useCallback(
    async (scoreId: string, roundId: string, scoreUpdates, role, email) => {
      const result = await scores?.updateOne(
        { _id: new ObjectId(scoreId) },
        { $set: scoreUpdates }
      );
      let pushObject: any = {};

      if (role == "round-player") {
        pushObject.tournamentPlayers = email;
      } else if (role == "round-admin") {
        pushObject.roundAdmins = email;
      } else if (role == "bet-manager") {
        pushObject.betManagers = email;
      }

      await rounds?.updateOne(
        { _id: new ObjectId(roundId) },
        {
          $pull: {
            tournamentPlayers: email,
            roundAdmins: email,
            betManagers: email,
          },
        }
      );
      if (role !== "none") {
        await rounds?.updateOne(
          { _id: new ObjectId(roundId) },
          {
            $push: pushObject,
          }
        );
      }

      return result;
    },
    [appConfig]
  );

  const addPermissions = useCallback(
    async (tournamentDayId: string | undefined, email: string, role) => {
      const tournamentDay: TournamentDay = await tournamentDays?.findOne({
        _id: new ObjectId(tournamentDayId),
      });
      for (const round of tournamentDay.rounds ?? []) {
        let pushObject: any = {};
        if (role == "round-player") {
          pushObject.tournamentPlayers = email;
        } else if (role == "round-admin") {
          pushObject.roundAdmins = email;
        } else if (role == "bet-manager") {
          pushObject.betManagers = email;
        }
        await rounds?.updateOne(
          { _id: new ObjectId(round.toString()) },
          {
            $push: pushObject,
          }
        );
      }
    },
    [appConfig]
  );

  const removePermissions = useCallback(
    async (tournamentDayId: string | undefined) => {
      const tournamentDay: TournamentDay = await tournamentDays?.findOne({
        _id: new ObjectId(tournamentDayId),
      });
      for (const round of tournamentDay.rounds ?? []) {
        await rounds?.updateOne(
          { _id: new ObjectId(round.toString()) },
          {
            $set: { tournamentPlayers: [], roundAdmins: [], betManagers: [] },
          }
        );
      }
    },
    [appConfig]
  );
  return {
    addTournament,
    updateTournament,
    deleteTournament,
    addTournamentDay,
    updateTournamentDay,
    deleteTournamentDay,
    addTournamentPlayer,
    deleteTournamentPlayer,
    updateTournamentPlayer,
    addTournamentOyes,
    updateTournamentOyes,
    deleteTournamentOyes,
    addTournamentPlayers,
    addTournamentDayRound,
    deleteTournamentDayRound,
    updateTournamentDayRound,
    addTournamentDayPlayer,
    updateTournamentDayPlayer,
    changeTournamentEmailsToOneunderEmail,
    addPermissions,
    removePermissions,
  };
}
