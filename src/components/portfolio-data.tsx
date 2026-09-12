import { Phone } from "lucide-react";

export const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
] as const;

export const ABOUT_CARDS = [
  {
    glyph: "◈",
    line: "I build the full path — from a React interface to the pipeline that ships it.",
  },
  {
    glyph: "⚙",
    line: "Automating infrastructure with Terraform, Ansible & Jenkins — one pipeline at a time.",
  },
  {
    glyph: "λ",
    line: "Off the clock, I'm solving DSA problems on LeetCode for the fun of it.",
  },
  {
    glyph: "▣",
    line: "My tech stack",
    tags: ["Node.js", "React", "Docker", "AWS"],
  },
] as const;

export const EDUCATION = [
  {
    year: "2022 - 2026",
    title: "B.E. Computer Science Engineering",
    school: "Chitkara University, Baddi, Himachal Pradesh",
    result: "CGPA: 8.25 / 10",
    accent: "var(--signal)",
  },
  {
    year: "2021 - 2022",
    title: "Class XII, H.P. Board",
    school: "Radha Krishna Sr. Sec. School, Ghandalwin, Bilaspur",
    result: "Percentage: 81%",
    accent: "var(--primary)",
  },
  {
    year: "2019 - 2020",
    title: "Class X, H.P. Board",
    school: "Nav Chetna Public School, Leheri-Sarail, Bilaspur",
    result: "Percentage: 86%",
    accent: "oklch(0.82 0.15 85)",
  },
] as const;

export const PROJECTS = [
  {
    accent: "oklch(0.68 0.17 258)",
    kicker: "// KUBERNETES · REAL-TIME",
    title: "ChatApp on Kubernetes",
    description:
      "A real-time chat app containerised with Docker and deployed on Kubernetes to practice orchestration and scaling.",
    tags: ["Docker", "Kubernetes", "Jenkins", "AWS"],
    pipeline: ["Build", "Test", "Deploy"],
    href: "https://github.com/jatinthakur011/chatapp-k8s",
    icon: (
      <>
        <path d="M12 2l8 4.5v9L12 20l-8-4.5v-9L12 2z" />
        <path d="M12 2v18M4 6.5l8 4.5 8-4.5M4 17.5l8-4.5 8 4.5" />
      </>
    ),
  },
  {
    accent: "oklch(0.72 0.16 10)",
    kicker: "// HEALTHCARE PLATFORM",
    title: "HealthHub",
    description:
      "A healthcare platform connecting patients, doctors, and donors for appointments, consultations, and emergency blood requests.",
    tags: ["React", "Node.js", "MongoDB"],
    pipeline: ["Build", "Test", "Deploy"],
    href: "https://github.com/jatinthakur011/HealthHub",
    icon: <path d="M2 12h4l2-6 4 12 2-8 2 4h6" />,
  },
  {
    accent: "oklch(0.82 0.15 85)",
    kicker: "// HR PLATFORM",
    title: "Employee Management System",
    description:
      "A web app for HR operations — secure auth, attendance, salary, task assignment, leave management, and real-time communication.",
    tags: ["React", "Node.js", "MongoDB", "JWT"],
    pipeline: ["Build", "Test", "Deploy"],
    href: "https://github.com/jatinthakur011/employee_management_system",
    icon: (
      <>
        <rect x="3" y="4" width="7" height="7" rx="1.5" />
        <rect x="14" y="4" width="7" height="7" rx="1.5" />
        <rect x="3" y="15" width="7" height="5" rx="1.5" />
        <rect x="14" y="13" width="7" height="7" rx="1.5" />
      </>
    ),
  },
  {
    accent: "oklch(0.77 0.15 155)",
    kicker: "// LINUX · SERVER PROVISIONING",
    title: "Automated Linux Server Provisioning & Security Hardening",
    description:
      "Bash automation that takes a fresh Ubuntu server and applies a repeatable baseline — admin user setup, Nginx deployment, UFW firewall rules, SSH hardening, and automatic security updates, replacing manual server configuration with one repeatable script.",
    tags: ["Bash", "Linux", "Nginx", "UFW", "SSH Hardening"],
    pipeline: ["Provision", "Harden", "Validate"],
    href: "https://github.com/jatinthakur011/linux-server-provisioning-hardening",
    icon: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="m7 9 2 2-2 2M11 14h5" />
      </>
    ),
  },
  {
    accent: "oklch(0.71 0.15 235)",
    kicker: "// DEVOPS · MONITORING & AUTO-RECOVERY",
    title: "Linux Server Monitoring & Auto-Recovery",
    description:
      "A Bash-based monitoring system on AWS EC2 that tracks CPU, RAM, disk usage, and critical services (Nginx, SSH), logs health data, and automatically detects and recovers from Nginx failures — scheduled via Cron every 5 minutes, demonstrating basic self-healing infrastructure.",
    tags: ["Bash", "AWS EC2", "Cron", "Nginx", "Auto-Recovery"],
    pipeline: ["Monitor", "Detect", "Recover"],
    href: "https://github.com/jatinthakur011/linux-server-monitoring",
    icon: (
      <>
        <circle cx="12" cy="12" r="8" />
        <path d="M12 7v5l3 2M5 5l2 2M17 5l-2 2" />
      </>
    ),
  },
];

export const SKILL_GROUPS = [
  {
    title: "Frontend",
    variant: "primary" as const,
    items: ["React.js", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "Backend",
    variant: "primary" as const,
    items: ["Node.js", "Express", "MongoDB", "MySQL"],
  },
  {
    title: "DevOps",
    variant: "signal" as const,
    items: [
      "Docker",
      "Kubernetes",
      "Jenkins",
      "Terraform",
      "Ansible",
      "AWS",
      "Git",
      "Vercel",
    ],
  },
  {
    title: "Programming Languages",
    variant: "primary" as const,
    items: ["JavaScript", "TypeScript", "Java", "C++"],
  },
];

export const SOFT_SKILLS = ["Teamwork", "Adaptability", "Leadership"];

export const CONTACTS = [
  {
    glyph: "✉",
    label: "jatuthakur170@gmail.com",
    href: "mailto:jatuthakur170@gmail.com",
    copyValue: "jatuthakur170@gmail.com",
  },
  {
    glyph: <Phone size={15} strokeWidth={1.8} />,
    label: "+91 8091259662",
    href: "tel:+918091259662",
    copyValue: "+91 8091259662",
  },
  {
    glyph: "in",
    label: "linkedin.com/in/jatin--thakur",
    href: "https://www.linkedin.com/in/jatin--thakur/",
  },
  {
    glyph: "⌥",
    label: "github.com/jatinthakur011",
    href: "https://github.com/jatinthakur011",
  },
  {
    glyph: "λ",
    label: "leetcode.com/u/Jatin_thakur01",
    href: "https://leetcode.com/u/Jatin_thakur01/",
  },
];
