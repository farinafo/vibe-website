"use client";

import { useEffect, useRef, useMemo } from "react";
import {
  motion,
  useSpring,
  useTransform,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export function HomeFloatingParticles({
  mouseX,
  mouseY,
}: {
  mouseX: number;
  mouseY: number;
}) {
  const reduce = useReducedMotion();
  const particlesRef = useRef<HTMLDivElement>(null);
  
  const particles = useMemo(() => {
    const particleArray: Particle[] = [];
    for (let i = 0; i < 12; i++) {
      particleArray.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 60 + 20,
        duration: Math.random() * 20 + 15,
        delay: Math.random() * 5,
      });
    }
    return particleArray;
  }, []);

  const springX = useSpring(0.5, { stiffness: 40, damping: 30, mass: 0.8 });
  const springY = useSpring(0.5, { stiffness: 40, damping: 30, mass: 0.8 });

  useEffect(() => {
    springX.set(mouseX);
    springY.set(mouseY);
  }, [mouseX, mouseY, springX, springY]);

  const gradientX = useTransform(springX, [0, 1], [-20, 20]);
  const gradientY = useTransform(springY, [0, 1], [-20, 20]);

  if (reduce) {
    return null;
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" ref={particlesRef}>
      {/* Dynamic gradient overlay */}
      <motion.div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          background: `radial-gradient(600px circle at ${mouseX * 100}% ${mouseY * 100}%, rgba(139, 92, 246, 0.3), transparent 40%), radial-gradient(400px circle at ${(1 - mouseX) * 100}% ${(1 - mouseY) * 100}%, rgba(59, 130, 246, 0.2), transparent 40%)`,
          x: gradientX,
          y: gradientY,
        }}
      />

      {/* Floating particles */}
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 0.6, 0.3, 0.6, 0],
              scale: [0, 1, 0.8, 1.2, 0.8],
              x: [0, Math.random() * 40 - 20, Math.random() * -40 + 20, 0],
              y: [0, Math.random() * -40 + 20, Math.random() * 40 - 20, 0],
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div 
              className="w-full h-full rounded-full"
              style={{
                background: `radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, rgba(59, 130, 246, 0.05) 50%, transparent 70%)`,
                filter: "blur(1px)",
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full" style={{ mixBlendMode: "screen" }}>
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(139, 92, 246, 0.1)" />
            <stop offset="100%" stopColor="rgba(59, 130, 246, 0.05)" />
          </linearGradient>
        </defs>
        {particles.slice(0, 6).map((particle, i) => {
          const nextParticle = particles[(i + 1) % particles.length];
          return (
            <motion.line
              key={`line-${particle.id}`}
              x1={`${particle.x}%`}
              y1={`${particle.y}%`}
              x2={`${nextParticle.x}%`}
              y2={`${nextParticle.y}%`}
              stroke="url(#lineGradient)"
              strokeWidth="0.5"
              opacity={0.3}
              animate={{ opacity: [0.1, 0.3, 0.1] }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </svg>
    </div>
  );
}
