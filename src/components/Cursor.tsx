import React, { useCallback, useEffect, useRef, useState } from "react";

const CURSOR_SPEED = 0.08;

let mouseX = -10;
let mouseY = -10;
let outlineX = 0;
let outlineY = 0;

const Cursor: React.FC = () => {
  const cursorOutline = useRef<HTMLDivElement>(null);
  const [hoverButton, setHoverButton] = useState<boolean>(false);

  const animate = useCallback(() => {
    const distX = mouseX - outlineX;
    const distY = mouseY - outlineY;

    outlineX = outlineX + distX * CURSOR_SPEED;
    outlineY = outlineY + distY * CURSOR_SPEED;

    if (cursorOutline.current) {
      cursorOutline.current.style.left = `${outlineX}px`;
      cursorOutline.current.style.top = `${outlineY}px`;
    }
    requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const mouseEventsListener = (event: MouseEvent) => {
      mouseX = event.pageX;
      mouseY = event.pageY;
    };

    document.addEventListener("mousemove", mouseEventsListener);
    const animateEvent = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", mouseEventsListener);
      cancelAnimationFrame(animateEvent);
    };
  }, [animate]);

  useEffect(() => {
    const mouseEventListener = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "button" ||
        target.parentElement?.tagName.toLowerCase() === "a" ||
        target.parentElement?.tagName.toLowerCase() === "button" ||
        target.tagName.toLowerCase() === "span" ||
        target.tagName.toLowerCase() === "input" ||
        target.tagName.toLowerCase() === "textarea"
      ) {
        setHoverButton(true);
      } else {
        setHoverButton(false);
      }
    };

    document.addEventListener("mouseover", mouseEventListener);
    return () => {
      document.removeEventListener("mouseover", mouseEventListener);
    };
  }, []);

  return (
    <>
      <div
        className={`z-50 fixed -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none transition-transform
        ${
          hoverButton
            ? "bg-transparent border-2 border-indigo-900 w-5 h-5"
            : "bg-indigo-500 w-3 h-3"
        }`}
        ref={cursorOutline}
      ></div>
    </>
  );
};

export default Cursor;
