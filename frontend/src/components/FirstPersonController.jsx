import { useRef, useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { useGLTF } from "@react-three/drei";
import { RigidBody, BallCollider, CapsuleCollider } from "@react-three/rapier";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3, MathUtils, AnimationMixer, Raycaster, AnimationClip, Quaternion, Euler, Matrix4 } from "three";
import * as THREE from 'three';
import { SkeletonUtils } from 'three-stdlib'
import useKeyboard from '../utils/useKeyboard';
import { Character } from './Character';


const FirstPersonController = forwardRef(
    ({ startPosition = [0, 4, 0], joystickDataRef, aimJoystickRef, aimActiveRef, isMobile, isFirstPerson, combatMode, socket, isMenuOpen, userName }, ref) => {
        const bodyRef = useRef();
        // const socket = socketref || getSocket(); // Use prop provided socket
        const cameraColliderRef = useRef();
        const groupRef = useRef(null);
        const characterRef = useRef(null);
        const activeAction = useRef(null);
        const { camera, gl, scene } = useThree();

        // Safety check for camera initialization
        useEffect(() => {
            if (camera) {
                camera.near = 0.01;
                camera.far = 200;
                camera.updateProjectionMatrix();
            }
        }, [camera]);

        const keys = useKeyboard();
        const lastUpdateRef = useRef(0);
        const isAutoRunning = useRef(false);

        const raycaster = useRef(new Raycaster());

        // --- Placeholder animation loading (Nulls for now) ---
        // const idleFbx = useFBX(IDLE_URL);
        // ... (commented out)

        const mixer = useRef(null);
        const actions = useRef({});
        const isShootingRef = useRef(false);
        const rotationLock = useRef(false);

        // Mobile touch refs
        const touchStartPos = useRef({ x: 0, y: 0 });
        const isTouchingRight = useRef(false);
        const rightPointerId = useRef(null);

        // Movement State
        const direction = useRef(new Vector3());
        const rotation = useRef({ x: 0, y: 0 });
        const targetRotation = useRef(0);
        const isGrounded = useRef(true);

        // Audio
        const walkingAudioRef = useRef(null);
        const runningAudioRef = useRef(null);
        const currentFootAudioRef = useRef(null);

        const speed = 1;
        const jumpForce = 6;
        const sensitivity = 0.002;
        const touchSensitivity = 0.005;
        const aimSensitivity = 0.003;

        const cameraTargetPos = useRef(new Vector3());
        const cameraSmoothness = useRef(12);

        const [isRunning, setIsRunning] = useState(false);
        const runMultiplier = 2;

        // Rifle Asset (Comment out if missing, or use existing if any)
        // const rifleGLB = useGLTF('/models/Rifle.glb'); 

        const MIN_CAMERA_ANGLE = -Math.PI / 3;
        const MAX_CAMERA_ANGLE = Math.PI / 3;

        const FIRST_PERSON_HEIGHT = 4.5;

        // Use Imperative Handle
        useImperativeHandle(ref, () => ({
            playAnimation,
            setRunning: (value) => setIsRunning(value),
            toggleRun,
            toggleSit: () => { }, // stub
            jump: () => {
                if (!isGrounded.current) return;
                if (bodyRef.current) {
                    const vel = bodyRef.current.linvel();
                    bodyRef.current.setLinvel({ x: vel.x, y: jumpForce, z: vel.z }, true);
                }
            },
            getButtonStyle: () => ({}),
            isActionActive: (name) => activeAction.current === name,
            isRunning: () => isAutoRunning.current,
            bodyRef: bodyRef,
            groupRef: groupRef,
            rotation: rotation,
            activeAction: activeAction,
            isGrounded: isGrounded,
            camera: camera,
            look: (dx, dy) => {
                rotation.current.y -= dx * aimSensitivity;
                rotation.current.x -= dy * aimSensitivity;
                rotation.current.x = Math.max(MIN_CAMERA_ANGLE, Math.min(MAX_CAMERA_ANGLE, rotation.current.x));
            }
        }));

        const toggleRun = () => {
            isAutoRunning.current = !isAutoRunning.current;
            setIsRunning(isAutoRunning.current);
        };

        const playAnimation = (name) => {
            // Stub: Log intended animation
            // console.log("Play animation requested:", name);
        }

        // --- Initialization Effect (Stubbed for missing animations) ---
        useEffect(() => {
            if (!characterRef.current) return;
            // Proceed even without animations to avoid crash
            try {
                mixer.current = new AnimationMixer(characterRef.current);
                // No animations to load yet.
            } catch (e) {
                console.error("Animation Init Error", e);
            }

            return () => {
                if (mixer.current) mixer.current.stopAllAction();
            }
        }, [characterRef.current]);

        // --- Frustum Culling Fix ---
        useEffect(() => {
            if (!characterRef.current) return;
            const fixCulling = () => {
                characterRef.current.traverse((child) => {
                    if (child.isMesh) {
                        child.frustumCulled = false;
                        child.castShadow = true;
                        child.receiveShadow = true;
                    }
                });
            };
            fixCulling();
            const timer = setTimeout(fixCulling, 500);
            return () => clearTimeout(timer);
        }, [characterRef.current]);

        // --- Controls Hook ---
        useEffect(() => {
            const canvas = gl.domElement;

            const handleClick = () => {
                if (!isMobile && !isMenuOpen) canvas.requestPointerLock();
            };

            const handleMouseMove = (e) => {
                if (document.pointerLockElement === canvas) {
                    rotation.current.y -= e.movementX * sensitivity;
                    rotation.current.x -= e.movementY * sensitivity;
                    rotation.current.x = Math.max(MIN_CAMERA_ANGLE, Math.min(MAX_CAMERA_ANGLE, rotation.current.x));
                }
            };

            // Touch Rotation Logic (Right Half)
            const handleTouchStart = (e) => {
                for (let i = 0; i < e.changedTouches.length; i++) {
                    const t = e.changedTouches[i];
                    // If right half and not already tracking a look touch
                    if (t.clientX > window.innerWidth / 2 && rightPointerId.current === null) {
                        rightPointerId.current = t.identifier;
                        touchStartPos.current = { x: t.clientX, y: t.clientY };
                        break;
                    }
                }
            };

            const handleTouchMove = (e) => {
                if (rightPointerId.current === null) return;

                for (let i = 0; i < e.changedTouches.length; i++) {
                    const t = e.changedTouches[i];
                    if (t.identifier === rightPointerId.current) {
                        const deltaX = t.clientX - touchStartPos.current.x;
                        const deltaY = t.clientY - touchStartPos.current.y;

                        rotation.current.y -= deltaX * touchSensitivity;
                        rotation.current.x -= deltaY * touchSensitivity;
                        rotation.current.x = Math.max(MIN_CAMERA_ANGLE, Math.min(MAX_CAMERA_ANGLE, rotation.current.x));

                        touchStartPos.current = { x: t.clientX, y: t.clientY };
                        break;
                    }
                }
            };

            const handleTouchEnd = (e) => {
                for (let i = 0; i < e.changedTouches.length; i++) {
                    if (e.changedTouches[i].identifier === rightPointerId.current) {
                        rightPointerId.current = null;
                        break;
                    }
                }
            };

            canvas.addEventListener("click", handleClick);
            document.addEventListener("mousemove", handleMouseMove);

            // Add Touch Listeners
            canvas.addEventListener("touchstart", handleTouchStart, { passive: false });
            canvas.addEventListener("touchmove", handleTouchMove, { passive: false });
            canvas.addEventListener("touchend", handleTouchEnd);
            canvas.addEventListener("touchcancel", handleTouchEnd); // Handle Cancel too

            return () => {
                canvas.removeEventListener("click", handleClick);
                document.removeEventListener("mousemove", handleMouseMove);
                canvas.removeEventListener("touchstart", handleTouchStart);
                canvas.removeEventListener("touchmove", handleTouchMove);
                canvas.removeEventListener("touchend", handleTouchEnd);
                canvas.removeEventListener("touchcancel", handleTouchEnd);
            }
        }, [gl, isMobile, isMenuOpen]);

        // --- Emit State ---
        const emitPlayerState = (state) => {
            if (!socket || !bodyRef.current || !groupRef.current) return;

            const pos = bodyRef.current.translation();
            if (!pos) return;

            // Custom protocol to match what VRScene expects
            // VRScene listens for 'update-transform' or 'user-transform' ?
            // The original logic used 'update-transform'.
            // The user's NEW code emits 'updateState'.
            // I should probably stick to what the SERVER expects.
            // If I change the client emit, the server won't understand it unless I change the server too.
            // Existing server likely expects 'update-transform'.

            // Let's use the EXISTING event name but with the NEW logic's data if compatible,
            // or map it.
            // Existing: { position, userName, rotation: {x,y,z}, isWalking }

            const isWalking = direction.current.lengthSq() > 0;
            const currentRotation = {
                x: 0,
                y: groupRef.current.rotation.y, // Only Y acts as the facing direction
                z: 0
            };

            socket.emit('update-transform', {
                position: { x: pos.x, y: pos.y, z: pos.z },
                userName: userName,
                rotation: currentRotation,
                isWalking: isWalking
            });
            console.log('[FPC] Emitting transform:', { x: pos.x, y: pos.y, z: pos.z });
        };

        // --- Physics Loop ---
        useFrame((state, delta) => {
            if (!bodyRef.current) return;

            const time = performance.now();
            if (time - lastUpdateRef.current > 200) {
                lastUpdateRef.current = time;
                emitPlayerState(state);
            }

            const rb = bodyRef.current;
            const currentVel = rb.linvel();

            if (mixer.current) mixer.current.update(delta);

            // Ground check (simple velocity check)
            isGrounded.current = Math.abs(currentVel.y) < 0.1;

            // Jump
            if (keys.space && isGrounded.current) {
                rb.setLinvel({ x: currentVel.x, y: jumpForce, z: currentVel.z }, true);
            }

            // Camera direction
            const forward = new Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
            forward.y = 0; forward.normalize();
            const right = new Vector3(1, 0, 0).applyQuaternion(camera.quaternion);
            right.y = 0; right.normalize();

            direction.current.set(0, 0, 0);

            if (keys.forward) direction.current.add(forward);
            if (keys.backward) direction.current.sub(forward);
            if (keys.right) direction.current.add(right);
            if (keys.left) direction.current.sub(right);

            // Joystick Input
            if (joystickDataRef?.current) {
                const { x, y } = joystickDataRef.current;
                if (y !== 0) direction.current.add(forward.clone().multiplyScalar(y));
                if (x !== 0) direction.current.add(right.clone().multiplyScalar(x));
            }

            // Movement
            const isMoving = direction.current.lengthSq() > 0;
            let moveVel = new Vector3();

            if (isMoving) {
                direction.current.normalize();
                const currentSpeed = (keys.shift || isRunning) ? speed * runMultiplier : speed;
                moveVel.copy(direction.current).multiplyScalar(currentSpeed);

                // Rotate character to face movement
                const newTargetRot = Math.atan2(direction.current.x, direction.current.z);
                targetRotation.current = newTargetRot;

                if (groupRef.current) {
                    // Smooth rotation
                    groupRef.current.rotation.y = MathUtils.lerp(groupRef.current.rotation.y, targetRotation.current, 10 * delta);
                }
            }

            // Apply velocity directly (respects collisions properly)
            rb.setLinvel({
                x: moveVel.x,
                y: currentVel.y, // Preserve gravity
                z: moveVel.z
            }, true);

            // Camera Follow Logic
            const trans = rb.translation();
            const characterPos = new Vector3(trans.x, trans.y, trans.z);
            let desiredCameraPos;

            if (isFirstPerson) {
                desiredCameraPos = characterPos.clone().add(new Vector3(0, FIRST_PERSON_HEIGHT, 0));
                cameraTargetPos.current.copy(desiredCameraPos);
                camera.position.lerp(cameraTargetPos.current, 0.5); // Fast follow

                // First person looks exactly where rotation state says
                const euler = new Euler(rotation.current.x, rotation.current.y, 0, 'YXZ');
                camera.quaternion.setFromEuler(euler);
            } else {
                // Third person
                const offset = new Vector3(0, 2, 4); // Fixed offset behind
                // In a real implementation we rotate this offset by `rotation.current`
                // Simple fallback:
                offset.applyEuler(new Euler(0, rotation.current.y, 0));
                desiredCameraPos = characterPos.clone().add(offset);

                camera.position.lerp(desiredCameraPos, 0.1);
                camera.lookAt(characterPos.clone().add(new Vector3(0, 1.5, 0)));
            }

            // Camera Collider Sync
            if (cameraColliderRef.current) {
                cameraColliderRef.current.setTranslation(camera.position, true);
            }
        });

        return (
            <group dispose={null}>
                <RigidBody
                    ref={bodyRef}
                    type="dynamic"
                    colliders={false}
                    enabledRotations={[false, false, false]}
                    lockRotations
                    position={startPosition}
                    friction={0.5}
                    restitution={0}
                >
                    <CapsuleCollider args={[0.25, 0.25]} position={[0, 0.5, 0]} />

                    <group ref={groupRef} visible={!isFirstPerson}>
                        <Character ref={characterRef} />
                    </group>
                </RigidBody>

                <RigidBody ref={cameraColliderRef} type="kinematicPosition" colliders={false}>
                    <BallCollider args={[0.1]} />
                </RigidBody>
            </group>
        );
    }
);

export default FirstPersonController;
