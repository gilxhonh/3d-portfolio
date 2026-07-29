import { Canvas } from "@react-three/fiber";
import Experience from "./components/Experience.tsx";
import { Scroll, ScrollControls } from "@react-three/drei";
import ScrollManager from "./utils/ScrollManager.tsx";
import { Suspense, useEffect, useState } from "react";
import { Menu } from "./components/Menu.tsx";
import { MotionConfig } from "framer-motion";
import { framerMotionConfig } from "./utils/config.ts";
import Cursor from "./components/Cursor.tsx";
import { LoadingScreen } from "./components/LoadingScreen.tsx";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Interface from "./components/Interface.tsx";

const isMobile = window.innerWidth < 768;

function App() {
  const [section, setSection] = useState(0);
  const [menuOpened, setMenuOpened] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    setMenuOpened(false);
  }, [section]);

  return (
    <>
      <LoadingScreen started={started} setStarted={setStarted} />
      <MotionConfig
        transition={{
          ...framerMotionConfig,
        }}
      >
        <Canvas
          camera={{ position: [0, 3, 10], fov: 42 }}
          // Rendering at full retina resolution (dpr 2) with antialiasing is
          // too heavy for phone GPUs — and since ScrollControls moves the
          // page inside the render loop, dropped frames make scrolling
          // itself stutter. Cap pixel ratio and skip MSAA on mobile.
          dpr={[1, isMobile ? 1.5 : 2]}
          gl={{ powerPreference: "high-performance", antialias: !isMobile }}
        >
          <color attach="background" args={["#e6e7ff"]} />
          <ScrollControls pages={4} damping={0.1}>
            <ScrollManager section={section} onSectionChange={setSection} />
            <Scroll>
              <Suspense fallback={null}>
                <Experience section={section} menuOpened={menuOpened} />
              </Suspense>
            </Scroll>
            <Scroll html>
              {started && <Interface setSection={setSection} />}
            </Scroll>
          </ScrollControls>
        </Canvas>
        <Menu
          onSectionChange={setSection}
          menuOpened={menuOpened}
          setMenuOpened={setMenuOpened}
        />
        <Cursor />
      </MotionConfig>
      <SpeedInsights />
    </>
  );
}

export default App;
