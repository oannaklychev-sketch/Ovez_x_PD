import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import photo1 from "@/assets/photo-1.jpg";
import photo2 from "@/assets/photo-2.jpg";
import photo3 from "@/assets/photo-3.jpg";
import { Loader } from "@/components/Loader";
import { CursorBlob } from "@/components/CursorBlob";
import {
  unlockAudio,
  startAmbient,
} from "@/lib/sounds";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ovez · Tech Support Portfolio" },
      { name: "description", content: "6 месяцев в tech support. Открыт к новым возможностям." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Archivo+Black&family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500&family=Inter:wght@400;500;700&family=Caveat:wght@500;700&family=JetBrains+Mono:wght@400;700&display=swap",
      },
    ],
  }),
  component: Index,
});

const sections = ["Intro", "Story", "Mission", "Skills", "Roles", "Contact"];

function toRoman(n: number) {
  return ["I", "II", "III", "IV", "V", "VI", "VII"][n - 1] ?? String(n);
}

/* ---------- Sidebar / TopBar ---------- */
function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 bottom-0 w-[52px] z-40 hidden md:flex flex-col items-center justify-between border-r border-border bg-background/80 backdrop-blur">
      <div className="flex flex-col items-center gap-6 pt-5">
        <button aria-label="menu" className="flex flex-col gap-[3px]">
          <span className="block w-5 h-[2px] bg-foreground" />
          <span className="block w-5 h-[2px] bg-foreground" />
        </button>
      </div>
      <ul className="flex flex-col gap-7 text-[10px] tracking-[0.2em] text-muted-foreground">
        {sections.map((s, i) => (
          <li key={s} className="writing-vertical">
            <a href={`#sec-${i}`} className="hover:text-brand transition-colors">
              {toRoman(i + 1)}. {s.toUpperCase()}
            </a>
          </li>
        ))}
      </ul>
      <a
        href="#sec-5"
        className="bg-brand text-background w-full py-6 flex items-center justify-center text-[10px] font-bold tracking-[0.25em]"
      >
        <span className="writing-vertical">LET'S CONNECT ↗</span>
      </a>
    </aside>
  );
}

function TopBar() {
  return (
    <header className="fixed top-0 left-0 md:left-[52px] right-0 z-30 px-4 md:px-8 py-4 md:py-5 flex items-center justify-between mix-blend-difference text-foreground">
      <a href="#sec-0" className="font-display text-xl md:text-2xl text-brand">T<span className="text-foreground">.</span>S</a>
      <div className="flex items-center gap-2 md:gap-3 text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
        <span className="hidden md:inline">Social</span>
        <a href="https://www.linkedin.com/in/ovez-annaklychev" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-9 h-9 md:w-10 md:h-10 border border-border flex items-center justify-center hover:border-brand hover:text-brand transition">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2zM8 19H5v-9h3v9zM6.5 8.25A1.75 1.75 0 1 1 8.3 6.5a1.75 1.75 0 0 1-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0 0 13 14.19a.66.66 0 0 0 0 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 0 1 2.7-1.4c1.55 0 3.36.86 3.36 3.66z"/></svg>
        </a>
        <a href="https://t.me/i_am_ObeOne" target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="w-9 h-9 md:w-10 md:h-10 border border-border flex items-center justify-center hover:border-brand hover:text-brand transition">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"/></svg>
        </a>
        <a href="mailto:o.annaklychev@finvk.com" aria-label="Email" className="w-9 h-9 md:w-10 md:h-10 border border-border flex items-center justify-center hover:border-brand hover:text-brand transition">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>
        </a>
      </div>
    </header>
  );
}

