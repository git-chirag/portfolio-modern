import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
const layout = await readFile(new URL("../app/layout.tsx", import.meta.url), "utf8");
const themeToggle = await readFile(new URL("../app/ThemeToggle.tsx", import.meta.url), "utf8");
const styles = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

test("portfolio contains the primary content sections", () => {
  for (const section of ["about", "experience", "projects", "toolbox", "proof", "contact"]) {
    assert.match(page, new RegExp(`id="${section}"`));
  }
});

test("portfolio exposes working contact and resume destinations", () => {
  assert.match(page, /mailto:chiragaparadh@gmail\.com/);
  assert.match(page, /href="\/resume\.pdf"/);
  assert.match(page, /linkedin\.com\/in\/chirag-aparadh/);
  assert.match(page, /github\.com\/git-chirag/);
});

test("portfolio includes the JiraRL agent environment project", () => {
  assert.match(page, /title: "JiraRL"/);
  assert.match(page, /OpenEnv-compatible Jira simulation/);
  assert.match(page, /className="rl-window"/);
  assert.doesNotMatch(page, /project-jirarl\.webp/);
});

test("every project uses the same bullet-description structure", () => {
  assert.doesNotMatch(page, /highlights: \[\]/);
  assert.match(page, /<ul className="project-highlights">/);
  assert.doesNotMatch(page, /project\.highlights\.length > 0/);
});

test("metadata is portfolio-specific and the starter preview is gone", () => {
  assert.match(layout, /Chirag Aparadh — Software Engineer/);
  assert.doesNotMatch(page, /SkeletonPreview|codex-preview/);
  assert.doesNotMatch(layout, /Starter Project|codex-preview/);
});

test("dark mode follows the system, persists a choice, and has a visible control", () => {
  assert.match(page, /<ThemeToggle \/>/);
  assert.match(layout, /prefers-color-scheme: dark/);
  assert.match(themeToggle, /chirag-theme/);
  assert.match(themeToggle, /aria-label="Toggle color theme"/);
  assert.match(styles, /\[data-theme="dark"\]/);
});
