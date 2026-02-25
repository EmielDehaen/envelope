import React, { useState, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Grid, Text, Edges } from '@react-three/drei';
import * as THREE from 'three';
import { Box, Ruler, Calculator, Map as MapIcon, ChevronRight, Info } from 'lucide-react';

// --- Components ---

const BuildingEnvelope = ({ width, depth, height, setbacks }: any) => {
  const { front, rear, left, right } = setbacks;
  
  const envelopeWidth = Math.max(0.1, width - left - right);
  const envelopeDepth = Math.max(0.1, depth - front - rear);
  const envelopeHeight = Math.max(0.1, height);
  
  // Position it relative to the lot center
  // Lot is centered at 0,0. Lot spans -width/2 to width/2 and -depth/2 to depth/2.
  // Envelope spans from:
  // X: -width/2 + left  TO  width/2 - right
  // Z: -depth/2 + rear  TO  depth/2 - front (Assuming front is +Z)
  
  const posX = (left - right) / 2;
  const posZ = (rear - front) / 2;
  const posY = envelopeHeight / 2;

  return (
    <group>
      {/* Lot Area */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[width, depth]} />
        <meshStandardMaterial color="#1a1a1a" transparent opacity={0.8} />
      </mesh>
      <Edges geometry={new THREE.PlaneGeometry(width, depth).rotateX(-Math.PI / 2)} color="#444" position={[0, -0.01, 0]} />

      {/* Building Envelope */}
      <mesh position={[posX, posY, posZ]}>
        <boxGeometry args={[envelopeWidth, envelopeHeight, envelopeDepth]} />
        <meshStandardMaterial color="#3b82f6" transparent opacity={0.3} metalness={0.5} roughness={0.2} />
        <Edges color="#60a5fa" lineWidth={2} />
      </mesh>

      {/* Dimensions Labels (Simplified for MVP) */}
      <Text position={[width/2 + 2, 0, 0]} rotation={[0, Math.PI/2, 0]} fontSize={1} color="#666">
        {depth}m
      </Text>
      <Text position={[0, 0, depth/2 + 2]} fontSize={1} color="#666">
        {width}m
      </Text>
    </group>
  );
};

// --- Main App ---

