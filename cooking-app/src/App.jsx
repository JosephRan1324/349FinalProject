import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation
} from 'react-router-dom';

import recipesData from './data/recipes.json';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import RecipeCard from './components/RecipeCard';
import RecipeDetail from './components/RecipeDetail';
import Favorites from './components/Favorites';
import MealPlanner from './components/MealPlanner';
import DayPlanner from './components/DayPlanner';
import TimeSlotPage from './components/TimeSlotPage';
import SearchPage from './components/SearchPage';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';

function Layout() {
  const location = useLocation();
  const [displayedRecipes, setDisplayedRecipes] = React.useState(recipesData);
  const [currentPage, setCurrentPage] = React.useState(1);

  const recipesPerPage = 20;
  const totalPages = Math.ceil(displayedRecipes.length / recipesPerPage);
  const startIndex = (currentPage - 1) * recipesPerPage;
  const currentRecipes = displayedRecipes.slice(startIndex, startIndex + recipesPerPage);

  const handleSearch = (query) => {
    const filtered = recipesData.filter((r) =>
      r.title.toLowerCase().includes(query.toLowerCase()) ||
      r.ingredients.some((i) => i.toLowerCase().includes(query.toLowerCase()))
    );
    setDisplayedRecipes(filtered);
    setCurrentPage(1);
  };

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="app-container">
      <NavBar />

      <header
        className="mb-4"
        style={{
          backgroundColor: '#D7CCC8',
          padding: '1.5rem 2rem',
          borderBottom: '1px solid #ddd',
        }}
      >
        <h1 className="text-3xl font-bold mb-2">Recipe Explorer</h1>
      </header>

      {(location.pathname === "/" || location.pathname === "/search") && (
        <>
          <SearchBar onSearch={handleSearch} />
          <FilterPanel
            onFilter={(filtered) => {
              setDisplayedRecipes(filtered);
              setCurrentPage(1);
            }}
            allRecipes={recipesData}
          />
        </>
      )}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {currentRecipes.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>

              {/* Pagination */}
              <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                <button onClick={handlePrev} className="btn" disabled={currentPage === 1}>
                  ← Previous
                </button>
                <span style={{ fontSize: '1rem', alignSelf: 'center' }}>
                  Page {currentPage} of {totalPages}
                </span>
                <button onClick={handleNext} className="btn" disabled={currentPage === totalPages}>
                  Next →
                </button>
              </div>
            </>
          }
        />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/planner" element={<MealPlanner />} />
        <Route path="/planner/day" element={<DayPlanner />} />
        <Route path="/planner/slot" element={<TimeSlotPage />} />
        <Route path="/search" element={<SearchPage recipes={displayedRecipes} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default function App() {
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/*"
          element={isLoggedIn ? <Layout /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}
