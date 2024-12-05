import { Box } from "@chakra-ui/react";
import { GiCircle, GiSquare } from "react-icons/gi";

export const ParSymbol = ({
  symbol,
  double,
}: {
  symbol: "square" | "circle" | null;
  double?: boolean;
}) => {
  if (symbol) {
    return (
      <Box position={"relative"}>
        {double && (
          <Box position={"absolute"} top="-1px" right="-4.5px" color={"subtle"}>
            {symbol == "square" ? (
              <GiSquare size={17} />
            ) : (
              <GiCircle size={17} />
            )}
          </Box>
        )}
        <Box position={"absolute"} top="-3px" right="-6.5px" color={"subtle"}>
          {symbol == "square" ? <GiSquare size={21} /> : <GiCircle size={21} />}
        </Box>
      </Box>
    );
  } else {
    return <></>;
  }
};
