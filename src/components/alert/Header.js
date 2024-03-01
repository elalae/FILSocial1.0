import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/authActions';
import Dropdown from 'react-bootstrap/Dropdown';


function Header() {
  const { auth, theme, notify } = useSelector(state => state);
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const isActive =(pn) => {
    if(pn === pathname) return 'active';
  }

  const navLinks = [
    { label: 'Home', icon: 'home', link: '/' },
    { label: 'Message', icon: 'near_me', link: '/message' },
    { label: 'Discover', icon: 'explore', link: '/discover' },
    { label: 'Notify', icon: 'favorite', link: '/notify' },
  ];

  return (

    
    <div className="header">

      <nav className="relative flex w-full flex-wrap items-center justify-between bg-[#FBFBFB] py-2 text-neutral-500 shadow-lg hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 lg:py-4">
        <div className="flex w-full flex-wrap items-center justify-between px-3">
          <div className="flex items-center">
            <a className="mx-2 my-1 flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 lg:mb-0 lg:mt-0" href="#">
              <img className="mr-2" src="../../images/logo.png" style={{ height: '20px' }} alt="FILSocial" loading="lazy" />
            </a>
            <form className="hidden md:flex">
              <input
                type="search"
                className="relative m-0 block w-[250px] min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-500 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary motion-reduce:transition-none"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="button-addon2"
              />
              <span className="input-group-text flex items-center whitespace-nowrap rounded px-3 text-center text-base font-normal text-neutral-700 dark:text-neutral-200" id="basic-addon2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                  <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
                </svg>
              </span>
            </form>
          </div>
          <div className="menu ml-auto">
            <ul className="navbar-nav flex-row flex">
              {navLinks.map((link, index) => (
                <li className={`nav-item px-2 ${isActive(link.path)}`} key={index}>
                  <Link className="nav-link" to={link.link}>
                    <span className="material-icons">{link.icon}</span>
                  </Link>
                </li>
              ))}
       {/* TODO: FIX DROPDOWN */}
              <li className="nav-item dropdown">
                <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    User
                    </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href={`/profile`}>Profile</Dropdown.Item>
                    <Dropdown.Item href="#">Dark Mode</Dropdown.Item>
                    <Dropdown.Item onClick={() => dispatch(logout())}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>


              
            </ul>

            
          </div>

        </div>

        
      </nav>
    </div>
  );
}

export default Header;
