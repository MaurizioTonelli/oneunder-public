import {
  Box,
  ButtonGroup,
  Container,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { FiBell, FiSearch } from "react-icons/fi";
import { MobileDrawer } from "./components/MobileDrawer";
import { Image } from "@chakra-ui/react";
import logo from "@/assets/oneunderlogo.png";
import logotext from "@/assets/oneunderlogo_text.png";

export const Navbar = () => (
  <Box as="section" w="full" position="fixed" top={0} zIndex={1401}>
    <Box borderBottomWidth="1px" bg="bg-surface" position="relative">
      <Container py="4">
        <HStack justify="space-between" spacing="8">
          <HStack spacing="10">
            <HStack
              spacing="3"
              position={"relative"}
              overflow={"visible"}
              width={120}
            >
              {/* <MobileDrawer /> */}

              <Box width={"50px"} height={"50px"}></Box>
              <Image
                display={{ base: "flex", md: "none" }}
                position={"absolute"}
                top={-2}
                left={0}
                boxSize={"120px"}
                objectFit={"cover"}
                src={logotext}
              />
              <Image
                display={{ base: "none", md: "flex" }}
                position={"absolute"}
                top={-2}
                left={0}
                boxSize={"120px"}
                objectFit={"cover"}
                src={logo}
              />
            </HStack>
            <ButtonGroup
              size="lg"
              variant="text"
              colorScheme="gray"
              spacing="8"
              display={{ base: "none", lg: "flex" }}
            >
              {/* <Button as={Link} href="/dashboard">
                Dashboard
              </Button>
              <Button as={Link} href="/scoring">
                Scoring
              </Button> */}
              {/* <DocumentPopover /> */}
              {/* <Button>History</Button> */}
            </ButtonGroup>
          </HStack>
          <MobileDrawer />
          <HStack spacing={{ base: "2", md: "4" }}>
            <InputGroup
              maxW="2xs"
              display={{ base: "none", md: "inline-flex" }}
            >
              <InputLeftElement>
                <Icon as={FiSearch} color="fg.muted" fontSize="lg" />
              </InputLeftElement>
              <Input placeholder="Search" />
            </InputGroup>
            <ButtonGroup variant="tertiary" spacing="1">
              <IconButton
                icon={<FiSearch />}
                aria-label="Serach"
                display={{ base: "flex", lg: "none" }}
                isRound
              />
              <IconButton
                icon={<FiBell />}
                aria-label="Show notification"
                isRound
              />
            </ButtonGroup>
            {/* <Avatar boxSize="10" src="https://i.pravatar.cc/300" /> */}
          </HStack>
        </HStack>
      </Container>
    </Box>
  </Box>
);
