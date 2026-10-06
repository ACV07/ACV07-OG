import React from 'react';

// Shared SVG Glow Filter & Arrow Markers
const SharedSvgDefs = () => (
  <defs>
    {/* Orange Neon Glow Filter */}
    <filter id="cyber-glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    {/* Bright Pulse Dot Glow Filter */}
    <filter id="dot-glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="4" result="blur1" />
      <feGaussianBlur stdDeviation="1" result="blur2" />
      <feMerge>
        <feMergeNode in="blur1" />
        <feMergeNode in="blur2" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    {/* Gradient stroke for connecting lines */}
    <linearGradient id="orange-path-grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stopColor="#FF4D00" stopOpacity="0.8" />
      <stop offset="50%" stopColor="#FF7700" stopOpacity="1" />
      <stop offset="100%" stopColor="#FF4D00" stopOpacity="0.8" />
    </linearGradient>

    {/* Arrow Marker */}
    <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 8 5 L 0 9 z" fill="#FF4D00" />
    </marker>
  </defs>
);

// Helper component for animated moving data dots along a path
const AnimatedPathDots = ({ pathId, d, duration = 3, count = 2 }) => {
  const dots = Array.from({ length: count });
  return (
    <>
      {/* Background static path */}
      <path d={d} stroke="rgba(255, 77, 0, 0.25)" strokeWidth="4" fill="none" />
      {/* Core glowing line */}
      <path id={pathId} d={d} stroke="url(#orange-path-grad)" strokeWidth="2" fill="none" filter="url(#cyber-glow)" />
      
      {/* Animated dots moving along path */}
      {dots.map((_, i) => {
        const beginTime = (i * (duration / count)).toFixed(2) + 's';
        return (
          <circle key={i} r="3.5" fill="#FFF" filter="url(#dot-glow)">
            <animateMotion
              dur={`${duration}s`}
              begin={beginTime}
              repeatCount="indefinite"
              path={d}
            />
          </circle>
        );
      })}
    </>
  );
};

