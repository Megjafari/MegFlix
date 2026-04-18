import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function Login({ tmdbTrending }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [bgIndex, setBgIndex] = useState(0);
  const navigate = useNavigate();

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
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
    } else {
      navigate('/');
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });
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

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '24px 0' }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.15)' }} />
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>or</span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.15)' }} />
        </div>

        {/* Google-knapp */}
        <button
          onClick={handleGoogleLogin}
          style={{
            width: '100%',
            padding: '14px',
            background: 'white',
            color: '#333',
            border: 'none',
            borderRadius: '4px',
            fontSize: '1rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18">
            <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
            <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
            <path fill="#FBBC05" d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z"/>
            <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 6.293C4.672 4.166 6.656 3.58 9 3.58z"/>
          </svg>
          Continue with Google
        </button>

        <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: '24px', fontSize: '0.9rem', textAlign: 'center' }}>
          Don't have an account?{' '}
          <NavLink to="/register" style={{ color: 'white', textDecoration: 'underline' }}>Register</NavLink>
        </p>
      </div>
    </div>
  );
}