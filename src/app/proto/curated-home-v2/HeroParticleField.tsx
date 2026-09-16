"use client";

import { useEffect, useRef } from "react";
import styles from "./page.module.css";

type SmokeParticle = {
  homeX: number;
  homeY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  phase: number;
  driftX: number;
  driftY: number;
};

type TrailPoint = {
  x: number;
  y: number;
  createdAt: number;
  speed: number;
};

const BACKGROUND = "#aaabab";
const TRAIL_LIFETIME = 820;

function seededRandom(seed: number) {
  let value = seed >>> 0;
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

function makeParticles(width: number, height: number, compact: boolean) {
  const random = seededRandom(19891026);
  const count = compact ? 18 : 28;

  return Array.from({ length: count }, (_, index): SmokeParticle => {
    const column = index % 6;
    const row = Math.floor(index / 6);
    const homeX = width * (-0.08 + column * 0.21 + (random() - 0.5) * 0.17);
    const homeY = height * (-0.12 + row * 0.28 + (random() - 0.5) * 0.2);

    return {
      homeX,
      homeY,
      x: homeX,
      y: homeY,
      vx: 0,
      vy: 0,
      radius: Math.min(width, height) * (0.2 + random() * 0.23),
      opacity: 0.5 + random() * 0.34,
      phase: random() * Math.PI * 2,
      driftX: 9 + random() * 24,
      driftY: 7 + random() * 19,
    };
  });
}

export default function HeroParticleField() {
  const fieldRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const field = fieldRef.current;
    const canvas = canvasRef.current;
    if (!field || !canvas) return;

    const context = canvas.getContext("2d", { alpha: false });
    if (!context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const compactScreen = window.matchMedia("(max-width: 700px)");
    const pointer = {
      x: 0,
      y: 0,
      previousX: 0,
      previousY: 0,
      speed: 0,
      strength: 0,
      active: false,
    };

    let particles: SmokeParticle[] = [];
    let trail: TrailPoint[] = [];
    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let animationFrame = 0;
    let isVisible = true;

    const resize = () => {
      const bounds = field.getBoundingClientRect();
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      // A deliberately reduced render resolution keeps the smoke soft and inexpensive.
      pixelRatio = Math.min(window.devicePixelRatio || 1, 1.25) * 0.64;
      canvas.width = Math.max(1, Math.round(width * pixelRatio));
      canvas.height = Math.max(1, Math.round(height * pixelRatio));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      particles = makeParticles(width, height, compactScreen.matches);
      trail = [];
      pointer.x = pointer.previousX = width * 0.5;
      pointer.y = pointer.previousY = height * 0.5;
    };

    const drawSmoke = (seconds: number) => {
      context.fillStyle = BACKGROUND;
      context.fillRect(0, 0, width, height);
      context.globalCompositeOperation = "source-over";

      particles.forEach((particle, index) => {
        const targetX = particle.homeX + Math.sin(seconds * (0.075 + index * 0.0017) + particle.phase) * particle.driftX;
        const targetY = particle.homeY + Math.cos(seconds * (0.064 + index * 0.0013) + particle.phase) * particle.driftY;

        particle.vx += (targetX - particle.x) * 0.00055;
        particle.vy += (targetY - particle.y) * 0.00055;

        if (pointer.strength > 0.01) {
          const deltaX = particle.x - pointer.x;
          const deltaY = particle.y - pointer.y;
          const distance = Math.max(1, Math.hypot(deltaX, deltaY));
          const influenceRadius = 175 + Math.min(pointer.speed * 7, 115) + particle.radius * 0.22;
          const proximity = Math.max(0, 1 - distance / influenceRadius);
          const force = proximity * proximity * pointer.strength * (0.42 + Math.min(pointer.speed * 0.018, 0.65));
          particle.vx += (deltaX / distance) * force;
          particle.vy += (deltaY / distance) * force;
        }

        particle.vx *= 0.965;
        particle.vy *= 0.965;
        particle.x += particle.vx;
        particle.y += particle.vy;

        const gradient = context.createRadialGradient(
          particle.x,
          particle.y,
          particle.radius * 0.08,
          particle.x,
          particle.y,
          particle.radius,
        );
        gradient.addColorStop(0, `rgba(5, 7, 7, ${particle.opacity})`);
        gradient.addColorStop(0.55, `rgba(8, 10, 10, ${particle.opacity * 0.8})`);
        gradient.addColorStop(0.82, `rgba(10, 12, 12, ${particle.opacity * 0.34})`);
        gradient.addColorStop(1, "rgba(12, 14, 14, 0)");
        context.fillStyle = gradient;
        context.fillRect(
          particle.x - particle.radius,
          particle.y - particle.radius,
          particle.radius * 2,
          particle.radius * 2,
        );
      });
    };

    const drawPointerInfluence = (now: number) => {
      context.globalCompositeOperation = "source-over";
      trail = trail.filter((point) => now - point.createdAt < TRAIL_LIFETIME);

      trail.forEach((point) => {
        const age = (now - point.createdAt) / TRAIL_LIFETIME;
        const visibility = (1 - age) * (0.16 + Math.min(point.speed / 85, 0.24));
        const radius = 76 + Math.min(point.speed * 1.65, 92) + age * 26;
        const gradient = context.createRadialGradient(point.x, point.y, 0, point.x, point.y, radius);
        gradient.addColorStop(0, `rgba(170, 171, 171, ${visibility})`);
        gradient.addColorStop(0.52, `rgba(170, 171, 171, ${visibility * 0.64})`);
        gradient.addColorStop(1, "rgba(170, 171, 171, 0)");
        context.fillStyle = gradient;
        context.fillRect(point.x - radius, point.y - radius, radius * 2, radius * 2);
      });
    };

    const renderStaticFrame = () => {
      drawSmoke(9.5);
      context.globalCompositeOperation = "source-over";
    };

    const draw = (now: number) => {
      animationFrame = 0;
      pointer.strength += ((pointer.active ? 1 : 0) - pointer.strength) * 0.085;
      pointer.speed *= 0.88;

      drawSmoke(now * 0.001);
      drawPointerInfluence(now);

      if (isVisible && !document.hidden && !reducedMotion.matches) {
        animationFrame = window.requestAnimationFrame(draw);
      }
    };

    const start = () => {
      if (reducedMotion.matches) {
        renderStaticFrame();
        return;
      }
      if (!animationFrame && isVisible && !document.hidden) {
        animationFrame = window.requestAnimationFrame(draw);
      }
    };

    const stop = () => {
      if (!animationFrame) return;
      window.cancelAnimationFrame(animationFrame);
      animationFrame = 0;
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!finePointer.matches || (event.pointerType && event.pointerType !== "mouse")) return;
      const bounds = field.getBoundingClientRect();
      const inside = event.clientX >= bounds.left && event.clientX <= bounds.right && event.clientY >= bounds.top && event.clientY <= bounds.bottom;

      if (!inside) {
        pointer.active = false;
        return;
      }

      const nextX = event.clientX - bounds.left;
      const nextY = event.clientY - bounds.top;
      const travel = Math.hypot(nextX - pointer.previousX, nextY - pointer.previousY);
      pointer.x = nextX;
      pointer.y = nextY;
      pointer.speed = Math.min(70, pointer.speed * 0.35 + travel * 0.65);
      pointer.previousX = nextX;
      pointer.previousY = nextY;
      pointer.active = true;

      if (travel > 2.5) {
        trail.push({ x: nextX, y: nextY, createdAt: performance.now(), speed: pointer.speed });
        if (trail.length > 22) trail.shift();
      }
    };

    const handlePointerLeave = () => {
      pointer.active = false;
    };

    const handleMotionPreference = () => {
      if (reducedMotion.matches) {
        stop();
        renderStaticFrame();
      } else {
        start();
      }
    };

    const handleVisibility = () => {
      if (document.hidden) stop();
      else start();
    };

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry?.isIntersecting ?? false;
      if (isVisible) start();
      else stop();
    }, { threshold: 0.01 });

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (reducedMotion.matches) renderStaticFrame();
    });

    resize();
    observer.observe(field);
    resizeObserver.observe(field);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("blur", handlePointerLeave);
    document.addEventListener("visibilitychange", handleVisibility);
    reducedMotion.addEventListener("change", handleMotionPreference);
    start();

    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
      stop();
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("blur", handlePointerLeave);
      document.removeEventListener("visibilitychange", handleVisibility);
      reducedMotion.removeEventListener("change", handleMotionPreference);
    };
  }, []);

  return (
    <div ref={fieldRef} className={styles.heroField} aria-hidden="true">
      <canvas ref={canvasRef} className={styles.smokeCanvas} />
      <div className={styles.grain} />
    </div>
  );
}
