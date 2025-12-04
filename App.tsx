import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { UploadZone } from './components/UploadZone';
import { QuantumLoader } from './components/QuantumLoader';
import { Results } from './components/Results';
import { verifyArtwork } from './services/geminiService';
import { AppState, VerificationResult } from './types';
import { AlertCircle } from 'lucide-react';

export default function App() {
  const [state, setState] = useState<AppState>(AppState.IDLE);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  const handleFileSelect = useCallback(async (file: File) => {
    // Create preview
    const objectUrl = URL.createObjectURL(file);
    setImagePreview(objectUrl);
    
    setState(AppState.ANALYZING);
    setError(null);

    try {
      // Simulate a slight delay if API is too fast to show the animation :)
      const [apiResult] = await Promise.all([
        verifyArtwork(file),
        new Promise(resolve => setTimeout(resolve, 4000)) // Minimum 4s quantum simulation
      ]);
      
      setResult(apiResult);
      setState(AppState.RESULT);
    } catch (err) {
      console.error(err);
      setError("The Quantum Network could not process this image. Please ensure it is a clear image file.");
      setState(AppState.ERROR);
    }
  }, []);

  const handleReset = () => {
    setState(AppState.IDLE);
    setResult(null);
    setImagePreview('');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-cyan-500/30">
      <Header />
      
      <main className="container mx-auto px-4 py-8 md:py-12 relative">
        
        {/* Background Ambient Effects */}
        <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-cyan-900/20 rounded-full blur-3xl pointer-events-none -z-10"></div>
        <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

        <div className="flex flex-col items-center min-h-[60vh]">
          
          {state === AppState.IDLE && (
            <div className="w-full flex flex-col items-center animate-fade-in">
              <div className="text-center max-w-2xl mb-8">
                <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4 leading-tight">
                  Verify Authenticity with <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Quantum Precision</span>
                </h2>
                <p className="text-slate-400 text-lg">
                  Replacing the need for physical gallery inspections. Our AI instantly checks brushwork against the global blockchain of art history.
                </p>
              </div>
              <UploadZone onFileSelect={handleFileSelect} />
            </div>
          )}

          {state === AppState.ANALYZING && (
             <div className="w-full max-w-xl mx-auto mt-10">
               <QuantumLoader />
             </div>
          )}

          {state === AppState.RESULT && result && (
            <Results 
              result={result} 
              onReset={handleReset} 
              imagePreview={imagePreview}
            />
          )}

          {state === AppState.ERROR && (
            <div className="w-full max-w-lg mx-auto mt-20 p-8 bg-red-950/20 border border-red-900/50 rounded-xl text-center">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-red-400 mb-2">Verification Failed</h3>
              <p className="text-slate-400 mb-6">{error}</p>
              <button 
                onClick={handleReset}
                className="px-6 py-2 bg-red-900/50 hover:bg-red-900 text-red-100 rounded-lg transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

        </div>
      </main>

      <footer className="w-full py-6 text-center text-slate-600 text-xs border-t border-slate-900 mt-auto">
        <p>QUANTUMART VERIFIER © 2024 | POWERED BY GEMINI 2.5 FLASH</p>
      </footer>
    </div>
  );
}
