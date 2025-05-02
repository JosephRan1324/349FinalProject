// src/components/MealPlanner.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/global.css';

function MealPlanner() {
  const navigate = useNavigate();

  const handleDateChange = (date) => {
    const formattedDate = encodeURIComponent(date.toDateString());
    navigate(`/planner/day?date=${formattedDate}`);
  };

  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i % 12 === 0 ? 12 : i % 12;
    const suffix = i < 12 ? 'AM' : 'PM';
    return `${hour}:00 ${suffix}`;
  });

  return (
    <div className="meal-planner">
      <h2 className="page-title">Weekly Meal Planner</h2>
      <Calendar
        onChange={handleDateChange}
        tileContent={({ date }) => {
          const formattedDate = date.toDateString();
          const hasMeal = timeSlots.some((time) =>
            localStorage.getItem(`${formattedDate}_${time}`)
          );

          return (
            <div className="date-indicator-wrapper">
              <div
                className={`date-indicator ${
                  hasMeal ? 'has-meals' : 'no-meals'
                }`}
              ></div>
            </div>
          );
        }}
      />
    </div>
  );
}

export default MealPlanner;
