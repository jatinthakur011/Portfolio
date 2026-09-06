import { createFileRoute } from "@tanstack/react-router";
import type React from "react";
import { useEffect, useState } from "react";

import { SkyBackdrop } from "@/components/SkyBackdrop";
import {
  ABOUT_CARDS,
  CONTACTS,
  EDUCATION,
  NAV_LINKS,
  PROJECTS,
  SKILL_GROUPS,
  SOFT_SKILLS,
} from "@/components/portfolio-data";
import photoUrl from "@/assets/Photo.jpeg";

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
        content:
          "React, Node.js, Docker, Kubernetes and Terraform projects by Jatin Thakur.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
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
  "React",
  "Node.js",
  "TypeScript",
  "Docker",
  "Kubernetes",
  "Terraform",
  "Jenkins",
  "AWS",
  "Ansible",
  "MongoDB",
  "Linux",
  "Git",
];

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
    <div className="mb-14 text-center">
      {eyebrow ? <p className="eyebrow mb-4">{eyebrow}</p> : null}
      <h2 className="section-title">{title}</h2>
      {subtitle ? (
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink-soft">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

function Portfolio() {
  const active = useActiveSection();

  return (
    <div className="relative min-h-screen">
      <SkyBackdrop />

      <div className="relative z-10">
        <nav className="sticky top-4 z-50 flex justify-center px-4">
          <div className="glass-panel flex gap-1 rounded-full p-2 shadow-[0_10px_40px_oklch(0_0_0/0.4)]">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`dock-link ${active === link.id ? "dock-link-active" : ""}`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>

        <div className="mx-auto max-w-5xl px-6">
          {/* HERO */}
          <section id="home" className="pt-16 pb-16 text-center sm:pt-24">
            <div className="hero-photo relative mx-auto mb-9 h-48 w-48">
              <span className="orbit-ring-outer" aria-hidden="true" />
              <span className="orbit-ring" aria-hidden="true" />
              <span
                className="absolute -inset-2 rounded-full opacity-70 blur-md"
                style={{
                  background: "var(--gradient-aurora)",
                  animation: "ring-spin 14s linear infinite",
                }}
                aria-hidden="true"
              />
              <div className="relative h-full w-full rounded-full bg-background p-1.5">
                <img
                  src={photoUrl}
                  alt="Portrait of Jatin Thakur"
                  className="h-full w-full rounded-full object-cover object-top"
                  width={192}
                  height={192}
                />
              </div>
            </div>

            <div
              className="reveal mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[0.8rem]"
              style={{
                color: "var(--signal)",
                borderColor:
                  "color-mix(in oklab, var(--signal) 30%, transparent)",
                background:
                  "color-mix(in oklab, var(--signal) 9%, transparent)",
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
              className="reveal mx-auto max-w-3xl text-[clamp(2.2rem,6vw,3.8rem)] leading-[1.05] font-bold tracking-tight"
              style={{ animationDelay: "0.1s" }}
            >
              <span className="text-ink">Hi, I'm </span>
              <span className="section-title">Jatin Thakur</span>
            </h1>

            <p
              className="reveal mt-4 text-lg font-semibold text-ink"
              style={{ animationDelay: "0.15s" }}
            >
              Full-Stack Developer&nbsp; | &nbsp;DevOps Engineer
            </p>

            <div
              className="reveal glass-panel mx-auto mt-8 max-w-xl px-5 py-4 text-left font-mono text-sm text-ink-soft"
              style={{ animationDelay: "0.2s" }}
            >
              <span style={{ color: "var(--signal)" }}>$</span> whoami
              <br />
              <span style={{ color: "var(--primary)" }}>jatin</span> — builds web
              apps, then ships and automates them.
            </div>

            <div
              className="reveal mt-8 flex flex-wrap justify-center gap-3.5"
              style={{ animationDelay: "0.25s" }}
            >
              <a href="#projects" className="btn-solid">
                View My Work
              </a>
              <a href="#contact" className="btn-ghost-outline">
                Get In Touch
              </a>
            </div>

            <div
              className="reveal mx-auto mt-14 grid max-w-2xl grid-cols-3 gap-3.5"
              style={{ animationDelay: "0.3s" }}
            >
              {[
                { k: "Full-Stack", v: "Web Apps" },
                { k: "DevOps", v: "Automation" },
                { k: "DSA", v: "Problem Solver" },
              ].map((s) => (
                <div key={s.k} className="stat-tile">
                  <p className="aurora-text text-lg font-bold sm:text-xl">
                    {s.k}
                  </p>
                  <p className="mt-1 font-mono text-[0.68rem] tracking-wider text-ink-dim uppercase">
                    {s.v}
                  </p>
                </div>
              ))}
            </div>

            <div className="marquee-mask reveal mt-12" style={{ animationDelay: "0.35s" }}>
              <div className="marquee-track">
                {[...MARQUEE_TECH, ...MARQUEE_TECH].map((t, i) => (
                  <span
                    key={`${t}-${i}`}
                    className="font-mono text-sm whitespace-nowrap text-ink-dim"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* ABOUT */}
          <section id="about" className="pt-24 pb-10">
            <SectionHeading eyebrow="01 — who i am" title="About Me" />

            <p className="mx-auto mb-12 max-w-2xl text-center text-[1.05rem] leading-[1.8] text-ink-soft">
              I'm a full-stack developer who's just as comfortable deploying an
              app as building it. I love{" "}
              <span
                className="font-semibold"
                style={{ color: "var(--primary)" }}
              >
                web development
              </span>
              , I love{" "}
              <span className="font-semibold" style={{ color: "var(--signal)" }}>
                DevOps
              </span>{" "}
              — turning infrastructure into code and pipelines that just work —
              and honestly, I love a good{" "}
              <b className="font-semibold text-ink">DSA problem</b> too. Give me
              a broken build, a messy dataset, or an infra outage and I'm
              genuinely happy to dig in.
            </p>

            <div className="grid gap-5 sm:grid-cols-2">
              {ABOUT_CARDS.map((card) => (
                <div key={card.line} onMouseMove={spotlight} className="glow-card p-8">
                  <div
                    className="mb-4 flex h-9 w-9 items-center justify-center rounded-[0.6rem] text-base"
                    style={{
                      background:
                        "color-mix(in oklab, var(--primary) 14%, transparent)",
                      color: "var(--primary)",
                    }}
                  >
                    {card.glyph}
                  </div>
                  <p className="text-lg leading-snug font-semibold text-ink">
                    {card.line}
                  </p>
                  {"tags" in card && card.tags ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {card.tags.map((tag) => (
                        <span key={tag} className="chip font-mono text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </section>

          {/* EDUCATION */}
          <section id="education" className="pt-24 pb-10">
            <SectionHeading
              eyebrow="02 — the foundation"
              title="Education"
              subtitle="The milestones that shaped how I think, build, and keep learning."
            />

            <div className="relative mx-auto max-w-3xl">
              <div
                className="absolute top-2 bottom-2 left-[1.15rem] w-px sm:left-1/2 sm:-translate-x-1/2"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent, var(--primary) 12%, var(--signal) 55%, transparent)",
                }}
                aria-hidden="true"
              />

              <div className="space-y-7 sm:space-y-10">
                {EDUCATION.map((item, index) => (
                  <article
                    key={item.title}
                    onMouseMove={spotlight}
                    className={`relative flex items-start gap-5 pl-11 sm:gap-0 sm:pl-0 ${
                      index % 2 === 0 ? "sm:pr-[calc(50%+2.5rem)]" : "sm:pl-[calc(50%+2.5rem)]"
                    }`}
                  >
                    <span
                      className="absolute top-7 left-[0.65rem] z-10 h-4 w-4 rounded-full border-[3px] sm:left-1/2 sm:-translate-x-1/2"
                      style={{
                        background: item.accent,
                        borderColor: "var(--background)",
                        boxShadow: `0 0 0 4px color-mix(in oklab, ${item.accent} 20%, transparent), 0 0 22px color-mix(in oklab, ${item.accent} 55%, transparent)`,
                      }}
                      aria-hidden="true"
                    />
                    <div className="glow-card w-full p-6 sm:p-7">
                      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
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
                        <span className="font-mono text-[0.68rem] tracking-wider text-ink-dim uppercase">
                          milestone 0{index + 1}
                        </span>
                      </div>
                      <h3 className="text-xl leading-tight text-ink">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.school}</p>
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
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* PROJECTS */}
          <section id="projects" className="pt-24 pb-10">
            <SectionHeading
              eyebrow="03 — selected work"
              title="My Projects"
              subtitle="A mix of applications I've built and infrastructure I've automated."
            />

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {PROJECTS.map((project) => (
                <article
                  key={project.title}
                  onMouseMove={spotlight}
                  className="glow-card group flex flex-col p-8"
                >
                  <span
                    className="absolute inset-x-0 top-0 h-[3px]"
                    style={{
                      background: `linear-gradient(90deg, ${project.accent}, transparent 85%)`,
                    }}
                  />
                  <span
                    className="pointer-events-none absolute -top-8 -right-8 h-48 w-48 opacity-50 transition-all duration-500 group-hover:scale-110 group-hover:opacity-90"
                    style={{
                      background: `radial-gradient(circle at 70% 30%, ${project.accent}, transparent 58%)`,
                      maskImage:
                        "radial-gradient(circle at 70% 30%, black 0%, transparent 72%)",
                      WebkitMaskImage:
                        "radial-gradient(circle at 70% 30%, black 0%, transparent 72%)",
                    }}
                  />
                  <div
                    className="relative z-10 mb-5 flex h-12 w-12 items-center justify-center rounded-[0.85rem] border"
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
                    className="relative z-10 mb-2.5 font-mono text-[0.72rem] tracking-wider"
                    style={{ color: project.accent }}
                  >
                    {project.kicker}
                  </p>
                  <h3 className="relative z-10 mb-3 text-xl text-ink">
                    {project.title}
                  </h3>
                  <p className="relative z-10 mb-6 grow text-sm leading-relaxed text-ink-soft">
                    {project.description}
                  </p>
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-solid relative z-10 self-start py-2.5 text-sm"
                  >
                    View Project →
                  </a>
                </article>
              ))}
            </div>
          </section>

          {/* SKILLS */}
          <section id="skills" className="pt-24 pb-10">
            <SectionHeading eyebrow="04 — toolbox" title="My Skills" />

            <div className="grid gap-11 sm:grid-cols-2 sm:gap-x-14">
              {SKILL_GROUPS.map((group) => (
                <div key={group.title}>
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
                </div>
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
            <div onMouseMove={spotlight} className="glow-card mx-auto max-w-3xl px-8 py-12 sm:px-10">
              <p className="eyebrow mb-4 w-full justify-center">05 — say hi</p>
              <h2 className="section-title text-center">Get In Touch</h2>
              <p className="mx-auto mt-4 mb-9 max-w-lg text-center leading-relaxed text-ink-soft">
                I'm always open to exciting projects, DevOps work, or
                collaborations. Feel free to drop a message or connect with me!
              </p>

              <div className="grid gap-3.5 sm:grid-cols-2">
                {CONTACTS.map((contact) => (
                  <a
                    key={contact.href}
                    href={contact.href}
                    target={contact.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    onMouseMove={spotlight}
                    className="glow-card flex items-center gap-3 px-4 py-3.5 text-sm break-all text-ink-soft hover:text-ink"
                  >
                    <span
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm"
                      style={{
                        background:
                          "color-mix(in oklab, var(--primary) 14%, transparent)",
                        color: "var(--primary)",
                      }}
                    >
                      {contact.glyph}
                    </span>
                    {contact.label}
                  </a>
                ))}
              </div>

              <div className="mt-9 text-center">
                <a href="mailto:jatuthakur170@gmail.com" className="btn-solid">
                  Say Hello 👋
                </a>
              </div>
            </div>
          </section>

          <footer className="py-14 text-center font-mono text-xs text-ink-dim">
            // built by Jatin Thakur — 2026
          </footer>
        </div>
      </div>
    </div>
  );
}
