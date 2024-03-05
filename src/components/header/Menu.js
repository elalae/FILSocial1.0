import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/authActions';
import Dropdown from 'react-bootstrap/Dropdown';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';
import Avatar from '../alert/Avatar';

const Menu = () => {
    const navLinks = [
        { label: 'Home', icon: 'home', path: '/'},
        { label: 'Message', icon: 'near_me', path: '/message'},
        { label: 'Discover', icon: 'explore', path: '/discover'}
    ]

    const { auth, theme } = useSelector(state => state);
    const dispatch = useDispatch();
    const { pathname } = useLocation();

    const isActive = (pn) => {
        if(pn === pathname) return 'active';
    }

    const handleToggleTheme = () => {
        dispatch({ type: GLOBALTYPES.THEME, payload: !theme });
    }

    return (
        <div className="menu ml-auto">
            <ul className="navbar-nav flex-row flex">
                {navLinks.map((link, index) => (
                    <li className={`nav-item px-2 ${isActive(link.path)}`} key={index}>
                        <Link className="nav-link" to={link.path}>
                            <span className="material-icons">{link.icon}</span>
                        </Link>
                    </li>
                ))}

                <li className="nav-item dropdown">
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            <div className="w-8 h-8">
                                <Avatar src={auth.user.avatar} className="object-cover" />
                            </div>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item as={Link} to={`/profile/${auth.user._id}`}>Profile</Dropdown.Item>

                            <Dropdown.Item onClick={handleToggleTheme}>
                            <label htmlFor="theme" className="dropdown-item"
                    onClick={() => dispatch({
                        type: GLOBALTYPES.THEME, payload: !theme
                    })}>

                        {theme ? 'Light mode' : 'Dark mode'}
                    </label>
                            </Dropdown.Item>
                            
                            <Dropdown.Item onClick={() => dispatch(logout())}>Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </li>
            </ul>
        </div>
    );
}

export default Menu;
