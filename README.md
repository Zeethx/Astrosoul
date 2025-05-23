![Astrosoul Landing Page](https://github.com/Zeethx/Astrosoul/blob/master/public/astrosoul.png)


**Discover your moon-powered aesthetic identity.**

Astrosoul is a Next.js + Tailwind + MUI web app that guides you through a 10-step cosmic quiz and then generates your personalized “Cosmic Identity” — complete with moon phase, zodiac sign, birth-year movie & song recap, personality archetype, and an aesthetic color moodboard.

<p align="center">
  <img src="https://via.placeholder.com/800x400?text=Astrosoul+Demo" alt="Astrosoul Demo"/>
</p>

## 🚀 Features

- **Interactive Quiz**: 10 illustrated questions to capture your cosmic preferences.
- **Moon & Zodiac**: Calculates your moon phase and zodiac sign on your birthdate via SunCalc.
- **Year-Recap**: Fetches top 3 movies from TMDB and top 3 songs from MusicBrainz for your birth year.
- **Personality Archetype**: Randomized (or deterministic) assignment from 10 unique cosmic personalities.
- **Aesthetic Moodboard**: A custom 3-color palette to match your archetype.
- **Compact vs Expanded Views**: Toggle between a full-page layout and a shareable compact card.
- **Responsive Design**: Adapts gracefully from mobile to desktop.
- **Dark Gradient**: Sleek dark-mode gradient background throughout.
- **Material UI**: Polished inputs, date picker, progress bar, and navbar.
- **React Context**: Quiz state kept in Context for clean routing (`/quiz` → `/result`).

## 🛠️ Tech Stack

- **Next.js 13** (App Router, TypeScript)
- **React** & **React Context**
- **Tailwind CSS v4**
- **Material-UI (MUI)** + **MUI X Date Pickers** + **Day.js**
- **SunCalc** for moon phase calculations
- **TMDB API v4** for movies
- **MusicBrainz API** for birth-year songs
- **html-to-image** (or similar) for compact card export (optional)
- **Vercel** or any Node.js host for deployment

## 📦 Getting Started

### Prerequisites

- [Node.js ≥ 18.x](https://nodejs.org/)
- A **TMDB v4 Read Access Token** (starts with `eyJ…`)

### Installation

1. **Clone the repo**  
   ```bash
   git clone https://github.com/your-username/astrosoul.git
   cd astrosoul
