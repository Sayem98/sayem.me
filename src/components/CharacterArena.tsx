import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

/* ── types ─────────────────────────────────────────────── */
type Move = "rock" | "paper" | "scissors";
type CharState = "idle" | "walking" | "talking" | "sleeping" | "excited" | "battle" | "victory" | "flee";
type FightPhase = "none" | "approaching" | "faceoff" | "countdown" | "reveal" | "result" | "cooldown";

interface Msg {
  text: string;
  cta?: string;
  route?: string;
}

/* ── messages ───────────────────────────────────────────── */
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

const RED_APPROACH: Msg[] = [
  { text: "prepare yourself! 😤" },
  { text: "I challenge you! ⚔️" },
  { text: "your code is spaghetti 🍝" },
  { text: "I use vim btw 😈" },
];

/* ── rps logic ──────────────────────────────────────────── */
const MOVES: Move[] = ["rock", "paper", "scissors"];
const MOVE_EMOJI: Record<Move, string> = { rock: "✊", paper: "✋", scissors: "✌️" };
const randMove = () => MOVES[Math.floor(Math.random() * 3)];
const getWinner = (a: Move, b: Move): "a" | "b" | "draw" => {
  if (a === b) return "draw";
  return (a === "rock" && b === "scissors") ||
    (a === "paper" && b === "rock") ||
    (a === "scissors" && b === "paper")
    ? "a"
    : "b";
};

/* ── blue robot SVG ─────────────────────────────────────── */
const BlueBot = ({
  sleeping,
  excited,
  walking,
  battle,
  victory,
  leg,
}: {
  sleeping: boolean;
  excited: boolean;
  walking: boolean;
  battle: boolean;
  victory: boolean;
  leg: 0 | 1;
}) => (
  <svg width="40" height="54" viewBox="0 0 40 54" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="20" cy="53" rx="10" ry="2.5" fill="black" fillOpacity="0.13" />
    <rect x="6" y="11" width="28" height="22" rx="8" fill="#3b82f6" />
    <rect x="10" y="15" width="20" height="13" rx="4" fill="white" fillOpacity="0.08" />
    <rect x="17" y="21" width="6" height="4" rx="2" fill={victory ? "#86efac" : "#93c5fd"} fillOpacity="0.9" />
    <rect x="18" y="4" width="4" height="8" rx="2" fill="#93c5fd" />
    <circle cx="20" cy="4" r="4" fill="#60a5fa" />
    <circle cx="20" cy="4" r="2.2" fill="white" fillOpacity="0.45" />
    {sleeping ? (
      <>
        <path d="M10 18 Q14 15 18 18" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M22 18 Q26 15 30 18" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
      </>
    ) : (
      <>
        <ellipse cx="14" cy="18.5" rx="4.2" ry={excited || victory ? 5 : battle ? 3.5 : 4} fill="white" />
        <ellipse cx="26" cy="18.5" rx="4.2" ry={excited || victory ? 5 : battle ? 3.5 : 4} fill="white" />
        <circle cx="15.5" cy="19.5" r="2.6" fill="#0f172a" />
        <circle cx="27.5" cy="19.5" r="2.6" fill="#0f172a" />
        <circle cx="16.4" cy="18" r="1.1" fill="white" />
        <circle cx="28.4" cy="18" r="1.1" fill="white" />
      </>
    )}
    {sleeping ? (
      <path d="M15 28 L25 28" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5" />
    ) : victory ? (
      <path d="M12 26 Q20 34 28 26" stroke="white" strokeWidth="2.2" fill="none" strokeLinecap="round" />
    ) : excited || battle ? (
      <path d="M13 26 Q20 33 27 26" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
    ) : (
      <path d="M14 27 Q20 31 26 27" stroke="white" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    )}
    <motion.g animate={{ y: walking && leg === 0 ? -6 : 0 }} transition={{ duration: 0.11, ease: "easeOut" }}>
      <rect x="8" y="31" width="10" height="14" rx="5" fill="#2563eb" />
      <ellipse cx="13" cy="44.5" rx="6.5" ry="3" fill="#1d4ed8" />
    </motion.g>
    <motion.g animate={{ y: walking && leg === 1 ? -6 : 0 }} transition={{ duration: 0.11, ease: "easeOut" }}>
      <rect x="22" y="31" width="10" height="14" rx="5" fill="#2563eb" />
      <ellipse cx="27" cy="44.5" rx="6.5" ry="3" fill="#1d4ed8" />
    </motion.g>
  </svg>
);

