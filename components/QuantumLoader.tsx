import React, { useEffect, useState } from 'react';

const STEPS = [
  "Initializing Quantum Core...",
  "Scanning Canvas Topography...",
  "Connecting to Sotheby's Archive Node...",
  "Cross-referencing Louvre Database...",
  "Analyzing Pigment Spectroscopy...",
  "Calculating Brushstroke Variance...",
  "Verifying Provenance Hash...",
  "Synthesizing Final Probability..."
];

export const QuantumLoader: React.FC = () => {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % STEPS.length);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-96 w-full relative overflow-hidden rounded-xl bg-slate-950 border border-cyan-900/50 shadow-2xl shadow-cyan-900/20">
      {/* Background Grid Animation */}
      <div className="absolute inset-0 opacity-20" 
           style={{ 
             backgroundImage: 'linear-gradient(rgba(6,182,212,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.1) 1px, transparent 1px)', 
             backgroundSize: '20px 20px' 
           }}>
      </div>

      {/* Central Atom/Quantum Visual */}
      <div className="relative w-32 h-32 mb-8">
        <div className="absolute inset-0 border-4 border-cyan-500/30 rounded-full animate-[spin_3s_linear_infinite]"></div>
        <div className="absolute inset-0 border-4 border-purple-500/30 rounded-full animate-[spin_4s_linear_infinite_reverse] scale-75"></div>
        <div className="absolute inset-0 border-4 border-emerald-500/30 rounded-full animate-[spin_2s_linear_infinite] scale-50"></div>
        <div className="absolute inset-0 m-auto w-4 h-4 bg-white rounded-full blur-sm animate-pulse shadow-[0_0_20px_rgba(255,255,255,0.8)]"></div>
      </div>

      {/* Text Stream */}
      <h3 className="text-xl font-mono text-cyan-400 mb-2 tracking-widest animate-pulse">PROCESSING</h3>
      <p className="text-sm text-slate-400 font-mono min-h-[1.5rem]">
        {">"} {STEPS[stepIndex]}
      </p>
      
      {/* Scanning Line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400/50 shadow-[0_0_15px_rgba(34,211,238,0.8)] animate-[scan_2s_ease-in-out_infinite]"></div>
      
      <style>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
};
