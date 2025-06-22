import React, { useState, useRef, useEffect } from 'react';
import { useGLTF, Html, Text, Billboard } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { getPlantAnswer, getAllPlantInstances } from '../services/plantService';
import { useAuth } from '../contexts/AuthContext';

const PlantBot = ({ position = [0, 0, 0], refillResourceFromAdvice }) => {
  const group = useRef();
  const { nodes, materials } = useGLTF('/models/character.glb');
  const [showQuestionButton, setShowQuestionButton] = useState(false);
  const [showQuestionBox, setShowQuestionBox] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useAuth();
  const [showWaterBox, setShowWaterBox] = useState(false);
  const [showFertilizerBox, setShowFertilizerBox] = useState(false);
  const [plantInstances, setPlantInstances] = useState([]);
  const [selectedPlantId, setSelectedPlantId] = useState('');
  const [advice, setAdvice] = useState('');
  const [adviceLoading, setAdviceLoading] = useState(false);

  // Check distance to player
  useFrame((state) => {
    if (!group.current) return;
    
    const playerPosition = new THREE.Vector3();
    state.camera.getWorldPosition(playerPosition);
    
    const botPosition = new THREE.Vector3();
    group.current.getWorldPosition(botPosition);
    
    const distance = playerPosition.distanceTo(botPosition);
    
    // Show button when player is within 3 units
    setShowQuestionButton(distance < 3);
  });

  // Fetch all plant instances when advice box is opened
  useEffect(() => {
    if (showWaterBox || showFertilizerBox) {
      getAllPlantInstances().then(setPlantInstances);
    }
  }, [showWaterBox, showFertilizerBox]);

  // Dummy AI advice functions (replace with real AI call as needed)
  const getPlantWaterAdvice = async (plant) => {
    // Here you would call your AI or logic to determine water advice
    // For now, return a dummy response
    return `Give 1L of water.\nExplanation: This plant currently has ${plant.nutrients?.water || 0}L of water.`;
  };
  const getPlantFertilizerAdvice = async (plant) => {
    return `Add 100g of nitrogen.\nExplanation: This plant currently has ${(plant.nutrients?.fertilizer1 || 0)}g of fertilizer.`;
  };

  const handleAskQuestion = async () => {
    if (!question.trim()) return;
    
    setIsLoading(true);

    try {
      const answer = await getPlantAnswer(question);
      setAnswer(answer);
    } catch (error) {
      console.error('Error getting answer:', error);
      setAnswer('Sorry, I encountered an error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetWaterAdvice = async () => {
    if (!selectedPlantId) return;
    setAdviceLoading(true);
    setAdvice('');
    try {
      const plant = plantInstances.find(p => p.id === selectedPlantId);
      const result = await getPlantWaterAdvice(plant);
      setAdvice(result);
    } catch (e) {
      setAdvice('Error getting water advice.');
    } finally {
      setAdviceLoading(false);
    }
  };

  const handleGetFertilizerAdvice = async () => {
    if (!selectedPlantId) return;
    setAdviceLoading(true);
    setAdvice('');
    try {
      const plant = plantInstances.find(p => p.id === selectedPlantId);
      const result = await getPlantFertilizerAdvice(plant);
      setAdvice(result);
    } catch (e) {
      setAdvice('Error getting fertilizer advice.');
    } finally {
      setAdviceLoading(false);
    }
  };

  // Parse amount from advice string (simple regex for demo)
  const parseAmount = (advice, type) => {
    if (type === 'water') {
      const match = advice.match(/Give (\d+)/);
      return match ? { amount: parseInt(match[1], 10) } : { amount: 0 };
    } else if (type === 'fertilizer') {
      // Match "Add 100g of nitrogen"
      const match = advice.match(/Add (\d+)\s*g?\s*of\s+([a-zA-Z]+)/i);
      if (match) {
        return {
          amount: parseInt(match[1], 10),
          category: match[2].toLowerCase()
        };
      }
      return { amount: 0, category: null };
    }
    return { amount: 0 };
  };

  return (
    <group ref={group} position={position}>
      {/* Bot Character */}
        <group rotation={[0, 0, 0]} scale={[1, 1, 1]}>
          <mesh>
            <boxGeometry args={[1, 2, 1]}/>
            <meshStandardMaterial color="green" />
          </mesh>
        </group>

      {/* Name Tag */}
      <Billboard>
        <mesh position={[0, 2.5, 0]}>
          <boxGeometry args={[2, 0.5, 0.1]} />
          <meshStandardMaterial color="white" />
          <Text
            position={[0, 0, 0.06]}
            fontSize={0.2}
            color="black"
            anchorX="center"
            anchorY="middle"
          >
            Plant Expert
          </Text>
        </mesh>
      </Billboard>

      {/* Question UI */}
      {showQuestionButton && !showQuestionBox && !showWaterBox && !showFertilizerBox && (
        <Html position={[0, 1.5, 0]}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button
              onClick={() => { setShowQuestionBox(true); setShowWaterBox(false); setShowFertilizerBox(false); }}
            style={{
              padding: '10px 20px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            Ask Question
          </button>
            <button
              onClick={() => { setShowWaterBox(true); setShowQuestionBox(false); setShowFertilizerBox(false); setAdvice(''); setSelectedPlantId(''); }}
              style={{
                padding: '10px 20px',
                backgroundColor: '#2196F3',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px',
              }}
            >
              Get Water Advice
            </button>
            <button
              onClick={() => { setShowFertilizerBox(true); setShowQuestionBox(false); setShowWaterBox(false); setAdvice(''); setSelectedPlantId(''); }}
              style={{
                padding: '10px 20px',
                backgroundColor: '#FF9800',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px',
              }}
            >
              Get Fertilizer Advice
            </button>
          </div>
        </Html>
      )}

      {/* Water Advice UI */}
      {showWaterBox && (
        <Html position={[0, 1.5, 0]}>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '10px',
            width: '320px',
            boxShadow: '0 0 10px rgba(0,0,0,0.2)',
          }}>
            <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>Select a Plant for Water Advice:</div>
            <select
              value={selectedPlantId}
              onChange={e => { setSelectedPlantId(e.target.value); setAdvice(''); }}
              style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc', marginBottom: '10px' }}
            >
              <option value=''>-- Select Plant --</option>
              {plantInstances.map(plant => (
                <option key={plant.id} value={plant.id}>
                  {plant.name} ({plant.userEmail})
                </option>
              ))}
            </select>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={handleGetWaterAdvice}
                disabled={adviceLoading || !selectedPlantId}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#2196F3',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  flex: 1,
                }}
              >
                {adviceLoading ? 'Loading...' : 'Get Advice'}
              </button>
              <button
                onClick={() => { setShowWaterBox(false); setAdvice(''); setSelectedPlantId(''); }}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#f44336',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Close
              </button>
            </div>
            {advice && (
              <>
                <div style={{
                  marginTop: '10px',
                  padding: '10px',
                  backgroundColor: '#e3f2fd',
                  borderRadius: '5px',
                  whiteSpace: 'pre-line',
                }}>
                  {advice}
                </div>
                <button
                  style={{ marginTop: '10px', padding: '8px 16px', backgroundColor: '#2196F3', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                  onClick={() => {
                    refillResourceFromAdvice('water', parseAmount(advice, 'water').amount);
                  }}
                >
                  Refill in Hand
                </button>
              </>
            )}
          </div>
        </Html>
      )}

      {/* Fertilizer Advice UI */}
      {showFertilizerBox && (
        <Html position={[0, 1.5, 0]}>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '10px',
            width: '320px',
            boxShadow: '0 0 10px rgba(0,0,0,0.2)',
          }}>
            <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>Select a Plant for Fertilizer Advice:</div>
            <select
              value={selectedPlantId}
              onChange={e => { setSelectedPlantId(e.target.value); setAdvice(''); }}
              style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc', marginBottom: '10px' }}
            >
              <option value=''>-- Select Plant --</option>
              {plantInstances.map(plant => (
                <option key={plant.id} value={plant.id}>
                  {plant.name} ({plant.userEmail})
                </option>
              ))}
            </select>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={handleGetFertilizerAdvice}
                disabled={adviceLoading || !selectedPlantId}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#FF9800',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  flex: 1,
                }}
              >
                {adviceLoading ? 'Loading...' : 'Get Advice'}
              </button>
              <button
                onClick={() => { setShowFertilizerBox(false); setAdvice(''); setSelectedPlantId(''); }}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#f44336',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Close
              </button>
            </div>
            {advice && (
              <>
              <div style={{
                marginTop: '10px',
                padding: '10px',
                  backgroundColor: '#fff3e0',
                borderRadius: '5px',
                  whiteSpace: 'pre-line',
              }}>
                  {advice}
              </div>
                <button
                  style={{ marginTop: '10px', padding: '8px 16px', backgroundColor: '#FF9800', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                  onClick={() => {
                    const { amount, category } = parseAmount(advice, 'fertilizer');
                    refillResourceFromAdvice('fertilizer', amount, category);
                  }}
                >
                  Refill in Hand
                </button>
              </>
            )}
          </div>
        </Html>
      )}
    </group>
  );
};

export default PlantBot;