/* ── red robot SVG ──────────────────────────────────────── */
const RedBot = ({
  walking,
  battle,
  flee,
  victory,
  leg,
}: {
  walking: boolean;
  battle: boolean;
  flee: boolean;
  victory: boolean;
  leg: 0 | 1;
}) => (
  <svg width="40" height="54" viewBox="0 0 40 54" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="20" cy="53" rx="10" ry="2.5" fill="black" fillOpacity="0.13" />
    <rect x="6" y="11" width="28" height="22" rx="8" fill="#ef4444" />
    <rect x="10" y="15" width="20" height="13" rx="4" fill="white" fillOpacity="0.06" />
    <rect x="17" y="21" width="6" height="4" rx="2" fill={victory ? "#86efac" : "#fca5a5"} fillOpacity="0.9" />
    {/* Lightning bolt antenna */}
    <path d="M21 11 L18 7 L20.5 7 L17 3 L23 3 L20.5 7 L23 7 Z" fill="#fca5a5" />
    {flee ? (
      <>
        <path d="M10 18 Q14 22 18 18" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M22 18 Q26 22 30 18" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
      </>
    ) : (
      <>
        {/* Angry eyebrows */}
        <path d="M10 14.5 L18 16.5" stroke="#7f1d1d" strokeWidth="2" strokeLinecap="round" />
        <path d="M22 16.5 L30 14.5" stroke="#7f1d1d" strokeWidth="2" strokeLinecap="round" />
        <ellipse cx="14" cy="19" rx="4.2" ry={victory ? 5 : battle ? 3 : 3.5} fill="white" />
        <ellipse cx="26" cy="19" rx="4.2" ry={victory ? 5 : battle ? 3 : 3.5} fill="white" />
        <circle cx="15.5" cy="19.5" r="2.6" fill="#450a0a" />
        <circle cx="27.5" cy="19.5" r="2.6" fill="#450a0a" />
        <circle cx="16.4" cy="18" r="1.1" fill="white" />
        <circle cx="28.4" cy="18" r="1.1" fill="white" />
      </>
    )}
    {flee ? (
      <path d="M14 27 Q20 31 26 27" stroke="white" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    ) : victory ? (
      <path d="M12 26 Q20 34 28 26" stroke="white" strokeWidth="2.2" fill="none" strokeLinecap="round" />
    ) : (
      <path d="M14 28 Q20 23 26 28" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    )}
    <motion.g animate={{ y: walking && leg === 0 ? -6 : 0 }} transition={{ duration: 0.11, ease: "easeOut" }}>
      <rect x="8" y="31" width="10" height="14" rx="5" fill="#dc2626" />
      <ellipse cx="13" cy="44.5" rx="6.5" ry="3" fill="#b91c1c" />
    </motion.g>
    <motion.g animate={{ y: walking && leg === 1 ? -6 : 0 }} transition={{ duration: 0.11, ease: "easeOut" }}>
      <rect x="22" y="31" width="10" height="14" rx="5" fill="#dc2626" />
      <ellipse cx="27" cy="44.5" rx="6.5" ry="3" fill="#b91c1c" />
    </motion.g>
  </svg>
);

/* ── speech bubble ──────────────────────────────────────── */
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
      <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-gray-200 dark:border-t-gray-700" />
      <div className="absolute top-[calc(100%-1px)] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[7px] border-r-[7px] border-t-[7px] border-l-transparent border-r-transparent border-t-white dark:border-t-gray-900" />
    </div>
  </motion.div>
);

