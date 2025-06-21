"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  radius: number;
};

export default function AnimationCursor({
  targetSectionId,
}: {
  targetSectionId: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particles = useRef<Particle[]>([]);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const section = document.getElementById(targetSectionId);
    let animationFrameId: number;

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function spawnParticle(x: number, y: number) {
      particles.current.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        life: 100,
        radius: Math.random() * 2 + 1,
      });
    }

    function handleMouseMove(e: MouseEvent) {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      const mouseX = (e.clientX - rect.left) * scaleX;
      const mouseY = (e.clientY - rect.top) * scaleY;

      mouse.current.x = mouseX;
      mouse.current.y = mouseY;

      // Only spawn if inside target section
      if (section) {
        const sectionRect = section.getBoundingClientRect();
        if (
          e.clientX >= sectionRect.left &&
          e.clientX <= sectionRect.right &&
          e.clientY >= sectionRect.top &&
          e.clientY <= sectionRect.bottom
        ) {
          for (let i = 0; i < 5; i++) {
            spawnParticle(
              mouseX + Math.random() * 10 - 5,
              mouseY + Math.random() * 10 - 5
            );
          }
        }
      }
    }

    function updateParticles() {
      for (let i = particles.current.length - 1; i >= 0; i--) {
        const p = particles.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 1;
        if (p.life <= 0) {
          particles.current.splice(i, 1);
        }
      }
    }

    function drawParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles.current) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 0, 0, ${p.life / 100})`;
        ctx.fill();
      }
    }

    function animate() {
      updateParticles();
      drawParticles();
      animationFrameId = requestAnimationFrame(animate);
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-[9999] pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-full pointer-events-none" />
    </div>
  );
}
