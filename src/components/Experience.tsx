import { ContactShadows, Environment, Sky } from "@react-three/drei";
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
        <Avatar
          animation={animation}
          position-z={-0.7}
          position-x={-0.25}
          position-y={0.3}
          rotation-y={9}
        />
      </group>

      <Office position-y={-1.001} />
    </>
  );
};

export default Experience;
