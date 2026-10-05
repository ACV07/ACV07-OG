import React, { useState } from 'react';
import LoadingScreen from '../components/LoadingScreen/LoadingScreen';
import Navigation from '../components/Navigation/Navigation';
import Hero from '../components/Hero/Hero';
import MarqueeTicker from '../components/MarqueeTicker/MarqueeTicker';
import Profile from '../components/Profile/Profile';
import StackSection from '../components/StackSection/StackSection';
import Experience from '../components/Experience/Experience';
import Skills from '../components/Skills/Skills';
import Work from '../components/Work/Work';
import Learning from '../components/Learning/Learning';
import Participation from '../components/Participation/Participation';
import Certification from '../components/Certification/Certification';
import Contact from '../components/Contact/Contact';
import Footer from '../components/Footer/Footer';
import CustomCursor from '../components/CustomCursor/CustomCursor';
import GridRuler from '../components/GridRuler/GridRuler';
import { navigationItems } from '../data/navigation';

export default function Home() {
  const [isLoading, setIsLoading] = useState(() => {
    // Initial visit / refresh triggers loading screen
    const hasLoaded = sessionStorage.getItem('has_loaded_portfolio');
    return !hasLoaded;
  });

  const handleLoadingComplete = () => {
    sessionStorage.setItem('has_loaded_portfolio', 'true');
    setIsLoading(false);
  };

  const getZIndex = (id) => {
    const item = navigationItems.find(nav => nav.id === id);
    return item ? item.zIndex : 10;
  };

  return (
    <div className="portfolio-app-root">
      {/* 6-Second ACV Initial Loading Screen */}
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

      <CustomCursor />
      <GridRuler />
      <Navigation />
      
      <main>
        {/* PAGE 01: NAME / INTRO — Cover */}
        <Hero />

        {/* HORIZONTAL MARQUEE TICKER STRIP (After Name, Before Profile) */}
        <MarqueeTicker />

        {/* PAGE 02: PROFILE — Standalone Dedicated Section */}
        <Profile />

        {/* STACKED SECTIONS (03 – 08) CONTAINER */}
        <div className="stack-container">
          {/* PAGE 03: EXPERIENCE — Stacked Page 1 */}
          <StackSection id="experience" zIndex={getZIndex('experience')}>
            <Experience />
          </StackSection>

          {/* PAGE 04: SKILLS — Stacked Page 2 */}
          <StackSection id="skills" zIndex={getZIndex('skills')}>
            <Skills />
          </StackSection>

          {/* PAGE 05: WORK — Stacked Page 3 */}
          <StackSection id="work" zIndex={getZIndex('work')}>
            <Work />
          </StackSection>

          {/* PAGE 06: LEARNING — Stacked Page 4 */}
          <StackSection id="learning" zIndex={getZIndex('learning')}>
            <Learning />
          </StackSection>

          {/* PAGE 07: PARTICIPATION — Stacked Page 5 */}
          <StackSection id="participation" zIndex={getZIndex('participation')}>
            <Participation />
          </StackSection>

          {/* PAGE 08: CERTIFICATION — Stacked Page 6 */}
          <StackSection id="certification" zIndex={getZIndex('certification')}>
            <Certification />
          </StackSection>
        </div>

        {/* PAGE 09: CONTACT — Standalone Final Page */}
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
