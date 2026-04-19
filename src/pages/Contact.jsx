import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Mail, Phone } from 'lucide-react';
import { revealTypewriter, revealCharStaggerElastic } from '../utils/textAnimations';
import SplitText from '../components/Animated/SplitText';
import MagneticButton from '../components/Animated/MagneticButton';

const LinkedinIcon = ({ color }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const InstagramIcon = ({ color }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export default function Contact() {
  const containerRef = useRef(null);
  const [formState, setFormState] = useState('idle');

  useGSAP(() => {
    // Zero Repetition: Header Elastic + Subtitle Typewriter
    revealCharStaggerElastic('.contact-header', 0.2);
    revealTypewriter('.contact-sub', 1.0);

    // Form Stagger
    gsap.fromTo('.input-group', 
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 0.8, stagger: 0.1, ease: 'circ.out', delay: 1.2 }
    );
  }, { scope: containerRef });

  const handleFocus = (e) => {
    const line = e.target.nextElementSibling;
    gsap.to(line, { scaleX: 1, duration: 0.4, ease: "power2.out", transformOrigin: "left" });
  };

  const handleBlur = (e) => {
    const line = e.target.nextElementSibling;
    gsap.to(line, { scaleX: 0, duration: 0.4, ease: "power2.in", transformOrigin: "right" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState('loading');
    setTimeout(() => {
      setFormState('success');
    }, 2000);
  };

  return (
    <div ref={containerRef} className="container section" style={{ paddingTop: '150px', minHeight: '100vh' }}>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px', alignItems: 'center' }}>
        
        {/* LEFT SIDE DATA */}
        <div>
          <h1 className="contact-header" style={{ fontSize: '4.5rem', marginBottom: '20px' }}>
            <SplitText text="CONTACT" /> <br/>
            <span className="text-accent"><SplitText text="US" /></span>
          </h1>
          <p className="contact-sub" style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '50px', maxWidth: '450px', lineHeight: 1.6 }}>
            <SplitText text="Ready to upgrade your infrastructure? Drop your project parameters below." />
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div className="glass" style={{ padding: '16px', borderRadius: '4px', border: '1px solid var(--glass-border)' }}>
                <Mail color="var(--accent-primary)" />
              </div>
              <span style={{ color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '2px' }}>Mail</span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div className="glass" style={{ padding: '16px', borderRadius: '4px', border: '1px solid var(--glass-border)' }}>
                <Phone color="var(--accent-primary)" />
              </div>
              <span style={{ color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '2px' }}>Mobile No</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div className="glass" style={{ padding: '16px', borderRadius: '4px', border: '1px solid var(--glass-border)' }}>
                <LinkedinIcon color="var(--accent-primary)" />
              </div>
              <span style={{ color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '2px' }}>LinkedIn</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div className="glass" style={{ padding: '16px', borderRadius: '4px', border: '1px solid var(--glass-border)' }}>
                <InstagramIcon color="var(--accent-primary)" />
              </div>
              <span style={{ color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '2px' }}>Instagram</span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE FORM - Interaction Focus UI */}
        <div className="glass-panel" style={{ padding: '60px 50px', borderRadius: '4px' }}>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '40px' }} onSubmit={handleSubmit}>
            
            {['Identifier (Name)', 'Comms Link (Email)'].map((label, i) => (
              <div className="input-group" key={i} style={{ position: 'relative' }}>
                <label style={{ display: 'block', marginBottom: '10px', color: 'var(--text-primary)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  {label}
                </label>
                <input 
                  type={label.includes('Email') ? 'email' : 'text'} 
                  required 
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  style={inputStyle} 
                />
                <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '2px', background: 'var(--accent-primary)', transform: 'scaleX(0)', transformOrigin: 'left' }} />
              </div>
            ))}

            <div className="input-group" style={{ position: 'relative' }}>
              <label style={{ display: 'block', marginBottom: '10px', color: 'var(--text-primary)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Project Scope
              </label>
              <textarea 
                required 
                rows={4} 
                onFocus={handleFocus}
                onBlur={handleBlur}
                style={{...inputStyle, resize: 'vertical'}} 
              />
              <div style={{ position: 'absolute', bottom: '5px', left: 0, width: '100%', height: '2px', background: 'var(--accent-primary)', transform: 'scaleX(0)', transformOrigin: 'left' }} />
            </div>

            <MagneticButton type="submit" disabled={formState !== 'idle'} className="btn-primary" data-cursor-text="SND" style={{
              width: '100%', justifyContent: 'center',
              background: formState === 'idle' ? 'var(--bg-secondary)' : 'var(--accent-primary)',
              color: formState === 'idle' ? 'var(--accent-light)' : '#000'
            }}>
              {formState === 'idle' ? 'Transmit Data' : formState === 'loading' ? 'Transmitting...' : 'Upload Complete'}
            </MagneticButton>
          </form>
        </div>

      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid var(--glass-border)',
  padding: '10px 0',
  color: 'var(--text-primary)',
  fontSize: '1.2rem',
  fontFamily: 'inherit',
  outline: 'none',
};
