import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3 } from 'lucide-react';
import UserButton from './UserButton';

const Header = () => {
  return (
    <header className="relative bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-200 p-4 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link to="/" className="group flex items-center space-x-4 hover:opacity-90 transition-all duration-300">
          <div className="relative">
            <img 
              src="https://pipedream.com/s.v0/app_XaLh2x/logo/orig" 
              alt="Tria Ai Logo" 
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl shadow-md group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl sm:text-3xl font-black text-gray-900">
              Tria AI
            </span>
            <span className="text-xs text-gray-500 font-medium hidden sm:block">
              Next-Gen AI Chat
            </span>
          </div>
        </Link>
        
        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center space-x-6">
            <Link 
              to="/chat-selector" 
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200 hover:scale-105 transform"
            >
              Chat
            </Link>
            <Link 
              to="/analytics" 
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200 hover:scale-105 transform flex items-center space-x-1"
            >
              <BarChart3 className="w-4 h-4" />
              <span>Analytics</span>
            </Link>
            <div className="w-px h-6 bg-gray-300"></div>
          </div>
          <UserButton />
        </div>
      </div>
    </header>
  );
};

export default Header;