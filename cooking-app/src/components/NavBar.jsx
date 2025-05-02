import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function NavBar() {
  const location = useLocation();

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        backgroundColor: 'var(--color-primary)',
        color: '#fff',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '1rem',
        zIndex: 9999,
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
      }}
    >
      <Link to="/" style={linkStyle(location.pathname === '/')}>🏠 Home</Link>
      <Link to="/planner" style={linkStyle(location.pathname.startsWith('/planner'))}>🍽 Meal Planner</Link>
      <Link to="/profile" style={linkStyle(location.pathname === '/profile')}>👤 Profile</Link>
    </nav>
  );
}

const linkStyle = (isActive) => ({
  color: isActive ? '#fff' : '#e0e0e0',
  textDecoration: 'none',
  fontWeight: isActive ? 'bold' : 'normal',
});
