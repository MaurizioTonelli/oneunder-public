import { Tr, Td } from "@chakra-ui/react";
import { getHoleScore, getParSymbolValues } from "@/utils/scoreUtils";

import { ParSymbol } from "./ParSymbol";

export const ScoreRow = ({
  hole_strokes_list,
  playerName,
  courseTeeHoles,
}: {
  hole_strokes_list: any;
  playerName: string;
  courseTeeHoles: any;
}) => {
  return (
    <Tr>
      <Td>{playerName}</Td>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map(
        (val) => (
          // <Td isNumeric textAlign={"center"}>
          //   <TableHoleScoreCircle
          //     score={getHoleScore(hole_strokes_list, val.toString())}
          //   />
          // </Td>
          <Td isNumeric textAlign={"center"}>
            <ParSymbol
              symbol={
                getParSymbolValues(
                  hole_strokes_list,
                  courseTeeHoles,
                  Number(val)
                )?.symbol
              }
              double={
                getParSymbolValues(
                  hole_strokes_list,
                  courseTeeHoles,
                  Number(val)
                )?.double
              }
            />
            {getHoleScore(hole_strokes_list, val.toString())}
          </Td>
        )
      )}
    </Tr>
  );
};
