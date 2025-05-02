import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function TimeSlotPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const date = queryParams.get('date');
  const time = queryParams.get('time');

  const [selectedMeal, setSelectedMeal] = useState(null);
  const key = `${date}_${time}`;

  useEffect(() => {
    const saved = localStorage.getItem(key);
    if (saved) {
      setSelectedMeal(saved);
    }
  }, [key]);

  const handleEdit = () => {
    navigate(`/search?date=${encodeURIComponent(date)}&time=${encodeURIComponent(time)}`);
  };

  const handleDelete = () => {
    localStorage.removeItem(key);
    setSelectedMeal(null);
  };

  const handleSave = () => {
    navigate(`/planner/day?date=${encodeURIComponent(date)}`);
  };

  return (
    <div className="meal-planner">
      <h2 className="page-title">Meal Slot: {time} on {date}</h2>

      {selectedMeal ? (
        <div style={{ marginTop: '2rem' }}>
          <p><strong>Selected Meal:</strong> {selectedMeal}</p>
          <button className="btn-planner" onClick={handleEdit} style={{ marginRight: '1rem' }}>
            Edit
          </button>
          <button className="btn" onClick={handleDelete} style={{ marginRight: '1rem' }}>
            Delete
          </button>
          <button className="btn" onClick={handleSave}>
            Save
          </button>
        </div>
      ) : (
        <div style={{ marginTop: '2rem' }}>
          <p>No meal selected.</p>
          <button className="btn-planner" onClick={handleEdit} style={{ marginRight: '1rem' }}>
            Add Meal
          </button>
          <button className="btn" onClick={handleSave}>
            Save
          </button>
        </div>
      )}
    </div>
  );
}

export default TimeSlotPage;
