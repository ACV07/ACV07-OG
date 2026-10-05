import React from 'react';
import './MarqueeTicker.css';

const marqueeItems = [
  "PENETRATION TESTING",
  "THREAT SIMULATION & SOC",
  "SECURITY AUDITING",
  "LINUX KERNEL HARDENING",
  "MOBILE APP REVERSE ENGINEERING",
  "ETHICAL HACKING",
  "CLOUD SECURITY & ZERO TRUST",
  "VULNERABILITY MANAGEMENT"
];

export default function MarqueeTicker() {
  // Triple array for seamless infinite looping
  const itemsList = [...marqueeItems, ...marqueeItems, ...marqueeItems];

  return (
    <div className="editorial-marquee-strip" aria-hidden="true">
      <div className="marquee-track">
        {itemsList.map((item, index) => (
          <div key={index} className="marquee-item">
            <span className="marquee-slash">///</span>
            <span className="marquee-text">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
