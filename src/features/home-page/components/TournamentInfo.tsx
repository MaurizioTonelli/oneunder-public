import {
  HStack,
  StackProps,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";

interface TournamentInfoProps extends StackProps {
  name: string;
  bio: string;
}

export const TournamentInfo = (props: TournamentInfoProps) => {
  const { name, bio, ...stackProps } = props;
  return (
    <VStack spacing="1" flex="1" {...stackProps}>
      <HStack>
        <Text fontWeight="bold" textAlign={"center"}>
          {name}
        </Text>
      </HStack>
      <Text
        fontSize="sm"
        textAlign="center"
        noOfLines={2}
        color={useColorModeValue("gray.600", "gray.400")}
      >
        {bio}
      </Text>
    </VStack>
  );
};
