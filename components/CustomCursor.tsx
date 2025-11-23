
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if the hovered element is clickable
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('cursor-pointer') ||
        target.getAttribute('role') === 'button'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* 1. The Crosshair (Visible when NOT hovering) - Precision Mode */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          opacity: isHovering ? 0 : 1 // Hide standard crosshair when focusing
        }}
        transition={{ duration: 0.1 }}
      >
        {/* Minimalist Crosshair */}
        <div className="absolute w-[1px] h-3 bg-white -top-1.5 left-0"></div>
        <div className="absolute h-[1px] w-3 bg-white -left-1.5 top-0"></div>
      </motion.div>

      {/* 2. The Focus Frame (Visible when Hovering) - Refined CAD Snap Style */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        animate={{
          x: mousePosition.x - 12, // Center a 24px box (half of 24)
          y: mousePosition.y - 12,
          scale: isHovering ? 1 : 0.5,
          opacity: isHovering ? 1 : 0,
        }}
        style={{
            width: 24,
            height: 24,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      >
        {/* The Frame Construction */}
        <div className="relative w-full h-full">
            {/* Top Left Bracket */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-bronze"></div>
            {/* Top Right Bracket */}
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-bronze"></div>
            {/* Bottom Left Bracket */}
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-bronze"></div>
            {/* Bottom Right Bracket */}
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-bronze"></div>
            
            {/* Center Plus for Precision */}
            <div className="absolute top-1/2 left-1/2 w-2 h-[1px] bg-bronze -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute top-1/2 left-1/2 h-2 w-[1px] bg-bronze -translate-x-1/2 -translate-y-1/2"></div>
            
            {/* Subtle Glow */}
            <div className="absolute inset-0 bg-bronze/5 blur-[1px]"></div>
        </div>
      </motion.div>
    </>
  );
};
