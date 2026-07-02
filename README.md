<div align="center">

# GATE DA — Python Mastery Console

**An interactive, exam-ready study console for GATE Data Science & AI aspirants**

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

</div>

---

## Overview

The **GATE DA Python Mastery Console** is a beautifully designed, notebook/REPL-themed interactive study tool. It covers every Python concept, output trap, and edge case from fundamentals through Object-Oriented Programming — all structured around real GATE PYQs.

### Features

- **Interactive Code Cells** — Jupyter-style `In[]` / `Out[]` cells showing code and expected output
- **Real PYQs** — Verified Previous Year Questions from GATE AI 2025, GATE DA 2024 & 2026 with detailed explanations
- **Dry Run Tracers** — Step-by-step execution walkthroughs for complex questions
- **MCQ / MSQ / NAT Quiz Bank** — 12 scored quizzes with instant feedback
- **Progress Tracking** — Mark topics as done; scores persist via `localStorage`
- **Responsive** — Mobile-friendly with a slide-in sidebar

### Topics Covered

| Chapter | Title |
|---------|-------|
| 01 | Python Core Fundamentals |
| 02 | Strings in Depth |
| 03 | Operators, Conversion & Control Flow |
| 04 | Set & Dictionary Methods In Depth |
| 05 | Functions & Scope |
| 06 | Functional Tools & Recursion |
| 07 | Object-Oriented Programming Basics |

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher

### Installation & Local Dev

```bash
# Clone the repo
git clone https://github.com/ManasSaxena14/C-.git BASICS
cd BASICS

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

Output is in the `dist/` folder, ready to deploy on **Vercel**, **Netlify**, **GitHub Pages**, or any static host.

---

## Tech Stack

| Tool | Role |
|------|------|
| [React 18](https://react.dev) | UI framework |
| [Vite 6](https://vitejs.dev) | Build tool & dev server |
| [Lucide React](https://lucide.dev) | Icon library |
| Vanilla CSS (inline styles) | Styling & theming |

---

## Project Structure

```
BASICS/
├── index.html           # App entry HTML with SEO meta tags
├── vite.config.js       # Vite configuration
├── package.json         # Dependencies & scripts
├── .gitignore
└── src/
    ├── main.jsx         # React root render
    ├── index.css        # Global CSS reset
    └── App.jsx          # Main application component (2147 lines)
```

---

## Design System

The console uses a custom dark design system with CSS variables:

- **Background**: `#0A0E17` (deep navy)  
- **Accent**: Amber `#F3B94D`, Teal `#45D5B0`, Coral `#F16A70`, Violet `#9C8CFB`
- **Typography**: Space Grotesk (display) · Inter (body) · JetBrains Mono (code)

---

## License

MIT © [Manas Saxena](https://github.com/ManasSaxena14)
