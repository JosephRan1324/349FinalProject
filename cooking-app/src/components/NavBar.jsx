import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('loggedIn') === 'true';

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        backgroundColor: '#D7CCC8', // ✅ Updated to match login/explore header
        color: '#333',
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

        {isLoggedIn ? (
          <button onClick={handleLogout} style={logoutButtonStyle}>
            Logout
          </button>
        ) : (
          <Link to="/login" style={linkStyle(location.pathname === '/login')}>
            Login / Sign Up
          </Link>
        )}
      </div>
    </nav>
  );
}

const linkStyle = (isActive) => ({
  color: '#333',
  textDecoration: 'none',
  fontWeight: 'normal',
  borderBottom: isActive ? '2px solid #333' : 'none',
  paddingBottom: '2px',
});

const logoutButtonStyle = {
  background: 'transparent',
  color: '#333',
  border: 'none',
  cursor: 'pointer',
  fontSize: '1rem',
  padding: 0,
  textDecoration: 'underline',
};
