"use client";
import { motion } from "framer-motion";

const categories = [
  {
    label: "Languages",
    skills: [
      "Python",
      "JavaScript",
      "TypeScript",
      "Java",
      "C",
      "Kotlin",
      "SQL",
      "Bash",
      "HTML/CSS",
      "XML",
    ],
  },
  {
    label: "Libraries & Frameworks",
    skills: [
      "TensorFlow",
      "PyTorch",
      "scikit-learn",
      "NumPy",
      "Pandas",
      "React",
      "Next.js",
      "JUnit",
    ],
  },
  {
    label: "Databases & Tools",
    skills: [
      "PostgreSQL",
      "MongoDB",
      "BigQuery",
      "Pinecone",
      "Neo4j",
      "Redis",
      "Git",
      "Postman",
      "Jira",
    ],
  },
  {
    label: "Infrastructure & Cloud",
    skills: ["Amazon Web Services (AWS)", "Docker", "Linux", "n8n", "OpenMPI"],
  },
];

const Skills = () => {
  return (
    <section className="bg-black text-white py-24 flex flex-col items-center px-4">
      <motion.h2
        className="text-5xl mb-16 tracking-tight text-center"
        style={{ fontFamily: "'Playfair Display', serif" }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Stack
      </motion.h2>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-12 max-w-5xl w-full">
        {categories.map((category, i) => (
          <motion.div
            key={category.label}
            className="p-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-3">{category.label}</h3>

            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <div
                  key={skill}
                  className="px-3 py-1 rounded-md text-sm border border-white/30 hover:bg-white hover:text-black transition"
                >
                  {skill}
                </div>
              ))}
            </div>

            {/* Clean horizontal separator */}
            <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;