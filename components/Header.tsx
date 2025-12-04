import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="w-full py-6 px-8 flex items-center justify-between border-b border-cyan-900/30 bg-slate-950/50 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="relative">
          <ShieldCheck className="w-8 h-8 text-cyan-400" />
          <div className="absolute inset-0 bg-cyan-400 blur-lg opacity-30 animate-pulse"></div>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-400 serif-font tracking-wider">
            QuantumArt
          </h1>
          <p className="text-xs text-cyan-700 tracking-[0.2em] uppercase">Global Verification Network</p>
        </div>
      </div>
      <div className="hidden md:flex items-center gap-4 text-xs font-mono text-cyan-600">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          <span>NETWORK: ONLINE</span>
        </div>
        <span>NODES: 14,203,991</span>
      </div>
    </header>
  );
};
