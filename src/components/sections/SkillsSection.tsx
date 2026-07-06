import React from "react";
import { motion } from "framer-motion";
import Section from "../core/Section.tsx";

type SkillGroup = {
  title: string;
  skills: string[];
};

const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    skills: [
      "React",
      "React Native",
      "Next.js",
      "TypeScript",
      "Redux",
      "Three.js / R3F",
      "Tailwind CSS",
    ],
  },
  {
    title: "Backend",
    skills: ["Node.js", "Java", "Spring Boot", "Express", "REST APIs"],
  },
  {
    title: "Database & DevOps",
    skills: ["PostgreSQL", "SQL", "Docker", "AWS", "CI/CD", "Git"],
  },
];

const languages: string[] = ["🇦🇱 Albanian — native", "🇺🇸 English — fluent"];

const SkillsSection: React.FC = () => {
  return (
    <Section>
      <motion.div whileInView={"visible"}>
        <h2 className="text-5xl font-bold text-white">Skills</h2>
        <div className="mt-8 space-y-6">
          {skillGroups.map((group, groupIndex) => (
            <div key={group.title}>
              <motion.h3
                className="text-lg font-semibold text-indigo-300 uppercase tracking-wider"
                initial={{ opacity: 0 }}
                variants={{
                  visible: {
                    opacity: 1,
                    transition: { duration: 0.6, delay: 0.6 + groupIndex * 0.25 },
                  },
                }}
              >
                {group.title}
              </motion.h3>
              <div className="mt-3 flex flex-wrap gap-2 max-w-md">
                {group.skills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    className="px-3 py-1 rounded-full bg-indigo-500/30 border border-indigo-400/40 text-white text-sm font-medium backdrop-blur-sm"
                    initial={{ opacity: 0, y: 10 }}
                    variants={{
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                          duration: 0.4,
                          delay: 0.7 + groupIndex * 0.25 + index * 0.05,
                        },
                      },
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          ))}
          <div>
            <motion.h3
              className="text-lg font-semibold text-indigo-300 uppercase tracking-wider"
              initial={{ opacity: 0 }}
              variants={{
                visible: {
                  opacity: 1,
                  transition: { duration: 0.6, delay: 1.5 },
                },
              }}
            >
              Languages
            </motion.h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {languages.map((lng, index) => (
                <motion.span
                  key={lng}
                  className="px-3 py-1 rounded-full bg-indigo-500/30 border border-indigo-400/40 text-white text-sm font-medium backdrop-blur-sm"
                  initial={{ opacity: 0, y: 10 }}
                  variants={{
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.4, delay: 1.6 + index * 0.05 },
                    },
                  }}
                >
                  {lng}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </Section>
  );
};

export default SkillsSection;
