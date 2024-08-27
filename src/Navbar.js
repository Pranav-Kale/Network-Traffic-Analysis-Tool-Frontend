// src/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className=''>
      <div>
        <div><Link to="/">Home</Link></div>
        <div><Link to="/analysis">Analysis</Link></div>
      </div>
    </div>
  );
}

export default Navbar;
