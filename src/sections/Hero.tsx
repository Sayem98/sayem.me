import { Github, Linkedin, Mail, MapPin, ExternalLink } from "lucide-react";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-[calc(100dvh-10rem)] mt-6 md:mt-0 w-full flex flex-col-reverse lg:flex-row items-center justify-center px-6 lg:px-12 gap-10 overflow-hidden"
    >
      {/* Left Section */}
      <div className="text-center lg:text-left max-w-2xl space-y-5">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight text-gray-800 dark:text-gray-100"
        >
          Hey{" "}
          <span className="inline-block animate-wave origin-[70%_70%]">👋</span>
          , I'm{" "}
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Md. Sayem Abedin
          </span>
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-lg md:text-2xl text-muted-foreground font-medium"
        >
          <TypeAnimation
            sequence={[
              "Full Stack Developer",
              2000,
              "Web3 & dApp Builder",
              2000,
              "Linux Enthusiast",
              2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex items-center justify-center lg:justify-start text-muted-foreground text-sm md:text-base"
        >
          <MapPin className="h-4 w-4 mr-1.5 text-primary flex-shrink-0" />
          Based in Dhaka, Bangladesh · 2+ years experience
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex justify-center lg:justify-start gap-4 pt-1"
        >
          <a
            href="https://github.com/Sayem98"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
            className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200"
          >
            <Github size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/sayem-abedin/"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn"
            className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="mailto:sayemabedin.bd@gmail.com"
            title="Email"
            className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200"
          >
            <Mail size={20} />
          </a>
          <a
            href="https://www.upwork.com/freelancers/~01ed29c46ac701c056"
            target="_blank"
            rel="noopener noreferrer"
            title="Upwork"
            className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200"
          >
            <ExternalLink size={20} />
          </a>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="flex flex-wrap justify-center lg:justify-start gap-3 pt-2"
        >
          <button
            onClick={() => navigate("/projects")}
            className="px-6 py-2.5 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-all duration-200 shadow-md hover:shadow-primary/30 hover:shadow-lg"
          >
            View My Work
          </button>
          <button
            onClick={() => navigate("/contact")}
            className="px-6 py-2.5 rounded-xl border border-border text-foreground font-semibold text-sm hover:bg-accent transition-all duration-200"
          >
            Get in Touch
          </button>
        </motion.div>
      </div>

      {/* Avatar */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="relative flex justify-center flex-shrink-0"
      >
        {/* Glow ring */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 blur-xl opacity-30 scale-110" />
        <img
          src="/assets/me2.jpg"
          alt="Sayem Abedin"
          className="relative z-10 w-52 h-52 md:w-64 md:h-64 rounded-full border-4 border-white/20 shadow-xl object-cover ring-2 ring-primary/40"
        />
        {/* Available badge */}
        <div className="absolute bottom-3 right-3 z-20 flex items-center gap-1.5 px-2.5 py-1 bg-white dark:bg-gray-900 rounded-full shadow-md border border-border text-xs font-medium">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Available
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Hero;
