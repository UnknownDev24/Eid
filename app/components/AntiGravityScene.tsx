'use client';

import { Canvas } from '@react-three/fiber';
import { Environment, AdaptiveDpr, AdaptiveEvents } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { EidiItem } from '../data/eidiItems';
import FloatingItem from './FloatingItem';
import ParticleSystem from './ParticleSystem';
import { useState } from 'react';

interface Props {
  items: EidiItem[];
  onItemClick: (item: EidiItem) => void;
}

export default function AntiGravityScene({ items, onItemClick }: Props) {
  const [clickPos, setClickPos] = useState<[number, number, number] | null>(null);

  const handleItemClick = (item: EidiItem, position: [number, number, number]) => {
    setClickPos(position);
    onItemClick(item);
    
    // reset particle burst after a short delay
    setTimeout(() => {
      setClickPos(null);
    }, 1000);
  };

  return (
    <div className="absolute inset-0 z-0 pointer-events-auto">
      <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} />
        <Environment preset="city" />

        {items.map((item, index) => (
          <FloatingItem 
            key={item.id} 
            item={item} 
            index={index} 
            totalItems={items.length} 
            onClick={handleItemClick}
          />
        ))}

        {clickPos && <ParticleSystem position={clickPos} />}

        <EffectComposer>
          <Bloom luminanceThreshold={0.5} mipmapBlur intensity={1.5} />
        </EffectComposer>
        
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
      </Canvas>
    </div>
  );
}
