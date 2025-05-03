import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import recipesData from "../data/recipes.json";
import "../styles/global.css";

export default function Favorites() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(stored);
  }, []);

  const removeFavorite = (id) => {
    const updated = favorites.filter((fid) => fid !== id);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const favRecipes = recipesData.filter((r) => favorites.includes(r.id));

  return (
    <div className="favorites-page" style={{ padding: "2rem" }}>
      <h1>My Favorites</h1>

      {favRecipes.length === 0 ? (
        <p>You haven’t favorited any recipes yet.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {favRecipes.map((recipe) => (
            <div key={recipe.id} style={cardStyle}>
              <img
                src={recipe.image}
                alt={recipe.title}
                style={imageStyle}
              />
              <h3 style={{ margin: "0.5rem 0" }}>{recipe.title}</h3>

              <div style={{ display: "flex", gap: "0.5rem", marginTop: "auto" }}>
                <button
                  onClick={() => navigate(`/recipe/${recipe.id}`)}
                  style={viewButtonStyle}
                >
                  View Details
                </button>
                <button
                  onClick={() => removeFavorite(recipe.id)}
                  style={removeButtonStyle}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const cardStyle = {
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#fff",
  borderRadius: "8px",
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  padding: "1rem",
  height: "100%",
};

const imageStyle = {
  width: "100%",
  height: "140px",
  objectFit: "cover",
  borderRadius: "4px",
};

const viewButtonStyle = {
  flex: 1,
  padding: "0.5rem",
  backgroundColor: "var(--color-primary)",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const removeButtonStyle = {
  flex: 1,
  padding: "0.5rem",
  backgroundColor: "transparent",
  color: "var(--color-primary)",
  border: "1px solid var(--color-primary)",
  borderRadius: "6px",
  cursor: "pointer",
};