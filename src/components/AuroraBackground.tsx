const AuroraBackground = () => {
  return (
    <div className="fixed inset-0 z-10 overflow-hidden pointer-events-none">
      {/* Gradient Aurora */}
      <div className="absolute inset-0">
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <radialGradient id="auroraGrad1" cx="50%" cy="50%" r="80%">
              <stop offset="0%" stopColor="#ff6ec7" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="auroraGrad2" cx="30%" cy="70%" r="70%">
              <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
            </radialGradient>
            <filter id="blurFilter">
              <feGaussianBlur stdDeviation="60" />
            </filter>
          </defs>

          {/* Two floating blobs */}
          <circle
            cx="40%"
            cy="35%"
            r="40%"
            fill="url(#auroraGrad1)"
            filter="url(#blurFilter)"
          >
            <animate
              attributeName="cx"
              values="40%;45%;35%;40%"
              dur="20s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="cy"
              values="35%;40%;30%;35%"
              dur="15s"
              repeatCount="indefinite"
            />
          </circle>

          <circle
            cx="60%"
            cy="65%"
            r="40%"
            fill="url(#auroraGrad2)"
            filter="url(#blurFilter)"
          >
            <animate
              attributeName="cx"
              values="60%;55%;65%;60%"
              dur="25s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="cy"
              values="65%;60%;70%;65%"
              dur="18s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      </div>

      {/* Small glowing particles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-white rounded-full opacity-40 blur-[2px]"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `floatParticle ${
              10 + Math.random() * 10
            }s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}
    </div>
  );
};

export default AuroraBackground;
