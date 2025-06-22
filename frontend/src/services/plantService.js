import { InferenceClient } from "@huggingface/inference";
import { db } from '../Firebase';
import { collection, getDocs, addDoc, updateDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { increment } from 'firebase/firestore';

export const getPlantData = async () => {
  try {
    const plantsDoc = doc(db, '3D/Plants');
    const modelsCollection = collection(plantsDoc, 'Models');
    const plantsSnapshot = await getDocs(modelsCollection);
    return plantsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching plant data:', error);
    throw error;
  }
};

export const formatPlantContext = (plants) => {
  return plants.map(plant => `
    Plant: ${plant.name}
    Description: ${plant.description}
    Care Instructions: ${plant.careInstructions}
  `).join('\n\n');
};

export const getPlantAnswer = async (question) => {
  try {
    console.log('question asked: ', question);
    // Get plant data from Firebase
    const plants = await getPlantData();
    const plantContext = formatPlantContext(plants);

    const client = new InferenceClient('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');

    const output = await client.questionAnswering({
      model: "deepset/roberta-base-squad2",
      inputs: {
        question: question,
        context: `You are a plant expert. Use this plant information to answer the question using this Plant Information:\n${plantContext}`,
      },
      provider: "auto",
    });

    console.log(output.answer);

    return output.answer;
  } catch (error) {
    console.error('Error getting plant answer:', error);
    return 'I apologize, but I am having trouble accessing the plant database right now. Please try again in a moment.';
  }
};

// PLANT INSTANCE FUNCTIONS
// Each instance is a planted plant in the world, visible to all users
// Instances are stored as subcollections within each plant document in 3D/Plants/Models
// Fields: position, stage, water, nutrients, userEmail

export const createPlantInstance = async ({ plantId, position, stage, water = 0, nutrients = { fertilizer1: 0 }, userEmail, modelPath }) => {
  try {
    console.log('Creating plant instance:', { plantId, position, stage, water, nutrients, userEmail, modelPath });
    // If modelPath is not provided, fetch it from the stage document
    let finalModelPath = modelPath;
    if (!finalModelPath && plantId && stage) {
      try {
        const stageDoc = await getDoc(doc(db, '3D/Plants/Models', plantId, 'Stages', stage));
        if (stageDoc.exists()) {
          const stageData = stageDoc.data();
          finalModelPath = stageData.modelPath;
        }
      } catch (error) {
        console.warn(`Could not fetch stage ${stage} for plant ${plantId}:`, error);
      }
    }

    const plantInstance = {
      position, // [x, y, z]
      stage,    // e.g., 'seed', 'sprout', etc.
      nutrients, // { fertilizer1: grams, ... }
      userEmail,
      createdAt: Date.now(),
      modelPath: finalModelPath,
    };

    // Create the instance as a subcollection within the plant document in 3D/Plants/Models
    const plantDocRef = doc(db, '3D/Plants/Models', plantId);
    const instancesCollection = collection(plantDocRef, 'instances');
    const docRef = await addDoc(instancesCollection, plantInstance);
    
    // Add the instanceId field to the document
    await updateDoc(docRef, { instanceId: docRef.id });
    
    return { id: docRef.id, instanceId: docRef.id, plantId, ...plantInstance };
  } catch (error) {
    console.error('Error creating plant instance:', error);
    throw error;
  }
};

export const updatePlantInstance = async (plantId, instanceId, type, amount) => {
  try {
    const instanceDocRef = doc(db, '3D/Plants/Models', plantId, 'instances', instanceId);
    await updateDoc(instanceDocRef, {
      [`nutrients.${type}`]: increment(amount)
    });
    return true;
  } catch (error) {
    console.error('Error updating plant instance:', error);
    throw error;
  }
};

export const getAllPlantInstances = async () => {
  try {
    const plantsDoc = doc(db, '3D/Plants');
    const modelsCollection = collection(plantsDoc, 'Models');
    const plantsSnapshot = await getDocs(modelsCollection);
    
    const allInstances = [];
    
    // Iterate through each plant and get its instances
    for (const plantDoc of plantsSnapshot.docs) {
      const plantData = plantDoc.data();
      const instancesCollection = collection(db, '3D/Plants/Models', plantDoc.id, 'instances');
      const instancesSnapshot = await getDocs(instancesCollection);
      
      const plantInstances = await Promise.all(instancesSnapshot.docs.map(async (instanceDoc) => {
        const instanceData = instanceDoc.data();
        
        // Get the modelPath from the specific stage
        let modelPath = null;
        if (instanceData.stage) {
          try {
            const stageDoc = await getDoc(doc(db, '3D/Plants/Models', plantDoc.id, 'Stages', instanceData.stage));
            if (stageDoc.exists()) {
              const stageData = stageDoc.data();
              modelPath = stageData.modelPath;
            }
          } catch (error) {
            console.warn(`Could not fetch stage ${instanceData.stage} for plant ${plantDoc.id}:`, error);
          }
        }
        
        // Create merged object with ALL plant catalog fields plus instance data
        const mergedData = {
          // Instance-specific fields
          instanceId: instanceDoc.id,
          plantId: plantDoc.id,
          
          // ALL plant catalog fields (spread all plant data)
          ...plantData,
          
          // Instance-specific data (these will override any conflicting plant fields)
          position: instanceData.position,
          stage: instanceData.stage,
          water: instanceData.water,
          nutrients: instanceData.nutrients,
          userEmail: instanceData.userEmail,
          createdAt: instanceData.createdAt,
          
          // Add the modelPath from the specific stage
          modelPath: modelPath,
        };
        
        return mergedData;
      }));
      
      allInstances.push(...plantInstances);
    }

    console.log('All plant instances fetched:', allInstances);
    
    return allInstances;
  } catch (error) {
    console.error('Error fetching plant instances:', error);
    throw error;
  }
};

// Helper function to get instances for a specific plant
export const getPlantInstances = async (plantId) => {
  try {
    // First get the plant catalog data
    const plantDoc = await getDoc(doc(db, '3D/Plants/Models', plantId));
    if (!plantDoc.exists()) {
      throw new Error(`Plant with ID ${plantId} not found`);
    }
    const plantData = plantDoc.data();
    
    // Then get the instances
    const instancesCollection = collection(db, '3D/Plants/Models', plantId, 'instances');
    const snapshot = await getDocs(instancesCollection);
    
    const instances = await Promise.all(snapshot.docs.map(async (instanceDoc) => {
      const instanceData = instanceDoc.data();
      
      // Get the modelPath from the specific stage
      let modelPath = null;
      if (instanceData.stage) {
        try {
          const stageDoc = await getDoc(doc(db, '3D/Plants/Models', plantId, 'Stages', instanceData.stage));
          if (stageDoc.exists()) {
            const stageData = stageDoc.data();
            modelPath = stageData.modelPath;
          }
        } catch (error) {
          console.warn(`Could not fetch stage ${instanceData.stage} for plant ${plantId}:`, error);
        }
      }
      
      // Create merged object with ALL plant catalog fields plus instance data
      const mergedData = {
        // Instance-specific fields
        id: instanceDoc.id,
        plantId,
        
        // ALL plant catalog fields (spread all plant data)
        ...plantData,
        
        // Instance-specific data (these will override any conflicting plant fields)
        position: instanceData.position,
        stage: instanceData.stage,
        water: instanceData.water,
        nutrients: instanceData.nutrients,
        userEmail: instanceData.userEmail,
        createdAt: instanceData.createdAt,
        
        // Add the modelPath from the specific stage
        modelPath: modelPath,
      };
      
      return mergedData;
    }));
    
    return instances;
  } catch (error) {
    console.error('Error fetching plant instances:', error);
    throw error;
  }
};

// Get stats for a specific plant instance
export async function getModelStats(plantId, instanceId) {
  const docRef = doc(db, "3D/Plants/Models", plantId, "instances", instanceId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    // Return all stats fields (excluding metadata fields)
    const data = docSnap.data();
    // Remove known non-stats fields
    const { position, stage, userEmail, createdAt, ...stats } = data;
    console.log('Fetched model stats:', stats);
    return stats;
  } else {
    return {}; // or handle error
  }
}


