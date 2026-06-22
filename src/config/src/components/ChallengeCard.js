import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ChallengeCard = ({ challenge, currentUserId }) => {
  if (!challenge) return <Text style={{color: '#fff'}}>Loading Battle...</Text>;

  return (
    <View style={styles.card}>
      <Text style={styles.statusLabel}>{challenge.status.toUpperCase()}</Text>
      <View style={styles.scoreRow}>
        <View style={styles.player}>
          <Text style={styles.playerName}>YOU</Text>
          <Text style={styles.score}>{challenge.scores[currentUserId]}</Text>
        </View>
        <Text style={styles.vs}>VS</Text>
        <View style={styles.player}>
          <Text style={styles.playerName}>OPPONENT</Text>
          <Text style={styles.score}>
             {/* Find the score that isn't the current user */}
             {Object.values(challenge.scores).find(s => s !== challenge.scores[currentUserId]) || 0}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { backgroundColor: '#1A2E44', padding: 20, borderRadius: 15, borderWidth: 1, borderColor: '#D9A74A' },
  statusLabel: { color: '#D9A74A', textAlign: 'center', fontWeight: '800', marginBottom: 10 },
  scoreRow: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
  player: { alignItems: 'center' },
  playerName: { color: '#FFF', fontSize: 12, opacity: 0.7 },
  score: { color: '#FFF', fontSize: 32, fontWeight: 'bold' },
  vs: { color: '#D9A74A', fontWeight: 'bold' }
});

export default ChallengeCard;