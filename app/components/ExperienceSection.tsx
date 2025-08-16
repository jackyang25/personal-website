"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const experiences = [
  {
    title: "Software Engineer",
    company: "Pulp",
    date: "Apr 2025 – Present",
    logo: "/logos/pulp.svg",
    description:
      "Currently working on full-stack development projects for agentic AI startup",
  },
  {
    title: "Software Engineering Intern",
    company: "Angi",
    date: "Jun 2024 – Aug 2024",
    logo: "/logos/angi.png",
    description:
      "Deployed changes into production across multiple microservices, implementing project involving Angi’s content management system to serve dynamic content for landing pages in the services taxonomy",
  },
  {
    title: "Research Assistant",
    company: "New York University Abu Dhabi",
    date: "Aug 2023 - Jan 2024",
    logo: "/logos/nyu.png",
    description:
      "Conducted machine learning experiments in natural language processing, focusing on long short-term memory (LSTM) networks for sociopolitical classification",
  },
  {
    title: "Software Engineering Intern",
    company: "Dotdash Meredith",
    date: "Jun 2023 - Aug 2023",
    logo: "/logos/ddm.png",
    description:
      "Improved the user experience of brands that receive over 200 million visits per month while contributing to product engineering and business intelligence R&D",
  },
  {
    title: "IAC Fellow",
    company: "InterActiveCorp (IAC)",
    date: "Jun 2023 - Aug 2023",
    logo: "/logos/iacwhite.png",
    description:
      "Participated in selective career accelerator focused on professional networking, pitching, personal branding, mentorship, and individual and group workshops with members of the C-suite",
  },
  {
    title: "Software Team Lead",
    company: "NYU Flexible AI-Enabled Mechatronic Systems Lab",
    date: "Jul 2022 - Jun 2023",
    logo: "/logos/fam.png",
    description: "Developed embedded applications and computer vision algorithms for robots using OpenCV, NVIDIA Jetson, YOLO, and Linux",
  },
];

const Timeline = () => {
  return (
    <section className="relative overflow-hidden py-24 bg-black text-white flex flex-col items-center px-6">
      <motion.h2
        className="text-5xl mb-16 tracking-tight text-white text-center"
        style={{ fontFamily: "'Playfair Display', serif" }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: false, amount: 0.4 }}
      >
        Experience
      </motion.h2>

      <div className="relative w-full max-w-5xl">
        {/* Timeline Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-white/10 h-full"></div>

        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
            viewport={{ once: false, amount: 0.2 }}
            className="relative flex w-full items-center mb-16"
          >
            {index % 2 === 0 ? (
              <>
                {/* Left Side */}
                <div className="w-1/2 flex justify-end pr-8">
                  <div className="p-2 w-fit max-w-sm text-right transition-transform hover:-translate-y-2 duration-300">
                    <h3 className="text-lg font-medium text-white/90">
                      {exp.company}
                    </h3>
                    <p className="text-sm text-white/60">{exp.date}</p>
                    <p className="mt-2 text-base font-semibold text-white">
                      {exp.title}
                    </p>
                    {exp.description && (
                      <p className="mt-2 text-sm text-white/70">
                        {exp.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Logo in Center */}
                <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center absolute left-1/2 transform -translate-x-1/2 p-1">
                  <Image
                    src={exp.logo}
                    alt={`${exp.company} logo`}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                </div>

                <div className="w-1/2" />
              </>
            ) : (
              <>
                <div className="w-1/2" />

                {/* Logo in Center */}
                <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center absolute left-1/2 transform -translate-x-1/2 p-1">
                  <Image
                    src={exp.logo}
                    alt={`${exp.company} logo`}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                </div>

                {/* Right Side */}
                <div className="w-1/2 flex justify-start pl-8">
                  <div className="p-2 w-fit max-w-sm text-left transition-transform hover:-translate-y-2 duration-300">
                    <h3 className="text-lg font-medium text-white/90">
                      {exp.company}
                    </h3>
                    <p className="text-sm text-white/60">{exp.date}</p>
                    <p className="mt-2 text-base font-semibold text-white">
                      {exp.title}
                    </p>
                    {exp.description && (
                      <p className="mt-2 text-sm text-white/70">
                        {exp.description}
                      </p>
                    )}
                  </div>
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
