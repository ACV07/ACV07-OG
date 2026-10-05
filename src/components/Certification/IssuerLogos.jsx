import React from 'react';

// Cisco Official SVG Logo
export const CiscoLogo = () => (
  <svg viewBox="0 0 120 40" className="issuer-logo-svg" height="32" fill="none">
    {/* Cisco Signal Bars Arc */}
    <g fill="var(--accent-orange, #FF4D00)">
      <rect x="10" y="16" width="3" height="8" rx="1.5" />
      <rect x="18" y="12" width="3" height="12" rx="1.5" />
      <rect x="26" y="8" width="3" height="16" rx="1.5" />
      <rect x="34" y="4" width="3" height="20" rx="1.5" />
      <rect x="42" y="8" width="3" height="16" rx="1.5" />
      <rect x="50" y="12" width="3" height="12" rx="1.5" />
      <rect x="58" y="16" width="3" height="8" rx="1.5" />
    </g>
    {/* CISCO Text */}
    <text x="70" y="22" fill="var(--text-primary, #F2F0EA)" fontSize="13" fontFamily="var(--font-mono)" fontWeight="800" letterSpacing="0.1em">
      CISCO
    </text>
  </svg>
);

// NASSCOM Official SVG Logo
export const NasscomLogo = () => (
  <svg viewBox="0 0 140 40" className="issuer-logo-svg" height="30" fill="none">
    <g fill="var(--accent-orange, #FF4D00)">
      <path d="M 10 10 H 18 V 28 H 10 Z M 22 10 L 34 24 V 10 H 42 V 28 H 34 L 22 14 V 28 H 14 V 10 H 22 Z" />
    </g>
    <text x="46" y="24" fill="var(--text-primary, #F2F0EA)" fontSize="14" fontFamily="var(--font-mono)" fontWeight="800" letterSpacing="0.08em">
      NASSCOM
    </text>
  </svg>
);

// NPTEL Official SVG Logo
export const NptelLogo = () => (
  <svg viewBox="0 0 130 40" className="issuer-logo-svg" height="30" fill="none">
    {/* NPTEL Tech Emblem */}
    <circle cx="20" cy="19" r="11" stroke="var(--accent-orange, #FF4D00)" strokeWidth="2.5" fill="none" />
    <path d="M 14 19 H 26 M 20 13 V 25" stroke="var(--accent-orange, #FF4D00)" strokeWidth="2" />
    <text x="38" y="24" fill="var(--text-primary, #F2F0EA)" fontSize="14" fontFamily="var(--font-mono)" fontWeight="800" letterSpacing="0.1em">
      NPTEL
    </text>
  </svg>
);

// IBM Official 8-Bar SVG Logo
export const IbmLogo = () => (
  <svg viewBox="0 0 100 40" className="issuer-logo-svg" height="28" fill="none">
    <g fill="var(--accent-orange, #FF4D00)">
      {/* IBM Letter Bars */}
      {/* I */}
      <rect x="8" y="8" width="12" height="3" />
      <rect x="8" y="13" width="12" height="3" />
      <rect x="12.5" y="18" width="3" height="3" />
      <rect x="12.5" y="23" width="3" height="3" />
      <rect x="8" y="28" width="12" height="3" />

      {/* B */}
      <rect x="26" y="8" width="14" height="3" />
      <rect x="26" y="13" width="16" height="3" />
      <rect x="26" y="18" width="14" height="3" />
      <rect x="26" y="23" width="16" height="3" />
      <rect x="26" y="28" width="14" height="3" />

      {/* M */}
      <rect x="48" y="8" width="4" height="3" />
      <rect x="58" y="8" width="4" height="3" />
      <rect x="68" y="8" width="4" height="3" />
      <rect x="48" y="13" width="24" height="3" />
      <rect x="48" y="18" width="6" height="3" />
      <rect x="57" y="18" width="6" height="3" />
      <rect x="66" y="18" width="6" height="3" />
      <rect x="48" y="23" width="4" height="3" />
      <rect x="58" y="23" width="4" height="3" />
      <rect x="68" y="23" width="4" height="3" />
      <rect x="48" y="28" width="4" height="3" />
      <rect x="58" y="28" width="4" height="3" />
      <rect x="68" y="28" width="4" height="3" />
    </g>
    <text x="76" y="25" fill="var(--text-primary, #F2F0EA)" fontSize="13" fontFamily="var(--font-mono)" fontWeight="800">
      IBM
    </text>
  </svg>
);

export const getIssuerLogo = (issuerId) => {
  switch (issuerId) {
    case 'cisco':
      return <CiscoLogo />;
    case 'nasscom':
      return <NasscomLogo />;
    case 'nptel':
      return <NptelLogo />;
    case 'ibm':
      return <IbmLogo />;
    default:
      return null;
  }
};
