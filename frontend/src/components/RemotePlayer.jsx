import { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useFBX } from "@react-three/drei";
import { Vector3 } from "three";
import * as THREE from 'three';
import { Html } from "@react-three/drei";
import { Character } from "./Character";

const DEBUG = true;

// Define log function locally if not exported from Scene
const log = (type, message, data) => {
    if (DEBUG) console.log(`[${type}] ${message}`, data || '');
};

const IDLE_URL = "/models/Idle.fbx";
const WALK_URL = "/models/Walking.fbx";

export default function RemotePlayer({ player, playerId }) {
    const characterRef = useRef();
    const groupRef = useRef();
    const mixer = useRef(null);
    const actions = useRef({});
    const currentAction = useRef("idle");
    const [isInitialized, setIsInitialized] = useState(false);
    const lastUpdateTime = useRef(Date.now());

    const targetPosition = useRef(new Vector3(0, 2, 5));
    const targetRotation = useRef(new THREE.Quaternion());

    // Load animations from FBX files
    const idleFbx = useFBX(IDLE_URL);
    const walkFbx = useFBX(WALK_URL);

    const isValidPlayerData = (playerData) => {
        if (!playerData) return false;
        if (!playerData.position || !Array.isArray(playerData.position)) return false;
        if (playerData.position.length !== 3) return false;
        if (playerData.position.some(v => typeof v !== 'number' || isNaN(v))) return false;
        return true;
    };

    const getSafePosition = (playerData) => {
        if (!isValidPlayerData(playerData)) {
            return [0, 0, 5];
        }
        return [
            playerData.position[0],
            playerData.position[1],
            playerData.position[2]
        ];
    };

    if (!player) {
        log('WARNING', `⚠️ RemotePlayer received no player data`, { playerId });
        return null;
    }

    if (!playerId) {
        log('ERROR', `❌ RemotePlayer received no playerId`);
        return null;
    }

    // Initialize animations (wait for character instance and assets)
    useEffect(() => {
        let mounted = true;
        let rafId = null;

        const tryInit = () => {
            if (!mounted) return;

            if (!characterRef.current || !idleFbx || !walkFbx) {
                log('REMOTE', `⏳ Waiting for assets for ${playerId.substring(0, 6)}`);
                rafId = requestAnimationFrame(tryInit);
                return;
            }

            try {
                log('REMOTE', `🎨 Setting up animations for ${playerId.substring(0, 6)}`);

                // Create AnimationMixer for the character
                mixer.current = new THREE.AnimationMixer(characterRef.current);

                const loadAnim = (fbx, name) => {
                    if (!fbx || !fbx.animations || fbx.animations.length === 0) {
                        log('WARNING', `No animations in ${name}`);
                        return null;
                    }

                    const clip = fbx.animations[0];
                    const action = mixer.current.clipAction(clip);
                    actions.current[name] = action;

                    log('REMOTE', `✅ Loaded animation: ${name} for ${playerId.substring(0, 6)}`);
                    return action;
                };

                loadAnim(idleFbx, 'idle');
                loadAnim(walkFbx, 'walk');

                // Play idle animation
                if (actions.current.idle) {
                    actions.current.idle.play();
                    currentAction.current = 'idle';
                }

                setIsInitialized(true);
                log('REMOTE', `✅✅✅ FULLY INITIALIZED remote player ${playerId.substring(0, 6)}`);
            } catch (error) {
                log('ERROR', `❌ Failed to initialize remote player ${playerId.substring(0, 6)}`, error);
            }
        };

        tryInit();

        return () => {
            mounted = false;
            if (rafId) cancelAnimationFrame(rafId);
            try {
                if (mixer.current) {
                    mixer.current.stopAllAction();
                    mixer.current = null;
                }
                actions.current = {};
                setIsInitialized(false);
            } catch (error) {
                log('ERROR', `Error during cleanup for ${playerId.substring(0, 6)}`, error);
            }
        };
    }, [idleFbx, walkFbx, playerId]);

    // Animation and position updates
    useFrame((state, delta) => {
        if (!groupRef.current || !isInitialized || !characterRef.current) return;
        if (!isValidPlayerData(player)) return;

        try {
            // Check for position updates manually since player object reference might not change
            const newPos = new Vector3(
                player.position[0],
                player.position[1],
                player.position[2]
            );

            const distance = targetPosition.current.distanceTo(newPos);
            if (distance > 0.01) {
                targetPosition.current.copy(newPos);
                lastUpdateTime.current = Date.now();
                log('MOVE', `Player ${playerId.substring(0, 6)} moved to`, newPos);
            }

            if (player.rotation) {
                let rotY = 0;
                if (typeof player.rotation.y === 'number') {
                    rotY = player.rotation.y;
                } else if (Array.isArray(player.rotation) && typeof player.rotation[1] === 'number') {
                    rotY = player.rotation[1];
                }
                const euler = new THREE.Euler(0, rotY + Math.PI, 0, 'YXZ');
                targetRotation.current.setFromEuler(euler);
            }

            const timeSinceUpdate = Date.now() - lastUpdateTime.current;
            const lerpFactor = timeSinceUpdate < 100 ? 0.2 : 0.1;

            groupRef.current.position.lerp(targetPosition.current, lerpFactor);
            groupRef.current.quaternion.slerp(targetRotation.current, lerpFactor);

            if (mixer.current) {
                mixer.current.update(delta);

                // Derive action from isWalking if action is not explicitly set
                const targetAction = player.isWalking ? "walk" : (player.action || "idle");

                if (currentAction.current !== targetAction && actions.current[targetAction]) {
                    const prev = actions.current[currentAction.current];
                    const next = actions.current[targetAction];

                    if (prev && next) {
                        prev.fadeOut(0.3);
                        next.reset().fadeIn(0.3).play();
                        currentAction.current = targetAction;
                    }
                }
            }
        } catch (error) {
            log('ERROR', `Frame error for ${playerId.substring(0, 6)}`, error);
        }
    });

    const safePosition = getSafePosition(player);

    return (
        <group ref={groupRef} position={safePosition}>
            {/* Character component */}
            <Character ref={characterRef} scale={1.18} position={[0, 1, 0]} />

            {/* Show loading indicator only when not initialized */}
            {!isInitialized && (
                <>
                    <mesh position={[0, 1, 0]}>
                        <sphereGeometry args={[0.3, 16, 16]} />
                        <meshStandardMaterial
                            color="#0088ff"
                            emissive="#0044ff"
                            emissiveIntensity={0.5}
                            transparent
                            opacity={0.7}
                        />
                    </mesh>
                    <Html position={[0, 2, 0]} center>
                        <div style={{
                            background: 'rgba(0, 100, 255, 0.8)',
                            color: 'white',
                            padding: '4px 8px',
                            borderRadius: '8px',
                            fontSize: '10px',
                            fontFamily: 'monospace'
                        }}>
                            Loading {player.displayName || 'Player'}...
                        </div>
                    </Html>
                </>
            )}

            {/* Player name tag */}
            <Html position={[0, 2.5, 0]} center distanceFactor={10}>
                <div style={{
                    background: 'rgba(0, 100, 255, 0.9)',
                    color: 'white',
                    padding: '6px 12px',
                    borderRadius: '12px',
                    fontSize: '11px',
                    fontWeight: '600',
                    whiteSpace: 'nowrap',
                    pointerEvents: 'none',
                    backdropFilter: 'blur(4px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                    fontFamily: 'monospace'
                }}>
                    <div>👤 {player.displayName || playerId.substring(0, 8)}</div>
                    <div style={{
                        fontSize: '9px',
                        opacity: 0.8,
                        marginTop: '2px',
                        color: '#a0d0ff'
                    }}>
                        {player.action || 'idle'}
                    </div>
                </div>
            </Html>

            {/* Debug visualizations */}
            {DEBUG && groupRef.current && (
                <>
                    <mesh position={[0, 0.5, 0]}>
                        <sphereGeometry args={[0.15, 8, 8]} />
                        <meshBasicMaterial color="#00ff00" transparent opacity={0.4} />
                    </mesh>

                    <mesh position={[
                        targetPosition.current.x - groupRef.current.position.x,
                        0.5 + (targetPosition.current.y - groupRef.current.position.y),
                        targetPosition.current.z - groupRef.current.position.z
                    ]}>
                        <sphereGeometry args={[0.1, 8, 8]} />
                        <meshBasicMaterial color="#ff0000" transparent opacity={0.6} />
                    </mesh>
                </>
            )}
        </group>
    );
}
