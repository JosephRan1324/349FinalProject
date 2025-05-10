import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/global.css';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (email.trim() && password.trim()) {
      localStorage.setItem('loggedIn', 'true');
      navigate('/');
      window.location.reload(); // ✅ Ensures login state is applied
    } else {
      alert('Both fields must be filled out.');
    }
  };

  const handleGuest = () => {
    localStorage.setItem('loggedIn', 'true');
    navigate('/');
    window.location.reload(); // ✅ Reload triggers login state properly
  };

  return (
    <div className="login-page">
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1.5rem 2rem',
        borderBottom: '1px solid #ddd',
        backgroundColor: '#D7CCC8'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <h1 style={{
            fontStyle: 'italic',
            fontWeight: 'normal',
            fontSize: '2rem',
            margin: 0,
            color: '#333'
          }}>
            Prepease
          </h1>
          <img
            src="/images/logo-transparent.png"
            alt="Prepease Logo"
            style={{ width: '40px', height: '40px', objectFit: 'contain' }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div style={{ display: 'flex', flex: 1 }}>
        {/* Left Panel */}
        <div style={{
          flex: 1,
          backgroundImage: "url('/images/backgroundlogin.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '2rem'
        }}>
          <p style={{
            fontSize: '1.25rem',
            maxWidth: '400px',
            textAlign: 'center',
            lineHeight: '1.6',
            color: '#000',
            fontStyle: 'italic'
          }}>
            Plan, organize, and explore recipes with ease. <strong>Prepease</strong> helps you simplify your meals by giving you full control of your kitchen week by week.
          </p>
        </div>

        {/* Right Panel (Login Form) */}
        <div style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f2f2f2'
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

            <label style={labelStyle}>Email or Username</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
              placeholder="Enter your email or username"
              required
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <label style={labelStyle}>Password</label>
              <span className="forgot-link">Forgot password?</span>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
              placeholder="Enter your password"
              required
            />

            <button type="submit" className="login-btn" style={{ marginTop: '0.5rem' }}>Login</button>

            {/* OR divider */}
            <div style={orDividerStyle}>
              <hr style={hrStyle} />
              <span style={{ margin: '0 10px', color: '#999' }}>or</span>
              <hr style={hrStyle} />
            </div>

            <button
              type="button"
              onClick={handleGuest}
              className="guest-btn"
            >
              Continue as Guest
            </button>

            <button
              type="button"
              onClick={() => navigate('/signup')}
              className="guest-btn"
              style={{ marginTop: '0.5rem' }}
            >
              Create an Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// Styles
const inputStyle = {
  width: '100%',
  padding: '0.75rem',
  marginBottom: '1rem',
  borderRadius: '6px',
  border: '1px solid #ccc',
  fontSize: '1rem',
};

const labelStyle = {
  marginBottom: '0.25rem',
  display: 'block',
  fontSize: '1rem',
};

const orDividerStyle = {
  display: 'flex',
  alignItems: 'center',
  margin: '1.25rem 0',
};

const hrStyle = {
  flex: 1,
  border: 'none',
  borderTop: '1px solid #ccc',
};
