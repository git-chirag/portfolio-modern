export type FeatureFlagValue = "y" | "n";
export type DefaultTheme = "light" | "dark";
export type FeatureFlagName =
  | "bird"
  | "piano"
  | "clickSounds"
  | "customCursor"
  | "scrollIndicator";

// Change a value from "y" to "n" to disable that feature everywhere.
export const featureFlags: Record<FeatureFlagName, FeatureFlagValue> = {
  bird: "y",
  piano: "y",
  clickSounds: "y",
  customCursor: "y",
  scrollIndicator: "y",
};

export function featureEnabled(name: FeatureFlagName) {
  return featureFlags[name] === "y";
}

export type ProjectVisualKind = "jira" | "search" | "chain" | "meetup";

type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  location: string;
  intro: string;
  highlights: string[];
  stack: string[];
  color: string;
};

type ProjectItem = {
  title: string;
  kicker: string;
  description: string;
  highlights: string[];
  technologies: string[];
  visual: ProjectVisualKind;
  href: string;
  className: string;
};

type SkillGroup = {
  label: string;
  items: string[];
  color: string;
};

type EducationItem = {
  key: string;
  years: string;
  school: string;
  degree: string;
  note: string;
  logo: string;
  logoAlt: string;
};

type AchievementItem = {
  title: string;
  note: string;
  year: string;
  href?: string;
};

const deviconBase = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";

