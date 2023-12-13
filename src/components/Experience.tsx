import { OrbitControls } from "@react-three/drei";
import { useControls } from "leva";
import { Avatar } from "./Avatar.tsx";

const Experience = () => {
  const { animation } = useControls({
    animation: {
      value: "Typing",
      options: ["Typing", "Bored", "FallingIdle"],
    },
  });
  return (
    <>
      <OrbitControls />
      <group position-y={-1}>
        <Avatar animation={animation} />
      </group>
      <ambientLight intensity={1} />
      <directionalLight
        intensity={2}
        position={[10, 20, 10]}
        shadow-radius={5}
        castShadow
      />
      <planeGeometry />
    </>
  );
};

export default Experience;
