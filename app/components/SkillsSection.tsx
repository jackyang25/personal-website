"use client";
import { motion } from "framer-motion";

const categories = [
  {
    label: "Languages",
    skills: ["Python", "TypeScript", "JavaScript", "Kotlin", "C"],
  },
  {
    label: "Frameworks",
    skills: ["React", "Next.js", "Node.js", "TailwindCSS", "TensorFlow"],
  },
  {
    label: "Data Science",
    skills: ["scikit-learn", "Pandas", "NumPy", "SQL", "BigQuery"],
  },
  {
    label: "Other",
    skills: ["Git", "Linux", "Postman", "Pinecone", "OpenMPI"],
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl w-full">
        {categories.map((category, i) => (
          <motion.div
            key={category.label}
            className="border border-white p-4 rounded-lg bg-black/20 backdrop-blur-sm"
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
                  className="px-3 py-1 border border-white rounded-md text-sm hover:bg-white hover:text-black transition"
                >
                  {skill}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;