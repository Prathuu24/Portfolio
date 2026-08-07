# SaiPrateeth P — Portfolio

Multi-page portfolio site. Glitch/terminal-inspired UI with a custom
chromatic-aberration cursor, scramble-text animations, glitch page
transitions, and scroll-triggered CRT-style reveals.

## Pages
- **index.html** — Home: hero, skills ticker, about/work teasers
- **about.html** — Full bio, journey timeline, "currently focused on" panel
- **projects.html** — Full project grid with filter tabs (All / Sites / Clones)
- **contact.html** — Contact form (mailto handoff) + direct links with copy-to-clipboard

## Structure
```
.
├── index.html
├── about.html
├── projects.html
├── contact.html
├── style.css    # all styling + animations (shared)
├── script.js    # cursor, glitch, transitions, filters, form logic (shared)
└── README.md
```

## Run locally
Just open `index.html` in a browser — no build step, no dependencies.

Or serve it (recommended, avoids any local file restrictions):
```bash
python3 -m http.server 8000
```
Then visit `http://localhost:8000`.

## Deploy with GitHub Pages
1. Push this repo to GitHub.
2. Go to **Settings → Pages**.
3. Under "Build and deployment", set **Source: Deploy from a branch**,
   branch **main**, folder **/ (root)**.
4. Save — your site will be live at `https://<username>.github.io/<repo-name>/`.

## To do
- [ ] Swap placeholder projects in `projects.html` (and the teaser in `index.html`) for real ones
- [ ] Update skill percentages if you re-add the skills section
- [ ] Replace `youremail@example.com` in `contact.html` and `script.js` with your real email
- [ ] Add a resume link / download button
