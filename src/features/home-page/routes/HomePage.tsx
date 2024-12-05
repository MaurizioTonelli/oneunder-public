import { ContentLayout } from "@/components/Layout";

import { HeroSection } from "../components/HeroSection";
import { TrustedBy } from "../components/TrustedBy";
import { Features } from "../components/Features";
import { TournamentCards } from "../components/TournamentCards";
import { ContactForm } from "../components/ContactForm";

export const HomePage = () => {
  return (
    <ContentLayout>
      <HeroSection />
      <TrustedBy />
      <TournamentCards />
      <Features />
      <ContactForm />
    </ContentLayout>
  );
};
