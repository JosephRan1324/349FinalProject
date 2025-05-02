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

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  const handleSave = () => {
    const key = `${date}_${time}`;
    localStorage.setItem(key, recipe.title);
    navigate(`/planner/slot?date=${encodeURIComponent(date)}&time=${encodeURIComponent(time)}`);
  };

  return (
    <div className="recipe-detail">
      <div style={{ marginTop: '1rem' }}>
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
        <button
          className="btn-planner"
          style={{ position: "fixed", bottom: "2rem", right: "2rem" }}
          onClick={handleSave}
        >
          Confirm and Save
        </button>
      )}
    </div>
  );
}
