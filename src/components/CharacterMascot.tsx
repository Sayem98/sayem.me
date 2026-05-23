import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

/* ── messages ──────────────────────────────────────────── */
interface Msg {
  text: string;
  cta?: string;
  route?: string;
}

const AMBIENT: Msg[] = [
  { text: "psst… connect with Sayem? 👀", cta: "Say Hi! 👋", route: "/contact" },
  { text: "he doesn't bite. probably 🤖" },
  { text: "tap me. I dare you 👆" },
  { text: "*nervous walking noises* 😅" },
  { text: "loading charisma… ✅ done!" },
  { text: "seen his projects yet? 🚀", cta: "Show me!", route: "/projects" },
  { text: "boop! 🎵" },
  { text: "404: social life not found 🫠" },
  { text: "I'm totally not a spy 👁️" },
  { text: "say hi! it's free! 📨", cta: "Let's go!", route: "/contact" },
  { text: "he loves Linux btw 🐧" },
  { text: "coffee.exe is running ☕" },
  { text: "git push --force 😈" },
  { text: "npm install… 3 491 packages 📦" },
  { text: "*trips* I meant to do that 🤕" },
  { text: "deploying to prod on Friday 🫡" },
  { text: "fixing bugs by adding more bugs 🐛" },
  { text: "it works on my machine ¯\\_(ツ)_/¯" },
];

const ON_CLICK: Msg[] = [
  { text: "ouch! 🥺" },
  { text: "heheheh 😄" },
  { text: "again?! really?! 🙄" },
  { text: "I know karate! 🥋" },
  { text: "wheee! 😆" },
  { text: "HELP! 😱" },
  { text: "ok ok I give up 😮‍💨" },
];

/* ── SVG robot ─────────────────────────────────────────── */
const Robot = ({
  sleeping,
  excited,
  walking,
  leg,
}: {
  sleeping: boolean;
  excited: boolean;
  walking: boolean;
  leg: 0 | 1;
}) => (
  <svg
    width="40"
    height="54"
    viewBox="0 0 40 54"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* ground shadow */}
    <ellipse cx="20" cy="53" rx="10" ry="2.5" fill="black" fillOpacity="0.13" />

    {/* body */}
    <rect x="6" y="11" width="28" height="22" rx="8" fill="#3b82f6" />
    {/* body highlight */}
    <rect x="10" y="15" width="20" height="13" rx="4" fill="white" fillOpacity="0.08" />
    {/* chest LED */}
    <rect x="17" y="21" width="6" height="4" rx="2" fill="#93c5fd" fillOpacity="0.9" />

    {/* antenna stem */}
    <rect x="18" y="4" width="4" height="8" rx="2" fill="#93c5fd" />
    {/* antenna ball */}
    <circle cx="20" cy="4" r="4" fill="#60a5fa" />
    <circle cx="20" cy="4" r="2.2" fill="white" fillOpacity="0.45" />

    {/* eyes */}
    {sleeping ? (
      <>
        <path d="M10 18 Q14 15 18 18" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M22 18 Q26 15 30 18" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
      </>
    ) : (
      <>
        <ellipse cx="14" cy="18.5" rx="4.2" ry={excited ? 5 : 4} fill="white" />
        <ellipse cx="26" cy="18.5" rx="4.2" ry={excited ? 5 : 4} fill="white" />
        <circle cx="15.5" cy="19.5" r="2.6" fill="#0f172a" />
        <circle cx="27.5" cy="19.5" r="2.6" fill="#0f172a" />
        {/* shine dots */}
        <circle cx="16.4" cy="18" r="1.1" fill="white" />
        <circle cx="28.4" cy="18" r="1.1" fill="white" />
      </>
    )}

    {/* mouth */}
    {sleeping ? (
      <path d="M15 28 L25 28" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5" />
    ) : excited ? (
      <path d="M13 26 Q20 33 27 26" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
    ) : (
      <path d="M14 27 Q20 31 26 27" stroke="white" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    )}

    {/* left leg */}
    <motion.g
      animate={{ y: walking && leg === 0 ? -6 : 0 }}
      transition={{ duration: 0.11, ease: "easeOut" }}
    >
      <rect x="8" y="31" width="10" height="14" rx="5" fill="#2563eb" />
      <ellipse cx="13" cy="44.5" rx="6.5" ry="3" fill="#1d4ed8" />
    </motion.g>

    {/* right leg */}
    <motion.g
      animate={{ y: walking && leg === 1 ? -6 : 0 }}
      transition={{ duration: 0.11, ease: "easeOut" }}
    >
      <rect x="22" y="31" width="10" height="14" rx="5" fill="#2563eb" />
      <ellipse cx="27" cy="44.5" rx="6.5" ry="3" fill="#1d4ed8" />
    </motion.g>
  </svg>
);