/* ---------- Hero with parallax ---------- */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section id="sec-0" ref={ref} className="relative min-h-screen overflow-hidden md:pl-[52px]">
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0 md:inset-y-0 md:right-0 md:left-auto md:w-[48%]"
      >
        <img src={photo1} alt="" className="w-full h-full object-cover object-center grayscale opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-background via-background/70 md:via-background/40 to-transparent" />
      </motion.div>

      <motion.div style={{ y: textY, opacity }} className="relative z-10 px-6 md:px-12 pt-28 pb-16 min-h-screen flex flex-col justify-center">
        <h1 className="font-display text-brand text-[14vw] md:text-[13vw] leading-[0.82] break-words max-w-[90vw]">
          {["I FIX SYSTEMS", "I SOLVE PROBLEMS", "I LEARN FAST", "I SHIP RESULTS"].map((w, i) => (
            <motion.div
              key={w}
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.12, duration: 0.7, ease: "easeOut" }}
              className={[null, "md:pl-[8vw]", "md:pl-[2vw]", null][i] || ""}
            >
              {w}
            </motion.div>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-10 md:mt-12 max-w-xs text-sm leading-relaxed"
        >
          <p className="font-bold uppercase tracking-[0.2em] text-muted-foreground">Tech support specialist</p>
        </motion.div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-6 left-6 md:left-[72px] flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-muted-foreground z-10"
      >
        <span className="w-8 h-px bg-current" /> Scroll to discover
      </motion.div>
    </section>
  );
}

/* ---------- Statement w/ word fade ---------- */
function StatementWord({ word, progress, start, end }: { word: string; progress: ReturnType<typeof useScroll>["scrollYProgress"]; start: number; end: number }) {
  const opacity = useTransform(progress, [start, end], [0.15, 1]);
  return <motion.span style={{ opacity }}>{word}</motion.span>;
}

function Statement() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "end 0.3"] });
  const words = "За 6 месяцев в techsupport я понял главное: поддержка—это не ответы. Это скорость мышления, точные решения и контроль в реальном времени.".split(" ");
  return (
    <section id="sec-1" ref={ref} className="md:pl-[52px] py-32 md:py-48 px-6 md:px-12 border-t border-border bg-[#0a0807]">
      <p className="text-[10px] tracking-[0.3em] uppercase text-brand mb-16">— I. My story</p>
      <h2 className="font-serif text-cream text-3xl md:text-6xl leading-[1.15] max-w-5xl flex flex-wrap gap-x-3 gap-y-1">
        {words.map((w, i) => (
          <StatementWord
            key={i}
            word={w}
            progress={scrollYProgress}
            start={i / words.length}
            end={(i + 1) / words.length}
          />
        ))}
      </h2>
    </section>
  );
}

/* ---------- Marquee with scroll velocity ---------- */
function Marquee() {
  const { scrollYProgress } = useScroll();
  const x = useSpring(useTransform(scrollYProgress, [0, 1], [0, -300]), { damping: 30, stiffness: 100 });
  const items = ["Support", "·", "Solver", "·", "Communicator", "·", "Learner", "·"];
  const repeated = [...items, ...items, ...items, ...items];
  return (
    <div className="md:pl-[52px] border-y border-border py-6 overflow-hidden bg-[#0a0807]">
      <motion.div style={{ x }} className="flex marquee-track whitespace-nowrap gap-10 font-display text-brand text-[14vw] md:text-[10vw]">
        {repeated.map((t, i) => (
          <span key={i} className={i % 2 === 0 ? "" : "text-foreground"}>{t}</span>
        ))}
      </motion.div>
    </div>
  );
}

