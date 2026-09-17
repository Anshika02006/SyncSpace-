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
  actionBtn: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#f0b429',
    color: '#1a1a1a',
    border: 'none',
    borderRadius: '10px',
    fontWeight: 600,
    fontSize: '15px',
    cursor: 'pointer',
    marginTop: '4px',
    transition: 'background-color 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease',
  },
  actionBtnHover: {
    backgroundColor: '#fac344',
    transform: 'translateY(-1px)',
    boxShadow: '0 8px 20px rgba(240, 180, 41, 0.35)',
  },
  backText: {
    textAlign: 'center',
    fontSize: '14px',
    color: '#6b6558',
    marginTop: '20px',
  },
  backLink: {
    color: '#1a1a1a',
    fontWeight: 600,
    textDecoration: 'none',
  },
};

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [hoverBtn, setHoverBtn] = useState(false);
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
    <div style={styles.page}>
      <div style={styles.box}>
        <h1 style={styles.heading}>Forgot Password</h1>

        {step === 1 && (
          <>
            <p style={styles.subtext}>Enter your email to receive OTP</p>
            <div style={styles.field}>
              <div style={styles.inputWrapper}>
                <svg style={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <input style={styles.input} type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} />
              </div>
            </div>
            <button
              style={hoverBtn ? { ...styles.actionBtn, ...styles.actionBtnHover } : styles.actionBtn}
              onMouseEnter={() => setHoverBtn(true)}
              onMouseLeave={() => setHoverBtn(false)}
              onClick={handleSendOtp}
            >
              Send OTP
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <p style={styles.subtext}>Enter OTP sent to your email and new password</p>
            <div style={styles.field}>
              <div style={styles.inputWrapper}>
                <input style={styles.input} type="text" placeholder="Enter OTP" value={otp} onChange={e => setOtp(e.target.value)} />
              </div>
            </div>
            <div style={styles.field}>
              <div style={styles.inputWrapper}>
                <svg style={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <input style={styles.input} type={showPassword ? 'text' : 'password'} placeholder="New Password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
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
            <button
              style={hoverBtn ? { ...styles.actionBtn, ...styles.actionBtnHover } : styles.actionBtn}
              onMouseEnter={() => setHoverBtn(true)}
              onMouseLeave={() => setHoverBtn(false)}
              onClick={handleReset}
            >
              Reset Password
            </button>
          </>
        )}

        <p style={styles.backText}>Remembered your password? <Link to="/signin" style={styles.backLink}>Sign in</Link></p>
      </div>
    </div>
  );
}