
import React from 'react';
import RestaurantDashboard from '../components/RestaurantDashboard';
import { Offer } from '../types';
import { CROUS_LOCATIONS } from '../data/locations';

interface RestaurantDashboardPageProps {
    offers: Offer[];
    setOffers: React.Dispatch<React.SetStateAction<Offer[]>>;
}

const RestaurantDashboardPage: React.FC<RestaurantDashboardPageProps> = ({ offers, setOffers }) => {
    return (
        <RestaurantDashboard
            offers={offers}
            setOffers={setOffers}
            locations={CROUS_LOCATIONS.filter(l => l !== "All Locations")}
        />
    );
};

export default RestaurantDashboardPage;
