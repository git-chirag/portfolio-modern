# Website structure and update guide

This guide is the starting point for changing the portfolio. Most text, links,
lists, and optional playful features now live in one file:

`app/siteConfig.ts`

Edit that file first. The page, metadata, contact destination, bird, piano,
cursor, and scroll indicator read from it automatically.

## Quick feature switches

At the top of `app/siteConfig.ts`, find `featureFlags`:

```ts
export const featureFlags = {
  bird: "y",
  piano: "y",
  clickSounds: "y",
  customCursor: "y",
  scrollIndicator: "y",
};
```

Use lowercase values only:

- `"y"` keeps the feature enabled.
- `"n"` removes the feature and prevents its related browser behavior from starting.

For example, changing `bird: "y"` to `bird: "n"` removes Pip without affecting
the piano or scroll indicator. Changing `piano: "y"` to `piano: "n"` removes
the pocket piano.

## Editable content map

All entries below are inside `siteConfig` in `app/siteConfig.ts`.

| Config area | What it controls |
| --- | --- |
| `identity` | Name, email, location, GitHub, LinkedIn, resume path, footer line |
| `seo` | Browser title, search description, social description, keywords |
| `hero` | Status pill, main headline, introduction, current role card, floating metrics |
| `about` | About introduction, main statement, supporting copy, three metric cards |
| `sectionIntroductions` | Introductory copy for Projects and Toolbox |
| `experience` | Roles, dates, companies, locations, bullet points, technology tags |
| `projects` | Project titles, descriptions, bullets, technologies, links, visual type |
| `skillGroups` | Toolbox categories and the technologies inside each category |
| `skillIcons` | Logo URL used for each technology |
| `education` | Dates, college names, degrees, status text, logo files |
| `achievements` | Achievement names, notes, years, optional external links |
| `contact` | Contact-section introduction and LinkedIn link label |

Adding, removing, or reordering an array item changes the matching cards on the
frontend. Keep commas between items and keep text inside quotes.

## Main page structure

`app/page.tsx` controls section order and presentation. The current order is:

1. Sticky navigation
2. Hero and portrait
3. Expertise ticker
4. About
5. Experience
6. Selected projects
7. Toolbox
8. Education and achievements
9. Contact form
10. Footer

Change `page.tsx` when a section must move, a new section is required, or the
HTML structure itself must change. Ordinary content updates should stay in
`siteConfig.ts`.

## Component map

| File | Responsibility |
| --- | --- |
| `app/layout.tsx` | Global metadata, theme initialization, shared interactive layer |
| `app/SoundAndCursor.tsx` | Pip, piano, click sounds, colorful cursor, scroll indicator |
| `app/PortraitSwitcher.tsx` | Illustrated avatar and Real me switch |
| `app/JiraRLPlayground.tsx` | Interactive JiraRL ticket |
| `app/ProjectPlaygrounds.tsx` | Interactions for the other project cards |
| `app/ContactForm.tsx` | Contact form submission and status messages |
| `app/MobileNav.tsx` | Small-screen navigation menu |
| `app/ThemeToggle.tsx` | Light and dark theme control |
| `app/globals.css` | All layout, colors, responsive behavior, animation, and dark-mode styling |

## Projects and visuals

Each project in `siteConfig.projects` uses one of these existing `visual` values:

- `"jira"`
- `"search"`
- `"chain"`
- `"meetup"`

You can reuse one when adding a project. A completely new interactive visual
also requires a component and a matching case in `ProjectVisual` inside
`app/page.tsx`.

## Images and downloadable files

Static files live in `public/`:

- `profile-avatar-v2.png` is the illustrated portrait.
- `profile.jpg` is the Real me photograph.
- `umass-logo.png` and `rait-logo.png` are education logos.
- `og.png` is the social-sharing preview.
- `resume.pdf` is the existing downloadable resume and is intentionally separate
  from website content configuration.

Replace a file with the same filename to update it without changing code.

## Contact email note

The contact form uses `siteConfig.identity.email`. If that email changes,
FormSubmit may send a confirmation message to the new address before it accepts
website submissions.

## Safe update checklist

1. Edit `app/siteConfig.ts` or replace the required file in `public/`.
2. Run `npm test`.
3. Run `npm run lint`.
4. Run `npm run build`.
5. Commit and push to `main`.
6. Vercel publishes the new version automatically.

The tests in `tests/content.test.mjs` protect important links, feature flags,
project interactions, education logos, theme behavior, and core timeline facts.
