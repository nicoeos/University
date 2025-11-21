import { GoogleGenAI } from "@google/genai";

// Initialize the Gemini client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateOfferDescription = async (title: string, tags: string[]): Promise<string> => {
  try {
    const prompt = `
      Write a short, appetizing description (max 20 words) for a food offer named "${title}".
      It has these characteristics: ${tags.join(', ')}.
      Make it sound delicious but urgent to save food waste.
      Return ONLY the text description.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text?.trim() || "A delicious mystery surprise waiting to be rescued!";
  } catch (error) {
    console.error("Error generating description:", error);
    return "Freshly prepared food looking for a home.";
  }
};

export const suggestSmartTags = async (title: string): Promise<string[]> => {
  try {
    const prompt = `
      Given the food item "${title}", suggest 3 relevant category tags from this list: 
      [Vegetarian, Halal, Meals, Snacks, Dessert, Healthy].
      Return result as a JSON array of strings only.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: { responseMimeType: 'application/json' }
    });

    const text = response.text;
    if (!text) return ["Meals"];
    return JSON.parse(text);
  } catch (error) {
    console.error("Error suggesting tags:", error);
    return ["Meals"];
  }
};