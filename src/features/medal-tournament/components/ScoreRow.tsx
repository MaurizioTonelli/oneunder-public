import {
  Image,
  Td,
  Tr,
  useDisclosure,
  Text,
  Stack,
  IconButton,
} from "@chakra-ui/react";
import {
  MedalTournamentManager,
  getPosition,
  getPositionColor,
} from "../../../utils/scoreUtils";
import ScoreModal from "./ScoreModal";
import { FiStar } from "react-icons/fi";
import { FaStar } from "react-icons/fa";

export const ScoreRow = ({
  player,
  tournamentDays,
  i,
  category,
  favoritePlayers,
  isGross,
}: {
  player: any;
  tournamentDays: any;
  i: number;
  category: string;
  favoritePlayers: any;
  isGross?: boolean;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const scorePerDay = MedalTournamentManager.getPlayerScoresPerTournamentDay(
    tournamentDays,
    player,
    isGross ? "gross" : "net"
  );
  // console.log(scorePerDay.holeStrokes);

  const getScoreColor = (score) => {
    if (
      category == "D" ||
      category == "E" ||
      category == "D-E" ||
      category == "DamasC" ||
      category == "Damas2da"
    ) {
      return score > 0 ? "green" : score < 0 ? "red" : "black";
    } else {
      return score > 0 ? "red" : score < 0 ? "green" : "black";
    }
  };

  return (
    <>
      <Tr
        // display={
        //   [0, 1, 2].includes(i) || favoritosArray.includes(player._id)
        //     ? "sabroso"
        //     : "none"
        // }
        _hover={{ cursor: "pointer", boxShadow: "sm", opacity: 0.6 }}
      >
        <Td>
          <IconButton
            onClick={() => favoritePlayers.toggle(player._id)}
            color={
              favoritePlayers.list.includes(player._id) ? "orange" : "black"
            }
            aria-label="Add favorite"
            icon={
              favoritePlayers.list.includes(player._id) ? (
                <FaStar />
              ) : (
                <FiStar />
              )
            }
            isRound={true}
            _hover={{ color: "yellow", bg: "orange" }}
          />
        </Td>
        <Td
          onClick={onOpen}
          isNumeric
          fontWeight={"bold"}
          color={getPositionColor(i + 1)}
        >
          {getPosition(i + 1)}
        </Td>

        <Td
          onClick={onOpen}
          fontWeight={"bold"}
          alignItems={"center"}
          fontSize={"xs"}
        >
          <div className="flex flex-row items-center gap-4">
            <Image
              boxSize={{ base: 0, xl: 30 }}
              objectFit={"cover"}
              src={`https://m6whsbmjlbhr6evj.public.blob.vercel-storage.com/0-oneunder-tournament-photos/${player.ghin}.png`}
              fallbackSrc="https://m6whsbmjlbhr6evj.public.blob.vercel-storage.com/0-oneunder-tournament-photos/undefined.png"
            />
            <Stack direction="row">
              <Text fontWeight={"normal"}>
                {player.name.split(" ")[0].slice(0, 1)}.
                {player.name.split(" ")[1]}
              </Text>
            </Stack>
          </div>
        </Td>
        <Td
          onClick={onOpen}
          textAlign={"center"}
          fontWeight={"bold"}
          color={getScoreColor(scorePerDay.totalScore)}
        >
          {scorePerDay.totalScore != 0 &&
            (scorePerDay.totalScore > 0
              ? `+${scorePerDay.totalScore}`
              : scorePerDay.totalScore < 0
                ? scorePerDay.totalScore
                : "E")}
          {(scorePerDay.totalScore == undefined ||
            scorePerDay.totalScore == null) &&
            "N/A"}
          {scorePerDay.totalScore == 0 && `E`}
        </Td>
        {tournamentDays.map((day) => {
          return (
            <Td
              onClick={onOpen}
              textAlign={"center"}
              color={getScoreColor(scorePerDay.days[day.day])}
            >
              {scorePerDay.days[day.day] != 0 &&
                (scorePerDay.days[day.day] > 0
                  ? `+${scorePerDay.days[day.day]}`
                  : scorePerDay.days[day.day])}
              {(scorePerDay.days[day.day] == undefined ||
                scorePerDay.days[day.day] == null) &&
                "N/A"}
              {scorePerDay.days[day.day] == 0 &&
                scorePerDay.holeStrokes[day.day].reduce(
                  (acc, curr) => acc + Number(curr.strokes),
                  0
                ) != 0 &&
                `E`}
              {scorePerDay.days[day.day] == 0 &&
                scorePerDay.holeStrokes[day.day].reduce(
                  (acc, curr) => acc + Number(curr.strokes),
                  0
                ) == 0 &&
                `0`}
            </Td>
          );
        })}
        <Td onClick={onOpen} textAlign={"center"} fontWeight={"bold"}>
          {scorePerDay.strokes}
        </Td>
      </Tr>

      <ScoreModal
        isOpen={isOpen}
        onClose={onClose}
        player={player}
        tournamentDays={tournamentDays}
        scorePerDay={scorePerDay}
        position={getPosition(i + 1)}
      />
    </>
  );
};
