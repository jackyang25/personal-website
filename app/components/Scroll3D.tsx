"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import * as THREE from "three";

const MovingLines = () => {
  const linesRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = clock.getElapsedTime() * 0.2; // Continuous rotation
    }
  });

  return (
    <group ref={linesRef}>
      {[...Array(5)].map((_, i) => (
        <Line
          key={i}
          points={[
            [Math.random() * 3 - 1.5, -1, 0],
            [Math.random() * 3 - 1.5, 1, 0],
          ]}
          color="white"
          lineWidth={2}
        />
      ))}
    </group>
  );
};

const Scroll3D = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Convert scroll position to rotation
  const scrollRotation = useTransform(scrollYProgress, [0, 1], [0, Math.PI * 2]);

  return (
    <motion.section
      ref={ref}
      className="h-screen bg-black flex items-center justify-center"
      style={{ rotateY: scrollRotation }} // ✅ Apply motion to the entire section
    >
      <Canvas>
        <MovingLines />
      </Canvas>
    </motion.section>
  );
};

export default Scroll3D;
