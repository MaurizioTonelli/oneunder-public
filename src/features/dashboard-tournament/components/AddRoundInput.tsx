import { Button, HStack, Input } from "@chakra-ui/react";

export const AddRoundInput = ({
  roundInput,
  setRoundInput,
  addRound,
}: {
  roundInput: string;
  setRoundInput: React.Dispatch<React.SetStateAction<string>>;
  addRound: (id: string) => void;
}) => {
  return (
    <HStack mb={5} w="full">
      <Input
        value={roundInput}
        onChange={(e) => {
          setRoundInput(e.target.value);
        }}
        placeholder="Insert Round ID"
      />
      <Button
        size={"md"}
        colorScheme="blue"
        onClick={() => {
          addRound(roundInput);
        }}
      >
        Add Round
      </Button>
    </HStack>
  );
};
