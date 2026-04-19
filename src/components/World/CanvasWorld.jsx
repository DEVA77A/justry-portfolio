import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, PerspectiveCamera, MeshDistortMaterial, Float, Stars, Torus, Html, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

// -------------------------------------------------------------
// CAMERA CONTROLLER: Flies to regions with compositional offsetting
// -------------------------------------------------------------
function CameraRig({ activeLocation }) {
  const { camera } = useThree();
  const targetLook = useRef(new THREE.Vector3(0, 0, 0));

  useEffect(() => {
    // Compositional Rule: When UI is open (left 50%), move the 3D node to the right (X offset).
    const isUIOpen = activeLocation !== 'orbit' && activeLocation !== 'intro';
    const xOffset = isUIOpen ? -5 : 0; // Moves camera left to push object right in frame

    const routes = {
      intro: { pos: [0, 0, 40], look: [0, 0, 0] },
      orbit: { pos: [0, 5, 30], look: [0, 0, 0] },
      about: { pos: [-8 + xOffset, 2, 8], look: [-12, 0, 0] },
      projects: { pos: [8 + xOffset, 2, 8], look: [12, 0, 0] },
      reviews: { pos: [xOffset, 8, -5], look: [0, 4, -12] }, // SERVICES
      contact: { pos: [0 + xOffset, -2, 10], look: [0, -5, 12] }
    };

    const dest = routes[activeLocation] || routes.orbit;

    gsap.to(camera.position, {
      x: dest.pos[0], y: dest.pos[1], z: dest.pos[2],
      duration: 2.5, ease: 'expo.inOut'
    });

    const dummyLook = { x: targetLook.current.x, y: targetLook.current.y, z: targetLook.current.z };
    gsap.to(dummyLook, {
      x: dest.look[0], y: dest.look[1], z: dest.look[2],
      duration: 2.5, ease: 'expo.inOut',
      onUpdate: () => {
        targetLook.current.set(dummyLook.x, dummyLook.y, dummyLook.z);
        camera.lookAt(targetLook.current);
      }
    });

  }, [activeLocation, camera]);

  return null;
}

// -------------------------------------------------------------
// REGION: HQ (ABOUT)
// -------------------------------------------------------------
function RegionAbout({ setActiveLocation, isActive }) {
  const mesh = useRef();
  const [hovered, setHover] = useState(false);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      mesh.current.rotation.y += 0.002;
    }
  });

  return (
    <group position={[-15, 0, 0]}
      onClick={(e) => { e.stopPropagation(); setActiveLocation('about'); }}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <mesh ref={mesh}>
        <boxGeometry args={[4, 18, 4]} />
        <meshStandardMaterial
          color="#0A0A0A"
          metalness={1}
          roughness={0.1}
          emissive="#C9A227"
          emissiveIntensity={hovered || isActive ? 0.8 : 0.1}
        />
      </mesh>
      <Html position={[0, -10, 2]} center style={{ pointerEvents: 'none' }}>
        <div style={{
          color: '#C9A227', textTransform: 'uppercase', letterSpacing: '5px', fontSize: '10px',
          opacity: hovered ? 1 : 0.4, transition: '0.5s', fontWeight: 'bold'
        }}>
          HOME
        </div>
      </Html>
    </group>
  );
}

// -------------------------------------------------------------
// REGION: SERVICES (Formerly Reviews)
// -------------------------------------------------------------
function RegionServices({ setActiveLocation, isActive }) {
  const group = useRef();
  const ringRef = useRef();
  const [hovered, setHover] = useState(false);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y += 0.01;
      ringRef.current.rotation.z -= 0.02;
    }
  });

  return (
    <group position={[0, 5, -15]}
      onClick={(e) => { e.stopPropagation(); setActiveLocation('reviews'); }}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <group ref={group}>
        {/* Core Pulsing Node */}
        <mesh>
          <octahedronGeometry args={[2.5, 0]} />
          <MeshDistortMaterial
            color="#C9A227" distort={0.4} speed={2}
            emissive="#FFD700" emissiveIntensity={hovered || isActive ? 1.5 : 0.2}
          />
        </mesh>

        {/* Orbiting Service Spheres */}
        {[0, 1, 2].map((i) => (
          <mesh key={i} position={[Math.sin(i * 2.1) * 6, Math.cos(i * 2.1) * 6, 0]}>
            <sphereGeometry args={[0.8, 16, 16]} />
            <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.5} />
          </mesh>
        ))}
      </group>

      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[8, 0.05, 16, 100]} />
        <meshBasicMaterial color="#C9A227" transparent opacity={0.3} />
      </mesh>

      <Html position={[0, -6, 2]} center style={{ pointerEvents: 'none' }}>
        <div style={{
          color: '#C9A227', textTransform: 'uppercase', letterSpacing: '5px', fontSize: '10px',
          opacity: hovered ? 1 : 0.4, transition: '0.5s', fontWeight: 'bold', textAlign: 'center'
        }}>
          OUR SERVICES
        </div>
      </Html>
    </group>
  );
}

