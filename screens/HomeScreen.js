import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import colors from '../assets/styles/colors';

const HomeScreen = ({ navigation }) => {
  const [topic, setTopic] = useState('');
  const trendingTopics = ['JavaScript', 'AI', 'Climate Change', 'Python', 'Mental Health', 'Cryptocurrency'];

  const handleGenerate = () => {
    const trimmedTopic = topic.trim();

    if (!trimmedTopic) {
      Alert.alert('Error', 'Please enter a valid topic or select one below!');
      return;
    }

    if (trimmedTopic.length < 3) {
      Alert.alert('Error', 'The topic should have at least 3 characters.');
      return;
    }

    navigation.navigate('Flashcards', { topic: trimmedTopic });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Flashcard Builder</Text>
      <Text style={styles.subtitle}>Study smarter, not harder!</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter a topic (e.g., Calculus, Nature, Java)"
        value={topic}
        onChangeText={setTopic}
      />

      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={styles.buildButton}
          onPress={handleGenerate}
          activeOpacity={0.8}
        >
          <Text style={styles.buildButtonText}>Generate Flashcards</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.clearButton}
          onPress={() => setTopic('')}
          activeOpacity={0.8}
        >
          <Text style={styles.clearButtonText}>Clear</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Trending Topics</Text>
      <View style={styles.topicContainer}>
        {trendingTopics.map((item) => (
          <TouchableOpacity
            key={item}
            style={styles.topicButton}
            onPress={() => navigation.navigate('Flashcards', { topic: item })}
          >
            <Text style={styles.topicText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.footerTip}>💡 Tip: Choose a trending topic or enter your own to get started!</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.primary,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
    marginTop: 50,
  },
  subtitle: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 20,
  },
  input: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    marginBottom: 20,
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  buildButton: {
    backgroundColor: colors.secondary,
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 10,
    marginRight: 10,
  },
  clearButton: {
    backgroundColor: colors.textPrimary,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buildButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  clearButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  topicContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  topicButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 5,
  },
  topicText: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  footerTip: {
    marginTop: 30,
    fontSize: 14,
    color: '#FFFFFF',
    fontStyle: 'italic',
    textAlign: 'center',
  },
});

export default HomeScreen;
