
import React from 'react';
import { X, QrCode, Clock, Calendar, CheckCircle2, ShoppingBag } from 'lucide-react';
import { Offer } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Offer[];
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, orders }) => {
  return (
    <div className={`fixed inset-0 z-[60] ${isOpen ? '' : 'pointer-events-none'}`}>
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`} 
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className={`absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-[#D62828] text-white">
            <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                <h2 className="text-lg font-bold">My Orders</h2>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gray-50">
            {orders.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-4">
                <ShoppingBag className="w-16 h-16 opacity-20" />
                <p className="text-lg font-medium">No active orders</p>
                <p className="text-sm text-center max-w-xs">Reserve a surplus bag to save food and money!</p>
                <button 
                    onClick={onClose}
                    className="mt-4 text-[#D62828] font-bold hover:underline"
                >
                    Browse Offers
                </button>
              </div>
            ) : (
              orders.map((order, index) => (
                <div key={`${order.id}-${index}`} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="flex h-24">
                    <img 
                        src={order.imageUrl} 
                        alt={order.title} 
                        className="w-24 h-full object-cover"
                    />
                    <div className="p-3 flex-1 flex flex-col justify-center">
                        <h3 className="font-bold text-gray-800 line-clamp-1">{order.restaurantName}</h3>
                        <p className="text-sm text-gray-600 line-clamp-1">{order.title}</p>
                        <div className="flex items-center gap-2 mt-2">
                            <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" />
                                Paid
                            </span>
                            <span className="text-[#D62828] font-bold text-sm">€{order.price.toFixed(2)}</span>
                        </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-3 border-t border-gray-100 grid grid-cols-2 gap-2 text-xs text-gray-600">
                    <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#D62828]" />
                        <span>{order.pickupDate === new Date().toISOString().split('T')[0] ? 'Today' : order.pickupDate}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#D62828]" />
                        <span>{order.pickupTimeStart} - {order.pickupTimeEnd}</span>
                    </div>
                  </div>

                  <div className="p-3 border-t border-gray-100">
                      <button className="w-full bg-gray-900 text-white py-2.5 rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                          <QrCode className="w-4 h-4" />
                          View Collection Code
                      </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary */}
          {orders.length > 0 && (
              <div className="p-5 border-t border-gray-200 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                  <div className="flex justify-between items-center mb-4">
                      <span className="text-gray-600">Total Paid</span>
                      <span className="text-xl font-bold text-[#D62828]">
                          €{orders.reduce((sum, order) => sum + order.price, 0).toFixed(2)}
                      </span>
                  </div>
                  <p className="text-xs text-center text-gray-400">
                      Present the code at the counter to collect your bags.
                  </p>
              </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
