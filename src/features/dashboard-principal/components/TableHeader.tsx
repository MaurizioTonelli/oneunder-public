import { Th, Tr } from "@chakra-ui/react";

export const TableHeader = ({ scoreType = "NET" }: { scoreType?: string }) => {
  return (
    <Tr>
      <Th fontWeight={"bold"}>Place</Th>
      <Th fontWeight={"bold"}>Player</Th>
      <Th fontWeight={"bold"}>SCORE</Th>
      <Th fontWeight={"bold"}>Thru</Th>
      <Th fontWeight={"bold"}>H.Played</Th>
      <Th isNumeric background={"bg-accent"} color={"bg-surface"}>
        {scoreType == "gross" ? "GROSS" : "NET"}
      </Th>

      <Th></Th>
      <Th isNumeric>H.1</Th>
      <Th isNumeric>H.2</Th>
      <Th isNumeric>H.3</Th>
      <Th isNumeric>H.4</Th>
      <Th isNumeric>H.5</Th>
      <Th isNumeric>H.6</Th>
      <Th isNumeric>H.7</Th>
      <Th isNumeric>H.8</Th>
      <Th isNumeric>H.9</Th>
      <Th isNumeric background={"bg-accent-muted"} color={"bg-surface"}>
        F9
      </Th>
      <Th isNumeric>H.10</Th>
      <Th isNumeric>H.11</Th>
      <Th isNumeric>H.12</Th>
      <Th isNumeric>H.13</Th>
      <Th isNumeric>H.14</Th>
      <Th isNumeric>H.15</Th>
      <Th isNumeric>H.16</Th>
      <Th isNumeric>H.17</Th>
      <Th isNumeric>H.18</Th>
      <Th isNumeric background={"bg-accent-muted"} color={"bg-surface"}>
        B9
      </Th>
      <Th isNumeric background={"bg-accent"} color={"bg-surface"}>
        TOT
      </Th>
      <Th isNumeric background={"bg-accent"} color={"bg-surface"}>
        NET
      </Th>
    </Tr>
  );
};
