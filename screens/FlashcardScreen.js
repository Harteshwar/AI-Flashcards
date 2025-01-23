import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import OpenAIService from './services/OpenAIService';
import colors from '../assets/styles/colors';

const FlashcardScreen = ({ route, navigation }) => {
  const { topic } = route.params;
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFlashcards();
  }, []);

  const fetchFlashcards = async () => {
    setLoading(true);
    setError(null);
    try {
      const generatedFlashcards = await OpenAIService.generateFlashcards(topic);
      if (generatedFlashcards.length > 0) {
        setFlashcards(generatedFlashcards);
      } else {
        throw new Error('No valid flashcards generated.');
      }
    } catch (error) {
      setError(
        error.message ||
          'Failed to generate flashcards. Please try again with a different topic.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setFlipped(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.secondary} />
        <Text style={styles.loadingText}>Generating Flashcards...</Text>
      </View>
    );
  }

  if (error || flashcards.length === 0) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          {error || `No flashcards available for "${topic}".`}
        </Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={fetchFlashcards}
        >
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.goBackButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.goBackButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const currentCard = flashcards[currentIndex];

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.card, flipped ? styles.cardBack : styles.cardFront]}
        onPress={() => setFlipped(!flipped)}
      >
        <Text style={styles.cardText}>
          {flipped ? currentCard.definition : currentCard.term}
        </Text>
      </TouchableOpacity>

      <Text style={styles.progressText}>
        {`Card ${currentIndex + 1} of ${flashcards.length}`}
      </Text>

      <View style={styles.navContainer}>
        <TouchableOpacity style={styles.navButton} onPress={handlePrevious}>
          <Text style={styles.navButtonText}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={handleNext}>
          <Text style={styles.navButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#FFFFFF',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  errorText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: colors.secondary,
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  goBackButton: {
    backgroundColor: colors.textPrimary,
    padding: 10,
    borderRadius: 8,
  },
  goBackButtonText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: 'bold',
  },
  card: {
    width: '80%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 20,
  },
  cardFront: {
    backgroundColor: colors.primary,
  },
  cardBack: {
    backgroundColor: colors.secondary,
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  progressText: {
    marginVertical: 10,
    fontSize: 16,
    color: colors.textPrimary,
  },
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  navButton: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 8,
  },
  navButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default FlashcardScreen;
