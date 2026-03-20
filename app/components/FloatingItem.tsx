'use client';

import { useRef, useState } from 'react';
import { useFrame, ThreeEvent } from '@react-three/fiber';
import { EidiItem } from '../data/eidiItems';
import { Text, Float } from '@react-three/drei';
import * as THREE from 'three';

interface Props {
  item: EidiItem;
  index: number;
  totalItems: number;
  onClick: (item: EidiItem, pos: [number, number, number]) => void;
}

export default function FloatingItem({ item, index, totalItems, onClick }: Props) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  
  // Random starting positions spread across screen
  const xSpan = 20;
  const startX = (Math.random() - 0.5) * xSpan;
  const startY = -15 - Math.random() * 10 - (index * 2); // Start below the screen
  const speed = 0.02 + Math.random() * 0.02;
  const swaySpeed = 0.5 + Math.random() * 1.5;
  const swayAmount = 0.5 + Math.random() * 1;
  
  // Base position ref
  const posRef = useRef(new THREE.Vector3(startX, startY, (Math.random() - 0.5) * 5));

  useFrame((state) => {
    if (!groupRef.current) return;
    
    // Move up
    posRef.current.y += speed;
    
    // Sway
    const sway = Math.sin(state.clock.elapsedTime * swaySpeed) * swayAmount;
    
    // Reset to bottom if it goes too high
    if (posRef.current.y > 15) {
      posRef.current.y = -15 - Math.random() * 5;
      posRef.current.x = (Math.random() - 0.5) * xSpan;
    }

    // Apply combined position with repel effect from mouse
    const pointer = state.pointer;
    // Map pointer to world coordinates roughly
    const mouseX = pointer.x * 12;
    const mouseY = pointer.y * 12;
    
    const mouseVec = new THREE.Vector3(mouseX, mouseY, posRef.current.z);
    const dist = mouseVec.distanceTo(posRef.current);
    
    let targetX = posRef.current.x + sway;
    let targetY = posRef.current.y;

    if (dist < 4) {
      const repelForce = (4 - dist) * 0.5;
      const dx = posRef.current.x - mouseX;
      const dy = posRef.current.y - mouseY;
      const len = Math.sqrt(dx*dx + dy*dy) || 1;
      targetX += (dx/len) * repelForce;
      targetY += (dy/len) * repelForce;
    }

    groupRef.current.position.lerp(new THREE.Vector3(targetX, targetY, posRef.current.z), 0.1);
    
    // Slight rotation
    if (!hovered) {
      groupRef.current.rotation.y += 0.01;
      groupRef.current.rotation.x += 0.005;
    } else {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, 0, 0.1);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, 0, 0.1);
    }
  });

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    if (groupRef.current) {
      onClick(item, [groupRef.current.position.x, groupRef.current.position.y, groupRef.current.position.z]);
    }
  };

  const isGift = item.type === 'gift';
  const isCash = item.type === 'cash';

  // Specific colors for box types
  let matColor = '#ff8b94';
  if (isCash) matColor = '#a8e6cf';
  else if (item.type === 'surprise') matColor = '#9a81ff';

  return (
    <group ref={groupRef} onClick={handleClick} onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }} onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto'; }}>
      <Float speed={2} rotationIntensity={isCash ? 0.2 : 0.5} floatIntensity={1}>
        <mesh scale={hovered ? 1.1 : 1}>
          {isCash ? <planeGeometry args={[3, 1.5]} /> : <boxGeometry args={[2, 2, 2]} />}
          <meshStandardMaterial 
            color={hovered ? '#FFD700' : matColor} 
            roughness={0.2}
            metalness={0.8}
            emissive={hovered ? '#4A1D6D' : '#000000'}
            emissiveIntensity={0.2}
          />
        </mesh>
        
        {/* Simple label */}
        <Text
          position={[0, isCash ? 0 : 1.5, isCash ? 0.01 : 1.1]}
          fontSize={isCash ? 0.4 : 0.3}
          color={isCash ? "#1a1a1a" : "#FFF8E7"}
          anchorX="center"
          anchorY="middle"
          outlineWidth={isCash ? 0 : 0.02}
          outlineColor="#4A1D6D"
        >
          {isCash ? `₹${item.amount}` : item.type === 'surprise' ? '?' : '🎁'}
        </Text>
      </Float>
    </group>
  );
}
