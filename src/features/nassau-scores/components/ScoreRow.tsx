import { Tr, Td } from "@chakra-ui/react";
import { getHoleScore } from "../utils/scoreUtils";
import { TableHoleScoreCircle } from "./TableHoleScoreCircle";

export const ScoreRow = ({
  hole_strokes_list,
  playerName,
  scores,
  player,
}: {
  hole_strokes_list: any;
  playerName: string;
  scores: (number | null)[];
  player: string;
}) => {
  return (
    <Tr>
      <Td>{playerName}</Td>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map(
        (val) => (
          <Td isNumeric textAlign={"center"}>
            <TableHoleScoreCircle
              score={getHoleScore(hole_strokes_list, val.toString())}
              result={scores[val - 1]}
              player={player}
            />
          </Td>
        )
      )}
    </Tr>
  );
};
