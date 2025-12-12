import React, { useState, Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls, Center, Circle } from '@react-three/drei';

// Mock Data
const PLANTS = [
    { id: 1, name: 'Haworthia', type: 'Indoor', image: '/models/plantpot.glb', vitality: 'High', difficulty: 'Easy', description: 'A small, slow-growing succulent with distinctive white stripes. Perfect for desktops and modern interiors.' },
    { id: 2, name: 'Hens and Chick', type: 'Outdoor', image: '/models/plantpot.glb', vitality: 'Medium', difficulty: 'Easy', description: 'A mat-forming succulent producing clusters of rosettes. Ideal for rock gardens and sunny spots.' },
    { id: 3, name: 'Echeveria', type: 'Indoor', image: '/models/plantpot.glb', vitality: 'High', difficulty: 'Medium', description: 'Known for its beautiful rose-shaped rosettes and ease of care. Loves bright, indirect light.' },
    { id: 4, name: 'Aloe Vera', type: 'Indoor', image: '/models/plantpot.glb', vitality: 'Maximum', difficulty: 'Easy', description: 'A medicinal plant known for its soothing gel. Requires very little water and thrives in neglect.' },
    { id: 5, name: 'Snake Plant', type: 'Indoor', image: '/models/plantpot.glb', vitality: 'High', difficulty: 'Hardy', description: 'An extremely hardy plant with upright, sword-like leaves. excellent for air purification.' },
    { id: 6, name: 'Fern', type: 'Outdoor', image: '/models/plantpot.glb', vitality: 'Medium', difficulty: 'Moderate', description: 'A lush plant with feathery fronds, perfect for shady spots and high humidity environments.' },
];

const PreviewModel = ({ path }) => {
    const { scene } = useGLTF(path);
    return (
        <Center>
            <primitive object={scene} scale={6} rotation={[0.2, 0, 0]} />
        </Center>
    );
};

// Background graphical element
const BackgroundCircle = () => (
    <Circle args={[1, 64]} scale={4.5} position={[0, 0, -2]}>
        <meshBasicMaterial color="#ecfdf5" />
    </Circle>
);

