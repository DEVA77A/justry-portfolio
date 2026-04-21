import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import About from '../../pages/About';
import Projects from '../../pages/Projects';
import Services from '../../pages/Reviews';
import Contact from '../../pages/Contact';

export default function OverlayUI({ activeLocation, setActiveLocation, collectedOrbs = [] }) {
  const containerRef = useRef(null);
  const [showCompletion, setShowCompletion] = React.useState(false);
  const questComplete = collectedOrbs.length === 6;

  // Handle the temporary visibility of the completion message
  useEffect(() => {
    if (questComplete) {
      setShowCompletion(true);
      const timer = setTimeout(() => setShowCompletion(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [questComplete]);
  
  useEffect(() => {
    if (activeLocation === 'orbit' || activeLocation === 'intro') {
      gsap.to(containerRef.current, { opacity: 0, scale: 0.9, duration: 0.5, pointerEvents: 'none' });
    } else {
      gsap.to(containerRef.current, { opacity: 1, scale: 1, duration: 1, delay: 1, ease: 'expo.out', pointerEvents: 'auto' });
    }
  }, [activeLocation]);

  return (
    <>
      {/* QUEST HUD (Top Right) */}
      <div style={{
        position: 'absolute', top: '40px', right: '5%', zIndex: 10000,
        display: 'flex', flexDirection: 'column', alignItems: 'flex-end',
        pointerEvents: 'none'
      }}>
        {/* Progress Tracker */}
        {!questComplete && collectedOrbs.length > 0 && (
          <div style={{
            background: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(10px)',
            border: '1px solid #C9A227', padding: '12px 20px', borderRadius: '10px',
            color: '#C9A227', fontSize: '0.75rem', letterSpacing: '2px', 
            textTransform: 'uppercase', boxShadow: '0 0 20px rgba(201, 162, 39, 0.2)'
          }}>
            ORBS COLLECTED: <span style={{ fontWeight: 'bold' }}>{collectedOrbs.length} / 6</span>
          </div>
        )}

        {/* Completion Message */}
        {showCompletion && (
          <div style={{
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(10px)', border: '1px solid #C9A227',
            padding: '8px 12px', borderRadius: '8px', textAlign: 'right',
            boxShadow: '0 0 30px rgba(201, 162, 39, 0.3)',
            animation: 'glowPulse 2s infinite alternate'
          }}>
            <h2 style={{ 
              margin: 0, color: '#FFD700', fontSize: '0.65rem', letterSpacing: '2px',
              fontWeight: 900, textShadow: '0 0 5px rgba(255, 215, 0, 0.8)'
            }}>
              QUEST COMPLETED
            </h2>
            <p style={{ 
              margin: '2px 0 0 0', color: '#C9A227', fontSize: '0.5rem', 
              fontWeight: 900, letterSpacing: '1px', textTransform: 'uppercase', opacity: 0.9
            }}>
              YOU SUCCESSFULLY COLLECTED THE JUSTRY ORBS
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes glowPulse {
          from { box-shadow: 0 0 20px rgba(201, 162, 39, 0.2); }
          to { box-shadow: 0 0 40px rgba(201, 162, 39, 0.6); }
        }
      `}</style>

      {/* Return to World Button */}
      {activeLocation !== 'orbit' && activeLocation !== 'intro' && (
        <button 
          onClick={() => setActiveLocation('orbit')}
          style={{
            position: 'absolute', top: '120px', right: '5%', zIndex: 9999, // Moved down to avoid HUD
            background: 'rgba(10, 10, 10, 0.8)', border: '1px solid var(--accent-primary)',
            color: 'var(--accent-primary)', padding: '10px 20px', borderRadius: '30px',
            textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem',
            cursor: 'pointer', pointerEvents: 'auto', backdropFilter: 'blur(10px)'
          }}
          className="hover-trigger" data-cursor-text="EXIT"
        >
          [ Return to Orbit ]
        </button>
      )}

      {/* Dynamic Content Panel */}
      <div 
        ref={containerRef}
        style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 100%)',
          overflowY: 'auto', opacity: 0, pointerEvents: 'none',
          paddingBottom: '100px'
        }}
      >
        <div style={{ maxWidth: '80%', padding: '5%' }}>
          {activeLocation === 'about' && <About />}
          {activeLocation === 'projects' && <Projects />}
          {activeLocation === 'reviews' && <Services />}
          {activeLocation === 'contact' && <Contact />}
        </div>
      </div>
      
      {/* World HUD when in orbit */}
      <div 
        onClick={() => { if(activeLocation === 'orbit') setActiveLocation('contact'); }}
        style={{
          position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)',
          color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '4px', fontSize: '0.8rem',
          opacity: activeLocation === 'orbit' ? 1 : 0, transition: 'opacity 0.5s', 
          pointerEvents: activeLocation === 'orbit' ? 'auto' : 'none',
          cursor: 'pointer', zIndex: 9999
        }}
        className="hover-trigger" data-cursor-text="CONTACT"
      >
        INTERACT WITH COORDINATES TO CONNECT WITH US
      </div>
    </>
  );
}
