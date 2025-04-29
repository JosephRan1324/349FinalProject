import React from 'react';
import { Link } from 'react-router-dom';
export default function RecipeCard({ recipe }) {
  return (
    <Link to={`/recipe/${recipe.id}`} className="card">
      <img src={recipe.image} alt={recipe.title} />
      <h3>{recipe.title}</h3>
      <p>{recipe.prepTime} mins | {recipe.difficulty}</p>
    </Link>
  );
}
