/* eslint-disable @next/next/no-img-element */
import { PortraitSwitcher } from "./PortraitSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import { JiraRLPlayground } from "./JiraRLPlayground";
import { ContactForm } from "./ContactForm";
import { MobileNav } from "./MobileNav";
import { MeetupPlayground, SearchPlayground, SupplyChainPlayground } from "./ProjectPlaygrounds";

const experience = [
  {
    role: "Software Engineer · Associate Consultant",
    company: "Oracle Financial Services Software",
    period: "Jul 2023 to Aug 2026",
    location: "Mumbai, India",
    intro:
      "Built and modernised backend systems for one of India’s largest banking platforms.",
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
    intro:
      "Designed a loan eligibility product and the machine-learning workflow behind it.",
    highlights: [
      "Trained a logistic regression model with 92% test accuracy.",
      "Built authentication, profile management, and prediction modules for the web application.",
    ],
    stack: ["Python", "Pandas", "NumPy", "Scikit-learn"],
    color: "mint",
  },
];

const projects = [
  {
    title: "JiraRL",
    kicker: "Stateful RL environment · OpenEnv",
    description:
      "An OpenEnv-compatible Jira simulation for training and evaluating LLM agents across ticket triage, assignment, prioritization, dependencies, SLA compliance, and resolution workflows.",
    highlights: [
      "Built a stateful, OpenEnv-compatible Jira workflow simulator with structured agent actions, isolated episodes, dependency constraints, deterministic task generation, and executable reward functions.",
      "Generated and validated 3,500 hint-free procedural training decisions with disjoint train, validation, and test seeds, publishing reproducible datasets and model adapters to Hugging Face.",
      "Fine-tuned Qwen3-0.6B using 4-bit QLoRA, achieving 100% completion across 60 held-out in-distribution workflow episodes, with 500/500 productive transitions and zero invalid actions.",
      "Implemented environment-backed GRPO with checkpoint recovery, balanced rewards, neutral rollouts, behavioral audits, and automated promotion gates.",
      "Diagnosed action collapse and zero-gradient RL optimization using raw trajectories, candidate reward variance, entropy, and gradient statistics; currently extending evaluation to out-of-distribution workflows and recovery states.",
    ],
    technologies: ["Python", "FastAPI", "OpenEnv", "Qwen3", "QLoRA", "GRPO", "Hugging Face"],
    visual: "jira",
    href: "https://github.com/git-chirag",
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
];

const skillGroups = [
  {
    label: "Languages",
    items: ["Java", "Python", "C", "JavaScript", "SQL"],
    color: "peach",
  },
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
];

const deviconBase = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";

const skillIcons: Record<string, string> = {
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
};

const achievements = [
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
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function ProjectVisual({ kind, title }: { kind: string; title: string }) {
  if (kind === "jira") {
    return <JiraRLPlayground />;
  }

  if (kind === "search") {
    return <SearchPlayground title={title} />;
  }

  if (kind === "chain") {
    return <SupplyChainPlayground title={title} />;
  }

  return <MeetupPlayground title={title} />;
}

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Chirag Aparadh, home">
          <span>CA</span>
          <strong>chirag aparadh</strong>
        </a>

        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#proof">Proof</a>
        </nav>

        <ThemeToggle />

        <a className="nav-cta" href="#contact">
          Say hello <span className="nav-plane" aria-hidden="true">➤</span>
        </a>

        <MobileNav />
      </header>

      <main id="main">
        <section className="hero" id="top">
          <div className="hero-copy">
            <p className="eyebrow"><span /> M.S. CS @ UMass Amherst · Class of 2028</p>
            <h1>
              I build the systems
              <span className="hero-highlight">behind the screen.</span>
            </h1>
            <p className="hero-intro">
              I’m <strong>Chirag Aparadh</strong>, a software engineer working on reliable backend,
              distributed, and AI-powered systems, from banking platforms to multimodal search.
            </p>
            <div className="hero-actions">
              <a className="button button--dark" href="#projects">
                See what I build <span aria-hidden="true">↓</span>
              </a>
              <a className="button button--paper" href="/resume.pdf" target="_blank" rel="noreferrer">
                Read my résumé <Arrow />
              </a>
            </div>
            <div className="hero-links" aria-label="Social links">
              <a href="https://github.com/git-chirag" target="_blank" rel="noreferrer">GitHub <Arrow /></a>
              <a href="https://linkedin.com/in/chirag-aparadh" target="_blank" rel="noreferrer">LinkedIn <Arrow /></a>
              <span>Mumbai, India</span>
            </div>
          </div>

          <div className="hero-art" aria-label="Portrait and career highlights">
            <div className="shape shape--orange" aria-hidden="true" />
            <div className="shape shape--pink" aria-hidden="true" />
            <div className="shape shape--mint" aria-hidden="true" />
            <div className="portrait-card">
              <PortraitSwitcher />
              <div className="portrait-caption">
                <span>Currently</span>
                <strong>M.S. CS @ UMass Amherst</strong>
              </div>
            </div>
            <div className="float-card float-card--users">
              <strong>2M+</strong>
              <span>daily users</span>
            </div>
            <div className="float-card float-card--uptime">
              <span className="status-dot" />
              <strong>99.99%</strong>
              <span>platform uptime</span>
            </div>
            <span className="confetti confetti--one" aria-hidden="true" />
            <span className="confetti confetti--two" aria-hidden="true" />
            <span className="confetti confetti--three" aria-hidden="true" />
          </div>
        </section>

        <div className="ticker" aria-label="Areas of expertise">
          <div className="ticker-track">
            <span>Backend systems</span><i>✦</i><span>Applied AI</span><i>✦</i>
            <span>Cloud infrastructure</span><i>✦</i><span>Distributed systems</span><i>✦</i>
            <span>Backend systems</span><i>✦</i><span>Applied AI</span><i>✦</i>
            <span>Cloud infrastructure</span><i>✦</i><span>Distributed systems</span><i>✦</i>
          </div>
        </div>

        <section className="section about" id="about">
          <div className="section-heading section-heading--split">
            <div>
              <p className="section-number">01 · About</p>
              <h2>Serious systems.<br /><em>A little colour.</em></h2>
            </div>
            <p>
              I like the invisible parts of products: the queues, services, data flows, and
              decisions that make an experience feel effortless. My work sits where dependable
              engineering meets useful intelligence.
            </p>
          </div>

          <div className="about-grid">
            <article className="about-card about-card--wide">
              <span className="card-label">What I care about</span>
              <h3>Software people can trust when the stakes are real.</h3>
              <p>
                At Oracle Financial Services Software, I worked on core banking services used at
                national scale. I now explore retrieval systems, distributed workloads,
                and how applied AI can solve concrete product problems.
              </p>
            </article>
            <article className="metric-card metric-card--pink">
              <strong>150K</strong>
              <p>daily transactions strengthened with bot-detection workflows</p>
            </article>
            <article className="metric-card metric-card--yellow">
              <strong>2M+</strong>
              <p>daily users supported by the core banking platform I help maintain</p>
            </article>
            <article className="metric-card metric-card--mint">
              <strong>92%</strong>
              <p>test accuracy achieved by the loan eligibility model I developed</p>
            </article>
          </div>
        </section>

        <section className="section experience" id="experience">
          <div className="section-heading">
            <p className="section-number">02 · Experience</p>
            <h2>Where I’ve been<br /><em>building.</em></h2>
          </div>

          <div className="experience-list">
            {experience.map((item, index) => (
              <article className={`experience-card experience-card--${item.color}`} key={item.company}>
                <div className="experience-index" aria-hidden="true">0{index + 1}</div>
                <div className="experience-title">
                  <span>{item.period}</span>
                  <h3>{item.role}</h3>
                  <p>{item.company} · {item.location}</p>
                </div>
                <div className="experience-detail">
                  <p className="experience-intro">{item.intro}</p>
                  <ul>
                    {item.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                  </ul>
                  <div className="tag-list">
                    {item.stack.map((technology) => <span key={technology}>{technology}</span>)}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section projects" id="projects">
          <div className="section-heading section-heading--split section-heading--projects">
            <div>
              <p className="section-number">03 · Selected work</p>
              <h2>Things I made<br /><em>to learn & solve.</em></h2>
            </div>
            <p>A small selection of systems that move data, connect people, and make complicated workflows easier to use.</p>
          </div>

          <div className="project-grid">
            {projects.map((project, index) => (
              <article className={`project-card ${project.className}`} key={project.title}>
                <div className="project-image">
                  <ProjectVisual kind={project.visual} title={project.title} />
                  <span className="project-count">0{index + 1}</span>
                </div>
                <div className="project-copy">
                  <p className="project-kicker">{project.kicker}</p>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <ul className="project-highlights">
                    {project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                  </ul>
                  <div className="tag-list">
                    {project.technologies.map((technology) => <span key={technology}>{technology}</span>)}
                  </div>
                  <a href={project.href} target="_blank" rel="noreferrer" aria-label={`View ${project.title} on GitHub`}>
                    Explore the code <Arrow />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section toolbox" id="toolbox">
          <div className="section-heading section-heading--split">
            <div>
              <p className="section-number">04 · Toolbox</p>
              <h2>Tools I reach for<br /><em>and why.</em></h2>
            </div>
            <p>I choose technology for the problem in front of me. These are the tools I’ve used to ship, investigate, and iterate.</p>
          </div>

          <div className="skill-groups">
            {skillGroups.map((group, index) => (
              <article className={`skill-group skill-group--${group.color}`} key={group.label}>
                <span>0{index + 1}</span>
                <h3>{group.label}</h3>
                <ul>
                  {group.items.map((item) => {
                    const icon = skillIcons[item];
                    const isWideLogo = icon?.includes("amazonwebservices") || icon?.includes("/oracle/");
                    return (
                      <li key={item}>
                        {icon && (
                          <span className={`skill-logo${isWideLogo ? " skill-logo--wide" : ""}`} aria-hidden="true">
                            <img src={icon} alt="" width="28" height="22" loading="lazy" />
                          </span>
                        )}
                        <span>{item}</span>
                      </li>
                    );
                  })}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="section proof" id="proof">
          <div className="section-heading">
            <p className="section-number">05 · Education & proof</p>
            <h2>Always learning.<br /><em>Occasionally winning.</em></h2>
          </div>

          <div className="proof-layout">
            <div className="education-stack">
              <article className="education-card education-card--umass">
                <span className="education-year">2026 to 2028</span>
                <div className="education-mark education-mark--umass">
                  <img src="/umass-logo.png" alt="University of Massachusetts Amherst logo" />
                </div>
                <div>
                  <p>University of Massachusetts Amherst</p>
                  <h3>M.S. in Computer Science</h3>
                  <span>Currently attending · Class of 2028</span>
                </div>
              </article>
              <article className="education-card education-card--rait">
                <span className="education-year">2019 to 2023</span>
                <div className="education-mark education-mark--rait">
                  <img src="/rait-logo.png" alt="D. Y. Patil University logo" />
                </div>
                <div>
                  <p>Ramrao Adik Institute of Technology</p>
                  <h3>B.Tech in Computer Science & Engineering</h3>
                  <span>CGPA 9.51 / 10 · GATE qualified</span>
                </div>
              </article>
            </div>

            <div className="achievement-list">
              {achievements.map((achievement) => {
                const content = (
                  <>
                    <span className="achievement-year">{achievement.year}</span>
                    <div>
                      <h3>{achievement.title}</h3>
                      <p>{achievement.note}</p>
                    </div>
                    {achievement.href && <Arrow />}
                  </>
                );

                return achievement.href ? (
                  <a className="achievement-row" href={achievement.href} target="_blank" rel="noreferrer" key={achievement.title}>
                    {content}
                  </a>
                ) : (
                  <article className="achievement-row" key={achievement.title}>{content}</article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="contact-decoration contact-decoration--one" aria-hidden="true" />
          <div className="contact-decoration contact-decoration--two" aria-hidden="true" />
          <div className="contact-copy">
            <p className="section-number">06 · Let’s talk</p>
            <h2>Have a hard problem<br />with <em>real-world impact?</em></h2>
            <p className="contact-intro">
              I’m looking for Summer 2027 software engineering internships across backend systems,
              cloud infrastructure, distributed systems, and applied AI.
            </p>
            <a className="contact-link" href="https://linkedin.com/in/chirag-aparadh" target="_blank" rel="noreferrer">
              Or connect on LinkedIn <Arrow />
            </a>
          </div>
          <ContactForm />
        </section>
      </main>

      <footer>
        <a className="wordmark" href="#top"><span>CA</span><strong>chirag aparadh</strong></a>
        <p>Backend engineer. Systems thinker. Curious human.</p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </>
  );
}
