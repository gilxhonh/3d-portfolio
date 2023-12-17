// About Section Component
import React from "react";
import Section from "../core/Section.tsx";
import Name from "../core/Name.tsx";
import MainButton from "../core/MainButton.tsx";
import { motion } from "framer-motion";

const AboutSection: React.FC = () => (
  <Section>
    <motion.h1 className="text-6xl font-extrabold leading-snug">
      Hi, I'm
      <br />
      <div className="bg-white px-1 italic">
        <Name>Gilxhon Hima</Name>
      </div>
    </motion.h1>
    <motion.p
      className="text-lg text-gray-600 mt-4"
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 1 }}
    >
      I make great software to help companies
      <br />
      enhance their digital presence.
    </motion.p>
    <MainButton title="Contact Me" />
  </Section>
);

export default AboutSection;
