import { TrendingUp, Sparkles, MessageSquareText, Award } from 'lucide-react';

export const MODELS = [
  { id: 'gemini-3.1-flash-lite-preview', name: 'Gemini 3.1 Flash Lite', description: 'Lightweight and efficient', disabled: false },
  { id: 'gemini-3-flash-preview', name: 'Gemini 3 Flash (Fast)', description: 'Best for quick translations', disabled: false },
  { id: 'gemini-3.1-pro-preview', name: 'Gemini 3.1 Pro (Smart)', description: 'Best for complex reasoning and nuance', disabled: false },
  { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash', description: 'Reliable previous generation model', disabled: false },
  { id: 'gemini-flash-latest', name: 'Gemini Flash (Stable)', description: 'Stable version of the Flash model', disabled: false },
];

export const TONES = [
  { id: 'thought-leader', name: 'Thought Leader', icon: TrendingUp, prompt: 'Write as a visionary thought leader. Use short, punchy sentences. Start with a hook. Use bullet points. End with a question to drive engagement.' },
  { id: 'professional', name: 'Professional', icon: Award, prompt: 'Write in a professional, corporate tone. Focus on business value and results. Use formal language but keep it accessible.' },
  { id: 'humble-brag', name: 'Humble Brag', icon: Sparkles, prompt: 'Write in a "humble brag" style. Start with a challenge or failure, then explain how you overcame it to achieve massive success. Be "grateful" and "honored".' },
  { id: 'storyteller', name: 'Storyteller', icon: MessageSquareText, prompt: 'Tell a compelling story. Focus on the journey, the emotions, and the "lessons learned". Make it relatable.' },
];
