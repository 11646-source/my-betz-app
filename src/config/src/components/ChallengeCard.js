import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { updatePushUpScore } from '../services/challengeService';

export default function ChallengeCard({ challenge, currentUserId }) {
  if (!challenge) return null;

  const myScore = challenge.scores[currentUserId] || 0;
  
  // Find opponent's ID dynamically from the scores object
  const opponentId = Object.keys(challenge.scores).find(id => id !== currentUserId);
  const opponentScore = challenge.scores[opponentId] || 0;

  const handlePushUp = () => {
    // Increment the current user's score by 1 in the backend
    updatePushUpScore(challenge.id, currentUserId, myScore + 1);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>PHYSICAL CHALLENGE</Text>
      <Text style={styles.subtitle}>Who can do more push-ups?</Text>
      
      <View style={styles.scoreRow}>
        <View style={styles.scoreBox}>
          <Text style={styles.scoreLabel}>You</Text>
          <Text style={styles.scoreNumber}>{myScore}</Text>
        </View>
        
        <Text style={styles.vs}>VS</Text>
        
        <View style={styles.scoreBox}>
          <Text style={styles.scoreLabel}>Friend</Text>
          <Text style={styles.scoreNumber}>{opponentScore}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handlePushUp}>
        <Text style={styles.buttonText}>+1 PUSH UP! 💪</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#FFF', padding: 20, borderRadius: 12, width: '90%', alignSelf: 'center', marginVertical: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  title: { fontSize: 18, fontWeight: 'bold', color: '#102A43', textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#627D98', textAlign: 'center', marginBottom: 15 },
  scoreRow: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginBottom: 20 },
  scoreBox: { alignItems: 'center' },
  scoreLabel: { fontSize: 14, color: '#486581' },
  scoreNumber: { fontSize: 32, fontWeight: 'bold', color: '#0B69A3' },
  vs: { fontSize: 18, fontWeight: 'bold', color: '#BCCCDC' },
  button: { backgroundColor: '#D9A74A', paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 }
});