import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code,
  Server,
  Database,
  Paintbrush,
  GitBranch,
  Globe,
  Cpu,
  Link2Icon,
  Languages,
  Layers,
  ArrowLeft,
} from "lucide-react";

type CategoryKey = "Frontend" | "Backend" | "Database" | "DevOps" | "Web3";

interface Skill {
  name: string;
  icon: React.ElementType;
  level: 1 | 2 | 3 | 4 | 5;
}

interface Category {
  key: CategoryKey;
  label: string;
  icon: React.ElementType;
  color: string;
  glow: string;
  gradient: string;
  border: string;
  bar: string;
  skills: Skill[];
}

const LEVEL_LABELS: Record<number, string> = {
  1: "Learning",
  2: "Familiar",
  3: "Proficient",
  4: "Advanced",
  5: "Expert",
};

const categories: Category[] = [
  {
    key: "Frontend",
    label: "Frontend",
    icon: Code,
    color: "text-blue-400",
    glow: "hover:shadow-blue-500/20 hover:border-blue-500/40",
    gradient: "from-blue-500/10 via-indigo-500/5 to-transparent",
    border: "border-blue-500/20",
    bar: "bg-blue-400",
    skills: [
      { name: "React", icon: Code, level: 5 },
      { name: "Next.js", icon: Link2Icon, level: 5 },
      { name: "TypeScript", icon: Languages, level: 4 },
      { name: "JavaScript", icon: Languages, level: 5 },
      { name: "Tailwind CSS", icon: Paintbrush, level: 5 },
    ],
  },
  {
    key: "Backend",
    label: "Backend",
    icon: Server,
    color: "text-emerald-400",
    glow: "hover:shadow-emerald-500/20 hover:border-emerald-500/40",
    gradient: "from-emerald-500/10 via-green-500/5 to-transparent",
    border: "border-emerald-500/20",
    bar: "bg-emerald-400",
    skills: [
      { name: "Node.js", icon: Server, level: 5 },
      { name: "Express.js", icon: Server, level: 5 },
      { name: "GraphQL", icon: Code, level: 3 },
      { name: "REST APIs", icon: Globe, level: 5 },
    ],
  },
  {
    key: "Database",
    label: "Database",
    icon: Database,
    color: "text-orange-400",
    glow: "hover:shadow-orange-500/20 hover:border-orange-500/40",
    gradient: "from-orange-500/10 via-amber-500/5 to-transparent",
    border: "border-orange-500/20",
    bar: "bg-orange-400",
    skills: [
      { name: "MongoDB", icon: Database, level: 4 },
      { name: "Redis", icon: Database, level: 3 },
    ],
  },
  {
    key: "DevOps",
    label: "DevOps & Cloud",
    icon: Cpu,
    color: "text-purple-400",
    glow: "hover:shadow-purple-500/20 hover:border-purple-500/40",
    gradient: "from-purple-500/10 via-violet-500/5 to-transparent",
    border: "border-purple-500/20",
    bar: "bg-purple-400",
    skills: [
      { name: "Git & GitHub", icon: GitBranch, level: 5 },
      { name: "Docker", icon: Cpu, level: 4 },
      { name: "Kubernetes", icon: Cpu, level: 3 },
      { name: "AWS", icon: Server, level: 3 },
    ],
  },
  {
    key: "Web3",
    label: "Web3 & Blockchain",
    icon: Layers,
    color: "text-yellow-400",
    glow: "hover:shadow-yellow-500/20 hover:border-yellow-500/40",
    gradient: "from-yellow-500/10 via-amber-500/5 to-transparent",
    border: "border-yellow-500/20",
    bar: "bg-yellow-400",
    skills: [
      { name: "Solidity", icon: Code, level: 4 },
      { name: "Web3.js", icon: Globe, level: 4 },
      { name: "Ethers.js", icon: Globe, level: 4 },
      { name: "Hardhat", icon: Code, level: 3 },
      { name: "Wagmi", icon: Code, level: 4 },
    ],
  },
];

const totalSkills = categories.reduce((sum, c) => sum + c.skills.length, 0);

// Bento grid spans per category (index 0..4)
const bentoSpans = [
  "lg:col-span-2", // Frontend  — wide
  "lg:col-span-1", // Backend
  "lg:col-span-1", // Database  — narrow
  "lg:col-span-2", // DevOps    — wide
  "lg:col-span-3", // Web3      — full
];

/* ── Proficiency bar ─────────────────────────── */
const ProficiencyBar = ({
  level,
  barColor,
  delay = 0,
}: {
  level: number;
  barColor: string;
  delay?: number;
}) => (
  <div className="flex items-center gap-1.5">
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          className={`h-1.5 w-5 rounded-full ${i < level ? barColor : "bg-border"}`}
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: delay + i * 0.06 }}
          style={{ originX: 0 }}
        />
      ))}
    </div>
    <span className="text-[10px] text-muted-foreground font-medium">
      {LEVEL_LABELS[level]}
    </span>
  </div>
);

