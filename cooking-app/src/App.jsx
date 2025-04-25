import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import recipesData from './data/recipes.json';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import RecipeCard from './components/RecipeCard';
import RecipeDetail from './components/RecipeDetail';
import Favorites from './components/Favorites';
import MealPlanner from './components/MealPlanner';

function App() {
  const [displayedRecipes, setDisplayedRecipes] = useState(recipesData);

  const handleSearch = (query) => {
    const filtered = recipesData.filter(r =>
      r.title.toLowerCase().includes(query.toLowerCase()) ||
      r.ingredients.some(i => i.toLowerCase().includes(query.toLowerCase()))
    );
    setDisplayedRecipes(filtered);
  };

  return (
    <BrowserRouter>
      <div className="app-container">
        <header>
          <h1>Cooking Web App</h1>
        </header>
        <SearchBar onSearch={handleSearch} />
        <FilterPanel onFilter={setDisplayedRecipes} allRecipes={recipesData} />
        <Routes>
          <Route path="/" element={
            <div className="grid">
              {displayedRecipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          } />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/planner" element={<MealPlanner />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;