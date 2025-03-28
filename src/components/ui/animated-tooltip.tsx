"use client";
import React, { ReactDOM, useState } from "react";
import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "motion/react";

interface porpsType {
  content: string,
  hoverKey: number | string,
  children: React.ReactNode,
}
export const AnimatedTooltip = ({ content, hoverKey, children }: porpsType) => {
  const [hoveredKey, setHoveredKey] = useState<number | string | null>(null);
  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0); // going to set this value on mouse move
  // rotate the tooltip
  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig
  );
  // translate the tooltip
  const translateX = useSpring(
    useTransform(x, [-50, 25], [-50, 50]),
    springConfig
  );
  const handleMouseMove = (event: any) => {
    const halfWidth = event.target.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth); // set the x value, which is then used in transform and rotate
  };

  return (
    <>
      <div
        className="relative group"
        onMouseEnter={() => setHoveredKey(hoverKey)}
        onMouseLeave={() => setHoveredKey(null)}
      >
        <AnimatePresence mode="popLayout">
          {hoveredKey === hoverKey && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.6 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 260,
                  damping: 10,
                },
              }}
              exit={{ opacity: 0, y: 20, scale: 0.6 }}
              style={{
                translateX: translateX,
                rotate: rotate,
                whiteSpace: "nowrap",
              }}
              className="absolute -top-10 -left-1/2 translate-x-1/2 flex text-xs  flex-col items-center justify-center rounded-md bg-black z-50 shadow-xl px-4 py-2"
            >
              <div className="absolute inset-x-10 z-30 w-[20%] -bottom-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent h-px " />
              <div className="absolute left-0 w-[40%] z-30 -bottom-px bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px " />
              {/* <div className="font-bold text-white relative z-30 text-base">
                {content}
              </div> */}
              <div className="text-white text-xs">{content}</div>
            </motion.div>
          )}
        </AnimatePresence>
        <div onMouseMove={handleMouseMove}>{children}</div>
      </div>
    </>
  );
};
