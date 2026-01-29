
import { useLocalStorage } from './useLocalStorage';
import { Offer } from '../types';
import { INITIAL_OFFERS } from '../data/offers';

export const useOffers = () => {
    return useLocalStorage<Offer[]>('crous_offers', INITIAL_OFFERS);
};
