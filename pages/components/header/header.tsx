import React, { useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Dropdown } from "react-bootstrap";
import Cookies from 'js-cookie';
import store from '../../../store/store';
const Header = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    const StoreData = store.getState();
    const Credentials = StoreData.login.credentials;
    const router = useRouter();
    const userLogout = (e:any) => {
        e.preventDefault();
        localStorage.removeItem('user');
        Cookies.remove('refreshToken');
        router.push("/");
    };

    return (
        <header className="header">
            <nav className="navbar">
                <ul className="nav-list">
                    <li className={`nav-item ${router.pathname === '/components/pagesLayout/home' ? 'active' : ''}`}>
                        <Link href='/components/pagesLayout/home' className="nav-link">
                            Home
                        </Link>
                    </li>
                    <li className={`nav-item ${router.pathname === '/components/pagesLayout/about' ? 'active' : ''}`}>
                        <Link href='/components/pagesLayout/about' className="nav-link">About </Link>
                    </li>
                    <li className={`nav-item ${router.pathname === '/components/pagesLayout/services' ? 'active' : ''}`}>
                        <Link href='/components/pagesLayout/services' className="nav-link">Services </Link>
                    </li>
                    <li className={`nav-item ${router.pathname === '/components/pagesLayout/contact' ? 'active' : ''}`}>
                        <Link href='/components/pagesLayout/contact' className="nav-link">Contact </Link>
                    </li>
                </ul>
                <div className="nav-icons">
                    <div className="dropdown">
                        <a href="#" className="icon-link" onClick={toggleDropdown}>
                            <AccountCircleIcon />
                        </a>
                        {isDropdownOpen && (
                            <div className="dropdown-content">
                                <button className="dropdown-btn">Hello, {Credentials?.username}</button>
                                <button className="dropdown-btn" onClick={userLogout}>Logout</button>
                            </div>
                        )}
                    </div>
                    <a href="#" className="icon-link"><ShoppingCartIcon /></a>
                </div>
            </nav>
        </header>
    );
};

export default Header;
