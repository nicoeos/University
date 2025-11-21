
import React, { useState } from 'react';
import { X, CheckCircle, CreditCard, Smartphone, Wallet } from 'lucide-react';
import { Offer } from '../types';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  offer: Offer | null;
  onConfirm: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, offer, onConfirm }) => {
  const [selectedMethod, setSelectedMethod] = useState('izly');
  const [processing, setProcessing] = useState(false);

  if (!isOpen || !offer) return null;

  const handlePay = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      onConfirm();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl relative overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6 border-b border-gray-100">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900">Checkout</h3>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                    <X className="w-6 h-6" />
                </button>
            </div>
            
            <div className="flex gap-4 items-center">
                <img src={offer.imageUrl} alt="" className="w-16 h-16 rounded-lg object-cover" />
                <div>
                    <p className="font-bold text-gray-800">{offer.title}</p>
                    <p className="text-sm text-gray-500">{offer.restaurantName}</p>
                    <p className="text-[#D62828] font-bold">€{offer.price.toFixed(2)}</p>
                </div>
            </div>
        </div>

        <div className="p-6 space-y-4">
            <p className="text-sm font-medium text-gray-700">Select Payment Method</p>
            
            {/* Izly Option */}
            <div 
                onClick={() => setSelectedMethod('izly')}
                className={`p-4 rounded-xl border-2 cursor-pointer flex items-center justify-between transition-all ${selectedMethod === 'izly' ? 'border-[#D62828] bg-red-50' : 'border-gray-200 hover:border-red-100'}`}
            >
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-lg border border-gray-200 flex items-center justify-center">
                         <span className="font-black text-sm italic text-gray-800">izly</span>
                    </div>
                    <div>
                        <p className="font-bold text-gray-800">Izly by Crous</p>
                        <p className="text-xs text-gray-500">Balance: €24.50</p>
                    </div>
                </div>
                {selectedMethod === 'izly' && <CheckCircle className="w-5 h-5 text-[#D62828]" />}
            </div>

            {/* Apple Pay */}
            <div 
                onClick={() => setSelectedMethod('apple')}
                className={`p-4 rounded-xl border-2 cursor-pointer flex items-center justify-between transition-all ${selectedMethod === 'apple' ? 'border-[#D62828] bg-red-50' : 'border-gray-200 hover:border-red-100'}`}
            >
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                         <Smartphone className="w-5 h-5 text-white" />
                    </div>
                    <p className="font-bold text-gray-800">Apple Pay</p>
                </div>
                {selectedMethod === 'apple' && <CheckCircle className="w-5 h-5 text-[#D62828]" />}
            </div>

            {/* Card */}
            <div 
                onClick={() => setSelectedMethod('card')}
                className={`p-4 rounded-xl border-2 cursor-pointer flex items-center justify-between transition-all ${selectedMethod === 'card' ? 'border-[#D62828] bg-red-50' : 'border-gray-200 hover:border-red-100'}`}
            >
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                         <CreditCard className="w-5 h-5 text-white" />
                    </div>
                    <p className="font-bold text-gray-800">Credit Card</p>
                </div>
                {selectedMethod === 'card' && <CheckCircle className="w-5 h-5 text-[#D62828]" />}
            </div>
        </div>

        <div className="p-6 border-t border-gray-100 bg-gray-50">
            <button 
                onClick={handlePay}
                disabled={processing}
                className="w-full bg-[#D62828] text-white font-bold py-4 rounded-xl shadow-lg hover:bg-red-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
                {processing ? 'Processing...' : `Pay €${offer.price.toFixed(2)}`}
            </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
