import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { MODELS } from '../constants';

interface ApiKeyPanelProps {
  selectedModel: string;
  customApiKey: string;
  onKeyChange: (val: string) => void;
}

export const ApiKeyPanel: React.FC<ApiKeyPanelProps> = ({ selectedModel, customApiKey, onKeyChange }) => (
  <AnimatePresence>
    {selectedModel !== 'gemini-2.5-flash' && (
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className="overflow-hidden"
      >
        <div className="bg-white rounded-xl border-2 border-[#0A66C2] p-4 shadow-md mb-4">
          <label className="block text-sm font-bold text-[#0A66C2] mb-2 flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Vložte svůj API klíč pro {MODELS.find(m => m.id === selectedModel)?.name}
          </label>
          <input
            type="password"
            value={customApiKey}
            onChange={(e) => onKeyChange(e.target.value)}
            placeholder="AI_Studio_API_Key..."
            className="w-full px-3 py-2 border border-[#e0e0e0] rounded-lg focus:ring-2 focus:ring-[#0A66C2] focus:border-transparent outline-none transition-all"
          />
          <p className="mt-2 text-[10px] text-[#666666]">
            Tento klíč bude použit pouze pro aktuální sezení a nebude nikam ukládán.
          </p>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);
