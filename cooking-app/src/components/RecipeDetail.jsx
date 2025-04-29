import React from "react";
import { useParams } from "react-router-dom";
import recipesData from "../data/recipes.json"; // Import your recipes data

export default function RecipeDetail() {
  const { id } = useParams(); // Get the recipe ID from the URL params
  const recipe = recipesData.find((r) => r.id === parseInt(id)); // Find the recipe by its ID

  // If no recipe is found, show a fallback message
  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <div className="recipe-detail">
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
  );
}
