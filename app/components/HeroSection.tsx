"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const TypingEffect = () => {
  const messages = [
    "Welcome to my digital profile.",
    "www.linkedin.com/in/jackyang25/",
    "Let's stay connected.",
  ];

  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [step, setStep] = useState(0);
  const [index, setIndex] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    let typingSpeed = 100;

    if (step === 0) {
      // Typing the message
      if (index < messages[messageIndex].length) {
        setTimeout(() => {
          setDisplayedText(messages[messageIndex].slice(0, index + 1));
          setIndex(index + 1);
        }, typingSpeed);
      } else {
        // Pause before deleting text
        setTimeout(() => setStep(1), 2000);
      }
    } else if (step === 1) {
      // Backspacing the text
      if (index > 0) {
        setTimeout(() => {
          setDisplayedText(messages[messageIndex].slice(0, index - 1));
          setIndex(index - 1);
        }, 50);
      } else {
        // Move to next message
        setMessageIndex((prev) => (prev + 1) % messages.length);
        setStep(0);
      }
    }

    // Cursor blinking effect
    const cursorBlink = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorBlink);
  }, [index, step, messageIndex]);

  return (
    <div className="w-full flex justify-center">
      <p className="text-2xl md:text-3xl lg:text-4xl text-gray-800 font-mono text-center inline-flex">
        {displayedText}
        <span className={`ml-1 ${showCursor ? "opacity-100" : "opacity-0"}`}>|</span>
      </p>
    </div>
  );
};

const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scrollTextOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={ref}
      className="h-screen flex flex-col items-center justify-center text-center bg-gradient-to-b from-gray-100 to-gray-200 relative overflow-hidden px-4"
    >
      {/* Typing Effect (Cursor is Now Fixed) */}
      <motion.div style={{ opacity }} className="w-full flex justify-center mb-6">
        <TypingEffect />
      </motion.div>

      {/* Name */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-5xl font-bold text-gray-900"
      >
        Jack Yang
      </motion.h1>

      {/* Subtitle / Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="text-lg text-gray-600 max-w-xl mt-3"
      >
        Designer • Developer • Human
      </motion.p>

      {/* Scroll Down Indicator */}
      <motion.div
        style={{ opacity: scrollTextOpacity }}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute bottom-10 text-gray-500"
      >
        <p className="text-xl">↓</p>
      </motion.div>

      {/* Floating Particles for Subtle Depth */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-40 top-10 left-20" />
        <div className="absolute w-3 h-3 bg-gray-500 rounded-full opacity-30 top-40 right-20" />
        <div className="absolute w-2 h-2 bg-gray-400 rounded-full opacity-30 bottom-20 left-10" />
      </div>
    </section>
  );
};

export default HeroSection;
