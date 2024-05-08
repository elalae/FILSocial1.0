import React from 'react';
import { Link } from 'react-router-dom';
import Menu from './Menu';
import Search from './Search';

function Header() {
  return (
    <div className="sticky top-0 z-30 bg-[#FBFBFB] shadow-lg w-full">
      <nav className="flex items-center justify-between py-2 lg:py-4 px-3">
        <Link to="/">
          <a className="flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900">
            <img className="mr-2 h-5" src="../../images/logo.png" alt="FILSocial" />
          </a>
        </Link>
        <Search />
        <Menu />
      </nav>
    </div>
  );
}

export default Header;
