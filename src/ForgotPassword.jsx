import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0b1120',
    fontFamily: "'Inter', sans-serif",
  },
  box: {
    backgroundColor: '#111c2e',
    padding: '48px 40px',
    borderRadius: '20px',
    width: '100%',
    maxWidth: '380px',
    boxShadow: '0 20px 50px rgba(0,0,0,0.4)',
    border: '1px solid rgba(59,130,246,0.15)',
  },
  darkCard: {
    backgroundColor: '#111c2e',
    borderRadius: '24px',
    padding: '40px 36px',
    width: '100%',
    maxWidth: '420px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
    border: '1px solid rgba(59,130,246,0.15)',
  },
  dragBar: {
    width: '40px', height: '4px',
    backgroundColor: 'rgba(59,130,246,0.3)',
    borderRadius: '2px', marginBottom: '28px',
  },
  darkHeading: {
    fontSize: '22px', fontWeight: 700, color: '#f1f5f9',
    marginBottom: '10px', textAlign: 'center',
  },
  darkSubtext: {
    color: '#94a3b8', fontSize: '14px', textAlign: 'center',
    marginBottom: '32px', lineHeight: 1.6,
  },
  emailText: { color: '#60a5fa', display: 'block' },
  otpRow: { display: 'flex', gap: '10px', marginBottom: '28px' },
  otpBox: {
    width: '52px', height: '58px', borderRadius: '12px',
    backgroundColor: '#0b1120',
    border: '2px solid rgba(59,130,246,0.2)',
    color: '#f1f5f9', fontSize: '22px', fontWeight: 700,
    textAlign: 'center', outline: 'none', transition: 'border-color 0.2s',
  },
  resendText: { color: '#94a3b8', fontSize: '14px', marginBottom: '20px' },
  resendBtn: {
    color: '#60a5fa', fontWeight: 600, background: 'none',
    border: 'none', fontSize: '14px', cursor: 'pointer', padding: 0,
  },
  changeEmailBtn: {
    color: '#94a3b8', fontSize: '14px', background: 'none',
    border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
  },
  checkCircle: {
    width: '72px', height: '72px', borderRadius: '16px',
    backgroundColor: 'rgba(34,197,94,0.1)', border: '2px solid #22c55e',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    marginBottom: '32px',
  },
  heading: { fontSize: '26px', marginBottom: '6px', color: '#f1f5f9' },
  subtext: { color: '#94a3b8', marginBottom: '28px', fontSize: '14px' },
  field: { marginBottom: '18px' },
  inputWrapper: {
    display: 'flex', alignItems: 'center', backgroundColor: '#0b1120',
    border: '1px solid rgba(59,130,246,0.2)', borderRadius: '10px',
    padding: '10px 12px', gap: '10px',
  },
  icon: { width: '18px', height: '18px', color: '#60a5fa', flexShrink: 0 },
  input: {
    border: 'none', outline: 'none', flex: 1, fontSize: '14px',
    background: 'transparent', color: '#e2e8f0',
  },
  toggleBtn: { background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#60a5fa' },
  toggleIcon: { width: '18px', height: '18px' },
  actionBtn: {
    width: '100%', padding: '12px',
    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
    color: '#fff', border: 'none', borderRadius: '10px',
    fontWeight: 600, fontSize: '15px', cursor: 'pointer', marginTop: '4px',
    transition: 'opacity 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease',
  },
  actionBtnHover: {
    opacity: 0.9,
    transform: 'translateY(-1px)',
    boxShadow: '0 8px 20px rgba(59,130,246,0.4)',
  },
  backText: { textAlign: 'center', fontSize: '14px', color: '#94a3b8', marginTop: '20px' },
  backLink: { color: '#60a5fa', fontWeight: 600, textDecoration: 'none' },
};


