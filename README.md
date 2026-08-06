# Portfolio# SaiPrateeth P — Portfolio

Personal portfolio site. Glitch/terminal-inspired UI with a custom
chromatic-aberration cursor, scramble-text animations, and scroll-triggered
CRT-style reveals.

## Structure
```
.
├── index.html   # markup
├── style.css    # all styling + animations
├── script.js    # cursor, glitch, scroll reveal, skill bar logic
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
- [ ] Swap placeholder projects in `index.html` (`#work` section) for real ones
- [ ] Update skill percentages in `index.html` (`#skills` section)
- [ ] Add a resume link / download button
- [ ] Add an email or contact form
