import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Send, RotateCcw, Github, Linkedin, Mail, Briefcase } from "lucide-react";

type Step = "name" | "email" | "message" | "done";

const BOT_PROMPTS: Record<Step, (name?: string) => string> = {
  name: () => "Hey there! 👋 I'm Sayem. What's your name?",
  email: (name) => `Nice to meet you, ${name}! 🙌 What's your email address?`,
  message: () => "Got it! What would you like to talk about?",
  done: () => "Perfect — here's your message. Ready to send? 🚀",
};

const STEPS: Step[] = ["name", "email", "message", "done"];

type Message = { from: "bot" | "user"; text: string };

const socialLinks = [
  { icon: Mail, label: "Email", href: "mailto:sayemabedin.bd@gmail.com", color: "text-blue-400" },
  { icon: Github, label: "GitHub", href: "https://github.com/Sayem98", color: "text-foreground" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/sayem-abedin/", color: "text-blue-500" },
  { icon: Briefcase, label: "Upwork", href: "https://www.upwork.com/freelancers/~01ed29c46ac701c056", color: "text-green-500" },
  { icon: Briefcase, label: "Fiverr", href: "https://www.fiverr.com/sellers/sayem_abedin", color: "text-emerald-400" },
];

const TypingIndicator = () => (
  <div className="flex justify-start">
    <div className="flex items-center gap-1 px-4 py-3 rounded-2xl rounded-bl-sm bg-muted border border-border">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-muted-foreground"
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  </div>
);

const Contact = () => {
  const [step, setStep] = useState<Step>("name");
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [sent, setSent] = useState(false);

  const inputRef = useRef<HTMLInputElement & HTMLTextAreaElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Initial bot message
  useEffect(() => {
    setIsTyping(true);
    const t = setTimeout(() => {
      setMessages([{ from: "bot", text: BOT_PROMPTS.name() }]);
      setIsTyping(false);
    }, 700);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    if (!isTyping && step !== "done") {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [messages, isTyping, step]);

  const addBotMessage = (text: string, delay = 900) => {
    setIsTyping(true);
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setMessages((prev) => [...prev, { from: "bot", text }]);
        setIsTyping(false);
        resolve();
      }, delay);
    });
  };

  const handleSubmit = async () => {
    const trimmed = input.trim();
    if (!trimmed || isTyping) return;

    const stepIdx = STEPS.indexOf(step);
    const newValues = { ...values };

    // Add user bubble
    setMessages((prev) => [...prev, { from: "user", text: trimmed }]);
    setInput("");

    if (step === "name") {
      newValues.name = trimmed;
      setValues(newValues);
      setStep("email");
      await addBotMessage(BOT_PROMPTS.email(trimmed));
    } else if (step === "email") {
      newValues.email = trimmed;
      setValues(newValues);
      setStep("message");
      await addBotMessage(BOT_PROMPTS.message());
    } else if (step === "message") {
      newValues.message = trimmed;
      setValues(newValues);
      setStep("done");
      await addBotMessage(BOT_PROMPTS.done(), 1000);
    }

    void stepIdx; // suppress unused warning
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSend = () => {
    const subject = encodeURIComponent(`Portfolio Contact from ${values.name}`);
    const body = encodeURIComponent(
      `Name: ${values.name}\nEmail: ${values.email}\n\nMessage:\n${values.message}`
    );
    window.open(`mailto:sayemabedin.bd@gmail.com?subject=${subject}&body=${body}`);
    setSent(true);
    addBotMessage(`Thanks ${values.name}! 🎉 Your email client should be open. I'll reply within 24 hours. Talk soon!`, 600);
  };

  const handleReset = () => {
    setStep("name");
    setValues({ name: "", email: "", message: "" });
    setInput("");
    setSent(false);
    setMessages([]);
    setIsTyping(true);
    setTimeout(() => {
      setMessages([{ from: "bot", text: BOT_PROMPTS.name() }]);
      setIsTyping(false);
    }, 700);
  };

  const stepLabels: Step[] = ["name", "email", "message", "done"];
  const currentStepIdx = stepLabels.indexOf(step);

  return (
    <section className="w-full px-4 py-8 text-foreground flex flex-col items-center">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-2">Get in Touch</h2>
        <p className="text-muted-foreground text-sm">
          Let's start a conversation — I'll reply within 24 hours.
        </p>
      </motion.div>

      {/* Chat window */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="w-full max-w-md rounded-2xl border border-border bg-background/70 backdrop-blur-md shadow-lg overflow-hidden"
      >
        {/* Window chrome */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/40">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <span className="text-[11px] font-mono text-muted-foreground">sayem.me — new message</span>
          <button
            onClick={handleReset}
            title="Start over"
            className="p-1 rounded hover:bg-accent transition text-muted-foreground hover:text-foreground"
          >
            <RotateCcw size={12} />
          </button>
        </div>

        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2 py-2 border-b border-border/50 bg-muted/20">
          {["Name", "Email", "Message", "Send"].map((label, i) => (
            <div key={label} className="flex items-center gap-1.5">
              <div
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  i <= currentStepIdx ? "bg-primary" : "bg-border"
                }`}
              />
              <span
                className={`text-[10px] font-medium transition-colors duration-300 ${
                  i <= currentStepIdx ? "text-primary" : "text-muted-foreground/50"
                }`}
              >
                {label}
              </span>
              {i < 3 && (
                <div
                  className={`w-4 h-px transition-colors duration-300 ${
                    i < currentStepIdx ? "bg-primary/60" : "bg-border"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Messages */}
        <div className="h-64 overflow-y-auto px-4 py-4 space-y-3 no-scrollbar">
          <AnimatePresence initial={false}>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.22 }}
                className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.from === "bot" && (
                  <img
                    src="/assets/me2.jpg"
                    alt="Sayem"
                    className="w-7 h-7 rounded-full object-cover mr-2 self-end flex-shrink-0 border border-border"
                  />
                )}
                <div
                  className={`max-w-[80%] px-3.5 py-2.5 text-sm leading-relaxed ${
                    msg.from === "user"
                      ? "bg-primary text-white rounded-2xl rounded-br-sm shadow-sm"
                      : "bg-muted border border-border text-foreground rounded-2xl rounded-bl-sm"
                  }`}
                >
                  {msg.text}
                </div>
              </motion.div>
            ))}

            {isTyping && (
              <motion.div
                key="typing"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-end gap-2"
              >
                <img
                  src="/assets/me2.jpg"
                  alt="Sayem"
                  className="w-7 h-7 rounded-full object-cover border border-border flex-shrink-0"
                />
                <TypingIndicator />
              </motion.div>
            )}

            {/* Summary card */}
            {step === "done" && !isTyping && (
              <motion.div
                key="summary"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex justify-start"
              >
                <div className="max-w-[85%] ml-9 px-3.5 py-3 rounded-2xl rounded-bl-sm bg-primary/5 border border-primary/20 text-sm space-y-1">
                  <p className="text-xs font-semibold text-primary mb-1.5 uppercase tracking-wide">Message Preview</p>
                  <p className="text-foreground/90"><span className="text-muted-foreground">From:</span> {values.name}</p>
                  <p className="text-foreground/90 truncate"><span className="text-muted-foreground">Email:</span> {values.email}</p>
                  <p className="text-foreground/90 line-clamp-2"><span className="text-muted-foreground">Note:</span> {values.message}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={bottomRef} />
        </div>

        {/* Input area */}
        <div className="border-t border-border bg-background/50">
          {step !== "done" ? (
            <div className="flex items-end gap-2 px-3 py-2.5">
              {step === "message" ? (
                <textarea
                  ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message... (Enter to send)"
                  rows={2}
                  disabled={isTyping}
                  className="flex-1 resize-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60 outline-none py-1 disabled:opacity-40"
                />
              ) : (
                <input
                  ref={inputRef as React.RefObject<HTMLInputElement>}
                  type={step === "email" ? "email" : "text"}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={
                    step === "name"
                      ? "Your name..."
                      : step === "email"
                      ? "your@email.com"
                      : ""
                  }
                  disabled={isTyping}
                  className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60 outline-none py-1 disabled:opacity-40"
                />
              )}
              <button
                onClick={handleSubmit}
                disabled={!input.trim() || isTyping}
                className="p-2 rounded-xl bg-primary text-white disabled:opacity-30 hover:bg-primary/90 active:scale-95 transition-all flex-shrink-0"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              {!sent ? (
                <motion.div
                  key="send-actions"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2 px-3 py-2.5"
                >
                  <button
                    onClick={handleReset}
                    className="flex-1 py-2 text-xs font-medium rounded-xl border border-border text-muted-foreground hover:bg-accent transition-all"
                  >
                    Start over
                  </button>
                  <button
                    onClick={handleSend}
                    className="flex-1 py-2 text-xs font-semibold rounded-xl bg-primary text-white hover:bg-primary/90 active:scale-[0.98] transition-all flex items-center justify-center gap-1.5"
                  >
                    <Send size={13} />
                    Send Message
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="sent-action"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="px-3 py-2.5"
                >
                  <button
                    onClick={handleReset}
                    className="w-full py-2 text-xs font-medium rounded-xl border border-border text-muted-foreground hover:bg-accent transition-all"
                  >
                    Send another message
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </motion.div>

      {/* Social links */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="mt-6 flex flex-wrap justify-center gap-2"
      >
        {socialLinks.map(({ icon: Icon, label, href, color }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("mailto") ? undefined : "_blank"}
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border text-xs font-medium text-muted-foreground hover:text-foreground hover:border-primary/30 hover:bg-accent transition-all duration-200"
          >
            <Icon size={12} className={color} />
            {label}
          </a>
        ))}
      </motion.div>

      {/* Availability note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-5 text-xs text-muted-foreground flex items-center gap-1.5"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
        Available for freelance & full-time opportunities · Dhaka, Bangladesh
      </motion.p>
    </section>
  );
};

export default Contact;
