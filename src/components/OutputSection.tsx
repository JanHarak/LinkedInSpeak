import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Linkedin, Check, Copy, TrendingUp } from 'lucide-react';
import Markdown from 'react-markdown';

interface OutputSectionProps {
  output: string;
  setOutput: (v: string) => void;
}

export const OutputSection: React.FC<OutputSectionProps> = ({ output, setOutput }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
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
  );
};
