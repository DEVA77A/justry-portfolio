import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Code, Smartphone, Cpu, Rocket } from 'lucide-react';
import SplitText from '../components/Animated/SplitText';
import { useTransition } from '../context/TransitionContext';
import MagneticButton from '../components/Animated/MagneticButton';
import MaskReveal from '../components/Animated/MaskReveal';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef(null);
  const { transitionTo } = useTransition();

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 1 }); // wait for loader

    // Hero Text Stagger (characters + blur)
    tl.to(".hero-headline .split-char", {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 1.2,
      stagger: 0.02,
      ease: "power4.out"
    })
    .fromTo(".hero-sub", 
      { opacity: 0, y: 30, filter: 'blur(10px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: "power2.out" },
      "-=0.6"
    )
    .fromTo(".hero-cta",
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.5)" },
      "-=0.6"
    );

    // ----- Scroll Storytelling: The Pinned Services Sequence -----
    const servicesScrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".services-section",
        start: "top top",
        end: "+=200%",
        scrub: 1,
        pin: true,
      }
    });

    // Animate scale of header over time
    servicesScrollTl.to(".services-header", {
      scale: 0.8, opacity: 0.2, filter: 'blur(5px)', duration: 1
    });

    // Stagger Cards popping in over the header
    gsap.utils.toArray('.service-card').forEach((card, i) => {
      servicesScrollTl.from(card, {
        y: '100vh',
        rotationX: 45,
        opacity: 0,
        scale: 0.8,
        duration: 2,
        ease: 'power3.inOut'
      }, i * 0.8);
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} style={{ width: '100%', overflowX: 'hidden' }}>
      
      {/* HERO SECTION */}
      <section style={{
        minHeight: '100vh',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'flex-start',
        padding: '0 5%', position: 'relative'
      }}>
        <h1 className="hero-headline" style={{ fontSize: 'clamp(4rem, 8vw, 7rem)', lineHeight: 1.05, marginBottom: '40px', letterSpacing: '-2px' }}>
          <SplitText text="WE DON'T JUST" filterBlur={true} />
          <br />
          <SplitText text="CREATE SOFTWARE." filterBlur={true} />
          <br />
          <SplitText text="WE ENGINEER" filterBlur={true} /> <span className="text-accent"><SplitText text="FUTURES." filterBlur={true} /></span>
        </h1>
        
        <p className="hero-sub" style={{ 
          fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '650px', marginBottom: '50px', lineHeight: 1.6
        }}>
          Transforming elite startups and enterprises with immersive web experiences, native mobile applications, and intelligent automation systems.
        </p>

        <MagneticButton onClick={() => transitionTo('/projects')} className="hero-cta btn-primary" data-cursor-text="GO">
          Explore Work <ArrowRight size={20} />
        </MagneticButton>
      </section>

      {/* SERVICES SECTION */}
      <section className="services-section container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
        <MaskReveal duration={1.5}>
          <h2 className="services-header" style={{ fontSize: '4rem', marginBottom: '80px', letterSpacing: '-1px' }}>
            Core <span className="text-accent">Capabilities</span>
          </h2>
        </MaskReveal>
        
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px',
          perspective: '1500px'
        }}>
          <ServiceCard Icon={Code} title="Web Engineering" desc="Bespoke, cinematic web platforms optimized for raw speed and conversion." />
          <ServiceCard Icon={Smartphone} title="Mobile Apps" desc="Fluid, native-feeling mobile applications built for retention." />
          <ServiceCard Icon={Cpu} title="Automation Architecture" desc="Intelligent background systems that scale operations effortlessly." />
          <ServiceCard Icon={Rocket} title="Custom Products" desc="Proprietary software tailored to completely disrupt your specific industry." />
        </div>
      </section>
    </div>
  );
}

function ServiceCard({ Icon, title, desc }) {
  return (
    <div className="service-card glass-panel hover-trigger" data-cursor-text="VIEW" style={{
      padding: '50px 40px', transition: 'var(--transition)', position: 'relative', overflow: 'hidden'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-10px)';
      e.currentTarget.style.borderColor = 'var(--accent-primary)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.borderColor = 'var(--glass-border)';
    }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '1px', background: 'var(--accent-primary)', opacity: 0, transition: 'opacity 0.3s ease' }} className="card-highlight" />
      <Icon size={40} color="var(--accent-primary)" style={{ marginBottom: '25px' }} />
      <h3 style={{ fontSize: '1.4rem', marginBottom: '15px', fontWeight: '700' }}>{title}</h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{desc}</p>
    </div>
  );
}
