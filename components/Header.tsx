
import React from 'react';
import { User, ShoppingBag } from 'lucide-react';
import { UserRole } from '../types';

interface HeaderProps {
  role: UserRole;
  setRole: (role: UserRole) => void;
  cartCount: number;
  onCartClick: () => void;
  onProfileClick: () => void;
  studentView?: 'home' | 'profile';
}

const Header: React.FC<HeaderProps> = ({ role, setRole, cartCount, onCartClick, onProfileClick, studentView }) => {
  return (
    <header className="bg-[#D62828] text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div 
            className="flex items-center space-x-2 cursor-pointer" 
            onClick={() => {
                setRole('student');
                if (role === 'student' && studentView === 'profile') {
                     onProfileClick(); 
                }
            }}
        >
           <div className="bg-white p-1 rounded-full">
             <ShoppingBag className="text-[#D62828] w-6 h-6" />
           </div>
           <h1 className="text-xl font-bold tracking-tight">The Good Canteen</h1>
        </div>

        <div className="flex items-center space-x-6">
            <button 
                onClick={() => setRole('student')}
                className={`text-sm font-medium hover:text-gray-200 transition-colors ${role === 'student' ? 'underline decoration-2 underline-offset-4' : 'opacity-80'}`}
            >
                Student Portal
            </button>

            {role === 'student' && (
                <div 
                    className="relative cursor-pointer hover:bg-white/10 p-2 rounded-full transition-colors"
                    onClick={onCartClick}
                    title="Cart"
                >
                   {cartCount > 0 && (
                       <span className="absolute top-0 right-0 bg-yellow-400 text-[#D62828] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-in zoom-in">
                         {cartCount}
                       </span>
                   )}
                   <ShoppingBag className="w-6 h-6" />
                </div>
            )}

            {role === 'student' && (
                <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all ${studentView === 'profile' ? 'bg-white text-[#D62828]' : 'bg-white/20 hover:bg-white/30'}`}
                    onClick={onProfileClick}
                    title="My Profile"
                >
                    <User className="w-5 h-5" />
                </div>
            )}

            <button 
                onClick={() => setRole('restaurant')}
                className={`text-sm font-medium hover:text-gray-200 transition-colors ${role === 'restaurant' ? 'underline decoration-2 underline-offset-4' : 'opacity-80'}`}
            >
                Crous Portal
            </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
