import React from 'react';
import { Linkedin, Settings2 } from 'lucide-react';
import { MODELS } from '../constants';

interface HeaderProps {
  selectedModel: string;
  onModelChange: (val: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ selectedModel, onModelChange }) => (
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
              onChange={(e) => onModelChange(e.target.value)}
              className="bg-transparent border-none focus:ring-0 cursor-pointer hover:text-[#0A66C2] transition-colors font-bold"
            >
              {MODELS.map(m => (
                <option key={m.id} value={m.id} disabled={m.disabled}>{m.name}</option>
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
);
