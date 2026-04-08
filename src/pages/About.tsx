"use client";

import { motion } from "framer-motion";
import { facts, timeline } from "../data/userData";

const About = () => {
  return (
    <section
      id="about"
      className="w-full px-4 backdrop-blur-sm rounded-xl p-6 sm:p-8 text-foreground"
    >
      {/* Section Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold mb-4 text-center decoration-blue-500"
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
        Full-Stack Developer with
        <span className="text-primary font-bold"> 2 years </span> of experience
        engineering solutions that push the boundaries of what's possible on the
        web.
        <br />
        <br />
        My technical journey spans the full spectrum of development. I build
        sleek, interactive front-ends with React/Next and power them with
        rock-solid Node.js backends. But my expertise doesn't stop at Web2. I
        have a profound understanding of blockchain architecture, allowing me to
        develop secure, gas-optimized smart contracts and integrate them into
        full-scale Web3 dApps. Whether I'm designing complex database schemas or
        deploying decentralized assets, my goal is always the same: build{" "}
        <span className="text-primary font-bold">practical, powerful </span>
        solutions for real-world problems.
      </motion.p>

      {/* Facts */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="flex flex-wrap max-w-2xl mx-auto justify-center gap-3 mb-16"
      >
        {facts.map((fact, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05, y: -2 }}
            className="px-4 py-2 rounded-lg bg-white/5 shadow-sm hover:shadow-blue-500/20 text-sm md:text-base font-medium border border-white/10 transition-all"
          >
            {fact}
          </motion.div>
        ))}
      </motion.div>

      {/* Timeline Section */}
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold mb-12 text-center"
      >
        My Coding Odyssey
      </motion.h3>

      {/* The New Readable Timeline */}
      <div className="max-w-3xl mx-auto pb-16 px-4">
        <div className="relative border-l-2 border-transparent [border-image:linear-gradient(to_bottom,#3b82f6,#8b5cf6,transparent)1]">
          {timeline.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="relative pl-8 md:pl-10 mb-12 group"
            >
              {/* Glowing Node on the line */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-background border-2 border-blue-500 group-hover:bg-blue-500 group-hover:shadow-[0_0_12px_rgba(59,130,246,0.8)] transition-all duration-300 z-10" />

              {/* Content Card */}
              <div className="bg-white/5 border border-white/10 backdrop-blur-md p-6 rounded-xl hover:bg-white/10 transition-colors shadow-sm hover:shadow-md">
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-3">
                  <h4 className="text-xl md:text-2xl font-bold text-foreground">
                    {item.company}
                  </h4>
                  <span className="text-sm md:text-base font-mono text-blue-400 mt-1 md:mt-0 opacity-80">
                    {item.year}
                  </span>
                </div>

                <p className="text-muted-foreground text-base leading-relaxed mb-5">
                  {item.detail}
                </p>

                {/* Tech Stack Pills */}
                {item.tech && (
                  <div className="flex flex-wrap gap-2">
                    {item.tech.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
