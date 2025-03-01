"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"], // Track progress while scrolling
  });

  // Scroll animations
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]); // Header fades out
  const yText = useTransform(scrollYProgress, [0, 1], [50, 0]);

  // Fade out Scroll Down text
  const scrollTextOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="h-screen flex flex-col items-center justify-center text-center bg-gray-50">
      {/* Profile Image */}
      <motion.div style={{ scale, opacity }} className="mb-6">
        <Image
          src="/profile.jpg"
          alt="Profile Picture"
          width={150}
          height={150}
          className="rounded-full shadow-lg"
        />
      </motion.div>

      {/* Name & Bio */}
      <motion.h1 style={{ y: yText, opacity }} className="text-4xl font-bold text-gray-900">
        Jack Yang
      </motion.h1>
      <motion.p style={{ y: yText, opacity }} className="text-lg text-gray-700 max-w-lg mt-2">
        I’m a software engineer passionate about creating innovative solutions.
      </motion.p>

      {/* Scroll Down Indicator - Now Fades Out */}
      <motion.div
        style={{ opacity: scrollTextOpacity }}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute bottom-10 text-gray-500"
      >
        <p>Scroll Down ⬇</p>
      </motion.div>
    </section>
  );
};

export default HeroSection;
