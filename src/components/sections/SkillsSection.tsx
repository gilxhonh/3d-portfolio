import React from "react";
import { motion } from "framer-motion";
import Section from "../core/Section.tsx";
import ProgressBar from "../core/ProgressBar.tsx";

type Skill = {
  title: string;
  level: number;
};

type Language = {
  title: string;
  level: number;
};

// Skills and Languages Data
const skills: Skill[] = [
  { title: "ReactJs / React Native", level: 90 },
  { title: "Threejs / React Three Fiber", level: 90 },
  { title: "JavaScript", level: 80 },
  { title: "Typescript", level: 70 },
];

const languages: Language[] = [
  { title: "🇦🇱 Albanian", level: 100 },
  { title: "🇺🇸 English", level: 90 },
  { title: "🇮🇹 Italian", level: 25 },
];

// Skill Item Component
type SkillItemProps = {
  skill: Skill;
  index: number;
};

const SkillItem: React.FC<SkillItemProps> = ({ skill, index }) => (
  <>
    <div className="w-64">
      <motion.h3
        className="text-xl font-bold text-gray-800"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { duration: 1, delay: 1 + index * 0.2 },
        }}
      >
        {skill.title}
      </motion.h3>
    </div>
    <div className="h-2 w-full bg-gray-200 rounded-full mt-2">
      <ProgressBar level={skill.level} />
    </div>
  </>
);

// Skills Section Component
const SkillsSection: React.FC = () => (
  <Section>
    <h2 className="text-5xl font-bold">Skills</h2>
    <div className="mt-8 space-y-4">
      {skills.map((skill, index) => (
        <SkillItem skill={skill} index={index} key={index} />
      ))}
    </div>

    <h2 className="text-5xl font-bold mt-10">Languages</h2>
    <div className="mt-8 space-y-4">
      {languages.map((language, index) => (
        <SkillItem skill={language} index={index} key={index} />
      ))}
    </div>
  </Section>
);

export default SkillsSection;
