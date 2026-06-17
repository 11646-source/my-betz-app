// src/services/challengeService.js
import { db } from '../config/firebase';
import { 
  collection, 
  addDoc, 
  doc, 
  updateDoc, 
  onSnapshot, 
  serverTimestamp 
} from 'firebase/firestore';

/**
 * 1. Creates a brand new push-up challenge in the database
 */
export const createChallenge = async (challengerId, opponentId) => {
  try {
    const docRef = await addDoc(collection(db, "challenges"), {
      challenger_id: challengerId,
      opponent_id: opponentId,
      challenge_type: "push_up",
      status: "active",
      scores: {
        [challengerId]: 0,
        [opponentId]: 0
      },
      winner_id: null,
      created_at: serverTimestamp()
    });
    return docRef.id; // Returns the generated Challenge ID
  } catch (error) {
    console.error("Error creating challenge: ", error);
  }
};

/**
 * 2. Updates the push-up score for a specific user inside a challenge
 */
export const updatePushUpScore = async (challengeId, userId, newScore) => {
  try {
    const challengeRef = doc(db, "challenges", challengeId);
    await updateDoc(challengeRef, {
      [`scores.${userId}`]: newScore
    });
  } catch (error) {
    console.error("Error updating score: ", error);
  }
};

/**
 * 3. Listens to live, real-time changes of a specific challenge
 * This updates the UI automatically without forcing a screen refresh!
 */
export const subscribeToChallenge = (challengeId, onUpdate) => {
  const challengeRef = doc(db, "challenges", challengeId);
  
  // onSnapshot listens directly to the Firestore document stream
  return onSnapshot(challengeRef, (docSnap) => {
    if (docSnap.exists()) {
      onUpdate({ id: docSnap.id, ...docSnap.data() });
    }
  });
};