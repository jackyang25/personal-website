"use client";
import { motion } from "framer-motion";
import {
  SiPython, SiC, SiJavascript, SiKotlin, SiMysql, SiTypescript,
  SiGraphql, SiHtml5, SiCss3, SiGnubash, SiGit, SiPostman, SiPostgresql,
  SiGooglecloud, SiSwagger, SiReact, SiSpringboot, SiNodedotjs,
  SiExpress, SiRedis
} from "react-icons/si";
import { FaJava } from "react-icons/fa"; // Fixed missing Java icon

const skills = [
  { name: "Python", icon: <SiPython className="text-blue-500 text-5xl" /> },
  { name: "C", icon: <SiC className="text-blue-500 text-5xl" /> },
  { name: "Java", icon: <FaJava className="text-red-500 text-5xl" /> },
  { name: "Kotlin", icon: <SiKotlin className="text-purple-500 text-5xl" /> },
  { name: "SQL", icon: <SiMysql className="text-blue-500 text-5xl" /> },
  { name: "TypeScript", icon: <SiTypescript className="text-blue-500 text-5xl" /> },
  { name: "JavaScript", icon: <SiJavascript className="text-yellow-500 text-5xl" /> },
  { name: "GraphQL", icon: <SiGraphql className="text-pink-500 text-5xl" /> },
  { name: "HTML", icon: <SiHtml5 className="text-orange-500 text-5xl" /> },
  { name: "CSS", icon: <SiCss3 className="text-blue-500 text-5xl" /> },
  { name: "Shell", icon: <SiGnubash className="text-green-500 text-5xl" /> },
];

const tools = [
  { name: "Git", icon: <SiGit className="text-red-500 text-5xl" /> },
  { name: "Postman", icon: <SiPostman className="text-orange-500 text-5xl" /> },
  { name: "PostgreSQL", icon: <SiPostgresql className="text-blue-500 text-5xl" /> },
  { name: "BigQuery", icon: <SiGooglecloud className="text-blue-500 text-5xl" /> },
  { name: "REST APIs", icon: <SiSwagger className="text-green-500 text-5xl" /> },
  { name: "React", icon: <SiReact className="text-blue-500 text-5xl" /> },
  { name: "Spring Boot", icon: <SiSpringboot className="text-green-500 text-5xl" /> },
  { name: "Node.js", icon: <SiNodedotjs className="text-green-500 text-5xl" /> },
  { name: "Express.js", icon: <SiExpress className="text-gray-500 text-5xl" /> },
  { name: "Redis", icon: <SiRedis className="text-red-500 text-5xl" /> },
];

const Skills = () => {
  return (
    <section className="bg-black text-white py-20 flex flex-col items-center">
      <div className="w-full max-w-4xl">
        <h2 className="text-4xl font-bold mb-6">Languages</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center p-4 bg-gray-900 rounded-xl shadow-lg cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.1, transition: { type: "spring", stiffness: 200, damping: 10 } }}
              whileTap={{ scale: 1.05, transition: { type: "spring", stiffness: 200, damping: 10 } }}
            >
              {skill.icon}
              <p className="mt-2 text-lg font-semibold">{skill.name}</p>
            </motion.div>
          ))}
        </div>

        <h2 className="text-4xl font-bold mt-12 mb-6">Development Tools</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {tools.map((tool, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center p-4 bg-gray-900 rounded-xl shadow-lg cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.1, transition: { type: "spring", stiffness: 200, damping: 10 } }}
              whileTap={{ scale: 1.05, transition: { type: "spring", stiffness: 200, damping: 10 } }}
            >
              {tool.icon}
              <p className="mt-2 text-lg font-semibold">{tool.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
