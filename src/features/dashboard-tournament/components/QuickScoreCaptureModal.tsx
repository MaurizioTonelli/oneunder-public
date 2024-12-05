import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import FastNumericInput from "./FastNumericInput";
import { useEffect, useState } from "react";
import { useScoreManager } from "../api/useScoreManager";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";
import * as Realm from "realm-web";

const {
  BSON: { Long },
} = Realm;

export const QuickScoreCaptureModal = ({
  isOpen,
  onClose,
  score,
}: {
  isOpen: boolean;
  onClose: () => void;
  score: any;
}) => {
  const [holeStrokesList, setHoleStrokesList] = useState(
    score.hole_strokes_list.map((hole) => hole.strokes)
  );
  const queryClient = useQueryClient();
  const scoreManager = useScoreManager();

  useEffect(() => {
    resetHoleStrokes();
  }, [isOpen, score]);

  const updateScore = async () => {
    console.log(score);
    const scoreModifications: any = {
      hole_strokes_list: holeStrokesList.map((holeStroke, i) => {
        return {
          number: (i + 1).toString(),
          ownerId: score.player.ownerId,
          strokes: new Long(Number(holeStroke)),
        };
      }),
    };

    const result = await scoreManager.updateScore(
      score.id.toString(),
      scoreModifications
    );
    console.log(result);
    toast.success("Updated player");
    queryClient.invalidateQueries("rounds-with-scores");
    onClose();
  };

  const handleChangeHoleStrokes = (holeNo, strokes) => {
    setHoleStrokesList((prevHoleStrokesList) => {
      // Make a copy of the current array to ensure immutability
      const updatedHoleStrokesList = [...prevHoleStrokesList];
      // Update the specific hole's strokes with the new value
      updatedHoleStrokesList[holeNo - 1] = strokes;
      // Return the new array to update the state
      return updatedHoleStrokesList;
    });
  };
  const resetHoleStrokes = () => {
    setHoleStrokesList(score.hole_strokes_list.map((hole) => hole.strokes));
  };

  return (
    <Modal size={"6xl"} isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay zIndex={1402} />
      <ModalContent
        containerProps={{
          zIndex: "2000",
        }}
      >
        <ModalHeader>{score.player.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <TableContainer>
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th></Th>
                  {[
                    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
                    18,
                  ].map((num) => (
                    <Th textAlign={"center"}>H.{num}</Th>
                  ))}
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Th textAlign="center">Current score</Th>
                  {[
                    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
                    18,
                  ].map((num) => (
                    <Th textAlign="center">
                      {score.hole_strokes_list[num - 1].strokes.toString()}
                    </Th>
                  ))}
                </Tr>
                <Tr>
                  <Th textAlign="center">New score</Th>
                  {[
                    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
                    18,
                  ].map((num) => (
                    <Th textAlign="center">
                      <FastNumericInput
                        holeNo={num}
                        setValue={handleChangeHoleStrokes}
                        value={holeStrokesList[num - 1]}
                      />
                    </Th>
                  ))}
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            Cancel
          </Button>
          {/*
            <Button mr={3} onClick={resetHoleStrokes}>
              Reset score to original values
            </Button>
          */}
          <Button colorScheme="blue" mr={3} onClick={updateScore}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
