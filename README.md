![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)


# MegFlix 🎬

> A fullstack personal movie, series & anime library — discover trending content, build your watchlist, and share your reviews.

🌐 **Live Demo:** [megflix.meghdadjafari.dev](https://megflix.meghdadjafari.dev)  
🔧 **Backend Repo:** [MegFlix API](https://github.com/Megjafari/MegFlixAPI)  
👩‍💻 **Portfolio:** [meghdadjafari.dev](https://meghdadjafari.dev)

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Reflection](#reflection)

---

## Overview

MegFlix is a fullstack application built with React and Vite. It integrates with the TMDB API for real movie and series data, and the Jikan API for anime content. Users can register, log in, build a personal watchlist, and write reviews — all synced with the MegFlix backend.

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| React | UI framework |
| Vite | Build tool & dev server |
| React Router DOM | Client-side routing |
| Axios | HTTP requests |
| CSS Modules | Component-scoped styling |
| TMDB API | Movie & series data |
| Jikan API | Anime data |
| Vercel | Deployment |

---

## Features

- 🎬 Browse trending, popular and top rated **movies**
- 📺 Browse trending, popular and top rated **series**
- ⛩️ Browse trending and popular **anime** via Jikan API
- 🔍 Search across movies, series and anime
- ➕ Add titles to your personal watchlist
- ✍️ Write, edit and delete reviews with star ratings
- 🔐 JWT authentication (register & login)
- 📱 Fully responsive — mobile & desktop
- 🍔 Hamburger menu with fullscreen blur overlay on mobile

---

## Architecture

```
src/
├── api/
│   └── index.js                  # TMDB, Jikan & backend API calls
├── components/
│   ├── EditMovieModal.jsx         # Edit movie details modal
│   ├── EditMovieModal.module.css
│   ├── Hero.jsx                   # Hero banner with featured title
│   ├── Hero.module.css
│   ├── MovieCard.jsx              # Movie/series/anime card
│   ├── MovieCard.module.css
│   ├── MovieModal.jsx             # Detail modal with reviews
│   ├── MovieModal.module.css
│   ├── MovieRow.jsx               # Horizontal scrollable row
│   ├── MovieRow.module.css
│   ├── Navbar.jsx                 # Responsive navbar
│   ├── Navbar.module.css
│   ├── StarRating.jsx             # Interactive star rating
│   ├── StarRating.module.css
│   ├── Toast.jsx                  # Notification toasts
│   └── Toast.module.css
├── context/
│   └── AuthContext.jsx            # JWT auth state management
├── pages/
│   ├── AnimePage.jsx              # Anime library page
│   ├── Home.jsx                   # Landing page
│   ├── Login.jsx                  # Login page
│   ├── MoviesPage.jsx             # Movies library page
│   ├── MyList.jsx                 # Personal watchlist page
│   ├── Register.jsx               # Register page
│   ├── ReviewsPage.jsx            # All reviews page
│   └── SeriesPage.jsx             # Series library page
├── App.jsx                        # Root component & routing
├── App.module.css                 # Global component styles
├── index.css                      # Global base styles
└── main.jsx                       # Entry point
```

---

## Getting Started

### Prerequisites

- A [TMDB API key](https://www.themoviedb.org/settings/api) (free)
- [MegFlix API](https://github.com/Megjafari/MegFlix) running locally or on Render

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Megjafari/MegFlix.git
   cd MovieLibraryFrontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Fill in your values in `.env` (see [Environment Variables](#environment-variables))

4. **Start the development server**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`

---

## Environment Variables

Create a `.env` file in the root of the project:

```env
VITE_TMDB_KEY=your-tmdb-api-key
```

> The backend URL is configured directly in the API files. Make sure the [MegFlix API](https://github.com/Megjafari/MegFlixAPI) is running.

---

## Deployment

The frontend is deployed on **Vercel** with automatic deployments on every push to `main`.

> ⚠️ **Note:** The backend runs on Render's free tier and may take 1–2 minutes to respond after inactivity. This affects login, register, and watchlist features on first use.

---

## Reflection

**What went well**
The layered architecture with controllers, services and DTOs came together naturally and made the codebase easy to reason about. Connecting the React frontend to the API using fetch and managing JWT tokens in headers worked smoothly. Integrating TMDB, Jikan and the watchlist flow ended up being one of the more rewarding parts of the project.

**What was challenging**
Error handling took time to get right — catching API error messages and surfacing them to the user in a meaningful way required refactoring the fetch layer. CORS configuration was also tricky early on.

**Possible improvements**
Given more time I would add pagination, stronger input validation on the frontend and unit tests for the service layer.

---

## Related

- 🔧 [MegFlix API](https://github.com/Megjafari/MegFlixAPI)
- 🌐 [Live Demo](https://megflix.meghdadjafari.dev)
- 👩‍💻 [Portfolio](https://meghdadjafari.dev)
