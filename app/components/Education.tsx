import React from "react";

const coursework = [
  "Parallel Programming",
  "Data Science for Business",
  "Basic Algorithms",
  "Data Management and Analysis",
  "Operating Systems",
  "Software Engineering",
  "Natural Language Processing",
  "Computer Systems Organization",
  "Data Structures and Algorithms",
];

const EducationSection = () => {
  return (
    <section
      id="education"
      className="relative py-16 px-6 text-white"
      style={{
        background: "linear-gradient(to bottom, black, #121212, #2a2a2a, #121212, black)",
        fontFamily: "'IBM Plex Mono', monospace",
      }}
    >
      <div className="container mx-auto max-w-5xl text-center">
        <h2 className="text-4xl font-extrabold text-green-400 drop-shadow-lg">
          Education
        </h2>

        {/* University Info */}
        <div className="mt-8 p-6 bg-white/10 backdrop-blur-md rounded-lg shadow-lg border border-white/20">
          <h3 className="text-2xl font-semibold text-green-300">New York University (NYU)</h3>
          <p className="text-lg text-gray-300">Class of 2025 • B.S. in Computer Science</p>
        </div>

        {/* Coursework Grid */}
        <h4 className="mt-10 text-xl font-semibold text-green-400">Relevant Coursework</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          {coursework.map((course, index) => (
            <div
              key={index}
              className="p-4 rounded-lg border border-green-400 bg-white/10 backdrop-blur-md shadow-lg transition-transform transform hover:scale-105 hover:bg-green-900/20"
            >
              <p className="text-lg font-medium text-green-300">{course}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
