/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useLinkedInTranslator } from './hooks/useLinkedInTranslator';
import { Header } from './components/Header';
import { ApiKeyPanel } from './components/ApiKeyPanel';
import { InputSection } from './components/InputSection';
import { OutputSection } from './components/OutputSection';
import { Footer } from './components/Footer';

export default function App() {
  const {
    input, setInput,
    output, setOutput,
    isLoading,
    selectedModel, setSelectedModel,
    selectedTone, setSelectedTone,
    customApiKey, setCustomApiKey,
    error,
    translate
  } = useLinkedInTranslator();

  return (
    <div className="min-h-screen bg-[#F4F2EE] font-sans text-[#000000e6] flex flex-col">
      <Header 
        selectedModel={selectedModel} 
        onModelChange={setSelectedModel} 
      />

      <main className="max-w-5xl w-full mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 flex-grow">
        <div className="lg:col-span-7 space-y-6">
          <ApiKeyPanel 
            selectedModel={selectedModel} 
            customApiKey={customApiKey} 
            onKeyChange={setCustomApiKey} 
          />

          <InputSection 
            input={input}
            setInput={setInput}
            selectedTone={selectedTone}
            setSelectedTone={setSelectedTone}
            onTranslate={translate}
            isLoading={isLoading}
          />

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg text-sm">
              {error}
            </div>
          )}
        </div>

        <OutputSection 
          output={output} 
          setOutput={setOutput} 
        />
      </main>

      <Footer />
    </div>
  );
}
