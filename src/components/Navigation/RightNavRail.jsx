import React, { useState, useEffect, useRef } from 'react';
import { navigationItems } from '../../data/navigation';
import './RightNavRail.css';

const navIcons = {
  profile: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  experience: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
  skills: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  ),
  work: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
  ),
  learning: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  ),
  participation: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M9 21v-2a4 4 0 0 1 3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      <circle cx="9" cy="7" r="4" />
      <path d="M1 21v-2a4 4 0 0 1 4-4h2" />
    </svg>
  ),
  certification: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <line x1="12" y1="8" x2="12" y2="14" />
      <line x1="9" y1="11" x2="15" y2="11" />
    </svg>
  ),
  contact: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )
};

export default function RightNavRail({ activeSection, scrollTo, isVisible }) {
  const [hoveredId, setHoveredId] = useState(null);
  const [isStretching, setIsStretching] = useState(false);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth <= 900);
  const prevIndexRef = useRef(0);
  const stretchTimerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const targetId = hoveredId || activeSection || 'profile';
  const targetIndex = Math.max(0, navigationItems.findIndex(item => item.id === targetId));

  useEffect(() => {
    if (targetIndex !== prevIndexRef.current) {
      prevIndexRef.current = targetIndex;
      setIsStretching(true);
      if (stretchTimerRef.current) clearTimeout(stretchTimerRef.current);
      stretchTimerRef.current = setTimeout(() => {
        setIsStretching(false);
      }, 350);
    }
  }, [targetIndex]);

  return (
    <aside 
      className={`liquid-glass-rail-root ${isVisible ? 'is-visible' : ''}`}
      onMouseLeave={() => setHoveredId(null)}
      aria-label="Liquid Glass Section Navigation"
    >
      <div className="liquid-glass-rail-container">
        {/* Central Connecting Axis & Node Dots */}
        <div className="rail-connecting-axis">
          {navigationItems.map((item) => (
            <span 
              key={`dot-${item.id}`} 
              className={`axis-node-dot ${activeSection === item.id ? 'is-active-dot' : ''}`} 
            />
          ))}
        </div>

        {/* Single Sliding Liquid Glass Lens Highlight */}
        <div 
          className={`liquid-glass-lens ${isStretching ? 'is-morphing' : ''}`}
          style={{
            transform: isMobile
              ? `translate3d(calc(${targetIndex} * 100%), 0, 0) scaleX(${isStretching ? 1.14 : 1}) scaleY(${isStretching ? 0.92 : 1})`
              : `translate3d(0, calc(${targetIndex} * var(--rail-stride, 52px)), 0) scaleY(${isStretching ? 1.12 : 1}) scaleX(${isStretching ? 0.94 : 1})`
          }}
        />

        {/* 8 Navigation Items */}
        <div className="rail-items-stack">
          {navigationItems.map((item) => {
            const isActive = activeSection === item.id;
            const isHovered = hoveredId === item.id;
            return (
              <div 
                key={item.id} 
                className="rail-item-wrapper"
                onMouseEnter={() => setHoveredId(item.id)}
              >
                {/* Minimal Glass Tooltip (Visible on Hover) */}
                <div className={`glass-rail-tooltip ${isHovered ? 'is-tooltip-open' : ''}`}>
                  <span className="tooltip-num">{item.number}</span>
                  <span className="tooltip-title">{item.title}</span>
                </div>

                {/* Glass Icon Button */}
                <button
                  onClick={() => scrollTo(item.id)}
                  className={`rail-icon-btn ${isActive ? 'is-active' : ''} ${isHovered ? 'is-hovered' : ''}`}
                  aria-label={`Scroll to ${item.title}`}
                >
                  {navIcons[item.id]}
                  {isActive && <span className="active-orange-indicator" />}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
