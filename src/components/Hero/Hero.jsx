import React from 'react';
import './Hero.css';

export default function Hero() {
  return (
    <section id="hero" className="editorial-hero">
      {/* Editorial Watermark & Grid Background */}
      <div className="hero-grid-overlay"></div>
      <div className="hero-corner-mark top-left">+ 12.9716° N</div>
      <div className="hero-corner-mark top-right">+ 77.5946° E</div>

      <div className="container hero-container">
        {/* Top Field Journal Header */}
        <div className="hero-header-meta">
          <div className="meta-block center">
            <span className="live-pulse"></span>
            <span className="mono-label">[ FIELD STATUS ]</span>
            <span className="meta-val highlight">ACTIVE RESEARCHER</span>
          </div>
        </div>

        {/* Dominant Cover Name Typography */}
        <div className="hero-main-title">
          <h1 className="hero-name-line">ADRIAN</h1>
          <h1 className="hero-name-line indent">CHERIAN</h1>
        </div>

        {/* Bottom Cover Footer Scroll Indicator */}
        <div className="hero-cover-footer">
          <div className="scroll-hint">
            <span className="mono-label">[ SCROLL TO DISCOVER ]</span>
            <span className="scroll-arrow">↓</span>
          </div>
        </div>
      </div>
    </section>
  );
}
