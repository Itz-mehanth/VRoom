import React, { useMemo, useEffect, useState } from "react";
import * as THREE from "three";
import axios from "axios";
import { useLoader } from "@react-three/fiber";

const OPENTOPO_API_KEY = "15b04da138efd60cff47b10dae0afb4b"; // <-- Replace with your key

export default function ProceduralTerrain({
  width = 1000,
  height = 1000,
  segments = 1028,
  position = [0, 0, 0],
  envIntensity = 1,
  bbox = [lon_min, lat_min, lon_max, lat_max],
  textureUrl = "/textures/soil_diff.jpg", // <-- Add your texture path here
}) {
  const [elevationGrid, setElevationGrid] = useState(null);
  const [demFailed, setDemFailed] = useState(false);

  // Load texture and optional displacement map
  const colorMap = useLoader(THREE.TextureLoader, textureUrl);
  const displacementMap = useLoader(THREE.TextureLoader, "/textures/soil_disp.png");

  // Repeat/wrap the texture so it tiles instead of stretching
  React.useEffect(() => {
    if (colorMap) {
      colorMap.wrapS = colorMap.wrapT = THREE.RepeatWrapping;
      colorMap.repeat.set(35, 35); // Increase these numbers for more tiling
      colorMap.needsUpdate = true;
    }
    if (displacementMap) {
      displacementMap.wrapS = displacementMap.wrapT = THREE.RepeatWrapping;
      displacementMap.repeat.set(5, 5);
      displacementMap.needsUpdate = true;
    }
  }, [colorMap, displacementMap]);

  useEffect(() => {
    console.log("terrain is at: ", position);
    async function fetchDEM() {
      try {
        const url = `https://portal.opentopography.org/API/globaldem?demtype=SRTMGL1&south=${bbox[1]}&north=${bbox[3]}&west=${bbox[0]}&east=${bbox[2]}&outputFormat=xyz&API_Key=${OPENTOPO_API_KEY}`;
        const res = await axios.get(url);
        if (!res.data || typeof res.data !== "string" || res.data.startsWith("II*")) {
          setDemFailed(true);
          setElevationGrid(null);
          return;
        }
        const lines = res.data.trim().split("\n");
        const grid = Array(segments + 1)
          .fill(0)
          .map(() => Array(segments + 1).fill(0));
        lines.forEach((line) => {
          const [lon, lat, elev] = line.split(" ").map(Number);
          const xIdx = Math.round(
            ((lon - bbox[0]) / (bbox[2] - bbox[0])) * segments
          );
          const yIdx = Math.round(
            ((lat - bbox[1]) / (bbox[3] - bbox[1])) * segments
          );
          if (
            xIdx >= 0 &&
            xIdx <= segments &&
            yIdx >= 0 &&
            yIdx <= segments
          ) {
            grid[yIdx][xIdx] = elev;
          }
        });
        // Check for empty or all-zero grid
        const isGridEmpty = grid.flat().every(v => v === 0 || isNaN(v));
        if (isGridEmpty) {
          setDemFailed(true);
          setElevationGrid(null);
        } else {
          setElevationGrid(grid);
          setDemFailed(false);
        }
      } catch (e) {
        setDemFailed(true);
        setElevationGrid(null);
      }
    }
    fetchDEM();
  }, [bbox, segments]);

  const geometry = useMemo(() => {
    const geom = new THREE.PlaneGeometry(width, height, segments, segments);
    if (elevationGrid && !demFailed) {
      const pos = geom.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const xIdx = i % (segments + 1);
        const yIdx = Math.floor(i / (segments + 1));
        // Add a small random displacement for detail
        const elevation = elevationGrid[yIdx]?.[xIdx] || 0;
        const displacement = Math.random() * 1.5 - 0.75; // tweak for subtlety
        pos.setZ(i, elevation / 10 + displacement);
      }
      geom.computeVertexNormals();
    }
    return geom;
  }, [width, height, segments, elevationGrid, demFailed]);

  const memoizedInitPosition = useMemo(() => position, [position[0], position[1], position[2]]);

  return (
    <mesh geometry={geometry} position={memoizedInitPosition} rotation={[-Math.PI / 2, 0, 0]}>
      <meshStandardMaterial
        envMapIntensity={envIntensity ?? 1}
        // color={demFailed ? "#c28072" : "yellow"}
        map={colorMap}
        displacementMap={displacementMap} // Uncomment if you have a displacement map
        displacementScale={5} // Tweak as needed
        wireframe={false}
      />
    </mesh>
  );
}
