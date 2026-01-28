
import React from 'react';
import { Heart, Star, Clock, MapPin, Calendar } from 'lucide-react';
import { Offer } from '../types';

interface OfferCardProps {
  offer: Offer;
  onBuy: (offer: Offer) => void;
}

const OfferCard: React.FC<OfferCardProps> = ({ offer, onBuy }) => {
  const isLowStock = offer.remaining < 3;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (dateStr === today.toISOString().split('T')[0]) return 'Today';
    if (dateStr === tomorrow.toISOString().split('T')[0]) return 'Tomorrow';
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  };

  const displayDate = offer.pickupDate.includes('-') ? formatDate(offer.pickupDate) : offer.pickupDate;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full group">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={offer.imageUrl} 
          alt={offer.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <button className="absolute top-3 right-3 bg-white/90 p-1.5 rounded-full hover:bg-white transition-colors">
          <Heart className="w-5 h-5 text-gray-600 hover:text-[#D62828]" />
        </button>
        {isLowStock && (
          <span className="absolute top-3 left-3 bg-[#D62828] text-white text-xs px-2 py-1 rounded font-medium shadow-sm">
            {offer.remaining} left
          </span>
        )}
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-bold text-lg text-gray-900 leading-tight line-clamp-1">{offer.restaurantName}</h3>
          <div className="flex items-center text-sm font-bold text-gray-900">
             <Star className="w-3 h-3 text-[#D62828] fill-current mr-1" />
             {offer.rating}
          </div>
        </div>
        
        <h4 className="text-gray-600 text-sm mb-2 font-medium">{offer.title}</h4>
        
        <div className="flex flex-col gap-1 text-xs text-gray-500 mb-3">
             <div className="flex items-center">
                 <Calendar className="w-3 h-3 mr-1.5" />
                 {displayDate}
             </div>
             <div className="flex items-center">
                 <Clock className="w-3 h-3 mr-1.5" />
                 {offer.pickupTimeStart} - {offer.pickupTimeEnd}
             </div>
             {offer.distance > 0 && (
               <div className="flex items-center">
                   <MapPin className="w-3 h-3 mr-1.5" />
                   {offer.distance} km
               </div>
             )}
        </div>

        <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-50">
            <div>
                <span className="text-lg font-extrabold text-gray-900">€{offer.price.toFixed(2)}</span>
            </div>
            <button 
                onClick={() => onBuy(offer)}
                className="bg-[#D62828] text-white hover:bg-red-700 text-sm font-bold px-6 py-2 rounded-lg transition-colors"
            >
                Reserve
            </button>
        </div>
      </div>
    </div>
  );
};

export default OfferCard;
