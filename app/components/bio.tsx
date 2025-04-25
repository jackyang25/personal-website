"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const Biography = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [commandText, setCommandText] = useState("");
  const [outputLines, setOutputLines] = useState<string[]>([]);
  const [showCursor, setShowCursor] = useState(true);

  const terminalCommand = "jack@about:~$ ./bio.sh";

  const bioParagraphs = [
    ">>> <span class='text-white'>Hey 👋, welcome to my profile.</span>\n  <span class='text-white'>I'm a senior at New York University and I was raised in Manhattan, NYC. I enjoy working out, traveling, and meeting new people.</span>\n",
    ">>> <span class='text-white'>I'm currently studying <span class='text-cyan-400'>Computer Science</span>, with career interests in <span class='text-purple-400'>software engineering, fintech, data analytics, and machine learning</span>.</span>\n  <span class='text-white'>I'm always eager to learn, and I'm excited to explore the future of <span class='text-orange-400'>blockchain, agentic AI, and other emerging tech</span>.</span>\n",
    ">>> <span class='text-white'>Some of my past projects include work in robotics, text-to-text models, and full-stack development.</span>\n  <span class='text-white'>I've also gained hands-on experience through two internships and two research assistant positions, where I helped to build technology-driven solutions.</span>\n"
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const section = document.querySelector(".biography-section");
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || commandText.length > 0) return;

    let i = 0;
    const typeCommand = () => {
      setCommandText((prev) => terminalCommand.slice(0, i + 1));
      i++;

      if (i < terminalCommand.length) {
        setTimeout(typeCommand, 50);
      } else {
        setTimeout(() => simulateLoading(), 500);
      }
    };

    typeCommand();
  }, [isVisible]);

  const simulateLoading = () => {
    const loadingStages = [
      "<span class='text-white'>[          ] 0%</span>",
      "<span class='text-white'>[###       ] 30%</span>",
      "<span class='text-white'>[#####     ] 50%</span>",
      "<span class='text-white'>[#######   ] 70%</span>",
      "<span class='text-white'>[##########] 100%</span>"
    ];

    let index = 0;
    const loadingInterval = setInterval(() => {
      setOutputLines([loadingStages[index]]);
      index++;

      if (index === loadingStages.length) {
        clearInterval(loadingInterval);
        setTimeout(() => displayBioParagraphs(), 1000);
      }
    }, 400);
  };

  const displayBioParagraphs = () => {
    let index = 0;
    const bioInterval = setInterval(() => {
      setOutputLines((prev) => [...prev, bioParagraphs[index]]);
      index++;

      if (index === bioParagraphs.length) {
        clearInterval(bioInterval);
        setShowCursor(false);
      }
    }, 1000);
  };

  return (
    <section className="biography-section relative h-screen flex flex-col justify-center items-center text-left px-6 pb-32">
      
      {/* Background gradient to blend with the page */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-100 via-gray-200 to-black"></div>

      {/* Terminal Window - Positioned to Always Stay on Top */}
      <div className="relative z-20 max-w-3xl w-full bg-gray-900 bg-opacity-90 rounded-lg shadow-lg border border-gray-700">
        
        {/* Terminal Header */}
        <div className="flex items-center px-4 py-2 bg-gray-800 border-b border-gray-700 text-gray-400 text-xs">
          <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
          <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
          <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
          <p className="font-mono text-blue-400">jack@about:~$</p>
        </div>

        {/* Terminal Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 1 }}
          className="p-4 text-white text-sm leading-relaxed whitespace-pre-line overflow-y-auto h-100"
          style={{ 
            fontFamily: '"Fira Code", "Source Code Pro", Menlo, Consolas, "Courier New", monospace',
            position: "relative",
            zIndex: 30,
          }}
        >
          <span className="text-blue-400">{commandText}</span>
          {showCursor && <span className="ml-1">█</span>} 
          <br />
          {outputLines.map((line, idx) => (
            <div key={idx} className="mb-3">
              <span dangerouslySetInnerHTML={{ __html: line }} />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Down Arrow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 1 }}
        className="absolute bottom-10 text-gray-500"
      >
        <motion.p
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-xl"
          style={{ fontFamily: "'IBM Plex Mono', monospace" }}
        >
          Interact with the Tesseract
        </motion.p>
      </motion.div>
    </section>
  );
};

export default Biography;