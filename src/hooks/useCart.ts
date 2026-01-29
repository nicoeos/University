
import { useLocalStorage } from './useLocalStorage';
import { Offer } from '../types';

export const useCart = () => {
    return useLocalStorage<Offer[]>('crous_orders', []);
};
