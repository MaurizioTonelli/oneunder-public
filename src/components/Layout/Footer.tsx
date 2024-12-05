import {
  Button,
  ButtonGroup,
  Container,
  Box,
  Divider,
  IconButton,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import { FaTwitter, FaInstagram, FaFacebook } from "react-icons/fa";
import { Image } from "@chakra-ui/react";

import logo from "@/assets/oneunderlogo.png";

export const Footer = () => {
  return (
    <Box as="section" pt={{ base: "2", md: "4" }} w="full">
      <Box
        as="footer"
        role="contentinfo"
        bg="bg-surface"
        w="full"
        boxShadow={useColorModeValue("sm", "sm-dark")}
      >
        <Container>
          <Stack
            spacing="8"
            direction={{ base: "column", md: "row" }}
            justify="space-between"
            py={{ base: "12", md: "16" }}
          >
            <Stack spacing={{ base: "6", md: "8" }} align="start">
              <Image boxSize={"50px"} objectFit={"cover"} src={logo} />
              <Text color="muted">OneUnderMx</Text>
            </Stack>
            <Stack
              direction={{ base: "column-reverse", md: "column", lg: "row" }}
              spacing={{ base: "12", md: "8" }}
            >
              <Stack direction="row" spacing="8">
                <Stack spacing="4" minW="36" flex="1">
                  <Text fontSize="sm" fontWeight="semibold" color="subtle">
                    Product
                  </Text>
                  <Stack spacing="3" shouldWrapChildren>
                    <Button variant="link">About us</Button>
                    <Button variant="link">Pricing</Button>
                  </Stack>
                </Stack>
                <Stack spacing="4" minW="36" flex="1">
                  <Text fontSize="sm" fontWeight="semibold" color="subtle">
                    Legal
                  </Text>
                  <Stack spacing="3" shouldWrapChildren>
                    <Button variant="link">Privacy</Button>
                    <Button variant="link">Terms</Button>
                    <Button variant="link">License</Button>
                  </Stack>
                </Stack>
              </Stack>
              <Stack spacing="4">
                <Text fontSize="sm" fontWeight="semibold" color="subtle">
                  Stay up to date
                </Text>
                <Stack
                  spacing="4"
                  direction={{ base: "column", sm: "row" }}
                  maxW={{ lg: "360px" }}
                >
                  <Input placeholder="Enter your email" type="email" required />
                  <Button variant="primary" type="submit" flexShrink={0}>
                    Subscribe
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
          <Divider />
          <Stack
            pt="8"
            pb="12"
            justify="space-between"
            direction={{ base: "column-reverse", md: "row" }}
            align="center"
          >
            <Text fontSize="sm" color="subtle">
              &copy; {new Date().getFullYear()} OneUnder, Inc. All rights
              reserved.
            </Text>
            <ButtonGroup variant="ghost">
              <IconButton
                as="a"
                href="#"
                aria-label="LinkedIn"
                icon={<FaInstagram fontSize="1.25rem" />}
              />
              <IconButton
                as="a"
                href="#"
                aria-label="GitHub"
                icon={<FaFacebook fontSize="1.25rem" />}
              />
              <IconButton
                as="a"
                href="#"
                aria-label="Twitter"
                icon={<FaTwitter fontSize="1.25rem" />}
              />
            </ButtonGroup>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};
