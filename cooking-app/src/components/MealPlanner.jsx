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

  return (
    <div className="meal-planner">
      <h2 className="page-title">Weekly Meal Planner</h2>
      <Calendar onChange={handleDateChange} />
    </div>
  );
}

export default MealPlanner;
