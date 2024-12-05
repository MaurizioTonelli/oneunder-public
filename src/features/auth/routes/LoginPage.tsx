import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Link,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { PasswordField } from "../components/PasswordField";
import { useContext, useState } from "react";
import { ContentLayout } from "@/components/Layout";
import * as Realm from "realm-web";
import { AppContext } from "@/config/appContext";
import { Navigate } from "react-router-dom";

const LoginComponent: React.FC = () => {
  const { appConfig } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleChangeEmail = (e: any) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e: any) => {
    setPassword(e.target.value);
  };
  const loginEmail = async () => {
    const credentials = Realm.Credentials.emailPassword(email, password);
    // Authenticate the user
    await appConfig?.logIn(credentials);
    window.location.reload();
    // setUser(user);
  };
  // const createTestUser = async () => {
  //   const e = "mauriziotonelli@hotmail.com";
  //   const p = "12345";
  //   await appConfig?.emailPasswordAuth.registerUser({ email: e, password: p });
  // };

  return (
    <Container
      maxW="lg"
      pt={{ base: "48" }}
      pb={{ base: "12", md: "24" }}
      px={{ base: "0", sm: "8" }}
    >
      <Stack spacing="8">
        <Stack spacing="6">
          <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
            <Heading size={useBreakpointValue({ base: "xs", md: "sm" })}>
              Inicia sesión a tu cuenta
            </Heading>
            <HStack spacing="1" justify="center">
              <Text color="muted">¿Aún no tienes cuenta?</Text>
              <Link colorScheme="blue">Regístrate</Link>
            </HStack>
          </Stack>
        </Stack>
        <Box
          py={{ base: "0", sm: "8" }}
          px={{ base: "4", sm: "10" }}
          bg={useBreakpointValue({ base: "transparent", sm: "bg-surface" })}
          boxShadow={{
            base: "none",
            sm: useColorModeValue("md", "md-dark"),
          }}
          borderRadius={{ base: "none", sm: "xl" }}
        >
          <Stack spacing="6">
            <Stack spacing="5">
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  value={email}
                  onChange={handleChangeEmail}
                  id="email"
                  type="email"
                />
              </FormControl>
              <PasswordField value={password} onChange={handleChangePassword} />
            </Stack>
            <HStack justify="space-between">
              <Button variant="link" colorScheme="blue" size="sm">
                ¿Olvidaste tu contraseña?
              </Button>
            </HStack>
            <Stack spacing="6">
              <Button variant="primary" onClick={loginEmail}>
                Inicia sesión
              </Button>

              {/* TODO: UNCOMMENT WHEN YOU IMPLEMENT OAUTH PROVIDERS
  <HStack>
    <Divider />
    <Text fontSize="sm" whiteSpace="nowrap" color="muted">
      or continue with
    </Text>
    <Divider />
  </HStack>
  <OAuthButtonGroup /> */}
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export const LoginPage = () => {
  const { appConfig } = useContext(AppContext);

  return (
    <ContentLayout>
      {appConfig && !appConfig.currentUser && <LoginComponent />}
      {appConfig && appConfig.currentUser && (
        <Navigate to="/app/admin/tournaments" />
      )}
    </ContentLayout>
  );
};
