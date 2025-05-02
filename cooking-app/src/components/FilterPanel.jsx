import React, { useState } from 'react';

export default function FilterPanel({ allRecipes, onFilter }) {
  const [difficulty, setDifficulty] = useState('');

  const applyFilter = () => {
    let filtered = allRecipes;
    if (difficulty) {
      filtered = filtered.filter(r => r.difficulty === difficulty);
    }
    onFilter(filtered);
  };

  return (
    <div className="filter-panel">
      <select value={difficulty} onChange={e => setDifficulty(e.target.value)}>
        <option value="">All Difficulties</option>
        <option value="Easy">Easy</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Expert">Expert</option>
      </select>
      <button className="btn" onClick={applyFilter}>Apply</button>
    </div>
  );
}
