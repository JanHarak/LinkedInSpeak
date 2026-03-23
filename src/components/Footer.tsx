import React from 'react';
import { Linkedin } from 'lucide-react';

export const Footer: React.FC = () => (
  <footer className="w-full max-w-5xl mx-auto px-4 py-8 text-center text-[#666666] text-sm border-t border-[#e0e0e0] mt-auto">
    <p>© 2026 LinkedIn Speak Translator.</p>
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
);
