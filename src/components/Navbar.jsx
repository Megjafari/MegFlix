import { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';

export default function Navbar({ scrolled, token, logout }) {
  const [genreOpen, setGenreOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setGenreOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleNavClick = () => setMenuOpen(false);

  const links = [
    ['/movies', 'Movies'],
    ['/series', 'Series'],
    ['/anime', 'Anime'],
    ['/mylist', 'My List'],
    ['/reviews', 'Reviews'],
  ];

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.solid : ''}`}>
      <NavLink to="/" className={styles.logo}>MEGFLIX</NavLink>

      {/* Desktop tabs */}
      <div className={styles.tabs}>
        {links.map(([path, label]) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) => `${styles.tab} ${isActive ? styles.active : ''}`}
          >
            {label}
          </NavLink>
        ))}
      </div>

      {/* Desktop right */}
      <div className={styles.right}>
        {token ? (
          <button className={styles.tab} onClick={logout}>Logout</button>
        ) : (
          <>
            <NavLink to="/login" className={({ isActive }) => `${styles.tab} ${isActive ? styles.active : ''}`}>Login</NavLink>
            <NavLink to="/register" className={({ isActive }) => `${styles.tab} ${isActive ? styles.active : ''}`}>Register</NavLink>
          </>
        )}
      </div>

      {/* Hamburger-ikon */}
      <button
        className={styles.hamburger}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Mobil-meny */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          {/* Stäng-knapp */}
          <button
            className={styles.closeBtn}
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>

          {links.map(([path, label]) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) => `${styles.mobileTab} ${isActive ? styles.active : ''}`}
              onClick={handleNavClick}
            >
              {label}
            </NavLink>
          ))}

          <div className={styles.mobileDivider} />

          {token ? (
            <button className={styles.mobileTab} onClick={() => { logout(); handleNavClick(); }}>Logout</button>
          ) : (
            <>
              <NavLink to="/login" className={({ isActive }) => `${styles.mobileTab} ${isActive ? styles.active : ''}`} onClick={handleNavClick}>Login</NavLink>
              <NavLink to="/register" className={({ isActive }) => `${styles.mobileTab} ${isActive ? styles.active : ''}`} onClick={handleNavClick}>Register</NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
}