/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback } from 'react';
import { GoogleGenAI } from "@google/genai";
import { 
  Send, 
  Copy, 
  Check, 
  Linkedin, 
  Sparkles, 
  RefreshCw, 
  Settings2,
  ChevronDown,
  MessageSquareText,
  TrendingUp,
  Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Markdown from 'react-markdown';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const MODELS = [
  { id: 'gemini-3.1-flash-lite-preview', name: 'Gemini 3.1 Flash Lite', description: 'Lightweight and efficient', disabled: true },
  { id: 'gemini-3-flash-preview', name: 'Gemini 3 Flash (Fast)', description: 'Best for quick translations', disabled: true },
  { id: 'gemini-3.1-pro-preview', name: 'Gemini 3.1 Pro (Smart)', description: 'Best for complex reasoning and nuance', disabled: true },
  { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash', description: 'Reliable previous generation model', disabled: false },
  { id: 'gemini-flash-latest', name: 'Gemini Flash (Stable)', description: 'Stable version of the Flash model', disabled: true },
];

const TONES = [
  { id: 'thought-leader', name: 'Thought Leader', icon: TrendingUp, prompt: 'Write as a visionary thought leader. Use short, punchy sentences. Start with a hook. Use bullet points. End with a question to drive engagement.' },
  { id: 'professional', name: 'Professional', icon: Award, prompt: 'Write in a professional, corporate tone. Focus on business value and results. Use formal language but keep it accessible.' },
  { id: 'humble-brag', name: 'Humble Brag', icon: Sparkles, prompt: 'Write in a "humble brag" style. Start with a challenge or failure, then explain how you overcame it to achieve massive success. Be "grateful" and "honored".' },
  { id: 'storyteller', name: 'Storyteller', icon: MessageSquareText, prompt: 'Tell a compelling story. Focus on the journey, the emotions, and the "lessons learned". Make it relatable.' },
];

export default function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('gemini-2.5-flash');
  const [selectedTone, setSelectedTone] = useState(TONES[0].id);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const translateToLinkedIn = useCallback(async () => {
    if (!input.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
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
  }, [input, selectedModel, selectedTone]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F4F2EE] font-sans text-[#000000e6] flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-[#e0e0e0] px-4 py-2 shadow-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-[#0A66C2] p-1.5 rounded">
              <Linkedin className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-[#0A66C2]">LinkedIn Speak</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col items-end gap-0 text-xs font-medium text-[#666666]">
              <div className="flex items-center gap-2">
                <Settings2 className="w-4 h-4" />
                <span>Model:</span>
                <select 
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="bg-transparent border-none focus:ring-0 cursor-pointer hover:text-[#0A66C2] transition-colors font-bold"
                >
                  {MODELS.map(m => (
                    <option key={m.id} value={m.id} disabled={m.disabled}>{m.name}{m.disabled ? ' (Inactive)' : ''}</option>
                  ))}
                </select>
              </div>
              <span className="text-[10px] opacity-70">
                {MODELS.find(m => m.id === selectedModel)?.description}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl w-full mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 flex-grow">
        {/* Left Column: Input & Controls */}
        <div className="lg:col-span-7 space-y-6">
          <section className="bg-white rounded-xl border border-[#e0e0e0] shadow-sm overflow-hidden">
            <div className="p-4 border-b border-[#f0f0f0] flex items-center justify-between">
              <h2 className="font-semibold text-lg flex items-center gap-2">
                <MessageSquareText className="w-5 h-5 text-[#0A66C2]" />
                What's on your mind?
              </h2>
              <div className="text-xs text-[#666666]">
                {input.length} characters
              </div>
            </div>
            <div className="p-4">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste your raw thoughts, a work update, or a project summary here..."
                className="w-full h-48 p-4 bg-[#F9FAFB] border border-[#e0e0e0] rounded-lg focus:ring-2 focus:ring-[#0A66C2] focus:border-transparent transition-all resize-none placeholder:text-[#999999]"
              />
            </div>
            <div className="p-4 bg-[#F9FAFB] border-t border-[#f0f0f0] flex flex-wrap gap-2">
              {TONES.map(tone => (
                <button
                  key={tone.id}
                  onClick={() => setSelectedTone(tone.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all",
                    selectedTone === tone.id 
                      ? "bg-[#0A66C2] text-white shadow-md" 
                      : "bg-white border border-[#e0e0e0] text-[#666666] hover:border-[#0A66C2] hover:text-[#0A66C2]"
                  )}
                >
                  <tone.icon className="w-4 h-4" />
                  {tone.name}
                </button>
              ))}
            </div>
            <div className="p-4 flex justify-end">
              <button
                onClick={translateToLinkedIn}
                disabled={isLoading || !input.trim()}
                className="flex items-center gap-2 bg-[#0A66C2] hover:bg-[#004182] disabled:bg-[#cccccc] text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg active:scale-95"
              >
                {isLoading ? (
                  <RefreshCw className="w-5 h-5 animate-spin" />
                ) : (
                  <Sparkles className="w-5 h-5" />
                )}
                {isLoading ? 'Translating...' : 'Translate to LinkedIn'}
              </button>
            </div>
          </section>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg text-sm">
              {error}
            </div>
          )}
        </div>

        {/* Right Column: Output */}
        <div className="lg:col-span-5">
          <AnimatePresence mode="wait">
            {output ? (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-xl border border-[#e0e0e0] shadow-sm overflow-hidden sticky top-24"
              >
                <div className="p-4 border-b border-[#f0f0f0] flex items-center justify-between bg-[#F9FAFB]">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#0A66C2] rounded-full flex items-center justify-center">
                      <Linkedin className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-semibold text-sm">LinkedIn Preview</span>
                  </div>
                  <button
                    onClick={copyToClipboard}
                    className="p-2 hover:bg-[#f0f0f0] rounded-full transition-colors text-[#666666]"
                    title="Copy to clipboard"
                  >
                    {copied ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
                <div className="p-6 prose prose-sm max-w-none">
                  <div className="whitespace-pre-wrap text-[#000000e6] leading-relaxed">
                    <Markdown>{output}</Markdown>
                  </div>
                </div>
                <div className="p-4 border-t border-[#f0f0f0] bg-[#F9FAFB] flex justify-between items-center">
                  <span className="text-xs text-[#666666]">Ready to post!</span>
                  <button 
                    onClick={() => setOutput('')}
                    className="text-xs font-semibold text-[#0A66C2] hover:underline"
                  >
                    Clear result
                  </button>
                </div>
              </motion.section>
            ) : (
              <div className="h-full min-h-[400px] border-2 border-dashed border-[#e0e0e0] rounded-xl flex flex-col items-center justify-center p-8 text-center text-[#666666]">
                <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                  <TrendingUp className="w-8 h-8 text-[#0A66C2]" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Your post will appear here</h3>
                <p className="text-sm max-w-[240px]">
                  Select a tone and click translate to see the LinkedIn magic happen.
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-5xl mx-auto px-4 py-8 text-center text-[#666666] text-sm border-t border-[#e0e0e0] mt-auto">
        <p>© 2026 LinkedIn Speak Translator. Built with Gemini AI.</p>
        <div className="mt-4 flex flex-col items-center gap-2">
          <a 
            href="https://www.linkedin.com/in/jan-har%C3%A1k/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-[#0A66C2] transition-colors font-medium"
          >
            <Linkedin className="w-4 h-4" />
            <span>Jan Harák</span>
          </a>
        </div>
        <div className="mt-4 flex justify-center gap-4 opacity-60">
          <a href="#" className="hover:text-[#0A66C2] transition-colors">Privacy</a>
          <a href="#" className="hover:text-[#0A66C2] transition-colors">Terms</a>
          <a href="#" className="hover:text-[#0A66C2] transition-colors">Support</a>
        </div>
      </footer>
    </div>
  );
}
