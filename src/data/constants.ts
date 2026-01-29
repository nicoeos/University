
import { LayoutGrid, Utensils, Coffee, Leaf, Beef, Sandwich, CakeSlice, Sprout, WheatOff, MilkOff, Archive, Dumbbell, LucideIcon } from 'lucide-react';
import { DietType, StudentProfile } from '../types';

export interface Category {
    id: DietType;
    icon: LucideIcon;
    label: string;
}

export const CATEGORIES: Category[] = [
    { id: DietType.ALL, icon: LayoutGrid, label: 'All' },
    { id: DietType.SANDWICH, icon: Sandwich, label: 'Sandwich' },
    { id: DietType.MEALS, icon: Utensils, label: 'Meals' },
    { id: DietType.DESSERTS_BAKERY, icon: CakeSlice, label: 'Bakery' },
    { id: DietType.VEGETARIAN, icon: Leaf, label: 'Vegetarian' },
    { id: DietType.VEGAN, icon: Sprout, label: 'Vegan' },
    { id: DietType.HALAL, icon: Beef, label: 'Halal' },
    { id: DietType.GLUTEN_FREE, icon: WheatOff, label: 'Gluten Free' },
    { id: DietType.LACTOSE_FREE, icon: MilkOff, label: 'Lactose Free' },
    { id: DietType.NON_PERISHABLE, icon: Archive, label: 'Pantry' },
    { id: DietType.PROTEINS, icon: Dumbbell, label: 'Proteins' },
];

export const INITIAL_PROFILE: StudentProfile = {
    name: '',
    age: '',
    formation: 'L1',
    degree: 'Business',
    preferredCrous: '',
    totalMealsSaved: 3
};
