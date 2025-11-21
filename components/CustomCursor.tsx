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
      // Check if the hovered element is clickable (button, link, input, or has specific class)
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
      {/* Main Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-bronze rounded-full pointer-events-none z-[10000] mix-blend-difference"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isHovering ? 0 : 1,
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.1 }}
      />

      {/* Outer Ring / Crosshair */}
      <motion.div
        className="fixed top-0 left-0 border border-charcoal dark:border-alabaster pointer-events-none z-[9999] flex items-center justify-center"
        animate={{
          x: mousePosition.x - (isHovering ? 24 : 16),
          y: mousePosition.y - (isHovering ? 24 : 16),
          width: isHovering ? 48 : 32,
          height: isHovering ? 48 : 32,
          borderRadius: isHovering ? '50%' : '0%', // Square to Circle on hover
          borderColor: isHovering ? '#C5A065' : 'currentColor',
          opacity: 0.6
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      >
        {/* Crosshair lines visible only when not hovering (precision mode) */}
        {!isHovering && (
            <>
                <div className="absolute w-[120%] h-[1px] bg-current opacity-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute h-[120%] w-[1px] bg-current opacity-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            </>
        )}
      </motion.div>
    </>
  );
};