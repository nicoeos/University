import React from 'react';
import { Offer } from '../types';
import StatsOverview from './dashboard/StatsOverview';
import NewOfferForm from './dashboard/NewOfferForm';

interface RestaurantDashboardProps {
    offers: Offer[];
    setOffers: React.Dispatch<React.SetStateAction<Offer[]>>;
    locations: string[];
}

const RestaurantDashboard: React.FC<RestaurantDashboardProps> = ({ offers, setOffers, locations }) => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">

            <div className="lg:col-span-1">
                <StatsOverview />
            </div>

            <div className="lg:col-span-2">
                <NewOfferForm
                    offers={offers}
                    setOffers={setOffers}
                    locations={locations}
                />
            </div>
        </div>
    );
};

export default RestaurantDashboard;
