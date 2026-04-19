import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { revealTypewriter } from '../utils/textAnimations';
import SplitText from '../components/Animated/SplitText';

const services = [
  { 
    id: 1, 
    title: "WEB DEVELOPMENT", 
    description: "High-performance, cinematic web experiences built with the latest technologies. We focus on storytelling through code.",
    features: ["React & Next.js", "Three.js 3D Worlds", "GSAP Animations"],
    floatDur: 2.1 
  },
  { 
    id: 2, 
    title: "MOBILE APP", 
    description: "Immersive mobile applications that feel like native experiences. Premium design coupled with elite performance.",
    features: ["React Native", "Cross-Platform", "Immersive UI"],
    floatDur: 2.8 
  },
  { 
    id: 3, 
    title: "AUTOMATION", 
    description: "Intelligent automation workflows to scale your business. We build the engines that drive your digital growth.",
    features: ["AI Integration", "Custom Workflows", "Scalable Systems"],
    floatDur: 2.4 
  },
];

export default function Services() {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Reveal header naturally
    gsap.from('.service-header', { opacity: 0, y: -30, duration: 1, ease: 'power2.out' });

    gsap.fromTo('.service-card',
      { opacity: 0, y: 100, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 2, stagger: 0.3, ease: 'expo.out', delay: 0.3 }
    );

    gsap.utils.toArray('.service-card').forEach((card, i) => {
      const data = services[i];
      gsap.to(card, {
        y: '+=15',
        duration: data.floatDur,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: i * 0.5 + 2.8
      });
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="container section" style={{ paddingTop: '100px', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      <div style={{ marginBottom: '80px' }}>
        <h1 className="service-header" style={{ fontSize: '3.5rem', textTransform: 'uppercase', letterSpacing: '4px' }}>
          OUR <span className="text-accent">SERVICES</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px', marginTop: '20px', letterSpacing: '1px' }}>
          We design and build elite digital solutions that push the boundaries of modern technology.
        </p>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', justifyContent: 'flex-start' }}>
        {services.map((service) => (
          <div key={service.id} className="service-card glass-panel" style={{
            padding: '40px',
            width: '100%',
            maxWidth: '1000px',
            borderRadius: '10px',
            borderLeft: '4px solid var(--accent-primary)',
            background: 'rgba(255,255,255,0.02)',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '2rem', color: '#FFF', letterSpacing: '2px' }}>{service.title}</h2>
              <span style={{ color: 'var(--accent-light)', fontSize: '0.8rem', letterSpacing: '2px' }}>0{service.id} // SOLUTION</span>
            </div>
            
            <p style={{ fontSize: '1.1rem', lineHeight: 1.6, color: 'var(--text-secondary)', maxWidth: '800px' }}>
              {service.description}
            </p>

            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              {service.features.map(f => (
                <span key={f} style={{ 
                  padding: '8px 20px', 
                  border: '1px solid rgba(201,162,39,0.2)', 
                  borderRadius: '30px', 
                  fontSize: '0.8rem', 
                  color: 'var(--accent-primary)',
                  letterSpacing: '1px'
                }}>
                  {f}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
