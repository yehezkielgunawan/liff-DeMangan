import { Container } from "@chakra-ui/react";
import { Hero } from "../components/Hero";
import { Footer } from "../components/Footer";
import AppContent from "../components/AppContent";

const Index = () => {
  return (
    <Container>
      <Hero />
      <AppContent/>
      <Footer />
    </Container>
  );
};

export default Index;
