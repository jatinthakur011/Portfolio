import { createFileRoute } from "@tanstack/react-router";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUp, BookOpen, Copy, GraduationCap, Rotate3D, School } from "lucide-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { FaAws } from "react-icons/fa";
import {
  SiDocker,
  SiGnubash,
  SiKubernetes,
  SiLinux,
  SiMongodb,
  SiNginx,
  SiNodedotjs,
  SiReact,
} from "react-icons/si";
import type { IconType } from "react-icons";

import { SkyBackdrop } from "@/components/SkyBackdrop";
import { PhotoFrame3D } from "@/components/PhotoFrame3D";
import { SkillsSphere } from "@/components/SkillsSphere";
import {
  ABOUT_CARDS,
  CONTACTS,
  EDUCATION,
  NAV_LINKS,
  PROJECTS,
  SKILL_GROUPS,
  SOFT_SKILLS,
} from "@/components/portfolio-data";
import photoUrl from "@/assets/Photo.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Jatin Thakur — Full-Stack Developer & DevOps Engineer" },
      {
        name: "description",
        content:
          "Portfolio of Jatin Thakur — full-stack developer and DevOps engineer building React apps and automating the pipelines that ship them.",
      },
      {
        property: "og:title",
        content: "Jatin Thakur — Full-Stack Developer & DevOps Engineer",
      },
      {
        property: "og:description",
        content: "React, Node.js, Docker, Kubernetes and Terraform projects by Jatin Thakur.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        property: "og:image",
        content: "https://jatin-portfolio-six-lovat.vercel.app/og-image.png",
      },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        name: "twitter:image",
        content: "https://jatin-portfolio-six-lovat.vercel.app/og-image.png",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Jatin Thakur",
          jobTitle: "Full-Stack Developer & DevOps Engineer",
          url: "https://jatin-portfolio-six-lovat.vercel.app/",
          email: "mailto:jatuthakur170@gmail.com",
          telephone: "+91-8091259662",
          sameAs: [
            "https://www.linkedin.com/in/jatin--thakur/",
            "https://github.com/jatinthakur011",
            "https://leetcode.com/u/Jatin_thakur01/",
          ],
        }),
      },
    ],
  }),
  component: Portfolio,
});

function useActiveSection() {
  const [active, setActive] = useState<string>("home");

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return active;
}

