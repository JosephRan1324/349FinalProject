import React, { useState } from 'react';
export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  const handle = () => onSearch(query);

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search recipes by title or ingredient..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && handle()}
      />
      <button onClick={handle}>Search</button>
    </div>
  );
}