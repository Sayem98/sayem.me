import { useEffect, useState, useMemo } from "react";

const FluffyCloud = ({ style, width, height }) => {
  // Base sizes from original cloud shapes (max width and height used for scaling)
  const baseWidth = 180;
  const baseHeight = 110;

  const scaleX = width / baseWidth;
  const scaleY = height / baseHeight;

  return (
    <div
      style={style}
      className="absolute rounded-full filter relative pointer-events-none"
    >
      {/* Cloud shape built with overlapping ellipses scaled proportionally */}
      <div
        className="absolute rounded-full blur-3xl"
        style={{
          width: 160 * scaleX,
          height: 100 * scaleY,
          background: "rgba(255, 255, 255, 0.85)",
          top: -40 * scaleY,
          left: -80 * scaleX,
          borderRadius: "80% / 50%",
        }}
      />
      <div
        className="absolute rounded-full blur-2xl"
        style={{
          width: 140 * scaleX,
          height: 90 * scaleY,
          background: "rgba(245, 245, 245, 0.75)",
          top: -30 * scaleY,
          left: -30 * scaleX,
          borderRadius: "70% / 55%",
        }}
      />
      <div
        className="absolute rounded-full blur-3xl"
        style={{
          width: 180 * scaleX,
          height: 110 * scaleY,
          background: "rgba(250, 250, 250, 0.9)",
          top: -10 * scaleY,
          left: 40 * scaleX,
          borderRadius: "85% / 45%",
        }}
      />
      <div
        className="absolute rounded-full blur-xl"
        style={{
          width: 120 * scaleX,
          height: 80 * scaleY,
          background: "rgba(235, 235, 235, 0.6)",
          top: 30 * scaleY,
          left: 90 * scaleX,
          borderRadius: "75% / 60%",
        }}
      />
      <div
        className="absolute rounded-full blur-2xl"
        style={{
          width: 140 * scaleX,
          height: 90 * scaleY,
          background: "rgba(255, 255, 255, 0.7)",
          top: 50 * scaleY,
          left: 10 * scaleX,
          borderRadius: "80% / 50%",
        }}
      />
    </div>
  );
};

const CloudBackground = () => {
  const [isDark, setIsDark] = useState(false);

  // Track dark mode changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributes: true });
    setIsDark(document.documentElement.classList.contains("dark"));
    return () => observer.disconnect();
  }, []);

  // Initial cloud positions (percentages)
  const initialPositions = useMemo(
    () => [
      { x: 20, y: 20 },
      { x: 60, y: 40 },
    ],
    []
  );

  const cloudSizes = useMemo(() => {
    return initialPositions.map(() => ({
      width: 400 + Math.random() * 400, // 400 - 800px width (smaller)
      height: 220 + Math.random() * 200, // 220 - 420px height (smaller)
      opacity: 0.25 + Math.random() * 0.6,
      speedMultiplier: 0.4 + Math.random() * 0.7,
    }));
  }, [initialPositions]);

  // Random airflow angle (degrees)
  const airflowAngle = useMemo(() => Math.random() * 360, []);

  // Calculate velocity vector from angle
  const velocityVector = useMemo(() => {
    const rad = (airflowAngle * Math.PI) / 180;
    return {
      x: Math.cos(rad),
      y: Math.sin(rad),
    };
  }, [airflowAngle]);

  // Cloud positions state
  const [cloudPositions, setCloudPositions] = useState(initialPositions);

  // Animate clouds smoothly based on airflow vector
  useEffect(() => {
    let animationFrameId;
    let lastTimestamp;

    function animate(timestamp) {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const deltaSeconds = (timestamp - lastTimestamp) / 1000;
      lastTimestamp = timestamp;

      setCloudPositions((prevPositions) =>
        prevPositions.map(({ x, y }, i) => {
          // Calculate next position with velocity scaled by cloud speedMultiplier and base speed (1.5)
          let newX =
            x +
            velocityVector.x *
              deltaSeconds *
              1.5 *
              cloudSizes[i].speedMultiplier;
          let newY =
            y +
            velocityVector.y *
              deltaSeconds *
              1.5 *
              cloudSizes[i].speedMultiplier;

          // Wrap around horizontally (0-100% + buffer)
          if (newX > 110) newX = -10;
          if (newX < -10) newX = 110;

          // Wrap around vertically (0-100% + buffer)
          if (newY > 110) newY = -10;
          if (newY < -10) newY = 110;

          return { x: newX, y: newY };
        })
      );

      animationFrameId = requestAnimationFrame(animate);
    }

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [velocityVector, cloudSizes]);

  // Background gradient by theme
  const skyGradient = isDark
    ? "bg-gradient-to-b from-[#0a0f2c] to-[#1a2238]"
    : "bg-gradient-to-b from-[#a7c7e7] to-[#f0f4f8]";

  return (
    <div
      className={`fixed inset-0 z-10 overflow-hidden pointer-events-none ${skyGradient}`}
    >
      {/* Stars in dark mode */}
      {/* {isDark &&
        Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-[2px] h-[2px] bg-white rounded-full opacity-70"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `floatParticle ${
                30 + Math.random() * 30
              }s ease-in-out infinite`,
              animationDelay: `${Math.random() * 40}s`,
              pointerEvents: "none",
            }}
          />
        ))} */}

      {/* Clouds */}
      {cloudPositions.map(({ x, y }, i) => (
        <FluffyCloud
          key={i}
          width={cloudSizes[i].width}
          height={cloudSizes[i].height}
          style={{
            top: `${y}%`,
            left: `${x}%`,
            width: `${cloudSizes[i].width}px`,
            height: `${cloudSizes[i].height}px`,
            opacity: cloudSizes[i].opacity,
            position: "absolute",
            filter: isDark
              ? "drop-shadow(0 0 10px rgba(255,255,255,0.25))"
              : "drop-shadow(0 0 4px rgba(200,210,220,0.5))",
            pointerEvents: "none",
            userSelect: "none",
            transformOrigin: "center",
            animation: "pulseScaleOpacity 12s ease-in-out infinite",
          }}
        />
      ))}

      {/* Vignette overlay */}
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10" />
    </div>
  );
};

export default CloudBackground;
