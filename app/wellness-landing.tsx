"use client";

import Image from "next/image";
import gsap from "gsap";
import {
  animate,
  AnimatePresence,
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
  ArrowUp,
  Check,
  Flower2,
  Handshake,
  Leaf,
  Menu,
  MousePointer2,
  Sprout,
  Sun,
  X,
} from "lucide-react";
import { useEffect, useState, useRef, type ComponentType, type ReactNode, type SVGProps } from "react";
import { useLenis } from "lenis/react";

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

const specialties = ["Nervous System", "Nutrition", "Mindful Movement", "Sleep", "Stress Reset"];

const processSteps = [
  {
    title: "Discovery",
    points: ["Lifestyle audit", "Energy patterns", "Goal mapping"],
  },
  {
    title: "Rituals",
    points: ["Morning anchors", "Meal rhythm", "Breath practice"],
  },
  {
    title: "Coaching",
    points: ["Weekly check-ins", "Habit refinement", "Mindset support"],
  },
  {
    title: "Integration",
    points: ["Real-life systems", "Recovery windows", "Progress reviews"],
  },
  {
    title: "Momentum",
    points: ["Sustainable plan", "Confidence building", "Long-term care"],
  },
];

const programs = [
  {
    title: "Calm Body Reset",
    meta: "4 weeks - stress recovery",
    body: "A guided reset for sleep, breath, food rhythm and gentle movement.",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Radiant Habits",
    meta: "8 weeks - daily coaching",
    body: "Small repeatable practices that create visible energy and steadier moods.",
    image: "https://images.unsplash.com/photo-1512438248247-f0f2a5a8b7f0?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Deep Wellness Lab",
    meta: "12 weeks - full support",
    body: "A complete lifestyle rebuild with coaching, rituals, and accountability.",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop"
  },
];

const manifesto = [
  "Start softer",
  "Listen deeper",
  "Move daily",
  "Nourish simply",
  "Recover fully",
  "Live awake",
];

function Loader() {
  const reduceMotion = useReducedMotion();
  const [done, setDone] = useState(false);
  const progressRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (reduceMotion) return;
    const controls = animate(0, 100, {
      duration: 1.35,
      ease: [0.77, 0, 0.18, 1],
      onUpdate: (latest) => {
        if (progressRef.current) {
          progressRef.current.innerHTML = `${Math.round(latest)}<span>%</span>`;
        }
      }
    });
    return () => controls.stop();
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion) {
      const timer = window.setTimeout(() => setDone(true), 250);
      return () => window.clearTimeout(timer);
    }

    let isMounted = true;
    let timeoutId: number;

    const loadAssets = async () => {
      try {
        if (document.fonts) {
          await document.fonts.ready;
        }
        
        const images = Array.from(document.images);
        const imagePromises = images.map((img) => {
          if (img.complete) return Promise.resolve();
          return new Promise((resolve) => {
            img.onload = resolve;
            img.onerror = resolve;
          });
        });

        await Promise.all(imagePromises);
      } catch (error) {
        console.warn("Asset preloading error:", error);
      }
    };

    const minWait = new Promise((resolve) => setTimeout(resolve, 1500));
    const maxWait = new Promise((resolve) => {
      timeoutId = window.setTimeout(resolve, 4000);
    });

    Promise.race([
      Promise.all([loadAssets(), minWait]),
      maxWait
    ]).then(() => {
      if (isMounted) setDone(true);
    });

    return () => {
      isMounted = false;
      window.clearTimeout(timeoutId);
    };
  }, [reduceMotion]);

  return (
    <motion.div
      className="site-loader"
      initial={false}
      animate={{ y: done ? "-100%" : "0%", pointerEvents: done ? "none" : "auto" }}
      transition={{ duration: 0.9, ease: [0.77, 0, 0.18, 1] }}
      aria-hidden={done}
    >
      <div className="loader-bars">
        {Array.from({ length: 7 }).map((_, index) => (
          <motion.span
            key={index}
            initial={{ scaleY: 1 }}
            animate={reduceMotion ? { scaleY: 0 } : { scaleY: [1, 1, 0] }}
            transition={{
              duration: 1.15,
              delay: 0.25 + index * 0.08,
              ease: [0.77, 0, 0.18, 1],
            }}
          />
        ))}
      </div>
      <motion.div
        className="loader-copy"
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: done ? 0 : 1, y: done ? -20 : 0 }}
      >
        <h1>LOADING</h1>
        <p>Please breathe</p>
        <strong ref={progressRef}>0<span>%</span></strong>
        <div className="loader-track">
          <motion.i
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: reduceMotion ? 0.1 : 1.15, ease: "easeInOut" }}
          />
        </div>
        <p>Preparing your wellness space</p>
        <small>READY</small>
      </motion.div>
    </motion.div>
  );
}

