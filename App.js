// App.js
import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { createChallenge, subscribeToChallenge } from './src/services/challengeService';
import ChallengeCard from './src/components/ChallengeCard';

export default function App() {
  // Simulating logged-in user as "user_ryan"
  const currentUserId = "user_ryan"; 
  const friendId = "user_yannick";
  const friendId = "user_nathanel";

  const [activeChallengeId, setActiveChallengeId] = useState(null);
  const [challengeData, setChallengeData] = useState(null);

  // 1. Triggered when the user taps "Start New Battle"
  const startNewChallenge = async () => {
    const id = await createChallenge(currentUserId, friendId);
    setActiveChallengeId(id);
  };

  // 2. Automatically listens to data when activeChallengeId changes
  useEffect(() => {
    if (!activeChallengeId) return;

    // Connect real-time subscription
    const unsubscribe = subscribeToChallenge(activeChallengeId, (updatedData) => {
      setChallengeData(updatedData);
    });

    // Clean up database connection if the component unmounts
    return () => unsubscribe();
  }, [activeChallengeId]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logoText}>BETZ</Text>
        <Text style={styles.tagline}>Home of Friendly Challenges</Text>
      </View>

      {!activeChallengeId ? (
        <TouchableOpacity style={styles.startBtn} onPress={startNewChallenge}>
          <Text style={styles.startBtnText}>🔥 START CHALLENGE WITH SAM</Text>
        </TouchableOpacity>
      ) : (
        <ChallengeCard challenge={challengeData} currentUserId={currentUserId} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F1E2D', justifyContent: 'center' },
  header: { alignItems: 'center', marginBottom: 30 },
  logoText: { fontSize: 42, fontWeight: 'bold', color: '#D9A74A', letterSpacing: 2 },
  tagline: { fontSize: 16, color: '#FFF', opacity: 0.8 },
  startBtn: { backgroundColor: '#0B69A3', padding: 18, borderRadius: 8, width: '80%', alignSelf: 'center', alignItems: 'center' },
  startBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 }
});