
export type UserRole = 'student' | 'restaurant';

export enum DietType {
  ALL = 'All',
  SANDWICH = 'Sandwich',
  MEALS = 'Meals',
  DESSERTS_BAKERY = 'Desserts and Bakery',
  VEGETARIAN = 'Vegetarian',
  VEGAN = 'Vegan',
  HALAL = 'Halal',
  GLUTEN_FREE = 'Gluten Free',
  LACTOSE_FREE = 'Lactose Free',
  NON_PERISHABLE = 'Non-perishable',
  PROTEINS = 'Proteins',
}

export interface Offer {
  id: string;
  title: string;
  restaurantName: string;
  description: string;
  price: number;
  pickupDate: string; 
  pickupTimeStart: string; 
  pickupTimeEnd: string;   
  imageUrl: string;
  distance: number; 
  rating: number;
  remaining: number;
  tags: DietType[];
  isMysteryBag: boolean;
}

export interface RestaurantStats {
  totalSaved: number;
  moneyEarned: number;
  co2Avoided: number;
}

export interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
}

export type Formation = 'L1' | 'L2' | 'L3' | 'M1' | 'M2' | 'PGE' | 'PhD' | 'Others';
export type Degree = 'Business' | 'Social Studies' | 'Engineering' | 'Science' | 'Medical Studies' | 'Arts' | 'Law' | 'Others';

export interface StudentProfile {
  name: string;
  age: string;
  formation: Formation;
  degree: Degree;
  preferredCrous: string;
  totalMealsSaved: number;
}