function CursorAura() {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(-20);
  const y = useMotionValue(-20);
  const springX = useSpring(x, { stiffness: 420, damping: 34 });
  const springY = useSpring(y, { stiffness: 420, damping: 34 });

  useEffect(() => {
    if (reduceMotion) return;

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX - 5);
      y.set(event.clientY - 5);
    };

    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduceMotion, x, y]);

  if (reduceMotion) return null;

  return (
    <>
      <motion.div className="cursor-dot" style={{ x: springX, y: springY }} />
      <motion.div
        className="cursor-label"
        style={{ x: springX, y: springY }}
        aria-hidden
      >
        flow
      </motion.div>
    </>
  );
}

function ScrollRail() {
  const scrollYProgress = useMotionValue(0);
  const scrollVelocity = useMotionValue(0);

  useLenis(({ progress, velocity }) => {
    scrollYProgress.set(progress);
    scrollVelocity.set(velocity);
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 26 });
  const skewX = useTransform(scrollVelocity, [-20, 0, 20], [15, 0, -15]);

  return (
    <div className="scroll-rail-wrapper">
      <motion.span className="scroll-label" style={{ skewX }} aria-hidden>
        EXPLORE
      </motion.span>
      <div className="scroll-rail" aria-hidden>
        <motion.span style={{ scaleY }} />
      </div>
    </div>
  );
}

function BackToTop() {
  const lenis = useLenis();
  const scrollYProgress = useMotionValue(0);
  
  useLenis(({ progress }) => {
    scrollYProgress.set(progress);
  });

  const opacity = useTransform(scrollYProgress, [0.1, 0.2], [0, 1]);
  const pointerEvents = useTransform(scrollYProgress, (p) => (p > 0.1 ? "auto" : "none"));
  const y = useTransform(scrollYProgress, [0.1, 0.2], [24, 0]);

  const xMouse = useMotionValue(0);
  const yMouse = useMotionValue(0);
  const springX = useSpring(xMouse, { stiffness: 260, damping: 18 });
  const springY = useSpring(yMouse, { stiffness: 260, damping: 18 });

  return (
    <motion.button
      className="back-to-top-btn"
      style={{ opacity, pointerEvents, y, x: springX }}
      onClick={() => lenis?.scrollTo(0, { duration: 1.5 })}
      aria-label="Back to top"
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        xMouse.set((event.clientX - rect.left - rect.width / 2) * 0.35);
        yMouse.set((event.clientY - rect.top - rect.height / 2) * 0.35);
      }}
      onMouseLeave={() => {
        xMouse.set(0);
        yMouse.set(0);
      }}
    >
      <motion.div style={{ y: springY }}>
        <ArrowUp size={22} strokeWidth={1.5} />
      </motion.div>
    </motion.button>
  );
}

