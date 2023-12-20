import React from "react";
import { motion } from "framer-motion";

// ProgressBar Component
type ProgressBarProps = {
  level: number;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ level }) => (
  <motion.div
    className="h-full bg-indigo-500 rounded-full"
    style={{ width: `${level}%` }}
    initial={{ scaleX: 0, originX: 0 }}
    animate={{ scaleX: 1, transition: { duration: 1 } }}
  />
);

export default ProgressBar;
