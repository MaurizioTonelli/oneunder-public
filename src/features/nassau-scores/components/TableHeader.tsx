import { Th, Tr } from "@chakra-ui/react";

export const TableHeader = () => {
  return (
    <Tr>
      <Th fontWeight={"bold"}>Player</Th>
      {[...Array(18).keys()].map((key) => {
        return <Th>{`H. ${key + 1}`}</Th>;
      })}
    </Tr>
  );
};
