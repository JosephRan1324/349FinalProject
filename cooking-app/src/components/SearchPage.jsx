import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function SearchPage({ recipes }) {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const date = queryParams.get('date');
  const time = queryParams.get('time');

  // Pagination setup
  const recipesPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(recipes.length / recipesPerPage);
  const startIndex = (currentPage - 1) * recipesPerPage;
  const currentRecipes = recipes.slice(startIndex, startIndex + recipesPerPage);

  const handleSelect = (id) => {
    navigate(`/recipe/${id}?date=${encodeURIComponent(date)}&time=${encodeURIComponent(time)}`);
  };

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="meal-planner">
      <div style={{ marginTop: '1rem' }}>
        <h2 className="page-title">Select a Recipe</h2>
        <p>For {time} on {date}</p>

        <div className="grid" style={{ marginTop: '2rem' }}>
          {currentRecipes.map(recipe => (
            <div
              key={recipe.id}
              className="card"
              onClick={() => handleSelect(recipe.id)}
              style={{ cursor: 'pointer' }}
            >
              <img src={recipe.image} alt={recipe.title} />
              <h3>{recipe.title}</h3>
              <p>{recipe.prepTime} mins | {recipe.difficulty}</p>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <button
            onClick={handlePrev}
            className="btn"
            disabled={currentPage === 1}
          >
            ← Previous
          </button>
          <span style={{ fontSize: '1rem', alignSelf: 'center' }}>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            className="btn"
            disabled={currentPage === totalPages}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
