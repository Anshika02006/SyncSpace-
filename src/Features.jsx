import React from 'react';
import './space.css';

const features = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
    tag: 'Performance',
    title: 'Lightning Fast Sync',
    desc: 'Changes reflect across all devices in under 100ms. No refresh needed, no lag, no conflicts.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    ),
    tag: 'Security',
    title: 'End-to-End Encryption',
    desc: 'All your data is encrypted in transit and at rest. Only your team can access your workspace.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>
      </svg>
    ),
    tag: 'Integrations',
    title: '50+ App Integrations',
    desc: 'Connect Slack, GitHub, Figma, Google Drive and more. SyncSpace fits into your existing workflow.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    tag: 'Reliability',
    title: '99.9% Uptime SLA',
    desc: 'Built on resilient infrastructure with automatic failover so your team is never blocked.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
      </svg>
    ),
    tag: 'Cross-platform',
    title: 'Works Everywhere',
    desc: 'Web, desktop, and mobile apps for iOS and Android. Your workspace follows you anywhere.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 20V10M12 20V4M6 20v-6"/>
      </svg>
    ),
    tag: 'Insights',
    title: 'Smart Reporting',
    desc: 'Auto-generated weekly reports, burndown charts, and custom KPI dashboards for every project.',
  },
];

const stats = [
  { value: '50K+', label: 'Teams worldwide' },
  { value: '99.9%', label: 'Uptime guaranteed' },
  { value: '100ms', label: 'Avg. sync speed' },
  { value: '50+', label: 'Integrations' },
];

export default function Features() {
  return (
    <div className="page-wrapper">
      {/* Hero */}
      <section className="page-hero">
        <span className="page-badge">Features</span>
        <h1>Built for teams that<br />move fast</h1>
        <p>Every feature in SyncSpace is designed to reduce friction and help your team ship faster.</p>
        <div className="hero-actions">
          <button className="btn-primary">Explore All Features</button>
          <button className="btn-outline">See Pricing</button>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-row">
        {stats.map((s) => (
          <div className="stat-item" key={s.label}>
            <span className="stat-value">{s.value}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </section>

      {/* Feature Cards */}
      <section className="cards-section">
        <h2>Core Features</h2>
        <p className="section-sub">The building blocks of a modern, collaborative workspace.</p>
        <div className="cards-grid">
          {features.map((f) => (
            <div className="card" key={f.title}>
              <div className="card-tag">{f.tag}</div>
              <div className="card-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner">
        <h2>See all features in action</h2>
        <p>Start a free 14-day trial — no credit card required.</p>
        <button className="btn-primary">Start Free Trial</button>
      </section>
    </div>
  );
}
