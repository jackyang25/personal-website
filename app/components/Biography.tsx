"use client";
import { motion } from "framer-motion";

const Biography = () => {
  return (
    <section className="py-16 bg-black text-white flex flex-col items-center px-6">
      {/* Title */}
      <h2 className="text-4xl font-bold text-white mb-10">About Me</h2>

      {/* Personal Info */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="w-full max-w-3xl bg-gray-800 shadow-lg rounded-2xl p-6 mb-10"
      >
        <h3 className="text-xl font-bold">New York University</h3>
        <p className="text-gray-400">September 2021 - May 2025</p>
        <p className="font-semibold mt-2">College of Arts and Sciences | Computer Science</p>
        <p className="text-gray-300 mt-2">
          Hey, I'm Jack. I was born in New York City, and raised in lower east side, Manhattan. I enjoy photography, watching sports, traveling to new places, and meeting new people.
          My career interests include software engineering, data analytics, fintech, and machine learning.
          I also have an interest in finance and algorithmic problem-solving, and I’m excited to learn more about blockchain, AI, and the future of tech. 
          Please feel free to connect with me!
        </p>
      </motion.div>

      {/* Experience Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="w-full max-w-3xl bg-gray-800 shadow-lg rounded-2xl p-6 mb-10"
      >
        <h3 className="text-xl font-bold">Angi</h3>
        <p className="text-gray-400">Jun 2024 – August 2024</p>
        <p className="font-semibold mt-2">Software Engineer</p>
        <p className="text-gray-300 mt-2">
          Over the summer, I was on the engineering team at Angi, where i devloped systems on fullstack level and implement apis to help ingreate the contenment mangaement system. 
        </p>
      </motion.div>

      {/* Project Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-gray-700 p-6 rounded-2xl shadow-md"
        >
          <h3 className="text-xl font-bold">IAC</h3>
          <p className="text-gray-400">2021</p>
          <p className="text-gray-300 mt-2">
            A minimal WebGL library and 3D engine created to learn the essentials of computer graphics concepts.
          </p>
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg">View on GitHub</button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-gray-700 p-6 rounded-2xl shadow-md"
        >
          <h3 className="text-xl font-bold">✏️ Director</h3>
          <p className="text-gray-400">2021</p>
          <p className="text-gray-300 mt-2">
            A custom animation library created as a learning experience to understand animation and power future projects.
          </p>
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg">View on GitHub</button>
        </motion.div>
      </div>

      {/* Contact Info */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        viewport={{ once: true }}
        className="w-full max-w-3xl bg-gray-800 shadow-lg rounded-2xl p-6 mt-10"
      >
        <h3 className="text-xl font-bold">Contact</h3>
        <p className="text-gray-300 mt-2">Email: jy3674@nyu.edu</p>
        <p className="text-gray-300 mt-2">LeetCode Profile | GitHub Profile</p>
      </motion.div>
    </section>
  );
};

export default Biography;
