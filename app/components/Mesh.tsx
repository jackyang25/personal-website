"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useMemo, useState, useEffect } from "react";
import * as THREE from "three";

const MeshGrid = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const rotationRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0.001, y: 0.001 }); // Reduced inertia

  // Water ripple effect parameters
  const rippleStrength = 0.03; // Strength of the ripple
  const waveSpeed = 0.2; // Speed of wave movement
  const waveFrequency = 2; // Frequency of the wave oscillation

  // Handle click & drag rotation
  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      setIsDragging(true);
      dragStartRef.current = { x: event.clientX, y: event.clientY };

      if (meshRef.current) {
        rotationRef.current = {
          x: meshRef.current.rotation.x,
          y: meshRef.current.rotation.y,
        };
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (isDragging && meshRef.current) {
        const deltaX = (event.clientX - dragStartRef.current.x) * 0.005;
        const deltaY = (event.clientY - dragStartRef.current.y) * 0.005;

        // Apply rotation relative to its current state
        meshRef.current.rotation.x = rotationRef.current.x + deltaY;
        meshRef.current.rotation.y = rotationRef.current.y + deltaX;

        // Store the velocity for inertia after dragging
        velocityRef.current = { x: deltaY * 0.05, y: deltaX * 0.05 }; // Less inertia
      }
    };

    const handleMouseUp = () => setIsDragging(false);

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  useFrame(() => {
    if (meshRef.current) {
      if (!isDragging) {
        // Continuous auto-rotation + reduced inertia effect after drag
        meshRef.current.rotation.x += velocityRef.current.x;
        meshRef.current.rotation.y += velocityRef.current.y;

        // **Reduce inertia more quickly**
        velocityRef.current.x = THREE.MathUtils.lerp(velocityRef.current.x, 0.001, 0.1);
        velocityRef.current.y = THREE.MathUtils.lerp(velocityRef.current.y, 0.001, 0.1);
      }

      // Water ripple effect
      const geometry = meshRef.current.geometry;
      const position = geometry.attributes.position;
      
      // Update wave animation over time
      const time = performance.now() * waveSpeed;

      // Apply a wavy effect using a sine function to displace the vertices
      for (let i = 0; i < position.count; i++) {
        const vertex = new THREE.Vector3(
          position.getX(i),
          position.getY(i),
          position.getZ(i)
        );

        // Create a ripple effect by applying a sine wave to the Y position of each vertex
        const wave = Math.sin(vertex.x * waveFrequency + time) * rippleStrength;

        // Apply the effect to the Y axis of the vertices
        position.setY(i, vertex.y + wave);
      }

      position.needsUpdate = true;
    }
  });

  const meshGeometry = useMemo(() => {
    const geometry = new THREE.PlaneGeometry(3, 3, 30, 30);
    geometry.rotateX(-Math.PI / 2);
    return geometry;
  }, []);

  return (
    <mesh ref={meshRef} geometry={meshGeometry}>
      <meshStandardMaterial
        wireframe
        color="cyan"
        emissive="cyan"
        emissiveIntensity={1.5}
        roughness={0.1}
        metalness={0.5}
      />
    </mesh>
  );
};

const Scroll3D = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Subtle scroll transformations
  const scrollRotation = useTransform(scrollYProgress, [0, 1], [0, Math.PI * 2]);
  const scrollScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <motion.section
      ref={ref}
      className="h-screen bg-black flex items-center justify-center"
      style={{ rotateY: scrollRotation, scale: scrollScale }}
    >
      <Canvas>
        <ambientLight intensity={0.3} />
        <pointLight position={[3, 3, 3]} intensity={2} />
        <MeshGrid />
      </Canvas>
    </motion.section>
  );
};

export default Scroll3D;
