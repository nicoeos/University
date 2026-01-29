
import React from 'react';
import { User, ShoppingBag } from 'lucide-react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartCount, onCartClick }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isManager = location.pathname.startsWith('/manager');
  const isProfile = location.pathname.startsWith('/profile');

  return (
    <header className="bg-[#D62828] text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => navigate('/')}
        >
          <div className="bg-white p-1 rounded-full">
            <ShoppingBag className="text-[#D62828] w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold tracking-tight">The Good Cantine</h1>
        </div>

        <div className="flex items-center space-x-6">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `text-sm font-medium hover:text-gray-200 transition-colors ${isActive || isProfile ? 'underline decoration-2 underline-offset-4' : 'opacity-80'}`
            }
          >
            Student Portal
          </NavLink>

          {!isManager && (
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

          {!isManager && (
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all ${isActive ? 'bg-white text-[#D62828]' : 'bg-white/20 hover:bg-white/30'}`
              }
              title="My Profile"
            >
              <User className="w-5 h-5" />
            </NavLink>
          )}

          <NavLink
            to="/manager"
            className={({ isActive }) =>
              `text-sm font-medium hover:text-gray-200 transition-colors ${isActive ? 'underline decoration-2 underline-offset-4' : 'opacity-80'}`
            }
          >
            Crous Portal
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