/* ---------- Mission ---------- */
function Mission() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [-50, 80]);
  const lines = ["REAL CASES", "REAL ERRORS", "REAL EXPERIENCE", "—", "GETTING FASTER", "EVERY DAY."];
  return (
    <section ref={ref} id="sec-2" className="md:pl-[52px] px-6 md:px-12 py-32 md:py-48 border-t border-border grid grid-cols-12 gap-6 bg-[#0a0807]">
      <div className="col-span-12 md:col-span-4">
        <div className="aspect-[3/4] overflow-hidden border border-border">
          <motion.img style={{ y: imgY }} src={photo2} alt="Portrait" className="w-full h-[110%] object-cover grayscale brightness-90" />
        </div>
        <p className="mt-4 text-[10px] tracking-[0.3em] uppercase text-muted-foreground">— II. Mission</p>
      </div>
      <div className="col-span-12 md:col-span-8">
        <h3 className="font-display text-foreground text-4xl md:text-8xl leading-[0.9]">
          {lines.map((l, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.55, delay: i * 0.05, ease: "easeOut" }}
              className={i === 3 ? "text-brand" : ""}
            >
              {l}
            </motion.div>
          ))}
        </h3>
        <a href="#sec-5" className="mt-12 inline-flex items-center gap-3 text-brand border-b border-brand pb-1 text-sm tracking-widest uppercase hover:text-foreground hover:border-foreground transition-all">My story ↗</a>
      </div>
    </section>
  );
}

