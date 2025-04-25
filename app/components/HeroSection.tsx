"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ChevronRight, FileText, Mail, Github } from "lucide-react";

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
      if (index < messages[messageIndex].length) {
        setTimeout(() => {
          setDisplayedText(messages[messageIndex].slice(0, index + 1));
          setIndex(index + 1);
        }, typingSpeed);
      } else {
        setTimeout(() => setStep(1), 2000);
      }
    } else if (step === 1) {
      if (index > 0) {
        setTimeout(() => {
          setDisplayedText(messages[messageIndex].slice(0, index - 1));
          setIndex(index - 1);
        }, 50);
      } else {
        setMessageIndex((prev) => (prev + 1) % messages.length);
        setStep(0);
      }
    }

    const cursorBlink = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorBlink);
  }, [index, step, messageIndex]);

  return (
    <div className="w-full flex justify-center">
      <p className="text-2xl md:text-3xl lg:text-4xl text-gray-800 font-mono text-center inline-flex">
        {displayedText}
        <span className={`ml-1 ${showCursor ? "opacity-100" : "opacity-0"}`}>
          |
        </span>
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
      className="h-screen flex flex-col items-center justify-center text-center bg-gradient-to-b from-white to-gray-100 relative overflow-hidden px-4"
    >
      <motion.div
        style={{ opacity }}
        className="w-full flex justify-center mb-6"
      >
        <TypingEffect />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-5xl font-bold text-gray-900"
      >
        Jack Yang
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="text-lg text-gray-600 max-w-xl mt-3"
      >
        Student • Software Engineer • New York
      </motion.p>

      {/* Button Group */}
      <div className="absolute bottom-24 px-4 w-full flex flex-row gap-6 items-center justify-center">
        <a
          href="#"
          className="w-16 h-16 rounded-xl flex items-center justify-center text-gray-800 text-lg bg-white hover:bg-gray-100 transition duration-200 shadow-md"
        >
          <FileText size={32} />
        </a>

        <a
          href="mailto:jy3784@nyu.edu"
          className="w-16 h-16 rounded-xl flex items-center justify-center text-gray-800 text-lg bg-white hover:bg-gray-100 transition duration-200 shadow-md"
        >
          <Mail size={32} />
        </a>

        <a
          href="https://github.com/jackyang25"
          target="_blank"
          rel="noopener noreferrer"
          className="w-16 h-16 rounded-xl flex items-center justify-center text-gray-800 text-lg bg-white hover:bg-gray-100 transition duration-200 shadow-md"
        >
          <Github size={32} />
        </a>
      </div>

      <motion.div
        style={{ opacity: scrollTextOpacity }}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute bottom-6 text-gray-500"
      >
        <p className="text-xl">↓</p>
      </motion.div>
    </section>
  );
};

export default HeroSection;
