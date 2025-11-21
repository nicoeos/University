
import React, { useState, useEffect } from 'react';
import { MapPin, Search, LayoutGrid, Utensils, Coffee, Leaf, Beef, ChevronDown } from 'lucide-react';
import Header from './components/Header';
import OfferCard from './components/OfferCard';
import RestaurantDashboard from './components/RestaurantDashboard';
import PaymentModal from './components/PaymentModal';
import CartDrawer from './components/CartDrawer';
import StudentProfile from './components/StudentProfile';
import { Offer, UserRole, DietType, StudentProfile as StudentProfileType } from './types';

const CROUS_LOCATIONS = [
  "All Locations",
  "Cafétéria de la Fac de Droit",
  "Cafétéria de la Fonderie",
  "Cafétéria Illkirch",
  "Cafétéria La Misha",
  "Cafétéria Le Cardo",
  "Cafétéria Le Patio",
  "Cafétéria Le PEGE",
  "Cafétéria Learning Center",
  "Cafétéria Mini R",
  "Crous & Go ENSISA",
  "Crous & Go Fonderie",
  "Crous & Go FST",
  "Crous & Go Gallia",
  "Crous & Go Grillenbreit",
  "Crous & Go Learning Center",
  "FEC",
  "Kiosque (RU Esplanade)",
  "Strasbourg",
  "L’Annexe",
  "Le 32",
  "Le Cristal Shop (RU Esplanade)",
  "Le Stift",
  "ORT-Laure Weil",
  "Restaurant du centre hospitalier d’Erstein",
  "Restaurant du centre hospitalier Sainte Catherine",
  "Restaurant du lycée Blaise Pascal",
  "Restaurant du lycée Dr Eugène Koeberlé",
  "Restaurant du lycée Jean-Mermoz",
  "Resto U’ Cronenbourg",
  "Resto U’ de Colmar",
  "Resto U’ de l’Illberg",
  "Resto U’ de l’IUT Mulhouse",
  "Resto U’ Esplanade",
  "Resto U’ Gallia",
  "Resto U’ Illkirch",
  "Resto U’ Paul Appell"
];

const TODAY = new Date().toISOString().split('T')[0];

// MOCK DATA INITIALIZATION
const INITIAL_OFFERS: Offer[] = [
  {
    id: '1',
    title: 'Mystery Bag',
    restaurantName: 'Resto U’ Esplanade',
    description: 'Selection of the restaurant surplus',
    price: 3.00,
    pickupDate: TODAY,
    pickupTimeStart: '13:30',
    pickupTimeEnd: '14:30',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    distance: 0.2,
    rating: 4.5,
    remaining: 12,
    tags: [DietType.MEALS, DietType.HALAL],
    isMysteryBag: true
  },
  {
    id: '2',
    title: 'Mystery Bag',
    restaurantName: 'Cafétéria Le Patio',
    description: 'Selection of the restaurant surplus',
    price: 2.00,
    pickupDate: TODAY,
    pickupTimeStart: '16:00',
    pickupTimeEnd: '17:00',
    imageUrl: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80',
    distance: 0.5,
    rating: 4.2,
    remaining: 1,
    tags: [DietType.SNACKS],
    isMysteryBag: true
  },
  {
    id: '3',
    title: 'Mystery Bag',
    restaurantName: 'Le Cristal Shop (RU Esplanade)',
    description: 'Selection of the restaurant surplus',
    price: 2.00,
    pickupDate: TODAY,
    pickupTimeStart: '16:00',
    pickupTimeEnd: '17:00',
    imageUrl: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&w=800&q=80',
    distance: 0.3,
    rating: 4.8,
    remaining: 3,
    tags: [DietType.VEGETARIAN, DietType.SNACKS],
    isMysteryBag: true
  },
  {
    id: '4',
    title: 'Mystery Bag',
    restaurantName: 'Resto U’ Paul Appell',
    description: 'Selection of the restaurant surplus',
    price: 3.00,
    pickupDate: TODAY,
    pickupTimeStart: '18:30',
    pickupTimeEnd: '19:30',
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
    distance: 1.2,
    rating: 4.6,
    remaining: 5,
    tags: [DietType.VEGETARIAN, DietType.MEALS],
    isMysteryBag: true
  },
  {
    id: '5',
    title: 'Mystery Bag',
    restaurantName: 'Cafétéria de la Fac de Droit',
    description: 'Selection of the restaurant surplus',
    price: 2.00,
    pickupDate: TODAY,
    pickupTimeStart: '15:00',
    pickupTimeEnd: '16:00',
    imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80',
    distance: 0.8,
    rating: 4.7,
    remaining: 4,
    tags: [DietType.SNACKS, DietType.VEGETARIAN],
    isMysteryBag: true
  }
];

const INITIAL_PROFILE: StudentProfileType = {
    name: '',
    age: '',
    formation: 'L1',
    degree: 'Business',
    preferredCrous: '',
    totalMealsSaved: 3
};

const CATEGORIES = [
  { id: DietType.ALL, icon: LayoutGrid, label: 'All' },
  { id: DietType.MEALS, icon: Utensils, label: 'Meals' },
  { id: DietType.SNACKS, icon: Coffee, label: 'Snacks' },
  { id: DietType.VEGETARIAN, icon: Leaf, label: 'Vegetarian' },
  { id: DietType.HALAL, icon: Beef, label: 'Halal' },
];

