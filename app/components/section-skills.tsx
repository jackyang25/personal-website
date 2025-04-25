"use client";
import { motion } from "framer-motion";
import {
  SiPython, SiJavascript, SiC, SiKotlin, SiTypescript, SiMysql,
  SiTensorflow, SiScikitlearn, SiNumpy,
  SiGit, SiPostman, SiReact, SiNodedotjs, SiNextdotjs, SiGnubash
} from "react-icons/si";
import { FaDatabase, FaSeedling } from "react-icons/fa";

const languages = [
  { name: "Python", icon: <SiPython className="text-blue-500 text-4xl" /> },
  { name: "JavaScript", icon: <SiJavascript className="text-yellow-500 text-4xl" /> },
  { name: "C", icon: <SiC className="text-blue-500 text-4xl" /> },
  { name: "Kotlin", icon: <SiKotlin className="text-purple-500 text-4xl" /> },
  { name: "TypeScript", icon: <SiTypescript className="text-blue-500 text-4xl" /> },
  { name: "SQL", icon: <SiMysql className="text-blue-500 text-4xl" /> },
];

const developmentTools = [
  { name: "Git", icon: <SiGit className="text-red-500 text-4xl" /> },
  { name: "Postman", icon: <SiPostman className="text-orange-500 text-4xl" /> },
  { name: "Next.js", icon: <SiNextdotjs className="text-white text-4xl" /> },
  { name: "Node.js", icon: <SiNodedotjs className="text-green-500 text-4xl" /> },
  { name: "React", icon: <SiReact className="text-blue-500 text-4xl" /> },
  { name: "Linux", icon: <SiGnubash className="text-green-500 text-4xl" /> },
];

const machineLearning = [
  { name: "TensorFlow", icon: <SiTensorflow className="text-orange-500 text-4xl" /> },
  { name: "Scikit-Learn", icon: <SiScikitlearn className="text-yellow-500 text-4xl" /> },
  { name: "NumPy", icon: <SiNumpy className="text-blue-500 text-4xl" /> },
  { name: "Pandas", icon: <FaDatabase className="text-purple-500 text-4xl" /> },
  { name: "Pinecone", icon: <FaSeedling className="text-green-400 text-4xl" /> },
];

const Skills = () => {
  return (
    <section className="bg-black text-white py-24 flex flex-col items-center">
      <div className="w-full max-w-5xl">

        {/* Section Header */}
        <motion.h2
          className="text-5xl mb-12 tracking-tight text-center"
          style={{ fontFamily: "'Playfair Display', serif" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, amount: 0.4 }}
        >
          Programming Languages
        </motion.h2>

        <div className="flex flex-wrap justify-center gap-14">
          {languages.map((skill, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center transition-transform hover:-translate-y-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: false, amount: 0.2 }}
            >
              {skill.icon}
              <p className="mt-3 text-base font-semibold">{skill.name}</p>
            </motion.div>
          ))}
        </div>

        {/* Section Header */}
        <motion.h2
          className="text-5xl mt-24 mb-12 tracking-tight text-center"
          style={{ fontFamily: "'Playfair Display', serif" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, amount: 0.4 }}
        >
          Development
        </motion.h2>

        <div className="flex flex-wrap justify-center gap-14">
          {developmentTools.map((tool, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center transition-transform hover:-translate-y-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: false, amount: 0.2 }}
            >
              {tool.icon}
              <p className="mt-3 text-base font-semibold">{tool.name}</p>
            </motion.div>
          ))}
        </div>

        {/* Section Header */}
        <motion.h2
          className="text-5xl mt-24 mb-12 tracking-tight text-center"
          style={{ fontFamily: "'Playfair Display', serif" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, amount: 0.4 }}
        >
          Machine Learning
        </motion.h2>

        <div className="flex flex-wrap justify-center gap-14">
          {machineLearning.map((ml, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center transition-transform hover:-translate-y-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: false, amount: 0.2 }}
            >
              {ml.icon}
              <p className="mt-3 text-base font-semibold">{ml.name}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Skills;