// ----------------------------------------------------
// 01. SPLUNK ARCHITECTURE DIAGRAM
// ----------------------------------------------------
export const SplunkDiagram = () => {
  return (
    <svg viewBox="20 18 870 214" className="cyber-diagram-svg" width="100%" height="100%">
      <SharedSvgDefs />

      {/* --- CONNECTING PATHS --- */}
      {/* Forwarder -> Indexer */}
      <AnimatedPathDots pathId="sp-1" d="M 120 120 L 300 120" duration={2.4} count={2} />
      
      {/* Indexer -> Search Head */}
      <AnimatedPathDots pathId="sp-2" d="M 380 120 L 560 120" duration={2.4} count={2} />

      {/* Search Head -> Outputs (Branch 1: Top, Branch 2: Mid, Branch 3: Bot) */}
      <AnimatedPathDots pathId="sp-3a" d="M 640 120 C 710 120, 710 45, 770 45" duration={2.8} count={2} />
      <AnimatedPathDots pathId="sp-3b" d="M 640 120 L 770 120" duration={2.8} count={2} />
      <AnimatedPathDots pathId="sp-3c" d="M 640 120 C 710 120, 710 195, 770 195" duration={2.8} count={2} />

      {/* --- NODE 1: UNIVERSAL FORWARDER (Laptop) --- */}
      <g transform="translate(80, 120)">
        <circle r="36" fill="none" stroke="rgba(255, 77, 0, 0.4)" strokeWidth="1" strokeDasharray="3,3" />
        <circle r="30" fill="var(--bg-card, #0A0A0A)" stroke="#FF4D00" strokeWidth="2" filter="url(#cyber-glow)" />
        {/* Laptop Icon */}
        <path d="M -12 -6 L 12 -6 L 12 6 L -12 6 Z M -16 8 L 16 8 L 14 10 L -14 10 Z" fill="none" stroke="#FF4D00" strokeWidth="1.8" />
        <text y="50" textAnchor="middle" fill="var(--text-primary, #F2F0EA)" fontSize="11" fontFamily="var(--font-mono)" fontWeight="700" letterSpacing="0.05em">FORWARDER</text>
        <text y="64" textAnchor="middle" fill="var(--text-muted, #888888)" fontSize="9" fontFamily="var(--font-mono)">LOG AGENT</text>
      </g>

      {/* --- NODE 2: INDEXER (Terminal >_) --- */}
      <g transform="translate(340, 120)">
        <circle r="36" fill="none" stroke="rgba(255, 77, 0, 0.4)" strokeWidth="1" strokeDasharray="3,3" />
        <circle r="30" fill="var(--bg-card, #0A0A0A)" stroke="#FF4D00" strokeWidth="2" filter="url(#cyber-glow)" />
        {/* Terminal Icon */}
        <rect x="-13" y="-10" width="26" height="20" rx="2" fill="none" stroke="#FF4D00" strokeWidth="1.8" />
        <path d="M -8 -4 L -3 0 L -8 4 M -1 4 L 6 4" fill="none" stroke="#FF4D00" strokeWidth="1.8" strokeLinecap="round" />
        <text y="50" textAnchor="middle" fill="var(--text-primary, #F2F0EA)" fontSize="11" fontFamily="var(--font-mono)" fontWeight="700" letterSpacing="0.05em">INDEXER</text>
        <text y="64" textAnchor="middle" fill="var(--text-muted, #888888)" fontSize="9" fontFamily="var(--font-mono)">PARSE & INDEX</text>
      </g>

      {/* --- NODE 3: SEARCH HEAD (Server Racks) --- */}
      <g transform="translate(600, 120)">
        <circle r="36" fill="none" stroke="rgba(255, 77, 0, 0.4)" strokeWidth="1" strokeDasharray="3,3" />
        <circle r="30" fill="var(--bg-card, #0A0A0A)" stroke="#FF4D00" strokeWidth="2" filter="url(#cyber-glow)" />
        {/* Server Icon */}
        <rect x="-12" y="-12" width="24" height="6" rx="1" fill="none" stroke="#FF4D00" strokeWidth="1.5" />
        <rect x="-12" y="-3" width="24" height="6" rx="1" fill="none" stroke="#FF4D00" strokeWidth="1.5" />
        <rect x="-12" y="6" width="24" height="6" rx="1" fill="none" stroke="#FF4D00" strokeWidth="1.5" />
        <circle cx="6" cy="-9" r="1" fill="#FF4D00" />
        <circle cx="6" cy="0" r="1" fill="#FF4D00" />
        <circle cx="6" cy="9" r="1" fill="#FF4D00" />
        <text y="50" textAnchor="middle" fill="var(--text-primary, #F2F0EA)" fontSize="11" fontFamily="var(--font-mono)" fontWeight="700" letterSpacing="0.05em">SEARCH HEAD</text>
        <text y="64" textAnchor="middle" fill="var(--text-muted, #888888)" fontSize="9" fontFamily="var(--font-mono)">ANALYTICS ENGINE</text>
      </g>

      {/* --- OUTPUT ENDPOINTS --- */}
      {/* Endpoint A: Dashboard */}
      <g transform="translate(830, 45)">
        <rect x="-55" y="-18" width="110" height="36" rx="3" fill="var(--bg-secondary, #0E0E0E)" stroke="#FF4D00" strokeWidth="1.2" />
        <rect x="-43" y="-8" width="14" height="16" rx="1" fill="none" stroke="#FF4D00" strokeWidth="1.4" />
        <path d="M -40 -3 H -32 M -40 2 H -34" stroke="#FF4D00" strokeWidth="1.4" />
        <text x="-22" y="3" fill="var(--text-primary, #F2F0EA)" fontSize="9.5" fontFamily="var(--font-mono)" fontWeight="700">DASHBOARD</text>
        <text x="-22" y="13" fill="var(--text-muted, #888888)" fontSize="7.5" fontFamily="var(--font-mono)">REALTIME UI</text>
      </g>

      {/* Endpoint B: Security SIEM */}
      <g transform="translate(830, 120)">
        <rect x="-55" y="-18" width="110" height="36" rx="3" fill="var(--bg-secondary, #0E0E0E)" stroke="#FF4D00" strokeWidth="1.2" />
        {/* Firewall / Shield Icon */}
        <path d="M -43 -7 L -36 -10 L -29 -7 L -29 0 C -29 6, -36 9, -36 9 C -36 9, -43 6, -43 0 Z" fill="none" stroke="#FF4D00" strokeWidth="1.4" />
        <text x="-22" y="3" fill="var(--text-primary, #F2F0EA)" fontSize="9.5" fontFamily="var(--font-mono)" fontWeight="700">SIEM ALERTS</text>
        <text x="-22" y="13" fill="var(--text-muted, #888888)" fontSize="7.5" fontFamily="var(--font-mono)">THREAT MON</text>
      </g>

      {/* Endpoint C: API Export */}
      <g transform="translate(830, 195)">
        <rect x="-55" y="-18" width="110" height="36" rx="3" fill="var(--bg-secondary, #0E0E0E)" stroke="#FF4D00" strokeWidth="1.2" />
        {/* Globe Icon */}
        <circle cx="-36" cy="0" r="7" fill="none" stroke="#FF4D00" strokeWidth="1.4" />
        <ellipse cx="-36" cy="0" rx="3" ry="7" fill="none" stroke="#FF4D00" strokeWidth="1" />
        <path d="M -43 0 H -29" stroke="#FF4D00" strokeWidth="1" />
        <text x="-22" y="3" fill="var(--text-primary, #F2F0EA)" fontSize="9.5" fontFamily="var(--font-mono)" fontWeight="700">API EXPORT</text>
        <text x="-22" y="13" fill="var(--text-muted, #888888)" fontSize="7.5" fontFamily="var(--font-mono)">REST / DATA</text>
      </g>
    </svg>
  );
};

