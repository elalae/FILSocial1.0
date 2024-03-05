import React from 'react';
import { Link} from 'react-router-dom';
import Menu from './Menu'
import Search from './Search'


function Header() {

  return (

    
    <div className="header">

      <nav className="relative flex w-full flex-wrap items-center justify-between bg-[#FBFBFB] py-2 text-neutral-500 shadow-lg hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 lg:py-4">
        <div className="flex w-full flex-wrap items-center justify-between px-3">
          <div className="flex items-center">
          <Link to="/">
  <a className="mx-2 my-1 flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 lg:mb-0 lg:mt-0">
    <img className="mr-2" src="../../images/logo.png" style={{ height: '20px' }} alt="FILSocial" loading="lazy" />
  </a>
</Link>
           <Search />
            
          </div>
<Menu/>

        </div>

   
      </nav>
      
    </div>
  );
}

export default Header;
