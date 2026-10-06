import React, { useState, useEffect } from 'react';
import acvLogo from '../../assets/acv_logo.png';
import './LoadingScreen.css';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('portfolio_theme') || 'editorial-dark';
    } catch (e) {
      return 'editorial-dark';
    }
  });

  // Sync theme attribute on mount and state change
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('portfolio_theme', theme);
    } catch (e) {}
  }, [theme]);

  // Lock body scroll during active loading screen & ensure scroll position starts at top
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, []);

  // Handle theme toggle click
  const handleToggleTheme = () => {
    const nextTheme = theme === 'editorial-dark' ? 'dossier-light' : 'editorial-dark';
    setTheme(nextTheme);
  };

  // High-precision 6.0-second Loading Sequence
  useEffect(() => {
    const totalDuration = 6000; // 6.0 seconds exact duration
    const startTime = performance.now();
    let animId;

    const tick = (now) => {
      const elapsed = Math.min(totalDuration, now - startTime);
      setElapsedTime(elapsed);

      // Smooth percentage 0% -> 100%
      const currentProgress = Math.min(100, Math.floor((elapsed / totalDuration) * 100));
      setProgress(currentProgress);

      if (elapsed < totalDuration) {
        animId = requestAnimationFrame(tick);
      } else {
        // Sequence finished 6.0s
        setProgress(100);
        setElapsedTime(6000);

        // Hold SYSTEM READY briefly (300ms) then transition into portfolio
        setTimeout(() => {
          setFadeOut(true);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 500); // 500ms smooth fade transition
        }, 300);
      }
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [onComplete]);

  // 1. Cybersecurity character reveal (0.0s - 0.8s = 0 - 800ms)
  const fullCyber = "CYBERSECURITY";
  let visibleCyberCount = fullCyber.length;
  if (elapsedTime < 800) {
    visibleCyberCount = Math.min(fullCyber.length, Math.floor((elapsedTime / 800) * fullCyber.length) + 1);
  }
  const cybersecurityText = fullCyber.slice(0, visibleCyberCount);

  // 2. ACV Logo Scan Line active state (0.5s - 1.8s = 500ms - 1800ms)
  const isLogoScanning = elapsedTime >= 500 && elapsedTime <= 1800;

  // 3. BUILD · LEARN · EXPLORE activation (1.0s - 3.5s)
  let activeBuildWord = null;
  if (elapsedTime >= 1000 && elapsedTime < 1833) {
    activeBuildWord = 'BUILD';
  } else if (elapsedTime >= 1833 && elapsedTime < 2666) {
    activeBuildWord = 'LEARN';
  } else if (elapsedTime >= 2666 && elapsedTime < 3500) {
    activeBuildWord = 'EXPLORE';
  }

  // 4. IDEAS > SKILLS > PROJECTS > BEYOND activation (2.0s - 5.5s)
  let activeTaglineWord = null;
  if (elapsedTime >= 2000 && elapsedTime < 2875) {
    activeTaglineWord = 'IDEAS';
  } else if (elapsedTime >= 2875 && elapsedTime < 3750) {
    activeTaglineWord = 'SKILLS';
  } else if (elapsedTime >= 3750 && elapsedTime < 4625) {
    activeTaglineWord = 'PROJECTS';
  } else if (elapsedTime >= 4625 && elapsedTime < 5500) {
    activeTaglineWord = 'BEYOND';
  }

  // 5. Final status state (5.7s - 6.0s)
  const isSystemReady = elapsedTime >= 5700;

  // HUD circumference for radius 108
  const hudCircumference = 2 * Math.PI * 108;
  const strokeDashoffset = hudCircumference * (1 - progress / 100);

  return (
    <div 
      className={`cyber-loading-screen ${fadeOut ? 'is-fading-out' : ''}`}
      role="dialog"
      aria-label="Portfolio Loading Screen"
      data-theme={theme}
    >
      {/* Top-Right Corner Theme Toggle Button */}
      <div className="loading-top-controls">
        <button 
          className="loading-theme-btn" 
          onClick={handleToggleTheme}
          aria-label="Toggle theme"
          title="Toggle Theme Mode"
        >
          <span className="theme-icon">◐</span>
          <span className="theme-label">
            {theme === 'dossier-light' ? 'LIGHT' : 'DARK'}
          </span>
        </button>
      </div>

      {/* Main Centered Composition */}
      <div className="loading-content-center">
        {/* Middle Row: Left Label + Center HUD & Logo + Right Label */}
        <div className="hud-middle-row">
          
          {/* Left Side Label: CYBERSECURITY with character reveal */}
          <div className="hud-side-label side-left">
            <span className="bracket-top-left">┌</span>
            <span className="side-text char-reveal-text">{cybersecurityText}</span>
            <span className="bracket-bot-right">┘</span>
          </div>

          {/* Central Technical HUD & ACV Logo */}
          <div className="hud-center-composition">
            {/* Vertical Alignment Axis Line */}
            <div className="hud-axis-vert"></div>
            <div className="hud-tick-top"></div>
            <div className="hud-tick-bot"></div>

            {/* Horizontal Alignment Axis Lines */}
            <div className="hud-axis-horiz-left"></div>
            <div className="hud-axis-horiz-right"></div>
            <div className="hud-square-marker-left"></div>
            <div className="hud-square-marker-right"></div>

            {/* Circular Progress HUD Segment (Non-spinning, synchronized stroke progress) */}
            <div className="hud-outer-ring">
              <svg viewBox="0 0 240 240" className="hud-ring-svg">
                {/* Background Track Circle */}
                <circle 
                  cx="120" cy="120" r="108" 
                  fill="none" 
                  stroke="rgba(255, 77, 0, 0.15)" 
                  strokeWidth="1.5" 
                />
                {/* Synchronized Circular Progress Segment */}
                <circle 
                  cx="120" cy="120" r="108" 
                  fill="none" 
                  stroke="#FF4D00" 
                  strokeWidth="2.5" 
                  strokeDasharray={hudCircumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round" 
                  transform="rotate(-90 120 120)"
                />
                {/* Axis Dots */}
                <circle cx="120" cy="12" r="2.5" fill="#FF4D00" />
                <circle cx="120" cy="228" r="2.5" fill="#FF4D00" />
              </svg>
            </div>

            {/* Inner Precision Dashed Circle */}
            <div className="hud-inner-ring"></div>

            {/* Central ACV Logo with subtle scanning line */}
            <div className="acv-logo-container">
              <img 
                src={acvLogo} 
                alt="ACV Logo" 
                className="acv-logo-img"
              />
              <div className={`acv-scan-line ${isLogoScanning ? 'is-active' : ''}`}></div>
            </div>
          </div>

          {/* Right Side Label: BUILD · LEARN · EXPLORE with sequential activation */}
          <div className="hud-side-label side-right">
            <span className="side-text">
              <span className={`hud-word ${activeBuildWord === 'BUILD' ? 'word-active' : ''}`}>BUILD</span>
              <span className="sep-dot"> · </span>
              <span className={`hud-word ${activeBuildWord === 'LEARN' ? 'word-active' : ''}`}>LEARN</span>
              <span className="sep-dot"> · </span>
              <span className={`hud-word ${activeBuildWord === 'EXPLORE' ? 'word-active' : ''}`}>EXPLORE</span>
            </span>
            <span className="bracket-top-right">┐</span>
            <span className="bracket-bot-right">┘</span>
          </div>
        </div>

        {/* Progress Section */}
        <div className="loading-progress-block">
          {/* Subtle SYSTEM READY status indicator (appears 5.7s - 6.0s) */}
          <div className={`system-status-text ${isSystemReady ? 'is-visible' : ''}`}>
            {isSystemReady ? '[ SYSTEM READY ]' : ''}
          </div>

          <div className="progress-bar-container">
            {/* Left Brackets */}
            <span className="bracket-corner bracket-tl">┌</span>
            <span className="bracket-corner bracket-bl">└</span>

            {/* Progress Track & Fill */}
            <div className="progress-track">
              <div 
                className="progress-fill" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            {/* Percentage Text */}
            <span className="progress-percent">
              {String(progress).padStart(2, '0')}%
            </span>

            {/* Right Brackets */}
            <span className="bracket-corner bracket-tr">┐</span>
            <span className="bracket-corner bracket-br">┘</span>
          </div>
        </div>

        {/* Bottom Tagline: IDEAS > SKILLS > PROJECTS > BEYOND with sequential activation */}
        <div className="loading-tagline-block">
          <span className="bracket-corner bracket-tl">┌</span>
          <span className="tagline-content">
            <span className={`tagline-word ${activeTaglineWord === 'IDEAS' ? 'word-active' : ''}`}>IDEAS</span>
            <span className="accent-gt"> &gt; </span>
            <span className={`tagline-word ${activeTaglineWord === 'SKILLS' ? 'word-active' : ''}`}>SKILLS</span>
            <span className="accent-gt"> &gt; </span>
            <span className={`tagline-word ${activeTaglineWord === 'PROJECTS' ? 'word-active' : ''}`}>PROJECTS</span>
            <span className="accent-gt"> &gt; </span>
            <span className={`tagline-word ${activeTaglineWord === 'BEYOND' ? 'word-active' : ''}`}>BEYOND</span>
          </span>
          <span className="bracket-corner bracket-br">┘</span>
        </div>
      </div>
    </div>
  );
}