/* ── Bento category panel ─────────────────────── */
const BentoPanel = ({
  cat,
  index,
  onClick,
}: {
  cat: Category;
  index: number;
  onClick: () => void;
}) => {
  const Icon = cat.icon;
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
      whileHover={{ scale: 1.015, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        relative text-left w-full rounded-2xl border ${cat.border} ${cat.glow}
        bg-gradient-to-br ${cat.gradient} backdrop-blur-sm
        p-5 overflow-hidden cursor-pointer
        transition-all duration-300 shadow-sm hover:shadow-lg
        ${bentoSpans[index]}
      `}
    >
      {/* Corner glow */}
      <div className={`absolute -top-6 -right-6 w-20 h-20 rounded-full blur-2xl opacity-30 ${cat.bar}`} />

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-lg bg-background/50 ${cat.color}`}>
            <Icon size={16} />
          </div>
          <span className={`text-sm font-bold ${cat.color}`}>{cat.label}</span>
        </div>
        <span className="text-[11px] font-mono text-muted-foreground bg-background/40 px-2 py-0.5 rounded-full border border-border">
          {cat.skills.length} skills
        </span>
      </div>

      {/* Skill pills */}
      <div className="flex flex-wrap gap-2">
        {cat.skills.map((skill) => (
          <span
            key={skill.name}
            className="text-xs font-medium px-2.5 py-1 rounded-full bg-background/50 border border-border text-foreground/80"
          >
            {skill.name}
          </span>
        ))}
      </div>

      {/* Tap hint */}
      <div className="mt-4 flex items-center gap-1 text-[10px] text-muted-foreground/60">
        <span>View details</span>
        <span>→</span>
      </div>
    </motion.button>
  );
};

/* ── Individual skill card ────────────────────── */
const SkillCard = ({
  skill,
  cat,
  index,
}: {
  skill: Skill;
  cat: Category;
  index: number;
}) => {
  const Icon = skill.icon;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94, y: 12 }}
      transition={{ delay: index * 0.06, duration: 0.35 }}
      whileHover={{ y: -3, scale: 1.02 }}
      className={`
        relative rounded-2xl border ${cat.border} ${cat.glow}
        bg-gradient-to-br ${cat.gradient} backdrop-blur-sm
        p-5 overflow-hidden shadow-sm hover:shadow-lg
        transition-shadow duration-300
      `}
    >
      <div className={`absolute -top-4 -right-4 w-14 h-14 rounded-full blur-xl opacity-25 ${cat.bar}`} />

      <div className="flex items-start gap-3 mb-4">
        <div className={`p-2 rounded-xl bg-background/50 ${cat.color} flex-shrink-0`}>
          <Icon size={18} />
        </div>
        <div>
          <p className="font-bold text-foreground text-sm leading-tight">{skill.name}</p>
          <p className={`text-[11px] font-medium ${cat.color} mt-0.5`}>{cat.label}</p>
        </div>
      </div>

      <ProficiencyBar level={skill.level} barColor={cat.bar} delay={index * 0.05} />
    </motion.div>
  );
};

/* ── Main page ────────────────────────────────── */
const Skills = () => {
  const [active, setActive] = useState<CategoryKey | null>(null);
  const activeCat = categories.find((c) => c.key === active) ?? null;

  return (
    <section className="w-full py-8 px-4 flex flex-col items-center text-foreground">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-3"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-2">Tech Stack</h2>
        <p className="text-muted-foreground text-sm">
          Click any domain to explore proficiency details.
        </p>
      </motion.div>

      {/* Stats chips */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="flex flex-wrap justify-center gap-2 mb-8"
      >
        {[
          { label: `${totalSkills} Technologies`, color: "text-blue-400 border-blue-500/20 bg-blue-500/5" },
          { label: "5 Domains", color: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5" },
          { label: "2+ Years", color: "text-purple-400 border-purple-500/20 bg-purple-500/5" },
        ].map((s) => (
          <span
            key={s.label}
            className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${s.color}`}
          >
            {s.label}
          </span>
        ))}
      </motion.div>

      {/* Content */}
      <div className="w-full max-w-4xl">
        <AnimatePresence mode="wait">

          {/* ── Bento overview ── */}
          {!activeCat && (
            <motion.div
              key="bento"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {categories.map((cat, i) => (
                <BentoPanel
                  key={cat.key}
                  cat={cat}
                  index={i}
                  onClick={() => setActive(cat.key)}
                />
              ))}
            </motion.div>
          )}

          {/* ── Detail view ── */}
          {activeCat && (
            <motion.div
              key={activeCat.key}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
            >
              {/* Back + header */}
              <div className="flex items-center gap-3 mb-6">
                <button
                  onClick={() => setActive(null)}
                  className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <ArrowLeft
                    size={16}
                    className="group-hover:-translate-x-0.5 transition-transform"
                  />
                  All domains
                </button>
                <div className="h-4 w-px bg-border" />
                <span className={`text-sm font-semibold ${activeCat.color}`}>
                  {activeCat.label}
                </span>
              </div>

              {/* Skill cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {activeCat.skills.map((skill, i) => (
                  <SkillCard
                    key={skill.name}
                    skill={skill}
                    cat={activeCat}
                    index={i}
                  />
                ))}
              </div>

              {/* Switch category pills */}
              <div className="flex flex-wrap justify-center gap-2 mt-8 pt-6 border-t border-border">
                {categories
                  .filter((c) => c.key !== activeCat.key)
                  .map((c) => {
                    const Icon = c.icon;
                    return (
                      <button
                        key={c.key}
                        onClick={() => setActive(c.key)}
                        className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border ${c.border} ${c.color} hover:bg-background/60 transition-all`}
                      >
                        <Icon size={11} />
                        {c.label}
                      </button>
                    );
                  })}
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </section>
  );
};

export default Skills;
