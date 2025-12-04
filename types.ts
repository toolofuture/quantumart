export interface VerificationResult {
  authenticityScore: number; // 0 to 100
  verdict: 'AUTHENTIC' | 'POTENTIAL FORGERY' | 'REPRODUCTION' | 'UNKNOWN';
  artistName: string;
  estimatedEra: string;
  gallerySellingPoints: string[];
  visualAnalysis: string;
  networkMatches: {
    galleryName: string;
    similarityScore: number;
    notes: string;
  }[];
  quantumHash: string; // Simulated hash
}

export enum AppState {
  IDLE,
  ANALYZING,
  RESULT,
  ERROR
}
