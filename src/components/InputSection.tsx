import React from 'react';
import { MessageSquareText, RefreshCw, Sparkles } from 'lucide-react';
import { TONES } from '../constants';
import { cn } from '../lib/utils';

interface InputSectionProps {
  input: string;
  setInput: (v: string) => void;
  selectedTone: string;
  setSelectedTone: (v: string) => void;
  onTranslate: () => void;
  isLoading: boolean;
}

export const InputSection: React.FC<InputSectionProps> = ({ 
  input, setInput, 
  selectedTone, setSelectedTone, 
  onTranslate, isLoading 
}) => (
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
        onClick={onTranslate}
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
);
