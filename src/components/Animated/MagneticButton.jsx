import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function MagneticButton({ children, className = '', style = {}, onClick, ...props }) {
  const containerRef = useRef(null);
  
  useEffect(() => {
    const el = containerRef.current;
    
    // Quick GSAP setters for rapid mouse movement
    const xTo = gsap.quickTo(el, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(el, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = el.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      // Magnet pull limit
      xTo(x * 0.4);
      yTo(y * 0.4);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <button
      ref={containerRef}
      className={`magnetic-btn hover-trigger ${className}`}
      style={{ ...style, display: 'inline-flex' }}
      onClick={onClick}
      {...props}
    >
      {/* Target Content */}
      <div className="magnetic-content" style={{ pointerEvents: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
        {children}
      </div>
    </button>
  );
}
