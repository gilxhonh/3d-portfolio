import React from "react";
import ContactSection from "./sections/ContactSection.tsx";
import AboutSection from "./sections/AboutSection.tsx";
import SkillsSection from "./sections/SkillsSection.tsx";
import ProjectsSection from "./sections/ProjectsSection.tsx";

interface InterfaceProps {
  setSection: React.Dispatch<React.SetStateAction<number>>;
}

const Interface: React.FC<InterfaceProps> = ({ setSection }) => (
  <div className={`flex flex-col items-center w-screen`}>
    <AboutSection setSection={setSection} />
    <SkillsSection />
    <ProjectsSection />
    <ContactSection />
  </div>
);

export default Interface;
