import React from 'react';
import './space.css';

const tools = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
    title: 'Shared Boards',
    desc: 'Organize tasks and ideas on collaborative boards your whole team can edit in real time.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    title: 'Team Chat',
    desc: 'Instant messaging with threads, reactions, and file sharing — all in one place.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
      </svg>
    ),
    title: 'Docs & Notes',
    desc: 'Create rich documents and notes that sync instantly across every team member.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    title: 'Time Tracking',
    desc: 'Log hours per task and project to keep budgets and deadlines on track.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: 'Team Members',
    desc: 'Invite teammates, assign roles, and manage permissions with fine-grained controls.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    title: 'Analytics',
    desc: 'Visual dashboards showing team velocity, task completion, and project health.',
  },
];

export default function Workspace() {
  return (
    <div className="page-wrapper">
      {/* Hero */}
      <section className="page-hero">
        <span className="page-badge">Workspace</span>
        <h1>Everything your team needs,<br />in one place</h1>
        <p>SyncSpace brings together all the tools your team uses daily — no more switching between apps.</p>
        <div className="hero-actions">
          <button className="btn-primary">View Demo</button>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="cards-section">
        <h2>Workspace Tools</h2>
        <p className="section-sub">Everything you need to run a high-performing team.</p>
        <div className="cards-grid">
          {tools.map((t) => (
            <div className="card" key={t.title}>
              <div className="card-icon">{t.icon}</div>
              <h3>{t.title}</h3>
              <p>{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner">
        <h2>Ready to build your workspace?</h2>
        <p>Join thousands of teams already using SyncSpace.</p>
        <button className="btn-primary">Start for Free</button>
      </section>
    </div>
  );
}
