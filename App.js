

    // App.js
import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import { createChallenge, subscribeToChallenge } from './src/services/challengeService';
import ChallengeCard from './src/components/ChallengeCard';

export default function App() {
  const currentUserId = "user_ryan"; 
  
  // 1. Fixed duplicate variable error by using an array
  const friends = [
    { id: "user_yannick", name: "Yannick" },
    { id: "user_nathanel", name: "Nathanel" },
    { id: "user_sam", name: "Sam" }
  ];

  const [activeChallengeId, setActiveChallengeId] = useState(null);
  const [challengeData, setChallengeData] = useState(null);

  const startNewChallenge = async (friend) => {
    try {
      const id = await createChallenge(currentUserId, friend.id);
      setActiveChallengeId(id);
    } catch (error) {
      console.error("Failed to create challenge:", error);
    }
  };

  useEffect(() => {
    if (!activeChallengeId) return;

    const unsubscribe = subscribeToChallenge(activeChallengeId, (updatedData) => {
      setChallengeData(updatedData);
    });

    return () => unsubscribe();
  }, [activeChallengeId]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logoText}>BETZ</Text>
        <Text style={styles.tagline}>Home of Friendly Challenges</Text>
      </View>

      {!activeChallengeId ? (
        <View style={styles.friendList}>
          <Text style={styles.sectionTitle}>Challenge a Friend:</Text>
          {friends.map(friend => (
            <TouchableOpacity 
              key={friend.id} 
              style={styles.startBtn} 
              onPress={() => startNewChallenge(friend)}
            >
              <Text style={styles.startBtnText}>🔥 START BATTLE WITH {friend.name.toUpperCase()}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <View>
          <ChallengeCard challenge={challengeData} currentUserId={currentUserId} />
          <TouchableOpacity 
            style={styles.backBtn} 
            onPress={() => setActiveChallengeId(null)}
          >
            <Text style={styles.backBtnText}>Back to Friends</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F1E2D', paddingHorizontal: 20 },
  header: { alignItems: 'center', marginTop: 60, marginBottom: 40 },
  logoText: { fontSize: 42, fontWeight: 'bold', color: '#D9A74A', letterSpacing: 2 },
  tagline: { fontSize: 16, color: '#FFF', opacity: 0.8 },
  sectionTitle: { color: '#FFF', fontSize: 18, marginBottom: 15, textAlign: 'center' },
  friendList: { width: '100%', alignItems: 'center' },
  startBtn: { backgroundColor: '#0B69A3', padding: 18, borderRadius: 8, width: '100%', marginBottom: 10, alignItems: 'center' },
  startBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 14 },
  backBtn: { marginTop: 20, alignSelf: 'center' },
  backBtnText: { color: '#D9A74A', fontWeight: '600' }
});