// ----------------------------------------------------
// 02. WIRESHARK PACKET ANALYSIS DIAGRAM
// ----------------------------------------------------
export const WiresharkDiagram = () => {
  return (
    <svg viewBox="20 18 910 226" className="cyber-diagram-svg" width="100%" height="100%">
      <SharedSvgDefs />

      {/* --- INPUT PATHS MERGING INTO CAPTURE --- */}
      <AnimatedPathDots pathId="ws-in1" d="M 140 45 C 200 45, 200 130, 250 130" duration={2.6} count={2} />
      <AnimatedPathDots pathId="ws-in2" d="M 140 130 L 250 130" duration={2.4} count={2} />
      <AnimatedPathDots pathId="ws-in3" d="M 140 215 C 200 215, 200 130, 250 130" duration={2.6} count={2} />

      {/* --- PIPELINE PATHS --- */}
      <AnimatedPathDots pathId="ws-pipe1" d="M 330 130 L 440 130" duration={2.2} count={2} />
      <AnimatedPathDots pathId="ws-pipe2" d="M 520 130 L 630 130" duration={2.2} count={2} />

      {/* --- OUTPUT PATHS --- */}
      <AnimatedPathDots pathId="ws-out1" d="M 710 130 C 760 130, 760 45, 800 45" duration={2.8} count={2} />
      <AnimatedPathDots pathId="ws-out2" d="M 710 130 L 800 130" duration={2.8} count={2} />
      <AnimatedPathDots pathId="ws-out3" d="M 710 130 C 760 130, 760 215, 800 215" duration={2.8} count={2} />

      {/* --- LEFT INPUT BADGES --- */}
      {/* Client */}
      <g transform="translate(85, 45)">
        <rect x="-55" y="-18" width="110" height="36" rx="3" fill="var(--bg-secondary, #0E0E0E)" stroke="#FF4D00" strokeWidth="1.2" />
        <path d="M -43 -6 L -29 -6 L -29 4 L -43 4 Z M -45 6 L -27 6" fill="none" stroke="#FF4D00" strokeWidth="1.4" />
        <text x="-20" y="2" fill="var(--text-primary, #F2F0EA)" fontSize="9" fontFamily="var(--font-mono)" fontWeight="700">CLIENT</text>
        <text x="-20" y="12" fill="var(--text-muted, #888888)" fontSize="7.5" fontFamily="var(--font-mono)">USER TRAFFIC</text>
      </g>
      {/* Server */}
      <g transform="translate(85, 130)">
        <rect x="-55" y="-18" width="110" height="36" rx="3" fill="var(--bg-secondary, #0E0E0E)" stroke="#FF4D00" strokeWidth="1.2" />
        <rect x="-43" y="-10" width="16" height="5" rx="1" fill="none" stroke="#FF4D00" strokeWidth="1.2" />
        <rect x="-43" y="-3" width="16" height="5" rx="1" fill="none" stroke="#FF4D00" strokeWidth="1.2" />
        <rect x="-43" y="4" width="16" height="5" rx="1" fill="none" stroke="#FF4D00" strokeWidth="1.2" />
        <text x="-20" y="2" fill="var(--text-primary, #F2F0EA)" fontSize="9" fontFamily="var(--font-mono)" fontWeight="700">SERVER</text>
        <text x="-20" y="12" fill="var(--text-muted, #888888)" fontSize="7.5" fontFamily="var(--font-mono)">NET TRAFFIC</text>
      </g>
      {/* Internet */}
      <g transform="translate(85, 215)">
        <rect x="-55" y="-18" width="110" height="36" rx="3" fill="var(--bg-secondary, #0E0E0E)" stroke="#FF4D00" strokeWidth="1.2" />
        <circle cx="-36" cy="0" r="7" fill="none" stroke="#FF4D00" strokeWidth="1.4" />
        <ellipse cx="-36" cy="0" rx="3" ry="7" fill="none" stroke="#FF4D00" strokeWidth="1" />
        <text x="-20" y="2" fill="var(--text-primary, #F2F0EA)" fontSize="9" fontFamily="var(--font-mono)" fontWeight="700">INTERNET</text>
        <text x="-20" y="12" fill="var(--text-muted, #888888)" fontSize="7.5" fontFamily="var(--font-mono)">WAN TRAFFIC</text>
      </g>

      {/* --- CENTRAL PROCESS NODES --- */}
      {/* Node 1: Packet Capture */}
      <g transform="translate(290, 130)">
        <circle r="36" fill="none" stroke="rgba(255, 77, 0, 0.4)" strokeWidth="1" strokeDasharray="3,3" />
        <circle r="30" fill="var(--bg-card, #0A0A0A)" stroke="#FF4D00" strokeWidth="2" filter="url(#cyber-glow)" />
        {/* Document Icon */}
        <path d="M -10 -12 H 4 L 10 -6 V 12 H -10 Z M 4 -12 V -6 H 10" fill="none" stroke="#FF4D00" strokeWidth="1.5" />
        <path d="M -5 0 H 5 M -5 4 H 3" stroke="#FF4D00" strokeWidth="1.2" />
        <text y="50" textAnchor="middle" fill="var(--text-primary, #F2F0EA)" fontSize="10.5" fontFamily="var(--font-mono)" fontWeight="700">CAPTURE</text>
        <text y="64" textAnchor="middle" fill="var(--text-muted, #888888)" fontSize="8.5" fontFamily="var(--font-mono)">LIVE SNIFFER</text>
      </g>

      {/* Node 2: Wireshark Fin */}
      <g transform="translate(480, 130)">
        <circle r="38" fill="none" stroke="rgba(255, 77, 0, 0.5)" strokeWidth="1.2" strokeDasharray="4,4" />
        <circle r="32" fill="var(--bg-card, #0A0A0A)" stroke="#FF4D00" strokeWidth="2.2" filter="url(#cyber-glow)" />
        {/* Shark Fin Icon */}
        <path d="M -14 10 Q -4 -16 14 -12 C 4 -2 0 6 -14 10 Z" fill="none" stroke="#FF4D00" strokeWidth="1.8" />
        <path d="M -14 10 H 14" stroke="#FF4D00" strokeWidth="1.2" />
        <text y="52" textAnchor="middle" fill="var(--text-primary, #F2F0EA)" fontSize="11" fontFamily="var(--font-mono)" fontWeight="700">WIRESHARK</text>
        <text y="66" textAnchor="middle" fill="var(--text-muted, #888888)" fontSize="8.5" fontFamily="var(--font-mono)">DECODER ENGINE</text>
      </g>

      {/* Node 3: Packet View */}
      <g transform="translate(670, 130)">
        <circle r="36" fill="none" stroke="rgba(255, 77, 0, 0.4)" strokeWidth="1" strokeDasharray="3,3" />
        <circle r="30" fill="var(--bg-card, #0A0A0A)" stroke="#FF4D00" strokeWidth="2" filter="url(#cyber-glow)" />
        {/* Inspect Search Icon */}
        <circle cx="-2" cy="-2" r="7" fill="none" stroke="#FF4D00" strokeWidth="1.5" />
        <path d="M 3 3 L 10 10" stroke="#FF4D00" strokeWidth="2" strokeLinecap="round" />
        <text y="50" textAnchor="middle" fill="var(--text-primary, #F2F0EA)" fontSize="10.5" fontFamily="var(--font-mono)" fontWeight="700">INSPECTOR</text>
        <text y="64" textAnchor="middle" fill="var(--text-muted, #888888)" fontSize="8.5" fontFamily="var(--font-mono)">REALTIME DISPLAY</text>
      </g>

      {/* --- RIGHT OUTPUT BADGES --- */}
      {/* Protocol Analysis */}
      <g transform="translate(865, 45)">
        <rect x="-60" y="-18" width="120" height="36" rx="3" fill="var(--bg-secondary, #0E0E0E)" stroke="#FF4D00" strokeWidth="1.2" />
        <path d="M -50 6 V -2 M -44 6 V -8 M -38 6 V 2" stroke="#FF4D00" strokeWidth="1.8" strokeLinecap="round" />
        <text x="-26" y="2" fill="var(--text-primary, #F2F0EA)" fontSize="9" fontFamily="var(--font-mono)" fontWeight="700">PROTOCOLS</text>
        <text x="-26" y="12" fill="var(--text-muted, #888888)" fontSize="7.5" fontFamily="var(--font-mono)">HTTP/DNS/TCP</text>
      </g>

      {/* Packet Details */}
      <g transform="translate(865, 130)">
        <rect x="-60" y="-18" width="120" height="36" rx="3" fill="var(--bg-secondary, #0E0E0E)" stroke="#FF4D00" strokeWidth="1.2" />
        <path d="M -50 -8 H -38 V 8 H -50 Z M -46 -4 H -40 M -46 0 H -42" stroke="#FF4D00" strokeWidth="1.3" fill="none" />
        <text x="-26" y="2" fill="var(--text-primary, #F2F0EA)" fontSize="9" fontFamily="var(--font-mono)" fontWeight="700">DETAILS</text>
        <text x="-26" y="12" fill="var(--text-muted, #888888)" fontSize="7.5" fontFamily="var(--font-mono)">HEX / PAYLOAD</text>
      </g>

      {/* Troubleshoot */}
      <g transform="translate(865, 215)">
        <rect x="-60" y="-18" width="120" height="36" rx="3" fill="var(--bg-secondary, #0E0E0E)" stroke="#FF4D00" strokeWidth="1.2" />
        <path d="M -44 7 L -34 -9 L -24 7 Z M -34 -2 V 2 M -34 4 V 5" fill="none" stroke="#FF4D00" strokeWidth="1.4" strokeLinejoin="round" />
        <text x="-18" y="2" fill="var(--text-primary, #F2F0EA)" fontSize="9" fontFamily="var(--font-mono)" fontWeight="700">MONITOR</text>
        <text x="-18" y="12" fill="var(--text-muted, #888888)" fontSize="7.5" fontFamily="var(--font-mono)">TROUBLESHOOT</text>
      </g>
    </svg>
  );
};

