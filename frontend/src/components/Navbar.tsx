import { NavLink, Link } from 'react-router-dom';
import {
  ShoppingCartIcon,
  HeartIcon,
  Cog8ToothIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';

export default function Navbar() {
  const cartItemCount = 0; // Replace with real state later
  const { user, isAdmin, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold text-green-600">
            DietCart
          </Link>
        </div>

        {/* Navigation Links and Icons */}
        <div className="flex items-center space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'text-green-600' : 'text-gray-600 hover:text-green-600'
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/shop"
            className={({ isActive }) =>
              isActive ? 'text-green-600' : 'text-gray-600 hover:text-green-600'
            }
          >
            Shop
          </NavLink>

          {/* Admin Dashboard Link (Conditional) */}
          {isAdmin && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                isActive
                  ? 'text-green-600 flex items-center gap-1'
                  : 'text-gray-600 hover:text-green-600 flex items-center gap-1'
              }
            >
              <Cog8ToothIcon className="h-5 w-5" />
              <span>Admin</span>
            </NavLink>
          )}

          {/* Wishlist */}
          <Link to="/Wishlist" className="relative" aria-label="Wishlist">
            <HeartIcon className="h-6 w-6 text-gray-600 hover:text-green-600" />
          </Link>

          {/* Cart */}
          <Link to="/checkout" className="relative" aria-label="Cart">
            <ShoppingCartIcon className="h-6 w-6 text-gray-600 hover:text-green-600" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Link>

          {/* User Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-1 focus:outline-none"
            >
              <UserCircleIcon className="h-6 w-6 text-gray-600 hover:text-green-600" />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                <Link
                  to="/Profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  My Account
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsDropdownOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Close dropdown when clicking outside */}
      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </nav>
  );
}