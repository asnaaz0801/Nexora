import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface TiltCard3DProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string; // e.g. "rgba(0, 210, 255, 0.3)" or "rgba(138, 43, 226, 0.3)"
}

export const TiltCard3D: React.FC<TiltCard3DProps> = ({
  children,
  className = "",
  glowColor = "rgba(0, 210, 255, 0.25)"
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const pctX = (mouseX / width) - 0.5;
    const pctY = (mouseY / height) - 0.5;

    x.set(pctX);
    y.set(pctY);

    setSpotlightPos({
      x: (mouseX / width) * 100,
      y: (mouseY / height) * 100
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      animate={{
        scale: isHovered ? 1.025 : 1
      }}
      transition={{ duration: 0.2 }}
      className={`relative rounded-3xl transition-all duration-300 ${className}`}
    >
      {/* Dynamic Cursor Spotlight Effect */}
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-300 z-10"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(600px circle at ${spotlightPos.x}% ${spotlightPos.y}%, ${glowColor}, transparent 40%)`
        }}
      />

      {/* Holographic Glowing Glass Edge */}
      <div
        className="absolute -inset-[1px] rounded-3xl pointer-events-none transition-opacity duration-500 z-0 opacity-0 group-hover:opacity-100"
        style={{
          background: `linear-gradient(135deg, rgba(0, 210, 255, 0.5), rgba(138, 43, 226, 0.5), rgba(0, 210, 255, 0.1))`,
          borderRadius: 'inherit'
        }}
      />

      <div className="relative z-10 h-full">
        {children}
      </div>
    </motion.div>
  );
};