export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [countdown, setCountdown] = useState(20);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const [hoverBtn, setHoverBtn] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (step === 2) {
      setCountdown(20);
      setCanResend(false);
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) { clearInterval(timer); setCanResend(true); return 0; }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [step]);

  useEffect(() => {
    if (step === 2) setTimeout(() => inputRefs.current[0]?.focus(), 100);
  }, [step]);

  function handleOtpChange(value, index) {
    if (!/^[0-9]$/.test(value) && value !== '') return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
      setFocusedIndex(index + 1);
    }
    if (newOtp.every(d => d !== '')) {
      setStep('verified');
      setTimeout(() => setStep(3), 2000);
    }
  }

  function handleOtpKeyDown(e, index) {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
      setFocusedIndex(index - 1);
    }
  }

  async function handleSendOtp() {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) setStep(2);
      else alert(data.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    setOtp(Array(6).fill(''));
    setFocusedIndex(0);
    await handleSendOtp();
  }

  async function handleReset() {
  setLoading(true);
  try {
    const res = await fetch('http://localhost:5000/api/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp: otp.join(''), newPassword }),
    });
    const data = await res.json();
    if (res.ok) {
      setStep(5);
      setTimeout(() => navigate('/signin'), 1800);
    } else {
      alert(data.message);
    }
  } finally {
    setLoading(false);
  }
}

  // Verified screen
  if (step === 'verified') return (
    <div style={styles.page}>
      <div style={styles.darkCard}>
        <div style={styles.dragBar} />
        <p style={{ ...styles.darkHeading, marginBottom: '8px' }}>Verified successfully</p>
        <p style={styles.darkSubtext}>Your email has been verified.</p>
        <div style={styles.checkCircle}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2ecc71" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <p style={styles.resendText}>Didn't receive the code? <span style={{ color: '#f0b429', fontWeight: 600 }}>Resend</span></p>
      </div>
    </div>
  );

  // OTP screen
  if (step === 2) return (
    <div style={styles.page}>
      <div style={styles.darkCard}>
        <div style={styles.dragBar} />
        <p style={styles.darkHeading}>Let's verify your email</p>
        <p style={styles.darkSubtext}>
          We've sent a 6-digit code to<br />
          <span style={styles.emailText}>{email}</span>
        </p>
        <div style={styles.otpRow}>
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={el => inputRefs.current[i] = el}
             style={{ ...styles.otpBox, ...(focusedIndex === i ? { borderColor: '#3b82f6' } : {}) }}

              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={e => handleOtpChange(e.target.value, i)}
              onKeyDown={e => handleOtpKeyDown(e, i)}
              onFocus={() => setFocusedIndex(i)}
            />
          ))}
        </div>
        <p style={styles.resendText}>
          Didn't receive the code?{' '}
          {canResend
            ? <button style={styles.resendBtn} onClick={handleResend}>Resend</button>
           :<span style={{ color: '#60a5fa', fontWeight: 600 }}>Resend in {countdown}s</span>

          }
        </p>
        <button style={styles.changeEmailBtn} onClick={() => setStep(1)}>← Change email</button>
      </div>
    </div>
  );

  // Step 1: Email
  if (step === 1) return (
    <div style={styles.page}>
      <div style={styles.box}>
        <h1 style={styles.heading}>Forgot Password</h1>
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
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send OTP'}
        </button>

        <p style={styles.backText}> ←Back to <Link to="/signin" style={styles.backLink}> Sign in</Link></p>
      </div>
    </div>
  );

  // Step 5: Password changed
  if (step === 5) return (
    <div style={styles.page}>
      <div style={styles.darkCard}>
        <div style={styles.dragBar} />
        <p style={{ ...styles.darkHeading, marginBottom: '8px' }}>Password changed</p>
        <p style={styles.darkSubtext}>Your password has been updated successfully.</p>
        <div style={styles.checkCircle}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2ecc71" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      </div>
    </div>
  );

  // Step 3: New Password
  return (
    <div style={styles.page}>
      <div style={styles.box}>
        <h1 style={styles.heading}>Reset Password</h1>
        <p style={styles.subtext}>Enter your new password</p>
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
         disabled={loading}
>
  {loading ? 'Resetting...' : 'Reset Password'}
          
        </button>
       
      </div>
    </div>
  );
}