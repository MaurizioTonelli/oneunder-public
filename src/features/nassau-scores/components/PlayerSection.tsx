import { Box, Heading, Image, Text, VStack } from "@chakra-ui/react";
// import golfer1 from "@/assets/golfers/golfer1.png";
// import golfer2 from "@/assets/golfers/golfer2.png";
// import golfer3 from "@/assets/golfers/golfer3.png";
// import golfer4 from "@/assets/golfers/golfer4.png";
// import realgolfer1 from "@/assets/golfers/realgolfer1.png";
// import realgolfer2 from "@/assets/golfers/realgolfer2.png";
// import realgolfer3 from "@/assets/golfers/realgolfer3.png";

// const getRandomGolfer = () => {
//   const random = Math.floor(Math.random() * 7) + 1;
//   switch (random) {
//     case 1:
//       return golfer1;
//     case 2:
//       return golfer2;
//     case 3:
//       return golfer3;
//     case 4:
//       return golfer4;
//     case 5:
//       return realgolfer1;
//     case 6:
//       return realgolfer2;
//     case 7:
//       return realgolfer3;
//   }
// };

const PlayerName = ({
  name,
  color,
  side,
  handicap,
}: {
  name: string;
  color: string;
  side: string;
  handicap: string;
}) => {
  if (name.split(" ")[1]) {
    return (
      <Text
        minW={{ base: "50px", xl: "full" }}
        maxW={{ base: "50px", xl: "full" }}
        overflowWrap={"anywhere"}
        color={color}
        alignItems={"center"}
        justifyContent={side == "left" ? "flex-start" : "flex-end"}
        fontSize={{ base: "8px", xl: "sm" }}
        fontWeight={"bold"}
        display={"flex"}
        flexDir={{ base: "column", xl: "row" }}
        gap={1}
      >
        <Text fontWeight={"normal"} fontStyle={"italic"}>
          {name.slice(0, 1)}.
        </Text>
        {name.split(" ")[1]?.toUpperCase()}
        <>
          <Text fontWeight={"normal"} fontSize={"10px"}>
            {"("}HCP: {handicap}
            {")"}
          </Text>
        </>
      </Text>
    );
  } else {
    return (
      <Text
        minW={{ base: "50px", xl: "full" }}
        maxW={{ base: "50px", xl: "full" }}
        justifyContent={side == "left" ? "flex-start" : "flex-end"}
        color={color}
        alignItems={"center"}
        textAlign="center"
        fontSize={{ base: "8px", xl: "sm" }}
        fontWeight={"bold"}
        display={"flex"}
        gap={1}
      >
        {`${name.toUpperCase()}`}
        <>
          {"("}
          <Text fontWeight={"normal"} fontSize={"10px"}>
            HCP:
          </Text>
          {`${handicap})`}
        </>
      </Text>
    );
  }
};

export const PlayerSection = ({
  name,
  ghin,
  scoreText,
  side,
  result,
  handicap,
}: {
  name: string;
  ghin: string;
  scoreText?: string;
  side: "right" | "left";
  result: "winner" | "loser" | "tied";
  handicap: string;
}) => {
  let beforeStyles =
    result == "loser"
      ? {
          content: `""`,
          bg: side == "left" ? "blue.600" : "red.600",
          width: { base: "5px", xl: "15px" },
          height: "300px",
          position: "absolute",
          left: side == "left" ? 0 : "auto",
          right: side == "right" ? 0 : "auto",
        }
      : {};

  let afterStyles = {
    content: `""`,
    position: "absolute",
    left: side == "left" ? "auto" : { base: "-24px", xl: "-149px" },
    right: side == "left" ? { base: "-24px", xl: "-149px" } : "auto",
    top: { base: "calc(50% - 60px)", xl: "calc(50% - 150px)" },
    width: { base: "25px", xl: "150px" },
    clipPath:
      side == "left"
        ? "polygon(0 0, 0 100%, 50% 50%)"
        : "polygon(100% 0, 100% 100%, 50% 50%)",
    height: { base: "120px", xl: "300px" },
    bg:
      result == "tied" ? "lightgray" : side == "left" ? "blue.600" : "red.600",
  };

  return (
    <Box
      position={"absolute"}
      left={side == "left" ? 0 : "auto"}
      right={side == "right" ? 0 : "auto"}
      top={0}
      bottom={0}
      display={"flex"}
      flexDir={{ base: "column", xl: "row" }}
      justifyContent={{ base: "center", xl: "center" }}
      alignItems={"center"}
      bg={
        result == "winner"
          ? side == "left"
            ? "blue.600"
            : "red.600"
          : result == "tied"
          ? "lightgray"
          : "transparent"
      }
      h={"100%"}
      alignSelf={"stretch"}
      _before={result == "loser" ? beforeStyles : {}}
      _after={result == "winner" || result == "tied" ? afterStyles : {}}
    >
      <VStack
        px={{ base: 3, xl: 5 }}
        py={1}
        order={{ base: "auto", xl: side == "left" ? 1 : 2 }}
      >
        <PlayerName
          name={name}
          color={result == "winner" ? "white" : "black"}
          side={side}
          handicap={handicap}
        />

        <Image
          display={{ base: "none", xl: "block" }}
          boxSize={{ base: 0, xl: 110 }}
          objectFit={"cover"}
          // src={getRandomGolfer()}
          src={`https://m6whsbmjlbhr6evj.public.blob.vercel-storage.com/0-oneunder-tournament-photos/${ghin}.png`}
          fallbackSrc="https://m6whsbmjlbhr6evj.public.blob.vercel-storage.com/0-oneunder-tournament-photos/undefined.png"
        />
      </VStack>
      {result == "tied" && (
        <Heading
          order={side == "left" ? 2 : 1}
          color={"black"}
          zIndex={1}
          marginLeft={side == "right" ? { base: 0, xl: -15 } : "auto"}
          marginRight={side == "left" ? { base: 0, xl: -15 } : "auto"}
          size={"xs"}
          fontWeight={"extrabold"}
          display={{ base: "none", xl: "flex" }}
        >
          TIED
        </Heading>
      )}
      {result == "winner" && (
        <Heading
          order={side == "left" ? 2 : 1}
          color={"white"}
          zIndex={1}
          marginLeft={side == "right" ? { base: 0, xl: -15 } : "auto"}
          marginRight={side == "left" ? { base: 0, xl: -15 } : "auto"}
          size={"lg"}
          fontWeight={"black"}
          alignItems={"center"}
          display={{ base: "none", xl: "flex" }}
        >
          {scoreText?.slice(0, 1)}
          <Heading size="xs" fontWeight="extrabold">
            {scoreText?.slice(1)}
          </Heading>
        </Heading>
      )}
    </Box>
  );
};
