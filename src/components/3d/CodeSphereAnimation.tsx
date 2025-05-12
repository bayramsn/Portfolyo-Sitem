import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Random code snippets to display in the sphere
const codeSnippets = [
  'function()', 'const', 'let', 'import', 'export',
  'React', 'useState', 'useEffect', 'async', 'await',
  'API', 'data', 'props', 'return', 'JSON',
  'map', 'filter', 'reduce', 'MongoDB', 'Express',
  'Node.js', 'TypeScript', '.then()', 'catch()', '{}'
];

// Generate random points in a sphere shape
const generateSpherePoints = (count: number, radius: number) => {
  const points = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  
  for (let i = 0; i < count; i++) {
    // Generate random spherical coordinates
    const u = Math.random();
    const v = Math.random();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);
    
    const r = radius * Math.cbrt(Math.random()); // Cube root for uniform distribution
    
    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta);
    const z = r * Math.cos(phi);
    
    points[i * 3] = x;
    points[i * 3 + 1] = y;
    points[i * 3 + 2] = z;
    
    // Generate pastel colors with blue/purple hue
    colors[i * 3] = 0.2 + Math.random() * 0.3;     // R
    colors[i * 3 + 1] = 0.2 + Math.random() * 0.4; // G
    colors[i * 3 + 2] = 0.6 + Math.random() * 0.4; // B
  }
  
  return { points, colors };
};

const CodeSphereAnimation: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const [pointsData] = useState(() => generateSpherePoints(500, 3));
  
  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      };
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Animation loop
  useFrame((state, delta) => {
    if (pointsRef.current) {
      // Rotate based on mouse position
      pointsRef.current.rotation.x += delta * 0.1 + mousePosition.current.y * 0.01;
      pointsRef.current.rotation.y += delta * 0.15 + mousePosition.current.x * 0.01;
      
      // Pulse animation
      const time = state.clock.getElapsedTime();
      pointsRef.current.scale.x = 1 + Math.sin(time * 0.3) * 0.05;
      pointsRef.current.scale.y = 1 + Math.sin(time * 0.3) * 0.05;
      pointsRef.current.scale.z = 1 + Math.sin(time * 0.3) * 0.05;
    }
  });
  
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      
      {/* Main sphere of points */}
      <Points ref={pointsRef} limit={1000}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[pointsData.points, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[pointsData.colors, 3]}
          />
        </bufferGeometry>
        <PointMaterial
          transparent
          vertexColors
          size={8}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
      
      {/* Text labels scattered in the sphere */}
      {codeSnippets.slice(0, 10).map((snippet, i) => {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        const distance = 1.5 + Math.random() * 1;
        
        const x = distance * Math.sin(phi) * Math.cos(theta);
        const y = distance * Math.sin(phi) * Math.sin(theta);
        const z = distance * Math.cos(phi);
        
        return (
          <group key={i} position={[x, y, z]} rotation={[0, Math.random() * Math.PI * 2, 0]}>
            <mesh>
              <sphereGeometry args={[0.05, 16, 16]} />
              <meshBasicMaterial color={`hsl(${210 + i * 15}, 70%, 70%)`} />
            </mesh>
          </group>
        );
      })}
    </>
  );
};

export default CodeSphereAnimation;