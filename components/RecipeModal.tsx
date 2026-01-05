import React, { useEffect, useState } from 'react';
import { X, ChefHat, Sparkles } from 'lucide-react';
import { Offer } from '../types';
import { getRecipeSuggestion } from '../services/geminiService';

interface RecipeModalProps {
  isOpen: boolean;
  onClose: () => void;
  offer: Offer | null;
}

const RecipeModal: React.FC<RecipeModalProps> = ({ isOpen, onClose, offer }) => {
  const [recipe, setRecipe] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && offer) {
      setLoading(true);
      setRecipe('');
      getRecipeSuggestion(offer.tags)
        .then((text) => setRecipe(text))
        .catch(() => setRecipe("Couldn't cook up a recipe right now. Try again later!"))
        .finally(() => setLoading(false));
    }
  }, [isOpen, offer]);

  if (!isOpen || !offer) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl relative overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-[#D62828] p-6 text-white">
            <button onClick={onClose} className="absolute top-4 right-4 text-white/80 hover:text-white">
                <X className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-3 mb-2">
                <div className="bg-white/20 p-2 rounded-lg">
                    <ChefHat className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">AI Chef Assistant</h3>
            </div>
            <p className="text-white/80 text-sm">
                Creative ideas for your {offer.tags.join(', ')} bag from {offer.restaurantName}.
            </p>
        </div>

        {/* Content */}
        <div className="p-6">
            {loading ? (
                <div className="space-y-4 py-8 text-center">
                    <Sparkles className="w-8 h-8 text-[#D62828] mx-auto animate-spin-slow" />
                    <p className="text-gray-500 animate-pulse">Consulting the digital cookbook...</p>
                </div>
            ) : (
                <div className="prose prose-sm max-w-none text-gray-700">
                    <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4 text-sm whitespace-pre-line leading-relaxed">
                        {recipe}
                    </div>
                </div>
            )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end">
            <button 
                onClick={onClose}
                className="text-gray-600 font-bold text-sm hover:text-gray-900 px-4 py-2"
            >
                Close
            </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;