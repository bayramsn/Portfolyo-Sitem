import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Simple server model component
const ServerModel: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
    }
  });
  
  return (
    <mesh ref={meshRef} position={position} castShadow>
      <boxGeometry args={[1, 2, 1]} />
      <meshStandardMaterial color="#3b82f6" metalness={0.8} roughness={0.2} />
      
      {/* Server rack details */}
      <mesh position={[0, 0, 0.51]} castShadow>
        <boxGeometry args={[0.8, 1.8, 0.05]} />
        <meshStandardMaterial color="#1e40af" metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Server lights */}
      {[-0.3, 0, 0.3].map((y, i) => (
        <mesh key={i} position={[0.2, y, 0.53]} castShadow>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={2} />
        </mesh>
      ))}
    </mesh>
  );
};

// Database component
const Database: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });
  
  return (
    <mesh ref={meshRef} position={position} castShadow>
      <cylinderGeometry args={[0.7, 0.7, 0.3, 32]} />
      <meshStandardMaterial color="#9333ea" metalness={0.7} roughness={0.3} />
      
      <mesh position={[0, 0.2, 0]} castShadow>
        <cylinderGeometry args={[0.5, 0.5, 0.3, 32]} />
        <meshStandardMaterial color="#6b21a8" metalness={0.7} roughness={0.3} />
      </mesh>
    </mesh>
  );
};

// Connection lines between components
const ConnectionLine: React.FC<{ 
  start: [number, number, number], 
  end: [number, number, number],
  color: string
}> = ({ start, end, color }) => {
  const [x1, y1, z1] = start;
  const [x2, y2, z2] = end;
  
  // Calculate the midpoint with an offset
  const midX = (x1 + x2) / 2;
  const midY = Math.max(y1, y2) + 0.5;
  const midZ = (z1 + z2) / 2;
  
  // Create curve through the midpoint
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(x1, y1, z1),
    new THREE.Vector3(midX, midY, midZ),
    new THREE.Vector3(x2, y2, z2)
  ]);
  
  const points = curve.getPoints(50);
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  
  return (
    <primitive object={new THREE.Line(
      geometry,
      new THREE.LineBasicMaterial({ color: color, linewidth: 2 })
    )} />
  );
};

// Data packet animation
const DataPacket: React.FC<{ 
  start: [number, number, number], 
  end: [number, number, number],
  speed?: number,
  color?: string
}> = ({ start, end, speed = 1, color = '#22d3ee' }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Create curve for packet to follow
  const [x1, y1, z1] = start;
  const [x2, y2, z2] = end;
  
  // Calculate the midpoint with an offset
  const midX = (x1 + x2) / 2;
  const midY = Math.max(y1, y2) + 0.5;
  const midZ = (z1 + z2) / 2;
  
  // Create curve through the midpoint
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(x1, y1, z1),
    new THREE.Vector3(midX, midY, midZ),
    new THREE.Vector3(x2, y2, z2)
  ]);
  
  useFrame((state) => {
    if (meshRef.current) {
      // Calculate packet position along the curve
      const t = (state.clock.getElapsedTime() * speed) % 1;
      const position = curve.getPoint(t);
      
      meshRef.current.position.set(position.x, position.y, position.z);
      
      // Make the packet pulse
      const pulse = Math.sin(state.clock.getElapsedTime() * 5) * 0.2 + 0.8;
      meshRef.current.scale.set(pulse, pulse, pulse);
    }
  });
  
  return (
    <mesh ref={meshRef}>
      <octahedronGeometry args={[0.1, 0]} />
      <meshStandardMaterial 
        color={color} 
        emissive={color} 
        emissiveIntensity={2}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
};

// Main scene component
const Scene: React.FC = () => {
  return (
    <>
      {/* Environment lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1} 
        castShadow
        shadow-mapSize-width={1024} 
        shadow-mapSize-height={1024}
      />
      
      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, -2, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#0f172a" metalness={0.3} roughness={0.8} />
      </mesh>
      
      {/* Server components */}
      <ServerModel position={[-2, -1, 0]} />
      <ServerModel position={[2, -1, -2]} />
      <Database position={[0, -1.5, 2]} />
      
      {/* Connection lines */}
      <ConnectionLine 
        start={[-2, -1, 0]} 
        end={[0, -1.5, 2]} 
        color="#a855f7" 
      />
      <ConnectionLine 
        start={[2, -1, -2]} 
        end={[0, -1.5, 2]} 
        color="#3b82f6" 
      />
      <ConnectionLine 
        start={[-2, -1, 0]} 
        end={[2, -1, -2]} 
        color="#22c55e" 
      />
      
      {/* Data packets animations */}
      <DataPacket start={[-2, -1, 0]} end={[0, -1.5, 2]} speed={0.7} color="#a855f7" />
      <DataPacket start={[0, -1.5, 2]} end={[2, -1, -2]} speed={0.9} color="#3b82f6" />
      <DataPacket start={[2, -1, -2]} end={[-2, -1, 0]} speed={0.5} color="#22c55e" />
    </>
  );
};

const BackendScene: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: '400px' }}>
      <Canvas shadows camera={{ position: [6, 4, 6], fov: 50 }}>
        <Scene />
        <OrbitControls 
          enableZoom={true} 
          enablePan={false} 
          minPolarAngle={Math.PI / 6} 
          maxPolarAngle={Math.PI / 2} 
        />
      </Canvas>
    </div>
  );
};

export default BackendScene;