"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const FooterSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <footer
      ref={ref}
      className="h-60 flex flex-col items-center justify-center text-center bg-gradient-to-b from-black to-gray-800 text-white relative overflow-hidden px-4"
    >
      <motion.div style={{ opacity }} className="w-full">
        <h2 className="text-2xl font-semibold">Let's Connect</h2>
        <p className="text-gray-400 mt-2">Feel free to reach out on any platform.</p>
        <div className="flex gap-6 mt-4 justify-center">
          <a
            href="https://www.linkedin.com/in/jackyang25/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition"
          >
            LinkedIn
          </a>
          <a
            href="mailto:jy3784@nyu.edu"
            className="text-gray-300 hover:text-white transition"
          >
            Email
          </a>
          <a
            href="https://github.com/jackyang25"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition"
          >
            GitHub
          </a>
          {/* <a
            href="https://leetcode.com/u/wigglyworm123/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition"
          >
            LeetCode
          </a> */}
          <a
            href="https://www.instagram.com/flyingraccoon123/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition"
          >
            Instagram
          </a>
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-gray-500 text-sm mt-6"
      >
        © {new Date().getFullYear()} Big Money Capital. All Rights Reserved.
      </motion.p>
    </footer>
  );
};

export default FooterSection;
