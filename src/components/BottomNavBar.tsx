import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, useMotionValue, useTransform } from "framer-motion";
import {
  HomeIcon,
  Info,
  FolderKanban,
  ContactRound,
  Target,
} from "lucide-react";

import About from "../pages/About";
import Projects from "../pages/Projects";
import Skills from "../pages/Skills";
import Contact from "../pages/Contact";
import Home from "../pages/Home";

const sections = {
  Home: <Home />,
  About: <About />,
  Projects: <Projects />,
  Skills: <Skills />,
  Contact: <Contact />,
};

const navItems = [
  { name: "Home", path: "/", icon: HomeIcon },
  { name: "About", path: "/about", icon: Info },
  { name: "Projects", path: "/projects", icon: FolderKanban },
  { name: "Skills", path: "/skills", icon: Target },
  { name: "Contact", path: "/contact", icon: ContactRound },
];

const BottomNavbar = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const scrollRef = useRef<HTMLDivElement>(null);
  const dragX = useMotionValue(0);
  const rotation = useTransform(dragX, [-100, 100], [-20, 20]);

  useEffect(() => {
    const index = navItems.findIndex((item) => item.path === location.pathname);
    if (index !== -1) {
      setCurrentIndex(index);
      scrollToActive(index);
    }
  }, [location]);

  const scrollToActive = (index: number) => {
    const container = scrollRef.current;
    if (container) {
      const activeBtn = container.children[index + 1] as HTMLElement;
      if (activeBtn) {
        const offsetLeft = activeBtn.offsetLeft;
        const containerWidth = container.offsetWidth;
        const scrollAmount = offsetLeft - containerWidth / 2 + activeBtn.offsetWidth / 2;
        container.scrollTo({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  const rotateTo = (dir: "left" | "right") => {
    const newIndex =
      dir === "left"
        ? (currentIndex - 1 + navItems.length) % navItems.length
        : (currentIndex + 1) % navItems.length;

    setCurrentIndex(newIndex);
    navigate(navItems[newIndex].path);
    scrollToActive(newIndex);
  };

  const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    if (info.offset.x > 50) {
      rotateTo("left");
    } else if (info.offset.x < -50) {
      rotateTo("right");
    }
    dragX.set(0);
  };

  const CurrentComponent = sections[navItems[currentIndex].name as keyof typeof sections];

  return (
    <div className="w-screen h-dvh bg-background overflow-hidden">
      {/* Main Page Content */}
      <div className="absolute inset-x-0 top-0 flex flex-col z-10 bg-glass">
        <div className="pt-14 pb-20 max-h-dvh overflow-y-auto">
          {CurrentComponent}
        </div>
      </div>

      {/* Bottom Navbar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-t border-border rounded-t-2xl">
        <motion.div
          ref={scrollRef}
          drag="x"
          dragElastic={0.2}
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
          style={{ rotate: rotation }}
          className="flex items-center sm:justify-center py-2 pb-safe overflow-x-auto no-scrollbar gap-1 px-3"
        >
          {/* Start spacer */}
          <div className="w-2 sm:w-4 flex-shrink-0" />

          {navItems.map((item, index) => {
            const isActive = index === currentIndex;
            const Icon = item.icon;
            return (
              <button
                key={item.name}
                onClick={() => {
                  setCurrentIndex(index);
                  navigate(item.path);
                  scrollToActive(index);
                }}
                className={`flex-shrink-0 flex flex-col items-center justify-center px-5 py-2 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "text-primary bg-primary/10 translate-y-[-6px] shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[11px] mt-0.5 font-medium">{item.name}</span>
              </button>
            );
          })}

          {/* End spacer */}
          <div className="w-2 sm:w-4 flex-shrink-0" />
        </motion.div>
      </nav>
    </div>
  );
};

export default BottomNavbar;
