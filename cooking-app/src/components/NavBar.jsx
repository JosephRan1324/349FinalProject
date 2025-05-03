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
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        zIndex: 9999,
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
      }}
    >
      <div style={{ fontSize: '1.5rem', fontStyle: 'italic' }}>Prepease</div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <Link to="/" style={linkStyle(location.pathname === '/')}>Home</Link>
        <Link to="/planner" style={linkStyle(location.pathname.startsWith('/planner'))}>Meal Planner</Link>
        <Link to="/favorites" style={linkStyle(location.pathname.startsWith('/favorites'))}>Favorites</Link>
        <Link to="/profile" style={linkStyle(location.pathname === '/profile')}>Profile</Link>
        <Link to="/login" style={linkStyle(location.pathname === '/login')}>Login</Link>
      </div>
    </nav>
  );
}

const linkStyle = (isActive) => ({
  color: '#e0e0e0',
  textDecoration: 'none',
  fontWeight: 'normal',
  borderBottom: isActive ? '2px solid white' : 'none',
  paddingBottom: '2px',
});