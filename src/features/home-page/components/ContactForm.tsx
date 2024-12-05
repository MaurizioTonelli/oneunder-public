import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
  StackDivider,
  Text,
  Textarea,
} from "@chakra-ui/react";

export const ContactForm = () => (
  <Container py={{ base: "4", md: "8" }}>
    <Stack spacing="5">
      <Stack
        spacing="4"
        direction={{ base: "column", sm: "row" }}
        justify="space-between"
      >
        <Box>
          <Text textStyle="3xl" fontSize={"2xl"} fontWeight="medium">
            Contact us
          </Text>
          <Text color="fg.muted" textStyle="sm">
            If you have a tournament you need us in, we'll be happy to get back
            to you!
          </Text>
        </Box>
      </Stack>
      <Divider />
      <Stack spacing="5" divider={<StackDivider />}>
        <FormControl id="name">
          <Stack
            direction={{ base: "column", md: "row" }}
            spacing={{ base: "1.5", md: "8" }}
            justify="space-between"
          >
            <FormLabel variant="inline">Name</FormLabel>
            <Input maxW={{ md: "3xl" }} />
          </Stack>
        </FormControl>
        <FormControl id="email">
          <Stack
            direction={{ base: "column", md: "row" }}
            spacing={{ base: "1.5", md: "8" }}
            justify="space-between"
          >
            <FormLabel variant="inline">Email</FormLabel>
            <Input type="email" maxW={{ md: "3xl" }} />
          </Stack>
        </FormControl>

        <FormControl id="bio">
          <Stack
            direction={{ base: "column", md: "row" }}
            spacing={{ base: "1.5", md: "8" }}
            justify="space-between"
          >
            <Box>
              <FormLabel variant="inline">Your Message</FormLabel>
              <FormHelperText mt="0" color="fg.muted">
                Tell us about your tournament
              </FormHelperText>
            </Box>
            <Textarea maxW={{ md: "3xl" }} rows={5} resize="none" />
          </Stack>
        </FormControl>

        <Flex direction="row-reverse">
          <Button>Send</Button>
        </Flex>
      </Stack>
    </Stack>
  </Container>
);
