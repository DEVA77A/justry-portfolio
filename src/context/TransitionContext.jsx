import React, { createContext, useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

const TransitionContext = createContext();

export function TransitionProvider({ children }) {
  const navigate = useNavigate();
  const transitionLayerRef = useRef(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const transitionTo = (path) => {
    if (isTransitioning || location.pathname === path) return;
    setIsTransitioning(true);

    const layer = transitionLayerRef.current;
    const mainContent = document.querySelector('main');
    
    // Default fallback duration
    let duration = 0.8;

    // V4 ZERO-REPETITION Transitions: Isolated routing engines
    if (path === '/projects') {
      // 1. Projects: Slide + Deep X/Y Scale
      gsap.to(mainContent, { scale: 0.8, x: -200, opacity: 0, duration: 0.6, ease: "power3.in" });
      gsap.set(layer, { yPercent: 0, xPercent: 100, borderLeftRadius: '50vw' });
      gsap.timeline({
        onComplete: () => {
          navigate(path);
          gsap.set(mainContent, { scale: 1.2, x: 200, opacity: 0 });
          gsap.to(mainContent, { scale: 1, x: 0, opacity: 1, duration: 1, ease: "power4.out" });
          gsap.to(layer, { xPercent: -100, borderRightRadius: '50vw', borderLeftRadius: '0vw', duration: 0.8, ease: "power3.inOut", onComplete: () => setIsTransitioning(false) });
        }
      }).to(layer, { xPercent: 0, borderLeftRadius: '0vw', duration: 0.6, ease: "power3.inOut" });

    } else if (path === '/reviews') {
      // 2. Reviews: Aggressive Gaussian Blur Fade (Dream-like)
      gsap.to(mainContent, { filter: 'blur(30px)', opacity: 0, scale: 1.1, duration: 0.8, ease: "power2.inOut" });
      gsap.set(layer, { opacity: 0, yPercent: 0, xPercent: 0, display: 'block', backgroundColor: 'var(--bg-primary)' });
      gsap.timeline({
        onComplete: () => {
          navigate(path);
          gsap.set(mainContent, { filter: 'blur(20px)', opacity: 0, scale: 0.95 });
          gsap.to(mainContent, { filter: 'blur(0px)', opacity: 1, scale: 1, duration: 1.5, ease: "sine.out" });
          gsap.to(layer, { opacity: 0, duration: 1, ease: "power2.inOut", onComplete: () => { gsap.set(layer, {display: 'none'}); setIsTransitioning(false); }});
        }
      }).to(layer, { opacity: 1, duration: 0.6, ease: "sine.inOut" });

    } else if (path === '/contact') {
      // 3. Contact: Geometric Diagonal Wipe
      gsap.to(mainContent, { rotation: 5, scale: 0.9, opacity: 0, duration: 0.6, ease: "circ.in" });
      gsap.set(layer, { yPercent: 0, xPercent: 0, clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)', backgroundColor: 'var(--accent-primary)', display: 'block', opacity: 1 });
      gsap.timeline({
        onComplete: () => {
          navigate(path);
          gsap.set(mainContent, { rotation: -5, scale: 1.1, opacity: 0 });
          gsap.to(mainContent, { rotation: 0, scale: 1, opacity: 1, duration: 1, ease: "circ.out" });
          gsap.to(layer, { clipPath: 'polygon(0% 0, 0% 0, 0% 100%, 0% 100%)', duration: 0.8, ease: "expo.inOut", onComplete: () => { setIsTransitioning(false); }});
        }
      }).to(layer, { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', duration: 0.6, ease: "expo.inOut" });

    } else {
      // 4. Default / Home: Extreme Perspective Zoom (Z-Axis tunnel)
      gsap.to(mainContent, { scale: 0, opacity: 0, duration: 0.7, ease: "expo.in" });
      gsap.set(layer, { yPercent: 100, xPercent: 0, clipPath: 'none', borderTopRightRadius: '50vw', borderTopLeftRadius: '50vw', display: 'block', opacity: 1, backgroundColor: 'var(--bg-secondary)' });
      gsap.timeline({
        onComplete: () => {
          navigate(path);
          gsap.set(mainContent, { scale: 3, opacity: 0 });
          gsap.to(mainContent, { scale: 1, opacity: 1, duration: 1.2, ease: "expo.out" });
          gsap.to(layer, { yPercent: -100, borderBottomRightRadius: '50vw', borderBottomLeftRadius: '50vw', borderTopRightRadius: '0vw', borderTopLeftRadius: '0vw', duration: 0.8, ease: "power4.inOut", onComplete: () => setIsTransitioning(false) });
        }
      }).to(layer, { yPercent: 0, borderTopRightRadius: '0vw', borderTopLeftRadius: '0vw', duration: 0.6, ease: "power4.inOut" });
    }
  };

  return (
    <TransitionContext.Provider value={{ transitionTo }}>
      {children}
      {/* Dynamic Layer utilized purely via GSAP inline styles internally */}
      <div 
        ref={transitionLayerRef}
        style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          zIndex: 99999, pointerEvents: isTransitioning ? 'auto' : 'none',
          display: 'none'
        }}
      />
    </TransitionContext.Provider>
  );
}

export const useTransition = () => useContext(TransitionContext);
