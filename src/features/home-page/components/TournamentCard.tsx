import {
  Box,
  Flex,
  FlexProps,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";

interface TournamentCardProps extends FlexProps {
  livescoreLink: string; // Define the prop type for livescoreLink
}

export const TournamentCard = (props: TournamentCardProps) => {
  const { children, ...rest } = props;
  return (
    <Flex
      direction="column"
      alignItems="center"
      rounded="md"
      padding="8"
      position="relative"
      bg={useColorModeValue("white", "gray.700")}
      shadow={{ md: "base" }}
      as={Link}
      href={props.livescoreLink}
      target="_blank"
      {...rest}
    >
      <Box
        position="absolute"
        inset="0"
        height="20"
        bg="blue.600"
        roundedTop="inherit"
      />

      {children}
    </Flex>
  );
};