/* ── battle card ────────────────────────────────────────── */
const BattleCard = ({
  phase,
  countdown,
  blueMove,
  redMove,
  winner,
}: {
  phase: FightPhase;
  countdown: number;
  blueMove: Move | null;
  redMove: Move | null;
  winner: "a" | "b" | "draw" | null;
}) => {
  if (phase === "none" || phase === "approaching" || phase === "cooldown") return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.6, y: 20 }}
      transition={{ type: "spring", stiffness: 400, damping: 26 }}
      className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
    >
      <div className="bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-2xl px-5 py-3 shadow-2xl text-center min-w-[180px]">
        {phase === "faceoff" && (
          <motion.p
            initial={{ scale: 0.5 }}
            animate={{ scale: [0.5, 1.2, 1] }}
            transition={{ duration: 0.4 }}
            className="text-lg font-black text-gray-900 dark:text-white"
          >
            ⚔️ BATTLE!
          </motion.p>
        )}

        {phase === "countdown" && (
          <motion.p
            key={countdown}
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 20 }}
            className="text-2xl font-black text-gray-900 dark:text-white"
          >
            {countdown === 3 ? "3️⃣" : countdown === 2 ? "2️⃣" : "1️⃣"}
          </motion.p>
        )}

        {phase === "reveal" && blueMove && redMove && (
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">Showdown!</p>
            <div className="flex items-center justify-center gap-3">
              <div className="text-center">
                <div className="text-2xl">{MOVE_EMOJI[blueMove]}</div>
                <div className="text-[9px] font-bold text-blue-400">BLUE</div>
              </div>
              <span className="text-sm font-black text-gray-400">VS</span>
              <div className="text-center">
                <div className="text-2xl">{MOVE_EMOJI[redMove]}</div>
                <div className="text-[9px] font-bold text-red-400">RED</div>
              </div>
            </div>
          </div>
        )}

        {phase === "result" && winner && (
          <motion.div
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 450, damping: 18 }}
          >
            {blueMove && redMove && (
              <div className="flex items-center justify-center gap-3 mb-1.5">
                <div className="text-center opacity-70">
                  <div className="text-xl">{MOVE_EMOJI[blueMove]}</div>
                  <div className="text-[9px] font-bold text-blue-400">BLUE</div>
                </div>
                <span className="text-xs font-black text-gray-400">VS</span>
                <div className="text-center opacity-70">
                  <div className="text-xl">{MOVE_EMOJI[redMove]}</div>
                  <div className="text-[9px] font-bold text-red-400">RED</div>
                </div>
              </div>
            )}
            <p className="text-base font-black text-gray-900 dark:text-white">
              {winner === "a" ? "🏆 BLUE WINS!" : winner === "b" ? "🔥 RED WINS!" : "🤝 DRAW!"}
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

