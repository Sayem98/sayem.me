"use client";

import { motion } from "framer-motion";
import { facts, timeline } from "../data/userData";

const About = () => {
  return (
    <section
      id="about"
      className="w-full px-4 backdrop-blur-sm rounded-xl p-6 sm:p-8 text-center text-foreground"
    >
      {/* Section Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold mb-4 decoration-blue-500"
      >
        Who Am I
      </motion.h2>

      {/* Intro Paragraph */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="text-lg md:text-xl text-center text-muted-foreground max-w-3xl mx-auto mb-8"
      >
        I'm <span className="text-primary font-bold">Md. Sayem Abedin</span>, a
        passionate smart contract and full-stack dapp developer with{" "}
        <span className="text-primary font-bold">3 years</span> of hands-on
        experience turning ideas into digital reality.
        <br />
        <br />
        My journey in tech has been an exciting adventure - from gas efficient,
        secure smart contract to crafting robust backend systems with Node.js to
        creating sleek frontend interfaces with React. I don't just write code,
        I build solutions that{" "}
        <span className="italic">solve real problems</span>.
        <br />
        <br />
        What excites me most? That moment when complex systems click into place.
        I thrive on the challenge of learning new technologies and pushing the
        boundaries of what I can create. The tech world evolves fast, and I'm
        running right alongside it!
      </motion.p>

      {/* Facts */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="flex flex-wrap max-w-2xl mx-auto justify-center gap-2 mb-8"
      >
        {facts.map((fact, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="px-4 py-2 rounded-lg bg-white/30 dark:bg-white/5 shadow-xs text-sm md:text-base font-medium border border-gray-400 dark:border-gray-600 text-foreground"
          >
            {fact}
          </motion.div>
        ))}
      </motion.div>

      {/* Timeline */}
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-2xl md:text-3xl font-bold mb-12"
      >
        My Coding Odyssey
      </motion.h3>

      <div className="relative max-w-4xl mx-auto pb-16">
        {/* Desktop: Wavy timeline path */}
        {/* <svg
          className="hidden md:block absolute left-1/2 top-0 w-1 -translate-x-1/2"
          style={{ height: `${timeline.length * 260}px` }}
          viewBox="0 0 2 100"
          preserveAspectRatio="none"
        >
          <path
            d="M1 0 V20 C1 30, 0 35, 1 45 S0 60, 1 70 S0 85, 1 100"
            stroke="url(#timelineGradient)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient
              id="timelineGradient"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
        </svg> */}

        {timeline.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
            className={`relative flex ${
              i % 2 === 0 ? "justify-start" : "justify-end"
            } mb-16`}
            style={{ zIndex: timeline.length - i }}
          >
            {/* Mobile: Simple layout (no dot) */}
            {/* Desktop: Timeline dot with glow */}
            <motion.div
              className="hidden md:block absolute left-1/2 top-4 w-5 h-5 rounded-full bg-white border-4 border-blue-500 z-10 shadow-lg shadow-blue-500/30 -translate-x-1/2"
              whileHover={{ scale: 1.1 }}
            />

            {/* Card - full width on mobile, floating on desktop */}
            <motion.div
              className={`w-full md:max-w-md p-5 md:p-6 rounded-xl md:rounded-2xl backdrop-blur-lg bg-white/5 border border-white/10 shadow-sm md:shadow-lg ${
                i % 2 === 0 ? "md:mr-8" : "md:ml-8"
              }`}
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.2)",
              }}
            >
              <div className="flex items-center gap-3 mb-2 md:mb-3">
                <div
                  className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center ${
                    i % 2 === 0 ? "bg-blue-500" : "bg-purple-500"
                  }`}
                >
                  <span className="text-white font-bold text-sm md:text-base">
                    {i + 1}
                  </span>
                </div>
                <div className="text-primary font-bold text-base md:text-lg">
                  {item.year}
                </div>
              </div>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                {item.detail}
              </p>
              {item.tech && (
                <div className="flex flex-wrap gap-1.5 md:gap-2 mt-3 md:mt-4">
                  {item.tech.map((t, idx) => (
                    <motion.span
                      key={idx}
                      className="px-2.5 py-0.5 text-[10px] md:text-xs rounded-full bg-blue-500/10 text-blue-500"
                      whileHover={{ scale: 1.05 }}
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default About;
