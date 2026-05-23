"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView, animate } from "framer-motion";
import {
  MapPin,
  Briefcase,
  Code2,
  Globe,
  Terminal,
  GitBranch,
  Layers,
  Cpu,
  FolderKanban,
  Calendar,
  Building2,
} from "lucide-react";
import { timeline } from "../data/userData";

/* ── animated counter ─────────────────────────────── */
const Counter = ({ to, suffix = "" }: { to: number; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const ctrl = animate(0, to, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (v) => setCount(Math.floor(v)),
    });
    return ctrl.stop;
  }, [inView, to]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
};

/* ── data ─────────────────────────────────────────── */
const ENRICHMENT: Record<
  string,
  {
    role: string;
    initials: string;
    gradient: string;
    color: string;
    chipBg: string;
    chipText: string;
    chipBorder: string;
  }
> = {
  "IMS Systems": {
    role: "Full Stack Developer",
    initials: "IMS",
    gradient: "from-blue-500 to-indigo-600",
    color: "text-blue-400",
    chipBg: "bg-blue-500/10",
    chipText: "text-blue-400",
    chipBorder: "border-blue-500/20",
  },
  Technovicinity: {
    role: "Full Stack Developer",
    initials: "TV",
    gradient: "from-purple-500 to-violet-600",
    color: "text-purple-400",
    chipBg: "bg-purple-500/10",
    chipText: "text-purple-400",
    chipBorder: "border-purple-500/20",
  },
  Freelance: {
    role: "Freelance Developer",
    initials: "FL",
    gradient: "from-emerald-500 to-teal-600",
    color: "text-emerald-400",
    chipBg: "bg-emerald-500/10",
    chipText: "text-emerald-400",
    chipBorder: "border-emerald-500/20",
  },
};

const STATS = [
  { icon: FolderKanban, value: 9, suffix: "+", label: "Projects" },
  { icon: Calendar,     value: 2,  suffix: "+", label: "Years Exp." },
  { icon: Building2,    value: 3,  suffix: "",  label: "Companies" },
  { icon: Layers,       value: 5,  suffix: "+", label: "Domains" },
];

const INTERESTS = [
  { icon: Code2,      label: "Full Stack" },
  { icon: Globe,      label: "Web3 / DeFi" },
  { icon: Terminal,   label: "Linux" },
  { icon: Cpu,        label: "Docker & K8s" },
  { icon: GitBranch,  label: "Open Source" },
  { icon: Layers,     label: "Microservices" },
  { icon: Briefcase,  label: "Clean Code" },
];

function formatDate(raw: string) {
  return raw
    .replace(/(\d{4}),([A-Za-z]+)/g, "$2 $1")
    .replace(" - ", " – ");
}

