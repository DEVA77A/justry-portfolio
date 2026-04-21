import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text3D } from '@react-three/drei';
import gsap from 'gsap';

function FloatingLetter({ char, base, phase, speed, onCollect }) {
  const meshRef = useRef();
  const materialRef = useRef();
  const [isInteractive, setIsInteractive] = useState(true);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;

    // Individual Floating Motion (Roaming)
    meshRef.current.position.x = base[0] + Math.sin(time * speed * 0.2 + phase) * 25 + Math.cos(time * 0.1) * 10;
    meshRef.current.position.y = base[1] + Math.cos(time * speed * 0.15 + phase) * 20 + Math.sin(time * 0.12) * 8;
    meshRef.current.position.z = base[2] + Math.sin(time * speed * 0.1 + phase) * 15;

    // Slow organic rotation
    meshRef.current.rotation.y = time * 0.15 + phase;
    meshRef.current.rotation.x = Math.sin(time * 0.1 + phase) * 0.3;
    meshRef.current.rotation.z = Math.cos(time * 0.08 + phase) * 0.2;
  });

  const handleClick = (e) => {
    e.stopPropagation();
    if (!isInteractive) return;

    setIsInteractive(false);
    
    // Trigger collection for the quest
    if (onCollect) onCollect(char);
    
    // Slowly disappear
    gsap.to(materialRef.current, {
      opacity: 0,
      duration: 1.5,
      ease: "power2.inOut",
      onComplete: () => {
        // Stay hidden for a few seconds, then reappear
        setTimeout(() => {
          gsap.to(materialRef.current, {
            opacity: 1,
            duration: 1.5,
            ease: "power2.inOut",
            onComplete: () => setIsInteractive(true)
          });
        }, 4000); // 4 seconds delay
      }
    });
  };

  return (
    <Text3D
      ref={meshRef}
      onPointerDown={handleClick}
      font="https://raw.githubusercontent.com/mrdoob/three.js/master/examples/fonts/helvetiker_bold.typeface.json"
      size={3.5}
      height={0.4}
      curveSegments={12}
      bevelEnabled
      bevelThickness={0.05}
      bevelSize={0.05}
      bevelOffset={0}
      bevelSegments={3}
    >
      {char}
      <meshStandardMaterial
        ref={materialRef}
        color="#C9A227"
        metalness={0.9}
        roughness={0.1}
        emissive="#FFD700"
        emissiveIntensity={0.8}
        transparent={true}
        opacity={1}
      />
    </Text3D>
  );
}

export default function FloatingJustry({ onOrbCollect }) {
  const groupRef = useRef();

  const letterData = useRef([
    { char: 'J', base: [-30, 15, -25], phase: Math.random() * 10, speed: 0.5 + Math.random() * 0.5 },
    { char: 'U', base: [-18, -10, -20], phase: Math.random() * 10, speed: 0.5 + Math.random() * 0.5 },
    { char: 'S', base: [-5, 18, -30], phase: Math.random() * 10, speed: 0.5 + Math.random() * 0.5 },
    { char: 'T', base: [8, -12, -22], phase: Math.random() * 10, speed: 0.5 + Math.random() * 0.5 },
    { char: 'R', base: [22, 12, -28], phase: Math.random() * 10, speed: 0.5 + Math.random() * 0.5 },
    { char: 'Y', base: [32, -8, -20], phase: Math.random() * 10, speed: 0.5 + Math.random() * 0.5 },
  ]);

  useFrame((state) => {
    // Global Parallax based on mouse position
    if (groupRef.current) {
      const targetX = state.pointer.x * -3;
      const targetY = state.pointer.y * -3;
      groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.03;
      groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.03;
    }
  });

  return (
    <group ref={groupRef}>
      {letterData.current.map((data, i) => (
        <FloatingLetter key={i} {...data} onCollect={onOrbCollect} />
      ))}
    </group>
  );
}

