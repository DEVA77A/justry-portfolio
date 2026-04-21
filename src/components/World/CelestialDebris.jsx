import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * SHOOTING STAR COMPONENT
 * A fast-moving, glowing streak that appears occasionally.
 */
function FallingStar() {
  const mesh = useRef();
  const material = useRef();
  const [active, setActive] = useState(false);
  const data = useRef({ 
    velocity: new THREE.Vector3(),
    startPos: new THREE.Vector3()
  });

  useFrame((state, delta) => {
    if (!active) {
      if (Math.random() < 0.003) { 
        // Spawn far out to ensure they enter at speed
        const startX = (Math.random() - 0.5) * 160;
        const startY = 40 + Math.random() * 20;
        const startZ = -40 - Math.random() * 60;
        
        mesh.current.position.set(startX, startY, startZ);
        data.current.startPos.copy(mesh.current.position);
        
        // Very fast velocity for a "flow" feel
        data.current.velocity.set(
          (startX > 0 ? -1 : 1) * (60 + Math.random() * 50),
          -40 - Math.random() * 40,
          (Math.random() - 0.5) * 10
        );
        
        // Alignment
        mesh.current.rotation.z = Math.atan2(data.current.velocity.y, data.current.velocity.x) + Math.PI / 2;
        setActive(true);
      }
      return;
    }

    // Move in straight line
    mesh.current.position.addScaledVector(data.current.velocity, delta);
    
    // Smooth opacity fade based on total distance from start
    const distTraveled = mesh.current.position.distanceTo(data.current.startPos);
    if (material.current) {
      material.current.opacity = Math.max(0, 1 - (distTraveled / 120));
    }

    // Cleanup when vanished or out of bounds
    if (distTraveled > 120 || mesh.current.position.y < -50) {
      setActive(false);
    }
  });

  return (
    <mesh ref={mesh} visible={active}>
      <cylinderGeometry args={[0.02, 0.2, 20, 8]} />
      <meshStandardMaterial 
        ref={material}
        color="#FFFFFF" 
        emissive="#FFD700" 
        emissiveIntensity={40} 
        transparent 
        opacity={1}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}


/**
 * ASTEROID COMPONENT
 * A rocky debris that tumbles slowly in the distance.
 */
export default function CelestialDebris() {
  return (
    <group>
      {/* Allow up to 3 simultaneous shooting stars for better atmosphere */}
      <FallingStar />
      <FallingStar />
      <FallingStar />
    </group>
  );
}
