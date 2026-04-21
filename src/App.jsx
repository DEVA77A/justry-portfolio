import React, { useState } from 'react';
import CanvasWorld from './components/World/CanvasWorld';
import OverlayUI from './components/World/OverlayUI';
import CinematicIntro from './components/CinematicIntro';
import CustomCursor from './components/CustomCursor';
import SparkleTrail from './components/Effects/SparkleTrail';

function App() {
  const [activeLocation, setActiveLocation] = useState('intro'); // intro, orbit, about, projects, reviews, contact
  const [introFinished, setIntroFinished] = useState(false);
  const [collectedOrbs, setCollectedOrbs] = useState([]);

  const handleIntroComplete = () => {
    setIntroFinished(true);
    setActiveLocation('orbit'); // Entering the world
  };

  const handleOrbCollect = (char) => {
    setCollectedOrbs(prev => {
      if (prev.includes(char)) return prev;
      return [...prev, char];
    });
  };

  return (
    <>
      {/* Universal styling helpers */}
      <CustomCursor />
      <SparkleTrail />
      <div className="noise-overlay" />

      {/* Intro sequence covering the screen until complete */}
      {!introFinished && <CinematicIntro onComplete={handleIntroComplete} />}

      {/* Global 3D World */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0, background: 'var(--bg-primary)' }}>
        <CanvasWorld 
          activeLocation={activeLocation} 
          setActiveLocation={setActiveLocation} 
          onOrbCollect={handleOrbCollect}
        />
      </div>

      {/* 2D Overlay Interface mapped to regions */}
      {introFinished && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 10, pointerEvents: 'none' }}>
          <OverlayUI 
            activeLocation={activeLocation} 
            setActiveLocation={setActiveLocation} 
            collectedOrbs={collectedOrbs}
          />
        </div>
      )}
    </>
  );
}


export default App;
