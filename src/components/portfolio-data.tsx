import { Phone } from "lucide-react";

export const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
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
    description:
      "Focus on full-stack development and DevOps; strong base in DSA, OS, networks, DBMS and cloud.",
    highlights: [
      "Data Structures & Algorithms",
      "Operating Systems & Computer Networks",
      "Database Management Systems & Cloud Computing",
    ],
  },
  {
    year: "2021 - 2022",
    title: "Class XII, H.P. Board",
    school: "Radha Krishna Sr. Sec. School, Ghandalwin, Bilaspur",
    result: "Percentage: 81%",
    accent: "var(--primary)",
    description:
      "Completed PCM with Computer Science; built a strong analytical foundation for engineering and problem-solving.",
    highlights: ["PCM — Physics, Chemistry & Mathematics", "Computer Science"],
  },
  {
    year: "2019 - 2020",
    title: "Class X, H.P. Board",
    school: "Nav Chetna Public School, Leheri-Sarail, Bilaspur",
    result: "Percentage: 86%",
    accent: "oklch(0.82 0.15 85)",
    description:
      "Built a strong academic base in mathematics, science and English while developing an early interest in technology.",
    highlights: ["Mathematics", "Science", "English", "Social Science", "Computer"],
  },
] as const;

export const EXPERIENCE = [
  {
    role: "DevOps Intern",
    company: "CodSoft",
    location: "Remote",
    duration: "Sep 2026 - Present",
    durationBadge: "SEP 2026 – PRESENT",
    accent: "var(--signal)",
    tags: ["Docker", "Git/GitHub", "Linux", "Nginx", "GitHub Actions", "Terraform", "CI/CD"],
    highlights: [
      "Selected for a 1-month virtual DevOps internship focused on hands-on experience with Docker, Git/GitHub, Linux, Nginx, CI/CD with GitHub Actions, and Infrastructure as Code with Terraform.",
      "Currently working on practical DevOps tasks involving containerization, automation, deployment, and cloud infrastructure.",
    ],
  },
  {
    role: "DevOps Specialist (Fellowship)",
    company: "Apexon",
    location: "",
    duration: "Feb 2026 - Jun 2026",
    durationBadge: "FEB 2026 – JUN 2026",
    accent: "var(--primary)",
    tags: ["AWS", "Linux", "Terraform", "Ansible", "Jenkins", "Docker", "Kubernetes", "CloudFormation"],
    highlights: [
      "Completed an intensive DevOps Fellowship covering AWS Cloud, Linux, Networking, Terraform, Ansible, Jenkins, Docker, Kubernetes, Monitoring, CloudFormation, and Infrastructure Automation.",
      "Applied DevOps concepts to real-world project work, gaining practical exposure to automation and cloud infrastructure workflows.",
    ],
  },
] as const;

