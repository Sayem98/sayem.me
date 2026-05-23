import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, Globe } from "lucide-react";
import clsx from "clsx";
import { projectData } from "../data/userData";

/* ─── types ─────────────────────────────────────── */
type FilterKey = "All" | "Full Stack" | "Web3" | "App";
type Project = (typeof projectData)[number];

/* ─── helpers ───────────────────────────────────── */
const GRADIENTS = [
  "from-blue-600 via-indigo-700 to-blue-900",
  "from-emerald-600 via-teal-700 to-cyan-900",
  "from-orange-500 via-red-600 to-rose-900",
  "from-purple-500 via-violet-700 to-purple-900",
  "from-cyan-500 via-blue-700 to-indigo-900",
  "from-amber-500 via-orange-600 to-red-900",
  "from-red-500 via-rose-600 to-pink-900",
  "from-green-500 via-emerald-700 to-teal-900",
  "from-violet-500 via-purple-700 to-indigo-900",
];

const WEB3_TECH = ["Solidity", "Wagmi", "Web3.js", "WalletConnect", "Hardhat", "Ethers.js"];

function getCategory(p: Project): FilterKey {
  if (p.category === "App") return "App";
  if (p.tech.some((t) => WEB3_TECH.includes(t))) return "Web3";
  return "Full Stack";
}

function getDomain(url: string) {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return url;
  }
}

const CATEGORY_STYLES: Record<FilterKey, string> = {
  "All": "",
  "Full Stack": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "Web3": "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  "App": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
};

/* ─── browser-mockup preview ─────────────────────── */
const MockupPreview = ({
  url,
  gradient,
  index,
  tall = false,
}: {
  url: string;
  gradient: string;
  index: number;
  tall?: boolean;
}) => {
  const domain = getDomain(url);
  const isEven = index % 2 === 0;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(
        "block relative w-full overflow-hidden group/preview flex-shrink-0",
        tall ? "h-52" : "h-36",
        `bg-gradient-to-br ${gradient}`
      )}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Browser chrome bar */}
      <div className="absolute top-0 inset-x-0 h-8 bg-black/50 flex items-center px-3 gap-2 z-10 backdrop-blur-sm">
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-red-400/80" />
          <div className="w-2 h-2 rounded-full bg-yellow-400/80" />
          <div className="w-2 h-2 rounded-full bg-green-400/80" />
        </div>
        <div className="flex-1 bg-black/40 rounded text-[10px] text-white/50 px-2 py-0.5 mx-1 font-mono truncate">
          {domain}
        </div>
        <ExternalLink
          size={10}
          className="text-white/30 group-hover/preview:text-white/70 transition flex-shrink-0"
        />
      </div>

      {/* Dot-grid texture */}
      <div
        className="absolute inset-0 top-8 opacity-[0.15]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />

      {/* Abstract UI skeleton — alternates layout per index */}
      <div className="absolute inset-0 top-8 p-5 flex flex-col gap-2.5 opacity-25 pointer-events-none select-none">
        {isEven ? (
          <>
            <div className="h-3 bg-white/50 rounded-full w-1/2" />
            <div className="h-2 bg-white/30 rounded-full w-4/5" />
            <div className="h-2 bg-white/30 rounded-full w-3/4" />
            <div className="flex gap-2 mt-1">
              <div className="h-7 bg-white/40 rounded-lg flex-1" />
              <div className="h-7 bg-white/25 rounded-lg flex-1" />
            </div>
            <div className="grid grid-cols-3 gap-2 mt-1">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-10 bg-white/20 rounded-xl" />
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/40 rounded-full flex-shrink-0" />
              <div className="flex-1 space-y-1">
                <div className="h-2 bg-white/40 rounded-full w-2/3" />
                <div className="h-1.5 bg-white/25 rounded-full w-1/2" />
              </div>
            </div>
            <div className="h-2 bg-white/30 rounded-full w-full mt-1" />
            <div className="h-2 bg-white/25 rounded-full w-4/5" />
            <div className="flex gap-2 mt-auto">
              <div className="h-6 bg-white/35 rounded-lg w-20" />
              <div className="h-6 bg-white/20 rounded-lg w-16" />
            </div>
          </>
        )}
      </div>

      {/* Hover CTA overlay */}
      <div className="absolute inset-0 top-8 bg-black/50 flex items-center justify-center opacity-0 group-hover/preview:opacity-100 transition-opacity duration-200 z-20">
        <span className="flex items-center gap-1.5 px-4 py-1.5 bg-white/90 text-gray-900 rounded-full text-xs font-semibold shadow-lg">
          <Globe size={11} />
          Visit Site
        </span>
      </div>
    </a>
  );
};

