import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function SearchPage({ recipes }) {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const date = queryParams.get('date');
  const time = queryParams.get('time');

  const handleSelect = (id) => {
    navigate(`/recipe/${id}?date=${encodeURIComponent(date)}&time=${encodeURIComponent(time)}`);
  };

  return (
    <div className="meal-planner">
      <div style={{ marginTop: '1rem' }}>
        <h2 className="page-title">Select a Recipe</h2>
        <p>For {time} on {date}</p>

        <div className="grid" style={{ marginTop: '2rem' }}>
          {recipes.map(recipe => (
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
      </div>
    </div>
  );
}

export default SearchPage;
