import React, { useRef, useState, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { revealWordSlideBlur } from '../utils/textAnimations';
import SplitText from '../components/Animated/SplitText';

const ALL_PROJECTS = [
  { id: 1, title: 'Quantum Finance', type: 'web', desc: 'Secure blockchain portal' },
  { id: 2, title: 'AeroSync', type: 'mobile', desc: 'Logistics tracking app' },
  { id: 3, title: 'Neon E-commerce', type: 'web', desc: 'High-conversion storefront' },
  { id: 4, title: 'Pulse AI', type: 'auto', desc: 'Automated CRM bot' },
];

export default function Projects() {
  const containerRef = useRef(null);
  const [filter, setFilter] = useState('all');
  const [visibleProjects, setVisibleProjects] = useState(ALL_PROJECTS);

  // Initial Entry
  useGSAP(() => {
    gsap.from('.project-header', { opacity: 0, y: -30, duration: 1, ease: 'power2.out' });
    
    gsap.fromTo('.project-card', 
      { scale: 0.8, opacity: 0, x: -50 },
      { scale: 1, opacity: 1, x: 0, duration: 0.8, stagger: 0.1, ease: 'back.out(1.5)', delay: 0.2 }
    );
  }, { scope: containerRef });

  // Filter Action logic
  const handleFilter = (type) => {
    setFilter(type);
    
    // Animate out
    gsap.to('.project-card', {
      scale: 0.5, opacity: 0, duration: 0.4, ease: "power2.inOut", stagger: 0.05,
      onComplete: () => {
        const next = type === 'all' ? ALL_PROJECTS : ALL_PROJECTS.filter(p => p.type === type);
        setVisibleProjects(next);
        
        // Wait a tick for React to render new nodes, then animate in
        setTimeout(() => {
          gsap.fromTo('.project-card', 
            { scale: 0.5, opacity: 0, y: 50 },
            { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: "back.out(1.2)", stagger: 0.05 }
          );
        }, 50);
      }
    });
  };

  return (
    <div ref={containerRef} className="container section" style={{ paddingTop: '150px', minHeight: '100vh' }}>
      
      <h1 className="project-header" style={{ fontSize: '4.5rem', marginBottom: '20px', letterSpacing: '-1px' }}>
        OUR <span className="text-accent">PROJECTS</span>
      </h1>

      <div style={{ display: 'flex', gap: '15px', marginBottom: '60px' }}>
        {['all', 'web', 'mobile', 'auto'].map(type => (
          <button 
            key={type} 
            onClick={() => handleFilter(type)}
            style={{
              padding: '10px 20px', background: filter === type ? 'var(--accent-primary)' : 'transparent',
              color: filter === type ? '#000' : 'var(--text-primary)',
              border: `1px solid ${filter === type ? 'transparent' : 'var(--accent-muted)'}`,
              borderRadius: '30px', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px',
              transition: 'var(--transition)'
            }}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="projects-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' }}>
        {visibleProjects.map((project) => (
          <div 
            key={project.id} 
            className="project-card glass-panel hover-trigger" 
            data-cursor-text="VIEW"
            style={{
              aspectRatio: '1', padding: '30px', position: 'relative', overflow: 'hidden',
              display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
              border: '1px solid var(--glass-border)'
            }}
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, { scale: 1.05, zIndex: 10, boxShadow: '0 20px 40px rgba(0,0,0,0.5)', duration: 0.5, ease: 'expo.out' });
              gsap.to(e.currentTarget.querySelector('.card-overlay'), { height: '100%', duration: 0.5, ease: 'expo.out' });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, { scale: 1, zIndex: 1, boxShadow: 'none', duration: 0.5, ease: 'expo.out' });
              gsap.to(e.currentTarget.querySelector('.card-overlay'), { height: '0%', duration: 0.5, ease: 'expo.out' });
            }}
          >
            <div className="card-overlay" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '0%', background: 'var(--glass-bg)', zIndex: 0 }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', marginBottom: '10px', textTransform: 'uppercase' }}>{project.type}</div>
              <h3 style={{ fontSize: '2rem', marginBottom: '10px' }}>{project.title}</h3>
              <p style={{ color: 'var(--text-secondary)' }}>{project.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
