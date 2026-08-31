import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './space.css';

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  async function handleSignup() {
    if (!name || !email || !password) {
      alert('Please fill all fields');
      return;
    }
    const res = await fetch('http://localhost:5000/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    const data = await res.json();
    if (res.ok) {
      setSuccess(true);
      setTimeout(() => navigate('/signin'), 2000);
    } else {
      alert(data.message);
    }
  }

  return (
    <div className="signin-page">
      <div className="signin-box">

        <div className="signin-logo">&&</div>
        <h1>Create your account</h1>
        <p>Start collaborating with your team today</p>

        <div className="signin-field">
          <div className="label-row">
            <label>Full Name</label>
          </div>
          <div className="input-wrapper">
            <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            <input type="text" placeholder="Enter your full name" value={name} onChange={e => setName(e.target.value)} />
          </div>
        </div>

        <div className="signin-field">
          <div className="label-row">
            <label>Email</label>
          </div>
          <div className="input-wrapper">
            <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            <input type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} />
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
            <input type={showPassword ? 'text' : 'password'} placeholder="Create a password" value={password} onChange={e => setPassword(e.target.value)} />
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

        {success && (
          <div style={{ display:'flex', alignItems:'center', gap:'8px', background:'#e6ffed', border:'1px solid #52c41a', borderRadius:'8px', padding:'10px 16px', marginBottom:'12px', color:'#389e0d' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#52c41a" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
            Your account is created!
          </div>
        )}
        <button className="signin-btn" onClick={handleSignup}>Create Account</button>

        <p className="signup-text">Already have an account? <Link to="/signin">Sign in</Link></p>
      </div>
    </div>
  );
}