function TrustBadge() {
  const scrollYProgress = useMotionValue(0);
  useLenis(({ progress }) => {
    scrollYProgress.set(progress);
  });
  
  const rotate = useTransform(scrollYProgress, [0.1, 0.9], [0, 360]);
  const y = useTransform(scrollYProgress, [0.1, 0.6], [80, -80]);

  return (
    <motion.div 
      style={{ 
        y, 
        position: 'absolute',
        top: 'clamp(82px, 10vw, 150px)',
        right: 'clamp(40px, 8vw, 160px)',
        zIndex: 10,
        display: 'grid',
        placeItems: 'center',
        width: 'min(32vw, 240px)',
        height: 'min(32vw, 240px)',
        pointerEvents: 'none'
      }}
      aria-hidden
    >
      <motion.div style={{ rotate, position: 'absolute', inset: 0, willChange: 'transform' }}>
        <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
          <defs>
            <path id="trustCircle" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" />
          </defs>
          <text fontSize="11" fill="var(--lime)" fontWeight="700" letterSpacing="0.1em">
            <textPath href="#trustCircle" startOffset="0%" textLength="220" lengthAdjust="spacingAndGlyphs">
              • CERTIFIED COACH • TRUSTED EXPERTISE 
            </textPath>
          </text>
        </svg>
      </motion.div>
      <div style={{ position: 'absolute', display: 'grid', placeItems: 'center' }}>
        <Flower2 color="var(--lime)" size={56} strokeWidth={1.2} />
      </div>
    </motion.div>
  );
}

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

function SplitReveal({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  return (
    <span className={`split-reveal ${className}`} aria-label={text}>
      {text.split(" ").map((word, index) => (
        <motion.span
          aria-hidden
          key={`${word}-${index}`}
          initial={{ y: "110%", rotate: 3 }}
          whileInView={{ y: 0, rotate: 0 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{
            duration: 0.72,
            delay: index * 0.045,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

function HeroContent() {
  const line1 = "Wellness is not a".split(" ");
  const line2 = "destination,".split(" ");
  const line3 = "it's a way of living.".split(" ");

  const containerVariants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.08, delayChildren: 1.8 }
    }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } }
  };

  const wordVariants: any = {
    hidden: { y: "120%", rotate: 4, opacity: 0 },
    show: { y: "0%", rotate: 0, opacity: 1, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } }
  };

  const WordWrapper = ({ word }: { word: string }) => (
    <span style={{ display: "inline-block", overflow: "hidden", paddingRight: "0.22em", paddingBottom: "0.15em", verticalAlign: "bottom" }}>
      <motion.span style={{ display: "inline-block", transformOrigin: "left bottom" }} variants={wordVariants}>
        {word}
      </motion.span>
    </span>
  );

  return (
    <motion.div className="hero-content" initial="hidden" animate="show" variants={containerVariants}>
      <motion.p className="eyebrow" variants={itemVariants}>Mind. Body. Balance.</motion.p>
      
      <h1>
        <span style={{ display: "block" }}>
          {line1.map((w, i) => <WordWrapper key={`l1-${i}`} word={w} />)}
        </span>
        <span style={{ display: "block" }}>
          {line2.map((w, i) => <WordWrapper key={`l2-${i}`} word={w} />)}
        </span>
        <em style={{ display: "block" }}>
          {line3.map((w, i) => <WordWrapper key={`l3-${i}`} word={w} />)}
        </em>
      </h1>

      <motion.p className="hero-copy" variants={itemVariants}>
        I help you create sustainable habits, reduce stress and build a
        life that feels good on the inside and out.
      </motion.p>
      
      <motion.div className="hero-actions" variants={itemVariants}>
        <MagneticButton href="#contact">Work with me</MagneticButton>
        <MagneticButton href="#programs" variant="text">
          Explore programs
        </MagneticButton>
      </motion.div>
    </motion.div>
  );
}

function TiltCard({ children, index }: { children: ReactNode; index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["-100%", "100%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["-100%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.article
      className="process-card"
      initial={{ opacity: 0, y: 90 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.28 }}
      transition={{ duration: 0.8, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        position: "relative",
        overflow: "hidden"
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div 
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "200%",
          height: "200%",
          background: "radial-gradient(circle at center, rgba(255, 255, 255, 0.4) 0%, transparent 50%)",
          x: glareX,
          y: glareY,
          pointerEvents: "none",
          opacity: 0.35,
          mixBlendMode: "overlay",
          zIndex: 0
        }}
      />
      <div style={{ position: "relative", zIndex: 1, transform: "translateZ(30px)" }}>
        {children}
      </div>
    </motion.article>
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

function ProcessThread() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const pathLength = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  return (
    <motion.div 
      ref={containerRef} 
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, opacity }}
    >
      <svg width="100%" height="100%" viewBox="0 0 1000 800" preserveAspectRatio="none">
        <defs>
          <linearGradient id="threadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--lime)" stopOpacity="0.8" />
            <stop offset="50%" stopColor="var(--olive)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--lime)" stopOpacity="1" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        <motion.path
          d="M 150 150 C 350 120, 450 350, 600 250 C 750 150, 900 300, 850 450 C 800 600, 400 450, 300 600 C 200 750, 600 850, 850 700"
          fill="none"
          stroke="url(#threadGrad)"
          strokeWidth="4"
          filter="url(#glow)"
          style={{ pathLength }}
        />
      </svg>
    </motion.div>
  );
}

function ProcessGraphic() {
  const scrollYProgress = useMotionValue(0);
  useLenis(({ progress }) => {
    scrollYProgress.set(progress);
  });
  
  const rotate1 = useTransform(scrollYProgress, [0.2, 0.8], [0, 320]);
  const rotate2 = useTransform(scrollYProgress, [0.2, 0.8], [0, -280]);
  const y = useTransform(scrollYProgress, [0.2, 0.7], [120, -120]);

  return (
    <motion.div 
      style={{
        position: 'absolute',
        top: 'clamp(40px, 10vw, 150px)',
        right: 'clamp(10px, 5vw, 80px)',
        width: 'clamp(180px, 28vw, 400px)',
        height: 'clamp(180px, 28vw, 400px)',
        zIndex: 10,
        pointerEvents: 'none',
        y
      }}
      aria-hidden
    >
      <motion.svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, rotate: rotate1 }}>
        <circle cx="50" cy="50" r="46" fill="none" stroke="var(--olive)" strokeWidth="1.5" strokeDasharray="3 7" opacity="0.4" />
        <circle cx="50" cy="50" r="32" fill="none" stroke="var(--lime)" strokeWidth="1.5" strokeDasharray="14 5" />
      </motion.svg>
      <motion.svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, rotate: rotate2 }}>
        <path d="M 50 14 L 50 86 M 14 50 L 86 50 M 24 24 L 76 76 M 24 76 L 76 24" stroke="var(--olive)" strokeWidth="0.8" opacity="0.3" />
        <circle cx="50" cy="50" r="6" fill="var(--lime)" />
        <circle cx="50" cy="50" r="16" fill="none" stroke="var(--olive)" strokeWidth="0.5" opacity="0.5" />
      </motion.svg>
    </motion.div>
  );
}

