"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import { useRef, useMemo, useState, useCallback, useEffect } from "react";
import * as THREE from "three";

interface Ball {
  id: number;
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  scale: number;
  fading: boolean;
}

const Tesseract = () => {
  const groupRef = useRef<THREE.Group>(null);
  const [balls, setBalls] = useState<Ball[]>(() => [createNewBall()]);

  const clickCooldown = useRef(false); // Prevents excessive clicks

  // Function to create a new ball with a truly unique ID
  function createNewBall(): Ball {
    return {
      id: Date.now() + Math.random(), // Ensure uniqueness
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 1.2,
        (Math.random() - 0.5) * 1.2,
        (Math.random() - 0.5) * 1.2
      ),
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02
      ),
      scale: 0, // Start small for pop-in effect
      fading: false,
    };
  }

  // Function to add between 1 to 4 new balls per click
  const addBalls = useCallback(() => {
    if (clickCooldown.current) return; // Prevent spam clicks
    clickCooldown.current = true;

    const numBallsToAdd = Math.floor(Math.random() * 4) + 1; // Random 1-4
    setBalls((prevBalls) => [
      ...prevBalls,
      ...Array.from({ length: numBallsToAdd }, () => createNewBall()),
    ]);

    setTimeout(() => {
      clickCooldown.current = false; // Reset cooldown after a short delay
    }, 200);
  }, []);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const t = clock.getElapsedTime() * 0.6;
      groupRef.current.rotation.x = Math.sin(t) * 1.2;
      groupRef.current.rotation.y = Math.cos(t) * 1.2;
      groupRef.current.rotation.z = Math.sin(t) * 1.0;
    }

    setBalls((prevBalls) =>
      prevBalls.map((ball) => {
        if (ball.fading) {
          return { ...ball, scale: Math.max(ball.scale - 0.05, 0) };
        } else {
          const newPosition = ball.position.clone().add(ball.velocity);
          const limit = 0.8;
          if (Math.abs(newPosition.x) > limit) ball.velocity.x *= -1;
          if (Math.abs(newPosition.y) > limit) ball.velocity.y *= -1;
          if (Math.abs(newPosition.z) > limit) ball.velocity.z *= -1;
          return { ...ball, position: newPosition, scale: Math.min(ball.scale + 0.05, 1) };
        }
      })
    );
  });

  // Remove 1 ball every second (but always keep at least 1 inside)
  useEffect(() => {
    const interval = setInterval(() => {
      setBalls((prevBalls) => {
        if (prevBalls.length > 1) {
          return prevBalls.map((ball, index) =>
            index === 0 ? { ...ball, fading: true } : ball
          );
        }
        return prevBalls;
      });

      setTimeout(() => {
        setBalls((prevBalls) => prevBalls.filter((ball) => ball.scale > 0));
      }, 1000);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // === TRUE 4D TESSERACT PROJECTION ===
  const vertices = useMemo(() => {
    const size = 0.8;
    return [
      [-size, -size, -size, -size], [size, -size, -size, -size], [size, size, -size, -size], [-size, size, -size, -size],
      [-size, -size, size, -size], [size, -size, size, -size], [size, size, size, -size], [-size, size, size, -size],
      [-size, -size, -size, size], [size, -size, -size, size], [size, size, -size, size], [-size, size, -size, size],
      [-size, -size, size, size], [size, -size, size, size], [size, size, size, size], [-size, size, size, size]
    ].map(([x, y, z, w]) => {
      const wFactor = 1 / (1 - w * 0.4);
      return new THREE.Vector3(x * wFactor, y * wFactor, z * wFactor);
    });
  }, []);

  const edges = useMemo(() => {
    return [
      [0,1], [1,2], [2,3], [3,0], 
      [4,5], [5,6], [6,7], [7,4], 
      [0,4], [1,5], [2,6], [3,7], 
      [8,9], [9,10], [10,11], [11,8], 
      [12,13], [13,14], [14,15], [15,12], 
      [8,12], [9,13], [10,14], [11,15], 
      [0,8], [1,9], [2,10], [3,11], 
      [4,12], [5,13], [6,14], [7,15]
    ];
  }, []);

  return (
    <group ref={groupRef} onClick={addBalls}>
      {/* Wireframe Edges */}
      {edges.map(([start, end], index) => {
        const geometry = new THREE.BufferGeometry().setFromPoints([vertices[start], vertices[end]]);
        return (
          <line key={index} geometry={geometry}>
            <lineBasicMaterial attach="material" color="cyan" linewidth={1.5} />
          </line>
        );
      })}

      {/* Glowing Core Spheres (bouncing inside, disappearing when needed) */}
      {balls.map((ball) => (
        <Sphere key={ball.id} position={ball.position} args={[0.15, 32, 32]} scale={ball.scale}>
          <meshStandardMaterial
            emissive="cyan"
            emissiveIntensity={2}
            roughness={0.2}
            metalness={0.8}
          />
        </Sphere>
      ))}
    </group>
  );
};

const Scroll3D = () => {
  return (
    <section className="h-screen bg-black flex items-center justify-center">
      <Canvas>
        <ambientLight intensity={0.2} />
        <pointLight position={[5, 5, 5]} intensity={1.5} />
        <Tesseract />
      </Canvas>
    </section>
  );
};

export default Scroll3D;
