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
  Languages,
  Briefcase,
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
  { name: "Solidity", icon: Code }, // Figma for design
  { name: "Web3.js", icon: Code }, // Figma for design
  { name: "Hardhat", icon: Code }, // Figma for design
  { name: "Ethers.js", icon: Code }, // Figma for design
  { name: "JavaScript", icon: Languages }, // JavaScript as core language
  { name: "Wagmi ", icon: Code },
];

export const facts = [
  "3 Years Experience",
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
    value: "sayemabedin.bd@gmail.com",
    href: "mailto:sayemabedin.bd@gmail.com",
    color: "text-blue-500",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Dhaka, Bangladesh",
    href: null,
    color: "text-red-500",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/Sayem98",
    href: "https://github.com/Sayem98",
    color: "text-foreground",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/sayem-abedin",
    href: "https://www.linkedin.com/in/sayem-abedin/",
    color: "text-blue-600",
  },
  {
    icon: Briefcase,
    label: "Upwork",
    value: "upwork/sayem-abedin",
    href: "https://www.upwork.com/freelancers/~01ed29c46ac701c056",
    color: "text-blue-600",
  },
  {
    icon: Briefcase,
    label: "Fiverr",
    value: "fiverr/sayem_abedin",
    href: "https://www.fiverr.com/sellers/sayem_abedin",
    color: "text-blue-600",
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
  {
    name: "SELETTI",
    description: "A staking platform for crypto assets",
    tech: [
      "React",
      "TailwindCSS",
      "QRCode",
      "Solidity",
      "Wagmi",
      "WalletConnect",
      "React-Query",
    ],
    live: "https://endearing-semifreddo-53a0fe.netlify.app/",
    github: "",
    category: "Web",
  },
  {
    name: "Sentinel Blockchain Ecosystem",
    description: "A multi-phase pre-sale dApp for for token launch",
    tech: [
      "React",
      "TailwindCSS",
      "QRCode",
      "Solidity",
      "Wagmi",
      "WalletConnect",
      "React-Query",
    ],
    live: "https://lambent-buttercream-87645d.netlify.app/",
    github: "",
    category: "Web",
  },
  {
    name: "TEDDY BEAR CRYPTO LAND",
    description: "A multi-stage erc-20 token launch dApp",
    tech: [
      "React",
      "TailwindCSS",
      "QRCode",
      "Solidity",
      "Wagmi",
      "WalletConnect",
      "React-Query",
    ],
    live: "https://earnest-duckanoo-de491a.netlify.app/",
    github: "",
    category: "Web",
  },
  {
    name: "BULLS LODGE",
    description: "A NFT minting dApp for erc-721 tokens",
    tech: [
      "React",
      "TailwindCSS",
      "QRCode",
      "Solidity",
      "Wagmi",
      "WalletConnect",
      "React-Query",
    ],
    live: "https://bulls-lodge.netlify.app/",
    github: "",
    category: "Web",
  },
  {
    name: "MILLION ETH",
    description: "A Lottery dApp on Ethereum Blockchain",
    tech: [
      "React",
      "TailwindCSS",
      "QRCode",
      "Solidity",
      "Wagmi",
      "WalletConnect",
      "React-Query",
    ],
    live: "https://www.million-eth.baby/",
    github: "",
    category: "Web",
  },
  {
    name: "Bear Loot Box",
    description: "A in-game purchase and rewards system",
    tech: [
      "React",
      "TailwindCSS",
      "QRCode",
      "Solidity",
      "Wagmi",
      "WalletConnect",
      "React-Query",
    ],
    live: "https://resplendent-babka-b44d7d.netlify.app/",
    github: "",
    category: "Web",
  },
];
