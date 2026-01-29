import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import PaymentModal from './components/PaymentModal';
import CartDrawer from './components/CartDrawer';
import { Offer, StudentProfile as StudentProfileType } from './types';
import StudentHomePage from './pages/StudentHomePage';
import ProfilePage from './pages/ProfilePage';
import RestaurantDashboardPage from './pages/RestaurantDashboardPage';

import { useOffers } from './hooks/useOffers';
import { useCart } from './hooks/useCart';
import { useProfile } from './hooks/useProfile';

const App: React.FC = () => {
  const [offers, setOffers] = useOffers();
  const [orders, setOrders] = useCart();
  const [studentProfile, setStudentProfile] = useProfile();

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  const handleBuyClick = (offer: Offer) => {
    setSelectedOffer(offer);
    setIsPaymentOpen(true);
  };

  const handlePaymentSuccess = () => {
    setIsPaymentOpen(false);
    if (selectedOffer) {
      const newOrder = { ...selectedOffer, id: `${selectedOffer.id}-${Date.now()}` };
      setOrders(prev => [newOrder, ...prev]);
      setOffers(offers.map(o => o.id === selectedOffer.id ? { ...o, remaining: Math.max(0, o.remaining - 1) } : o));
      setIsCartOpen(true);
    }
  };

  return (
    <div className="min-h-screen pb-20">
      <Header
        cartCount={orders.length}
        onCartClick={() => setIsCartOpen(true)}
      />

      <Routes>
        <Route path="/" element={<StudentHomePage offers={offers} onBuy={handleBuyClick} />} />
        <Route path="/profile" element={<ProfilePage profile={studentProfile} setProfile={setStudentProfile} orders={orders} />} />
        <Route path="/manager" element={<RestaurantDashboardPage offers={offers} setOffers={setOffers} />} />
      </Routes>

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
