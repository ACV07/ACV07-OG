import React from 'react';
import './Profile.css';

export default function Profile() {
  return (
    <section id="profile" className="editorial-profile">
      <div className="container">
        {/* Section Editorial Header */}
        <div className="section-editorial-header">
          <div className="section-title-wrap">
            <span className="section-number">01 / PROFILE</span>
            <h2 className="section-title">PROFILE</h2>
          </div>
          <div className="section-meta">
            <span>PROFESSIONAL POSITIONING</span><br />
            <span>DISCIPLINE & CORE INTERESTS</span>
          </div>
        </div>

        {/* Two-Column Profile Composition */}
        <div className="profile-editorial-grid">
          {/* Left Column: Primary Discipline */}
          <div className="profile-left-col">
            <span className="mono-label">PRIMARY DISCIPLINE</span>
            <h3 className="profile-discipline-heading">
              CYBERSECURITY<br />
              <span className="slash">/</span> CLOUD SECURITY<br />
              <span className="slash">/</span> ETHICAL HACKING
            </h3>

            <div className="discipline-meta-box">
              <span className="mono-label">SPECIALIZATION FOCUS</span>
              <p className="discipline-meta-text">
                Specialized in defensive network architecture, zero-trust cloud access policies, 
                and automated adversary attack simulations.
              </p>
            </div>
          </div>

          {/* Right Column: Professional Positioning Card */}
          <div className="profile-right-col">
            <div className="positioning-dossier-card">
              <div className="card-header-bar">
                <span className="card-num">01</span>
                <span className="card-tag">WHAT DRIVES YOUR APPROACH TO CYBERSECURITY?</span>
              </div>

              <div className="card-body-text">
                <p>
                  Cybersecurity student focused on understanding how systems fail, 
                  how attacks happen, and how resilient infrastructure can be built.
                </p>
              </div>

              <div className="card-pills-row">
                <span className="mono-tag">[ SYSTEMS ]</span>
                <span className="mono-tag">[ NETWORKS ]</span>
                <span className="mono-tag">[ CLOUD SEC ]</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
