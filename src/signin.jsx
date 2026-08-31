import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './space.css';

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function handleSignIn() {
    if (!email || !password) {
      alert('Please enter email and password');
      return;
    }
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
  }

  return (
    <div className="signin-page">
      <div className="signin-box">

        <div className="signin-logo">&&</div>

        <h1>Welcome back</h1>
        <p>Sign in to your SyncSpace account</p>

        <div className="signin-field">
          <div className="label-row">
            <label>Email</label>
          </div>
          <div className="input-wrapper">
            <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            <input type="text" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
        </div>

        <div className="signin-field">
          <div className="label-row">
            <label>Password</label>
          </div>
          <div className="input-wrapper">
            <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            <input type={showPassword ? 'text' : 'password'} placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} />
            <button className="toggle-password" onClick={() => setShowPassword(p => !p)} type="button">
              {showPassword ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                  <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                  <line x1="1" y1="1" x2="23" y2="23"/>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              )}
            </button>
          </div>
        </div>

        <Link to="/forgot-password" className="forgot-link">Forgot password?</Link>
        <button className="signin-btn" onClick={handleSignIn}>Sign In</button>

        <p className="signup-text">Don't have an account? <Link to="/signup">Sign up</Link></p>
      </div>
    </div>
  );
}
