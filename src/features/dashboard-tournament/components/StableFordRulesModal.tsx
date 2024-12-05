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
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

export const StableFordRulesModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay zIndex={1402} />
      <ModalContent
        containerProps={{
          zIndex: "2000",
        }}
      >
        <ModalHeader>Stableford Rules</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <TableContainer>
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th>Points</Th>
                  <Th>Strokes</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>0</Td>
                  <Td>2 strokes or more over</Td>
                </Tr>
                <Tr>
                  <Td>1</Td>
                  <Td>1 stroke over</Td>
                </Tr>
                <Tr>
                  <Td>2</Td>
                  <Td>Same number of strokes</Td>
                </Tr>
                <Tr>
                  <Td>3</Td>
                  <Td>1 stroke under</Td>
                </Tr>
                <Tr>
                  <Td>4</Td>
                  <Td>2 strokes under</Td>
                </Tr>
                <Tr>
                  <Td>5</Td>
                  <Td>3 strokes under</Td>
                </Tr>
                <Tr>
                  <Td>6</Td>
                  <Td>4 strokes under</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
