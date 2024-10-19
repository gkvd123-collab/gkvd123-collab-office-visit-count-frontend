// src/components/MonthView.tsx
import React from 'react';
import { getDaysInMonth, getFirstDayOfMonth, weekDays } from '../utils';
import './MonthView.css';

interface MonthViewProps {
  year: number;
  monthIndex: number;
  monthName: string;
  onDateClick: (date: string) => void;
}

const MonthView: React.FC<MonthViewProps> = ({
  year,
  monthIndex,
  monthName,
  onDateClick,
}) => {
  const daysInMonth = getDaysInMonth(year, monthIndex);
  const firstDay = getFirstDayOfMonth(year, monthIndex);

  const handleDayClick = (day: number) => {
    const dateStr = `${year}-${monthIndex + 1}-${day}`; // Format as YYYY-MM-DD
    onDateClick(dateStr);
  };

  const emptyCells = Array.from({ length: firstDay }, (_, i) => (
    <div key={`e-${i}`} className="empty-cell" />
  ));

  const dayCells = Array.from({ length: daysInMonth }, (_, i) => (
    <div
      key={`d-${i + 1}`}
      className="day-cell"
      onClick={() => handleDayClick(i + 1)}
    >
      {i + 1}
    </div>
  ));

  return (
    <div className="month">
      <h2>{monthName}</h2>
      <div className="weekdays">
        {weekDays.map((day) => (
          <div key={day} className="weekday">
            {day}
          </div>
        ))}
      </div>
      <div className="days-grid">
        {emptyCells}
        {dayCells}
      </div>
    </div>
  );
};

export default MonthView;
