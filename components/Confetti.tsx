"use client";

import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  width: number;
  height: number;
  opacity: number;
}

const INDIAN_FLAG_COLORS = [
  "#E8985A", // Muted saffron
  "#F0F0F0", // Off-white
  "#5A9E5A", // Muted green
];

interface ConfettiProps {
  duration?: number; // Duration in milliseconds
  particleCount?: number;
}

export function Confetti({ duration = 8000, particleCount = 150 }: ConfettiProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const fadeStartRef = useRef<number>(0);

  const createParticle = useCallback((canvasWidth: number): Particle => {
    return {
      x: Math.random() * canvasWidth,
      y: -20,
      vx: (Math.random() - 0.5) * 2, // Slight horizontal drift
      vy: Math.random() * 3 + 2, // Fall speed
      color: INDIAN_FLAG_COLORS[Math.floor(Math.random() * INDIAN_FLAG_COLORS.length)],
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10,
      width: Math.random() * 8 + 6,
      height: Math.random() * 12 + 8,
      opacity: 1,
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      const particle = createParticle(canvas.width);
      // Stagger initial positions
      particle.y = -Math.random() * 500;
      particlesRef.current.push(particle);
    }

    startTimeRef.current = performance.now();
    fadeStartRef.current = duration - 2000; // Start fading 2 seconds before end

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTimeRef.current;

      if (elapsed >= duration) {
        // Animation complete
        if (animationRef.current !== null) {
          cancelAnimationFrame(animationRef.current);
        }
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Calculate global fade
      let globalOpacity = 1;
      if (elapsed > fadeStartRef.current) {
        globalOpacity = 1 - (elapsed - fadeStartRef.current) / 2000;
      }

      particlesRef.current.forEach((particle) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.rotation += particle.rotationSpeed;

        // Add slight wind effect
        particle.vx += (Math.random() - 0.5) * 0.1;

        // Reset particle if it goes off screen
        if (particle.y > canvas.height + 20) {
          if (elapsed < fadeStartRef.current) {
            // Only reset if not in fade phase
            particle.y = -20;
            particle.x = Math.random() * canvas.width;
          }
        }

        // Draw particle
        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate((particle.rotation * Math.PI) / 180);
        ctx.globalAlpha = particle.opacity * globalOpacity;

        // Draw rectangular confetti
        ctx.fillStyle = particle.color;
        ctx.fillRect(
          -particle.width / 2,
          -particle.height / 2,
          particle.width,
          particle.height
        );

        ctx.restore();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      particlesRef.current = [];
    };
  }, [createParticle, duration, particleCount]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{ width: "100vw", height: "100vh" }}
    />
  );
}
