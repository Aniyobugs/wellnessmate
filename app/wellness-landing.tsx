"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  Flower2,
  Leaf,
  Menu,
  Sprout,
  Sun,
  X,
} from "lucide-react";
import { useState, type ComponentType, type ReactNode, type SVGProps } from "react";

type Icon = ComponentType<
  SVGProps<SVGSVGElement> & {
    size?: number | string;
    strokeWidth?: number | string;
  }
>;

const navItems = ["Home", "About", "Services", "Programs", "Blog", "Contact"];

const features: Array<{
  title: string;
  body: string;
  icon: Icon;
  tone: "sage" | "blush" | "gold";
}> = [
  {
    title: "Holistic Approach",
    body: "Mind, body and soul working together.",
    icon: Sprout,
    tone: "sage",
  },
  {
    title: "Personalized Plans",
    body: "Tailored guidance that fits your life.",
    icon: Flower2,
    tone: "blush",
  },
  {
    title: "Lasting Results",
    body: "Sustainable habits for long-term wellbeing.",
    icon: Sun,
    tone: "gold",
  },
];

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={`reveal ${className}`}
      style={{ animationDelay: `${delay}s` }}
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
    >
      {children}
    </motion.div>
  );
}

function MagneticButton({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "text";
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 18 });
  const springY = useSpring(y, { stiffness: 260, damping: 18 });

  return (
    <motion.a
      href={href}
      className={`magnetic-link ${variant}`}
      style={{ x: springX, y: springY }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - rect.left - rect.width / 2) * 0.14);
        y.set((event.clientY - rect.top - rect.height / 2) * 0.14);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      whileHover={{ scale: variant === "primary" ? 1.03 : 1 }}
      whileTap={{ scale: 0.98 }}
    >
      <span>{children}</span>
      <ArrowRight size={18} strokeWidth={1.5} aria-hidden />
    </motion.a>
  );
}

function Logo() {
  return (
    <a className="logo" href="#home" aria-label="Lumina home">
      <svg className="logo-symbol" viewBox="0 0 58 58" fill="none" aria-hidden>
        <path d="M29 53V19" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path
          d="M29 25C18 23 12 15 12 5C23 7 29 15 29 25Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <path
          d="M29 25C40 23 46 15 46 5C35 7 29 15 29 25Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <path
          d="M29 33C17 34 8 27 6 15C19 16 27 23 29 33Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <path
          d="M29 33C41 34 50 27 52 15C39 16 31 23 29 33Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
      </svg>
      <span>
        <strong>Lumina</strong>
        <small>Wellness Coach</small>
      </span>
    </a>
  );
}

function BotanicalLine() {
  return (
    <svg
      className="botanical-line"
      width="242"
      height="96"
      viewBox="0 0 242 96"
      fill="none"
      aria-hidden
    >
      <path
        d="M8 78C43 55 68 42 101 30C139 16 177 14 229 8"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path d="M54 51C50 34 57 24 71 15C73 31 68 43 54 51Z" stroke="currentColor" />
      <path d="M83 38C82 20 91 10 109 4C108 22 99 33 83 38Z" stroke="currentColor" />
      <path d="M111 28C114 12 126 4 145 1C140 18 129 27 111 28Z" stroke="currentColor" />
      <path d="M139 21C145 8 158 3 176 4C168 18 156 23 139 21Z" stroke="currentColor" />
      <path d="M49 54C32 51 22 59 15 75C32 78 44 70 49 54Z" stroke="currentColor" />
      <path d="M78 42C61 41 49 50 42 68C60 68 72 59 78 42Z" stroke="currentColor" />
      <path d="M108 31C91 31 80 42 74 60C91 59 103 49 108 31Z" stroke="currentColor" />
      <path d="M137 23C120 25 110 36 106 54C123 51 134 41 137 23Z" stroke="currentColor" />
      <path d="M166 18C151 21 142 32 140 49C156 45 165 35 166 18Z" stroke="currentColor" />
    </svg>
  );
}

export default function WellnessLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const imageScale = useTransform(scrollYProgress, [0, 0.22], [1, 1.07]);
  const imageY = useTransform(scrollYProgress, [0, 0.22], [0, -56]);

  return (
    <main id="home" className="lumina-page">
      <header className="navbar">
        <Logo />

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`}>
              {item}
            </a>
          ))}
        </nav>

        <a className="nav-cta" href="#contact">
          Work with me
        </a>

        <button
          className="menu-button"
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>

        {menuOpen ? (
          <motion.nav
            className="mobile-nav"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <a href="#contact" onClick={() => setMenuOpen(false)}>
              Work with me
            </a>
          </motion.nav>
        ) : null}
      </header>

      <section className="hero">
        <div className="hero-glow" />

        <Reveal className="hero-content">
          <p className="eyebrow">Mind. Body. Balance.</p>
          <h1>
            Wellness is not a
            <br />
            destination,
            <br />
            <em>it&apos;s a way of living.</em>
          </h1>
          <p className="hero-copy">
            I help you create sustainable habits, reduce stress and build a
            life that feels good on the inside and out.
          </p>
          <div className="hero-actions">
            <MagneticButton href="#contact">Work with me</MagneticButton>
            <MagneticButton href="#programs" variant="text">
              Explore programs
            </MagneticButton>
          </div>
        </Reveal>

        <motion.div
          className="hero-image"
          style={reduceMotion ? undefined : { scale: imageScale, y: imageY }}
        >
          <Image
            src="/wellness-hero.png"
            alt="Wellness coach breathing deeply in golden mountain light"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 68vw"
          />
        </motion.div>

        <motion.div
          className="floating-badge"
          animate={reduceMotion ? undefined : { y: [0, -13, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Leaf size={30} strokeWidth={1.1} aria-hidden />
          <p>Small steps create big changes.</p>
          <span />
        </motion.div>

        <BotanicalLine />

        <a className="scroll-indicator" href="#about">
          <span>Scroll to discover</span>
          <ArrowDown size={27} strokeWidth={1.25} aria-hidden />
        </a>

        <svg
          className="wave-divider"
          viewBox="0 0 1440 150"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            d="M0 63C151 125 291 113 461 90C656 64 801 106 979 91C1173 75 1276 45 1440 76V150H0V63Z"
            fill="#FAF7F2"
          />
        </svg>
      </section>

      <section id="about" className="intro-section">
        <Reveal className="intro-copy">
          <p className="script-line">hi, I&apos;m</p>
          <h2>
            I&apos;m here to help you <em>become your best self.</em>
          </h2>
          <p>
            As a certified wellness coach, I combine proven strategies with a
            holistic approach to help you feel more energized, confident and in
            control.
          </p>
        </Reveal>

        <div className="feature-grid">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <Reveal
                key={feature.title}
                className="feature-card"
                delay={0.08 + index * 0.08}
              >
                <motion.div
                  className={`feature-icon ${feature.tone}`}
                  whileHover={{ scale: 1.08, rotate: index === 1 ? 4 : -4 }}
                >
                  <Icon size={42} strokeWidth={1.15} aria-hidden />
                </motion.div>
                <h3>{feature.title}</h3>
                <p>{feature.body}</p>
              </Reveal>
            );
          })}
        </div>
      </section>
    </main>
  );
}
