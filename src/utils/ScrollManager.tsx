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
  const idleFrames = useRef(0);

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
      idleFrames.current = 0;
      return;
    }

    const delta = Math.abs(data.scroll.current - lastScroll.current);
    const pageFloat = data.scroll.current * (data.pages - 1);
    const nearest = Math.min(data.pages - 1, Math.max(0, Math.round(pageFloat)));

    // Snap to the nearest section once scrolling comes to rest, so every
    // section (including Projects) always settles perfectly aligned.
    if (delta < 0.00002) {
      idleFrames.current++;
      if (idleFrames.current === 15 && Math.abs(pageFloat - nearest) > 0.004) {
        if (nearest !== section) {
          onSectionChange(nearest);
        } else {
          gsap.to(data.el, {
            duration: 0.6,
            scrollTop: nearest * data.el.clientHeight,
            onStart: () => {
              isAnimating.current = true;
            },
            onComplete: () => {
              isAnimating.current = false;
            },
          });
        }
      }
    } else {
      idleFrames.current = 0;
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
