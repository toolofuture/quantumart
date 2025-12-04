import { GoogleGenAI, Type } from "@google/genai";
import { VerificationResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Helper to convert file to Base64
const fileToGenerativePart = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
      const base64Data = base64String.split(',')[1];
      resolve(base64Data);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const verifyArtwork = async (file: File): Promise<VerificationResult> => {
  try {
    const base64Data = await fileToGenerativePart(file);

    const model = "gemini-2.5-flash";
    
    const prompt = `
      Act as "QuantumArt", an advanced AI art authenticator with access to a simulated global gallery network database.
      
      Analyze the provided image of an artwork. 
      Simulate a quantum search across millions of gallery records to determine if this piece is likely Authentic or a Fake/Reproduction.
      
      Provide:
      1. An authenticity probability score (0-100).
      2. A verdict (AUTHENTIC, POTENTIAL FORGERY, REPRODUCTION, or UNKNOWN).
      3. Identify the likely artist and era.
      4. List "Selling Points" - specific artistic qualities that a high-end gallery would value (provenance, brushwork quality, rarity).
      5. A technical visual analysis explaining *why* you made this judgment (e.g., analyzing cracking patterns, pigment capability, stroke confidence).
      6. Simulate "Network Matches" - listing specific famous galleries (e.g., Tate, Louvre, Sotheby's archives) and how closely this matches verified works there.
      7. Generate a random "Quantum Hash" string for the verification ID.

      Analyze strictly and critically. Do not be vague.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: file.type,
              data: base64Data
            }
          },
          { text: prompt }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            authenticityScore: { type: Type.NUMBER, description: "Probability of authenticity 0-100" },
            verdict: { type: Type.STRING, enum: ["AUTHENTIC", "POTENTIAL FORGERY", "REPRODUCTION", "UNKNOWN"] },
            artistName: { type: Type.STRING },
            estimatedEra: { type: Type.STRING },
            gallerySellingPoints: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING } 
            },
            visualAnalysis: { type: Type.STRING },
            networkMatches: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  galleryName: { type: Type.STRING },
                  similarityScore: { type: Type.NUMBER },
                  notes: { type: Type.STRING }
                }
              }
            },
            quantumHash: { type: Type.STRING }
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as VerificationResult;
    } else {
      throw new Error("No response from verification network.");
    }
  } catch (error) {
    console.error("Verification failed:", error);
    throw error;
  }
};
