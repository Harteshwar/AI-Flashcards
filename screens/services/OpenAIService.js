import axios from 'axios';
import { OPENAI_API_KEY } from '@env';

const OpenAIService = {
  async generateFlashcards(topic) {
    const prompt = `You are an expert flashcard generator. Create 10 educational flashcards for the topic "${topic}". 
    Each flashcard should have the following format:
    - Term: [A key concept or term]
    - Definition: [A short and clear explanation of the term]

    If the topic is too broad, focus on common and meaningful subtopics.`;

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4',
          messages: [
            { role: 'system', content: 'You are a helpful assistant for creating flashcards.' },
            { role: 'user', content: prompt },
          ],
          max_tokens: 750, // Increased token limit for more detailed responses
          temperature: 0.7,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
        }
      );

      const rawText = response.data.choices[0]?.message?.content || '';
      console.log('Raw OpenAI Response:', rawText); // Log raw response for debugging

      if (!rawText) throw new Error('No response received from OpenAI.');

      // Parse flashcards from the raw response
      const lines = rawText.split('\n').map((line) => line.trim());
      const flashcards = [];

      for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith('- Term:')) {
          const term = lines[i].replace('- Term: ', '').trim();
          const definitionLine = lines[i + 1];
          const definition =
            definitionLine && definitionLine.startsWith('- Definition:')
              ? definitionLine.replace('- Definition: ', '').trim()
              : 'Definition not found';
          flashcards.push({ term, definition });
        }
      }

      console.log('Parsed Flashcards:', flashcards); // Log parsed flashcards for debugging

      if (flashcards.length === 0) {
        throw new Error('Failed to generate valid flashcards.');
      }

      return flashcards;
    } catch (error) {
      console.error('Error generating flashcards:', error.response?.data || error.message);
      throw new Error(
        'Could not generate flashcards. Please try a different topic or check your network connection.'
      );
    }
  },
};

export default OpenAIService;