/* ── component ─────────────────────────────────────── */
const About = () => {
  return (
    <section id="about" className="w-full px-4 py-8 text-foreground space-y-10">

      {/* ── Profile card ──────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row items-center sm:items-start gap-5 max-w-2xl mx-auto"
      >
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 blur-xl opacity-30 scale-110" />
          <img
            src="/assets/me2.jpg"
            alt="Sayem Abedin"
            className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-2 border-primary/30 ring-2 ring-primary/20 shadow-xl"
          />
          {/* Online dot */}
          <span className="absolute bottom-0.5 right-0.5 z-20 w-4 h-4 rounded-full bg-green-400 border-2 border-background shadow" />
        </div>

        {/* Info */}
        <div className="text-center sm:text-left">
          <h2 className="text-2xl md:text-3xl font-bold">Md. Sayem Abedin</h2>
          <p className="text-primary font-semibold mt-0.5">Full Stack Developer</p>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 mt-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <MapPin size={13} className="text-red-400 flex-shrink-0" />
              Dhaka, Bangladesh
            </span>
            <span className="flex items-center gap-1.5">
              <Briefcase size={13} className="text-blue-400 flex-shrink-0" />
              Open to work
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 mt-3 px-3 py-1 rounded-full bg-green-400/10 border border-green-400/25 text-green-400 text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Available for new opportunities
          </div>
        </div>
      </motion.div>

      {/* ── Stats ─────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto"
      >
        {STATS.map(({ icon: Icon, value, suffix, label }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, scale: 0.88 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            className="flex flex-col items-center gap-1.5 py-5 px-3 rounded-2xl border border-border bg-background/60 backdrop-blur-sm hover:border-primary/25 hover:bg-accent/20 transition-all group"
          >
            <Icon size={17} className="text-primary group-hover:scale-110 transition-transform" />
            <span className="text-2xl font-black leading-none">
              <Counter to={value} suffix={suffix} />
            </span>
            <span className="text-[11px] text-muted-foreground font-medium text-center">{label}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* ── Bio ───────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed"
      >
        <p>
          I'm a{" "}
          <span className="text-foreground font-semibold">Full-Stack Developer</span>{" "}
          with{" "}
          <span className="text-foreground font-semibold">2+ years</span> of
          professional experience building production web applications — from
          polished React frontends to distributed Node.js backends with Docker
          and Kubernetes deployments on AWS.
        </p>
        <p>
          Beyond Web2, I design and ship{" "}
          <span className="text-primary font-semibold">
            gas-optimized smart contracts
          </span>{" "}
          on Ethereum, integrate wallets via Wagmi & WalletConnect, and deliver
          full DeFi dApps to production. I care deeply about{" "}
          <span className="text-foreground font-semibold">
            clean, maintainable code
          </span>{" "}
          and building things that solve real problems — not just demos.
        </p>
      </motion.div>

      {/* ── Interests ─────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto"
      >
        <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-3">
          Interests & Focus Areas
        </p>
        <div className="flex flex-wrap gap-2">
          {INTERESTS.map(({ icon: Icon, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              whileHover={{ y: -2, scale: 1.03 }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-muted text-sm text-foreground/80 font-medium hover:border-primary/30 hover:text-foreground transition-all cursor-default"
            >
              <Icon size={12} className="text-primary" />
              {label}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── Divider ───────────────────────────────── */}
      <div className="max-w-2xl mx-auto flex items-center gap-4">
        <div className="flex-1 h-px bg-border" />
        <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
          Experience
        </span>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* ── Timeline ──────────────────────────────── */}
      <div className="max-w-2xl mx-auto pb-10">
        {timeline.map((item, i) => {
          const e = ENRICHMENT[item.company] ?? {
            role: "Developer",
            initials: item.company.slice(0, 2).toUpperCase(),
            gradient: "from-gray-500 to-gray-600",
            color: "text-gray-400",
            chipBg: "bg-gray-500/10",
            chipText: "text-gray-400",
            chipBorder: "border-gray-500/20",
          };
          const isLast = i === timeline.length - 1;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex gap-4 group"
            >
              {/* Left: logo + connector */}
              <div className="flex flex-col items-center flex-shrink-0">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 3 }}
                  className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${e.gradient} flex items-center justify-center text-white text-[11px] font-black shadow-md select-none`}
                >
                  {e.initials}
                </motion.div>
                {!isLast && (
                  <div className="w-px flex-1 bg-gradient-to-b from-border to-transparent mt-3 min-h-[2rem]" />
                )}
              </div>

              {/* Right: card */}
              <div className={`flex-1 ${isLast ? "pb-0" : "pb-6"}`}>
                <div className="border border-border bg-background/60 backdrop-blur-sm rounded-2xl p-5 hover:border-primary/20 hover:bg-accent/10 transition-all duration-200 text-left">

                  {/* Header row */}
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <div>
                      <h4 className="text-base font-bold text-foreground leading-tight">
                        {item.company}
                      </h4>
                      <p className={`text-xs font-semibold ${e.color} mt-0.5`}>
                        {e.role}
                      </p>
                    </div>
                    <span className="text-[11px] font-mono text-muted-foreground bg-muted border border-border px-2.5 py-1 rounded-lg flex-shrink-0 leading-tight">
                      {formatDate(item.year)}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {item.detail}
                  </p>

                  {/* Tech chips */}
                  {item.tech && (
                    <div className="flex flex-wrap gap-1.5">
                      {item.tech.map((t, idx) => (
                        <span
                          key={idx}
                          className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${e.chipBg} ${e.chipText} border ${e.chipBorder}`}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

    </section>
  );
};

export default About;
