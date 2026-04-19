import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import logoUrl from '../assets/logo.jpg';
import SplitText from './Animated/SplitText';

export default function CinematicIntro({ onComplete }) {
  const containerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: onComplete
    });

    // 1. Fade in Logo
    tl.to('.intro-logo', {
      opacity: 1, filter: 'drop-shadow(0 0 20px rgba(201, 162, 39, 0.4))', scale: 1, duration: 1.5, ease: 'power3.out'
    })
    // 2. Type text
    .to('.intro-text .split-char', {
      opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, stagger: 0.04, ease: 'power2.out'
    }, "-=0.5")
    // 3. Pause for tension
    .to({}, { duration: 1 })
    // 4. Aggressive Fly Through (Scale + Blur into the camera)
    .to('.intro-content', {
      scale: 5, opacity: 0, filter: 'blur(20px)', duration: 1.5, ease: "expo.in"
    })
    // 5. Fade Background Out completely
    .to(containerRef.current, {
      opacity: 0, duration: 0.8, ease: 'power2.inOut'
    }, "-=0.8");

  }, { scope: containerRef });

  return (
    <div ref={containerRef} style={{
      position: 'fixed', inset: 0, zIndex: 99999, background: '#000',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
    }}>
      <div className="intro-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img 
          src={logoUrl} 
          alt="Logo" 
          className="intro-logo" 
          style={{ 
            width: '240px', 
            height: '240px', 
            objectFit: 'cover',
            objectPosition: 'center',
            borderRadius: '50%',
            mixBlendMode: 'screen', // Drops all dark background pixels so the logo floats natively
            opacity: 0, 
            scale: 0.8, 
            marginBottom: '40px', 
            filter: 'drop-shadow(0 0 0px transparent)',
            border: '1px solid rgba(201, 162, 39, 0.15)' // Faint gold rim to define the circle cleanly
          }} 
        />
        <h1 className="intro-text" style={{ fontFamily: 'Outfit', color: 'var(--accent-primary)', fontSize: '2rem', letterSpacing: '8px', textTransform: 'uppercase' }}>
          <SplitText text="SYSTEM INITIALIZATION" />
        </h1>
      </div>
    </div>
  );
}
