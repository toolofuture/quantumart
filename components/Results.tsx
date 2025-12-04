import React from 'react';
import { VerificationResult } from '../types';
import { CheckCircle2, AlertTriangle, XCircle, Globe, BarChart3, Fingerprint } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface ResultsProps {
  result: VerificationResult;
  onReset: () => void;
  imagePreview: string;
}

export const Results: React.FC<ResultsProps> = ({ result, onReset, imagePreview }) => {
  const isAuthentic = result.verdict === 'AUTHENTIC';
  const isFake = result.verdict === 'POTENTIAL FORGERY' || result.verdict === 'REPRODUCTION';
  
  const scoreColor = isAuthentic ? 'text-emerald-400' : isFake ? 'text-red-400' : 'text-amber-400';
  const borderColor = isAuthentic ? 'border-emerald-500/50' : isFake ? 'border-red-500/50' : 'border-amber-500/50';

  const chartData = [
    { name: 'Authenticity', value: result.authenticityScore },
    { name: 'Risk', value: 100 - result.authenticityScore }
  ];
  const COLORS = [isAuthentic ? '#34d399' : '#f87171', '#1e293b'];

  return (
    <div className="w-full max-w-5xl mx-auto animate-fade-in-up pb-20">
      
      {/* Top Summary Card */}
      <div className={`bg-slate-900/80 backdrop-blur border ${borderColor} rounded-2xl p-8 mb-8 shadow-2xl relative overflow-hidden`}>
        <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${isAuthentic ? 'from-emerald-500 to-cyan-500' : 'from-red-500 to-amber-500'}`}></div>
        
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Left: Verdict */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-3 mb-2">
              {isAuthentic ? (
                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
              ) : (
                <AlertTriangle className="w-8 h-8 text-red-400" />
              )}
              <span className="text-sm font-mono text-slate-400 tracking-wider">{result.quantumHash}</span>
            </div>
            <h2 className={`text-5xl md:text-6xl font-serif font-bold ${scoreColor} tracking-tight`}>
              {result.verdict}
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed max-w-2xl border-l-4 border-slate-700 pl-4 italic">
              "{result.visualAnalysis}"
            </p>
          </div>

          {/* Right: Score Chart */}
          <div className="relative h-48 w-full flex flex-col items-center justify-center">
             <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    startAngle={180}
                    endAngle={0}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
             </ResponsiveContainer>
             <div className="absolute -bottom-2 text-center">
               <span className={`text-4xl font-bold ${scoreColor}`}>{result.authenticityScore}%</span>
               <p className="text-xs text-slate-500 uppercase tracking-widest">Authenticity Probability</p>
             </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Column 1: Artwork Details */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
            <img src={imagePreview} alt="Analyzed Art" className="w-full h-auto rounded-lg shadow-lg mb-4 opacity-90" />
            <div className="space-y-2">
              <div>
                <p className="text-xs text-slate-500 uppercase">Artist Attribution</p>
                <p className="text-xl font-serif text-cyan-100">{result.artistName}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase">Estimated Era</p>
                <p className="text-slate-300">{result.estimatedEra}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Column 2: Gallery Selling Points */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
              <BarChart3 className="text-purple-400" />
              <h3 className="text-xl font-serif text-slate-200">Gallery Market & Selling Points</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {result.gallerySellingPoints.map((point, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-slate-950/50 p-4 rounded-lg border border-slate-800/50">
                  <div className="min-w-[1.5rem] h-6 flex items-center justify-center rounded-full bg-purple-900/30 text-purple-400 text-xs font-bold border border-purple-500/20">
                    {idx + 1}
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">{point}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
             <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
              <Globe className="text-cyan-400" />
              <h3 className="text-xl font-serif text-slate-200">Global Network Matches</h3>
            </div>
            <div className="space-y-3">
              {result.networkMatches.map((match, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-800/50 transition-colors border-b border-slate-800 last:border-0">
                  <div>
                    <p className="font-medium text-cyan-100">{match.galleryName}</p>
                    <p className="text-xs text-slate-400">{match.notes}</p>
                  </div>
                  <div className="text-right">
                    <span className="block text-lg font-bold text-cyan-500">{match.similarityScore}%</span>
                    <span className="text-[10px] text-slate-500 uppercase">Match Rate</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <div className="mt-12 text-center">
        <button 
          onClick={onReset}
          className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-full font-medium transition-all hover:scale-105 border border-slate-600"
        >
          Analyze Another Piece
        </button>
      </div>

    </div>
  );
};
