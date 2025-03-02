"use client";
import { motion } from "framer-motion";
import { FaGlobe, FaMoon } from "react-icons/fa"; // Earth & Moon
import { GiRingedPlanet, GiJupiter, GiUfo } from "react-icons/gi"; // Saturn, Jupiter, UFO

const experiences = [
  {
    title: "Software Engineer - Internship",
    company: "Angi",
    date: "Jun 2024 – Aug 2024",
    description: "Developed full-stack systems and implemented APIs to help integrate the content management system.",
    icon: <FaGlobe className="text-white text-lg" />, // Earth Icon
  },
  {
    title: "Research Assistant",
    company: "New York University Abu Dhabi",
    date: "Aug 2023 - Jan 2024",
    description: "Developed an automated regression and classification program to accelerate research in Natural Language Processing using LSTM networks. Optimized data cleaning, training settings, and preprocessing for large-scale datasets.",
    icon: <GiRingedPlanet className="text-white text-lg" />, // Saturn Icon
  },
  {
    title: "Software Engineer - Internship",
    company: "Dotdash Meredith",
    date: "Jun 2023 - Aug 2023",
    description: "Optimized high-traffic pages for 200 million annual visitors while contributing to product development and machine learning R&D.",
    icon: <FaMoon className="text-white text-lg" />, // Moon Icon
  },
  {
    title: "Fellow - Philanthropy",
    company: "IAC",
    date: "Jun 2023 - Aug 2023",
    description: "Secured $35,000 in funding for non-profit organizations by developing a strategic grant proposal and pitch deck.",
    icon: <GiJupiter className="text-white text-lg" />, // Jupiter Icon
  },
  {
    title: "Team Lead",
    company: "Flexible AI-Enabled Mechatronic Systems Lab (FAMS)",
    date: "Jul 2022 - Jun 2023",
    description: "Integrated OpenCV, CUDA, and NVIDIA Jetson for embedded systems. Developed computer vision models to enable robotic movement through visual perception.",
    icon: <GiUfo className="text-white text-lg" />, // UFO Icon
  },
];

const Timeline = () => {
  return (
    <section className="py-2 bg-black text-white flex flex-col items-center px-6">
      <h2 className="text-4xl font-bold text-white mb-10">Experience</h2>

      <div className="relative w-full max-w-4xl">
        {/* Timeline Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gray-500 h-full"></div>

        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
            viewport={{ once: true }}
            className="relative flex w-full items-center mb-6"
          >
            {/* Left Side */}
            {index % 2 === 0 ? (
              <>
                <div className="w-1/2 flex justify-end pr-6">
                  <motion.div className="bg-gray-900 p-5 rounded-2xl shadow-lg w-[420px] transition-all duration-300">
                    <h3 className="text-xl font-bold">{exp.company}</h3>
                    <p className="text-gray-400">{exp.date}</p>
                    <p className="font-semibold mt-2">{exp.title}</p>
                    <p className="text-gray-300 mt-2">{exp.description}</p>
                  </motion.div>
                </div>
                {/* Planet Icons with Glow */}
                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center absolute left-1/2 transform -translate-x-1/2 shadow-[0_0_15px_3px_rgba(0,150,255,0.7)]">
                  {exp.icon}
                </div>
                <div className="w-1/2"></div>
              </>
            ) : (
              /* Right Side */
              <>
                <div className="w-1/2"></div>
                {/* Planet Icons with Glow */}
                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center absolute left-1/2 transform -translate-x-1/2 shadow-[0_0_15px_3px_rgba(0,150,255,0.7)]">
                  {exp.icon}
                </div>
                <div className="w-1/2 flex justify-start pl-8">
                  <motion.div className="bg-gray-900 p-5 rounded-2xl shadow-lg w-[420px] transition-all duration-300">
                    <h3 className="text-xl font-bold">{exp.company}</h3>
                    <p className="text-gray-400">{exp.date}</p>
                    <p className="font-semibold mt-2">{exp.title}</p>
                    <p className="text-gray-300 mt-2">{exp.description}</p>
                  </motion.div>
                </div>
              </>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Timeline;
