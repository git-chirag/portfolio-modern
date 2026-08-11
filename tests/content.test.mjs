import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
const layout = await readFile(new URL("../app/layout.tsx", import.meta.url), "utf8");
const themeToggle = await readFile(new URL("../app/ThemeToggle.tsx", import.meta.url), "utf8");
const contactForm = await readFile(new URL("../app/ContactForm.tsx", import.meta.url), "utf8");
const jiraPlayground = await readFile(new URL("../app/JiraRLPlayground.tsx", import.meta.url), "utf8");
const interactions = await readFile(new URL("../app/SoundAndCursor.tsx", import.meta.url), "utf8");
const projectPlaygrounds = await readFile(new URL("../app/ProjectPlaygrounds.tsx", import.meta.url), "utf8");
const portraitSwitcher = await readFile(new URL("../app/PortraitSwitcher.tsx", import.meta.url), "utf8");
const mobileNav = await readFile(new URL("../app/MobileNav.tsx", import.meta.url), "utf8");
const styles = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
const readme = await readFile(new URL("../README.md", import.meta.url), "utf8");
const config = await readFile(new URL("../app/siteConfig.ts", import.meta.url), "utf8");
const structureGuide = await readFile(new URL("../WEBSITE_STRUCTURE.md", import.meta.url), "utf8");

test("portfolio contains the primary content sections", () => {
  for (const section of ["about", "experience", "projects", "toolbox", "proof", "contact"]) {
    assert.match(page, new RegExp(`id="${section}"`));
  }
});

test("portfolio exposes working contact and resume destinations", () => {
  assert.match(page, /href="#contact"/);
  assert.match(config, /email: "chiragaparadh@gmail\.com"/);
  assert.match(contactForm, /formsubmit\.co\/ajax\/\$\{siteConfig\.identity\.email\}/);
  assert.match(contactForm, /name="name"/);
  assert.match(contactForm, /name="email"/);
  assert.match(contactForm, /name="message"/);
  assert.doesNotMatch(page, /mailto:/);
  assert.match(page, /href=\{identity\.resume\}/);
  assert.match(config, /linkedin\.com\/in\/chirag-aparadh/);
  assert.match(config, /github\.com\/git-chirag/);
});

test("portfolio includes the JiraRL agent environment project", () => {
  assert.match(config, /title: "JiraRL"/);
  assert.match(config, /OpenEnv-compatible Jira simulation/);
  assert.match(config, /3,500 hint-free procedural training decisions/);
  assert.match(config, /100% completion across 60 held-out/);
  assert.match(config, /environment-backed GRPO/);
  assert.match(page, /<JiraRLPlayground \/>/);
  assert.match(jiraPlayground, /className="rl-window"/);
  assert.match(jiraPlayground, /portfolio:reward/);
  assert.doesNotMatch(page, /project-jirarl\.webp/);
});

test("career and education status reflect August 2026", () => {
  assert.match(config, /Jul 2023 to Aug 2026/);
  assert.match(config, /M\.S\. CS @ UMass Amherst · Class of 2028/);
  assert.match(config, /Currently attending · Class of 2028/);
  assert.doesNotMatch(config, /Incoming M\.S\.|Incoming · Fall 2026|Jul 2023 to Present/);
  assert.doesNotMatch(layout, /Incoming M\.S\./);
});

test("site content and maintenance instructions are centralized", () => {
  assert.match(page, /from "\.\/siteConfig"/);
  assert.match(layout, /siteConfig\.seo\.title/);
  assert.match(structureGuide, /Editable content map/);
  assert.match(structureGuide, /app\/siteConfig\.ts/);
  assert.match(readme, /WEBSITE_STRUCTURE\.md/);
});

