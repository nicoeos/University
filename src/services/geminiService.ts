
import { GoogleGenAI, Type } from "@google/genai";

// Initialize the Gemini client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Fix: Added missing getRecipeSuggestion function required by RecipeModal
export const getRecipeSuggestion = async (tags: string[]): Promise<string> => {
  try {
    const prompt = `
      I just rescued a surplus food bag with these items/characteristics: ${tags.join(', ')}.
      Suggest a creative, simple recipe or a way to reheat/combine these items to make a delicious meal.
      Keep it brief and practical for a student.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text?.trim() || "No recipe suggestion available.";
  } catch (error) {
    console.error("Error getting recipe suggestion:", error);
    return "Couldn't cook up a recipe right now. Try again later!";
  }
};

export const generateOfferDescription = async (title: string, tags: string[]): Promise<string> => {
  try {
    const prompt = `
      Write a short, appetizing description (max 20 words) for a food offer named "${title}".
      It has these characteristics: ${tags.join(', ')}.
      Make it sound delicious but urgent to save food waste.
      Return ONLY the text description.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text?.trim() || "A delicious surprise waiting to be rescued!";
  } catch (error) {
    console.error("Error generating description:", error);
    return "Freshly prepared food looking for a home.";
  }
};

// Fix: Updated suggestSmartTags to use responseSchema and Type as recommended in guidelines
export const suggestSmartTags = async (title: string): Promise<string[]> => {
  try {
    const prompt = `
      Given the food item "${title}", suggest 3 relevant category tags from this list: 
      [Vegetarian, Halal, Meals, Snacks, Dessert, Healthy].
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: { 
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.STRING
          }
        }
      }
    });

    const text = response.text;
    if (!text) return ["Meals"];
    return JSON.parse(text);
  } catch (error) {
    console.error("Error suggesting tags:", error);
    return ["Meals"];
  }
};
