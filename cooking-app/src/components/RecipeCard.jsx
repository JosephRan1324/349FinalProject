// src/components/RecipeCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function RecipeCard({ recipe }) {
  return (
    <Link to={`/recipe/${recipe.id}`} className="card">
      <img src={recipe.image} alt={recipe.title} />

      <div className="card-content">
        <h3>{recipe.title}</h3>
        <p>{recipe.prepTime} | {recipe.difficulty}</p>
        
        <div className="ingredients-preview">
          <h4>Ingredients:</h4>
          <ul>
            {recipe.ingredients.map((ing, i) => (
              <li key={i}>{ing}</li>
            ))}
          </ul>
        </div>
      </div>
    </Link>
  );
}