import React from "react";
import ContactSection from "./sections/ContactSection.tsx";
import AboutSection from "./sections/AboutSection.tsx";
import SkillsSection from "./sections/SkillsSection.tsx";
import Section from "./core/Section.tsx";

const Interface: React.FC = () => (
  <div className={`flex flex-col items-center w-screen`}>
    <AboutSection />
    <SkillsSection />
    <Section>
      <div>Projects</div>
    </Section>
    <ContactSection />
  </div>
);

export default Interface;
