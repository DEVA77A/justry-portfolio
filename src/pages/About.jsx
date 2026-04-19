import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { revealLineByLine } from '../utils/textAnimations';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Reveal HOME title naturally
    gsap.from('.home-title', { opacity: 0, y: -20, duration: 1, ease: 'power2.out' });

    // 1. Initial Line Reveal for Header (Zero Repetition - Line By Line Method)
    revealLineByLine('.about-header', 0.2);

    // 2. Vertical Chapter Pinning Sequence
    const chapters = gsap.utils.toArray('.about-chapter');
    
    gsap.to(chapters, {
      yPercent: -100 * (chapters.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: ".about-scroll-container",
        pin: true,
        scrub: 1,
        snap: 1 / (chapters.length - 1),
        end: () => "+=" + document.querySelector(".about-scroll-container").offsetWidth * 2
      }
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} style={{ width: '100%', overflowX: 'hidden' }}>
      
      {/* HEADER SECTION */}
      <section style={{ height: '50vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 5%' }}>
        <h2 className="home-title" style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '4px', marginBottom: '20px' }}>
          [ <span className="text-accent">HOME</span> ]
        </h2>
        <h1 className="about-header" style={{ fontSize: 'clamp(4rem, 6vw, 6rem)', lineHeight: 1, textTransform: 'uppercase' }}>
          We don't follow <br/><span className="text-accent">benchmarks.</span> <br/>We set them.
        </h1>
      </section>

      {/* CHAPTER SCROLL STORYTELLING */}
      <div className="about-scroll-container" style={{ width: '100%', height: '100vh', display: 'flex', overflow: 'hidden', position: 'relative', borderTop: '1px solid var(--accent-muted)' }}>
        
        {/* Chapter 1 */}
        <div className="about-chapter glass-panel" style={{ minWidth: '100%', height: '100%', padding: '10%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2 style={{ fontSize: '3rem', color: 'var(--accent-primary)', marginBottom: '20px' }}>01. The Origin</h2>
          <p style={{ fontSize: '1.5rem', color: 'var(--text-secondary)', maxWidth: '800px', lineHeight: 1.6 }}>
            Justry Tech Solutions was founded on a singular premise: enterprise software doesn't have to be sterile. We merged elite engineering with cinematic design to build digital products that command attention.
          </p>
        </div>

        {/* Chapter 2 */}
        <div className="about-chapter glass-panel" style={{ minWidth: '100%', height: '100%', padding: '10%', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'var(--bg-secondary)' }}>
          <h2 style={{ fontSize: '3rem', color: 'var(--accent-primary)', marginBottom: '20px' }}>02. The Architecture</h2>
          <p style={{ fontSize: '1.5rem', color: 'var(--text-secondary)', maxWidth: '800px', lineHeight: 1.6 }}>
            Speed is a feature. We utilize raw metal methodologies, minimizing bloat and executing hyper-optimized DOM mutations. This ensures our web platforms load instantly and animate at a flawless 60fps.
          </p>
        </div>

        {/* Chapter 3 */}
        <div className="about-chapter glass-panel" style={{ minWidth: '100%', height: '100%', padding: '10%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2 style={{ fontSize: '3rem', color: 'var(--accent-primary)', marginBottom: '20px' }}>03. The Future</h2>
          <p style={{ fontSize: '1.5rem', color: 'var(--text-secondary)', maxWidth: '800px', lineHeight: 1.6 }}>
            We're not just building websites. We're engineering the foundation for next-generation interactive commerce. AI systems, deep WebGL integration, and invisible automation scripts. 
          </p>
        </div>

      </div>

    </div>
  );
}
