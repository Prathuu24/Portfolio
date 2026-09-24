# SaiPrateeth P — Portfolio

Multi-page portfolio site. Glitch/terminal-inspired UI with a custom
chromatic-aberration cursor, scramble-text animations, glitch page
transitions, and scroll-triggered CRT-style reveals.

## Pages
- **index.html** — Home: hero, skills ticker, about/work teasers
- **about.html** — Full bio, avatar frame, journey timeline, "currently focused on" panel, resume download
- **projects.html** — Full project grid with filter tabs (All / Sites / Clones)
- **contact.html** — Contact form (mailto handoff), direct links with copy-to-clipboard, QR code + social share buttons

## Structure
```
.
├── index.html
├── about.html
├── projects.html
├── contact.html
├── style.css              # all styling + animations (shared)
├── script.js               # cursor, glitch, transitions, filters, form logic (shared)
├── assets-README.md        # instructions for the assets/ folder — see below
└── README.md
```

## Before pushing — add your assets folder
Create an `assets/` folder in your repo root with:
- `profile.jpg` — your photo (used on the About page avatar frame; falls back to a stylized "SP" placeholder if missing)
- `resume.pdf` — your resume (linked from the "Download Resume" button)

(`assets-README.md` in this download has the same instructions — delete it or fold it into your repo's `assets/` folder once you add the real files.)

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
- [ ] Add `assets/profile.jpg` and `assets/resume.pdf` (see above)
- [ ] Swap placeholder projects in `projects.html` (and the teaser in `index.html`) for real ones
- [ ] Replace `youremail@example.com` in `contact.html` and `script.js` with your real email
- [ ] Update the QR code / share URLs in `contact.html` (currently point to `https://prathuu24.github.io`) once your site is live at its real address
