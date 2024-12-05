import { Table, TableContainer, Tbody, Tfoot, Thead } from "@chakra-ui/react";
import { getScores } from "../utils/scoreUtils";
import { HolesInfoHeader } from "./HolesInfoHeader";
import { TableHeader } from "./TableHeader";
import { ScoreRow } from "./ScoreRow";

export const MatchTable = ({ match }: { match: any }) => {
  const courseTeeHoles = match.course.tees.holes;

  return (
    <TableContainer>
      <Table size={"sm"} variant="striped" colorScheme="teal">
        <Thead>
          <TableHeader />
        </Thead>
        {courseTeeHoles && <HolesInfoHeader courseTeeHoles={courseTeeHoles} />}
        <Tbody>
          <ScoreRow
            hole_strokes_list={match.playerAStrokes}
            playerName={match.playerA.name}
            scores={getScores(
              match.playerAStrokes,
              match.playerBStrokes,
              match.playerAHandicap,
              match.playerBHandicap,
              match.course.tees.holes.map((hole: any) => ({
                number: hole.number,
                advantage: hole.advantage,
              }))
            )}
            player="A"
          />
          <ScoreRow
            hole_strokes_list={match.playerBStrokes}
            playerName={match.playerB.name}
            scores={getScores(
              match.playerAStrokes,
              match.playerBStrokes,
              match.playerAHandicap,
              match.playerBHandicap,
              match.course.tees.holes.map((hole: any) => ({
                number: hole.number,
                advantage: hole.advantage,
              }))
            )}
            player="B"
          />
        </Tbody>
        <Tfoot>
          <TableHeader />
        </Tfoot>
      </Table>
    </TableContainer>
  );
};
