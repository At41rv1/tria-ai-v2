
import React from 'react';
import { Link } from 'react-router-dom';
import UserButton from './UserButton';

const Header = () => {
  return (
    <header className="bg-white/90 backdrop-blur-sm shadow-lg border-b border-gray-200 p-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
          <img 
            src="https://pipedream.com/s.v0/app_XaLh2x/logo/orig" 
            alt="Tria Ai Logo" 
            className="w-8 h-8 sm:w-10 sm:h-10"
          />
          <span className="text-xl sm:text-2xl font-bold text-gray-800">Tria AI</span>
        </Link>
        
        <UserButton />
      </div>
    </header>
  );
};

export default Header;
