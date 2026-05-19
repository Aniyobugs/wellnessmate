"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Bot,
  CalendarDays,
  Heart,
  Leaf,
  MessageCircle,
  MoreHorizontal,
  Plus,
  Repeat2,
  Sparkles,
  Star,
  UserRound,
  X,
} from "lucide-react";
import { useState, type ReactNode } from "react";

const navItems = ["Why Us", "Coaches", "Testimonials", "Features", "Transformations", "FAQ"];

const featureCards = [
  ["24/7 Support & Guidance", "Connect anytime via AI chat, WhatsApp, and video sessions.", "💬"],
  ["Proven Results", "85% of clients report improved energy within 4 weeks.", "🏅"],
  ["Personalized Wellness Plans", "Custom-tailored plans to match your goals and lifestyle.", "📋"],
  ["Progress Tracking Tools", "Stay on track with real-time insights and goal monitoring.", "📈"],
  ["Certified Expert Coaches", "Work with top professionals in fitness, nutrition, and mindfulness.", "🧑‍⚕️"],
  ["Flexible Scheduling", "Book coaching sessions at times that fit your routine.", "🗓️"],
];

const coaches = [
  {
    tag: "Open for bookings",
    role: "Lead Wellness Coach",
    name: "Asuhar B",
    rating: "4.9/5",
    lines: ["Strength Training & Mind Reset", "8+ years, Certified Wellness Coach"],
    image: "/mission444/asuhar-cutout.png",
  },
];

const stories = [
  {
    image: "/mission444/story-1.jpg",
    quote: "Mission 444 transformed my fitness routine. I feel stronger and more confident every day.",
    name: "Emily Ross",
    role: "Wellness Enthusiast",
  },
  {
    image: "/mission444/story-2.jpg",
    quote: "Meditation helped me manage stress and sleep better. I finally feel at peace.",
    name: "David Patel",
    role: "Mindfulness Client",
  },
  {
    image: "/mission444/story-3.jpg",
    quote: "The plan helped me rebuild endurance and return to movement with confidence.",
    name: "Marcus Clark",
    role: "Fitness Client",
  },
  {
    image: "/mission444/story-4.jpg",
    quote: "Eating healthy has never been easier. I have more energy and feel amazing.",
    name: "Sophia Lee",
    role: "Nutrition Client",
  },
];

const transformations = [
  {
    title: "Energy Reset",
    image: "/mission444/transformation-1.jpg",
    quote: "I feel stronger, lighter, and more confident in my body.",
    name: "Mission 444 Client",
  },
  {
    title: "Strength & Calm",
    image: "/mission444/transformation-2.jpg",
    quote: "The plan helped me rebuild discipline and feel proud again.",
    name: "Wellness Client",
  },
  {
    title: "Body Confidence",
    image: "/mission444/transformation-3.jpg",
    quote: "Small daily actions became a visible transformation.",
    name: "Fitness Client",
  },
  {
    title: "Lifestyle Shift",
    image: "/mission444/transformation-4.jpg",
    quote: "My energy, mood, and routine changed completely.",
    name: "Transformation Client",
  },
  {
    title: "Skin & Wellness",
    image: "/mission444/transformation-5.jpg",
    quote: "I learned consistency, nutrition, and self-care that lasts.",
    name: "Glow Client",
  },
  {
    title: "Confidence Return",
    image: "/mission444/transformation-6.jpg",
    quote: "The guidance gave me a new lifestyle, not a temporary plan.",
    name: "Mission 444 Member",
  },
  
];

