import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/global.css';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/');
    } else {
      alert('Please enter both email and password.');
    }
  };

  return (
    <div className="login-page" style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1.5rem 2rem',
        borderBottom: '1px solid #ddd',
        backgroundColor: '#fff'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <h1 style={{ fontStyle: 'italic', fontWeight: 'normal', fontSize: '2rem', margin: 0 }}>Prepease</h1>
          <img
            src="/images/logo.png"
            alt="Prepease Logo"
            style={{ width: '40px', height: '40px', objectFit: 'contain' }}
          />
        </div>
      </div>

      {/* Main content below header */}
      <div style={{ display: 'flex', flex: 1 }}>
        {/* Left - Description */}
        <div style={{
          flex: 1,
          backgroundColor: '#fff5f0',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '2rem'
        }}>
          <p style={{ fontSize: '1.25rem', maxWidth: '400px', textAlign: 'center', lineHeight: '1.6' }}>
            Plan, organize, and explore recipes with ease. <strong>Prepease</strong> helps you simplify your meals by giving you full control of your kitchen week by week.
          </p>
        </div>

        {/* Right - Login Form */}
        <div style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#ffffff'
        }}>
          <form onSubmit={handleLogin} style={{
            width: '80%',
            maxWidth: '400px',
            padding: '2rem',
            borderRadius: '8px',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
            backgroundColor: '#fff'
          }}>
            <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Login to Continue</h2>

            <label>Email or Username</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
              placeholder="Enter your email or username"
              required
            />

            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
              placeholder="Enter your password"
              required
            />

            <button type="submit" style={buttonStyle}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '0.75rem',
  margin: '0.5rem 0 1rem',
  borderRadius: '6px',
  border: '1px solid #ccc',
  fontSize: '1rem',
};

const buttonStyle = {
  width: '100%',
  padding: '0.75rem',
  backgroundColor: 'var(--color-primary)',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  fontSize: '1rem',
  cursor: 'pointer',
};