/* ── main arena ─────────────────────────────────────────── */
const CharacterArena = () => {
  const navigate = useNavigate();
  const mounted = useRef(true);

  /* blue state */
  const bluePosRef = useRef(12);
  const [bluePosX, setBluePosX] = useState(12);
  const [blueWalkDur, setBlueWalkDur] = useState(2);
  const [blueDir, setBlueDir] = useState<"right" | "left">("right");
  const [blueState, setBlueState] = useState<CharState>("idle");
  const [blueMsg, setBlueMsg] = useState<Msg | null>(null);
  const [blueBubble, setBlueBubble] = useState(false);
  const [blueLeg, setBlueLeg] = useState<0 | 1>(0);
  const [blueClicks, setBlueClicks] = useState(0);

  /* red state */
  const redPosRef = useRef<number | null>(null);
  const [redVisible, setRedVisible] = useState(false);
  const [redPosX, setRedPosX] = useState(-10);
  const [redWalkDur, setRedWalkDur] = useState(2);
  const [redDir, setRedDir] = useState<"right" | "left">("right");
  const [redState, setRedState] = useState<CharState>("idle");
  const [redMsg, setRedMsg] = useState<Msg | null>(null);
  const [redBubble, setRedBubble] = useState(false);
  const [redLeg, setRedLeg] = useState<0 | 1>(0);

  /* fight state */
  const [fightPhase, setFightPhase] = useState<FightPhase>("none");
  const [countdown, setCountdown] = useState(3);
  const [blueMove, setBlueMove] = useState<Move | null>(null);
  const [redMove, setRedMove] = useState<Move | null>(null);
  const [fightWinner, setFightWinner] = useState<"a" | "b" | "draw" | null>(null);
  const isFightingRef = useRef(false);

  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; };
  }, []);

  const safe = <T,>(fn: () => T) => { if (mounted.current) fn(); };

  /* leg animators */
  useEffect(() => {
    if (blueState !== "walking") { setBlueLeg(0); return; }
    const id = setInterval(() => setBlueLeg((l) => (l === 0 ? 1 : 0)), 190);
    return () => clearInterval(id);
  }, [blueState]);

  useEffect(() => {
    if (redState !== "walking") { setRedLeg(0); return; }
    const id = setInterval(() => setRedLeg((l) => (l === 0 ? 1 : 0)), 190);
    return () => clearInterval(id);
  }, [redState]);

  /* helpers */
  const showBlueMsg = useCallback((m: Msg, duration = 3800) => {
    safe(() => { setBlueMsg(m); setBlueBubble(true); setBlueState("talking"); });
    setTimeout(() => safe(() => setBlueBubble(false)), duration);
    setTimeout(() => safe(() => { setBlueMsg(null); setBlueState("idle"); }), duration + 350);
  }, []); // eslint-disable-line

  const showRedMsg = useCallback((m: Msg, duration = 2800) => {
    safe(() => { setRedMsg(m); setRedBubble(true); });
    setTimeout(() => safe(() => setRedBubble(false)), duration);
    setTimeout(() => safe(() => setRedMsg(null)), duration + 350);
  }, []); // eslint-disable-line

  const walkBlue = useCallback((target: number) => {
    const dist = Math.abs(target - bluePosRef.current);
    const dur = Math.max(1.2, dist * 0.075);
    safe(() => {
      setBlueDir(target > bluePosRef.current ? "right" : "left");
      bluePosRef.current = target;
      setBluePosX(target);
      setBlueWalkDur(dur);
      setBlueState("walking");
    });
    setTimeout(() => safe(() => setBlueState("idle")), dur * 1000 + 300);
  }, []); // eslint-disable-line

  const walkRed = useCallback((target: number, fromPos: number): number => {
    const dist = Math.abs(target - fromPos);
    const dur = Math.max(1.2, dist * 0.075);
    safe(() => {
      setRedDir(target > fromPos ? "right" : "left");
      redPosRef.current = target;
      setRedPosX(target);
      setRedWalkDur(dur);
      setRedState("walking");
    });
    return dur;
  }, []); // eslint-disable-line

  /* blue behaviour scheduler */
  const tick = useCallback(() => {
    if (isFightingRef.current) return;
    const r = Math.random();
    if (r < 0.32) {
      walkBlue(Math.max(4, Math.min(80, Math.random() * 76 + 4)));
    } else if (r < 0.62) {
      showBlueMsg(AMBIENT[Math.floor(Math.random() * AMBIENT.length)]);
    } else if (r < 0.74) {
      safe(() => setBlueState("excited"));
      setTimeout(() => safe(() => setBlueState("idle")), 1400);
    } else if (r < 0.88) {
      safe(() => setBlueState("sleeping"));
      setTimeout(() => safe(() => setBlueState("idle")), 5000);
    } else {
      safe(() => setBlueState("idle"));
    }
  }, [walkBlue, showBlueMsg]); // eslint-disable-line

  /* fight sequence */
  const startFight = useCallback(() => {
    if (isFightingRef.current) return;
    isFightingRef.current = true;

    const bluePos = bluePosRef.current;
    /* red enters from the far edge */
    const redStartX = bluePos > 50 ? 102 : -10;
    const redFightX = bluePos > 50 ? bluePos - 12 : bluePos + 12;
    const blueFightDir = bluePos > 50 ? "left" : "right";

    safe(() => {
      setRedPosX(redStartX);
      redPosRef.current = redStartX;
      setRedVisible(true);
      setRedState("idle");
      setFightPhase("approaching");
    });

    /* red walks toward blue */
    setTimeout(() => {
      if (!mounted.current) return;
      showRedMsg(RED_APPROACH[Math.floor(Math.random() * RED_APPROACH.length)], 2000);
      const dur = walkRed(redFightX, redStartX);

      /* face each other */
      const faceoffMs = dur * 1000 + 300;
      setTimeout(() => {
        safe(() => {
          setBlueDir(blueFightDir);
          setRedDir(bluePos > 50 ? "right" : "left");
          setBlueState("battle");
          setRedState("battle");
          setFightPhase("faceoff");
        });

        /* countdown */
        let cd = 3;
        const countInterval = setInterval(() => {
          if (!mounted.current) { clearInterval(countInterval); return; }
          if (cd === 3) {
            safe(() => { setFightPhase("countdown"); setCountdown(3); });
          } else if (cd === 2) {
            safe(() => setCountdown(2));
          } else if (cd === 1) {
            safe(() => setCountdown(1));
          } else {
            clearInterval(countInterval);
            /* reveal moves */
            const bm = randMove();
            const rm = randMove();
            const result = getWinner(bm, rm);
            safe(() => {
              setBlueMove(bm);
              setRedMove(rm);
              setFightPhase("reveal");
            });

            /* show result */
            setTimeout(() => {
              safe(() => { setFightWinner(result); setFightPhase("result"); });

              /* resolve */
              setTimeout(() => {
                if (result === "a") {
                  /* blue wins — red flees */
                  safe(() => {
                    setBlueState("victory");
                    setRedState("flee");
                    const fleeX = redStartX;
                    setRedDir(redStartX > 50 ? "right" : "left");
                    redPosRef.current = fleeX;
                    setRedPosX(fleeX);
                    setRedWalkDur(1.4);
                  });
                  setTimeout(() => {
                    safe(() => {
                      setRedVisible(false);
                      redPosRef.current = null;
                      setBlueState("idle");
                      setFightPhase("cooldown");
                      setBlueBubble(false);
                      setBlueMsg(null);
                    });
                    setTimeout(() => {
                      safe(() => { setFightPhase("none"); setBlueMove(null); setRedMove(null); setFightWinner(null); });
                      isFightingRef.current = false;
                    }, 1500);
                  }, 2500);

                } else if (result === "b") {
                  /* red wins — blue flees, red takes spot */
                  const blueFlee = blueFightDir === "right" ? -8 : 108;
                  safe(() => {
                    setRedState("victory");
                    setBlueState("flee");
                    setBlueDir(blueFlee < 0 ? "left" : "right");
                    bluePosRef.current = blueFlee;
                    setBluePosX(blueFlee);
                    setBlueWalkDur(1.4);
                    setBlueBubble(false);
                    setBlueMsg(null);
                  });
                  setTimeout(() => {
                    /* red moves to blue's old spot */
                    const redNewX = bluePos;
                    safe(() => {
                      setRedState("walking");
                      setRedDir(redNewX > redFightX ? "right" : "left");
                      redPosRef.current = redNewX;
                      setRedPosX(redNewX);
                      setRedWalkDur(1.0);
                    });
                    setTimeout(() => safe(() => setRedState("idle")), 1300);

                    /* blue re-enters as idle from opposite side after a break */
                    const blueReentry = blueFlee < 0 ? 108 : -8;
                    const blueTarget = Math.max(10, Math.min(75, Math.random() * 65 + 10));
                    setTimeout(() => {
                      safe(() => {
                        bluePosRef.current = blueReentry;
                        setBluePosX(blueReentry);
                        setBlueWalkDur(0.01);
                        setBlueState("walking");
                      });
                      setTimeout(() => {
                        safe(() => {
                          setBlueDir(blueTarget > blueReentry ? "right" : "left");
                          bluePosRef.current = blueTarget;
                          setBluePosX(blueTarget);
                          setBlueWalkDur(Math.max(1.5, Math.abs(blueTarget - blueReentry) * 0.075));
                        });
                        setTimeout(() => safe(() => setBlueState("idle")), 2500);
                      }, 100);
                    }, 3500);

                    safe(() => { setFightPhase("cooldown"); });
                    setTimeout(() => {
                      safe(() => { setFightPhase("none"); setBlueMove(null); setRedMove(null); setFightWinner(null); });
                      isFightingRef.current = false;
                    }, 2000);
                  }, 2200);

                } else {
                  /* draw — both excited, red leaves */
                  safe(() => {
                    setBlueState("excited");
                    setRedState("excited");
                  });
                  setTimeout(() => {
                    safe(() => {
                      setRedState("walking");
                      setRedDir(redStartX > 50 ? "right" : "left");
                      redPosRef.current = redStartX;
                      setRedPosX(redStartX);
                      setRedWalkDur(1.6);
                      setBlueState("idle");
                    });
                    setTimeout(() => {
                      safe(() => { setRedVisible(false); redPosRef.current = null; });
                      safe(() => { setFightPhase("cooldown"); });
                      setTimeout(() => {
                        safe(() => { setFightPhase("none"); setBlueMove(null); setRedMove(null); setFightWinner(null); });
                        isFightingRef.current = false;
                      }, 1500);
                    }, 2000);
                  }, 1600);
                }
              }, 2000);
            }, 2000);
          }
          cd--;
        }, 900);
      }, faceoffMs);
    }, 200);
  }, [showRedMsg, walkRed]); // eslint-disable-line

  /* schedule behaviour + initial greeting + fight timer */
  useEffect(() => {
    const greet = setTimeout(
      () => showBlueMsg({ text: "Hi! 👋 I'm Sayem's little buddy!", cta: "Connect 💬", route: "/contact" }, 4000),
      2200
    );
    const behaveId = setInterval(tick, 3200 + Math.random() * 2400);
    const firstFight = setTimeout(startFight, 18000);
    const fightId = setInterval(() => {
      if (!isFightingRef.current) startFight();
    }, 35000 + Math.random() * 20000);

    return () => {
      clearTimeout(greet);
      clearInterval(behaveId);
      clearTimeout(firstFight);
      clearInterval(fightId);
    };
  }, [tick, showBlueMsg, startFight]);

  /* blue click handler */
  const handleBlueClick = useCallback(() => {
    if (isFightingRef.current) return;
    const n = blueClicks + 1;
    setBlueClicks(n);
    setBlueState("excited");
    if (n % 4 === 0) {
      showBlueMsg({ text: "ok FINE — connect with Sayem? 😤", cta: "Say Hi!", route: "/contact" }, 3000);
    } else {
      showBlueMsg(ON_CLICK[(n - 1) % ON_CLICK.length], 2200);
    }
  }, [blueClicks, showBlueMsg]);

  const blueSleeping = blueState === "sleeping";
  const blueExcited = blueState === "excited";
  const blueWalking = blueState === "walking";
  const blueBattle = blueState === "battle";
  const blueVictory = blueState === "victory";

  const redWalking = redState === "walking";
  const redBattle = redState === "battle";
  const redFlee = redState === "flee";
  const redVictory = redState === "victory";

  const showBattleCard =
    fightPhase !== "none" && fightPhase !== "approaching" && fightPhase !== "cooldown";

  return (
    <>
      {/* battle card */}
      <AnimatePresence>
        {showBattleCard && (
          <BattleCard
            key="battle-card"
            phase={fightPhase}
            countdown={countdown}
            blueMove={blueMove}
            redMove={redMove}
            winner={fightWinner}
          />
        )}
      </AnimatePresence>

      {/* blue robot */}
      <motion.div
        className="fixed z-40 pointer-events-none select-none"
        style={{ bottom: 62 }}
        animate={{ left: `${bluePosX}%` }}
        transition={{ duration: blueWalkDur, ease: "linear" }}
      >
        <div className="relative">
          <AnimatePresence>
            {blueBubble && blueMsg && (
              <Bubble key="blue-bubble" msg={blueMsg} onCta={(route) => navigate(route)} />
            )}
          </AnimatePresence>

          <AnimatePresence>
            {blueSleeping &&
              ([0, 1, 2] as const).map((i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, x: 0, y: 0, scale: 0.4 }}
                  animate={{ opacity: [0, 1, 0], x: 10 + i * 7, y: -(14 + i * 13), scale: 0.4 + i * 0.3 }}
                  transition={{ duration: 1.8, delay: i * 0.65, repeat: Infinity, repeatDelay: 0.4 }}
                  className="absolute top-0 right-0 text-blue-400 font-black pointer-events-none"
                  style={{ fontSize: 9 + i * 3 }}
                >
                  z
                </motion.span>
              ))}
          </AnimatePresence>

          <motion.div
            onClick={handleBlueClick}
            className="pointer-events-auto cursor-pointer"
            title="Click me!"
            animate={{
              scaleX: blueDir === "right" ? 1 : -1,
              y: blueExcited || blueVictory
                ? [0, -16, 0, -10, 0, -5, 0]
                : blueWalking
                ? [0, -4, 0, -4, 0]
                : blueSleeping
                ? [0, -1, 0]
                : blueBattle
                ? [0, -2, 0, -2, 0]
                : [0, -3, 0],
            }}
            transition={{
              scaleX: { duration: 0.18 },
              y: {
                duration: blueExcited || blueVictory ? 0.55 : blueWalking ? 0.48 : blueSleeping ? 3.5 : blueBattle ? 0.3 : 2.2,
                repeat: blueExcited || blueVictory ? 0 : Infinity,
                ease: "easeInOut",
              },
            }}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.88, rotate: [-5, 5, -3, 0] }}
          >
            <BlueBot
              sleeping={blueSleeping}
              excited={blueExcited}
              walking={blueWalking}
              battle={blueBattle}
              victory={blueVictory}
              leg={blueLeg}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* red robot */}
      <AnimatePresence>
        {redVisible && (
          <motion.div
            key="red-bot"
            className="fixed z-40 pointer-events-none select-none"
            style={{ bottom: 62 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, left: `${redPosX}%` }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 0.3 }, left: { duration: redWalkDur, ease: "linear" } }}
          >
            <div className="relative">
              <AnimatePresence>
                {redBubble && redMsg && (
                  <Bubble key="red-bubble" msg={redMsg} onCta={() => {}} />
                )}
              </AnimatePresence>

              <motion.div
                animate={{
                  scaleX: redDir === "right" ? 1 : -1,
                  y: redVictory
                    ? [0, -16, 0, -10, 0, -5, 0]
                    : redWalking || redFlee
                    ? [0, -4, 0, -4, 0]
                    : redBattle
                    ? [0, -2, 0, -2, 0]
                    : [0, -3, 0],
                }}
                transition={{
                  scaleX: { duration: 0.18 },
                  y: {
                    duration: redVictory ? 0.55 : redWalking || redFlee ? 0.48 : redBattle ? 0.3 : 2.2,
                    repeat: redVictory ? 0 : Infinity,
                    ease: "easeInOut",
                  },
                }}
              >
                <RedBot
                  walking={redWalking}
                  battle={redBattle}
                  flee={redFlee}
                  victory={redVictory}
                  leg={redLeg}
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CharacterArena;
