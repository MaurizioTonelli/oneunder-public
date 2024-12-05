import {
  SingleEliminationBracket,
  //   DoubleEliminationBracket,
  //   Match,
  SVGViewer,
  createTheme,
} from "@g-loot/react-tournament-brackets";
// import { matches, matchesTest } from "../data/tournamentMockData";
import { useTournamentBrackets } from "../api/getTournamentBrackets";
import { useWindowSize } from "@uidotdev/usehooks";
import {
  RadioButton,
  RadioButtonGroup,
} from "@/components/elements/RadioButtonGroup";
import { useState } from "react";
import { useWomenTournamentBrackets } from "../api/getWomenTournamentBrackets";

const WhiteTheme = createTheme({
  textColor: { main: "#000000", highlighted: "#07090D", dark: "#3E414D" },
  matchBackground: { wonColor: "#1667C890", lostColor: "#1667C850" },
  score: {
    background: { wonColor: "#1667C850", lostColor: "#1667C850" },
    text: { highlightedWonColor: "#7BF59D", highlightedLostColor: "#FB7E94" },
  },
  border: {
    color: "#1667C8",
    highlightedColor: "#1667C8",
  },
  roundHeader: { backgroundColor: "#da96c6", fontColor: "#fff" },
  connectorColor: "#1667C8",
  connectorColorHighlight: "#1667C8",
  svgBackground: "#ffffff00",
  svgBackgroundMobile: "#00000006",
});

const getMatchesFromTournamentBracketsData = (
  tournamentBrackets: any[] | undefined | null,
  category: string = "men",
) => {
  if (!tournamentBrackets) return [];
  return tournamentBrackets.map((bracket) => {
    let obj: any = {
      id: bracket.index,
      name: bracket.name,
      nextLooserMatchId: null,
      tournamentRoundText: bracket.tournamentRoundText,
      startTime: "2021-05-30",
      state: "DONE",
      participants: bracket.participants.map((participant, i) => {
        return {
          id: participant._id,
          resultText: bracket.result,
          isWinner:
            bracket.result != "" && bracket.result == (i + 1).toString(),
          status: null,
          name: participant.name,
          picture: `https://m6whsbmjlbhr6evj.public.blob.vercel-storage.com/0-oneunder-tournament-photos/${participant.ghin}.png`,
        };
      }),
    };
    if (category == "men") {
      if (bracket.tournamentRoundText == "1") {
        obj.nextMatchId = Math.ceil(32 + bracket.index / 2);
      }
      if (bracket.tournamentRoundText == "2") {
        obj.nextMatchId = Math.ceil(48 + (bracket.index - 32) / 2);
      }
      if (bracket.tournamentRoundText == "3") {
        obj.nextMatchId = Math.ceil(56 + (bracket.index - 48) / 2);
      }
      if (bracket.tournamentRoundText == "4") {
        obj.nextMatchId = Math.ceil(60 + (bracket.index - 56) / 2);
      }
      if (bracket.tournamentRoundText == "5") {
        obj.nextMatchId = Math.ceil(62 + (bracket.index - 60) / 2);
      }
    }
    if (category == "women") {
      if (bracket.tournamentRoundText == "1") {
        obj.nextMatchId = Math.ceil(8 + bracket.index / 2);
      }
      if (bracket.tournamentRoundText == "2") {
        obj.nextMatchId = Math.ceil(12 + (bracket.index - 8) / 2);
      }
      if (bracket.tournamentRoundText == "3") {
        obj.nextMatchId = Math.ceil(14 + (bracket.index - 12) / 2);
      }
    }
    if (bracket.nextMatchId) {
      obj.nextMatchId = bracket.nextMatchId;
    }
    return obj;
  });
};

export const TournamentBrackets = ({ id }: { id: string | null }) => {
  const tournamentBrackets = useTournamentBrackets({}, id);
  const womenTournamentBrackets = useWomenTournamentBrackets({}, id);
  const [category, setCategory] = useState("men");

  const size = useWindowSize();

  const finalWidth = size.width ?? 500 - 500;
  const finalHeight = size.height ?? 500 - 500;

  const matches = getMatchesFromTournamentBracketsData(
    category == "men" ? tournamentBrackets.data : womenTournamentBrackets.data,
    category,
  );

  return (
    <>
      <RadioButtonGroup
        size={"sm"}
        value={category}
        onChange={(value: string) => {
          setCategory(value);
        }}
      >
        <RadioButton value={"men"}>Men's Bracket</RadioButton>
        <RadioButton value={"women"}>Women's Bracket</RadioButton>
      </RadioButtonGroup>
      {matches && matches?.length > 0 && size.width && size.width != 0 && (
        <SingleEliminationBracket
          matches={matches}
          theme={WhiteTheme}
          options={{
            style: {
              roundHeader: {
                background: WhiteTheme.roundHeader.backgroundColor,
                backgroundColor: WhiteTheme.roundHeader.backgroundColor,
                fontColor: WhiteTheme.roundHeader.fontColor,
              },
              connectorColor: WhiteTheme.connectorColor,
              connectorColorHighlight: WhiteTheme.connectorColorHighlight,
            },
          }}
          svgWrapper={({ children, ...props }) => (
            <SVGViewer
              width={finalWidth - 50}
              height={finalHeight - 100}
              {...props}
              background={
                size.width! > 500
                  ? WhiteTheme.svgBackground
                  : WhiteTheme.svgBackgroundMobile
              }
              SVGBackground={
                size.width! > 500
                  ? WhiteTheme.svgBackground
                  : WhiteTheme.svgBackgroundMobile
              }
            >
              {children}
            </SVGViewer>
          )}
          matchComponent={({
            match,
            // onMatchClick,
            // onPartyClick,
            onMouseEnter,
            // onMouseLeave,
            topParty,
            bottomParty,
            topWon,
            bottomWon,
            // topHovered,
            // bottomHovered,
            // topText,
            // bottomText,
            // connectorColor,
            // computedStyles,
            teamNameFallback,
            resultFallback,
          }) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",

                  width: "100%",
                  height: "100%",
                }}
              >
                <div>{match.name}</div>
                <div
                  onMouseEnter={() => onMouseEnter(topParty.id)}
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <img src={topParty.picture} width={"40px"} height={"40px"} />
                  <div>{topParty.name || teamNameFallback}</div>
                  {topWon && (
                    <div style={{ color: "green" }}>
                      {
                        // topParty.resultText
                        "champion" ?? resultFallback(topParty)
                      }
                    </div>
                  )}
                </div>

                <div
                  onMouseEnter={() => onMouseEnter(bottomParty.id)}
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <img
                    src={bottomParty.picture}
                    width={"40px"}
                    height={"40px"}
                  />
                  <div>{bottomParty.name || teamNameFallback}</div>
                  {bottomWon && (
                    <div style={{ color: "green" }}>
                      {
                        // bottomParty.resultText
                        "champion" ?? resultFallback(topParty)
                      }
                    </div>
                  )}
                </div>
              </div>
            );
          }}
        />
      )}
    </>
  );
};
