import React, { useState, useEffect, createContext } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// Create a context for the model registry
const ModelContext = createContext();

// Add ModelRegistry component at the top level
const ModelRegistry = ({ children }) => {
  const [models, setModels] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadModels = async () => {
      const modelPaths = {
        'head': '/models/head.glb',
        'waterJug': '/models/environment.glb',
      };

      const loader = new GLTFLoader();
      const loadedModels = {};

      try {
        for (const [key, path] of Object.entries(modelPaths)) {
          const gltf = await loader.loadAsync(path);
          loadedModels[key] = gltf;
        }
        setModels(loadedModels);
      } catch (error) {
        console.error('Error loading models:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadModels();
  }, []);

  // Create a context to provide the models to children
  return (
    <ModelContext.Provider value={{ models, isLoading }}>
      {children}
    </ModelContext.Provider>
  );
};

export { ModelRegistry, ModelContext };