function spotlight(e: React.MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${e.clientX - r.left}px`);
  el.style.setProperty("--my", `${e.clientY - r.top}px`);
}

const MARQUEE_TECH = [
  "Linux",
  "Git",
  "React",
  "Node.js",
  "TypeScript",
  "Docker",
  "Kubernetes",
  "Terraform",
  "Jenkins",
  "AWS",
];

function TechIcon({ name }: { name: string }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true" {...common}>
      {name === "Linux" ? (
        <>
          <path d="M12 3c-2.2 0-3.2 2.4-3.2 5.2 0 2.1-2.3 3.4-2.3 6.3 0 2.8 2.1 4.5 5.5 4.5s5.5-1.7 5.5-4.5c0-2.9-2.3-4.2-2.3-6.3C15.2 5.4 14.2 3 12 3Z" />
          <path d="M8.2 18.4 6 21h4l2-2 2 2h4l-2.2-2.6M9.5 9h.01M14.5 9h.01" />
        </>
      ) : null}
      {name === "Git" ? (
        <>
          <path d="m20.5 10.5-7-7a2.1 2.1 0 0 0-3 0l-1.7 1.7 2.8 2.8a2.4 2.4 0 0 1 3 3l2.8 2.8 3.1-3.1a2.1 2.1 0 0 0 0-3Z" />
          <path d="m8.8 8.8-3.1 3.1a2.1 2.1 0 0 0 0 3l7 7a2.1 2.1 0 0 0 3 0l1.7-1.7-2.8-2.8a2.4 2.4 0 0 1-3-3l-2.8-2.8Z" />
        </>
      ) : null}
      {name === "React" ? (
        <>
          <ellipse cx="12" cy="12" rx="9" ry="3.6" />
          <ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(120 12 12)" />
          <circle cx="12" cy="12" r="1.2" fill="currentColor" />
        </>
      ) : null}
      {name === "Node.js" ? (
        <>
          <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
          <path d="M8 12.2c0-1.2.8-1.9 2-1.9h1.7c1.2 0 2 .7 2 1.9s-.8 1.9-2 1.9H10c-1.2 0-2 .7-2 1.9s.8 1.9 2 1.9h2" />
        </>
      ) : null}
      {name === "TypeScript" ? (
        <>
          <rect x="3" y="3" width="18" height="18" rx="2" fill="currentColor" stroke="none" />
          <path
            d="M7 11h6M10 11v7M15 14.5c0-1 1-1.5 2-1.5s2 .5 2 1.5-1 1.5-2 1.5-2 .5-2 1.5 1 1.5 2 1.5 2-.5 2-1.5"
            stroke="var(--background)"
          />
        </>
      ) : null}
      {name === "Docker" ? (
        <>
          <path d="M3 13h14.5c2.2 0 3.3-1.2 3.8-2.5-1.4-.7-2.8-.7-4.1-.3-.4-2-1.6-3.2-3.5-3.6-.4.8-.5 1.7-.3 2.6H5.5v3.8Z" />
          <path d="M5 7h2v2H5zM8 7h2v2H8zM11 7h2v2h-2zM8 4h2v2H8zM11 4h2v2h-2z" />
        </>
      ) : null}
      {name === "Kubernetes" ? (
        <>
          <path d="m12 2 8.7 5v10L12 22l-8.7-5V7L12 2Z" />
          <path d="m12 6 1.5 3.7 4 .3-3.1 2.5 1 3.9-3.4-2.1-3.4 2.1 1-3.9-3.1-2.5 4-.3L12 6Z" />
        </>
      ) : null}
      {name === "Terraform" ? (
        <>
          <path d="m4 4 6 3.4v6.8L4 10.8V4ZM10 14l6 3.4v-6.8l-6-3.4V14ZM16 4l4 2.3v6.8l-4-2.3V4Z" />
        </>
      ) : null}
      {name === "Jenkins" ? (
        <>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M8.5 10.5c1.2-1.8 5.8-1.8 7 0M9 15c1.8 1.4 4.2 1.4 6 0M9 8h.01M15 8h.01" />
        </>
      ) : null}
      {name === "AWS" ? (
        <>
          <path d="M4 15.5c4 2.5 8.8 2.6 15.5-.5" />
          <path d="M17 12.5c.6 1.1 1.1 2.3 1.2 3.7M4 12c1.8-4.4 5.1-6.5 9.1-6.5 2.2 0 4.2.7 5.9 2.1" />
        </>
      ) : null}
    </svg>
  );
}

function SectionHeading({
  title,
  subtitle,
  eyebrow,
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
}) {
  return (
    <motion.div
      className="mb-14 text-center"
      initial={{ opacity: 0, rotateX: 10, y: 18 }}
      whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {eyebrow ? <p className="eyebrow mb-4">{eyebrow}</p> : null}
      <h2 className="section-title">{title}</h2>
      {subtitle ? (
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink-soft">{subtitle}</p>
      ) : null}
    </motion.div>
  );
}

function CursorGlow() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 140, damping: 24, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 140, damping: 24, mass: 0.4 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const move = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };
    const setHover = (event: PointerEvent) => {
      setIsHovering(Boolean((event.target as HTMLElement).closest("a, button")));
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", setHover, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", setHover);
    };
  }, [x, y]);

  return (
    <motion.div
      className={`cursor-glow ${isHovering ? "cursor-glow-active" : ""}`}
      style={{ x: springX, y: springY }}
      aria-hidden="true"
    />
  );
}

function useTypingLoop(lines: string[]) {
  const [line, setLine] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setLine(lines[0]);
      return;
    }

    const target = lines[lineIndex];
    const finished = line === target;
    const erased = line.length === 0 && deleting;
    const delay = finished ? 1500 : erased ? 400 : deleting ? 42 : 78;
    const timer = window.setTimeout(() => {
      if (finished) {
        setDeleting(true);
      } else if (erased) {
        setDeleting(false);
        setLineIndex((index) => (index + 1) % lines.length);
      } else {
        setLine((current) =>
          deleting ? current.slice(0, -1) : target.slice(0, current.length + 1),
        );
      }
    }, delay);
    return () => window.clearTimeout(timer);
  }, [deleting, line, lineIndex, lines, prefersReducedMotion]);

  return line;
}

function MagneticLink({ children, className, ...props }: React.ComponentProps<"a">) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  return (
    <a
      {...props}
      className={className}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setOffset({
          x: (event.clientX - rect.left - rect.width / 2) * 0.12,
          y: (event.clientY - rect.top - rect.height / 2) * 0.12,
        });
        props.onMouseMove?.(event);
      }}
      onMouseLeave={(event) => {
        setOffset({ x: 0, y: 0 });
        props.onMouseLeave?.(event);
      }}
      style={{ ...props.style, transform: `translate(${offset.x}px, ${offset.y}px)` }}
    >
      {children}
    </a>
  );
}

const PROJECT_TECH_ICONS: Record<string, IconType> = {
  Docker: SiDocker,
  Kubernetes: SiKubernetes,
  AWS: FaAws,
  "AWS EC2": FaAws,
  React: SiReact,
  "Node.js": SiNodedotjs,
  MongoDB: SiMongodb,
  Nginx: SiNginx,
  Linux: SiLinux,
  Bash: SiGnubash,
};

function ProjectTag({ tag }: { tag: string }) {
  const Icon = PROJECT_TECH_ICONS[tag];

  return (
    <span className="chip project-tech-tag px-3 py-1 text-xs">
      {Icon ? <Icon aria-hidden="true" /> : null}
      {tag}
    </span>
  );
}

function ProjectCard({
  project,
  index,
  className = "",
}: {
  project: (typeof PROJECTS)[number];
  index: number;
  className?: string;
}) {
  const [flipped, setFlipped] = useState(false);
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springX = useSpring(tiltX, { stiffness: 180, damping: 22 });
  const springY = useSpring(tiltY, { stiffness: 180, damping: 22 });

  return (
    <motion.article
      initial={{ opacity: 0, rotateX: 10, y: 22 }}
      whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, delay: index * 0.08, ease: "easeOut" }}
      onMouseMove={(event) => {
        spotlight(event);
        const rect = event.currentTarget.getBoundingClientRect();
        tiltX.set(((event.clientY - rect.top) / rect.height - 0.5) * -8);
        tiltY.set(((event.clientX - rect.left) / rect.width - 0.5) * 8);
      }}
      onMouseLeave={() => {
        tiltX.set(0);
        tiltY.set(0);
      }}
      style={
        {
          "--project-accent": project.accent,
          minHeight: project.cardMinHeight,
          rotateX: springX,
          rotateY: springY,
          transformPerspective: 1200,
        } as React.CSSProperties
      }
      className={`project-flip-shell ${flipped ? "is-flipped" : ""} ${className}`}
      onClick={() => setFlipped((value) => !value)}
    >
      <div className="project-flip-inner">
        <div className="project-face project-card-surface glow-card group flex flex-col p-8">
          <motion.span
            className="project-depth-shadow"
            style={{
              x: useTransform(springY, [-8, 8], [12, -12]),
              y: useTransform(springX, [-8, 8], [-8, 8]),
            }}
            aria-hidden="true"
          />
          <span
            className={`project-flip-affordance ${project.featured ? "right-24" : ""}`}
            aria-hidden="true"
          >
            <Rotate3D size={16} />
          </span>
          {project.featured ? <span className="project-featured-chip">Featured</span> : null}
          <span className="project-depth-bar absolute inset-x-0 top-0 h-1" />
          <div className="project-card-main relative z-10">
            <div
              className="project-depth-icon mb-5 flex h-12 w-12 items-center justify-center rounded-[0.85rem] border"
              style={{
                background: `color-mix(in oklab, ${project.accent} 14%, transparent)`,
                borderColor: `color-mix(in oklab, ${project.accent} 32%, transparent)`,
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke={project.accent}
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5.5 w-5.5"
                aria-hidden="true"
              >
                {project.icon}
              </svg>
            </div>
            <p
              className="project-category relative z-10 mb-2.5 font-mono"
              style={{ color: project.accent }}
            >
              {project.kicker}
            </p>
            <h3 className="relative z-10 mb-3 text-xl text-ink">{project.title}</h3>
            <p className="relative z-10 mb-6 text-sm leading-relaxed text-ink-soft">
              {project.description}
            </p>
          </div>
          <div className="project-card-actions relative z-10 mt-auto pt-6">
            <div className="mb-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <ProjectTag key={tag} tag={tag} />
              ))}
            </div>
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(event) => event.stopPropagation()}
              className="btn-solid relative z-10 self-start py-2.5 text-sm"
            >
              View Project →
            </a>
          </div>
        </div>
        <div className="project-face project-face-back project-card-surface glow-card p-8">
          <span className="project-flip-affordance" aria-hidden="true">
            <Rotate3D size={16} />
          </span>
          <span className="project-depth-bar absolute inset-x-0 top-0 h-1" />
          <p className="eyebrow mb-4">// deployment pipeline</p>
          <h3 className="mb-6 text-xl text-ink">Ship it cleanly</h3>
          <div className="pipeline" aria-label={`${project.pipeline.join(", ")} pipeline`}>
            {project.pipeline.map((stage) => (
              <span key={stage} className="pipeline-stage">
                {stage}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <ProjectTag key={tag} tag={tag} />
            ))}
          </div>
          <p className="mt-auto pt-8 font-mono text-xs text-ink-dim">click to return</p>
        </div>
      </div>
    </motion.article>
  );
}

function ShowcaseProjectCard({
  project,
  index,
  className = "",
}: {
  project: (typeof PROJECTS)[number];
  index: number;
  className?: string;
}) {
  return (
    <motion.a
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: "easeOut" }}
      className={`project-showcase-card ${className}`}
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      style={
        {
          "--project-accent": project.accent,
        } as React.CSSProperties
      }
    >
      <img
        src={project.image}
        alt={`${project.title} project preview`}
        className="project-showcase-image"
      />
    </motion.a>
  );
}

function Portfolio() {
  const active = useActiveSection();
  const educationTimelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: educationScrollProgress } = useScroll({
    target: educationTimelineRef,
    offset: ["start 72%", "end 52%"],
  });
  const timelineScale = useTransform(educationScrollProgress, [0, 0.9], [0, 1]);
  const prefersReducedMotion = useReducedMotion();
  const typedIdentity = useTypingLoop([
    "full-stack developer",
    "devops engineer",
    "problem solver",
  ]);
  const [copiedContact, setCopiedContact] = useState<string | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > window.innerHeight * 0.7);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  async function copyContact(value: string) {
    await navigator.clipboard.writeText(value);
    setCopiedContact(value);
    window.setTimeout(() => setCopiedContact(null), 1400);
  }

  return (
    <div className="relative min-h-screen">
      <SkyBackdrop />
      <CursorGlow />

      <div className="relative z-10">
        <nav className="site-nav sticky top-4 z-50 flex justify-center px-4">
          <div className="glass-panel flex gap-1 rounded-full p-2 shadow-[0_10px_40px_oklch(0_0_0/0.4)]">
            {NAV_LINKS.map((link) => (
              <a key={link.id} href={`#${link.id}`} className="dock-link relative">
                {active === link.id ? (
                  <motion.span
                    layoutId="active-nav-pill"
                    className="dock-link-active absolute inset-0 -z-0"
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                  />
                ) : null}
                <span className="relative z-10">{link.label}</span>
              </a>
            ))}
          </div>
        </nav>

        <div className="mx-auto max-w-5xl px-6">
          {/* HERO */}
          <section
            id="home"
            className="hero-layout relative overflow-hidden pt-16 pb-16 text-center sm:pt-24"
          >
            <div className="hero-portrait-layer" aria-hidden="true">
              <PhotoFrame3D photoUrl={photoUrl} />
            </div>

            <div className="hero-copy">
              <div
                className="reveal relative z-10 mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[0.8rem]"
                style={{
                  color: "var(--signal)",
                  borderColor: "color-mix(in oklab, var(--signal) 30%, transparent)",
                  background: "color-mix(in oklab, var(--signal) 9%, transparent)",
                  animationDelay: "0.05s",
                }}
              >
                <span
                  className="h-[7px] w-[7px] rounded-full"
                  style={{
                    background: "var(--signal)",
                    animation: "signal-pulse 2s infinite",
                  }}
                />
                open to full-stack &amp; devops roles
              </div>

              <h1
                className="reveal relative z-10 mx-auto max-w-3xl text-[clamp(2.2rem,6vw,3.8rem)] leading-[1.05] font-bold tracking-tight"
                style={{ animationDelay: "0.1s" }}
              >
                <span className="text-ink">Hi, I'm </span>
                <span className="section-title">Jatin Thakur</span>
              </h1>

              <p
                className="reveal relative z-10 mt-4 text-lg font-semibold text-ink"
                style={{ animationDelay: "0.15s" }}
              >
                Full-Stack Developer&nbsp; | &nbsp;DevOps Engineer
              </p>

              <div
                className="reveal glass-panel relative z-10 mx-auto mt-8 max-w-xl px-5 py-4 text-left font-mono text-sm text-ink-soft"
                style={{ animationDelay: "0.2s" }}
              >
                <span style={{ color: "var(--signal)" }}>$</span>{" "}
                <span aria-live="polite">whoami: {typedIdentity}</span>
                <span className="terminal-cursor" aria-hidden="true">
                  ▍
                </span>
                <br />
                <span style={{ color: "var(--primary)" }}>jatin</span> — builds web apps, then ships
                and automates them.
              </div>

              <div
                className="reveal relative z-10 mt-8 flex flex-wrap justify-center gap-3.5"
                style={{ animationDelay: "0.25s" }}
              >
                <MagneticLink href="#projects" className="btn-solid">
                  View My Work
                </MagneticLink>
                <MagneticLink href="#contact" className="btn-ghost-outline">
                  Get In Touch
                </MagneticLink>
                <MagneticLink
                  href="/resume/Jatin_Thakur_Resume_DevOps.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="btn-ghost-outline"
                >
                  Download Resume
                </MagneticLink>
              </div>

              <div
                className="reveal relative z-10 mx-auto mt-14 grid max-w-2xl grid-cols-3 gap-3.5"
                style={{ animationDelay: "0.3s" }}
              >
                {[
                  { k: "Full-Stack", v: "Web Apps" },
                  { k: "DevOps", v: "Automation" },
                  { k: "DSA", v: "Problem Solver" },
                ].map((s) => (
                  <div key={s.k} className="stat-tile">
                    <p className="aurora-text text-lg font-bold sm:text-xl">{s.k}</p>
                    <p className="mt-1 font-mono text-[0.68rem] tracking-wider text-ink-dim uppercase">
                      {s.v}
                    </p>
                  </div>
                ))}
              </div>

              <div
                className="marquee-mask reveal relative z-10 mt-12"
                style={{ animationDelay: "0.35s" }}
              >
                <div className="marquee-track">
                  {[...MARQUEE_TECH, ...MARQUEE_TECH].map((t, i) => (
                    <span key={`${t}-${i}`} className="tech-marquee-item">
                      <TechIcon name={t} />
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ABOUT */}
          <section id="about" className="pt-24 pb-10">
            <SectionHeading eyebrow="01 — who i am" title="About Me" />

            <p className="mx-auto mb-12 max-w-2xl text-center text-[1.05rem] leading-[1.8] text-ink-soft">
              I'm a full-stack developer who's just as comfortable deploying an app as building it.
              I love{" "}
              <span className="font-semibold" style={{ color: "var(--primary)" }}>
                web development
              </span>
              , I love{" "}
              <span className="font-semibold" style={{ color: "var(--signal)" }}>
                DevOps
              </span>{" "}
              — turning infrastructure into code and pipelines that just work — and honestly, I love
              a good <b className="font-semibold text-ink">DSA problem</b> too. Give me a broken
              build, a messy dataset, or an infra outage and I'm genuinely happy to dig in.
            </p>

            <div className="grid gap-5 sm:grid-cols-2">
              {ABOUT_CARDS.map((card, index) => {
                const cardAccent =
                  index === 1
                    ? "var(--signal)"
                    : index === 2
                      ? "oklch(0.82 0.15 85)"
                      : "var(--primary)";

                return (
                  <motion.div
                    key={card.line}
                    initial={{ opacity: 0, rotateX: 10, y: 18 }}
                    whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.6, delay: index * 0.08, ease: "easeOut" }}
                    onMouseMove={spotlight}
                    className="glow-card p-8"
                  >
                    <div
                      className="mb-4 flex h-9 w-9 items-center justify-center rounded-[0.6rem] text-base"
                      style={{
                        background: `color-mix(in oklab, ${cardAccent} 14%, transparent)`,
                        color: cardAccent,
                      }}
                    >
                      {card.glyph}
                    </div>
                    <p className="text-lg leading-snug font-semibold text-ink">{card.line}</p>
                    {"tags" in card && card.tags ? (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {card.tags.map((tag) => (
                          <span key={tag} className="chip font-mono text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* EDUCATION */}
          <section id="education" className="pt-24 pb-10">
            <SectionHeading
              eyebrow="02 — the foundation"
              title="Education"
              subtitle="The milestones that shaped how I think, build, and keep learning."
            />

            <div ref={educationTimelineRef} className="relative mx-auto max-w-3xl">
              <div
                className="absolute top-2 bottom-2 left-[1.15rem] w-px sm:left-1/2 sm:-translate-x-1/2"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent, var(--primary) 12%, var(--signal) 55%, transparent)",
                }}
                aria-hidden="true"
              />
              <motion.div
                className="education-timeline-progress absolute top-2 bottom-2 left-[1.15rem] w-px origin-top sm:left-1/2 sm:-translate-x-1/2"
                style={{ scaleY: prefersReducedMotion ? 1 : timelineScale }}
                aria-hidden="true"
              />

              <div className="space-y-7 sm:space-y-10">
                {EDUCATION.map((item, index) => {
                  const MilestoneIcon = [GraduationCap, School, BookOpen][index] ?? BookOpen;

                  return (
                    <motion.article
                      key={item.title}
                      initial={{ opacity: 0, rotateX: 10, y: 18 }}
                      whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.6, delay: index * 0.08, ease: "easeOut" }}
                      onMouseMove={spotlight}
                      className={`education-timeline-item group relative flex items-start gap-5 pl-11 sm:gap-0 sm:pl-0 ${
                        index % 2 === 0 ? "sm:pr-[calc(50%+2.5rem)]" : "sm:pl-[calc(50%+2.5rem)]"
                      }`}
                    >
                      <span
                        className="education-timeline-dot absolute top-7 left-[0.65rem] z-10 h-4 w-4 rounded-full border-[3px] sm:left-1/2 sm:-translate-x-1/2"
                        style={{
                          background: item.accent,
                          borderColor: "var(--background)",
                          boxShadow: `0 0 0 4px color-mix(in oklab, ${item.accent} 20%, transparent), 0 0 22px color-mix(in oklab, ${item.accent} 55%, transparent)`,
                        }}
                        aria-hidden="true"
                      />
                      <div className="education-card glow-card w-full p-6 sm:p-7">
                        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                          <div className="flex items-center gap-2.5">
                            <span
                              className="flex h-9 w-9 items-center justify-center rounded-lg"
                              style={{
                                color: item.accent,
                                background: `color-mix(in oklab, ${item.accent} 12%, transparent)`,
                              }}
                              aria-hidden="true"
                            >
                              <MilestoneIcon size={18} strokeWidth={1.8} />
                            </span>
                            <span
                              className="rounded-full border px-3 py-1 font-mono text-[0.72rem] tracking-wider"
                              style={{
                                color: item.accent,
                                borderColor: `color-mix(in oklab, ${item.accent} 35%, transparent)`,
                                background: `color-mix(in oklab, ${item.accent} 10%, transparent)`,
                              }}
                            >
                              {item.year}
                            </span>
                          </div>
                          <span className="font-mono text-[0.68rem] tracking-wider text-ink-dim uppercase">
                            milestone 0{index + 1}
                          </span>
                        </div>
                        <h3 className="text-xl leading-tight text-ink">{item.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.school}</p>
                        {"highlights" in item && item.highlights ? (
                          <ul className="education-highlights mt-5 space-y-2">
                            {item.highlights.map((highlight) => (
                              <li key={highlight}>{highlight}</li>
                            ))}
                          </ul>
                        ) : null}
                        <p
                          className="mt-5 inline-flex rounded-lg px-3 py-2 font-mono text-xs"
                          style={{
                            color: item.accent,
                            background: `color-mix(in oklab, ${item.accent} 9%, transparent)`,
                          }}
                        >
                          {item.result}
                        </p>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            </div>
          </section>

          {/* PROJECTS */}
          <section id="projects" className="projects-section pt-24 pb-10">
            <SectionHeading
              eyebrow="03 — selected work"
              title="My Projects"
              subtitle="A mix of applications I've built and infrastructure I've automated."
            />

            <div className="project-showcase-grid">
              {PROJECTS.map((project, index) => (
                <ShowcaseProjectCard
                  key={project.title}
                  project={project}
                  index={index}
                />
              ))}
            </div>
          </section>

          {/* SKILLS */}
          <section id="skills" className="pt-24 pb-10">
            <SectionHeading eyebrow="04 — toolbox" title="My Skills" />

            <div className="skills-sphere-desktop">
              <SkillsSphere groups={SKILL_GROUPS} />
            </div>
            <div className="skills-grid-mobile grid gap-11 sm:grid-cols-2 sm:gap-x-14">
              {SKILL_GROUPS.map((group, index) => (
                <motion.div
                  key={group.title}
                  initial={{ opacity: 0, rotateX: 10, y: 18 }}
                  whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.6, delay: index * 0.08, ease: "easeOut" }}
                >
                  <h4 className="mb-4 text-sm font-semibold tracking-[0.08em] text-ink-dim uppercase">
                    {group.title}
                  </h4>
                  <div className="flex flex-wrap gap-2.5">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className={`chip ${group.variant === "signal" ? "chip-signal" : ""}`}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <h4 className="mb-4 text-sm font-semibold tracking-[0.08em] text-ink-dim uppercase">
                Soft Skills
              </h4>
              <div className="flex flex-wrap justify-center gap-2.5">
                {SOFT_SKILLS.map((skill) => (
                  <span key={skill} className="chip chip-plain">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* CONTACT */}
          <section id="contact" className="pt-24 pb-10">
            <div
              onMouseMove={spotlight}
              className="glow-card mx-auto max-w-3xl px-8 py-12 sm:px-10"
            >
              <p className="eyebrow mb-4 w-full justify-center">05 — say hi</p>
              <h2 className="section-title text-center">Get In Touch</h2>
              <p className="mx-auto mt-4 mb-9 max-w-lg text-center leading-relaxed text-ink-soft">
                I'm always open to exciting projects, DevOps work, or collaborations. Feel free to
                drop a message or connect with me!
              </p>

              <div className="grid gap-3.5 sm:grid-cols-2">
                {CONTACTS.map((contact) => (
                  <div
                    key={contact.href}
                    onMouseMove={spotlight}
                    className="contact-card glow-card group relative"
                  >
                    <a
                      href={contact.href}
                      target={contact.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-4 py-3.5 pr-12 text-sm break-all text-ink-soft hover:text-ink"
                    >
                      <span
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm"
                        style={{
                          background: "color-mix(in oklab, var(--primary) 14%, transparent)",
                          color: "var(--primary)",
                        }}
                      >
                        {contact.glyph}
                      </span>
                      {contact.label}
                    </a>
                    {contact.copyValue ? (
                      <button
                        type="button"
                        aria-label={`Copy ${contact.label}`}
                        className="copy-contact-button"
                        onClick={() => copyContact(contact.copyValue)}
                      >
                        <Copy size={14} />
                        <span className="copy-tooltip">
                          {copiedContact === contact.copyValue ? "Copied!" : "Copy"}
                        </span>
                      </button>
                    ) : null}
                  </div>
                ))}
              </div>

              <div className="mt-9 text-center">
                <a href="mailto:jatuthakur170@gmail.com" className="btn-solid">
                  Say Hello 👋
                </a>
                <a
                  href="/resume/Jatin_Thakur_Resume_DevOps.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="mt-4 block text-sm text-ink-soft underline decoration-[color-mix(in_oklab,var(--primary)_45%,transparent)] underline-offset-4 transition-colors hover:text-ink"
                >
                  Download Resume
                </a>
              </div>
            </div>
          </section>

          <footer className="py-14 text-center font-mono text-xs text-ink-dim">
            // built by Jatin Thakur — 2026
          </footer>
        </div>
      </div>
      <button
        type="button"
        aria-label="Back to top"
        className={`back-to-top ${showBackToTop ? "back-to-top-visible" : ""}`}
        onClick={() => document.getElementById("home")?.scrollIntoView({ behavior: "smooth" })}
      >
        <ArrowUp size={17} />
      </button>
    </div>
  );
}