function AnimatedHandshake() {
  const scrollYProgress = useMotionValue(0);
  useLenis(({ progress }) => {
    scrollYProgress.set(progress);
  });
  
  const y = useTransform(scrollYProgress, [0.5, 1], [200, -200]);
  const rotate = useTransform(scrollYProgress, [0.5, 1], [-12, 12]);
  const scale = useTransform(scrollYProgress, [0.5, 0.75, 1], [0.85, 1.05, 0.85]);

  return (
    <motion.div 
      style={{
        position: 'absolute',
        top: 'clamp(20px, 8vw, 150px)',
        right: 'clamp(0px, 2vw, 40px)',
        width: 'clamp(220px, 35vw, 650px)',
        height: 'clamp(220px, 35vw, 650px)',
        zIndex: 10,
        pointerEvents: 'none',
        display: 'grid',
        placeItems: 'center',
        y,
        rotate,
        scale
      }}
      aria-hidden
    >
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, rgba(163, 177, 138, 0.12) 0%, transparent 65%)',
          borderRadius: '50%',
        }}
      />
      <Handshake color="var(--olive)" size="90%" strokeWidth={0.4} opacity={0.35} />
    </motion.div>
  );
}

function ProgramHoverList() {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const xTo = useRef<gsap.QuickToFunc | null>(null);
  const yTo = useRef<gsap.QuickToFunc | null>(null);

  useEffect(() => {
    if (imageRef.current) {
      xTo.current = gsap.quickTo(imageRef.current, "x", { duration: 0.7, ease: "power3" });
      yTo.current = gsap.quickTo(imageRef.current, "y", { duration: 0.7, ease: "power3" });
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (xTo.current && yTo.current) {
      xTo.current(e.clientX);
      yTo.current(e.clientY);
    }
  };

  return (
    <div className="program-list" onMouseMove={handleMouseMove} style={{ position: "relative" }}>
      {programs.map((program, index) => (
        <motion.article
          className="program-card"
          key={program.title}
          initial={{ opacity: 0, x: index % 2 ? 120 : -120 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.88, ease: [0.22, 1, 0.36, 1] }}
          onMouseEnter={() => setActiveImage(program.image)}
          onMouseLeave={() => setActiveImage(null)}
        >
          <div>
            <span>{program.meta}</span>
            <h3>{program.title}</h3>
          </div>
          <p>{program.body}</p>
          <MousePointer2 size={28} strokeWidth={1.2} aria-hidden />
        </motion.article>
      ))}

      <div
        ref={imageRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 0,
          height: 0,
          pointerEvents: "none",
          zIndex: 50,
        }}
        aria-hidden
      >
        <div 
          style={{
             position: "absolute",
             left: "-150px", 
             top: "-200px",
             width: "300px",
             height: "400px",
             borderRadius: "16px",
             overflow: "hidden",
             opacity: activeImage ? 1 : 0,
             transform: `scale(${activeImage ? 1 : 0.8})`,
             transition: "opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1), transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
             boxShadow: "0 20px 40px rgba(0,0,0,0.15)"
          }}
        >
          {programs.map((prog) => (
            <Image
              key={prog.title}
              src={prog.image}
              alt={prog.title}
              fill
              style={{
                objectFit: "cover",
                opacity: activeImage === prog.image ? 1 : 0,
                transition: "opacity 0.3s ease"
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function WellnessAudit() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [answers, setAnswers] = useState<string[]>([]);

  const quizQuestions = [
    {
      question: "How does your body feel on a typical morning?",
      options: ["Energized & Light", "A bit stiff, but okay", "Exhausted & Heavy"]
    },
    {
      question: "What is your biggest roadblock to feeling your best?",
      options: ["Lack of time", "Inconsistent habits", "Stress & Overwhelm", "Not sure what to do"]
    },
    {
      question: "How would you describe your ideal daily state?",
      options: ["Calm & Grounded", "High Energy & Focused", "Pain-free & Mobile"]
    }
  ];

  const handleNext = (answer?: string) => {
    if (answer) {
      setAnswers([...answers, answer]);
    }
    setDirection(1);
    setStep(s => s + 1);
  };

  const variants: any = {
    enter: (dir: number) => ({
      x: dir > 0 ? 40 : -40,
      opacity: 0,
      filter: "blur(4px)"
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    },
    exit: (dir: number) => ({
      x: dir < 0 ? -40 : 40,
      opacity: 0,
      filter: "blur(4px)",
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
    })
  };

  return (
    <section className="audit-section">
      <div className="audit-container">
        <div className="audit-header">
          <p className="section-kicker">The Wellness Audit</p>
          <div className="audit-progress">
             <div className="progress-bar" style={{ width: `${(step / 4) * 100}%` }} />
          </div>
        </div>
        
        <div className="audit-card">
          <AnimatePresence mode="wait" custom={direction}>
            {step === 0 && (
              <motion.div key="intro" custom={direction} variants={variants} initial="enter" animate="center" exit="exit" className="audit-step">
                <h2>Not sure where to begin?</h2>
                <p>Take this 1-minute assessment to help me understand your unique needs before we ever speak.</p>
                <button className="audit-btn-primary" onClick={() => handleNext()}>Begin Assessment <ArrowRight size={18} /></button>
              </motion.div>
            )}

            {step > 0 && step <= quizQuestions.length && (
              <motion.div key={step} custom={direction} variants={variants} initial="enter" animate="center" exit="exit" className="audit-step">
                <h3>{quizQuestions[step - 1].question}</h3>
                <div className="audit-options">
                  {quizQuestions[step - 1].options.map((opt, i) => (
                    <button key={i} className="audit-option-btn" onClick={() => handleNext(opt)}>
                      {opt}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="outro" custom={direction} variants={variants} initial="enter" animate="center" exit="exit" className="audit-step">
                <Leaf size={48} strokeWidth={1} color="var(--olive)" style={{ marginBottom: 24 }} />
                <h2>Thank you for sharing.</h2>
                <p>Based on your responses, I have a clear picture of how we can rebuild your baseline. Let's map out your exact next steps.</p>
                <MagneticButton href="#contact" variant="primary">Schedule Your Strategy Call</MagneticButton>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

const testimonials = [
  {
    name: "Sarah J.",
    tag: "Verified Client",
    quote: "I used to wake up feeling already behind. Lumina completely rebuilt my foundation. For the first time in years, I feel light.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop"
  },
  {
    name: "Elena M.",
    tag: "Verified Client",
    quote: "The approach is so gentle yet remarkably profound. I finally have sustainable habits that don't feel like a chore.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop"
  },
  {
    name: "Marcus T.",
    tag: "Verified Client",
    quote: "I thought stress was the price of my career. The Deep Wellness Lab changed everything. I have my energy back.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop"
  },
  {
    name: "Amira L.",
    tag: "Verified Client",
    quote: "A truly transformative experience. I learned how to listen to my body instead of constantly fighting it.",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1964&auto=format&fit=crop"
  }
];

function ClientTransformations() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (carouselRef.current) {
        setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
      }
    };
    
    updateWidth();
    // Use a short timeout to ensure images/fonts have shifted layout
    setTimeout(updateWidth, 200);
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    <section className="testimonials-section">
      <div className="testimonials-header">
        <p className="section-kicker">Client Transformations</p>
        <h2>Real stories. Real balance.</h2>
      </div>

      <div className="carousel-wrapper" ref={carouselRef}>
        <motion.div 
          className="carousel-track" 
          drag="x" 
          dragConstraints={{ right: 0, left: -width }}
          whileTap={{ cursor: "grabbing" }}
        >
          {testimonials.map((t, i) => (
            <motion.div className="testimonial-card" key={i}>
              <Image src={t.image} alt={t.name} fill className="t-image" sizes="(max-width: 820px) 90vw, 400px" />
              <div className="t-overlay">
                <div className="t-tag"><Check size={12} strokeWidth={3} /> {t.tag}</div>
                <p className="t-quote">&quot;{t.quote}&quot;</p>
                <p className="t-name">&mdash; {t.name}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default function WellnessLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const scrollYProgress = useMotionValue(0);
  
  useLenis(({ progress }) => {
    scrollYProgress.set(progress);
  });
  const imageScale = useTransform(scrollYProgress, [0, 0.22], [1, 1.07]);
  const imageY = useTransform(scrollYProgress, [0, 0.22], [0, -56]);
  const heroTextX = useTransform(scrollYProgress, [0, 0.35], [0, -90]);
  const processRotate = useTransform(scrollYProgress, [0.28, 0.74], [0, 42]);

  return (
    <main id="home" className="lumina-page">
      <Loader />
      <CursorAura />
      <ScrollRail />
      <BackToTop />
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
        <motion.div
          className="hero-kinetic-word"
          style={reduceMotion ? undefined : { x: heroTextX }}
          aria-hidden
        >
          BREATHE
        </motion.div>

        <HeroContent />

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

      <section className="motion-strip" aria-label="Wellness specialties">
        <motion.div
          className="strip-row"
          animate={reduceMotion ? undefined : { x: ["0%", "-50%"] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        >
          {[...specialties, ...specialties, ...specialties, ...specialties].map((item, index) => (
            <span key={`${item}-${index}`}>{item}</span>
          ))}
        </motion.div>
        <motion.div
          className="strip-row reverse"
          animate={reduceMotion ? undefined : { x: ["-50%", "0%"] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          {[...specialties].reverse().concat([...specialties].reverse(), [...specialties].reverse(), [...specialties].reverse()).map((item, index) => (
            <span key={`${item}-reverse-${index}`}>{item}</span>
          ))}
        </motion.div>
      </section>

      <section id="about" className="intro-section">
        <Reveal className="intro-copy">
          <p className="script-line">hi, I&apos;m</p>
          <h2>
            <SplitReveal text="I&apos;m here to help you" />
            <em>
              <SplitReveal text="become your best self." />
            </em>
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

      <section id="services" className="good-at-section">
        <Reveal>
          <p className="section-kicker">We are good at</p>
          <h2>Building a life your nervous system can trust.</h2>
        </Reveal>
        <TrustBadge />
        <div className="good-at-grid">
          {specialties.map((item, index) => (
            <motion.article
              className="good-at-card"
              style={{ padding: 'clamp(16px, 1.8vw, 24px)' }}
              key={item}
              initial={{ opacity: 0, y: 70, rotate: index % 2 ? 2 : -2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, amount: 0.34 }}
              transition={{ duration: 0.8, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={reduceMotion ? undefined : { y: -10, rotate: index % 2 ? -1.5 : 1.5 }}
            >
              <span>0{index + 1}</span>
              <h3 style={{ fontSize: 'clamp(1.5rem, 2.1vw, 2.6rem)', wordBreak: 'break-word', hyphens: 'auto' }}>
                {item}
              </h3>
              <p>
                Personalized practices that feel grounded, doable and quietly powerful.
              </p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="process-intro">
        <ProcessGraphic />
        <Reveal>
          <h2>WE BELIEVE IN A PROCESS THAT WORKS</h2>
          <p>
            If you have an idea of the life you want, even if it is only a rough
            feeling, we shape it into rituals you can actually keep.
          </p>
        </Reveal>
      </section>

      <section className="process-stage" aria-label="Coaching process">
        <ProcessThread />
        <motion.div
          className="process-orbit"
          style={reduceMotion ? undefined : { rotate: processRotate }}
          aria-hidden
        >
          {processSteps.map((step, index) => (
            <span key={step.title} className={`orbit-dot dot-${index + 1}`} />
          ))}
        </motion.div>
        <div className="process-grid" style={{ perspective: "1000px", position: "relative", zIndex: 2 }}>
          {processSteps.map((step, index) => (
            <TiltCard key={step.title} index={index}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{step.title}</h3>
              <ul>
                {step.points.map((point) => (
                  <li key={point}>
                    <Check size={15} strokeWidth={2} aria-hidden />
                    {point}
                  </li>
                ))}
              </ul>
            </TiltCard>
          ))}
        </div>
      </section>

      <section id="programs" className="featured-section">
        <div className="featured-header">
          <p className="section-kicker">Featured programs</p>
          <h2>A system for every season.</h2>
        </div>
        <ProgramHoverList />
      </section>

      <ClientTransformations />

      <section className="manifesto-section">
        {manifesto.map((line, index) => (
          <motion.h2
            key={line}
            initial={{ opacity: 0.18, x: index % 2 ? 70 : -70 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.52 }}
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          >
            {line}
          </motion.h2>
        ))}
      </section>

        <WellnessAudit />

      <section id="contact" className="contact-finale">
        <Reveal>
          <p className="section-kicker">Ready when you are</p>
          <h2>Let&apos;s make your wellbeing feel less complicated.</h2>
          <MagneticButton href="mailto:hello@luminawellness.co">Schedule Call</MagneticButton>
        </Reveal>
      </section>

      <footer className="site-footer">
        <div className="footer-top">
          <div className="footer-brand">
            <Logo />
            <p>Helping you build a life that feels good on the inside and out.</p>
            <form className="footer-newsletter" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Join our newsletter" aria-label="Email for newsletter" />
              <button type="submit" aria-label="Subscribe"><ArrowRight size={18} /></button>
            </form>
          </div>
          <div className="footer-links">
            <div className="link-group">
              <h4>Navigation</h4>
              <a href="#home">Home</a>
              <a href="#about">About</a>
              <a href="#services">Services</a>
              <a href="#programs">Programs</a>
            </div>
            <div className="link-group">
              <h4>Socials</h4>
              <a href="#instagram">Instagram</a>
              <a href="#linkedin">LinkedIn</a>
              <a href="#twitter">Twitter</a>
            </div>
          </div>
        </div>
        
        <div className="footer-massive-text" aria-hidden>
          LUMINA
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Lumina Wellness. All rights reserved.</p>
          <div className="footer-legal">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
