"use client";
import { motion, useMotionValue, animate } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const Biography = () => {
  const terminalCommand = "jack@website:~$ ./hello.sh";
  const containerRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const [isMobile, setIsMobile] = useState(false);

  const bioParagraphs = [
    ">>> <span class='text-white'>Hey, welcome to my profile.</span> I live in Manhattan, NYC and I enjoy working out, travelling, and meeting new people.",
    ">>> <span class='text-white'>I graduated from New York University with a degree in Computer Science and I'm interested in software engineering, fintech, cloud computing, and machine learning.</span>",
    ">>> <span class='text-white'>Some of my past projects include work in robotics, text-to-text models, and full-stack development.</span>",
    ">>> <span class='text-white'>I'm currently working as a software engineer at a startup and am working towards specializing in ML engineering via a GCP partnership program.</span>",
  ];

  const snapBack = () => {
    animate(x, 0, { type: "spring", stiffness: 300, damping: 30 });
    animate(y, 0, { type: "spring", stiffness: 300, damping: 30 });
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const TerminalWindow = isMobile ? "div" : motion.div;

  return (
    <section className="biography-section relative z-0 min-h-screen flex flex-col justify-center items-center px-6 pb-24 bg-gradient-to-b from-gray-100 via-gray-200 to-black overflow-hidden">
      <div
        ref={containerRef}
        className="relative w-full max-w-screen-xl h-screen px-4"
      >
        <TerminalWindow
          {...(!isMobile && {
            drag: true,
            dragElastic: 0.2,
            dragMomentum: false,
            dragConstraints: { top: -80, bottom: 80, left: -100, right: 100 },
            style: { x, y },
            onDragEnd: snapBack,
            whileDrag: { scale: 1.02 },
          })}
          className={`absolute z-[9999] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-3xl w-full bg-gray-900 bg-opacity-95 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden ${
            !isMobile ? "cursor-grab active:cursor-grabbing" : ""
          }`}
        >
          {/* Terminal Header */}
          <div className="flex items-center px-4 py-2 bg-gray-800 border-b border-gray-700 text-gray-400 text-xs rounded-t-2xl">
            <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
            <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
            <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
            <p className="font-mono text-blue-400">jack@website:~$</p>
          </div>

          {/* Terminal Content */}
          <div
            className="p-5 text-white text-sm leading-relaxed whitespace-pre-line"
            style={{ fontFamily: '"Fira Code", monospace' }}
          >
            <span className="text-blue-400">{terminalCommand}</span>
            <br />
            <br />
            {bioParagraphs.map((line, idx) => (
              <div key={idx} className="mb-3">
                <span dangerouslySetInnerHTML={{ __html: line }} />
              </div>
            ))}
          </div>
        </TerminalWindow>
      </div>

      {/* Scroll Arrow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute bottom-10 z-10 text-gray-500"
      >
        <motion.p
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-base font-mono"
        >
          ↓
        </motion.p>
      </motion.div>
    </section>
  );
};

export default Biography;