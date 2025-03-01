"use client";
import { motion } from "framer-motion";

const WorkExperience = () => {
  return (
    <section className="py-16 bg-gray-100 flex flex-col items-center px-6">
      {/* Title */}
      <h2 className="text-4xl font-bold text-gray-900 mb-10">Recent work and experiments</h2>

      {/* Apple Experience - Large Card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-6 mb-10"
      >
        <h3 className="text-xl font-bold">Apple</h3>
        <p className="text-gray-600">2022 – Present</p>
        <p className="font-semibold mt-2">Senior Front End Developer</p>
        <p className="text-gray-700 mt-2">
          I collaborate closely with design teams to develop prototypes, tooling, and interactive web experiences in order to tell the story of the products and services that live on Apple.com.
        </p>
      </motion.div>

      {/* Two Side-by-Side Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl w-full">
        {/* Green Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-green-200 p-6 rounded-2xl shadow-md"
        >
          <h3 className="text-xl font-bold">💎 Sandbox</h3>
          <p className="text-gray-600">2021</p>
          <p className="text-gray-700 mt-2">
            A minimal WebGL library and 3D engine created to learn the essentials of computer graphics concepts.
          </p>
          <button className="mt-4 bg-black text-white px-4 py-2 rounded-lg">View on GitHub</button>
        </motion.div>

        {/* Blue Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-blue-200 p-6 rounded-2xl shadow-md"
        >
          <h3 className="text-xl font-bold">✏️ Director</h3>
          <p className="text-gray-600">2021</p>
          <p className="text-gray-700 mt-2">
            A custom animation library created as a learning experience to understand animation and power future projects.
          </p>
          <button className="mt-4 bg-black text-white px-4 py-2 rounded-lg">View on GitHub</button>
        </motion.div>
      </div>

      {/* Black Card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        viewport={{ once: true }}
        className="bg-black text-white p-6 rounded-2xl shadow-md max-w-3xl w-full mt-10"
      >
        <h3 className="text-xl font-bold">anotherdei.com</h3>
        <p className="text-gray-600">2021</p>
        <p className="mt-2">
          I designed and developed the personal portfolio website for Danielle Toledo, earning AWWWARDS recognition.
        </p>
        <button className="mt-4 bg-gray-700 text-white px-4 py-2 rounded-lg">Visit anotherdei.com</button>
      </motion.div>
    </section>
  );
};

export default WorkExperience;
