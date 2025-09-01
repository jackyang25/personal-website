"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ChevronRight, FileText, Mail, Github } from "lucide-react";

type LatestProjectBoxProps = {
  title?: string;
  subtitle?: string;
  onClick?: () => void;
  buttonLabel?: string;
  buttonClass?: string; // <— declare the optional prop
};

const TypingEffect = () => {
  const messages = [
    "https://www.linkedin.com/in/jackyang25/",
    "Let's stay connected.",
    "◡̈",
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

  const currentMessage = messages[messageIndex];
  const isLink = currentMessage.startsWith("http");

  return (
    <div className="w-full flex justify-center">
      <p className="text-1xl md:text-1xl lg:text-2xl text-gray-800 font-mono text-center inline-flex opacity-80">
        {isLink ? (
          <a
            href={currentMessage}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-blue-600 transition"
          >
            {displayedText}
          </a>
        ) : (
          displayedText
        )}
        <span className={`ml-1 ${showCursor ? "opacity-100" : "opacity-0"}`}>
          |
        </span>
      </p>
    </div>
  );
};

// Non-clickable box, smaller width, left-justified, slightly smaller + opaque text
const LatestProjectBox = ({
  title = "Latest Project",
  subtitle = "Spotify Song Popularity Feature Modeling.",
  onClick = () => {},
  buttonLabel = "View",
  buttonClass = "bg-transparent border border-gray-400 text-gray-700", // default styling
}: LatestProjectBoxProps) => {
  return (
    <div className="w-full max-w-md rounded-xl border border-gray-300 bg-transparent p-3 md:p-4">
      <div className="flex items-center gap-3">
        <div className="flex-1 text-left">
          <p className="text-sm md:text-base font-semibold text-gray-900 opacity-90">{title}</p>
          <p className="text-xs md:text-sm text-gray-600 mt-0.5 opacity-70">{subtitle}</p>
        </div>
        <div>
          <button
            type="button"
            onClick={() => { onClick(); }} // returns void now
            className={`inline-flex items-center gap-2 rounded-md ${buttonClass} text-xs font-medium px-3 py-1 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200`}
          >
            {buttonLabel} <ChevronRight className="h-3 w-3" />
          </button>
        </div>
      </div>
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
      <motion.div style={{ opacity }} className="w-full flex justify-center mb-6">
        <TypingEffect />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-4xl font-bold text-gray-900"
      >
        Jack Yang
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="text-1xl text-gray-600 max-w-xl mt-3 opacity-80"
      >
        Computer Science @ NYU
      </motion.p>

      {/* New: outlined box with right-aligned button */}
      <div className="mt-8 w-full flex justify-center px-4">
        <LatestProjectBox
          onClick={() => { window.location.href = "#latest-project"; }} // void
          buttonClass="bg-transparent border border-gray-400 text-gray-700"
        />
      </div>

      {/* Button Group */}
      <div className="absolute bottom-24 px-4 w-full flex flex-row gap-6 items-center justify-center">
        <a
          href="/Jack_Yang_Resume.pdf"
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