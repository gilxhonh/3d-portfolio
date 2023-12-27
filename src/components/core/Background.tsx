import { Sphere, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { gsap } from "gsap";
import { MutableRefObject, useEffect, useRef } from "react";
import * as THREE from "three";
import { ScrollControlsState } from "@react-three/drei/web/ScrollControls";

interface ScrollControls extends ScrollControlsState {
  scroll: MutableRefObject<number>;
}

export const Background = () => {
  const material = useRef<THREE.MeshBasicMaterial>(null);
  const color = useRef({ color: "#b9bcff" });
  const data = useScroll() as ScrollControls;

  const tl = useRef<GSAPTimeline | null>(null);

  useFrame(() => {
    if (tl.current && material.current) {
      tl.current.progress(data.scroll.current);
      material.current.color = new THREE.Color(color.current.color);
    }
  });

  useEffect(() => {
    tl.current = gsap.timeline();
    tl.current.to(color.current, {
      color: "#212121",
    });
    tl.current.to(color.current, {
      color: "#7a7ca5",
    });
    tl.current.to(color.current, {
      color: "#9b96dd",
    });
  }, []);

  return (
    <group>
      <Sphere scale={[30, 30, 30]}>
        <meshBasicMaterial
          ref={material}
          side={THREE.BackSide}
          toneMapped={false}
        />
      </Sphere>
    </group>
  );
};
