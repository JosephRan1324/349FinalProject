// src/components/RecipeDetail.jsx
import React from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import recipesData from "../data/recipes.json";

export default function RecipeDetail() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const recipe = recipesData.find((r) => r.id === parseInt(id));
  const queryParams = new URLSearchParams(location.search);
  const date = queryParams.get("date");
  const time = queryParams.get("time");

  if (!recipe) return <div>Recipe not found</div>;

  const handleSave = () => {
    const key = `${date}_${time}`;
    localStorage.setItem(key, JSON.stringify(recipe));
    navigate(`/planner/slot?date=${encodeURIComponent(date)}&time=${encodeURIComponent(time)}`);
  };

  return (
    <div className="recipe-detail">
      <div style={{ marginBottom: date && time ? '2rem' : '0' }}>
        <h1>{recipe.title}</h1>
        <img src={recipe.image} alt={recipe.title} />
        <p>{recipe.description}</p>

        <h2>Directions:</h2>
        <ol>
          {recipe.directions.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>

        <h3>Difficulty: {recipe.difficulty}</h3>
        <h3>Prep Time: {recipe.prepTime}</h3>

        <h3>Nutrition:</h3>
        <ul>
          <li>Calories: {recipe.nutrition.calories}</li>
          <li>Protein: {recipe.nutrition.protein_g}g</li>
          <li>Fat: {recipe.nutrition.fat_g}g</li>
          <li>Carbs: {recipe.nutrition.carbs_g}g</li>
        </ul>
      </div>

      {date && time && (
        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <button className="btn-planner" onClick={handleSave}>
            Confirm and Save
          </button>
        </div>
      )}
    </div>
  );
}
