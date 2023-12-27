import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { gsap } from "gsap";
import React, { MutableRefObject, useEffect, useRef } from "react";
import { ScrollControlsState } from "@react-three/drei/web/ScrollControls";

type ScrollManagerProps = {
  section: number;
  onSectionChange: (section: number) => void;
};

export interface ScrollControls extends ScrollControlsState {
  scroll: MutableRefObject<number>;
}

const ScrollManager: React.FC<ScrollManagerProps> = ({
  section,
  onSectionChange,
}) => {
  const data = useScroll() as ScrollControls;
  const lastScroll = useRef(0);
  const isAnimating = useRef(false);

  data.fill.classList.add("top-0", "absolute");

  useEffect(() => {
    gsap.to(data.el, {
      duration: 1,
      scrollTop: section * data.el.clientHeight,
      onStart: () => {
        isAnimating.current = true;
      },
      onComplete: () => {
        isAnimating.current = false;
      },
    });
  }, [section, data.el.clientHeight]);

  useFrame(() => {
    if (isAnimating.current) {
      lastScroll.current = data.scroll.current;
      return;
    }

    const curSection = Math.floor(data.scroll.current * data.pages);
    if (data.scroll.current > lastScroll.current && curSection === 0) {
      onSectionChange(1);
    } else if (
      data.scroll.current < lastScroll.current &&
      data.scroll.current < 1 / (data.pages - 1)
    ) {
      onSectionChange(0);
    }
    lastScroll.current = data.scroll.current;
  });

  return null;
};

export default ScrollManager;
