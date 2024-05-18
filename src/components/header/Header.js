import React from 'react';
import { Link } from 'react-router-dom';
import Menu from './Menu';
import Search from './Search';
import logo from '../../images/logo.png'; // Import the logo image

function Header() {
  return (
    <div className="sticky top-0 z-30 bg-[#FBFBFB] shadow-lg w-full">
      <nav className="relative flex items-center justify-between py-2 lg:py-4 px-3">
        <Link to="/" className="relative flex items-center">
          <div className="absolute" style={{ height: '50px', width: '100px' }}>
            <img src={logo} alt="FILSocial" style={{ height: '100%', width: '100%' }} />
          </div>
          <div className="flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 ml-52">
       
          </div>
        </Link>
        <Search />
        <Menu />
      </nav>
    </div>
  );
}

export default Header;

