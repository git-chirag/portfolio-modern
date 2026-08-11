/* eslint-disable @next/next/no-img-element */
import { PortraitSwitcher } from "./PortraitSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import { JiraRLPlayground } from "./JiraRLPlayground";
import { ContactForm } from "./ContactForm";
import { MobileNav } from "./MobileNav";
import { MeetupPlayground, SearchPlayground, SupplyChainPlayground } from "./ProjectPlaygrounds";
import { siteConfig, type ProjectVisualKind } from "./siteConfig";

const {
  identity,
  hero,
  about,
  sectionIntroductions,
  experience,
  projects,
  skillGroups,
  skillIcons,
  education,
  achievements,
  contact,
} = siteConfig;

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function ProjectVisual({ kind, title }: { kind: ProjectVisualKind; title: string }) {
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
        <a className="wordmark" href="#top" aria-label={`${identity.name}, home`}>
          <span>CA</span>
          <strong>{identity.shortName}</strong>
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
            <p className="eyebrow"><span /> {hero.eyebrow}</p>
            <h1>
              {hero.heading}
              <span className="hero-highlight">{hero.highlight}</span>
            </h1>
            <p className="hero-intro">
              I’m <strong>{identity.name}</strong>, {hero.introduction}
            </p>
            <div className="hero-actions">
              <a className="button button--dark" href="#projects">
                See what I build <span aria-hidden="true">↓</span>
              </a>
              <a className="button button--paper" href={identity.resume} target="_blank" rel="noreferrer">
                Read my résumé <Arrow />
              </a>
            </div>
            <div className="hero-links" aria-label="Social links">
              <a href={identity.github} target="_blank" rel="noreferrer">GitHub <Arrow /></a>
              <a href={identity.linkedin} target="_blank" rel="noreferrer">LinkedIn <Arrow /></a>
              <span>{identity.location}</span>
            </div>
          </div>

          <div className="hero-art" aria-label="Portrait and career highlights">
            <div className="shape shape--orange" aria-hidden="true" />
            <div className="shape shape--pink" aria-hidden="true" />
            <div className="shape shape--mint" aria-hidden="true" />
            <div className="portrait-card">
              <PortraitSwitcher />
              <div className="portrait-caption">
                <span>{hero.currentLabel}</span>
                <strong>{hero.currentValue}</strong>
              </div>
            </div>
            {hero.metrics.map((metric) => (
              <div className={`float-card ${metric.className}`} key={metric.label}>
                {metric.showStatusDot && <span className="status-dot" />}
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
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
            <p>{about.introduction}</p>
          </div>

          <div className="about-grid">
            <article className="about-card about-card--wide">
              <span className="card-label">{about.cardLabel}</span>
              <h3>{about.cardTitle}</h3>
              <p>{about.cardBody}</p>
            </article>
            {about.metrics.map((metric) => (
              <article className={`metric-card metric-card--${metric.color}`} key={metric.label}>
                <strong>{metric.value}</strong>
                <p>{metric.label}</p>
              </article>
            ))}
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
            <p>{sectionIntroductions.projects}</p>
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
            <p>{sectionIntroductions.toolbox}</p>
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
              {education.map((item) => (
                <article className={`education-card education-card--${item.key}`} key={item.school}>
                  <span className="education-year">{item.years}</span>
                  <div className={`education-mark education-mark--${item.key}`}>
                    <img src={item.logo} alt={item.logoAlt} />
                  </div>
                  <div>
                    <p>{item.school}</p>
                    <h3>{item.degree}</h3>
                    <span>{item.note}</span>
                  </div>
                </article>
              ))}
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
            <p className="contact-intro">{contact.introduction}</p>
            <a className="contact-link" href={identity.linkedin} target="_blank" rel="noreferrer">
              {contact.linkLabel} <Arrow />
            </a>
          </div>
          <ContactForm />
        </section>
      </main>

      <footer>
        <a className="wordmark" href="#top"><span>CA</span><strong>{identity.shortName}</strong></a>
        <p>{identity.footerLine}</p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </>
  );
}
