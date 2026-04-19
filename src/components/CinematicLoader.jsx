import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import logoUrl from '../assets/logo.jpg';

export default function CinematicLoader() {
  const loaderRef = useRef(null);
  const [complete, setComplete] = useState(false);

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => setComplete(true)
    });

    tl.to('.loader-logo-container', {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out'
    })
    .to('.loader-text', {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.1,
      ease: 'power3.out'
    })
    .to('.loader-text', {
      letterSpacing: '10px',
      color: 'var(--accent-primary)',
      duration: 1,
      ease: 'power2.inOut',
      delay: 0.2
    })
    .to(loaderRef.current, {
      yPercent: -100,
      duration: 1,
      ease: 'power4.inOut',
      delay: 0.1
    });

  }, { scope: loaderRef });

  if (complete) return null;

  return (
    <div ref={loaderRef} style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'var(--bg-primary)',
      zIndex: 999999, // ultra high
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    }}>
      <div className="loader-logo-container" style={{ marginBottom: '20px', transform: 'translateY(50px)', opacity: 0 }}>
        <img src={logoUrl} alt="Justry Logo" style={{ width: '120px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(201, 162, 39, 0.4))' }} />
      </div>
      <h1 style={{
        display: 'flex',
        fontFamily: 'Outfit',
        fontSize: '4rem',
        fontWeight: '900',
        textTransform: 'uppercase',
        overflow: 'hidden'
      }}>
        {'JUSTRY'.split('').map((char, i) => (
          <span key={i} className="loader-text" style={{ transform: 'translateY(100px)', opacity: 0, display: 'inline-block' }}>
            {char}
          </span>
        ))}
      </h1>
      <div style={{
        width: '200px',
        height: '2px',
        background: 'rgba(255,255,255,0.1)',
        marginTop: '20px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0, left: 0, height: '100%',
          background: 'var(--accent-primary)',
          width: '100%',
          transformOrigin: 'left',
          animation: 'loadProgress 2s cubic-bezier(0.4, 0, 0.2, 1) forwards'
        }} />
      </div>
      <style>{`
        @keyframes loadProgress {
          0% { transform: scaleX(0); }
          50% { transform: scaleX(0.7); }
          100% { transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
}
