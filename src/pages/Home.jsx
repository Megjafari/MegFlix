import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TMDB_IMG_ORIG } from '../api/index.js';
import styles from './Home.module.css';

export default function Home({ tmdbTrending }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = tmdbTrending?.filter(m => m.backdrop_path).slice(0, 10) || [];

  useEffect(() => {
    if (images.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % images.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [images.length]);

  const handleSearch = (e) => {
    if (e.key === 'Enter' && query.trim()) {
      navigate(`/movies?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className={styles.home}>
      {images.map((m, i) => (
        <div
          key={m.id}
          className={`${styles.bg} ${i === currentIndex ? styles.bgActive : ''}`}
          style={{ backgroundImage: `url(${TMDB_IMG_ORIG}${m.backdrop_path})` }}
        />
      ))}
      <div className={styles.overlay} />

      <div className={styles.content}>
        <h1 className={styles.logo}>MEGFLIX</h1>
        <p className={styles.tagline}>Your personal movie, series & anime library</p>

        <div className={styles.searchBar}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.5">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            className={styles.searchInput}
            placeholder="Search movies, series, anime..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleSearch}
          />
        </div>

        <div className={styles.buttons}>
          {[['Movies', '/movies'], ['Series', '/series'], ['Anime', '/anime'], ['My List', '/mylist']].map(([label, path]) => (
            <button key={path} className={styles.btn} onClick={() => navigate(path)}>{label}</button>
          ))}
        </div>
      </div>
    </div>
  );
}