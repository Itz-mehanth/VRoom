import { useEffect, useState } from "react";

export default function useKeyboard() {
    const [keys, setKeys] = useState({
        forward: false,
        backward: false,
        left: false,
        right: false,
        shift: false,
        space: false,
        punch: false,
        f: false,
        F: false,
        fire: false,
        primary: false
    });

    useEffect(() => {
        const handleKeyDown = (e) => {
            switch (e.code) {
                case "KeyW":
                case "ArrowUp":
                    setKeys((k) => ({ ...k, forward: true }));
                    break;
                case "KeyS":
                case "ArrowDown":
                    setKeys((k) => ({ ...k, backward: true }));
                    break;
                case "KeyA":
                case "ArrowLeft":
                    setKeys((k) => ({ ...k, left: true }));
                    break;
                case "KeyD":
                case "ArrowRight":
                    setKeys((k) => ({ ...k, right: true }));
                    break;
                case "ShiftLeft":
                case "ShiftRight":
                    setKeys((k) => ({ ...k, shift: true }));
                    break;
                case "KeyV":
                    window.dispatchEvent(new CustomEvent('toggleView'));
                    break;
                case "Space":
                    setKeys((k) => ({ ...k, space: true }));
                    break;
                case "KeyE":
                    setKeys((k) => ({ ...k, punch: true }));
                    break;
                case "KeyF":
                    setKeys((k) => ({ ...k, f: true }));
                    break;
                case "Digit1":
                    window.dispatchEvent(new CustomEvent('playAnimation', { detail: 'sit' }));
                    break;
                case "Digit2":
                    window.dispatchEvent(new CustomEvent('playAnimation', { detail: 'stand' }));
                    break;
                case "Digit3":
                    window.dispatchEvent(new CustomEvent('playAnimation', { detail: 'jump' }));
                    break;
            }
        };
        const handleKeyUp = (e) => {
            switch (e.code) {
                case "KeyW":
                case "ArrowUp":
                    setKeys((k) => ({ ...k, forward: false }));
                    break;
                case "KeyS":
                case "ArrowDown":
                    setKeys((k) => ({ ...k, backward: false }));
                    break;
                case "KeyA":
                case "ArrowLeft":
                    setKeys((k) => ({ ...k, left: false }));
                    break;
                case "KeyD":
                case "ArrowRight":
                    setKeys((k) => ({ ...k, right: false }));
                    break;
                case "ShiftLeft":
                case "ShiftRight":
                    setKeys((k) => ({ ...k, shift: false }));
                    break;
                case "Space":
                    setKeys((k) => ({ ...k, space: false }));
                    break;
                case "KeyE":
                    setKeys((k) => ({ ...k, punch: false }));
                    break;
                case "KeyF":
                    setKeys((k) => ({ ...k, f: false }));
                    break;
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, []);

    return keys;
}
