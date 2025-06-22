"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import { useRef, useMemo, useState, useCallback, useEffect } from "react";
import * as THREE from "three";

// === Tesseract Component ===
interface Ball {
  id: number;
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  scale: number;
  fading: boolean;
}

const MAX_BALLS = 100;

const Tesseract = ({ isVisible }: { isVisible: boolean }) => {
  const groupRef = useRef<THREE.Group>(null);
  const [balls, setBalls] = useState<Ball[]>(() => [createNewBall()]);
  const clickCooldown = useRef(false);
  const isDesktop = typeof window !== "undefined" ? window.innerWidth >= 768 : true;

  function createNewBall(): Ball {
    return {
      id: Date.now() + Math.random(),
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
      scale: 0,
      fading: false,
    };
  }

  const addBalls = useCallback(() => {
    if (clickCooldown.current) return;
    clickCooldown.current = true;

    const numBallsToAdd = Math.floor(Math.random() * 4) + 1;
    setBalls((prevBalls) => {
      let newBalls = [...prevBalls, ...Array.from({ length: numBallsToAdd }, () => createNewBall())];
      if (newBalls.length > MAX_BALLS) {
        newBalls = newBalls.slice(newBalls.length - MAX_BALLS);
      }
      return newBalls;
    });

    setTimeout(() => {
      clickCooldown.current = false;
    }, 200);
  }, []);

  useFrame(({ clock }) => {
    if (!isVisible) return;

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

  useEffect(() => {
    if (!isVisible) return;

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
  }, [isVisible]);

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
      [0, 1], [1, 2], [2, 3], [3, 0],
      [4, 5], [5, 6], [6, 7], [7, 4],
      [0, 4], [1, 5], [2, 6], [3, 7],
      [8, 9], [9, 10], [10, 11], [11, 8],
      [12, 13], [13, 14], [14, 15], [15, 12],
      [8, 12], [9, 13], [10, 14], [11, 15],
      [0, 8], [1, 9], [2, 10], [3, 11],
      [4, 12], [5, 13], [6, 14], [7, 15],
    ];
  }, []);

  const lineMaterial = useMemo(() => (
    new THREE.LineBasicMaterial({
      color: "cyan",
      linewidth: 2,
      opacity: 0.9,
      transparent: true,
    })
  ), []);

  const lines = useMemo(() => {
    return edges.map(([start, end]) => {
      const geometry = new THREE.BufferGeometry().setFromPoints([vertices[start], vertices[end]]);
      return new THREE.Line(geometry, lineMaterial);
    });
  }, [edges, vertices, lineMaterial]);

  return (
    <group ref={groupRef} onClick={addBalls} scale={isDesktop ? 1.25 : 1.35}>
      {lines.map((line, index) => (
        <primitive key={index} object={line} />
      ))}
      {balls.map((ball) => (
        <Sphere key={ball.id} position={ball.position} args={[0.15, 32, 32]} scale={ball.scale}>
          <meshStandardMaterial emissive="cyan" emissiveIntensity={2} roughness={0.2} metalness={0.8} />
        </Sphere>
      ))}
    </group>
  );
};

// === Scroll3D Section ===
const Scroll3D = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, { threshold: 0.2 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative min-h-screen bg-black flex items-center justify-center px-8"
    >
      <div className="flex flex-col md:flex-row items-center md:space-x-8 space-y-8 md:space-y-0 max-w-6xl w-full md:ml-[-160px]">
        {/* Tesseract */}
        <div className="w-full md:w-2/3 h-[300px] md:h-[500px] relative">
          {isVisible && (
            <Canvas className="absolute inset-0">
              <ambientLight intensity={0.2} />
              <pointLight position={[5, 5, 5]} intensity={1.5} />
              <Tesseract isVisible={isVisible} />
            </Canvas>
          )}
        </div>

        {/* Divider */}
        <div className="hidden md:block text-gray-700 text-3xl select-none">|</div>

        {/* Definition */}
        <div className="w-full md:w-1/3 text-left text-gray-400 font-mono space-y-2">
          <h3 className="text-2xl font-semibold tracking-tight text-white">
            tesseract
          </h3>
          <p className="italic text-gray-500">/tĕs′ə-răkt″/</p>
          <p className="text-sm leading-relaxed">
            <span className="font-semibold text-white">(noun)</span> — (mathematics) The four-dimensional analogue of a cube; a 4D polytype bounded by eight cubes (in the same way a cube is bounded by six squares).
          </p>
        </div>
      </div>
    </section>
  );
};

export default Scroll3D;