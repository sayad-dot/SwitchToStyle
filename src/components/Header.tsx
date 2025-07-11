import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, isAdmin, signOut } = useAuth();
  const { getTotalItems } = useCart();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
      setIsUserMenuOpen(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-50 border-b border-[#ECEDB0]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <img src="/sts.jpg" alt="Switch To Style" className="h-10 w-10 rounded-full shadow-md group-hover:shadow-lg transition-shadow duration-200" />
            <span className="text-xl font-bold text-[#722323] group-hover:text-[#722323]/80 transition-colors duration-200">Switch To Style</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-[#722323]/80 hover:text-[#722323] transition-colors duration-200 font-medium">
              Home
            </Link>
            <Link to="/products" className="text-[#722323]/80 hover:text-[#722323] transition-colors duration-200 font-medium">
              Products
            </Link>
            <Link to="/about" className="text-[#722323]/80 hover:text-[#722323] transition-colors duration-200 font-medium">
              About
            </Link>
            <Link to="/contact" className="text-[#722323]/80 hover:text-[#722323] transition-colors duration-200 font-medium">
              Contact
            </Link>
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link to="/cart" className="relative p-2 text-[#722323]/80 hover:text-[#722323] transition-colors duration-200 group">
              <ShoppingCart className="h-6 w-6 group-hover:scale-110 transition-transform duration-200" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#722323] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {getTotalItems()}
                </span>
              )}
            </Link>

            {/* User Menu */}
            <div className="relative">
              {user ? (
                <div>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-1 p-2 text-[#722323]/80 hover:text-[#722323] transition-colors duration-200 group"
                  >
                    <User className="h-6 w-6 group-hover:scale-110 transition-transform duration-200" />
                  </button>
                  
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg py-1 z-50 border border-[#ECEDB0]/30">
                      <div className="px-4 py-2 text-sm text-[#722323] border-b border-[#ECEDB0]/30 font-medium">
                        {user.email}
                      </div>
                      {isAdmin && (
                        <Link
                          to="/admin"
                          className="flex items-center px-4 py-2 text-sm text-[#722323]/80 hover:bg-[#FEFBC7]/50 hover:text-[#722323] transition-colors duration-200"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Settings className="h-4 w-4 mr-2" />
                          Admin Dashboard
                        </Link>
                      )}
                      <Link
                        to="/orders"
                        className="block px-4 py-2 text-sm text-[#722323]/80 hover:bg-[#FEFBC7]/50 hover:text-[#722323] transition-colors duration-200"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        My Orders
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="flex items-center w-full px-4 py-2 text-sm text-[#722323]/80 hover:bg-[#FEFBC7]/50 hover:text-[#722323] transition-colors duration-200"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="bg-[#722323] text-white px-4 py-2 rounded-xl hover:bg-[#722323]/90 transition-all duration-200 transform hover:scale-105 font-medium"
                >
                  Login
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-[#722323]/80 hover:text-[#722323] transition-colors duration-200"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#ECEDB0]/30">
            <nav className="flex flex-col space-y-2">
              <Link
                to="/"
                className="text-[#722323]/80 hover:text-[#722323] py-2 px-2 rounded-lg hover:bg-[#FEFBC7]/50 transition-all duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/products"
                className="text-[#722323]/80 hover:text-[#722323] py-2 px-2 rounded-lg hover:bg-[#FEFBC7]/50 transition-all duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                to="/about"
                className="text-[#722323]/80 hover:text-[#722323] py-2 px-2 rounded-lg hover:bg-[#FEFBC7]/50 transition-all duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-[#722323]/80 hover:text-[#722323] py-2 px-2 rounded-lg hover:bg-[#FEFBC7]/50 transition-all duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;