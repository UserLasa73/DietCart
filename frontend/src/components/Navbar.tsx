import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  ShoppingCartIcon,
  HeartIcon,
} from '@heroicons/react/24/outline';

export default function Navbar() {
  const cartItemCount = 0; // Replace with real state later

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