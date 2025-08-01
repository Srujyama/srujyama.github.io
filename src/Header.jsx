import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const socialLinks = [
    {
        img: 'https://cdn-icons-png.flaticon.com/512/174/174857.png',
        alt: 'LinkedIn',
        href: 'https://linkedin.com/in/srujanyamali'
    },
    {
        img: 'https://cdn-icons-png.flaticon.com/512/733/733553.png',
        alt: 'GitHub',
        href: 'https://github.com/srujyama'
    },
    {
        img: 'https://cdn-icons-png.flaticon.com/512/732/732200.png',
        alt: 'Email',
        href: 'mailto:srujanyamali@berkeley.edu'
    }
];

export default function Header() {
    const location = useLocation();
    const currentPath = location.pathname;
    const projectPaths = ['/projects', '/flyflirt', '/projects/genomics', '/projects/llm'];
    const isProjectActive = projectPaths.includes(currentPath);

    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [isDropdownActive, setIsDropdownActive] = useState(false);

    const toggleDropdown = () => {
        if (isDropdownVisible) {
            setIsDropdownActive(false);
            setTimeout(() => setIsDropdownVisible(false), 300); // matches CSS transition
        } else {
            setIsDropdownVisible(true);
            setTimeout(() => setIsDropdownActive(true), 0); // allow DOM to mount first
        }
    };

    return (
        <div className="nav-bar">
            <div className="nav-left">
                <Link to="/" className={`nav-link ${currentPath === '/' ? 'active' : ''}`}>Home</Link>
                <Link to="/resume" className={`nav-link ${currentPath === '/resume' ? 'active' : ''}`}>Resume</Link>

                {/* Projects dropdown */}
                <div className="nav-link dropdown">
                    <button
                        onClick={toggleDropdown}
                        className={`dropdown-btn ${isProjectActive ? 'active' : ''}`}
                    >
                        Projects ▾
                    </button>

                    {isDropdownVisible && (
                        <div className={`dropdown-menu ${isDropdownActive ? 'show' : ''}`}>
                            <Link to="/projects" className={`dropdown-item ${currentPath === '/projects' ? 'active' : ''}`}>All Projects</Link>
                            <Link to="/flyflirt" className={`dropdown-item ${currentPath === '/flyflirt' ? 'active' : ''}`}>Fly Flirt</Link>
                            <Link to="/CarpetCleanChangePoints" className={`dropdown-item ${currentPath === '/CarpetCleanChangePoints' ? 'active' : ''}`}>Carpet Clean Change Points</Link>
                            <Link to="/FlyVialTracker" className={`dropdown-item ${currentPath === '/FlyVialTracker' ? 'active' : ''}`}>Fly Vial Tracker</Link>
                            <Link to="/StockQuant" className={`dropdown-item ${currentPath === '/StockQuant' ? 'active' : ''}`}>Stock Quant</Link>
                        </div>
                    )}
                </div>

                <Link to="/about" className={`nav-link ${currentPath === '/about' ? 'active' : ''}`}>About</Link>
                <Link to="/contact" className={`nav-link ${currentPath === '/contact' ? 'active' : ''}`}>Contact</Link>
            </div>

            <div className="nav-right">
                {socialLinks.map((link, index) => (
                    <a key={index} href={link.href} target="_blank" rel="noopener noreferrer">
                        <img src={link.img} alt={link.alt} className="nav-icon" />
                    </a>
                ))}
            </div>
        </div>
    );
}