// ----------------------------------------------------
// 03. NMAP RECONNAISSANCE SCAN DIAGRAM
// ----------------------------------------------------
export const NmapDiagram = () => {
  return (
    <svg viewBox="25 18 920 214" className="cyber-diagram-svg" width="100%" height="100%">
      <SharedSvgDefs />

      {/* --- CONNECTING PATHS --- */}
      <AnimatedPathDots pathId="nm-1" d="M 110 120 L 260 120" duration={2.4} count={2} />
      <AnimatedPathDots pathId="nm-2" d="M 340 120 L 490 120" duration={2.4} count={2} />
      <AnimatedPathDots pathId="nm-3" d="M 570 120 L 720 120" duration={2.4} count={2} />

      {/* Output Branches */}
      <AnimatedPathDots pathId="nm-4a" d="M 780 120 C 820 120, 820 45, 850 45" duration={2.8} count={2} />
      <AnimatedPathDots pathId="nm-4b" d="M 780 120 L 850 120" duration={2.8} count={2} />
      <AnimatedPathDots pathId="nm-4c" d="M 780 120 C 820 120, 820 195, 850 195" duration={2.8} count={2} />

      {/* --- STAGE 1: TARGET --- */}
      <g transform="translate(75, 120)">
        <circle r="36" fill="none" stroke="rgba(255, 77, 0, 0.4)" strokeWidth="1" strokeDasharray="3,3" />
        <circle r="30" fill="var(--bg-card, #0A0A0A)" stroke="#FF4D00" strokeWidth="2" filter="url(#cyber-glow)" />
        {/* Target Reticle */}
        <circle cx="0" cy="0" r="10" fill="none" stroke="#FF4D00" strokeWidth="1.5" />
        <path d="M -14 0 H -6 M 6 0 H 14 M 0 -14 V -6 M 0 6 V 14" stroke="#FF4D00" strokeWidth="1.5" />
        <text y="50" textAnchor="middle" fill="var(--text-primary, #F2F0EA)" fontSize="10.5" fontFamily="var(--font-mono)" fontWeight="700">TARGET</text>
        <text y="64" textAnchor="middle" fill="var(--text-muted, #888888)" fontSize="8.5" fontFamily="var(--font-mono)">IP / DOMAIN</text>
      </g>

      {/* --- STAGE 2: NMAP PROBE SCAN --- */}
      <g transform="translate(300, 120)">
        <circle r="36" fill="none" stroke="rgba(255, 77, 0, 0.4)" strokeWidth="1" strokeDasharray="3,3" />
        <circle r="30" fill="var(--bg-card, #0A0A0A)" stroke="#FF4D00" strokeWidth="2" filter="url(#cyber-glow)" />
        {/* Terminal Icon */}
        <rect x="-12" y="-9" width="24" height="18" rx="2" fill="none" stroke="#FF4D00" strokeWidth="1.6" />
        <path d="M -7 -4 L -3 0 L -7 4 M -1 4 L 5 4" fill="none" stroke="#FF4D00" strokeWidth="1.6" strokeLinecap="round" />
        <text y="50" textAnchor="middle" fill="var(--text-primary, #F2F0EA)" fontSize="10.5" fontFamily="var(--font-mono)" fontWeight="700">PROBE SCAN</text>
        <text y="64" textAnchor="middle" fill="var(--text-muted, #888888)" fontSize="8.5" fontFamily="var(--font-mono)">SYN / ACK PACKETS</text>
      </g>

      {/* --- STAGE 3: RESPONSE --- */}
      <g transform="translate(530, 120)">
        <circle r="36" fill="none" stroke="rgba(255, 77, 0, 0.4)" strokeWidth="1" strokeDasharray="3,3" />
        <circle r="30" fill="var(--bg-card, #0A0A0A)" stroke="#FF4D00" strokeWidth="2" filter="url(#cyber-glow)" />
        {/* Server Response Icon */}
        <rect x="-12" y="-10" width="24" height="20" rx="2" fill="none" stroke="#FF4D00" strokeWidth="1.5" />
        <path d="M -8 -4 H 8 M -8 0 H 4 M -8 4 H 8" stroke="#FF4D00" strokeWidth="1.4" />
        <text y="50" textAnchor="middle" fill="var(--text-primary, #F2F0EA)" fontSize="10.5" fontFamily="var(--font-mono)" fontWeight="700">RESPONSE</text>
        <text y="64" textAnchor="middle" fill="var(--text-muted, #888888)" fontSize="8.5" fontFamily="var(--font-mono)">PORT STATUS</text>
      </g>

      {/* --- STAGE 4: SCAN RESULTS --- */}
      <g transform="translate(750, 120)">
        <circle r="36" fill="none" stroke="rgba(255, 77, 0, 0.4)" strokeWidth="1" strokeDasharray="3,3" />
        <circle r="30" fill="var(--bg-card, #0A0A0A)" stroke="#FF4D00" strokeWidth="2" filter="url(#cyber-glow)" />
        {/* Doc List Icon */}
        <path d="M -9 -11 H 3 L 9 -5 V 11 H -9 Z" fill="none" stroke="#FF4D00" strokeWidth="1.5" />
        <path d="M -4 -3 H 4 M -4 1 H 4 M -4 5 H 1" stroke="#FF4D00" strokeWidth="1.2" />
        <text y="50" textAnchor="middle" fill="var(--text-primary, #F2F0EA)" fontSize="10.5" fontFamily="var(--font-mono)" fontWeight="700">RESULTS</text>
        <text y="64" textAnchor="middle" fill="var(--text-muted, #888888)" fontSize="8.5" fontFamily="var(--font-mono)">SERVICE ENUM</text>
      </g>

      {/* --- RIGHT OUTPUT BADGES --- */}
      {/* Open Ports */}
      <g transform="translate(890, 45)">
        <rect x="-50" y="-18" width="100" height="36" rx="3" fill="var(--bg-secondary, #0E0E0E)" stroke="#FF4D00" strokeWidth="1.2" />
        <circle cx="-34" cy="0" r="6" fill="none" stroke="#FF4D00" strokeWidth="1.4" />
        <path d="M -37 0 L -35 2 L -31 -2" fill="none" stroke="#FF4D00" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        <text x="-22" y="2" fill="var(--text-primary, #F2F0EA)" fontSize="9" fontFamily="var(--font-mono)" fontWeight="700">OPEN PORTS</text>
        <text x="-22" y="12" fill="var(--text-muted, #888888)" fontSize="7.5" fontFamily="var(--font-mono)">22, 80, 443</text>
      </g>

      {/* Services */}
      <g transform="translate(890, 120)">
        <rect x="-50" y="-18" width="100" height="36" rx="3" fill="var(--bg-secondary, #0E0E0E)" stroke="#FF4D00" strokeWidth="1.2" />
        <circle cx="-34" cy="0" r="5" fill="none" stroke="#FF4D00" strokeWidth="1.4" />
        <path d="M -34 -8 V -6 M -34 6 V 8 M -42 0 H -40 M -28 0 H -26" stroke="#FF4D00" strokeWidth="1.4" />
        <text x="-22" y="2" fill="var(--text-primary, #F2F0EA)" fontSize="9" fontFamily="var(--font-mono)" fontWeight="700">SERVICES</text>
        <text x="-22" y="12" fill="var(--text-muted, #888888)" fontSize="7.5" fontFamily="var(--font-mono)">SSH, HTTP, TLS</text>
      </g>

      {/* OS Fingerprint */}
      <g transform="translate(890, 195)">
        <rect x="-50" y="-18" width="100" height="36" rx="3" fill="var(--bg-secondary, #0E0E0E)" stroke="#FF4D00" strokeWidth="1.2" />
        <path d="M -39 -7 L -34 -9 L -29 -7 L -29 -1 C -29 4, -34 7, -34 7 C -34 7, -39 4, -39 -1 Z" fill="none" stroke="#FF4D00" strokeWidth="1.3" />
        <text x="-22" y="2" fill="var(--text-primary, #F2F0EA)" fontSize="9" fontFamily="var(--font-mono)" fontWeight="700">OS DETECT</text>
        <text x="-22" y="12" fill="var(--text-muted, #888888)" fontSize="7.5" fontFamily="var(--font-mono)">LINUX / WIN</text>
      </g>
    </svg>
  );
};
