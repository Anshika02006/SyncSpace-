import './space.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="navbar">
      {/* Left: Brand Logo & Title */}
      <div className="nav-left">
        <div className="logo-box">&&</div>
        <div className="brand-details">
          <div className="brand-title-row">
            <span className="brand-name">SyncSpace</span>
          </div>
          <p className="brand-subtitle">NovaCode</p>
        </div>
      </div>

      {/* Center: Links */}
      <div className="nav-center">
        <Link to="/home" className="nav-link">Home</Link>
        <Link to="/workspace" className="nav-link">Workspace</Link>
        <Link to="/features" className="nav-link">Features</Link>
        <Link to="/how-it-works" className="nav-link">How it Works</Link>
      </div>

      {/* Right: Action Buttons */}
      <div className="nav-right">
        <Link to="/signin" className="btn-signin">
          <svg className="user-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
          Sign In
        </Link>
        <Link to="/signup" className="btn-getstarted">Get Started</Link>
      </div>

      {/* Hamburger Button */}
      <button className="hamburger" onClick={() => setMenuOpen(m => !m)}>
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <Link to="/home" className="nav-link" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/workspace" className="nav-link" onClick={() => setMenuOpen(false)}>Workspace</Link>
          <Link to="/features" className="nav-link" onClick={() => setMenuOpen(false)}>Features</Link>
          <Link to="/how-it-works" className="nav-link" onClick={() => setMenuOpen(false)}>How it Works</Link>
        </div>
      )}
    </nav>
  );
}
