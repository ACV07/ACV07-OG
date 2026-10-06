import React from 'react';
import './Contact.css';

export default function Contact() {
  return (
    <section id="contact" className="editorial-contact">
      <div className="container">
        {/* Section Header */}
        <div className="section-editorial-header">
          <div className="section-title-wrap">
            <h2 className="section-title">CONTACT</h2>
          </div>
          <div className="section-meta">
            <span>SECURE COMMUNICATION CHANNELS</span><br />
            <span>VERIFIED DIRECT TRANSMISSION</span>
          </div>
        </div>

        <div className="contact-editorial-container">
          <div className="statement-badge">[ DIRECT CHANNELS ]</div>
          <h2 className="contact-hero-statement">
            LET'S BUILD<br />
            <span className="stroke-text">SOMETHING</span><br />
            SECURE.
          </h2>


          {/* DISPATCH A MAIL CTA BUTTON */}
          <div className="contact-action-bar">
            <a 
              href="mailto:adriancherian77@gmail.com?subject=Security%20Inquiry%20%2F%20Dispatch" 
              className="dispatch-mail-btn"
              title="Dispatch Mail to adriancherian77@gmail.com"
            >
              <span className="btn-txt">DISPATCH A MAIL</span>
              <span className="btn-arrow">→</span>
            </a>
          </div>

          <div className="contact-channels-grid">
            <div className="channel-box">
              <span className="mono-label">GMAIL / EMAIL</span>
              <a href="mailto:adriancherian77@gmail.com" className="direct-link-val">
                adriancherian77@gmail.com ↗
              </a>
            </div>

            <div className="channel-box">
              <span className="mono-label">LINKEDIN PROFILE</span>
              <a 
                href="https://www.linkedin.com/in/adrian-cherian777/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="direct-link-val"
              >
                linkedin.com/in/adrian-cherian777 ↗
              </a>
            </div>

            <div className="channel-box">
              <span className="mono-label">GITHUB REPOSITORY</span>
              <a 
                href="https://github.com/ACV07" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="direct-link-val"
              >
                github.com/ACV07 ↗
              </a>
            </div>

            <div className="channel-box">
              <span className="mono-label">INSTAGRAM / SOCIAL</span>
              <a 
                href="https://www.instagram.com/adrian_cherian_7?stkn=b2wybXFqczFqNjB5" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="direct-link-val"
              >
                instagram.com/adrian_cherian_7 ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
