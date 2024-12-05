import { Th, Tr, Text } from "@chakra-ui/react";

export const TableHeader = ({ tournamentDays }: { tournamentDays: any[] }) => {
  return (
    <Tr>
      <Th fontWeight={"bold"}></Th>
      <Th fontWeight={"bold"}>Place</Th>
      <Th fontWeight={"bold"}>Player</Th>
      <Th fontWeight={"bold"} background={"bg-accent"} color={"bg-surface"}>
        <Text>To Par</Text>
      </Th>

      {tournamentDays.map((day) => {
        return (
          <Th fontSize={"xs"} isNumeric>
            <Text display={{ base: "none", md: "flex" }}>{day.label}</Text>
            <Text display={{ base: "flex", md: "none" }}>R{day.day}</Text>
          </Th>
        );
      })}

      <Th
        isNumeric
        fontWeight={"bold"}
        background={"bg-accent"}
        color={"bg-surface"}
      >
        <Text>TOTAL</Text>
      </Th>
    </Tr>
  );
};