const faqs = [
  "How do I choose a coach?",
  "What happens after the free consultation?",
  "Can I switch my coach later?",
  "How does progress tracking work?",
  "Is in-app messaging available?",
  "Can I pause my coaching plan anytime?",
];

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 34 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function AnimatedWords({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <span className="animated-words" aria-label={text}>
      {words.map((word, index) => (
        <motion.span
          aria-hidden
          key={`${word}-${index}`}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12 + index * 0.055, ease: [0.22, 1, 0.36, 1] }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="section-pill">
      <Sparkles size={15} />
      {children}
    </span>
  );
}

function TransformationPhoto({ item, index }: { item: (typeof transformations)[number]; index: number }) {
  return (
    <Reveal className="ba-photo-card" delay={index * 0.05}>
      <div className="ba-photo">
        <Image src={item.image} alt={`${item.title} before and after transformation`} fill sizes="(max-width: 900px) 92vw, 360px" />
        <div className="ba-photo-copy">
          <span>{item.title}</span>
          <p>&quot;{item.quote}&quot;</p>
          <strong>{item.name}</strong>
        </div>
      </div>
    </Reveal>
  );
}

export default function WellnessLanding() {
  const [chatOpen, setChatOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="mission-page">
      <header className="mission-nav">
        <a className="mission-brand" href="#home">
          <strong>Mission 444</strong>
          <Leaf size={24} />
        </a>
        <nav aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase().replaceAll(" ", "-")}`}>{item}</a>
          ))}
        </nav>
        <a className="coach-chip" href="#coaches">
          <Image src="/wellness-hero.png" alt="" width={34} height={34} />
          Asuhar B
        </a>
      </header>

      <section id="home" className="mission-hero">
        <div className="hero-banner">
          <div className="hero-copy">
            <h1><AnimatedWords text="Your Wellness Journey Starts Here." /></h1>
            <p>Tailored wellness plans for your body, mind, and goals with coach Asuhar B.</p>
            <div className="hero-actions">
              <a className="dark-btn" href="#coaches">Start Free Trial</a>
              <a className="light-btn" href="https://wa.me/919809745714" target="_blank" rel="noopener noreferrer">Book a Free Consultation</a>
            </div>
          </div>
          <Image
            src="/mission444/hero-photo.jpg"
            alt="Woman meditating among tropical plants"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 1320px"
          />
        </div>

        <div className="hero-card-row">
          <Reveal className="image-tile" delay={0.05}>
            <Image src="/mission444/tile-flex.jpg" alt="Improved flexibility yoga pose" fill sizes="390px" />
            <span>View Video</span>
            <button aria-label="Open flexibility video"><ArrowRight size={20} /></button>
            <h3>Improved Flexibility</h3>
          </Reveal>
          <Reveal className="image-tile" delay={0.12}>
            <Image src="/mission444/tile-calm.jpg" alt="Meditation for stress reduction" fill sizes="390px" />
            <span>View Video</span>
            <button aria-label="Open stress reduction video"><ArrowRight size={20} /></button>
            <h3>Stress Reduction</h3>
          </Reveal>
          <Reveal className="image-tile wide" delay={0.18}>
            <Image src="/mission444/tile-class.jpg" alt="Group yoga class" fill sizes="460px" />
            <span>Join Our Class</span>
            <button aria-label="Join class"><ArrowRight size={20} /></button>
            <div className="join-copy">
              <h3>Breathe. Stretch. Relax. Begin Your Yoga Journey!</h3>
              <form onSubmit={(event) => event.preventDefault()}>
                <input aria-label="Your email" placeholder="Your Email" type="email" />
                <button type="submit">Get Started</button>
              </form>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="why-us" className="why-clone">
        <Pill>Key Benefits</Pill>
        <h2>Why Choose Us?</h2>
        <div className="benefit-layout">
          <Image className="meditation-person" src="/mission444/benefit-person.jpg" alt="Meditating wellness coach" width={420} height={520} />
          {featureCards.map(([title, text, icon], index) => (
            <Reveal className={`benefit-pop pop-${index + 1}`} delay={index * 0.04} key={title}>
              <span>{icon}</span>
              <div>
                <strong>{title}</strong>
                <p>{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="coaches" className="coach-section">
        <Pill>Coach-Profiles</Pill>
        <h2>Meet Your Wellness Coach</h2>
        <p className="section-sub">
          Personal coaching with structure, accountability, and calm momentum for your next 444 days.
        </p>
        <div className="coach-spotlight">
          {coaches.map((coach, index) => (
            <Reveal className="coach-card" delay={index * 0.08} key={coach.role}>
              <div className="coach-image">
                <Image src={coach.image} alt={`${coach.name} ${coach.role}`} fill sizes="(max-width: 900px) 90vw, 380px" />
                <span>{coach.tag}</span>
              </div>
              <div className="coach-body">
                <div className="coach-title">
                  <h3>{coach.role}</h3>
                  <span><Star size={16} fill="currentColor" /> {coach.rating}</span>
                </div>
                <p><UserRound size={15} /> {coach.name}</p>
                {coach.lines.map((line) => <p key={line}>🦋 {line}</p>)}
                <a href="https://wa.me/919809745714" target="_blank" rel="noopener noreferrer">Book a Session <ArrowRight size={18} /></a>
              </div>
            </Reveal>
          ))}
          <Reveal className="coach-copy-panel" delay={0.12}>
            <span className="coach-kicker"><BadgeCheck size={17} /> Mission 444 Method</span>
            <h3>Built for people who want a plan they can actually follow.</h3>
            <p>
              Asuhar blends strength work, habit resets, and simple weekly check-ins so your routine feels clear,
              measured, and realistic around real life.
            </p>
            <div className="coach-highlights">
              <span><CalendarDays size={18} /> Weekly goal review</span>
              <span><Repeat2 size={18} /> Habit reset cycles</span>
              <span><MessageCircle size={18} /> WhatsApp accountability</span>
              <span><Heart size={18} /> Mind and body balance</span>
            </div>
            <div className="coach-metrics">
              <strong><span>8+</span> years coaching</strong>
              <strong><span>4.9</span> client rating</strong>
              <strong><span>1:1</span> guided support</strong>
            </div>
            <div className="coach-note">
              <Bot size={20} />
              <p>Start with a free consultation, then get a focused plan for training, recovery, and consistency.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="features" className="journey-section">
        <Pill>Features</Pill>
        <h2>Empower Your Wellness Journey</h2>
        <div className="dashboard-grid">
          <Reveal className="dash-card client-plan">
            <span className="dash-icon">📋</span>
            <h3>Custom Wellness Plans</h3>
            <p>Get a tailored plan for fitness, nutrition, and mindfulness.</p>
            {["Cameron Williamson", "Brooklyn Simmons"].map((name, index) => (
              <div className="client-row" key={name}>
                <Image src={index ? "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=120&auto=format&fit=crop" : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop"} alt="" width={42} height={42} />
                <div><strong>{name}</strong><small>📊 Progress: {index ? "80" : "60"}% · 🧘 30min · 🍏 Diet: 1500 Cal</small></div>
                <em>{index ? "80" : "60"}%</em>
              </div>
            ))}
          </Reveal>
          <Reveal className="dash-card video-coach" delay={0.05}>
            <span className="dash-icon">📹</span>
            <h3>Video Coaching</h3>
            <p>Connect with certified wellness experts via live video sessions.</p>
            <Image src="/mission444/video-coach.jpg" alt="Live video coaching session" fill sizes="380px" />
          </Reveal>
          <Reveal className="dash-card schedule-card" delay={0.1}>
            <span className="dash-icon">🗓️</span>
            <h3>Flexible Scheduling</h3>
            <p>Book and manage your coaching sessions at your convenience.</p>
            {["Jerome Bell", "Jacob Jones"].map((name, index) => (
              <div className="schedule-row" key={name}>
                <Image src={index ? "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=120&auto=format&fit=crop" : "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&auto=format&fit=crop"} alt="" width={38} height={38} />
                <strong>{name}</strong>
                <span><CalendarDays size={16} /> {index ? "16/03/2025" : "12/03/2025"}</span>
              </div>
            ))}
            <button>Reschedule</button>
          </Reveal>
          <Reveal className="dash-card message-card" delay={0.12}>
            <span className="dash-icon">💬</span>
            <h3>WhatsApp Messaging</h3>
            <p>Stay connected with your coach anytime, anywhere.</p>
            <div className="chat-lines">
              <span>Hey Coach, how many times should I work out per week?</span>
              <strong>It depends on your goal.</strong>
              <span>What kind of exercises should I focus on?</span>
              <strong>A mix of strength training and yoga.</strong>
            </div>
          </Reveal>
          <Reveal className="dash-card progress-card" delay={0.16}>
            <span className="dash-icon">📈</span>
            <h3>Progress Tracking</h3>
            <p>Monitor your achievements with insightful analytics.</p>
            <svg viewBox="0 0 640 230" aria-hidden>
              <path d="M20 190 C80 150 110 170 150 135 C195 95 205 40 270 60 C340 85 315 145 380 150 C440 155 450 182 510 172 C560 164 580 178 620 170" />
              <circle cx="270" cy="60" r="8" />
            </svg>
            <div className="weeks"><span>Week 1</span><span>Week 2</span><span>Week 3</span><span>Week 4</span><span>Week 5</span><span>Week 6</span></div>
          </Reveal>
        </div>
      </section>

      <section id="testimonials" className="stories-section">
        <Pill>Success-Stories</Pill>
        <h2>Testimonials</h2>
        <Reveal className="testimonial-marquee">
          <div className="testimonial-track">
            {stories.map((story, index) => (
              <div className="tweet-card" key={story.name}>
                <header className="tweet-header">
                  <Image src={story.image} alt={story.name} width={48} height={48} className="tweet-avatar" />
                  <div className="tweet-user-info">
                    <strong>{story.name}<BadgeCheck size={16} fill="currentColor" /></strong>
                    <span>@{story.name.toLowerCase().replace(" ", "_")}</span>
                  </div>
                  <MoreHorizontal size={21} />
                </header>
                <p className="tweet-body">&quot;{story.quote}&quot;</p>
                <div className="tweet-footer">
                  <span className="tweet-time">9:41 AM · {["Oct 12", "Oct 14", "Oct 18", "Oct 22"][index] || "Oct 25"}, 2025</span>
                  <div className="tweet-stats">
                    <span><Heart size={16} /> {124 + index * 42}</span>
                    <span><Repeat2 size={16} /> {12 + index * 7}</span>
                    <span><MessageCircle size={16} /> {5 + index * 3}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="testimonial-track" aria-hidden="true">
            {stories.map((story, index) => (
              <div className="tweet-card" key={`dup-${story.name}`}>
                <header className="tweet-header">
                  <Image src={story.image} alt={story.name} width={48} height={48} className="tweet-avatar" />
                  <div className="tweet-user-info">
                    <strong>{story.name}<BadgeCheck size={16} fill="currentColor" /></strong>
                    <span>@{story.name.toLowerCase().replace(" ", "_")}</span>
                  </div>
                  <MoreHorizontal size={21} />
                </header>
                <p className="tweet-body">&quot;{story.quote}&quot;</p>
                <div className="tweet-footer">
                  <span className="tweet-time">9:41 AM · {["Oct 12", "Oct 14", "Oct 18", "Oct 22"][index] || "Oct 25"}, 2025</span>
                  <div className="tweet-stats">
                    <span><Heart size={16} /> {124 + index * 42}</span>
                    <span><Repeat2 size={16} /> {12 + index * 7}</span>
                    <span><MessageCircle size={16} /> {5 + index * 3}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section id="transformations" className="before-after-section">
        <Pill>Before-After</Pill>
        <h2>Before &amp; After Transformations</h2>
        <p className="section-sub">No subscription plans here, just real coaching milestones and visible lifestyle change.</p>
        <div className="ba-grid">
          {transformations.map((item, index) => <TransformationPhoto item={item} index={index} key={item.title} />)}
        </div>
        <p className="results-disclaimer">Disclaimer: these results are not typical, individual results may vary.</p>
      </section>

      <section className="asuhar-quote-section">
        <div className="asuhar-quote-card">
          <div className="asuhar-copy">
            <Pill>Coach Quote</Pill>
            <h2>“Your transformation starts when your daily promise becomes non-negotiable.”</h2>
            <p>Asuhar B guides Mission 444 clients with structure, accountability, and calm discipline.</p>
          </div>
          <Image src="/mission444/asuhar-source.png" alt="Asuha r B" width={490} height={645} className="asuhar-cutout" />
        </div>
      </section>

      <section id="faq" className="faq-clone">
        <Pill>FAQ</Pill>
        <h2>Got Questions? We&apos;ve Got Answers!</h2>
        <div className="faq-grid">
          {faqs.map((faq, index) => (
            <Reveal className={`faq-row ${openFaq === index ? "open" : ""}`} delay={index * 0.04} key={faq}>
              <button type="button" onClick={() => setOpenFaq(openFaq === index ? null : index)}>
                {faq}
                {openFaq === index ? <X size={18} /> : <Plus size={18} />}
              </button>
              {openFaq === index ? <p>Mission 444 gives you a simple guided path, coach support, and progress tools so every step feels clear.</p> : null}
            </Reveal>
          ))}
        </div>
      </section>

      <footer className="mission-footer">
        <div className="footer-branding">
          <a className="mission-brand" href="#home"><strong>Mission 444</strong><Leaf size={24} /></a>
          <p>Empowering your wellness journey with expert coaching in fitness, nutrition, and mindfulness. Transform your health with personalized guidance tailored to your goals.</p>
          <div className="socials"><span>◎</span><span>𝕏</span><span>f</span><span>in</span></div>
        </div>
        <div className="footer-links">
          <div><strong>Quick Links</strong><a href="#home">Home</a><a href="#coaches">Coaches</a><a href="#transformations">Transformations</a><a href="#faq">FAQs</a></div>
          <div><strong>Support & Help</strong><a href="#chat">AI Chat</a><a href="https://wa.me/919809745714" target="_blank" rel="noopener noreferrer">WhatsApp Coach</a><a href="#faq">Privacy Policy</a></div>
        </div>
        <small>© 2026 Mission 444. All rights reserved.</small>
      </footer>

      <a id="call" className="floating-call" href="https://wa.me/919809745714" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp Mission 444">
        <MessageCircle size={21} />
        <span>WhatsApp</span>
      </a>
      <button id="chat" className="floating-chat" type="button" onClick={() => setChatOpen((open) => !open)} aria-label="Open AI chat">
        <Bot size={23} />
      </button>
      {chatOpen ? (
        <motion.aside className="ai-chat" initial={{ opacity: 0, y: 18, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }}>
          <header><Bot size={18} /> Mission 444 AI Coach <button type="button" onClick={() => setChatOpen(false)}><X size={16} /></button></header>
          <p>Hi, I&apos;m your AI wellness assistant. Ask about routines, coach availability, or before/after goals.</p>
          <div><MessageCircle size={16} /> Try: “Create my 7-day calm plan.”</div>
        </motion.aside>
      ) : null}
    </main>
  );
}
