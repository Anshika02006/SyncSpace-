import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './space.css';

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  async function handleSendOtp() {
    const res = await fetch('http://localhost:5000/api/auth/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    const data = await res.json();
    if (res.ok) setStep(2);
    else alert(data.message);
  }

  async function handleReset() {
    const res = await fetch('http://localhost:5000/api/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp, newPassword })
    });
    const data = await res.json();
    if (res.ok) { alert('Password reset!'); navigate('/signin'); }
    else alert(data.message);
  }

  return (
    <div className="signin-page">
      <div className="signin-box">
        <div className="signin-logo">&&</div>
        <h1>Forgot Password</h1>

        {step === 1 && (
          <>
            <p>Enter your email to receive OTP</p>
            <div className="signin-field">
              <div className="input-wrapper">
                <input type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} />
              </div>
            </div>
            <button className="signin-btn" onClick={handleSendOtp}>Send OTP</button>
          </>
        )}

        {step === 2 && (
          <>
            <p>Enter OTP sent to your email and new password</p>
            <div className="signin-field">
              <div className="input-wrapper">
                <input type="text" placeholder="Enter OTP" value={otp} onChange={e => setOtp(e.target.value)} />
              </div>
            </div>
            <div className="signin-field">
              <div className="input-wrapper">
                <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <input type={showPassword ? 'text' : 'password'} placeholder="New Password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
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
            <button className="signin-btn" onClick={handleReset}>Reset Password</button>
          </>
        )}
      </div>
    </div>
  );
}
