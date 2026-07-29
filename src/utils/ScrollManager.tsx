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
  const lastTouchTime = useRef(0);
  const direction = useRef(0); // -1 = scrolling up, 1 = scrolling down

  data.fill.classList.add("top-0", "absolute");

  // Track touch state so we never animate scrollTop while the user's finger
  // is on the screen or native momentum scrolling is still running (GSAP
  // fighting the browser over scrollTop is what causes flickering).
  useEffect(() => {
    const el = data.el;
    const onTouchStart = () => {
      isTouching.current = true;
      lastTouchTime.current = performance.now();
      // Kill any in-flight tween immediately so it stops fighting the finger.
      gsap.killTweensOf(el);
      isAnimating.current = false;
    };
    const onTouchMove = () => {
      lastTouchTime.current = performance.now();
    };
    const onTouchEnd = () => {
      isTouching.current = false;
      lastTouchTime.current = performance.now();
    };
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    el.addEventListener("touchcancel", onTouchEnd, { passive: true });
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
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

    const rawDelta = data.scroll.current - lastScroll.current;
    const delta = Math.abs(rawDelta);
    if (delta > 0.0001) {
      direction.current = rawDelta > 0 ? 1 : -1;
    }

    // While the finger is down, just track the position — never snap or
    // change sections mid-gesture.
    if (isTouching.current) {
      lastScroll.current = data.scroll.current;
      idleFrames.current = 0;
      return;
    }

    const sinceTouch = performance.now() - lastTouchTime.current;
    const pageFloat = data.scroll.current * (data.pages - 1);

    // Snap once scrolling has fully come to rest (this also waits out native
    // touch momentum, since momentum keeps delta above the threshold).
    // The target is direction-biased: after scrolling up you only need to be
    // past 30% of the way back for it to settle on the previous section, and
    // vice versa — so a swipe that lands mid-way continues in the direction
    // you were going instead of bouncing back.
    if (delta < 0.00002) {
      idleFrames.current++;
      if (idleFrames.current === 15) {
        const base = Math.floor(pageFloat);
        const frac = pageFloat - base;
        const threshold = direction.current < 0 ? 0.7 : 0.3;
        const target = Math.min(
          data.pages - 1,
          Math.max(0, frac >= threshold ? base + 1 : base)
        );
        if (Math.abs(pageFloat - target) > 0.004) {
          if (target !== section) {
            onSectionChange(target);
          } else {
            gsap.to(data.el, {
              duration: 0.6,
              scrollTop: target * data.el.clientHeight,
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
      }
    } else {
      idleFrames.current = 0;

      // Wheel-only convenience: a scroll tick on the hero advances a full
      // page (and scrolling back near the top returns to it). Never run this
      // right after touch input — starting a tween while native momentum is
      // still writing scrollTop makes the two fight and flicker.
      if (sinceTouch > 1500) {
        const curSection = Math.floor(data.scroll.current * data.pages);
        if (rawDelta > 0 && curSection === 0) {
          onSectionChange(1);
        } else if (
          rawDelta < 0 &&
          data.scroll.current < 1 / (data.pages - 1)
        ) {
          onSectionChange(0);
        }
      }
    }

    lastScroll.current = data.scroll.current;
  });

  return null;
};

export default ScrollManager;
