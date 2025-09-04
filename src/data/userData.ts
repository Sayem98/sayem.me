import {
  Code,
  Server,
  Database,
  Paintbrush,
  Type,
  GitBranch,
  Mail,
  MapPin,
  Github,
  Linkedin,
  Link2Icon,
} from "lucide-react";

export const fetchData = [
  { label: "User", value: "aj7@garuda" },
  { label: "OS", value: "Garuda Linux Broadwing x86_64" },
  { label: "Host", value: "ASUS TUF Gaming F15 FX506HF" },
  { label: "Kernel", value: "6.14.2-zen1-1-zen" },
  { label: "Packages", value: "1519 (pacman)" },
  { label: "Shell", value: "zsh 5.9" },
  { label: "CPU", value: "i5-11400H (12) @ 4.50GHz" },
  { label: "GPU", value: "Intel UHD + RTX 2050" },
  { label: "Memory", value: "15725MiB" },
  { label: "Peak Uptime", value: "13 hour's" },
];

export const skills = [
  { name: "React", icon: Code }, // React as general code
  { name: "Node.js", icon: Server }, // Node as backend/server
  { name: "MongoDB", icon: Database }, // MongoDB as database
  { name: "Tailwind CSS", icon: Paintbrush }, // Tailwind as design/UI
  { name: "TypeScript", icon: Type }, // TS as type-focused language
  { name: "Git & GitHub", icon: GitBranch }, // Git
  { name: "Next.js", icon: Link2Icon },
  {
    name: "Docker",
    icon: Server, // Docker as containerization
  },
  { name: "Kubernatis", icon: Server },
  { name: "Express.js", icon: Server }, // Express as web framework
  { name: "GraphQL", icon: Code }, // GraphQL as query language
  { name: "REST APIs", icon: Code }, // REST as API design
  { name: "Redis", icon: Database }, // Redis as caching solution
  { name: "AWS", icon: Server }, // AWS for cloud services
];

export const facts = [
  "1.5 Years Experience",
  "Full Stack Developer",
  "Node.js & Express",
  "React.js Wizard",
  "Database Architect",
  "Problem Solver",
  "Tech Enthusiast",
  "Continuous Learner",
];

export const timeline = [
  {
    year: "2024 - Present",
    detail:
      "Leading development projects at Technovicinity, architecting scalable solutions with microservices and cloud technologies. Spearheaded the migration to containerized deployments.",
    tech: ["Node.js", "Docker", "Kubernetes", "AWS"],
  },
  {
    year: "2022 - 2023",
    detail:
      "Graduated with honors while building production-grade applications. Published research on blockchain applications and contributed to open-source projects.",
    // tech: ["React", "Solidity", "Web3.js", "MongoDB"],
  },
  {
    year: "2020 - 2021",
    detail:
      "Deep dive into full-stack development. Built my first SaaS product that gained 500+ active users. Won hackathon for innovative use of AI in education.",
    tech: ["JavaScript", "nodejs", "React.js", "MongoDB", "Express.js"],
  },
  {
    year: "2018 - 2019",
    detail:
      "First lines of code to first deployed app. Fell in love with problem-solving through programming. Built custom CMS for local businesses.",
    tech: ["HTML/CSS", "JavaScript", "MySQL", "jQuery"],
  },
];
export const contactItems = [
  {
    icon: Mail,
    label: "Email",
    value: "ajseven@outlook.in",
    href: "mailto:ajseven@outlook.in",
    color: "text-blue-500",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "India",
    href: null,
    color: "text-red-500",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/aj-seven",
    href: "https://github.com/aj-seven",
    color: "text-foreground",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/ajseven",
    href: "https://www.linkedin.com/in/ajseven",
    color: "text-blue-600",
  },
  {
    icon: Link2Icon,
    label: "Discord",
    value: "Discord",
    href: "https://discord.com/users/.ajseven",
    color: "text-indigo-500",
  },
];

export const projectData = [
  {
    name: "Bubbas Finance",
    description: "A defi app for managing crypto assets",
    tech: [
      "NextJS",
      "React",
      "TypeScript",
      "TailwindCSS",
      "MongoDB",
      "Express.js",
      "Node.js",
      "Redis",
      "Docker",
      "TankStack Query",
    ],
    live: "https://bubbas.fun/",
    category: "Web",
  },
  {
    name: "Digi Heir",
    description: " A digital and crypto asset management platform.",
    tech: [
      "Next.js",
      "TailwindCSS",
      "Node.js",
      "Express.js",
      "Google Cloud",
      "MongoDB",
      "Docker",
    ],
    live: "https://digiheir.com",
    github: "https://github.com/wubba1211/digiheir",
    category: "Web",
  },
  {
    name: "RewardsX",
    description: "A rewards management system for businesses",
    tech: [
      "React",
      "TailwindCSS",
      "QRCode",
      "Node.js",
      "Express.js",
      "Google Cloud",
      "MongoDB",
      "Docker",
    ],
    live: "https://rewardsx.in",
    github: "",
    category: "App",
  },
];
