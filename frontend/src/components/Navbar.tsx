import { useState, useRef, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  ShoppingCartIcon,
  HeartIcon,
  Bars3BottomLeftIcon,
} from '@heroicons/react/24/outline';

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const cartItemCount = 0; // Replace with real state later

  const categories = [
    'Diabetic-Friendly',
    'Nut-Free',
    'Dairy-Free',
    'Gluten-Free',
    'Soy-Free',
    'Egg-Free',
    'Heart-Healthy',
    'Weight Management',
    'Gut Health',
    'Kidney-Friendly',
    'Liver Support',
    'Hypertension-Safe',
    'PCOS/PCOD Support',
    'Senior Nutrition',
    "Children's Nutrition",
    'Immune Boosters',
    'Thyroid-Supportive',
    'Pregnancy & Postpartum',
    'Vegan Medical Diets',
  ];

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo and Categories */}
        <div className="flex items-center space-x-6 relative" ref={dropdownRef}>
          <Link to="/" className="text-2xl font-bold text-green-600">
            DietCart
          </Link>

          {/* Categories Button */}
          <button
            onClick={() => setIsDropdownOpen(prev => !prev)}
            className="flex items-center text-gray-700 hover:text-green-600 focus:outline-none"
          >
            <Bars3BottomLeftIcon className="w-5 h-5 mr-1" />
            Categories
          </button>

          {/* Dropdown */}
          {isDropdownOpen && (
            <div className="absolute left-0 top-full mt-2 w-64 bg-white shadow-lg rounded-lg p-3 z-50 max-h-80 overflow-y-auto">
              {categories.map((cat, i) => (
                <Link
                  key={i}
                  to={`/category/${cat.toLowerCase().replace(/\s+/g, '-')}`}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-100 hover:text-green-700 rounded"
                >
                  {cat}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Navigation Links and Icons */}
        <div className="flex items-center space-x-10">
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

          <NavLink
            to="/About"
            className={({ isActive }) =>
              isActive ? 'text-green-600' : 'text-gray-600 hover:text-green-600'
            }
          >
            About
          </NavLink>

          <NavLink
            to="/Login"
            className={({ isActive }) =>
              isActive ? 'text-green-600' : 'text-gray-600 hover:text-green-600'
            }
          >
            Profile
          </NavLink>

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
        </div>
      </div>
    </nav>
  );
}
