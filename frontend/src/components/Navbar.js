import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg border-b-2 border-yoga-orange">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-yoga-orange to-yoga-purple rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">SN</span>
            </div>
            <span className="text-xl font-bold text-gray-800">Surya Namaskar</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/dashboard" 
              className="text-gray-700 hover:text-yoga-orange transition-colors duration-200 font-medium"
            >
              Dashboard
            </Link>
            <Link 
              to="/instructions" 
              className="text-gray-700 hover:text-yoga-orange transition-colors duration-200 font-medium"
            >
              Instructions
            </Link>
            <Link 
              to="/practice" 
              className="text-gray-700 hover:text-yoga-orange transition-colors duration-200 font-medium"
            >
              Practice
            </Link>
            <Link 
              to="/progress" 
              className="text-gray-700 hover:text-yoga-orange transition-colors duration-200 font-medium"
            >
              Progress
            </Link>
            
            {/* App Info */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-yoga-purple to-yoga-orange rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">YP</span>
              </div>
              <span className="text-gray-700 font-medium">Yoga Practice</span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-yoga-orange transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-2">
              <Link
                to="/dashboard"
                className="text-gray-700 hover:text-yoga-orange transition-colors duration-200 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/instructions"
                className="text-gray-700 hover:text-yoga-orange transition-colors duration-200 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Instructions
              </Link>
              <Link
                to="/practice"
                className="text-gray-700 hover:text-yoga-orange transition-colors duration-200 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Practice
              </Link>
              <Link
                to="/progress"
                className="text-gray-700 hover:text-yoga-orange transition-colors duration-200 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Progress
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Click Outside to Close */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;