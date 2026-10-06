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
  
  // Mobile Dragging State
  const [isDragging, setIsDragging] = useState(false);
  const [dragX, setDragX] = useState(0);
  const [dragFloatIndex, setDragFloatIndex] = useState(0);

  // Desktop Hover Tracking State
  const [isDesktopHovering, setIsDesktopHovering] = useState(false);
  const [desktopHoverY, setDesktopHoverY] = useState(0);
  const [desktopHoverFloatIndex, setDesktopHoverFloatIndex] = useState(0);

  const containerRef = useRef(null);
  const prevIndexRef = useRef(0);
  const stretchTimerRef = useRef(null);
  
  const pointerDownPosRef = useRef({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const slotWidthRef = useRef(0);
  const startDragXRef = useRef(0);
  const pointerIdRef = useRef(null);

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

  // Handle Desktop Mouse Move
  const handleMouseMove = (e) => {
    if (isMobile || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const topPadding = 10;
    const lensHeight = 44;
    const stride = 52; // 44px height + 8px gap
    const maxOffset = stride * 7;

    const rawY = e.clientY - rect.top - topPadding - (lensHeight / 2);
    const clampedY = Math.max(0, Math.min(maxOffset, rawY));
    const floatIdx = clampedY / stride;
    const nearestIdx = Math.max(0, Math.min(7, Math.round(clampedY / stride)));

    setDesktopHoverY(clampedY);
    setDesktopHoverFloatIndex(floatIdx);
    setIsDesktopHovering(true);

    const targetItem = navigationItems[nearestIdx];
    if (targetItem && targetItem.id !== hoveredId) {
      setHoveredId(targetItem.id);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsDesktopHovering(false);
      setHoveredId(null);
    }
  };

  const handleDesktopContainerClick = (e) => {
    if (isMobile) return;
    
    const stride = 52;
    const nearestIdx = Math.max(0, Math.min(7, Math.round(desktopHoverY / stride)));
    const targetItem = navigationItems[nearestIdx];
    if (targetItem) {
      scrollTo(targetItem.id);
    }
  };

  // Handle Mobile Pointer Dragging
  const handlePointerDown = (e) => {
    if (!isMobile) return;
    
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const padding = 8;
      const slotW = (rect.width - (padding * 2)) / 8;
      slotWidthRef.current = slotW;

      pointerDownPosRef.current = { x: e.clientX, y: e.clientY };
      pointerIdRef.current = e.pointerId;

      const currentLensOffset = targetIndex * slotW;
      startDragXRef.current = currentLensOffset;
    }
  };

  const handlePointerMove = (e) => {
    if (!isMobile || pointerIdRef.current === null) return;

    const dx = e.clientX - pointerDownPosRef.current.x;
    const dy = e.clientY - pointerDownPosRef.current.y;

    if (!isDraggingRef.current) {
      if (Math.abs(dx) > 6 && Math.abs(dx) > Math.abs(dy)) {
        isDraggingRef.current = true;
        setIsDragging(true);
        try {
          e.currentTarget.setPointerCapture(e.pointerId);
        } catch (err) {}
      }
    }

    if (isDraggingRef.current && slotWidthRef.current > 0) {
      const maxOffset = slotWidthRef.current * 7;
      const rawX = startDragXRef.current + dx;
      const clampedX = Math.max(0, Math.min(maxOffset, rawX));
      
      setDragX(clampedX);
      setDragFloatIndex(clampedX / slotWidthRef.current);
    }
  };

  const handlePointerUp = (e) => {
    if (!isMobile) return;

    if (isDraggingRef.current) {
      const slotW = slotWidthRef.current;
      if (slotW > 0) {
        const finalIndex = Math.max(0, Math.min(7, Math.round(dragX / slotW)));
        const targetItem = navigationItems[finalIndex];
        if (targetItem) {
          scrollTo(targetItem.id);
        }
      }
      try {
        if (pointerIdRef.current !== null && e.currentTarget.hasPointerCapture(pointerIdRef.current)) {
          e.currentTarget.releasePointerCapture(pointerIdRef.current);
        }
      } catch (err) {}
    }

    pointerIdRef.current = null;
    isDraggingRef.current = false;
    setIsDragging(false);
  };

  const handlePointerCancel = (e) => {
    handlePointerUp(e);
  };

  // Determine Lens Style
  let lensStyle = {};
  if (isMobile) {
    if (isDragging) {
      lensStyle = {
        transform: `translate3d(${dragX}px, 0, 0) scaleX(1.06) scaleY(0.96)`,
        transition: 'none'
      };
    } else {
      lensStyle = {
        transform: `translate3d(calc(${targetIndex} * 100%), 0, 0) scaleX(${isStretching ? 1.14 : 1}) scaleY(${isStretching ? 0.92 : 1})`
      };
    }
  } else {
    if (isDesktopHovering) {
      lensStyle = {
        transform: `translate3d(0, ${desktopHoverY}px, 0) scaleY(1.04) scaleX(0.96)`,
        transition: 'transform 0.08s cubic-bezier(0.1, 1, 0.1, 1)'
      };
    } else {
      lensStyle = {
        transform: `translate3d(0, calc(${targetIndex} * var(--rail-stride, 52px)), 0) scaleY(${isStretching ? 1.12 : 1}) scaleX(${isStretching ? 0.94 : 1})`
      };
    }
  }

  return (
    <aside 
      className={`liquid-glass-rail-root ${isVisible ? 'is-visible' : ''}`}
      onMouseLeave={handleMouseLeave}
      aria-label="Liquid Glass Section Navigation"
    >
      <div 
        ref={containerRef}
        className={`liquid-glass-rail-container ${isDragging ? 'is-touch-dragging' : ''} ${isDesktopHovering ? 'is-desktop-hovering' : ''}`}
        onMouseMove={handleMouseMove}
        onClick={handleDesktopContainerClick}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
      >
        {/* Central Connecting Axis & Node Dots */}
        <div className="rail-connecting-axis">
          {navigationItems.map((item, idx) => {
            const isDotActive = isMobile 
              ? (isDragging ? Math.round(dragFloatIndex) === idx : activeSection === item.id)
              : (isDesktopHovering ? Math.round(desktopHoverFloatIndex) === idx : activeSection === item.id);
            return (
              <span 
                key={`dot-${item.id}`} 
                className={`axis-node-dot ${isDotActive ? 'is-active-dot' : ''}`} 
              />
            );
          })}
        </div>

        {/* Single Sliding Liquid Glass Lens Highlight */}
        <div 
          className={`liquid-glass-lens ${isStretching ? 'is-morphing' : ''} ${isDragging ? 'is-dragging' : ''} ${isDesktopHovering ? 'is-desktop-hover' : ''}`}
          style={lensStyle}
        />

        {/* 8 Navigation Items */}
        <div className="rail-items-stack">
          {navigationItems.map((item, idx) => {
            const isActive = activeSection === item.id;
            const isHovered = hoveredId === item.id;

            // Calculate Magnification scale
            let magnifyScale = 1;
            if (isMobile) {
              if (isDragging) {
                const dist = Math.abs(idx - dragFloatIndex);
                if (dist < 1.0) {
                  magnifyScale = 1 + 0.28 * (1 - dist);
                }
              } else if (isActive) {
                magnifyScale = 1.08;
              }
            } else {
              if (isDesktopHovering) {
                const dist = Math.abs(idx - desktopHoverFloatIndex);
                if (dist < 1.0) {
                  magnifyScale = 1 + 0.24 * (1 - dist);
                }
              } else if (isActive) {
                magnifyScale = 1.08;
              }
            }

            return (
              <div 
                key={item.id} 
                className="rail-item-wrapper"
              >
                {/* Minimal Glass Tooltip (Visible on Hover for desktop) */}
                <div className={`glass-rail-tooltip ${isHovered ? 'is-tooltip-open' : ''}`}>
                  <span className="tooltip-num">{item.number}</span>
                  <span className="tooltip-title">{item.title}</span>
                </div>

                {/* Glass Icon Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    scrollTo(item.id);
                  }}
                  className={`rail-icon-btn ${isActive ? 'is-active' : ''} ${isHovered ? 'is-hovered' : ''} ${magnifyScale > 1 ? 'is-magnified' : ''}`}
                  aria-label={`Scroll to ${item.title}`}
                  style={magnifyScale > 1 ? { transform: `scale(${magnifyScale})` } : undefined}
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
