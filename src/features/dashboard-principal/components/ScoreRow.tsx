import { Td, Tr } from "@chakra-ui/react";
import { ParSymbol } from "./ParSymbol";
import {
  getBack9,
  getFirst9,
  getHoleScore,
  getNet,
  getNetScoreToDate,
  getParSymbolValues,
  getPosition,
  getPositionColor,
  getThruScore,
  getTotal,
  getTotalScore,
} from "../utils/scoreUtils";

export const ScoreRow = ({
  score,
  courseTeeHoles,
  scoreType,
  //scores,
  i,
}: {
  score: any;
  courseTeeHoles: any[];
  scoreType: string;
  scores: any[];
  i: number;
}) => {
  const totalScore = getTotalScore(score, courseTeeHoles, scoreType);
  const netScore = getNetScoreToDate(score, courseTeeHoles);
  let color = "";
  if (scoreType == "stableford") {
    color = totalScore >= 0 ? "green" : "red";
  } else if (scoreType == "gross" || scoreType == "net") {
    color = totalScore >= 0 ? "red" : "green";
  }

  return (
    <Tr>
      <Td isNumeric fontWeight={"bold"} color={getPositionColor(i + 1)}>
        {getPosition(i + 1)}
      </Td>

      <Td fontWeight={"bold"}>
        {score.player.name} {`(${score.handicap})`}{" "}
      </Td>
      <Td color={color}>
        {totalScore >= 0 ? "+" : ""}
        {totalScore}
      </Td>
      <Td>{getThruScore(score.hole_strokes_list)}</Td>
      <Td>
        {
          score.hole_strokes_list.filter((hole: any) => hole.strokes != 0)
            .length
        }
      </Td>
      <Td isNumeric color={"bg-accent"} fontWeight={"bold"}>
        {netScore}
      </Td>
      <Td></Td>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((val) => (
        <Td isNumeric textAlign={"center"}>
          <ParSymbol
            symbol={
              getParSymbolValues(
                score.hole_strokes_list,
                courseTeeHoles,
                Number(val)
              )?.symbol
            }
            double={
              getParSymbolValues(
                score.hole_strokes_list,
                courseTeeHoles,
                Number(val)
              )?.double
            }
          />
          {getHoleScore(score.hole_strokes_list, val.toString())}
        </Td>
      ))}

      <Td isNumeric color={"bg-accent"} fontWeight={"bold"}>
        {getFirst9(score.hole_strokes_list)}
      </Td>
      {[10, 11, 12, 13, 14, 15, 16, 17, 18].map((val) => (
        <Td isNumeric>
          <ParSymbol
            symbol={
              getParSymbolValues(
                score.hole_strokes_list,
                courseTeeHoles,
                Number(val)
              )?.symbol
            }
            double={
              getParSymbolValues(
                score.hole_strokes_list,
                courseTeeHoles,
                Number(val)
              )?.double
            }
          />
          {getHoleScore(score.hole_strokes_list, val.toString())}
        </Td>
      ))}
      <Td isNumeric color={"bg-accent"} fontWeight={"bold"}>
        {getBack9(score.hole_strokes_list)}
      </Td>
      <Td isNumeric color={"bg-accent"} fontWeight={"bold"}>
        {getTotal(score.hole_strokes_list)}
      </Td>
      <Td isNumeric color={"bg-accent"} fontWeight={"bold"}>
        {getNet(score.hole_strokes_list, score.handicap)}
      </Td>
    </Tr>
  );
};
