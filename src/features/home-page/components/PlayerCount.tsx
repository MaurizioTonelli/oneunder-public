import {
  HStack,
  Icon,
  StackProps,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { HiUsers } from "react-icons/hi";

interface PlayerCountProps extends StackProps {
  count: number;
}

export const PlayerCount = (props: PlayerCountProps) => {
  const { count, ...stackProps } = props;
  return (
    <HStack
      spacing="1"
      fontSize="sm"
      color={useColorModeValue("gray.600", "gray.400")}
      {...stackProps}
    >
      <Icon as={HiUsers} />
      <Text>{count} players</Text>
    </HStack>
  );
};
