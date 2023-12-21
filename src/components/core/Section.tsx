import { motion } from "framer-motion";
import React from "react";

type SectionProps = {
  children: React.ReactNode;
};

const Section: React.FC<SectionProps> = ({ children }) => (
  <motion.section
    className="w-screen h-screen p-8 max-w-screen-2xl mx-auto flex flex-col items-start justify-center"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0, transition: { duration: 1, delay: 0.6 } }}
  >
    {children}
  </motion.section>
);

export default Section;
