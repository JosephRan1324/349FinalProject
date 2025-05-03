import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/global.css';

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreed: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword, agreed } = form;

    if (!username || !email || !password || !confirmPassword) {
      alert('Please fill out all fields.');
      return;
    }

    if (!agreed) {
      alert('You must agree to the terms.');
      return;
    }

    localStorage.setItem('user', JSON.stringify({ username, email }));
    localStorage.setItem('loggedIn', 'true');
    navigate('/profile');
  };

  return (
    <div className="login-page">
      {/* Header copied from login */}
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

      {/* Signup Form */}
      <div style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
        padding: '2rem'
      }}>
        <form onSubmit={handleSubmit} style={{
          width: '100%',
          maxWidth: '400px',
          background: '#fff',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Create Account</h2>

          <label style={labelStyle}>Username *</label>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            style={inputStyle}
            placeholder="Choose a username"
            required
          />

          <label style={labelStyle}>Email address *</label>
          <input
            type="text"
            name="email"
            value={form.email}
            onChange={handleChange}
            style={inputStyle}
            placeholder="Enter your email"
            required
          />

          <label style={labelStyle}>Password *</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            style={inputStyle}
            placeholder="Create a password"
            required
          />

          <label style={labelStyle}>Confirm Password *</label>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            style={inputStyle}
            placeholder="Re-enter password"
            required
          />

          <div style={{ margin: '1rem 0' }}>
            <label style={{ fontSize: '0.9rem' }}>
              <input
                type="checkbox"
                name="agreed"
                checked={form.agreed}
                onChange={handleChange}
                style={{ marginRight: '0.5rem' }}
              />
              I’ve read and agree to the Terms of Service and Privacy Policy.
            </label>
          </div>

          <button type="submit" className="login-btn">Sign Up</button>

          <button
            type="button"
            onClick={() => navigate('/login')}
            className="guest-btn"
            style={{ marginTop: '0.75rem' }}
          >
            Back to Login
          </button>
        </form>
      </div>
    </div>
  );
}

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
