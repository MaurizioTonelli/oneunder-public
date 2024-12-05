import { Th, Thead, Tr } from "@chakra-ui/react";
import {
  getBack9TeeParSum,
  getFirst9TeeParSum,
  getTeeHoleInfo,
  getTeeParSum,
} from "../utils/scoreUtils";

export const HolesInfoHeader = ({
  courseTeeHoles,
}: {
  courseTeeHoles: any;
}) => {
  return (
    <>
      <Thead bgColor={"bg-muted"}>
        <Tr>
          {Array.from(Array(6).keys()).map(() => (
            <Th textAlign={"right"}></Th>
          ))}
          <Th fontWeight={"bold"}>ADV</Th>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((val) => (
            <Th textAlign={"right"} color="bg-accent" fontWeight={"bold"}>
              {getTeeHoleInfo(courseTeeHoles, val).advantage}
            </Th>
          ))}
          <Th
            textAlign={"right"}
            color="bg-accent"
            fontWeight={"extrabold"}
          ></Th>
          {[10, 11, 12, 13, 14, 15, 16, 17, 18].map((val) => (
            <Th textAlign={"right"} color="bg-accent" fontWeight={"bold"}>
              {getTeeHoleInfo(courseTeeHoles, val).advantage}
            </Th>
          ))}
          <Th
            textAlign={"right"}
            color="bg-accent"
            fontWeight={"extrabold"}
          ></Th>
          <Th
            textAlign={"right"}
            color="bg-accent"
            fontWeight={"extrabold"}
          ></Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Thead bgColor={"bg-muted"}>
        <Tr>
          {Array.from(Array(6).keys()).map(() => (
            <Th></Th>
          ))}
          <Th textAlign={"right"} fontWeight={"bold"}>
            PAR
          </Th>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((val) => (
            <Th textAlign={"right"} color="bg-accent" fontWeight={"bold"}>
              {getTeeHoleInfo(courseTeeHoles, val).par}
            </Th>
          ))}
          <Th textAlign={"right"} color="bg-accent" fontWeight={"bold"}>
            {getFirst9TeeParSum(courseTeeHoles)}
          </Th>
          {[10, 11, 12, 13, 14, 15, 16, 17, 18].map((val) => (
            <Th textAlign={"right"} color="bg-accent" fontWeight={"bold"}>
              {getTeeHoleInfo(courseTeeHoles, val).par}
            </Th>
          ))}
          <Th textAlign={"right"} color="bg-accent" fontWeight={"extrabold"}>
            {getBack9TeeParSum(courseTeeHoles)}
          </Th>
          <Th textAlign={"right"} color="bg-accent" fontWeight={"extrabold"}>
            {getTeeParSum(courseTeeHoles)}
          </Th>
          <Th></Th>
        </Tr>
      </Thead>
    </>
  );
};
