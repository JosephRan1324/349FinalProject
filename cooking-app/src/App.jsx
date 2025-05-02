// src/App.jsx
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import recipesData from "./data/recipes.json";
import SearchBar from "./components/SearchBar";
import FilterPanel from "./components/FilterPanel";
import RecipeCard from "./components/RecipeCard";
import RecipeDetail from "./components/RecipeDetail";
import Favorites from "./components/Favorites";
import MealPlanner from "./components/MealPlanner";
import DayPlanner from "./components/DayPlanner";
import TimeSlotPage from "./components/TimeSlotPage";
import SearchPage from "./components/SearchPage";
import NavBar from "./components/NavBar";
import Login from "./components/Login";

function Layout() {
  const location = useLocation();
  const [displayedRecipes, setDisplayedRecipes] = useState(recipesData);

  const handleSearch = (query) => {
    const filtered = recipesData.filter((r) =>
      r.title.toLowerCase().includes(query.toLowerCase()) ||
      r.ingredients.some((i) => i.toLowerCase().includes(query.toLowerCase()))
    );
    setDisplayedRecipes(filtered);
  };

  return (
    <div className="app-container">
      <NavBar />
      <header className="mb-4">
        <h1 className="text-3xl font-bold mb-2">Recipe Explorer</h1>
      </header>

      {(location.pathname === "/" || location.pathname === "/search") && (
        <>
          <SearchBar onSearch={handleSearch} />
          <FilterPanel onFilter={setDisplayedRecipes} allRecipes={recipesData} />
        </>
      )}

      <Routes>
        <Route path="/" element={
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {displayedRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        } />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/planner" element={<MealPlanner />} />
        <Route path="/planner/day" element={<DayPlanner />} />
        <Route path="/planner/slot" element={<TimeSlotPage />} />
        <Route path="/search" element={<SearchPage recipes={displayedRecipes} />} />
        <Route path="/profile" element={<div className="meal-planner"><h2>👤 Profile Page (Coming Soon)</h2></div>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const status = localStorage.getItem("loggedIn");
    setIsLoggedIn(status === "true");
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={isLoggedIn ? <Layout /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}
