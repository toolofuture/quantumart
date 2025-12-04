import React, { ChangeEvent } from 'react';
import { Upload, ImageIcon } from 'lucide-react';

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
}

export const UploadZone: React.FC<UploadZoneProps> = ({ onFileSelect }) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-12">
      <label className="group relative flex flex-col items-center justify-center w-full h-80 rounded-xl border-2 border-dashed border-slate-600 bg-slate-900/50 cursor-pointer transition-all hover:border-cyan-400 hover:bg-slate-900/80 overflow-hidden">
        
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-cyan-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="flex flex-col items-center justify-center pt-5 pb-6 z-10 text-slate-400 group-hover:text-cyan-400 transition-colors">
          <div className="mb-4 p-4 rounded-full bg-slate-800 group-hover:bg-slate-800/80 ring-1 ring-slate-700 group-hover:ring-cyan-500/50 transition-all duration-300 group-hover:scale-110 shadow-lg shadow-black/50">
            <Upload className="w-10 h-10" />
          </div>
          <p className="mb-2 text-lg font-serif text-slate-300 group-hover:text-white">
            Drag & Drop Artwork or Click to Upload
          </p>
          <p className="text-xs text-slate-500 uppercase tracking-wider group-hover:text-cyan-300/70">
            Supports JPG, PNG, WEBP (Max 10MB)
          </p>
        </div>
        <input 
          type="file" 
          className="hidden" 
          accept="image/*" 
          onChange={handleInputChange}
        />
      </label>
      
      <div className="mt-8 grid grid-cols-3 gap-4 text-center opacity-60">
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-1 bg-purple-500 rounded-full"></div>
          <p className="text-xs text-slate-400 uppercase">Deep Pattern Analysis</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-1 bg-cyan-500 rounded-full"></div>
          <p className="text-xs text-slate-400 uppercase">Global Gallery Sync</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-1 bg-emerald-500 rounded-full"></div>
          <p className="text-xs text-slate-400 uppercase">Market Valuation Logic</p>
        </div>
      </div>
    </div>
  );
};