test("portfolio includes the playful interactive companions", () => {
  assert.match(config, /bird: "y"/);
  assert.match(config, /piano: "y"/);
  assert.match(config, /clickSounds: "y"/);
  assert.match(config, /customCursor: "y"/);
  assert.match(config, /scrollIndicator: "y"/);
  assert.match(config, /return featureFlags\[name\] === "y"/);
  assert.match(structureGuide, /changing `bird: "y"` to `bird: "n"` removes Pip/);
  assert.match(interactions, /\{birdEnabled && \(/);
  assert.match(interactions, /\{pianoEnabled && \(/);
  assert.match(interactions, /if \(!birdEnabled\) return/);
  assert.match(interactions, /Pet Pip/);
  assert.match(interactions, /sectionGuides/);
  assert.match(interactions, /Wait for me!/);
  assert.match(interactions, /Pip loves that!/);
  assert.match(interactions, /Pocket piano/);
  assert.match(interactions, /playPianoNote/);
  assert.match(interactions, /0\.11/);
  assert.match(interactions, /crayon-progress/);
  assert.match(styles, /@keyframes bird-hurry/);
  assert.match(styles, /@keyframes heart-float/);
  assert.match(styles, /@keyframes paper-plane-flight/);
});

test("every project visual offers an interaction", () => {
  assert.match(page, /<SearchPlayground title=\{title\} \/>/);
  assert.match(page, /<SupplyChainPlayground title=\{title\} \/>/);
  assert.match(page, /<MeetupPlayground title=\{title\} \/>/);
  assert.match(projectPlaygrounds, /Interactive visual search demo/);
  assert.match(projectPlaygrounds, /Interactive product journey/);
  assert.match(projectPlaygrounds, /Interactive meeting spot picker/);
  assert.match(jiraPlayground, /interaction-hint/);
});

test("the hero uses the fully drawn avatar while keeping the real-photo switch", () => {
  assert.match(portraitSwitcher, /profile-avatar-v2\.png/);
  assert.match(portraitSwitcher, /profile\.jpg/);
  assert.doesNotMatch(portraitSwitcher, /profile-avatar\.webp/);
  assert.match(styles, /object-position: 50% 11%/);
});

test("education uses the original college marks", () => {
  assert.match(config, /umass-logo\.png/);
  assert.match(config, /rait-logo\.png/);
  assert.match(styles, /translate\(-2%, 5%\) scale\(1\.4\)/);
});

test("the native scrollbar is hidden behind the compact custom progress marker", () => {
  assert.match(styles, /scrollbar-width: none/);
  assert.match(styles, /height: min\(176px, 26vh\)/);
  assert.doesNotMatch(styles, /clip-path: polygon\(26% 0, 84% 0/);
});

test("mobile navigation closes after selecting a section", () => {
  assert.match(page, /<MobileNav \/>/);
  assert.match(mobileNav, /menuRef\.current\.open = false/);
});

test("every project uses the same bullet-description structure", () => {
  assert.doesNotMatch(config, /highlights: \[\]/);
  assert.match(page, /<ul className="project-highlights">/);
  assert.doesNotMatch(page, /project\.highlights\.length > 0/);
});

test("metadata is portfolio-specific and the starter preview is gone", () => {
  assert.match(config, /Chirag Aparadh \| Software Engineer/);
  assert.doesNotMatch(page, /SkeletonPreview|codex-preview/);
  assert.doesNotMatch(layout, /Starter Project|codex-preview/);
});

test("default theme is configurable, persists a choice, and has a visible control", () => {
  assert.match(page, /<ThemeToggle \/>/);
  assert.match(layout, /prefers-color-scheme: dark/);
  assert.match(config, /defaultTheme: "light"/);
  assert.match(layout, /JSON\.stringify\(siteConfig\.appearance\.defaultTheme\)/);
  assert.match(themeToggle, /chirag-theme/);
  assert.match(themeToggle, /aria-label="Toggle color theme"/);
  assert.match(styles, /\[data-theme="dark"\]/);
});

test("user-facing source copy does not contain em dashes", () => {
  const emDash = String.fromCodePoint(8212);
  for (const source of [page, layout, contactForm, interactions, projectPlaygrounds, readme, config, structureGuide]) {
    assert.ok(!source.includes(emDash));
  }
});
