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
  const velocityRef = useRef({ x: 0.001, y: 0.001 });

  // Water ripple effect parameters
  const rippleStrength = 0.03;
  const waveSpeed = 0.2;
  const waveFrequency = 5;

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

        meshRef.current.rotation.x = rotationRef.current.x + deltaY;
        meshRef.current.rotation.y = rotationRef.current.y + deltaX;

        velocityRef.current = { x: deltaY * 0.05, y: deltaX * 0.05 };
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
        meshRef.current.rotation.x += velocityRef.current.x;
        meshRef.current.rotation.y += velocityRef.current.y;

        velocityRef.current.x = THREE.MathUtils.lerp(velocityRef.current.x, 0.001, 0.1);
        velocityRef.current.y = THREE.MathUtils.lerp(velocityRef.current.y, 0.001, 0.1);
      }

      // Water ripple effect
      const geometry = meshRef.current.geometry;
      const position = geometry.attributes.position;
      const time = performance.now() * waveSpeed;

      for (let i = 0; i < position.count; i++) {
        const vertex = new THREE.Vector3(
          position.getX(i),
          position.getY(i),
          position.getZ(i)
        );

        const wave = Math.sin(vertex.x * waveFrequency + time) * rippleStrength;
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
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Observer to detect visibility changes
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting); // Set visibility dynamically
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  // Subtle scroll transformations
  const scrollRotation = useTransform(scrollYProgress, [0, 1], [0, Math.PI * 2]);
  const scrollScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <motion.section
      ref={ref}
      className="h-screen bg-black flex items-center justify-center"
      style={{ rotateY: scrollRotation, scale: scrollScale }}
    >
      {isVisible ? (
        <Canvas>
          <ambientLight intensity={0.3} />
          <pointLight position={[3, 3, 3]} intensity={2} />
          <MeshGrid />
        </Canvas>
      ) : null}
    </motion.section>
  );
};

export default Scroll3D;
