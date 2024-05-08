import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/authActions';
import Avatar from '../alert/Avatar';
import NotifyModal from '../NotifyModal';

const Menu = () => {
    const navLinks = [
        { label: 'Home', icon: 'home', path: '/'},
        { label: 'Message', icon: 'near_me', path: '/message'},
        { label: 'Discover', icon: 'explore', path: '/discover'}
    ];

    const { auth, notify } = useSelector(state => state);
    const dispatch = useDispatch();
    const { pathname } = useLocation();

    const [isNotifyOpen, setNotifyOpen] = useState(false);
    const [isProfileOpen, setProfileOpen] = useState(false);

    const toggleNotifyDropdown = () => setNotifyOpen(!isNotifyOpen);
    const toggleProfileDropdown = () => setProfileOpen(!isProfileOpen);

    const isActive = (pn) => pathname === pn ? 'text-blue-500' : 'text-gray-500';

    const notificationCountDisplay = notify.data.length > 9 ? '9+' : notify.data.length.toString();

    return (
        <div className="flex items-center space-x-4">
            {navLinks.map((link, index) => (
                <Link key={index} className={`p-3 rounded-full ${isActive(link.path)} hover:bg-gray-100`} to={link.path}>
                    <span className="material-icons text-xl">{link.icon}</span>
                </Link>
            ))}

            <div className="relative">
                <button className="p-3 rounded-full hover:bg-gray-100" onClick={toggleNotifyDropdown}>
                    <span className="material-icons text-xl">notifications</span>
                    {notify.data.length > 0 && (
                        <span className="absolute -top-2 -right-2 flex items-center justify-center w-6 h-6 text-xs font-semibold text-white bg-red-500 rounded-full">
                            {notificationCountDisplay}
                        </span>
                    )}
                </button>
                {isNotifyOpen && (
                    <div className="absolute right-0 mt-1 bg-white border rounded shadow-lg z-50 p-3 max-h-[400px] overflow-auto">
                        <NotifyModal />
                    </div>
                )}
            </div>

            <div className="relative">
                <button className="p-3 rounded-full hover:bg-gray-100" onClick={toggleProfileDropdown}>
                    <Avatar src={auth.user.avatar} size="small" />
                </button>
                {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 py-1">
                        <Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" to={`/profile/${auth.user._id}`}>Profile</Link>
                        <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => dispatch(logout())}>Logout</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Menu;
