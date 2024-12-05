import {
  FormControl,
  FormLabel,
  Switch,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { TournamentDay } from "./TournamentDay";
import { useTournament } from "../api/getTournamentInfo";
import { useEffect, useRef, useState } from "react";

export const TournamentDays = ({ id }: { id: string | null }) => {
  //TODO: OBTENER LOS DIAS DEL TORNEO
  const tournament = useTournament({}, id);
  const tournamentDays = tournament.data?.tournamentDays;
  const [autoScrollResults, setAutoScrollResults] = useState(false);

  const scroller = useRef<NodeJS.Timeout | null>(null);
  const [tabIndex, setTabIndex] = useState(0);
  const [onceFlag, setOnceFlag] = useState(true);

  useEffect(() => {
    if (tournamentDays && tabIndex != tournamentDays.length - 1 && onceFlag) {
      setTabIndex(tournamentDays.length - 1);
      setOnceFlag(false);
    }
  }, [tournamentDays]);

  const handleStart = () => {
    window.scrollTo({ top: 300 });
    let increment = 1;
    scroller.current = setInterval(() => {
      const isOnTopOfPage = window.scrollY <= 400;
      const isOnBottomOfPage =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 400;
      if (isOnBottomOfPage) {
        increment = -1;
        // window.scrollTo({ top: 300 });
      }
      if (isOnTopOfPage) {
        increment = 1;
      }
      window.scrollBy({ top: increment });
    }, 30);
  };
  const handleReset = () => {
    if (scroller.current !== null) {
      clearInterval(scroller.current);
    }
  };
  useEffect(() => {
    if (scroller.current !== null) {
      clearInterval(scroller.current);
    }
  }, []);

  useEffect(() => {
    if (autoScrollResults) {
      handleStart();
    } else {
      handleReset();
    }
  }, [autoScrollResults]);

  const handleTabsChange = (index) => {
    setTabIndex(index);
  };

  return (
    <>
      <FormControl display="flex" alignItems="center">
        <FormLabel htmlFor="email-alerts" mb="0">
          Autoscroll results
        </FormLabel>
        <Switch
          id="email-alerts"
          isChecked={autoScrollResults}
          onChange={(e) => {
            setAutoScrollResults(e.target.checked);
            // window.scrollTo({ top: 400 });
            // window.scrollBy({ top: 5 });
          }}
        />
      </FormControl>
      {tournament.data && (
        <Tabs w="full" index={tabIndex} onChange={handleTabsChange}>
          <TabList
            overflowY="hidden"
            sx={{
              scrollbarWidth: "none",
              "::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            {tournamentDays.map((day: any) => {
              return (
                <Tab>
                  {/* {new Date(day.date).toLocaleDateString("es-MX")} {"-"} */}
                  {/* {getWeekDay(new Date(day.date).getDay())} */}
                  {day.label}
                </Tab>
              );
            })}
          </TabList>

          <TabPanels>
            {tournamentDays.map((day: any) => (
              <TabPanel paddingX={0}>
                <TournamentDay day={day} />
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      )}
    </>
  );
};
