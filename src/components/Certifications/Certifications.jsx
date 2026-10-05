import React from 'react';
import { certifications } from '../../data/certifications';
import './Certifications.css';

export default function Certifications() {
  return (
    <section id="certifications" className="editorial-certifications">
      <div className="container">
        {/* Section Header */}
        <div className="section-editorial-header">
          <div className="section-title-wrap">
            <span className="section-number">06 / VERIFIED CREDENTIALS</span>
            <h2 className="section-title">CERTIFICATION ARCHIVE</h2>
          </div>
          <div className="section-meta">
            <span>OFFICIAL INDUSTRY ACCREDITATION</span><br />
            <span>CATALOG NO. CERT-2026-ARCHIVE</span>
          </div>
        </div>

        {/* Catalog Table Archive */}
        <div className="cert-catalog-list">
          <div className="cert-catalog-header">
            <span className="mono-label">NO. / ISSUER</span>
            <span className="mono-label">CERTIFICATE TITLE & DOMAIN</span>
            <span className="mono-label">CODE / DATE</span>
            <span className="mono-label text-right">VERIFICATION</span>
          </div>

          {certifications.map((cert) => (
            <div key={cert.id} className="cert-catalog-row">
              <div className="cert-col-issuer">
                <span className="cert-num">{cert.number}</span>
                <span className="cert-issuer">{cert.issuer}</span>
              </div>

              <div className="cert-col-title">
                <h3 className="cert-title">{cert.title}</h3>
                <span className="mono-tag">{cert.domain}</span>
                <p className="cert-summary">{cert.summary}</p>
              </div>

              <div className="cert-col-meta">
                <span className="mono-label">{cert.code}</span>
                <span className="cert-date">{cert.date}</span>
              </div>

              <div className="cert-col-action">
                <a 
                  href={cert.credentialUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="cert-verify-link"
                >
                  <span>VERIFY</span>
                  <span>↗</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
