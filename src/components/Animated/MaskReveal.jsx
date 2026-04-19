import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function MaskReveal({ children, style = {}, direction = "up", duration = 1.2, delay = 0 }) {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Initial state: clipped out of view
    let clipStart = 'polygon(0 0, 100% 0, 100% 0, 0 0)';
    if (direction === "up") clipStart = 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)';
    if (direction === "left") clipStart = 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)';
    if (direction === "right") clipStart = 'polygon(0 0, 0 0, 0 100%, 0 100%)';

    gsap.set(containerRef.current, { clipPath: clipStart });

    gsap.to(containerRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
      },
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      duration: duration,
      ease: "power4.inOut",
      delay: delay
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} style={{ ...style, overflow: 'hidden' }}>
      {children}
    </div>
  );
}
