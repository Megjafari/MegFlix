import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { NavLink } from "react-router-dom";

export default function Login({ tmdbTrending }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [bgIndex, setBgIndex] = useState(0);
  const { login } = useAuth();

  useEffect(() => {
    if (!tmdbTrending?.length) return;
    const interval = setInterval(() => {
      setBgIndex(prev => (prev + 1) % tmdbTrending.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [tmdbTrending]);

  const bgImage = tmdbTrending?.[bgIndex]?.backdrop_path
    ? `https://image.tmdb.org/t/p/original${tmdbTrending[bgIndex].backdrop_path}`
    : null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("https://movielibraryapi.onrender.com/api/auth/login", { email, password });
      login(res.data.token);
    } catch (err) {
      setError("Invalid email or password");
    }
    setLoading(false);
  };

  const inputStyle = {
    padding: '14px 16px',
    background: 'rgba(255,255,255,0.07)',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: '4px',
    color: 'white',
    fontSize: '1rem',
    outline: 'none',
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundImage: bgImage ? `url(${bgImage})` : 'none',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundColor: '#141414',
    }}>
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.65)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }} />

      <div style={{
        position: 'relative',
        zIndex: 1,
        background: 'rgba(20,20,20,0.9)',
        padding: '48px 40px',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '400px',
        border: '1px solid rgba(255,255,255,0.1)',
        margin: '0 16px',
      }}>
        <h2 style={{ color: 'white', fontSize: '1.8rem', marginBottom: '24px', fontWeight: 700 }}>Login</h2>

        {error && <p style={{ color: '#e50914', marginBottom: '16px', fontSize: '0.9rem' }}>{error}</p>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={inputStyle} />
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '14px',
              background: '#e50914',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '1rem',
              fontWeight: 700,
              cursor: 'pointer',
              marginTop: '8px',
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: '24px', fontSize: '0.9rem', textAlign: 'center' }}>
          Don't have an account?{' '}
          <NavLink to="/register" style={{ color: 'white', textDecoration: 'underline' }}>Register</NavLink>
        </p>
      </div>
    </div>
  );
}