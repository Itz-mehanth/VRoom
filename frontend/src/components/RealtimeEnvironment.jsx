import { useEffect, useState, useRef, useLayoutEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { Environment, Sparkles, Sky, Clouds, ContactShadows } from "@react-three/drei";
import axios from "axios";
import RainEffect from "./RainEffect"; // <- your rain component
import { RGBELoader } from "three-stdlib";
import * as THREE from "three";
import {useLoader} from "@react-three/fiber";
import { DateTime } from "luxon";

export default function RealtimeEnvironment({
  lat,
  lng,
  position = { x: 0, z: 0 },
  onWeatherUpdate,
  useRealtime,
  customEnv,
  onBackgroundIntensityChange,
  localHour,
  zoneName
}) {
  const [weather, setWeather] = useState(null);
  const { scene } = useThree();
  const sunMeshRef = useRef();
  const [godRaysTarget, setGodRaysTarget] = useState(null);
  const envRotation = useRef(0); // Add a ref to hold the rotation value
  const envRef = useRef();
  const texture = useLoader(RGBELoader, '/hdr/kloppenheim_03_puresky_1k.hdr');

  useEffect(() => {
    if (!useRealtime) return;

    const fetchWeather = async () => {
      try {
        const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
          params: {
            lat,
            lon: lng,
            appid: "6f3f02c4c5f662748117bf92782917ab",
            units: "metric"
          }
        });
        setWeather(res.data);
        console.log("Weather data fetched:", res.data);
        onWeatherUpdate?.(res.data);
      } catch (err) {
        console.error("Weather fetch failed:", err);
      }
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 600000);
    return () => clearInterval(interval);
  }, [lat, lng, useRealtime]);

  useLayoutEffect(() => {
    if (sunMeshRef.current) {
      setGodRaysTarget(sunMeshRef.current);
    }
  }, []);

  // Animate a small drift for realism
  useFrame((_, delta) => {
    envRotation.current += delta * 0.01; // slow drift
  });

  let cloudiness = 20, isRaining = false, isSnow = false, isThunder = false, temp = 25, hour;

  if (useRealtime && weather) {
    cloudiness = weather.clouds.all;
    isRaining = weather.weather[0].main === "Rain";
    isSnow = weather.weather[0].main === "Snow";
    isThunder = weather.weather[0].main === "Thunderstorm";
    temp = weather.main.temp;
    hour = typeof localHour === "number" ? localHour : new Date().getHours(); // <-- use passed localHour
  } else if (customEnv) {
    cloudiness = customEnv.cloudiness ?? 20;
    isRaining = customEnv.isRaining ?? false;
    isSnow = customEnv.isSnow ?? false;
    isThunder = customEnv.isThunder ?? false;
    temp = customEnv.temp ?? 25;
    hour = typeof customEnv.hour === "number" ? customEnv.hour : new Date().getHours(); // <-- use customEnv.hour
  } else {
    hour = new Date().getHours();
  }

  const isClear = !isRaining && !isSnow && !isThunder && cloudiness < 40;

  // Lighting logic
  let sunlight = cloudiness < 40 ? 1 : 0.3;
  let ambient = sunlight * 0.5;
  let lightColor = 0xffffff;

  if (hour < 6 || hour > 19) {
    sunlight = 0.1;
    ambient = 0.05;
    lightColor = 0x223366;
  } else if (hour < 8) {
    lightColor = 0xffd580;
  } else if (hour > 17) {
    lightColor = 0xffa07a;
  }

  if (isRaining) {
    sunlight *= 0.5;
    ambient *= 0.7;
  } else if (cloudiness > 50) {
    sunlight *= 0.7;
    ambient *= 0.8;
  } else if (isSnow) {
    sunlight *= 0.8;
    ambient *= 1.2;
  } else if (isThunder) {
    sunlight *= 0.3;
    ambient *= 0.5;
  }

  const sunAzimuth = Math.min(Math.max(((hour - 6) / 12) * Math.PI, 0), Math.PI);
  const sunPosition = [
    Math.sin(sunAzimuth) * 100,
    Math.cos(sunAzimuth) * 30 + 10,
    100,
  ];

  // Complex dynamic background intensity based on time and weather
  let backgroundIntensity;
  if (hour < 5 || hour > 21) {
    // Deep night
    backgroundIntensity = 0.05;
  } else if ((hour >= 5 && hour < 7) || (hour > 19 && hour <= 21)) {
    // Dawn/dusk
    backgroundIntensity = 0.1;
  } else if ((hour >= 7 && hour < 9) || (hour > 17 && hour <= 19)) {
    // Early morning/late evening
    backgroundIntensity = 0.25;
  } else {
    // Day
    backgroundIntensity = 1;
  }
  // Weather overrides
  if (isThunder) {
    backgroundIntensity *= 0.2;
  } else if (isRaining) {
    backgroundIntensity *= 0.5;
  } else if (isSnow) {
    backgroundIntensity *= 0.7;
  } else if (cloudiness > 80) {
    backgroundIntensity *= 0.6;
  } else if (cloudiness > 50) {
    backgroundIntensity *= 0.8;
  }

  // Calculate rotationY based on local time
  // Force update every second to keep rotation in sync with real time
  const [, setTick] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  let rotationY;

  if(useRealtime){
    // Get the current time in the target timezone, including seconds and milliseconds
    const now = zoneName
      ? DateTime.now().setZone(zoneName)
      : DateTime.now();
  
    // Calculate total seconds since midnight (unique for every second/millisecond)
    const millisecondsSinceMidnight =
    now.hour * 3600 * 1000 +
    now.minute * 60 * 1000 +
    now.second * 1000 +
    now.millisecond;
  
    // Fraction of the day (0 = midnight, 1 = next midnight)
    rotationY = millisecondsSinceMidnight/ (Math.PI * 2 * 35000);
  }else{
    rotationY = customEnv.hour
      ? (customEnv.hour / 32) * Math.PI * 2
      : 0;
  }

  // Notify background intensity changes
  useEffect(() => {
    if (onBackgroundIntensityChange) {
      onBackgroundIntensityChange(backgroundIntensity);
    }
  }, [backgroundIntensity, onBackgroundIntensityChange]);

  return (
    <>
      {/* HDRI for photorealistic lighting */}
      <Environment
        ref={envRef}
        background
        environmentIntensity={backgroundIntensity}
        backgroundIntensity={backgroundIntensity}
      >
        <color attach="background" args={['black']} />
        <mesh rotation={[0, rotationY, 0]} scale={100}>
          <sphereGeometry args={[1, 60, 40]} />
          <meshBasicMaterial 
            map={texture} 
            side={THREE.BackSide} 
            toneMapped={false} 
            transparent 
            opacity={1} 
          />
        </mesh>
      </Environment>

      <ContactShadows frames={1} />

      {/* Volumetric Clouds */}
      <Clouds
        opacity={1}
        speed={0.2}
        depth={10}
        segments={100}
        position={[position.x, 0, position.z]}
        scale={[2000, 10, 2000]}
        color="#ffffff"
      />

      {/* Effects */}
      {isRaining && <RainEffect position={[position.x, 10, position.z]} />}
      {isSnow && (
        <Sparkles
          position={[position.x, 2, position.z]}
          count={200}
          scale={[500, 100, 500]}
          color="#e0e6f8"
        />
      )}
    </>
  );
}
