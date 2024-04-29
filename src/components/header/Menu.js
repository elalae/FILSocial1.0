import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/authActions';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';
import Avatar from '../alert/Avatar';

const Menu = () => {
    const navLinks = [
        { label: 'Home', icon: 'home', path: '/' },
        { label: 'Message', icon: 'near_me', path: '/message' },
        { label: 'Discover', icon: 'explore', path: '/discover' }
       
    ];

    const { auth, theme } = useSelector(state => state);
    const dispatch = useDispatch();
    const { pathname } = useLocation();

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const isActive = (pn) => pathname === pn ? 'text-blue-500' : 'text-gray-700';

    const handleToggleTheme = () => {
        dispatch({ type: GLOBALTYPES.THEME, payload: !theme });
    };

    return (
        <div className="flex justify-end items-center space-x-4">
            <ul className="flex space-x-2">
                {navLinks.map((link, index) => (
                    <li key={index} className={`nav-item ${isActive(link.path)}`}>
                        <Link className="nav-link flex items-center px-2 py-1" to={link.path}>
                            <span className="material-icons">{link.icon}</span>
                        </Link>
                    </li>
                ))}
            </ul>

            <div className="relative">
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center justify-center w-10 h-10 rounded-full focus:outline-none">
                    <Avatar src={auth.user.avatar} className="object-cover w-8 h-8 rounded-full" />
                </button>
                {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                        <Link to={`/profile/${auth.user._id}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
                        <button onClick={handleToggleTheme} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                            {theme ? 'Light mode' : 'Dark mode'}
                        </button>
                        <button onClick={() => dispatch(logout())} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">Logout</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Menu;