const PlantMarketplace = ({ onClose, onViewInAR }) => {
    const [selectedId, setSelectedId] = useState(1);
    const focusedPlant = PLANTS.find(p => p.id === selectedId) || PLANTS[0];
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            background: 'linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%)', // Subtle green gradient
            display: 'flex',
            flexDirection: 'column',
            fontFamily: "'Inter', sans-serif",
            position: 'relative',
            overflowY: 'auto', // Allow vertical scrolling
            color: '#064e3b'
        }}>
            {/* Top Navigation - Simplified */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: isMobile ? '20px' : '32px 60px',
                zIndex: 10
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <button
                        onClick={onClose}
                        style={{
                            border: 'none',
                            background: 'white',
                            width: '48px',
                            height: '48px',
                            borderRadius: '50%',
                            fontSize: '20px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                            color: '#064e3b',
                            transition: 'transform 0.2s'
                        }}
                        onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
                        onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        ←
                    </button>
                    <span style={{ fontWeight: '800', fontSize: '24px', letterSpacing: '-0.5px', color: '#064e3b' }}>Virtual Garden</span>
                </div>
            </div>

            {/* Main Content Area */}
            <div style={{
                flex: '1 0 auto', // Allow grow, prevent shrink
                display: 'flex',
                position: 'relative',
                padding: isMobile ? '0 20px' : '0 60px',
                flexDirection: isMobile ? 'column-reverse' : 'row', // Stack vertically on mobile, visual on top
                gap: isMobile ? '20px' : '0'
            }}>

                {/* Left Text Detail */}
                <div style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    zIndex: 5,
                    paddingBottom: '80px'
                }}>
                    <h4 style={{
                        textTransform: 'uppercase',
                        letterSpacing: '3px',
                        fontSize: '14px',
                        fontWeight: '700',
                        color: '#059669',
                        marginBottom: isMobile ? '8px' : '24px'
                    }}>
                        #{focusedPlant.type}
                    </h4>
                    <h1 style={{
                        fontSize: '80px',
                        fontWeight: '900',
                        lineHeight: '1',
                        color: '#064e3b',
                        marginBottom: '24px',
                        maxWidth: '600px',
                        letterSpacing: '-2px',
                        fontSize: isMobile ? '42px' : '80px', // Responsive font size
                        textAlign: isMobile ? 'left' : 'left'
                    }}>
                        {focusedPlant.name}
                    </h1>
                    <p style={{
                        color: '#374151',
                        fontSize: '18px',
                        lineHeight: '1.6',
                        maxWidth: '480px',
                        marginBottom: '40px'
                    }}>
                        {focusedPlant.description}
                    </p>

                    {/* Stats / Badges */}
                    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
                        <div style={{
                            padding: '12px 24px',
                            backgroundColor: '#d1fae5',
                            borderRadius: '30px',
                            color: '#064e3b',
                            fontWeight: '600'
                        }}>
                            Difficulty: {focusedPlant.difficulty}
                        </div>
                        <div style={{
                            padding: '12px 24px',
                            backgroundColor: '#ecfdf5',
                            borderRadius: '30px',
                            color: '#047857',
                            fontWeight: '600'
                        }}>
                            Vitality: {focusedPlant.vitality}
                        </div>

                        {/* View in AR Button */}
                        <button
                            onClick={() => onViewInAR(focusedPlant)}
                            style={{
                                padding: '12px 24px',
                                background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                                borderRadius: '30px',
                                color: 'white',
                                fontWeight: '700',
                                border: 'none',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                boxShadow: '0 4px 14px rgba(5, 150, 105, 0.4)',
                                transition: 'all 0.2s'
                            }}
                            onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                            onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <span>📱</span> View in AR
                        </button>
                    </div>
                </div>

                {/* Right/Center 3D Viewer */}
                <div style={{
                    flex: 1.2,
                    position: 'relative',
                    height: isMobile ? '40vh' : '100%', // Limit height on mobile
                    width: '100%',
                    marginTop: isMobile ? '0' : '-50px',
                    minHeight: isMobile ? '300px' : 'auto'
                }}>
                    <Canvas camera={{ position: [3, 2, 5], fov: 35 }} dpr={[1, 2]}>
                        <ambientLight intensity={1} />
                        <directionalLight position={[5, 10, 5]} intensity={2} color="#ffffff" />
                        <directionalLight position={[-5, 5, -5]} intensity={1} color="#d1fae5" />
                        <Suspense fallback={null}>
                            <BackgroundCircle />
                            <PreviewModel path={focusedPlant.image} />
                            <OrbitControls
                                enableZoom={false}
                                autoRotate
                                autoRotateSpeed={2}
                                minPolarAngle={Math.PI / 4}
                                maxPolarAngle={Math.PI / 1.5}
                            />
                        </Suspense>
                    </Canvas>
                </div>
            </div>

            {/* Bottom Horizontal List */}
            <div style={{
                height: isMobile ? '280px' : '220px',
                flexShrink: 0, // Prevent shrinking
                display: 'flex',
                alignItems: 'center',
                padding: isMobile ? '0 20px' : '0 60px',
                gap: '30px',
                overflowX: 'auto',
                background: 'rgba(255,255,255,0.5)',
                backdropFilter: 'blur(20px)',
                borderTop: '1px solid rgba(255,255,255,0.8)'
            }}>
                {PLANTS.map((plant) => (
                    <div
                        key={plant.id}
                        onClick={() => setSelectedId(plant.id)}
                        style={{
                            backgroundColor: 'white',
                            minWidth: '220px',
                            padding: '20px',
                            borderRadius: '24px',
                            cursor: 'pointer',
                            border: selectedId === plant.id ? '2px solid #059669' : '1px solid transparent',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            boxShadow: selectedId === plant.id ? '0 15px 30px rgba(5, 150, 105, 0.15)' : '0 4px 12px rgba(0,0,0,0.03)',
                            transform: selectedId === plant.id ? 'scale(1.05)' : 'scale(1)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '12px'
                        }}
                    >
                        {/* Circle Preview Placeholder */}
                        <div style={{
                            width: '80px',
                            height: '80px',
                            backgroundColor: '#ecfdf5',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '32px'
                        }}>
                            🌿
                        </div>

                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontWeight: '700', color: '#064e3b', fontSize: '16px', marginBottom: '4px' }}>{plant.name}</div>
                            <div style={{ fontSize: '14px', fontWeight: '500', color: '#6b7280' }}>{plant.type}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PlantMarketplace;
