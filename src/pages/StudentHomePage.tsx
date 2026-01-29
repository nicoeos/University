
import React, { useState } from 'react';
import { MapPin, ChevronDown, Search } from 'lucide-react';
import OfferCard from '../components/OfferCard';
import { Offer, DietType } from '../types';
import { CROUS_LOCATIONS } from '../data/locations';
import { CATEGORIES } from '../data/constants';

interface StudentHomePageProps {
    offers: Offer[];
    onBuy: (offer: Offer) => void;
}

const StudentHomePage: React.FC<StudentHomePageProps> = ({ offers, onBuy }) => {
    const [selectedCategory, setSelectedCategory] = useState<DietType>(DietType.ALL);
    const [selectedLocation, setSelectedLocation] = useState<string>('All Locations');

    const filteredOffers = offers.filter(offer => {
        const matchesCategory = selectedCategory === DietType.ALL || offer.tags.includes(selectedCategory);
        const matchesLocation = selectedLocation === 'All Locations' || offer.restaurantName === selectedLocation;

        return matchesCategory && matchesLocation;
    });

    return (
        <main>
            <div className="bg-white border-b border-gray-200 sticky top-16 z-40 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-3">
                    <div className="relative max-w-md">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MapPin className="h-5 w-5 text-[#D62828]" />
                        </div>
                        <select
                            value={selectedLocation}
                            onChange={(e) => setSelectedLocation(e.target.value)}
                            className="block w-full pl-10 pr-8 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#D62828] appearance-none cursor-pointer transition-colors"
                        >
                            {CROUS_LOCATIONS.map(loc => (
                                <option key={loc} value={loc}>{loc}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 py-3 overflow-x-auto no-scrollbar">
                    <div className="flex space-x-2 min-w-max">
                        {CATEGORIES.map((cat) => {
                            const Icon = cat.icon;
                            const isSelected = selectedCategory === cat.id;
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`flex items-center px-4 py-2 rounded-full text-sm font-bold transition-all transform active:scale-95 whitespace-nowrap ${isSelected
                                            ? 'bg-[#D62828] text-white shadow-md'
                                            : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300'
                                        }`}
                                >
                                    <Icon className={`w-4 h-4 mr-2 ${isSelected ? 'text-white' : 'text-gray-400'}`} />
                                    {cat.label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <span className="bg-[#D62828] w-2 h-8 rounded-full block"></span>
                    {selectedLocation === 'All Locations' ? 'Top picks near you' : `Offers at ${selectedLocation}`}
                </h2>

                {filteredOffers.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="w-10 h-10 text-gray-400" />
                        </div>
                        <p className="text-xl font-medium text-gray-600">No bags found.</p>
                        <p className="text-gray-500 mt-2">Try adjusting your filters or location.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredOffers.map(offer => (
                            <div key={offer.id} className="h-full">
                                <OfferCard
                                    offer={offer}
                                    onBuy={onBuy}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
};

export default StudentHomePage;