// Helper to load from storage safely
const loadFromStorage = <T,>(key: string, fallback: T): T => {
    try {
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : fallback;
    } catch (e) {
        console.error(`Error loading ${key}`, e);
        return fallback;
    }
};

const App: React.FC = () => {
  const [role, setRole] = useState<UserRole>('student');
  const [studentView, setStudentView] = useState<'home' | 'profile'>('home');
  
  // Initialize state from localStorage if available, else use Mock Data
  const [offers, setOffers] = useState<Offer[]>(() => loadFromStorage('crous_offers', INITIAL_OFFERS));
  const [orders, setOrders] = useState<Offer[]>(() => loadFromStorage('crous_orders', []));
  const [studentProfile, setStudentProfile] = useState<StudentProfileType>(() => loadFromStorage('crous_profile', INITIAL_PROFILE));

  const [selectedCategory, setSelectedCategory] = useState<DietType>(DietType.ALL);
  const [selectedLocation, setSelectedLocation] = useState<string>('All Locations');
  
  // Drawer & Modal State
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  // Persistence Effects
  useEffect(() => {
      localStorage.setItem('crous_offers', JSON.stringify(offers));
  }, [offers]);

  useEffect(() => {
      localStorage.setItem('crous_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
      localStorage.setItem('crous_profile', JSON.stringify(studentProfile));
  }, [studentProfile]);


  const filteredOffers = offers.filter(offer => {
    const matchesCategory = selectedCategory === DietType.ALL || offer.tags.includes(selectedCategory);
    const matchesLocation = selectedLocation === 'All Locations' || offer.restaurantName === selectedLocation;
    
    return matchesCategory && matchesLocation;
  });

  const handleBuyClick = (offer: Offer) => {
    setSelectedOffer(offer);
    setIsPaymentOpen(true);
  };

  const handlePaymentSuccess = () => {
    setIsPaymentOpen(false);
    if (selectedOffer) {
        const newOrder = { ...selectedOffer, id: `${selectedOffer.id}-${Date.now()}` }; // Unique ID for order
        setOrders(prev => [newOrder, ...prev]);
        setOffers(offers.map(o => o.id === selectedOffer.id ? {...o, remaining: Math.max(0, o.remaining - 1)} : o));
        setIsCartOpen(true); // Auto open cart to show the new order
    }
  };

  const handleProfileClick = () => {
      if (role === 'student') {
          setStudentView(prev => prev === 'home' ? 'profile' : 'home');
      } else {
          // Switch to student profile if clicked (though icon is hidden in restaurant mode now)
          setRole('student');
          setStudentView('profile');
      }
  };

  const handleRoleSwitch = (newRole: UserRole) => {
      setRole(newRole);
      if (newRole === 'student') {
          setStudentView('home');
      }
  };

  return (
    <div className="min-h-screen pb-20">
      <Header 
        role={role} 
        setRole={handleRoleSwitch} 
        cartCount={orders.length} 
        onCartClick={() => setIsCartOpen(true)}
        onProfileClick={handleProfileClick}
        studentView={studentView}
      />

      {role === 'student' ? (
        <>
            {studentView === 'profile' ? (
                <StudentProfile 
                    profile={studentProfile}
                    setProfile={setStudentProfile}
                    locations={CROUS_LOCATIONS.filter(l => l !== "All Locations")}
                    orders={orders}
                />
            ) : (
                <main>
                    {/* Location Bar */}
                    <div className="bg-white border-b border-gray-200 sticky top-16 z-40 shadow-sm">
                        <div className="max-w-7xl mx-auto px-4 py-3">
                           {/* Location Dropdown */}
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

                        {/* Filters */}
                        <div className="max-w-7xl mx-auto px-4 py-3 overflow-x-auto">
                            <div className="flex space-x-2 min-w-max">
                                {CATEGORIES.map((cat) => {
                                    const Icon = cat.icon;
                                    const isSelected = selectedCategory === cat.id;
                                    return (
                                        <button
                                            key={cat.id}
                                            onClick={() => setSelectedCategory(cat.id)}
                                            className={`flex items-center px-4 py-2 rounded-full text-sm font-bold transition-all transform active:scale-95 ${
                                                isSelected 
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

                    {/* Offers Grid */}
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
                                 <p className="text-xl font-medium text-gray-600">No mystery bags found.</p>
                                 <p className="text-gray-500 mt-2">Try adjusting your filters or location.</p>
                             </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {filteredOffers.map(offer => (
                                    <div key={offer.id} className="h-full">
                                        <OfferCard 
                                            offer={offer} 
                                            onBuy={handleBuyClick} 
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </main>
            )}
        </>
      ) : (
        <RestaurantDashboard 
            offers={offers} 
            setOffers={setOffers} 
            locations={CROUS_LOCATIONS.filter(l => l !== "All Locations")}
        />
      )}

      <CartDrawer 
         isOpen={isCartOpen} 
         onClose={() => setIsCartOpen(false)} 
         orders={orders} 
      />

      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        offer={selectedOffer}
        onConfirm={handlePaymentSuccess}
      />
    </div>
  );
};

export default App;
