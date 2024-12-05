import {
  Box,
  SimpleGrid,
  Text,
  Image,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import ccqLogo from "@/assets/ccq_logo.png";
import campopenLogo from "@/assets/campopen/campopen-logo.png";
import mgLogo from "@/assets/mg-logo.png";
import rogmaiLogo from "@/assets/rogmai-logo.png";

export const TrustedBy = () => {
  return (
    <Box>
      <Box as="section" py="0" mb="24">
        <Box
          maxW={{ base: "xl", md: "7xl" }}
          mx="auto"
          px={{ base: "6", md: "8" }}
        >
          <Text
            fontWeight="bold"
            fontSize="sm"
            textAlign="center"
            textTransform="uppercase"
            letterSpacing="wide"
            color={mode("gray.600", "gray.400")}
          >
            Trusted by
          </Text>
          <SimpleGrid
            mt="8"
            columns={{ base: 1, md: 2, lg: 6 }}
            color="gray.500"
            alignItems="center"
            justifyItems="center"
            spacing={{ base: "12", lg: "24" }}
            fontSize="xl"
          >
            <div></div>
            <Image src={ccqLogo} />
            <Image src={campopenLogo} />
            <Image src={mgLogo} />
            <Image src={rogmaiLogo} />
            <div></div>
          </SimpleGrid>
        </Box>
      </Box>
    </Box>
  );
};
