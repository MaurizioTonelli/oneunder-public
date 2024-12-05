import { Th, Thead, Tr } from "@chakra-ui/react";
import { getTeeHoleInfo } from "@/utils/scoreUtils";

export const HolesInfoHeader = ({
  courseTeeHoles,
}: {
  courseTeeHoles: any;
}) => {
  return (
    <>
      <Thead bgColor={"bg-muted"}>
        <Tr>
          <Th fontWeight={"bold"}>ADV</Th>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map(
            (val) => (
              <Th textAlign={"center"} color="bg-accent" fontWeight={"bold"}>
                {getTeeHoleInfo(courseTeeHoles, val).advantage}
              </Th>
            )
          )}
        </Tr>
      </Thead>
      <Thead bgColor={"bg-muted"}>
        <Tr>
          <Th fontWeight={"bold"}>PAR</Th>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map(
            (val) => (
              <Th textAlign={"center"} color="bg-accent" fontWeight={"bold"}>
                {getTeeHoleInfo(courseTeeHoles, val).par}
              </Th>
            )
          )}
        </Tr>
      </Thead>
      <Thead bgColor={"bg-muted"}>
        <Tr>
          <Th fontWeight={"bold"}>YARDS</Th>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map(
            (val) => (
              <Th textAlign={"center"} color="bg-accent" fontWeight={"bold"}>
                {getTeeHoleInfo(courseTeeHoles, val).yards}
              </Th>
            )
          )}
        </Tr>
      </Thead>
    </>
  );
};
