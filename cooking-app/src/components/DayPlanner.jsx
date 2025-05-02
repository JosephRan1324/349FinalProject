import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function DayPlanner() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const date = queryParams.get('date');

  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i % 12 === 0 ? 12 : i % 12;
    const suffix = i < 12 ? 'AM' : 'PM';
    return `${hour}:00 ${suffix}`;
  });

  const savedMeals = {};
  timeSlots.forEach((time) => {
    const key = `${date}_${time}`;
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        savedMeals[time] = parsed.title || '--------';
      } catch {
        savedMeals[time] = saved;
      }
    }
  });

  const handleTimeClick = (time) => {
    navigate(`/planner/slot?date=${encodeURIComponent(date)}&time=${encodeURIComponent(time)}`);
  };

  return (
    <div className="meal-planner">
      {/* 🔙 Back to Calendar */}
      <button
        className="btn"
        onClick={() => navigate('/planner')}
        style={{ marginBottom: '1rem' }}
      >
        ⬅️ Back to Calendar
      </button>

      <h2 className="page-title">Meal Plan for {date}</h2>
      <div className="timeline">
        {timeSlots.map((time) => (
          <div
            key={time}
            className="timeline-row"
            onClick={() => handleTimeClick(time)}
            style={{ cursor: 'pointer', padding: '0.75rem 1rem', borderBottom: '1px solid #ccc' }}
          >
            <strong>{time}:</strong> {savedMeals[time] || '--------'}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DayPlanner;
