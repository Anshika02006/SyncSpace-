import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5efe6',
    fontFamily: "'Inter', sans-serif",
  },
  box: {
    backgroundColor: '#faf6ef',
    padding: '48px 40px',
    borderRadius: '20px',
    width: '100%',
    maxWidth: '380px',
    boxShadow: '0 20px 50px rgba(26, 26, 26, 0.08)',
  },
  heading: {
    fontSize: '26px',
    marginBottom: '6px',
    color: '#1a1a1a',
  },
  subtext: {
    color: '#6b6558',
    marginBottom: '28px',
    fontSize: '14px',
  },
  field: {
    marginBottom: '18px',
  },
  label: {
    fontSize: '14px',
    fontWeight: 500,
    color: '#1a1a1a',
    marginBottom: '6px',
    display: 'block',
    textAlign: 'left',
  },
  inputWrapper: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#fff',
    border: '1px solid #e5ddcd',
    borderRadius: '10px',
    padding: '10px 12px',
    gap: '10px',
  },
  icon: {
    width: '18px',
    height: '18px',
    color: '#6b6558',
    flexShrink: 0,
  },
  input: {
    border: 'none',
    outline: 'none',
    flex: 1,
    fontSize: '14px',
    background: 'transparent',
    color: '#1a1a1a',
  },
  toggleBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    color: '#6b6558',
  },
  toggleIcon: {
    width: '18px',
    height: '18px',
  },
  forgotLink: {
    display: 'block',
    textAlign: 'right',
    fontSize: '13px',
    color: '#6b6558',
    textDecoration: 'none',
    marginBottom: '20px',
  },
  signInBtn: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#f0b429',
    color: '#1a1a1a',
    border: 'none',
    borderRadius: '10px',
    fontWeight: 600,
    fontSize: '15px',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease',
  },
  signInBtnHover: {
    backgroundColor: '#d99e1f',
    transform: 'translateY(-1px)',
    boxShadow: '0 8px 20px rgba(240, 180, 41, 0.35)',
  },
  signupText: {
    textAlign: 'center',
    fontSize: '14px',
    color: '#6b6558',
    marginTop: '20px',
  },
  signupLink: {
    color: '#1a1a1a',
    fontWeight: 600,
    textDecoration: 'none',
  },
};

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hoverSignIn, setHoverSignIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSignIn() {
    if (!email || !password) {
      alert('Please enter email and password');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        navigate('/home');
      } else {
        alert(data.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.box}>

        <h1 style={styles.heading}>Welcome back</h1>
        <p style={styles.subtext}>Sign in to your SyncSpace account</p>

        <div style={styles.field}>
          <label style={styles.label}>Email</label>
          <div style={styles.inputWrapper}>
            <svg style={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            <input style={styles.input} type="text" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Password</label>
          <div style={styles.inputWrapper}>
            <svg style={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            <input style={styles.input} type={showPassword ? 'text' : 'password'} placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} />
            <button style={styles.toggleBtn} onClick={() => setShowPassword(p => !p)} type="button">
              {showPassword ? (
                <svg style={styles.toggleIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                  <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                  <line x1="1" y1="1" x2="23" y2="23"/>
                </svg>
              ) : (
                <svg style={styles.toggleIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              )}
            </button>
          </div>
        </div>

        <Link to="/forgot-password" style={styles.forgotLink}>Forgot password?</Link>
        <button
          style={hoverSignIn ? { ...styles.signInBtn, ...styles.signInBtnHover } : styles.signInBtn}
          onMouseEnter={() => setHoverSignIn(true)}
          onMouseLeave={() => setHoverSignIn(false)}
          onClick={handleSignIn}
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>

        <p style={styles.signupText}>Don't have an account? <Link to="/signup" style={styles.signupLink}>Sign up</Link></p>
      </div>
    </div>
  );
}