/* ---------- Skills ---------- */
function Skills() {
  const items = [
    ["01", "MERCHANT OPERATIONS", "Работа с транзакциями и инцидентами в реальном времени."],
    ["02", "API DEBUGGING", "Диагностика ошибок, логов и интеграций."],
    ["03", "TECH COMMUNICATION", "Связь между бизнесом и разработкой."],
    ["04", "RAPID LEARNING", "Осваиваю новый стек быстрее, чем он устаревает."],
  ];
  return (
    <section id="sec-3" className="md:pl-[52px] px-6 md:px-12 py-24 border-t border-border bg-[#0a0807]">
      <div className="grid grid-cols-12 gap-6 mb-16">
        <p className="col-span-12 md:col-span-4 text-[10px] tracking-[0.3em] uppercase text-muted-foreground">— III. What I do</p>
        <h3 className="col-span-12 md:col-span-8 font-display text-foreground text-3xl md:text-6xl">
          NO “LATER”. <span className="text-brand">ONLY SOLUTIONS.</span>
        </h3>
      </div>
      <div>
        {items.map(([n, t, d], idx) => (
          <motion.div
            key={n}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
            className="grid grid-cols-12 gap-4 md:gap-6 py-8 border-t border-border group hover:bg-brand/5 transition-colors px-2"
          >
            <div className="col-span-2 md:col-span-1 text-sm text-brand font-bold">{n}</div>
            <div className="col-span-10 md:col-span-5 font-display text-xl md:text-4xl group-hover:translate-x-2 transition-transform duration-500">{t}</div>
            <div className="col-span-12 md:col-span-5 md:col-start-8 text-muted-foreground text-sm md:text-base leading-relaxed">{d}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Brands() {
  const tags = ["Merchants", "API", "Operations", "Logs", "Tickets", "SLA", "Postman", "Slack", "Jira", "Notion", "SQL", "Webhooks"];
  return (
    <section className="md:pl-[52px] px-6 md:px-12 py-20 border-t border-border bg-[#0a0807]">
      <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-8">— Toolkit</p>
      <div className="flex flex-wrap gap-3">
        {tags.map((t, i) => (
          <motion.span
            key={t}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
            className="border border-border px-5 py-3 text-xs tracking-[0.15em] uppercase hover:border-brand hover:text-brand transition cursor-default"
          >
            {t}
          </motion.span>
        ))}
      </div>
    </section>
  );
}

function Roles() {
  return (
    <section id="sec-4" className="md:pl-[52px] px-6 md:px-12 py-24 md:py-32 border-t border-border grid grid-cols-12 gap-6 items-center bg-[#0a0807]">
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="col-span-12 md:col-span-6 border border-border"
      >
        <img src={photo3} alt="Portrait" className="w-full aspect-[4/5] object-cover grayscale brightness-75" />
      </motion.div>
      <div className="col-span-12 md:col-span-5 md:col-start-8">
        <p className="text-[10px] tracking-[0.3em] uppercase text-brand mb-6">— IV. You can call me</p>
        <h2 className="font-display text-foreground text-4xl md:text-8xl leading-[0.85]">
          {["JUNIOR", "WITH", "SENIOR", "MINDSET."].map((w, i) => (
            <motion.div
              key={w}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className={w === "SENIOR" ? "text-brand" : ""}
            >
              {w}
            </motion.div>
          ))}
        </h2>
        <p className="mt-8 text-foreground max-w-md font-display text-2xl md:text-3xl leading-tight">
          Скорость.<br/>Точность.<br/><span className="text-brand">Результат.</span>
        </p>
      </div>
    </section>
  );
}

function Quote() {
  return (
    <section className="md:pl-[52px] px-6 md:px-12 py-32 md:py-48 border-t border-border text-center bg-[#0a0807]">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="font-serif text-cream text-2xl md:text-6xl leading-[1.2] max-w-4xl mx-auto"
      >
        «Дедлайны, которые уже прошли,<br/>учат думать быстрее<br/>и действовать точнее.»
      </motion.h2>
      <p className="font-script text-brand text-3xl md:text-4xl mt-12">— me, after 6 months</p>
    </section>
  );
}

function Contact() {
  return (
    <section id="sec-5" className="md:pl-[52px] px-6 md:px-12 py-32 border-t border-border bg-[#0a0807]">
      <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-12">— VI. Let's have a chat</p>
      <h2 className="font-display text-foreground text-5xl md:text-[14vw] leading-[0.85]">
        LET'S<br/>WORK<br/><span className="text-brand">TOGETHER.</span>
      </h2>
      <div className="mt-20 grid grid-cols-12 gap-6 border-t border-border pt-10">
        {[
          ["Email me", "o.annaklychev@finvk.com ↗", "mailto:o.annaklychev@finvk.com"],
          ["Telegram", "@i_am_ObeOne ↗", "https://t.me/i_am_ObeOne"],
          ["LinkedIn", "ovez-annaklychev ↗", "https://www.linkedin.com/in/ovez-annaklychev"],
        ].map(([label, value, href]) => (
          <a key={label} href={href} className="col-span-12 md:col-span-4 group border border-border/20 p-6 hover:bg-brand/5 transition-all">
            <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{label}</div>
            <div className="font-display text-xl md:text-2xl mt-2 group-hover:text-brand transition break-all">{value}</div>
          </a>
        ))}
      </div>
      <div className="mt-32 flex flex-wrap items-end justify-between gap-8 border-t border-border pt-8">
        <div className="flex flex-wrap gap-6 md:gap-8">
          {[
            ["LinkedIn", "https://www.linkedin.com/in/ovez-annaklychev"],
            ["Telegram", "https://t.me/i_am_ObeOne"],
            ["Email", "mailto:o.annaklychev@finvk.com"],
          ].map(([l, h]) => (
            <a key={l} href={h} className="text-brand text-sm tracking-widest uppercase border-b border-brand pb-1 hover:text-foreground hover:border-foreground transition-all">{l} ↗</a>
          ))}
        </div>
        <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground space-y-2">
          <div>© 2026 — Ovez Annaklychev · Tech Support</div>
          <div className="flex gap-4 normal-case tracking-normal">
            <a href="/privacy" className="hover:text-brand transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-brand transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Index() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loaded) {
      startAmbient();
    }
  }, [loaded]);

  return (
    <>
      {!loaded && <Loader onDone={() => setLoaded(true)} />}
      <main className="bg-[#0a0807] text-foreground relative min-h-screen">
        <CursorBlob />
        <Sidebar />
        <TopBar />
        <Hero />
        <Statement />
        <Marquee />
        <Mission />
        <Skills />
        <Brands />
        <Roles />
        <Quote />
        <Contact />
      </main>
    </>
  );
}
