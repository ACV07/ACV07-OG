import React, { useState, useEffect, useRef } from 'react';
import { navigationItems } from '../../data/navigation';
import RightNavRail from './RightNavRail';
import acvLogo from '../../assets/acv_logo.png';
import './Navigation.css';

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('profile');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isRailVisible, setIsRailVisible] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('portfolio_theme') || 'editorial-dark';
    } catch (e) {
      return 'editorial-dark';
    }
  });

  const isNavigatingRef = useRef(false);
  const targetNavIdRef = useRef(null);
  const navLockTimerRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const getSectionTargetTop = (id) => {
    const element = document.getElementById(id);
    if (!element) return 0;

    const stackContainer = document.querySelector('.stack-container');
    if (stackContainer && stackContainer.contains(element)) {
      const stackTop = stackContainer.getBoundingClientRect().top + window.scrollY;
      const children = Array.from(stackContainer.children);

      const index = children.findIndex(child => child === element || child.contains(element));

      if (index !== -1) {
        let offsetSum = 0;
        for (let i = 0; i < index; i++) {
          offsetSum += children[i].offsetHeight;
        }
        return stackTop + offsetSum;
      }
    }

    return element.getBoundingClientRect().top + window.scrollY;
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Show Right Navigation Rail ONLY when user enters Profile or below (01 Profile -> 08 Contact)
      const profileEl = document.getElementById('profile');
      if (profileEl) {
        const profileTop = getSectionTargetTop('profile') - window.innerHeight * 0.4;
        setIsRailVisible(window.scrollY >= profileTop);
      } else {
        setIsRailVisible(window.scrollY > 300);
      }

      // If programmatic navigation is active, suppress intermediate scroll-spy section changes
      if (isNavigatingRef.current && targetNavIdRef.current) {
        const targetId = targetNavIdRef.current;
        setActiveSection(targetId);

        const targetTop = getSectionTargetTop(targetId);
        const dist = Math.abs(window.scrollY - targetTop);

        if (dist < 10) {
          isNavigatingRef.current = false;
          targetNavIdRef.current = null;
          if (navLockTimerRef.current) clearTimeout(navLockTimerRef.current);
        }
        return; // Lock activeSection to targetId until destination is reached
      }

      // Detect current active section based on current scroll position
      const scrollPos = window.scrollY + window.innerHeight * 0.35;

      for (let i = navigationItems.length - 1; i >= 0; i--) {
        const item = navigationItems[i];
        const top = getSectionTargetTop(item.id);
        if (scrollPos >= top - 30) {
          setActiveSection(item.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (navLockTimerRef.current) clearTimeout(navLockTimerRef.current);
    };
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'editorial-dark' ? 'dossier-light' : 'editorial-dark';
    setTheme(newTheme);
    try {
      localStorage.setItem('portfolio_theme', newTheme);
    } catch (e) {}
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const scrollTo = (id) => {
    setMobileMenuOpen(false);

    // Immediately commit target section state and lock it during smooth scroll
    setActiveSection(id);
    isNavigatingRef.current = true;
    targetNavIdRef.current = id;

    if (navLockTimerRef.current) {
      clearTimeout(navLockTimerRef.current);
    }

    navLockTimerRef.current = setTimeout(() => {
      isNavigatingRef.current = false;
      targetNavIdRef.current = null;
    }, 1200);

    const targetTop = getSectionTargetTop(id);
    window.scrollTo({
      top: Math.max(0, targetTop),
      behavior: 'smooth'
    });
  };

  return (
    <>
      <header className={`editorial-nav ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="nav-container">
          {/* Brand / Identifier */}
          <div className="nav-brand" onClick={() => scrollTo('profile')}>
            <img src={acvLogo} alt="ACV Logo" className="nav-acv-logo" />
          </div>

          {/* Status / Controls */}
          <div className="nav-actions">
            {/* Live Technical Digital Clock */}
            <div className="nav-digital-clock" title="System Local Time">
              <span className="clock-pulse"></span>
              <span className="clock-time">{currentTime}</span>
              <span className="clock-label">SYS</span>
            </div>

            <button 
              className="theme-toggle-btn" 
              onClick={toggleTheme}
              title="Toggle Dossier Theme"
              aria-label="Toggle Dossier Theme"
            >
              <span className="theme-indicator"></span>
              <span className="theme-text">
                {theme === 'editorial-dark' ? 'MODE: DARK' : 'MODE: LIGHT'}
              </span>
            </button>

            <button 
              className={`burger-btn ${mobileMenuOpen ? 'is-open' : ''}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              <span className="burger-line"></span>
              <span className="burger-line"></span>
            </button>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'is-open' : ''}`}>
          <div className="mobile-menu-inner">
            <div className="mobile-meta">
              <span>INDEX / NAV [ 01 — 08 ]</span>
              <span>CYBERSECURITY DOSSIER</span>
            </div>
            <div className="mobile-links">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`mobile-link ${activeSection === item.id ? 'is-active' : ''}`}
                >
                  <span className="mobile-num">{item.number}</span>
                  <span className="mobile-txt">{item.title}</span>
                </button>
              ))}
            </div>
            <div className="mobile-footer">
              <span className="mono-label">LAT: 12.9716° N, 77.5946° E</span>
              <span className="mono-label">SYSTEM STATUS: ONLINE</span>
            </div>
          </div>
        </div>
      </header>

      {/* Fixed Right-Side Icon Navigation Rail (Visible ONLY on Profile -> Contact) */}
      <RightNavRail 
        activeSection={activeSection} 
        scrollTo={scrollTo} 
        isVisible={isRailVisible} 
      />
    </>
  );
}
