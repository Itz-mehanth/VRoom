import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, Center, OrbitControls } from '@react-three/drei';
import { Activity, Droplet, Sprout, Wind, X } from 'lucide-react';

const PreviewModel = ({ path }) => {
    const { scene } = useGLTF(path);
    return (
        <Center>
            <primitive scale={12} object={scene} />
        </Center>
    );
};

const PlantDetailsHUD = ({ selectedModel, onClose }) => {
    if (!selectedModel) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            backdropFilter: 'blur(8px)',
            zIndex: 3000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'auto',
            padding: '20px'
        }}>
            <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(24px)',
                borderRadius: '32px',
                border: '1px solid rgba(255, 255, 255, 0.6)',
                width: '100%',
                maxWidth: '900px',
                height: 'auto',
                minHeight: '60vh',
                maxHeight: '85vh',
                boxShadow: '0 24px 48px -12px rgba(0, 0, 0, 0.15)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', // Responsive grid
                gap: '32px',
                padding: '32px',
                position: 'relative',
                overflowY: 'auto'
            }}>
                {/* Close Button */}
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '20px',
                        right: '20px',
                        background: 'rgba(255,255,255,0.5)',
                        border: 'none',
                        color: '#374151',
                        cursor: 'pointer',
                        zIndex: 10,
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s',
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#fae8e8'; e.currentTarget.style.color = '#ef4444'; }}
                    onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.5)'; e.currentTarget.style.color = '#374151'; }}
                >
                    <X size={24} />
                </button>

                {/* Left: 3D Preview */}
                <div style={{
                    backgroundColor: '#ecfdf5', // Mint cream
                    borderRadius: '24px',
                    overflow: 'hidden',
                    position: 'relative',
                    minHeight: '350px',
                    border: '1px solid rgba(16, 185, 129, 0.1)'
                }}>
                    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 1, 3], fov: 45 }}>
                        <Suspense fallback={null}>
                            <ambientLight intensity={0.9} />
                            <directionalLight position={[5, 10, 5]} intensity={1.5} />
                            <directionalLight position={[-5, 5, 5]} intensity={0.5} />
                            <PreviewModel path={selectedModel.modelPath || '/models/plantpot.glb'} />
                            <OrbitControls autoRotate autoRotateSpeed={2} enableZoom={false} enablePan={false} />
                        </Suspense>
                    </Canvas>
                </div>

                {/* Right: Details & Actions */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    gap: '20px'
                }}>
                    <div>
                        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '6px 12px', backgroundColor: '#d1fae5', color: '#047857', borderRadius: '99px', fontSize: '12px', fontWeight: '600' }}>
                                <Sprout size={14} /> Healthy
                            </span>
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '6px 12px', backgroundColor: '#e0e7ff', color: '#4338ca', borderRadius: '99px', fontSize: '12px', fontWeight: '600' }}>
                                <Wind size={14} /> Level 5
                            </span>
                        </div>

                        <h2 style={{
                            fontSize: '42px',
                            fontWeight: '800',
                            color: '#064e3b',
                            margin: 0,
                            lineHeight: 1.1,
                            letterSpacing: '-1px'
                        }}>
                            {selectedModel.name || 'Garden Plant'}
                        </h2>
                    </div>

                    <p style={{
                        fontSize: '16px',
                        lineHeight: '1.6',
                        color: '#4b5563',
                        margin: 0
                    }}>
                        {selectedModel.description || "A lush, vibrant addition to your virtual ecosystem. This plant thrives in hydroponic environments and adds a calming green presence to your space."}
                    </p>

                    {/* Stats Card */}
                    <div style={{
                        backgroundColor: 'rgba(255,255,255,0.6)',
                        padding: '20px',
                        borderRadius: '20px',
                        border: '1px solid rgba(255,255,255,0.8)'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', alignItems: 'center' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '600', color: '#374151' }}>
                                <Activity size={18} color="#10b981" />
                                Vitality
                            </span>
                            <span style={{ fontWeight: '700', color: '#059669' }}>85%</span>
                        </div>
                        <div style={{ width: '100%', height: '12px', backgroundColor: '#e5e7eb', borderRadius: '6px', overflow: 'hidden' }}>
                            <div style={{ width: '85%', height: '100%', backgroundColor: '#10b981', borderRadius: '6px' }}></div>
                        </div>
                    </div>

                    {/* Action Button */}
                    <button style={{
                        marginTop: 'auto',
                        padding: '16px',
                        backgroundColor: '#059669',
                        color: 'white',
                        border: 'none',
                        borderRadius: '16px',
                        fontSize: '16px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        transition: 'all 0.2s',
                        boxShadow: '0 4px 12px rgba(5, 150, 105, 0.2)'
                    }}
                        onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(5, 150, 105, 0.3)'; }}
                        onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(5, 150, 105, 0.2)'; }}
                    >
                        <Droplet size={20} fill="rgba(255,255,255,0.2)" />
                        Water Plant
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PlantDetailsHUD;
