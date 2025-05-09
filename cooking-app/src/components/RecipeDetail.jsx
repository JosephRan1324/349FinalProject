import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import recipesData from "../data/recipes.json";

export default function RecipeDetail() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const recipeId = parseInt(id, 10);

  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("favorites")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const isFavorited = favorites.includes(recipeId);

  const toggleFavorite = () => {
    setFavorites((prev) =>
      isFavorited
        ? prev.filter((rid) => rid !== recipeId)
        : [...prev, recipeId]
    );
  };

  const recipe = recipesData.find((r) => r.id === recipeId);
  if (!recipe) return <div>Recipe not found</div>;

  const queryParams = new URLSearchParams(location.search);
  const date = queryParams.get("date");
  const time = queryParams.get("time");

  const handleSave = () => {
    const key = `${date}_${time}`;
    localStorage.setItem(key, JSON.stringify(recipe));
    navigate(`/planner/slot?date=${encodeURIComponent(date)}&time=${encodeURIComponent(time)}`);
  };

  const handleBack = () => {
    if (date && time) {
      navigate(`/search?date=${encodeURIComponent(date)}&time=${encodeURIComponent(time)}`);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="recipe-detail" style={{ padding: '2rem' }}>
      {/* 🔙 Back to Explore Button - Smart routing */}
      <button
        className="btn"
        onClick={handleBack}
        style={{ marginBottom: '1.5rem' }}
      >
        ← Back to Explore
      </button>

      <h1>{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} />
      <p>{recipe.description}</p>

      <button
        className="btn-favorite"
        onClick={toggleFavorite}
        style={{ margin: "1rem 0" }}
      >
        {isFavorited ? "★ Remove from Favorites" : "☆ Add to Favorites"}
      </button>

      <h2>Ingredients:</h2>
      <ul>
        {recipe.ingredients.map((ing, idx) => (
          <li key={idx}>{ing}</li>
        ))}
      </ul>

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

      {date && time && (
        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          <button className="btn-planner" onClick={handleSave}>
            Confirm and Save
          </button>
        </div>
      )}
    </div>
  );
}
