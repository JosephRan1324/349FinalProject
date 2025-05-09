import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import recipesData from '../data/recipes.json';

export default function Profile() {
  const [profile, setProfile] = useState({
    name: '',
    age: '',
    weight: '',
    image: '',
  });

  const [weeklyMeals, setWeeklyMeals] = useState({});
  const [dailyCalories, setDailyCalories] = useState({});
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem('profileData')) || {};
    setProfile(savedProfile);

    loadWeeklyMeals();

    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const matchedRecipes = recipesData.filter((r) => savedFavorites.includes(r.id));
    setFavoriteRecipes(matchedRecipes);
  }, []);

  const loadWeeklyMeals = () => {
    const meals = {};
    const calories = {};
    const now = new Date();
    const weekStart = new Date(now.setDate(now.getDate() - now.getDay())); // Sunday
    for (let i = 0; i < 7; i++) {
      const day = new Date(weekStart);
      day.setDate(weekStart.getDate() + i);
      const formattedDate = day.toDateString();

      const slots = Array.from({ length: 24 }, (_, h) => {
        const hour = h % 12 === 0 ? 12 : h % 12;
        const suffix = h < 12 ? 'AM' : 'PM';
        return `${hour}:00 ${suffix}`;
      });

      const mealsForDay = [];
      let totalCalories = 0;
      slots.forEach((time) => {
        const key = `${formattedDate}_${time}`;
        const saved = localStorage.getItem(key);
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            mealsForDay.push(parsed.title);
            totalCalories += parsed.nutrition?.calories || 0;
          } catch {
            mealsForDay.push(saved);
          }
        }
      });

      if (mealsForDay.length > 0) {
        meals[formattedDate] = mealsForDay;
        calories[formattedDate] = totalCalories;
      }
    }
    setWeeklyMeals(meals);
    setDailyCalories(calories);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...profile, [name]: value };
    setProfile(updated);
    localStorage.setItem('profileData', JSON.stringify(updated));
  };

  const clearFavorites = () => {
    localStorage.removeItem('favorites');
    setFavoriteRecipes([]);
  };

  const clearWeeklyMeals = () => {
    Object.keys(localStorage).forEach((key) => {
      if (key.includes('_AM') || key.includes('_PM')) {
        localStorage.removeItem(key);
      }
    });
    setWeeklyMeals({});
    setDailyCalories({});
  };

  return (
    <div className="meal-planner" style={{ display: 'flex', justifyContent: 'space-between', gap: '2rem', padding: '2rem' }}>
      {/* Center Section */}
      <div style={{ flex: 2 }}>
        <h2 className="page-title">My Weekly Meal Plan</h2>
        {Object.keys(weeklyMeals).length === 0 ? (
          <p>No meals planned this week.</p>
        ) : (
          Object.entries(weeklyMeals).map(([day, meals]) => (
            <div key={day} style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ marginBottom: '0.5rem' }}>{day}</h4>
              <ul style={{ paddingLeft: '1rem' }}>
                {meals.map((m, idx) => <li key={idx}>{m}</li>)}
              </ul>
            </div>
          ))
        )}

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          {Object.keys(weeklyMeals).length > 0 && (
            <button className="btn" onClick={clearWeeklyMeals}>
              Clear Weekly Meals
            </button>
          )}
          <button className="btn" onClick={() => navigate('/planner')}>
            Add Meal
          </button>
        </div>

        {/* Favorites Preview */}
        <div style={{ marginTop: '3rem' }}>
          <h2 className="page-title">My Favorite Recipes</h2>
          {favoriteRecipes.length === 0 ? (
            <p>You haven’t added any favorites yet.</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
              {favoriteRecipes.slice(0, 4).map((recipe) => (
                <div key={recipe.id} style={{ background: '#fff', borderRadius: '8px', padding: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', textAlign: 'center' }}>
                  <img src={recipe.image} alt={recipe.title} style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '6px' }} />
                  <h4 style={{ marginTop: '0.5rem' }}>{recipe.title}</h4>
                </div>
              ))}
            </div>
          )}

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            {favoriteRecipes.length > 0 && (
              <button className="btn" onClick={clearFavorites}>
                Clear Favorites
              </button>
            )}
            <button className="btn" onClick={() => navigate('/')}> 
              Add to Favorites
            </button>
          </div>
        </div>
      </div>

      {/* Right Side Profile Panel */}
      <div style={{
        flex: 1,
        alignSelf: 'flex-start',
        backgroundColor: '#fff',
        padding: '1.5rem',
        borderRadius: '1rem',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        maxWidth: '320px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <img
            src={profile.image || '/images/guest.jpeg'}
            alt="Profile"
            style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--color-primary)', marginBottom: '0.5rem' }}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  const updated = { ...profile, image: reader.result };
                  setProfile(updated);
                  localStorage.setItem('profileData', JSON.stringify(updated));
                };
                reader.readAsDataURL(file);
              }
            }}
            style={{ fontSize: '0.85rem' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
          <label>
            Name:
            <input name="name" value={profile.name} onChange={handleChange} placeholder="Enter name" style={inputStyle} />
          </label>

          <label>
            Age:
            <input name="age" value={profile.age} onChange={handleChange} placeholder="Enter age" style={inputStyle} />
          </label>

          <label>
            Weight:
            <input name="weight" value={profile.weight} onChange={handleChange} placeholder="Enter weight" style={inputStyle} />
          </label>
        </div>

        <div>
          <h3 style={{ marginBottom: '0.5rem' }}>Calorie Summary</h3>
          {Object.entries(dailyCalories).length === 0 ? (
            <p>No calorie data yet.</p>
          ) : (
            <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
              {Object.entries(dailyCalories).map(([day, cal]) => (
                <li key={day} style={{ marginBottom: '0.25rem' }}>
                  <strong>{day}:</strong> {cal} kcal
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '0.5rem',
  marginTop: '0.25rem',
  border: '1px solid #ccc',
  borderRadius: '6px',
  fontSize: '1rem',
};
