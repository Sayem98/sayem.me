import { useEffect, useState, useMemo } from "react";

const useDarkMode = () => {
  const [isDark, setIsDark] = useState(() =>
    typeof document !== "undefined"
      ? document.documentElement.classList.contains("dark")
      : false
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  return isDark;
};

const Rain = ({ color }) => {
  const raindropCount = 100;

  const raindrops = useMemo(() => {
    return Array.from({ length: raindropCount }).map(() => ({
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 0.4 + Math.random() * 1.2, // 0.4s to 1.6s duration for speed variety
      length: 10 + Math.random() * 20,
      opacity: 0.05 + Math.random() * 0.1,
      translateY: 90 + Math.random() * 40, // translate distance from 90vh to 130vh for speed variation
    }));
  }, []);

  return (
    <>
      {raindrops.map(
        ({ left, delay, duration, length, opacity, translateY }, i) => (
          <div
            key={i}
            className="absolute bottom-full rounded-sm"
            style={{
              left: `${left}%`,
              width: "1px",
              height: `${length}px`,
              opacity,
              backgroundColor: color,
              animation: `rainFall${i} ${duration}s linear infinite`,
              animationDelay: `${delay}s`,
              pointerEvents: "none",
            }}
          />
        )
      )}

      <style>{`
        ${raindrops
          .map(
            (_, i) => `
          @keyframes rainFall${i} {
            0% {
              transform: translateY(0);
              opacity: 1;
            }
            100% {
              transform: translateY(${raindrops[i].translateY}vh);
              opacity: 0;
            }
          }
        `
          )
          .join("\n")}
      `}</style>
    </>
  );
};

const RainBackground = () => {
  const isDark = useDarkMode();

  // Background gradient for light/dark
  const backgroundClass = isDark
    ? "bg-gradient-to-b from-[#0a0f2c] to-[#1a2238]"
    : "bg-gradient-to-b from-[#a7c7e7] to-[#f0f4f8]";

  // Raindrop colors for light/dark mode
  const rainColor = isDark ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.15)";

  return (
    <div
      className={`fixed inset-0 z-10 overflow-hidden pointer-events-none ${backgroundClass}`}
    >
      <Rain color={rainColor} />
      {/* Optional subtle vignette overlay */}
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-t from-black/10 via-transparent to-black/20" />
    </div>
  );
};

export default RainBackground;
