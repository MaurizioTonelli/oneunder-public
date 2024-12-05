import { Container, VStack } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

type ContentLayoutProps = {
  children: ReactNode;
};

export const ContentLayout = ({ children }: ContentLayoutProps) => {
  return (
    <VStack minH="100vh" justifyContent={"space-between"}>
      <Navbar />
      <Container maxW="container.xl">{children}</Container>
      <Footer />
    </VStack>
  );
};
