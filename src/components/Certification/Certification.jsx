import React from 'react';
import { certifications } from '../../data/certifications';
import { getIssuerLogo } from './IssuerLogos';
import './Certification.css';

export default function Certification() {
  return (
    <section id="certification" className="editorial-certification">
      <div className="container">
        {/* Section Header */}
        <div className="section-editorial-header">
          <div className="section-title-wrap">
            <h2 className="section-title">CERTIFICATION</h2>
          </div>
          <div className="section-meta">
            <span>VERIFIED CREDENTIALS</span><br />
            <span>TECHNICAL CERTIFICATIONS & ACHIEVEMENTS</span>
          </div>
        </div>

        {/* Technical Registry Archive Container */}
        <div className="cert-registry-list">
          {certifications.map((cert) => (
            <article key={cert.id} className="cert-registry-row">
              {/* LEFT: Index Number */}
              <div className="cert-col-num">
                <span className="cert-number">{cert.number}</span>
              </div>

              {/* LOGO: Issuer Brand Mark */}
              <div className="cert-col-logo">
                {getIssuerLogo(cert.issuerId)}
              </div>

              {/* CENTER: Title, Issuer, Category & Description */}
              <div className="cert-col-main">
                <div className="cert-title-line">
                  <h3 className="cert-title">{cert.title}</h3>
                </div>
                <div className="cert-sub-meta">
                  <span className="cert-issuer-name">{cert.issuer}</span>
                  <span className="meta-separator">//</span>
                  <span className="mono-label cert-category-text">CATEGORY: {cert.category}</span>
                </div>
                <p className="cert-description">{cert.description}</p>
              </div>

              {/* RIGHT: Verification Link Action */}
              <div className="cert-col-action">
                <a 
                  href={cert.verificationUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="cert-verify-btn"
                  aria-label={`Verify ${cert.title} credential`}
                >
                  <span className="verify-txt">VERIFY CREDENTIAL</span>
                  <span className="verify-arrow">→</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
