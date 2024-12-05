import { Accordion, AccordionItem, VStack } from "@chakra-ui/react";
import { MatchCard } from "./MatchCard";

export const TournamentDay = ({ day }: { day: any }) => {
  //TODO: get scores according to day

  return (
    <VStack gap={5}>
      {day.matches.map((match: any, i: number) => {
        return (
          <Accordion
            key={i}
            allowToggle
            w={"full"}
            border={"0px solid transparent"}
          >
            <AccordionItem>
              <MatchCard match={match} index={i} />
            </AccordionItem>
          </Accordion>
        );
      })}
    </VStack>
  );
};