/* ── speech bubble ─────────────────────────────────────── */
const Bubble = ({ msg, onCta }: { msg: Msg; onCta: (route: string) => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 10, scale: 0.78 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 6, scale: 0.88 }}
    transition={{ type: "spring", stiffness: 380, damping: 24 }}
    className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 z-50 pointer-events-auto"
  >
    <div className="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl px-3.5 py-2.5 shadow-2xl min-w-max max-w-[190px]">
      <p className="text-[12px] font-medium text-gray-800 dark:text-gray-100 text-center leading-snug whitespace-normal">
        {msg.text}
      </p>
      {msg.cta && msg.route && (
        <button
          onClick={() => onCta(msg.route!)}
          className="mt-2 w-full px-3 py-1 bg-primary text-white rounded-xl text-[11px] font-bold hover:bg-primary/85 active:scale-95 transition-all"
        >
          {msg.cta}
        </button>
      )}
      {/* border tail */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-gray-200 dark:border-t-gray-700" />
      {/* fill tail */}
      <div className="absolute top-[calc(100%-1px)] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[7px] border-r-[7px] border-t-[7px] border-l-transparent border-r-transparent border-t-white dark:border-t-gray-900" />
    </div>
  </motion.div>
);

/* ── main mascot ───────────────────────────────────────── */
type CharState = "idle" | "walking" | "talking" | "excited" | "sleeping";

