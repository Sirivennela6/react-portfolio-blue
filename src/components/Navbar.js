import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Close the menu if window is resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo">Bala Siri Vennela</div>
      <div className="hamburger" onClick={toggleMenu}>
        ☰
      </div>
      <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
        <li><Link to="/" onClick={() => setIsOpen(false)}>🏠 Home</Link></li>
        <li><Link to="/about" onClick={() => setIsOpen(false)}>👤 About</Link></li>
        <li><Link to="/projects" onClick={() => setIsOpen(false)}>💼 Projects</Link></li>
        <li><Link to="/contact" onClick={() => setIsOpen(false)}>✉️ Contact</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
