import { Canvas } from "@react-three/fiber";
import Experience from "./components/Experience.tsx";
import { Scroll, ScrollControls } from "@react-three/drei";
import ScrollManager from "./utils/ScrollManager.tsx";
import { useState } from "react";
import Interface from "./components/Interface.tsx";

function App() {
  const [section, setSection] = useState(0);
  return (
    <>
      <Canvas shadows camera={{ position: [10, 10, 10], fov: 30 }}>
        <color attach="background" args={["#ececec"]} />
        <ScrollControls pages={4} damping={0.1}>
          <ScrollManager section={section} onSectionChange={setSection} />
          <Experience />
          <Scroll html>
            <Interface />
          </Scroll>
        </ScrollControls>
      </Canvas>
    </>
  );
}

export default App;
