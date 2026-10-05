import React from 'react';
import './Footer.css';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="editorial-footer">
      <div className="container">
        <div className="footer-top-row">
          <div className="footer-brand">
            <span className="brand-dot"></span>
            <span className="footer-title">ADRIAN CHERIAN</span>
          </div>

          <button className="back-top-btn" onClick={scrollToTop}>
            <span>BACK TO TOP</span>
            <span>↑</span>
          </button>
        </div>

        <div className="footer-mid-row">
          <div className="footer-col">
            <span className="mono-label">DISCIPLINE</span>
            <p className="footer-val">Cloud Security / Ethical Hacking / System Resilience</p>
          </div>

          <div className="footer-col">
            <span className="mono-label">LOCATION COORDINATES</span>
            <p className="footer-val">Bangalore, India [ 12.9716° N, 77.5946° E ]</p>
          </div>

          <div className="footer-col">
            <span className="mono-label">SYSTEM TELEMETRY</span>
            <p className="footer-val">HTTP/2 SSL Pinning Enabled // Status 200 OK</p>
          </div>
        </div>


      </div>
    </footer>
  );
}
