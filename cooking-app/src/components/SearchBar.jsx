import React, { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value); // 🔁 Live search on each keystroke
  };

  const handleClick = () => {
    onSearch(query); // Optional manual trigger
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search recipes by title or ingredient..."
        value={query}
        onChange={handleChange}
        style={{
          flex: 1,
          padding: '0.5rem',
          border: '2px solid var(--color-primary)',
          borderRadius: 'var(--radius)',
          fontSize: '1rem',
        }}
      />
      <button onClick={handleClick} style={{
        padding: '0.5rem 1rem',
        backgroundColor: 'var(--color-primary)',
        color: '#fff',
        border: 'none',
        borderRadius: 'var(--radius)',
        marginLeft: '0.5rem',
        cursor: 'pointer',
      }}>
        Search
      </button>
    </div>
  );
}
