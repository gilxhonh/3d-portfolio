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
  const isTouching = useRef(false);
  const touchCooldown = useRef(0);

  data.fill.classList.add("top-0", "absolute");

  // Track touch state so we never animate scrollTop while the user's finger
  // is on the screen (GSAP fighting native touch scroll causes flickering).
  useEffect(() => {
    const el = data.el;
    const onTouchStart = () => {
      isTouching.current = true;
      // Kill any in-flight tween immediately so it stops fighting the finger.
      gsap.killTweensOf(el);
      isAnimating.current = false;
    };
    const onTouchEnd = () => {
      isTouching.current = false;
      // Let momentum scrolling settle before we're allowed to snap again.
      touchCooldown.current = 30;
    };
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    el.addEventListener("touchcancel", onTouchEnd, { passive: true });
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("touchcancel", onTouchEnd);
    };
  }, [data.el]);

  useEffect(() => {
    // Don't start a programmatic scroll while the user is actively touching;
    // the idle-snap below will align the section once they let go.
    if (isTouching.current) return;
    gsap.to(data.el, {
      duration: 1,
      scrollTop: section * data.el.clientHeight,
      overwrite: true,
      onStart: () => {
        isAnimating.current = true;
      },
      onComplete: () => {
        isAnimating.current = false;
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [section]);

  useFrame(() => {
    if (isAnimating.current) {
      lastScroll.current = data.scroll.current;
      idleFrames.current = 0;
      return;
    }

    // While the finger is down (or momentum is still settling), just track
    // the scroll position — never snap or change sections mid-gesture.
    if (isTouching.current || touchCooldown.current > 0) {
      if (!isTouching.current) touchCooldown.current--;
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
            overwrite: true,
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

      // Keep the section state in sync while scrolling, but without
      // triggering a snap animation (the effect above skips it mid-touch,
      // and this only fires here on non-touch input like mouse wheel).
      const curSection = Math.floor(data.scroll.current * data.pages);
      if (data.scroll.current > lastScroll.current && curSection === 0) {
        onSectionChange(1);
      } else if (
        data.scroll.current < lastScroll.current &&
        data.scroll.current < 1 / (data.pages - 1)
      ) {
        onSectionChange(0);
      }
    }

    lastScroll.current = data.scroll.current;
  });

  return null;
};

export default ScrollManager;