const CharacterMascot = () => {
  const navigate = useNavigate();
  const posRef = useRef(12); // current X in vw %
  const [posX, setPosX] = useState(12);
  const [walkDur, setWalkDur] = useState(2);
  const [dir, setDir] = useState<"right" | "left">("right");
  const [state, setState] = useState<CharState>("idle");
  const [msg, setMsg] = useState<Msg | null>(null);
  const [bubbleOpen, setBubbleOpen] = useState(false);
  const [leg, setLeg] = useState<0 | 1>(0);
  const [clicks, setClicks] = useState(0);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  const safe = <T,>(fn: () => T) => { if (mountedRef.current) fn(); };

  /* leg alternator while walking */
  useEffect(() => {
    if (state !== "walking") { setLeg(0); return; }
    const id = setInterval(() => setLeg((l) => (l === 0 ? 1 : 0)), 190);
    return () => clearInterval(id);
  }, [state]);

  /* show then hide a bubble */
  const showMsg = useCallback((m: Msg, duration = 3800) => {
    safe(() => { setMsg(m); setBubbleOpen(true); setState("talking"); });
    setTimeout(() => safe(() => setBubbleOpen(false)), duration);
    setTimeout(() => safe(() => { setMsg(null); setState("idle"); }), duration + 350);
  }, []); // eslint-disable-line

  /* walk to a new position */
  const walkTo = useCallback((target: number) => {
    const dist = Math.abs(target - posRef.current);
    const dur = Math.max(1.2, dist * 0.075);
    safe(() => {
      setDir(target > posRef.current ? "right" : "left");
      posRef.current = target;
      setPosX(target);
      setWalkDur(dur);
      setState("walking");
    });
    setTimeout(() => safe(() => setState("idle")), dur * 1000 + 300);
  }, []); // eslint-disable-line

  /* behaviour scheduler */
  const tick = useCallback(() => {
    const r = Math.random();
    if (r < 0.32) {
      walkTo(Math.max(4, Math.min(80, Math.random() * 76 + 4)));
    } else if (r < 0.62) {
      showMsg(AMBIENT[Math.floor(Math.random() * AMBIENT.length)]);
    } else if (r < 0.74) {
      safe(() => setState("excited"));
      setTimeout(() => safe(() => setState("idle")), 1400);
    } else if (r < 0.88) {
      safe(() => setState("sleeping"));
      setTimeout(() => safe(() => setState("idle")), 5000);
    } else {
      safe(() => setState("idle"));
    }
  }, [walkTo, showMsg]); // eslint-disable-line

  useEffect(() => {
    /* initial greeting */
    const greet = setTimeout(
      () => showMsg({ text: "Hi! 👋 I'm Sayem's little buddy!", cta: "Connect 💬", route: "/contact" }, 4000),
      2200
    );
    const id = setInterval(tick, 3200 + Math.random() * 2400);
    return () => { clearTimeout(greet); clearInterval(id); };
  }, [tick, showMsg]);

  /* click handler */
  const handleClick = useCallback(() => {
    const n = clicks + 1;
    setClicks(n);
    setState("excited");
    if (n % 4 === 0) {
      showMsg({ text: "ok FINE — connect with Sayem? 😤", cta: "Say Hi!", route: "/contact" }, 3000);
    } else {
      showMsg(ON_CLICK[(n - 1) % ON_CLICK.length], 2200);
    }
  }, [clicks, showMsg]);

  const sleeping = state === "sleeping";
  const excited = state === "excited";
  const walking = state === "walking";

  return (
    <motion.div
      className="fixed z-40 pointer-events-none select-none"
      style={{ bottom: 62 }}
      animate={{ left: `${posX}%` }}
      transition={{ duration: walkDur, ease: "linear" }}
    >
      <div className="relative">
        {/* speech bubble */}
        <AnimatePresence>
          {bubbleOpen && msg && (
            <Bubble
              key="bubble"
              msg={msg}
              onCta={(route) => navigate(route)}
            />
          )}
        </AnimatePresence>

        {/* zzz when sleeping */}
        <AnimatePresence>
          {sleeping &&
            ([0, 1, 2] as const).map((i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, x: 0, y: 0, scale: 0.4 }}
                animate={{
                  opacity: [0, 1, 0],
                  x: 10 + i * 7,
                  y: -(14 + i * 13),
                  scale: 0.4 + i * 0.3,
                }}
                transition={{
                  duration: 1.8,
                  delay: i * 0.65,
                  repeat: Infinity,
                  repeatDelay: 0.4,
                }}
                className="absolute top-0 right-0 text-blue-400 font-black pointer-events-none"
                style={{ fontSize: 9 + i * 3 }}
              >
                z
              </motion.span>
            ))}
        </AnimatePresence>

        {/* character */}
        <motion.div
          onClick={handleClick}
          className="pointer-events-auto cursor-pointer"
          title="Click me!"
          animate={{
            scaleX: dir === "right" ? 1 : -1,
            y: excited
              ? [0, -16, 0, -10, 0, -5, 0]
              : walking
              ? [0, -4, 0, -4, 0]
              : sleeping
              ? [0, -1, 0]
              : [0, -3, 0],
          }}
          transition={{
            scaleX: { duration: 0.18 },
            y: {
              duration: excited ? 0.55 : walking ? 0.48 : sleeping ? 3.5 : 2.2,
              repeat: excited ? 0 : Infinity,
              ease: "easeInOut",
            },
          }}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.88, rotate: [-5, 5, -3, 0] }}
        >
          <Robot sleeping={sleeping} excited={excited} walking={walking} leg={leg} />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CharacterMascot;