export const PROJECTS = [
  {
    accent: "oklch(0.78 0.16 175)",
    kicker: "// AI · INTERVIEW PREP",
    category: "FULL-STACK · AI",
    title: "AI Interview Prep Kit",
    titleAccent: "Kit",
    image: "/projects/ai-interview-kit/home.png",
    description:
      "Turns a job description and company URL into a personalised interview prep kit with a company brief, role breakdown, and study plan.",
    impact:
      "Generates a full interview prep kit from a job description, and keeps your manual edits when you regenerate a section.",
    highlights: [
      "SSRF-safe crawler with robots.txt support",
      "Background generation with live status polling",
      "84 unit tests and a batch CLI",
    ],
    badges: ["Live", "Open Source"],
    note: "Backend is on a free tier, so the first load may take ~30s.",
    tags: ["Next.js", "TypeScript", "Node.js", "Express", "MongoDB", "Gemini API", "JWT"],
    cardMinHeight: 480,
    pipeline: ["Plan", "Generate", "Practice"],
    liveUrl: "https://frontend-gamma-wheat-83.vercel.app/",
    githubUrl: "https://github.com/jatinthakur011/ai-interview-prep-kit",
    featured: true,
    icon: (
      <>
        <path d="M12 2v7l4 2-4 2v7" />
        <path d="M6 6.5h8M6 17.5h12M6 12h7" />
      </>
    ),
  },
  {
    accent: "oklch(0.68 0.17 258)",
    kicker: "// KUBERNETES · REAL-TIME",
    category: "Full-Stack • DevOps",
    title: "ChatApp on Kubernetes",
    titleAccent: "on Kubernetes",
    image: "/projects/chatapp.png",
    description:
      "A real-time chat application containerised with Docker and deployed on Kubernetes to practise orchestration and scaling, with a Jenkins pipeline automating the build and deployment on AWS.",
    impact:
      "Takes a chat app from source code to a running Kubernetes deployment through an automated pipeline.",
    highlights: [
      "Dockerised frontend and backend",
      "Kubernetes deployments and services for orchestration",
      "Jenkins pipeline for automated build and deploy",
    ],
    badges: ["Dockerized", "CI/CD", "Open Source"],
    tags: ["Docker", "Kubernetes", "Jenkins", "AWS"],
    cardMinHeight: 480,
    pipeline: ["Git Push", "Jenkins", "Docker", "Kubernetes", "AWS"],
    pipelineStrip: true,
    liveUrl: undefined,
    githubUrl: "https://github.com/jatinthakur011/chatapp-k8s",
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
    category: "Full-Stack Web Application",
    title: "Health Hub",
    titleAccent: "Hub",
    image: "/projects/healthhub.png",
    description:
      "A healthcare platform that connects patients, doctors and blood donors in one place. Patients can book appointments and consult doctors online, and raise emergency blood requests that reach registered donors.",
    impact:
      "Brings appointments, online consultations and emergency blood requests into a single platform.",
    highlights: [
      "Separate flows for patients, doctors and donors",
      "Appointment booking and online consultation",
      "Emergency blood request system",
    ],
    badges: ["Live"],
    tags: ["React", "Node.js", "MongoDB"],
    cardMinHeight: 480,
    pipeline: ["Build", "Test", "Deploy"],
    featured: true,
    liveUrl: "https://healthhubmain.vercel.app/",
    githubUrl: "https://github.com/jatinthakur011/HealthHub",
    icon: <path d="M2 12h4l2-6 4 12 2-8 2 4h6" />,
  },
  {
    accent: "oklch(0.82 0.15 85)",
    kicker: "// HR PLATFORM",
    category: "Full-Stack Web Application",
    title: "Employee Management System",
    titleAccent: "Management System",
    image: "/projects/employee-management.png",
    description:
      "A full-stack HR web app that manages the daily operations of an organisation, from employee records and attendance to salary, leave and task assignment, with secure login and real-time communication.",
    impact:
      "Replaces scattered HR spreadsheets with one secure dashboard for admins and employees.",
    highlights: [
      "JWT authentication with protected routes",
      "Attendance, salary and leave management modules",
      "Task assignment, announcements and built-in chat",
    ],
    badges: ["Open Source"],
    tags: ["React", "Node.js", "MongoDB", "JWT"],
    cardMinHeight: 480,
    pipeline: ["Build", "Test", "Deploy"],
    liveUrl: undefined,
    githubUrl: "https://github.com/jatinthakur011/employee_management_system",
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
    category: "DevOps • Infrastructure",
    title: "Automated Linux Server Provisioning & Security Hardening",
    titleAccent: "Security Hardening",
    image: "/projects/linux-provisioning.png",
    description:
      "A Bash automation script that takes a fresh Ubuntu server to a secure, ready-to-use baseline in one run, replacing repetitive manual configuration.",
    impact:
      "Sets up a hardened Ubuntu server with one repeatable script instead of manual configuration.",
    highlights: [
      "Admin user setup and Nginx deployment",
      "UFW firewall rules and SSH hardening",
      "Automatic security updates",
    ],
    badges: ["Open Source"],
    tags: ["Bash", "Linux", "Nginx", "UFW", "SSH Hardening"],
    cardMinHeight: 620,
    pipeline: ["Provision", "Harden", "Validate"],
    liveUrl: undefined,
    githubUrl: "https://github.com/jatinthakur011/linux-server-provisioning-hardening",
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
    category: "DevOps • Monitoring",
    title: "Linux Server Monitoring & Auto-Recovery",
    titleAccent: "Auto-Recovery",
    image: "/projects/linux-monitoring.png",
    description:
      "A Bash-based monitoring system on AWS EC2 that tracks CPU, RAM, disk usage and critical services, logs health data, and automatically recovers Nginx when it fails.",
    impact:
      "Detects Nginx failures and restarts it automatically, checked every 5 minutes via Cron.",
    highlights: [
      "Monitors CPU, RAM, disk, Nginx and SSH",
      "Logs health data for later review",
      "Cron-scheduled self-healing recovery",
    ],
    badges: ["Open Source"],
    tags: ["Bash", "AWS EC2", "Cron", "Nginx", "Auto-Recovery"],
    cardMinHeight: 620,
    pipeline: ["Monitor", "Detect", "Recover"],
    liveUrl: undefined,
    githubUrl: "https://github.com/jatinthakur011/linux-server-monitoring",
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
    items: [
      { name: "React.js", descriptor: "UI Library" },
      { name: "Next.js", descriptor: "React Framework" },
      { name: "TypeScript", descriptor: "Typed JavaScript" },
      { name: "Tailwind CSS", descriptor: "Utility-First CSS" },
    ],
  },
  {
    title: "Backend",
    items: [
      { name: "Node.js", descriptor: "JavaScript Runtime" },
      { name: "Express.js", descriptor: "Web Framework" },
      { name: "MongoDB", descriptor: "NoSQL Database" },
      { name: "MySQL", descriptor: "Relational Database" },
    ],
  },
  {
    title: "DevOps",
    items: [
      { name: "Docker", descriptor: "Containerization" },
      { name: "Kubernetes", descriptor: "Container Orchestration" },
      { name: "Jenkins", descriptor: "CI/CD Automation" },
      { name: "Terraform", descriptor: "Infrastructure as Code" },
      { name: "Ansible", descriptor: "Configuration Automation" },
    ],
  },
  {
    title: "Cloud",
    items: [{ name: "AWS", descriptor: "Cloud Platform" }],
  },
  {
    title: "Tools",
    items: [
      { name: "Git", descriptor: "Version Control" },
      { name: "Vercel", descriptor: "Frontend Deployment" },
    ],
  },
  {
    title: "Languages",
    items: [
      { name: "JavaScript", descriptor: "Web Language" },
      { name: "Java", descriptor: "Object-Oriented Programming" },
      { name: "C++", descriptor: "Systems Programming" },
    ],
  },
];

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
