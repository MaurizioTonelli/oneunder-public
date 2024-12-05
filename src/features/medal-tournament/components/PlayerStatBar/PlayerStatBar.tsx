import { Box, Container, Stack, StackDivider } from "@chakra-ui/react";
import { Stat } from "./Stat";

export const PlayerStatBar = ({
  scorePerDay,
  tournamentDays,
  position,
}: {
  scorePerDay: any;
  tournamentDays: any;
  position: any;
}) => {
  const stats = [
    {
      forcedLabel: "Position",
      label: "Position",
      value: position,
      type: "position",
    },
    ...tournamentDays.map((tournamenDay) => {
      return {
        label: tournamenDay.label,
        value:
          scorePerDay.days[tournamenDay.day] != 0
            ? scorePerDay.days[tournamenDay.day]
            : scorePerDay.holeStrokes[tournamenDay.day].reduce(
                  (acc, curr) => acc + Number(curr.strokes),
                  0
                ) == 0
              ? "0"
              : "E",
      };
    }),
    {
      forcedLabel: "Total",
      label: "Total",
      value: scorePerDay.totalScore,
      type: "total",
    },
  ];
  return (
    <Box as="section" pb={{ base: "4", md: "8" }}>
      <Container>
        <Box bg="bg.surface" borderRadius="lg" boxShadow="sm">
          <Stack
            direction={{ base: "row", md: "row" }}
            divider={<StackDivider />}
            spacing="0"
            borderRadius="lg"
            overflow={"auto"}
          >
            {stats.map((stat, i) => (
              <Stat key={i} index={i} flex="1" {...stat} />
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};