// -------------------------------------------------------------
// REGION: PROJECTS (Formerly Digital)
// -------------------------------------------------------------
function RegionProjects({ setActiveLocation, isActive }) {
  const group = useRef();
  const [hovered, setHover] = useState(false);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y -= 0.005;
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <group position={[15, 0, 0]}
      onClick={(e) => { e.stopPropagation(); setActiveLocation('projects'); }}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <group ref={group}>
        {[0, 1, 2, 3].map((i) => (
          <mesh key={i} position={[Math.sin((i * Math.PI * 2) / 4) * 5, Math.cos((i * Math.PI * 2) / 4) * 5, 0]} rotation={[0, Math.PI / 4, 0]}>
            <planeGeometry args={[4, 6]} />
            <meshStandardMaterial
              color="#0A0A0A" metalness={1}
              emissive="#C9A227" emissiveIntensity={hovered || isActive ? 1 : 0.1}
              wireframe={!hovered && !isActive}
              side={THREE.DoubleSide}
            />
          </mesh>
        ))}
      </group>
      <Html position={[0, -8, 2]} center style={{ pointerEvents: 'none' }}>
        <div style={{
          color: '#C9A227', textTransform: 'uppercase', letterSpacing: '5px', fontSize: '10px',
          opacity: hovered ? 1 : 0.4, transition: '0.5s', fontWeight: 'bold'
        }}>
          PROJECTS
        </div>
      </Html>
    </group>
  );
}

// -------------------------------------------------------------
// REGION: CONTACT US
// -------------------------------------------------------------
function RegionContact({ setActiveLocation, isActive }) {
  const ringRef = useRef();
  const [hovered, setHover] = useState(false);

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z -= 0.01;
      ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.5;
    }
  });

  return (
    <group position={[0, -8, 15]}
      onClick={(e) => { e.stopPropagation(); setActiveLocation('contact'); }}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <mesh ref={ringRef}>
        <torusGeometry args={[5, 0.1, 16, 100]} />
        <meshStandardMaterial color="#C9A227" emissive="#FFD700" emissiveIntensity={hovered || isActive ? 2 : 0.2} />
      </mesh>

      <Sparkles count={50} scale={8} size={2} speed={0.5} color="#FFD700" opacity={hovered ? 1 : 0.2} />

      <Html position={[0, -2, 0]} center style={{ pointerEvents: 'none' }}>
        <div style={{
          color: '#C9A227', textTransform: 'uppercase', letterSpacing: '5px', fontSize: '10px',
          opacity: hovered ? 1 : 0.4, transition: '0.5s', fontWeight: 'bold'
        }}>
          CONTACT
        </div>
      </Html>
    </group>
  );
}

// -------------------------------------------------------------
// MAIN WORLD
// -------------------------------------------------------------
export default function CanvasWorld({ activeLocation, setActiveLocation }) {
  return (
    <Canvas
      camera={{ fov: 45, position: [0, 0, 40] }}
      onPointerMissed={() => { if (activeLocation !== 'intro') setActiveLocation('orbit') }}
    >
      <color attach="background" args={['#020202']} />
      <fog attach="fog" args={['#020202', 15, 70]} />
      <Stars radius={100} depth={50} count={5000} factor={6} saturation={0} fade speed={1.5} />

      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 20, 10]} intensity={1.5} color="#C9A227" />
      <spotLight position={[-10, 20, -10]} intensity={1} angle={0.4} penumbra={1} color="#FFD700" />

      <RegionAbout setActiveLocation={setActiveLocation} isActive={activeLocation === 'about'} />
      <RegionProjects setActiveLocation={setActiveLocation} isActive={activeLocation === 'projects'} />
      <RegionServices setActiveLocation={setActiveLocation} isActive={activeLocation === 'reviews'} />
      <RegionContact setActiveLocation={setActiveLocation} isActive={activeLocation === 'contact'} />

      <mesh position={[0, -15, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color="#050505" wireframe transparent opacity={0.05} />
      </mesh>

      <CameraRig activeLocation={activeLocation} />
    </Canvas>
  );
}
