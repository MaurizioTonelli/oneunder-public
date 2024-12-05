import { Table, TableContainer, Tbody, Tfoot, Thead } from "@chakra-ui/react";
import { HolesInfoHeader } from "./HolesInfoHeader";
import { TableHeader } from "./TableHeader";
import { ScoreRow } from "./ScoreRow";

export const MatchTable = ({ score, course }: { score: any; course: any }) => {
  const courseTeeHoles = course?.tees[0].holes;

  return (
    <TableContainer mt={6}>
      <Table size={"sm"} variant="striped" colorScheme="teal">
        <Thead>
          <TableHeader />
        </Thead>
        {courseTeeHoles && <HolesInfoHeader courseTeeHoles={courseTeeHoles} />}
        <Tbody>
          <ScoreRow
            hole_strokes_list={score?.hole_strokes_list}
            playerName={score?.player?.name}
            courseTeeHoles={courseTeeHoles}
          />
        </Tbody>
        <Tfoot>
          <TableHeader />
        </Tfoot>
      </Table>
    </TableContainer>
  );
};
