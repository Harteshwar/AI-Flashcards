import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../../assets/styles/colors';

const Flashcard = ({ flashcard }) => (
  <View style={styles.card}>
    <Text style={styles.term}>{flashcard.term}</Text>
    <Text style={styles.definition}>{flashcard.definition}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardBackground,
    padding: 16,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  term: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  definition: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 10,
  },
});

export default Flashcard;
