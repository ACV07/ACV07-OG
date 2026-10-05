import React, { useState, useEffect, useRef } from 'react';
import acvLogo from '../../assets/acv_logo.png';
import './LoadingScreen.css';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('portfolio_theme') || 'editorial-dark';
    } catch (e) {
      return 'editorial-dark';
    }
  });

  const animFrameRef = useRef(null);

  // Sync theme attribute on mount and state change
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('portfolio_theme', theme);
    } catch (e) {}
  }, [theme]);

  // Lock body scroll during active loading screen
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';

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

  // Precise 6-Second Loading Sequence
  useEffect(() => {
    const startTime = performance.now();
    const totalDuration = 5700; // Reach 100% at ~5.7s

    const updateProgress = (currentTime) => {
      const elapsed = currentTime - startTime;
      const calculatedProgress = Math.min(100, Math.floor((elapsed / totalDuration) * 100));
      
      setProgress(calculatedProgress);

      if (elapsed < totalDuration) {
        animFrameRef.current = requestAnimationFrame(updateProgress);
      } else {
        setProgress(100);
        // Hold 100% briefly, then trigger 6.0s transition to homepage
        setTimeout(() => {
          setFadeOut(true);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 500); // 500ms fade duration
        }, 200);
      }
    };

    animFrameRef.current = requestAnimationFrame(updateProgress);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [onComplete]);

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
          
          {/* Left Side Label */}
          <div className="hud-side-label side-left">
            <span className="bracket-top-left">┌</span>
            <span className="side-text">CYBERSECURITY</span>
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

            {/* Rotating Outer HUD Arc */}
            <div className="hud-outer-ring">
              <svg viewBox="0 0 240 240" className="hud-ring-svg">
                <circle cx="120" cy="120" r="108" fill="none" stroke="rgba(255, 77, 0, 0.2)" strokeWidth="1" />
                <circle 
                  cx="120" cy="120" r="108" 
                  fill="none" 
                  stroke="#FF4D00" 
                  strokeWidth="2.5" 
                  strokeDasharray="140 540"
                  strokeLinecap="round" 
                />
                <circle cx="120" cy="12" r="2.5" fill="#FF4D00" />
                <circle cx="120" cy="228" r="2.5" fill="#FF4D00" />
              </svg>
            </div>

            {/* Inner Precision Dashed Circle */}
            <div className="hud-inner-ring"></div>

            {/* Central ACV Logo */}
            <div className="acv-logo-container">
              <img 
                src={acvLogo} 
                alt="ACV Logo" 
                className="acv-logo-img"
              />
            </div>
          </div>

          {/* Right Side Label */}
          <div className="hud-side-label side-right">
            <span className="side-text">BUILD · LEARN · EXPLORE</span>
            <span className="bracket-top-right">┐</span>
            <span className="bracket-bot-right">┘</span>
          </div>
        </div>

        {/* Progress Section */}
        <div className="loading-progress-block">
          <div className="progress-title">LOADING PORTFOLIO</div>

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

        {/* Bottom Tagline */}
        <div className="loading-tagline-block">
          <span className="bracket-corner bracket-tl">┌</span>
          <span className="tagline-content">
            IDEAS <span className="accent-gt">&gt;</span> SKILLS <span className="accent-gt">&gt;</span> PROJECTS <span className="accent-gt">&gt;</span> BEYOND
          </span>
          <span className="bracket-corner bracket-br">┘</span>
        </div>
      </div>
    </div>
  );
}
