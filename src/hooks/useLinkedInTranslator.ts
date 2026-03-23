import { useState, useCallback } from 'react';
import { GoogleGenAI } from "@google/genai";
import { TONES } from '../constants';

export function useLinkedInTranslator() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('gemini-2.5-flash');
  const [selectedTone, setSelectedTone] = useState(TONES[0].id);
  const [customApiKey, setCustomApiKey] = useState('');
  const [error, setError] = useState<string | null>(null);

  const translate = useCallback(async () => {
    if (!input.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const isCustomModel = selectedModel !== 'gemini-2.5-flash';
      const apiKey = isCustomModel ? (customApiKey || process.env.GEMINI_API_KEY) : process.env.GEMINI_API_KEY;
      
      if (isCustomModel && !customApiKey) {
        setError('Pro tento model je vyžadován váš vlastní API klíč.');
        setIsLoading(false);
        return;
      }

      const ai = new GoogleGenAI({ apiKey: apiKey as string });
      const tone = TONES.find(t => t.id === selectedTone);
      
      const systemInstruction = `You are an expert LinkedIn content strategist. 
      Your goal is to translate user input into high-performing LinkedIn posts.
      ${tone?.prompt}
      
      Rules:
      1. Use LinkedIn formatting (line breaks, emojis, bullet points).
      2. Keep it engaging and professional.
      3. Use relevant hashtags at the end (3-5 max).
      4. DO NOT include meta-commentary like "Here is your post". Just output the post content.
      5. If the input is in Czech, output in Czech. If in English, output in English. Match the user's language.`;

      const response = await ai.models.generateContent({
        model: selectedModel,
        contents: input,
        config: {
          systemInstruction,
          temperature: 0.8,
        },
      });

      setOutput(response.text || 'No response generated.');
    } catch (err) {
      console.error('Translation error:', err);
      setError('Failed to translate. Please check your API key or try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [input, selectedModel, selectedTone, customApiKey]);

  return {
    input, setInput,
    output, setOutput,
    isLoading,
    selectedModel, setSelectedModel,
    selectedTone, setSelectedTone,
    customApiKey, setCustomApiKey,
    error,
    translate
  };
}