/* ─── project card ───────────────────────────────── */
const ProjectCard = ({
  project,
  globalIndex,
  featured = false,
}: {
  project: Project;
  globalIndex: number;
  featured?: boolean;
}) => {
  const category = getCategory(project);
  const gradient = GRADIENTS[globalIndex % GRADIENTS.length];
  const maxTech = featured ? 7 : 4;
  const visibleTech = project.tech.slice(0, maxTech);
  const overflow = project.tech.length - maxTech;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ delay: globalIndex * 0.055, duration: 0.35 }}
      className="flex flex-col rounded-2xl border border-border bg-background/60 backdrop-blur-sm overflow-hidden hover:border-primary/25 hover:shadow-2xl hover:shadow-black/10 dark:hover:shadow-black/30 transition-all duration-300 group"
    >
      <MockupPreview
        url={project.live || ""}
        gradient={gradient}
        index={globalIndex}
        tall={featured}
      />

      <div className="flex flex-col gap-3 p-5 flex-1">
        {/* Title + category */}
        <div className="flex items-start justify-between gap-2">
          <h3
            className={clsx(
              "font-bold leading-snug text-foreground",
              featured ? "text-base" : "text-sm"
            )}
          >
            {project.name}
          </h3>
          <span
            className={clsx(
              "flex-shrink-0 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border",
              CATEGORY_STYLES[category]
            )}
          >
            {category}
          </span>
        </div>

        {/* Description */}
        <p
          className={clsx(
            "text-muted-foreground leading-relaxed",
            featured ? "text-sm" : "text-xs"
          )}
        >
          {project.description || "No description provided."}
        </p>

        {/* Tech pills */}
        <div className="flex flex-wrap gap-1.5">
          {visibleTech.map((t) => (
            <span
              key={t}
              className="text-[10px] px-2 py-0.5 rounded-md bg-muted border border-border text-muted-foreground font-medium"
            >
              {t}
            </span>
          ))}
          {overflow > 0 && (
            <span className="text-[10px] px-2 py-0.5 rounded-md bg-primary/10 border border-primary/20 text-primary font-semibold">
              +{overflow} more
            </span>
          )}
        </div>

        {/* Links */}
        <div className="flex items-center gap-2 pt-1 mt-auto">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-semibold text-white bg-primary hover:bg-primary/85 active:scale-95 px-3 py-1.5 rounded-lg transition-all"
            >
              <ExternalLink size={11} />
              Live
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground border border-border hover:border-foreground/30 px-3 py-1.5 rounded-lg transition-all"
            >
              <Github size={11} />
              Code
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
};

/* ─── main page ──────────────────────────────────── */
const FILTERS: FilterKey[] = ["All", "Full Stack", "Web3", "App"];

const Projects = () => {
  const [filter, setFilter] = useState<FilterKey>("All");

  const enriched = projectData.map((p, i) => ({
    ...p,
    displayCategory: getCategory(p),
    originalIndex: i,
  }));

  const filtered =
    filter === "All"
      ? enriched
      : enriched.filter((p) => p.displayCategory === filter);

  const featured = filter === "All" ? filtered.slice(0, 2) : [];
  const rest = filter === "All" ? filtered.slice(2) : filtered;

  const countFor = (f: FilterKey) =>
    f === "All"
      ? projectData.length
      : enriched.filter((p) => p.displayCategory === f).length;

  return (
    <section className="w-full px-4 py-8 text-foreground">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <div className="flex items-center justify-center gap-3 mb-2">
          <h2 className="text-4xl md:text-5xl font-bold">Projects</h2>
          <span className="self-center text-sm font-mono text-muted-foreground bg-muted border border-border px-2.5 py-1 rounded-full">
            {projectData.length}
          </span>
        </div>
        <p className="text-muted-foreground text-sm max-w-sm mx-auto">
          Production apps, DeFi platforms & Web3 dApps I've shipped.
        </p>
      </motion.div>

      {/* Filter pills */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap justify-center gap-2 mb-8"
      >
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={clsx(
              "flex items-center gap-1.5 px-4 py-1.5 rounded-full border text-sm font-medium transition-all duration-200",
              filter === f
                ? "bg-primary text-white border-primary shadow-sm shadow-primary/20"
                : "text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
            )}
          >
            {f}
            <span
              className={clsx(
                "text-[10px] font-mono px-1.5 py-0.5 rounded-full leading-none",
                filter === f
                  ? "bg-white/25 text-white"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {countFor(f)}
            </span>
          </button>
        ))}
      </motion.div>

      {/* Grid */}
      <AnimatePresence mode="popLayout">
        <div className="max-w-5xl mx-auto space-y-4" key={filter}>

          {/* Featured row — 2 large cards side by side */}
          {featured.length > 0 && (
            <motion.div
              layout
              className="grid md:grid-cols-2 gap-4"
            >
              {featured.map((p) => (
                <ProjectCard
                  key={p.name}
                  project={p}
                  globalIndex={p.originalIndex}
                  featured
                />
              ))}
            </motion.div>
          )}

          {/* Compact grid */}
          {rest.length > 0 && (
            <motion.div
              layout
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {rest.map((p) => (
                <ProjectCard
                  key={p.name}
                  project={p}
                  globalIndex={p.originalIndex}
                />
              ))}
            </motion.div>
          )}

          {filtered.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-muted-foreground py-16"
            >
              No projects in this category.
            </motion.p>
          )}
        </div>
      </AnimatePresence>
    </section>
  );
};

export default Projects;
