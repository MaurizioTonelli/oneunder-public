import { ContentLayout } from "@/components/Layout";
import {
  VStack,
  Stack,
  Box,
  HStack,
  // useStatStyles
} from "@chakra-ui/react";
import { ScoresHeading } from "../components/ScoresHeading";
import { TournamentDays } from "../components/TournamentDays";
import { useSearchParams } from "react-router-dom";
import logo from "@/assets/oneunderlogo.png";
import ccqLogo from "@/assets/ccq_logo.png";
import { Image, Text } from "@chakra-ui/react";

import {
  RadioButton,
  RadioButtonGroup,
} from "@/components/elements/RadioButtonGroup";
import { useState } from "react";
import { TournamentBrackets } from "../components/TournamentBrackets";

const ViewModeSelector = ({
  currentView,
  setCurrentView,
}: {
  currentView: string;
  setCurrentView: React.Dispatch<React.SetStateAction<string>>;
}) => (
  <Box pt={{ base: "2", md: "4" }} display={"flex"} justifyContent={"center"}>
    <Stack spacing="5">
      <RadioButtonGroup
        size={"lg"}
        value={currentView}
        onChange={(value: string) => {
          setCurrentView(value);
        }}
      >
        <RadioButton value={"scores"}>Scores</RadioButton>
        <RadioButton value={"brackets"}>Brackets</RadioButton>
      </RadioButtonGroup>
    </Stack>
  </Box>
);

const PoweredBySection = () => {
  return (
    <VStack mt={8}>
      <Text fontStyle={"italic"} fontSize={"small"}>
        Powered by
      </Text>
      <HStack w="full" justifyContent={"center"}>
        <Image boxSize={"80px"} objectFit={"cover"} src={logo} />
        <Image boxSize={"80px"} objectFit={"cover"} src={ccqLogo} />
      </HStack>
    </VStack>
  );
};

export const NassauScores = () => {
  const [searchParams] = useSearchParams();
  const [currentView, setCurrentView] = useState("scores");

  return (
    <ContentLayout>
      <ScoresHeading />
      <PoweredBySection />
      <ViewModeSelector
        currentView={currentView}
        setCurrentView={setCurrentView}
      />

      {currentView == "scores" && (
        <VStack gap={5} mt={5} mb={5}>
          <TournamentDays id={searchParams.get("id")} />;
        </VStack>
      )}
      {currentView == "brackets" && (
        // <>0</>
        <VStack gap={5} mt={10} mb={5}>
          <TournamentBrackets id={searchParams.get("id")} />
        </VStack>
      )}
    </ContentLayout>
  );
};
