// src/components/MealPlanner.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

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
    <div
      className="meal-planner"
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        padding: '2rem 0',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1200px',
          padding: '2rem',
          backgroundColor: '#fff',
          borderRadius: '1rem',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        }}
      >
        <h2 className="page-title" style={{ textAlign: 'center' }}>
          Weekly Meal Planner
        </h2>

        <Calendar
          className="full-width-calendar"
          onChange={handleDateChange}
          formatShortWeekday={(locale, date) =>
            date.toLocaleDateString(locale, { weekday: 'long' })
          }
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

        {/* 🔵 Legend below calendar */}
        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: '#66bb6a',
                }}
              ></div>
              <span style={{ fontSize: '1rem' }}>* Prepped</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: '#42a5f5',
                }}
              ></div>
              <span style={{ fontSize: '1rem' }}>* Not Prepped</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MealPlanner;
