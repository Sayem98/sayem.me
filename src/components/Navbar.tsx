import { useState, useEffect } from "react";
import { Sun, Moon, Code2, Github } from "lucide-react";
import { TypeAnimation } from "react-type-animation";

type Props = {
  terminalMode: boolean;
  setTerminalMode: (v: boolean) => void;
};

const Navbar = ({ terminalMode, setTerminalMode }: Props) => {
  const [darkMode, setDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const storedMode = localStorage.getItem("ui-mode");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (storedTheme === "dark" || (!storedTheme && prefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }

    if (storedMode === "cli") {
      setTerminalMode(true);
    }
  }, [setTerminalMode]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("ui-mode", terminalMode ? "cli" : "gui");
  }, [terminalMode]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 border-b ${
        terminalMode
          ? "bg-black/90 text-green-400 border-green-800 glow-nav backdrop-blur-sm"
          : scrolled
          ? "bg-background/80 backdrop-blur-md border-border shadow-sm"
          : "bg-background/60 backdrop-blur-sm border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between">
        {/* Logo */}
        <a
          href="/"
          className={`flex items-center gap-2 text-xl font-bold transition-all duration-300 ${
            terminalMode ? "text-green-400" : "text-primary"
          }`}
        >
          <Code2 className="w-6 h-6 dark:text-white text-foreground" />
          <TypeAnimation
            key={terminalMode ? "terminal" : "normal"}
            sequence={
              terminalMode
                ? ["$ whoami", 2000, "visitor@aj-seven", 2000]
                : ["Md. Sayem Abedin", 3000, "Full Stack Dev", 2000]
            }
            wrapper="span"
            speed={50}
            repeat={Infinity}
            className={
              terminalMode
                ? "text-green-400"
                : "text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-500 dark:from-gray-200 dark:to-gray-400"
            }
          />
        </a>

        {/* Controls */}
        <div className="flex items-center gap-1 p-1.5 border border-border rounded-full bg-background/50 backdrop-blur-sm">
          <a
            href="https://github.com/Sayem98/sayem.me"
            target="_blank"
            rel="noopener noreferrer"
            title="Source Code"
            className="p-1.5 rounded-full hover:bg-accent transition-colors"
          >
            <Github size={18} />
          </a>
          {!terminalMode && (
            <button
              onClick={() => setDarkMode(!darkMode)}
              title="Toggle Theme"
              className="p-1.5 rounded-full hover:bg-accent transition-colors"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