export default function App() {
  const [lotWidth, setLotWidth] = useState(25);
  const [lotDepth, setLotDepth] = useState(40);
  const [maxHeight, setMaxHeight] = useState(12);
  const [setbacks, setSetbacks] = useState({
    front: 6,
    rear: 8,
    left: 3,
    right: 3,
  });

  const yieldArea = useMemo(() => {
    const w = Math.max(0, lotWidth - setbacks.left - setbacks.right);
    const d = Math.max(0, lotDepth - setbacks.front - setbacks.rear);
    return w * d;
  }, [lotWidth, lotDepth, setbacks]);

  const totalVolume = yieldArea * maxHeight;

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh', background: '#0a0a0a', color: '#e5e5e5' }}>
      
      {/* Left Sidebar: Controls */}
      <div style={{ width: '400px', borderRight: '1px solid #262626', padding: '24px', overflowY: 'auto', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
          <div style={{ background: '#3b82f6', padding: '8px', borderRadius: '8px' }}>
            <Box size={24} color="white" />
          </div>
          <h1 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0, letterSpacing: '-0.02em' }}>ENVELOPE</h1>
        </div>

        <section style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: '#9ca3af' }}>
            <MapIcon size={16} />
            <h2 style={{ fontSize: '14px', fontWeight: '600', margin: 0, textTransform: 'uppercase' }}>Lot Dimensions</h2>
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '13px' }}>Lot Width</label>
              <span style={{ fontSize: '13px', color: '#3b82f6' }}>{lotWidth}m</span>
            </div>
            <input 
              type="range" min="10" max="100" value={lotWidth} 
              onChange={(e) => setLotWidth(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#3b82f6' }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '13px' }}>Lot Depth</label>
              <span style={{ fontSize: '13px', color: '#3b82f6' }}>{lotDepth}m</span>
            </div>
            <input 
              type="range" min="10" max="150" value={lotDepth} 
              onChange={(e) => setLotDepth(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#3b82f6' }}
            />
          </div>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: '#9ca3af' }}>
            <Ruler size={16} />
            <h2 style={{ fontSize: '14px', fontWeight: '600', margin: 0, textTransform: 'uppercase' }}>Setback Rules</h2>
          </div>

          {Object.entries(setbacks).map(([key, value]) => (
            <div key={key} style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label style={{ fontSize: '13px', textTransform: 'capitalize' }}>{key} Setback</label>
                <span style={{ fontSize: '13px', color: '#3b82f6' }}>{value}m</span>
              </div>
              <input 
                type="range" min="0" max="30" value={value} 
                onChange={(e) => setSetbacks({ ...setbacks, [key]: Number(e.target.value) })}
                style={{ width: '100%', accentColor: '#3b82f6' }}
              />
            </div>
          ))}

          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '13px' }}>Max Building Height</label>
              <span style={{ fontSize: '13px', color: '#3b82f6' }}>{maxHeight}m</span>
            </div>
            <input 
              type="range" min="3" max="50" value={maxHeight} 
              onChange={(e) => setMaxHeight(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#3b82f6' }}
            />
          </div>
        </section>

        <div style={{ background: '#171717', border: '1px solid #262626', borderRadius: '12px', padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: '#9ca3af' }}>
            <Calculator size={16} />
            <h2 style={{ fontSize: '14px', fontWeight: '600', margin: 0 }}>YIELD ANALYSIS</h2>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '14px', color: '#a3a3a3' }}>Buildable Footprint</span>
            <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{yieldArea.toFixed(1)} m²</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '14px', color: '#a3a3a3' }}>Total Potential Volume</span>
            <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{totalVolume.toFixed(1)} m³</span>
          </div>
          <div style={{ borderTop: '1px solid #262626', marginTop: '12px', paddingTop: '12px', display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '14px', color: '#3b82f6' }}>Estimated Units (Est.)</span>
            <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#3b82f6' }}>{Math.floor(totalVolume / 250)}</span>
          </div>
        </div>
        
        <div style={{ marginTop: '24px', display: 'flex', gap: '8px', padding: '12px', background: '#1e3a8a33', border: '1px solid #1e40af', borderRadius: '8px' }}>
          <Info size={16} color="#60a5fa" style={{ flexShrink: 0 }} />
          <p style={{ fontSize: '12px', color: '#93c5fd', margin: 0 }}>
            Yield is calculated based on raw setbacks. Parking and local easements are not yet included in this simulation.
          </p>
        </div>
      </div>

      {/* Main Viewport: 3D Visualization */}
      <div style={{ flex: 1, position: 'relative' }}>
        <Canvas shadows>
          <PerspectiveCamera makeDefault position={[40, 40, 40]} fov={45} />
          <OrbitControls makeDefault />
          
          <ambientLight intensity={1} />
          <pointLight position={[100, 100, 100]} intensity={1.5} />
          <spotLight position={[-100, 100, -100]} angle={0.15} penumbra={1} intensity={1} castShadow />

          <BuildingEnvelope 
            width={lotWidth} 
            depth={lotDepth} 
            height={maxHeight} 
            setbacks={setbacks} 
          />

          <Grid 
            infiniteGrid 
            fadeDistance={100} 
            fadeStrength={5} 
            cellSize={5} 
            sectionSize={25} 
            sectionThickness={1.5} 
            sectionColor="#333" 
            cellColor="#222" 
          />
          
          <fog attach="fog" args={['#0a0a0a', 50, 200]} />
        </Canvas>

        {/* Floating Toolbar */}
        <div style={{ position: 'absolute', bottom: '24px', right: '24px', display: 'flex', gap: '12px' }}>
          <button style={{ background: '#262626', border: '1px solid #404040', color: '#fff', padding: '8px 16px', borderRadius: '6px', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            Export PDF <ChevronRight size={14} />
          </button>
          <button style={{ background: '#3b82f6', border: 'none', color: '#fff', padding: '8px 16px', borderRadius: '6px', fontSize: '13px', cursor: 'pointer', fontWeight: '600' }}>
            Generate Report
          </button>
        </div>
      </div>
    </div>
  );
}
