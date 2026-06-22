import { db } from './firebaseConfig'; // Your firebase config
import { collection, addDoc, onSnapshot, doc, serverTimestamp } from 'firebase/firestore';

export const createChallenge = async (userId, friendId) => {
  const challengeRef = await addDoc(collection(db, "challenges"), {
    challenger: userId,
    opponent: friendId,
    status: "pending",
    createdAt: serverTimestamp(),
    scores: { [userId]: 0, [friendId]: 0 }
  });
  return challengeRef.id;
};

export const subscribeToChallenge = (challengeId, callback) => {
  const challengeDoc = doc(db, "challenges", challengeId);
  return onSnapshot(challengeDoc, (snapshot) => {
    callback({ id: snapshot.id, ...snapshot.data() });
  });
};