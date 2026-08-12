import React from 'react';
import './space.css';

const steps = [
  {
    number: '01',
    title: 'Create your workspace',
    desc: 'Sign up in seconds and set up your team workspace. Give it a name, add your logo, and you\'re ready to go.',
  },
  {
    number: '02',
    title: 'Invite your team',
    desc: 'Send email invites or share a link. Assign roles — Admin, Member, or Viewer — to control who can do what.',
  },
  {
    number: '03',
    title: 'Set up your projects',
    desc: 'Create projects, add tasks, set due dates, and assign owners. Use boards, lists, or timeline view.',
  },
  {
    number: '04',
    title: 'Collaborate in real time',
    desc: 'Edit docs together, comment on tasks, chat in threads, and see every update live as it happens.',
  },
  {
    number: '05',
    title: 'Track & ship faster',
    desc: 'Monitor progress with dashboards, get automated reports, and celebrate milestones as a team.',
  },
];

const faqs = [
  {
    q: 'Is SyncSpace free to use?',
    a: 'Yes — SyncSpace has a generous free tier for small teams. Paid plans unlock advanced features and higher limits.',
  },
  {
    q: 'How many team members can I invite?',
    a: 'The free plan supports up to 5 members. Pro and Enterprise plans support unlimited members.',
  },
  {
    q: 'Is my data secure?',
    a: 'Absolutely. All data is encrypted end-to-end and stored on SOC 2 compliant infrastructure.',
  },
  {
    q: 'Can I integrate with tools I already use?',
    a: 'Yes — SyncSpace integrates with 50+ tools including Slack, GitHub, Figma, Notion, and Google Workspace.',
  },
];

export default function HowItWorks() {
  return (
    <div className="page-wrapper">
      {/* Hero */}
      <section className="page-hero">
        <span className="page-badge">How it Works</span>
        <h1>Up and running<br />in minutes</h1>
        <p>SyncSpace is designed to be simple. No lengthy onboarding, no complex setup — just start collaborating.</p>
        <div className="hero-actions">
          <button className="btn-primary">Get Started Free</button>
          <button className="btn-outline">Watch Video</button>
        </div>
      </section>

      {/* Steps */}
      <section className="steps-section">
        <h2>How it works</h2>
        <p className="section-sub">Five simple steps to a fully productive team workspace.</p>
        <div className="steps-list">
          {steps.map((s, i) => (
            <div className="step-item" key={s.number}>
              <div className="step-number">{s.number}</div>
              <div className="step-connector">{i < steps.length - 1 && <span />}</div>
              <div className="step-content">
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section">
        <h2>Frequently asked questions</h2>
        <p className="section-sub">Everything you need to know before getting started.</p>
        <div className="faq-list">
          {faqs.map((f) => (
            <div className="faq-item" key={f.q}>
              <h3>{f.q}</h3>
              <p>{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner">
        <h2>Ready to get started?</h2>
        <p>Join 50,000+ teams already collaborating on SyncSpace.</p>
        <button className="btn-primary">Create Free Workspace</button>
      </section>
    </div>
  );
}
