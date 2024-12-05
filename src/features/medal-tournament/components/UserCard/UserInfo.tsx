import {
  HStack,
  Icon,
  Stack,
  StackProps,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { HiLocationMarker } from "react-icons/hi";

interface UserInfoProps extends StackProps {
  golfClub: string;
  ghin: string;
  handicapIndex: string;
}

export const UserInfo = (props: UserInfoProps) => {
  const { golfClub, ghin, handicapIndex, ...stackProps } = props;
  return (
    <Stack
      direction={{ base: "column", sm: "row" }}
      justifyContent={"center"}
      spacing={{ base: "1", sm: "6" }}
      mt="4"
      fontSize="sm"
      fontWeight="medium"
      color={useColorModeValue("blue.600", "blue.300")}
      {...stackProps}
    >
      <HStack>
        <Icon as={HiLocationMarker} />
        <Text>{golfClub}</Text>
      </HStack>
      <HStack>
        <Text>GHIN: {ghin}</Text>
      </HStack>
      <HStack>
        <Text>HCP: {handicapIndex}</Text>
      </HStack>
    </Stack>
  );
};
