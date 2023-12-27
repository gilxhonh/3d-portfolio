interface framerMotionTypes {
  type: "spring" | "decay" | "keyframes" | "tween" | "inertia" | undefined;
  mass: number;
  stiffness: number;
  damping: number;
  restDelta: number;
}

export const framerMotionConfig: framerMotionTypes = {
  type: "spring",
  mass: 5,
  stiffness: 500,
  damping: 55,
  restDelta: 0.0001,
};
