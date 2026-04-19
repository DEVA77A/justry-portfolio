import React, { useEffect, useRef } from 'react';

export default function SparkleTrail() {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticle = (x, y) => {
      const size = Math.random() * 4 + 2;
      return {
        x,
        y,
        size,
        initialSize: size,
        vx: (Math.random() - 0.5) * 5,
        vy: (Math.random() - 0.5) * 5,
        life: 1.0,
        decay: Math.random() * 0.02 + 0.015,
        rotation: Math.random() * Math.PI,
        rotationSpeed: (Math.random() - 0.5) * 0.2,
        color: Math.random() > 0.5 ? '#C9A227' : '#FFD700', // Gold or Lighter Gold
      };
    };

    const drawDiamond = (ctx, x, y, size, rotation, color, opacity) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.beginPath();
      ctx.moveTo(0, -size);
      ctx.lineTo(size * 0.6, 0);
      ctx.lineTo(0, size);
      ctx.lineTo(-size * 0.6, 0);
      ctx.closePath();

      ctx.fillStyle = color;
      ctx.globalAlpha = opacity;
      ctx.shadowBlur = 10;
      ctx.shadowColor = color;
      ctx.fill();
      ctx.restore();
    };

    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Add new particles if mouse is moving
      for (let i = 0; i < 2; i++) {
        particles.current.push(createParticle(mouse.current.x, mouse.current.y));
      }

      // Update and draw
      for (let i = particles.current.length - 1; i >= 0; i--) {
        const p = particles.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05; // Gravity
        p.life -= p.decay;
        p.rotation += p.rotationSpeed;
        p.size = p.initialSize * p.life;

        if (p.life <= 0) {
          particles.current.splice(i, 1);
          continue;
        }

        drawDiamond(ctx, p.x, p.y, p.size, p.rotation, p.color, p.life);
      }

      animationFrameId = requestAnimationFrame(update);
    };

    const onMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);
    resize();
    update();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 9999,
        mixBlendMode: 'screen',
      }}
    />
  );
}
