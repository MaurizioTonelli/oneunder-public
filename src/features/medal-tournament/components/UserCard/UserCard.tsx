import { Box, Heading, Text, useColorModeValue } from "@chakra-ui/react";
import { CardContent } from "./CardContent";
import { CardWithAvatar } from "./CardWithAvatar";
import { UserInfo } from "./UserInfo";

export const UserCard = ({ player }: { player: any }) => (
  <Box as="section" pt="20" pb="12" position="relative">
    <Box position="absolute" inset="0" height="32" bg="blue.600" />
    <CardWithAvatar
      maxW="xl"
      avatarProps={{
        src: `https://m6whsbmjlbhr6evj.public.blob.vercel-storage.com/0-oneunder-tournament-photos/${player.ghin}.png`,
        name: player.name,
      }}
    >
      <CardContent>
        <Heading size="lg" fontWeight="extrabold" letterSpacing="tight">
          {player.name}
        </Heading>
        <Text color={useColorModeValue("gray.600", "gray.400")}>
          Nickname: {player.nickname}
        </Text>
        <UserInfo
          golfClub={player.club}
          ghin={player.ghin}
          handicapIndex={player.handicap_index}
        />
      </CardContent>
    </CardWithAvatar>
  </Box>
);
