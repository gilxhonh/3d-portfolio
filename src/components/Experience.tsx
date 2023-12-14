import {
  ContactShadows,
  Environment,
  OrbitControls,
  Sky,
} from "@react-three/drei";
import { useControls } from "leva";
import { Avatar } from "./Avatar.tsx";
import { Office } from "./Office.tsx";

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
      <Sky />
      <Environment preset="sunset" />
      <group position-y={-1}>
        <ContactShadows
          opacity={0.5}
          scale={10}
          blur={1}
          far={10}
          resolution={256}
          color="#000000"
        />
        <Avatar animation={animation} />
      </group>
      {animation === "Typing" && (
        <mesh scale={[0.8, 0.5, 0.8]} position-y={-0.8} position-z={-0.05}>
          <boxGeometry />
          <meshStandardMaterial color="white" />
        </mesh>
      )}

      <Office />

      <mesh scale={5} rotation-x={-Math.PI * 0.5} position-y={-1.001}>
        <planeGeometry />
        <meshStandardMaterial color="white" />
      </mesh>
    </>
  );
};

export default Experience;
