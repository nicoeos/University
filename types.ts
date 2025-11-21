
export type UserRole = 'student' | 'restaurant';

export enum DietType {
  ALL = 'All',
  VEGETARIAN = 'Vegetarian',
  HALAL = 'Halal',
  MEALS = 'Meals',
  SNACKS = 'Snacks',
}

export interface Offer {
  id: string;
  title: string;
  restaurantName: string;
  description: string;
  price: number;
  pickupDate: string; // Format "YYYY-MM-DD" or "Today"
  pickupTimeStart: string; // Format "HH:mm"
  pickupTimeEnd: string;   // Format "HH:mm"
  imageUrl: string;
  distance: number; // in miles/km
  rating: number;
  remaining: number;
  tags: DietType[];
  isMysteryBag: boolean;
}

export interface RestaurantStats {
  totalSaved: number;
  moneyEarned: number;
  co2Avoided: number; // in kg
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
  totalMealsSaved: number; // Historical count + current session
}
