import { useLocation } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';
import { useTransition } from '../context/TransitionContext';
import logoUrl from '../assets/logo.jpg';
import MagneticButton from '../components/Animated/MagneticButton';

export default function Navigation() {
  const navRef = useRef(null);
  const { transitionTo } = useTransition();
  const location = useLocation();

  useGSAP(() => {
    gsap.from(navRef.current, {
      y: -100,
      opacity: 0,
      duration: 1.2,
      ease: 'power4.out',
      delay: 2 // Post loader
    });
  });

  const LinkBtn = ({ to, children }) => {
    const isActive = location.pathname === to;
    return (
      <button 
        onClick={() => { if(!isActive) transitionTo(to); }}
        style={{
          color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
          textDecoration: 'none',
          fontWeight: '500',
          transition: 'color 0.3s ease',
          fontSize: '0.85rem',
          textTransform: 'uppercase',
          letterSpacing: '2px'
        }}
        onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-primary)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.color = isActive ? 'var(--accent-primary)' : 'var(--text-secondary)'; }}
      >
        {children}
      </button>
    );
  };

  return (
    <nav ref={navRef} className="glass" style={{
      position: 'fixed',
      top: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '90%',
      maxWidth: '1200px',
      padding: '1rem 2rem',
      borderRadius: '4px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      zIndex: 1000,
      borderBottom: '1px solid rgba(255,255,255,0.05)'
    }}>
      <button onClick={() => { if(location.pathname !== '/') transitionTo('/'); }} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-primary)' }}>
        <img src={logoUrl} alt="Justry Logo" style={{ width: '32px', height: 'auto', objectFit: 'contain' }} />
        <span style={{ fontFamily: 'Outfit', fontWeight: '800', fontSize: '1.2rem', letterSpacing: '1px' }}>JUSTRY</span>
      </button>

      <div style={{ display: 'flex', gap: '40px' }}>
        <LinkBtn to="/">Home</LinkBtn>
        <LinkBtn to="/about">About Us</LinkBtn>
        <LinkBtn to="/projects">Projects</LinkBtn>
        <LinkBtn to="/reviews">Reviews</LinkBtn>
      </div>

      <MagneticButton onClick={() => { if(location.pathname !== '/contact') transitionTo('/contact'); }} className="btn-primary"
      >
        Let's Create
      </MagneticButton>
    </nav>
  );
}
