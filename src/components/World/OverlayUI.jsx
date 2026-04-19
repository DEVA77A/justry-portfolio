import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import About from '../../pages/About';
import Projects from '../../pages/Projects';
import Services from '../../pages/Reviews';
import Contact from '../../pages/Contact';

export default function OverlayUI({ activeLocation, setActiveLocation }) {
  const containerRef = useRef(null);
  
  useEffect(() => {
    if (activeLocation === 'orbit' || activeLocation === 'intro') {
      gsap.to(containerRef.current, { opacity: 0, scale: 0.9, duration: 0.5, pointerEvents: 'none' });
    } else {
      gsap.to(containerRef.current, { opacity: 1, scale: 1, duration: 1, delay: 1, ease: 'expo.out', pointerEvents: 'auto' });
    }
  }, [activeLocation]);

  return (
    <>
      {/* Return to World Button */}
      {activeLocation !== 'orbit' && activeLocation !== 'intro' && (
        <button 
          onClick={() => setActiveLocation('orbit')}
          style={{
            position: 'absolute', top: '40px', right: '5%', zIndex: 9999,
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
