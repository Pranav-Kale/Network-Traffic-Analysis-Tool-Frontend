// src/Navbar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  
  // Determine the current path and highlight accordingly
  const isActive = (path) => location.pathname === path ? 'bg-gray-700' : 'hover:bg-gray-700';

  return (
    <nav className="bg-gray-800 p-4 px-[12.5%]">
      <div className="container mx-auto flex justify-between items-center">
      <Link to="/" className="text-white text-2xl font-bold cursor-pointer">
        Network Traffic Analysis Tool
      </Link>
        <div className="space-x-4">
          <Link 
            to="/" 
            className={`text-white px-3 py-2 rounded transition duration-300 ${isActive('/')}`}
          >
            Home
          </Link>
          <Link 
            to="/analysis" 
            className={`text-white px-3 py-2 rounded transition duration-300 ${isActive('/analysis')}`}
          >
            Analysis
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
