// Header.jsx
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const socialLinks = [
    { img: 'https://cdn-icons-png.flaticon.com/512/174/174857.png', alt: 'LinkedIn', href: 'https://linkedin.com/in/srujanyamali' },
    { img: 'https://cdn-icons-png.flaticon.com/512/25/25231.png', alt: 'GitHub', href: 'https://github.com/srujyama' },
    { img: 'https://cdn-icons-png.flaticon.com/512/561/561127.png', alt: 'Email', href: 'mailto:srujanyamali@berkeley.edu' }
];

export default function Header() {
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <div className="nav-bar">
            <div className="nav-left">
                <Link to="/" className={`nav-link ${currentPath === '/' ? 'active' : ''}`}>Home</Link>
                <Link to="/resume" className={`nav-link ${currentPath === '/resume' ? 'active' : ''}`}>Resume</Link>
                <Link to="/projects" className={`nav-link ${currentPath === '/projects' ? 'active' : ''}`}>Projects</Link>
                <Link to="/about" className={`nav-link ${currentPath === '/about' ? 'active' : ''}`}>About</Link>
                <Link to="/contact" className={`nav-link ${currentPath === '/contact' ? 'active' : ''}`}>Contact</Link>
            </div>

            <div className="nav-center">
                <Link to="/" className="sy-logo">SY</Link>
            </div>

            <div className="nav-right">
                {socialLinks.map((link, index) => (
                    <a key={index} href={link.href} target="_blank" rel="noopener noreferrer">
                        <img src={link.img} alt={link.alt} className="nav-icon"/>
                    </a>
                ))}
            </div>
        </div>
    );
}
