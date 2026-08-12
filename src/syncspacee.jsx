import './space.css';
import React from 'react';
import { Link } from 'react-router-dom';
// import'./space.css';

export default function Navbar() {
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
        <Link to="/workspace" className="nav-link">Workspace</Link>
        <Link to="/features" className="nav-link">Features</Link>
        <Link to="/how-it-works" className="nav-link">How it Works</Link>
      </div>

      {/* Right: Action Buttons */}
      <div className="nav-right">
        <Link to="/signin" className="btn-signin">
          <svg className="user-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://w3.org">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
          Sign In
        </Link>
        <Link to="/signup" className="btn-getstarted">Get Started</Link>
      </div>
    </nav>
  );
}
