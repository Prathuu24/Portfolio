<div align="center">

# SaiPrateeth P — Portfolio

**Engineering student → Frontend Designer**

A glitch/terminal-inspired portfolio with a chromatic-aberration cursor,
scramble-text animations, and CRT-style scroll reveals.

[![View Live](https://img.shields.io/badge/View-Live_Site-ffb000?style=for-the-badge)](#)
[![HTML](https://img.shields.io/badge/HTML5-e34f26?style=for-the-badge&logo=html5&logoColor=white)](#)
[![CSS](https://img.shields.io/badge/CSS3-1572b6?style=for-the-badge&logo=css3&logoColor=white)](#)
[![JavaScript](https://img.shields.io/badge/JavaScript-f7df1e?style=for-the-badge&logo=javascript&logoColor=black)](#)

</div>

---

```
   ______      _ ____             __            __  __       ____
  / __/ /_____(_) __ \_______ ___/ /____ ___ ___/ /_/ /       / __ \
 _\ \/ _ `/ / / /_/ / __/ -_) _ `/ __/ -_) -_) __/ _ \        / /_/ /
/___/\_,_/_/ /_____/_/  \__/\_,_/\__/\__/\__/\__/_//_/       / .___/
                                                              /_/
> whoami
SaiPrateeth P — Engineering Student @ JSSATEB
> status
Learning frontend design, one clone at a time.
```

## ✨ Features

- 🖱️ Custom cursor with RGB-split ghost trail (chromatic aberration effect)
- ⌨️ Terminal-style scramble/decode text animation on the hero role line
- 📺 CRT scanline overlay + random flicker bars
- 🎬 Scroll-triggered clip-path "scan wipe" reveals on every section
- 📊 Animated skill bars that fill in when scrolled into view
- 📱 Fully responsive, keyboard-accessible, and respects `prefers-reduced-motion`
- ⚡ Zero dependencies — pure HTML, CSS, and vanilla JS

## 📁 Structure

```
.
├── index.html   → markup
├── style.css    → all styling + animations
├── script.js    → cursor, glitch, scroll reveal, skill bar logic
└── README.md
```

## 🚀 Run locally

No build step, no dependencies. Just open it:

```bash
open index.html
```

Or serve it (recommended):

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## 🌐 Deploy with GitHub Pages

1. Push this repo to GitHub.
2. Go to **Settings → Pages**.
3. Under *Build and deployment*, set **Source: Deploy from a branch**,
   branch `main`, folder `/ (root)`.
4. Save — live at `https://<username>.github.io/<repo-name>/`.

## 🛠️ Tech Stack

| Layer      | Tech                     |
|------------|--------------------------|
| Structure  | HTML5                    |
| Styling    | CSS3 (custom properties, clip-path, IntersectionObserver-driven reveals) |
| Behavior   | Vanilla JavaScript       |
| Fonts      | JetBrains Mono · Space Grotesk |

## 📌 Roadmap

- [ ] Swap placeholder projects for real ones (with links + screenshots)
- [ ] Update skill percentages
- [ ] Add resume download button
- [ ] Add contact form / email

## 🔗 Connect

- GitHub: [Prathuu24](https://github.com/Prathuu24)
- LinkedIn: [saiprateeth-p](https://www.linkedin.com/in/saiprateeth-p-6721a32bb)

---

<div align="center">
<sub>Built with HTML, CSS & JS — © 2026 SaiPrateeth P</sub>
</div>