export const siteConfig: {
  identity: {
    name: string;
    shortName: string;
    email: string;
    location: string;
    github: string;
    linkedin: string;
    resume: string;
    footerLine: string;
  };
  appearance: {
    defaultTheme: DefaultTheme;
  };
  seo: {
    title: string;
    description: string;
    socialDescription: string;
    keywords: string[];
  };
  hero: {
    eyebrow: string;
    heading: string;
    highlight: string;
    introduction: string;
    currentLabel: string;
    currentValue: string;
    metrics: Array<{
      value: string;
      label: string;
      className: string;
      showStatusDot?: boolean;
    }>;
  };
  about: {
    introduction: string;
    cardLabel: string;
    cardTitle: string;
    cardBody: string;
    metrics: Array<{ value: string; label: string; color: string }>;
  };
  sectionIntroductions: {
    projects: string;
    toolbox: string;
  };
  experience: ExperienceItem[];
  projects: ProjectItem[];
  skillGroups: SkillGroup[];
  skillIcons: Record<string, string>;
  education: EducationItem[];
  achievements: AchievementItem[];
  contact: {
    introduction: string;
    linkLabel: string;
  };
} = {
  identity: {
    name: "Chirag Aparadh",
    shortName: "chirag aparadh",
    email: "chiragaparadh@gmail.com",
    location: "Amherst, MA",
    github: "https://github.com/git-chirag",
    linkedin: "https://linkedin.com/in/chirag-aparadh",
    resume: "/resume.pdf",
    footerLine: "Backend engineer. Systems thinker. Curious human.",
  },
  appearance: {
    defaultTheme: "light",
  },
  seo: {
    title: "Chirag Aparadh | Software Engineer",
    description:
      "Software engineer building reliable backend, distributed, and AI-powered systems. M.S. Computer Science student at UMass Amherst.",
    socialDescription: "I build the systems behind the screen.",
    keywords: [
      "Chirag Aparadh",
      "Software Engineer",
      "Backend Engineer",
      "Distributed Systems",
      "Applied AI",
      "UMass Amherst",
    ],
  },
  hero: {
    eyebrow: "M.S. CS @ UMass Amherst · Class of 2028",
    heading: "I build the systems",
    highlight: "behind the screen.",
    introduction:
      "a software engineer working on reliable backend, distributed, and AI-powered systems, from banking platforms to multimodal search.",
    currentLabel: "Currently",
    currentValue: "M.S. CS @ UMass Amherst",
    metrics: [
      { value: "2M+", label: "daily users", className: "float-card--users" },
      {
        value: "99.99%",
        label: "platform uptime",
        className: "float-card--uptime",
        showStatusDot: true,
      },
    ],
  },
  about: {
    introduction:
      "I like the invisible parts of products: the queues, services, data flows, and decisions that make an experience feel effortless. My work sits where dependable engineering meets useful intelligence.",
    cardLabel: "What I care about",
    cardTitle: "Software people can trust when the stakes are real.",
    cardBody:
      "At Oracle Financial Services Software, I worked on core banking services used at national scale. I now explore retrieval systems, distributed workloads, and how applied AI can solve concrete product problems.",
    metrics: [
      {
        value: "150K",
        label: "daily transactions strengthened with bot-detection workflows",
        color: "pink",
      },
      {
        value: "2M+",
        label: "daily users supported by the core banking platform I help maintain",
        color: "yellow",
      },
      {
        value: "92%",
        label: "test accuracy achieved by the loan eligibility model I developed",
        color: "mint",
      },
    ],
  },
  sectionIntroductions: {
    projects:
      "A small selection of systems that move data, connect people, and make complicated workflows easier to use.",
    toolbox:
      "I choose technology for the problem in front of me. These are the tools I’ve used to ship, investigate, and iterate.",
  },
  experience: [
    {
      role: "Software Engineer · Associate Consultant",
      company: "Oracle Financial Services Software",
      period: "Jul 2023 to Aug 2026",
      location: "Mumbai, India",
      intro: "Built and modernised backend systems for one of India’s largest banking platforms.",
      highlights: [
        "Maintained core services supporting ~2M+ daily active users with 99.99% uptime.",
        "Implemented BioCatch bot detection and step-up authentication across ~150K daily merchant transactions.",
        "Built Kafka-based transaction acknowledgement flows for external broker integrations.",
        "Translated legacy, UI-driven banking workflows into validated backend service APIs.",
      ],
      stack: ["Java", "Java EE", "Kafka", "Oracle DB", "REST APIs", "WebSphere"],
      color: "coral",
    },
    {
      role: "Machine Learning Engineer · Intern",
      company: "TechCiti",
      period: "Aug 2021 to Sep 2021",
      location: "Remote",
      intro: "Designed a loan eligibility product and the machine-learning workflow behind it.",
      highlights: [
        "Trained a logistic regression model with 92% test accuracy.",
        "Built authentication, profile management, and prediction modules for the web application.",
      ],
      stack: ["Python", "Pandas", "NumPy", "Scikit-learn"],
      color: "mint",
    },
  ],
  projects: [
    {
      title: "JiraRL",
      kicker: "Stateful RL environment · OpenEnv",
      description:
        "An OpenEnv-compatible Jira simulation for training and evaluating LLM agents across ticket triage, assignment, prioritization, dependencies, SLA compliance, and resolution workflows.",
      highlights: [
        "Created a stateful, OpenEnv-compatible Jira simulator for training LLM agents, with structured actions, isolated episodes, dependency constraints, and executable reward functions.",
        "Generated and validated 3,500 hint-free procedural decisions across disjoint train/val/test seeds, publishing reproducible datasets and adapters to Hugging Face.",
        "Fine-tuned Qwen3-0.6B with 4-bit QLoRA, completing 60/60 held-out in-distribution episodes with 500/500 productive transitions and zero invalid actions.",
        "Built environment-backed GRPO with checkpoint recovery and promotion gates; diagnosed v1 action collapse and v2 zero-gradient saturation, blocking an unjustified long run.",
        "Diagnosed action collapse and zero-gradient RL optimization using raw trajectories, candidate reward variance, entropy, and gradient statistics; currently extending evaluation to out-of-distribution workflows and recovery states.",
      ],
      technologies: ["Python", "FastAPI", "OpenEnv", "Qwen3", "QLoRA", "GRPO", "Hugging Face"],
      visual: "jira",
      href: "https://github.com/git-chirag/jira-env-simulation",
      className: "project-card--hero project-card--jira",
    },
    {
      title: "Multimodal Image Search",
      kicker: "Distributed AI pipeline",
      description:
        "An asynchronous FastAPI and Celery system that generates CLIP embeddings for text-to-image retrieval, visual similarity search, and near-duplicate detection. Redis coordinates jobs, Qdrant indexes vectors, and S3 stores processed assets.",
      highlights: [
        "Generates CLIP embeddings for text search, visual similarity, and near-duplicate detection.",
        "Coordinates asynchronous processing through FastAPI, Celery, and Redis workers.",
        "Indexes vectors in Qdrant while storing processed assets reliably in Amazon S3.",
      ],
      technologies: ["FastAPI", "Celery", "CLIP", "Qdrant", "Redis", "AWS", "Docker"],
      visual: "search",
      href: "https://github.com/git-chirag/image_processor",
      className: "project-card--hero",
    },
    {
      title: "Blockchain Supply Chain",
      kicker: "Published research · DApp",
      description:
        "A role-aware Ethereum application for transparent product listings, bidding, purchasing, and traceability across the supply chain.",
      highlights: [
        "Models producer, distributor, retailer, and customer workflows with role-aware access.",
        "Uses Solidity contracts to preserve bidding, purchasing, and product provenance on-chain.",
        "Extends the ideas explored in my published IEEE research on blockchain supply chains.",
      ],
      technologies: ["Ethereum", "Solidity", "React", "Tailwind"],
      visual: "chain",
      href: "https://github.com/git-chirag",
      className: "project-card--yellow",
    },
    {
      title: "Social Meetup",
      kicker: "Location-aware mobile app",
      description:
        "A Flutter app for connection requests, live location sharing, and nearby meeting-place suggestions powered by Google Maps.",
      highlights: [
        "Supports connection requests and permission-aware live location sharing between friends.",
        "Suggests practical meeting places near the people joining through Google Maps.",
        "Uses Flutter and Firebase for a responsive mobile experience with real-time updates.",
      ],
      technologies: ["Flutter", "Dart", "Firebase", "Google Maps"],
      visual: "meetup",
      href: "https://github.com/git-chirag",
      className: "project-card--pink",
    },
  ],
  skillGroups: [
    { label: "Languages", items: ["Java", "Python", "C", "JavaScript", "SQL"], color: "peach" },
    {
      label: "Backend & systems",
      items: ["Java EE", "FastAPI", "Django", "REST APIs", "Microservices", "Kafka", "Celery"],
      color: "sky",
    },
    {
      label: "Data & AI",
      items: ["PyTorch", "CLIP", "Qdrant", "Redis", "Pandas", "Scikit-learn"],
      color: "pink",
    },
    {
      label: "Cloud & delivery",
      items: ["AWS", "Docker", "Kubernetes", "Jenkins", "Linux", "ECS", "ECR", "S3"],
      color: "mint",
    },
    {
      label: "Databases",
      items: ["Oracle Database", "MySQL", "MongoDB", "Firebase"],
      color: "lilac",
    },
  ],
  skillIcons: {
    Java: `${deviconBase}/java/java-original.svg`,
    Python: `${deviconBase}/python/python-original.svg`,
    C: `${deviconBase}/c/c-original.svg`,
    JavaScript: `${deviconBase}/javascript/javascript-original.svg`,
    "Java EE": `${deviconBase}/java/java-original.svg`,
    FastAPI: `${deviconBase}/fastapi/fastapi-original.svg`,
    Django: `${deviconBase}/django/django-plain.svg`,
    Kafka: `${deviconBase}/apachekafka/apachekafka-original.svg`,
    Celery: "https://cdn.simpleicons.org/celery/37814A",
    PyTorch: `${deviconBase}/pytorch/pytorch-original.svg`,
    CLIP: "https://cdn.simpleicons.org/openai/412991",
    Qdrant: "https://cdn.simpleicons.org/qdrant/DC244C",
    Redis: `${deviconBase}/redis/redis-original.svg`,
    Pandas: `${deviconBase}/pandas/pandas-original.svg`,
    "Scikit-learn": `${deviconBase}/scikitlearn/scikitlearn-original.svg`,
    AWS: `${deviconBase}/amazonwebservices/amazonwebservices-original-wordmark.svg`,
    Docker: `${deviconBase}/docker/docker-original.svg`,
    Kubernetes: `${deviconBase}/kubernetes/kubernetes-original.svg`,
    Jenkins: `${deviconBase}/jenkins/jenkins-original.svg`,
    Linux: `${deviconBase}/linux/linux-original.svg`,
    ECS: `${deviconBase}/amazonwebservices/amazonwebservices-original-wordmark.svg`,
    ECR: `${deviconBase}/amazonwebservices/amazonwebservices-original-wordmark.svg`,
    S3: `${deviconBase}/amazonwebservices/amazonwebservices-original-wordmark.svg`,
    "Oracle Database": `${deviconBase}/oracle/oracle-original.svg`,
    MySQL: `${deviconBase}/mysql/mysql-original.svg`,
    MongoDB: `${deviconBase}/mongodb/mongodb-original.svg`,
    Firebase: `${deviconBase}/firebase/firebase-original.svg`,
  },
  education: [
    {
      key: "umass",
      years: "2026 to 2028",
      school: "University of Massachusetts Amherst",
      degree: "M.S. in Computer Science",
      note: "Currently attending · Class of 2028",
      logo: "/umass-logo.png",
      logoAlt: "University of Massachusetts Amherst logo",
    },
    {
      key: "rait",
      years: "2019 to 2023",
      school: "Ramrao Adik Institute of Technology",
      degree: "B.Tech in Computer Science & Engineering",
      note: "CGPA 9.51 / 10 · GATE qualified",
      logo: "/rait-logo.png",
      logoAlt: "D. Y. Patil University logo",
    },
  ],
  achievements: [
    {
      title: "Meta × Hugging Face OpenEnv Finalist",
      note: "National finale · selected from 31,000+ registered teams",
      year: "2026",
    },
    {
      title: "IEEE Research Publication",
      note: "Exploring blockchain’s role in enhancing supply chains",
      year: "2023",
      href: "https://ieeexplore.ieee.org/document/10245587",
    },
    {
      title: "LeetCode Knight",
      note: "Rating 1866 · rank 1108 in Biweekly Contest 145",
      year: "2024",
      href: "https://leetcode.com/u/eLeet_chirag/",
    },
    {
      title: "GATE CS Qualified",
      note: "Rank 2816 among 75,680 candidates",
      year: "2023",
    },
  ],
  contact: {
    introduction:
      "I’m looking for Summer 2027 software engineering internships across backend systems, cloud infrastructure, distributed systems, and applied AI.",
    linkLabel: "Or connect on LinkedIn",
  },
};
