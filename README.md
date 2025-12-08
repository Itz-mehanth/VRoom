# Virtual Herbarium Garden (V-Room) 🌿🚀

> **A real-time multiplayer 3D immersive environment built with modern web technologies.**
> *Gardening, exploration, and social interaction in a high-performance virtual world.*

![Status](https://img.shields.io/badge/Status-Active-success)
![Tech](https://img.shields.io/badge/Stack-React%20%7C%20Three.js%20%7C%20WebRTC-blue)
![Performance](https://img.shields.io/badge/Performance-Optimized-brightgreen)

## 📖 Overview

**V-Room** is a cutting-edge web application that merges **3D Graphics**, **Real-time Networking**, and **Interactive Gameplay**. Users can explore a procedurally generated procedural terrain, plant and nurture virtual seeds, and interact with other users via voice and video chat in real-time.

Built to push the limits of the browser, this project demonstrates advanced engineering in graphics optimization, state synchronization, and user interface design.

---

## ✨ Key Features

### 🎮 Immersive 3D World
*   **Physics-Based Interaction**: Powered by `@react-three/rapier`, featuring collision detection, gravity, and first-person movement.
*   **Procedural Generation**: Unique terrain and Day/Night cycles synchronized with real-world timezones (`luxon`).
*   **Dynamic Weather**: Real-time rain and snow effects affecting the environment.

### 🌐 Real-Time Multiplayer
*   **Multi-User Sync**: Seamless movement and action synchronization using `Socket.io`.
*   **Voice & Video Chat**: Integrated WebRTC (`PeerJS`) for proximity-based spatial audio and video communication.
*   **Shared World State**: Plant growth, object placement, and inventory changes are synced across all clients via central backend and Firebase.

### 🌱 Interactive Systems
*   **Gardening Mechanics**: Plant seeds, water them, and watch them grow through multiple stages (Seed -> Sprout -> Flower).
*   **Inventory & Marketplace**: Drag-and-drop inventory system and a 3D marketplace HUD.
*   **3D UI/HUD**: Glassmorphism-styled in-game interfaces fully integrated into the 3D scene.

---

## 🛠️ Technical Engineering (Performance)

This project heavily prioritizes performance to ensure 60 FPS on standard devices.

*   **Instance Rendering**: Utilized **InstancedMesh** for repetitive geometry (Tube Lights, Fences), reducing thousands of draw calls to single digits.
*   **BVH Raycasting**: implemented **Bounding Volume Hierarchy** (`three-mesh-bvh`) to accelerate raycasting interaction by 100x.
*   **Adaptive Resolution**: Built a custom hybrid DPR (Device Pixel Ratio) system:
    *   **Manual Aggressive Mode**: Instantly drops resolution during movement for fluidity.
    *   **Sharp Idle Mode**: Restores full high-definition visuals when stationary.
*   **Baked Shadows**: Implemented **Static Shadow Baking** with smart updates (re-baking only on object placement) to eliminate per-frame shadow calculation overhead.
*   **Asset Optimization**: Pre-compilation of shaders (`<Preload />`) to prevent render jank and texture compression.

---

## 💻 Tech Stack

### Core
*   **Frontend**: React 18, Vite
*   **3D Engine**: Three.js, @react-three/fiber (R3F)
*   **Abstraction**: @react-three/drei
*   **Physics**: @react-three/rapier (Bullet Physics via WASM)

### Networking & Backend
*   **Realtime**: Socket.io (WebSocket), PeerJS (WebRTC)
*   **Database**: Firebase (Auth & Firestore)
*   **State Management**: Zustand

### Tools
*   **Icons**: Lucide React
*   **Time**: Luxon
*   **Math**: Simplex Noise

---

## 🚀 Getting Started

1.  **Clone the repository**
    ```bash
    git clone https://github.com/ITZ-mehanth/VRoom.git
    cd VRoom
    ```

2.  **Install Frontend Dependencies**
    ```bash
    cd frontend
    npm install
    ```

3.  **Run Development Server**
    ```bash
    npm run dev
    ```

4.  **Open in Browser**
    Visit `http://localhost:5173` to enter the virtual world.

---

## 📸 Screenshots
<img width="1919" height="903" alt="image" src="https://github.com/user-attachments/assets/ef061bd8-c3cb-4e8f-9bf9-773eb0dbcade" />

<img width="1919" height="910" alt="image" src="https://github.com/user-attachments/assets/7418a81f-3f21-4935-8bfb-f807f70a95fa" />

<img width="1919" height="906" alt="image" src="https://github.com/user-attachments/assets/56b68622-b66a-4bda-b6fd-9e796e576100" />

---
