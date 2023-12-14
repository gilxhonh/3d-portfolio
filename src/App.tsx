import { Canvas } from "@react-three/fiber";
import Experience from "./components/Experience.tsx";
import { Scroll, ScrollControls } from "@react-three/drei";
import { Interface } from "./components/Interface.tsx";

function App() {
  return (
    <>
      <Canvas shadows camera={{ position: [10, 10, 10], fov: 30 }}>
        <color attach="background" args={["#ececec"]} />
        <ScrollControls pages={4} damping={0.1}>
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
