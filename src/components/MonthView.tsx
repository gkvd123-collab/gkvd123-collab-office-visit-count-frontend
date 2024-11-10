// src/components/MonthView.tsx
import React from 'react';
import { getDaysInMonth, getFirstDayOfMonth, getWeekday, weekDays } from '../utils';
import './MonthView.css';
import { DateEntry } from '../services/api';

interface MonthViewProps {
  year: number;
  monthIndex: number;
  monthName: string;
  onDateClick: (date: string) => void;
  onDutyDates?: DateEntry[];
}

const MonthView: React.FC<MonthViewProps> = ({
  year,
  monthIndex,
  monthName,
  onDateClick,
  onDutyDates
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

  const onDutyDateStrings = onDutyDates?.map((onDutydate) =>
    new Date(onDutydate.date).toISOString().split('T')[0]
  );
  const dayCells = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    
    const weekdayIndex = getWeekday(year, monthIndex, day);
    const isWeekend = weekdayIndex === 0 || weekdayIndex === 6;
    const dateStr = `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
    const isOnDuty = onDutyDateStrings?.includes(dateStr);
    return (
      <div key={`d-${day}`} className={isWeekend ? 'disabled-day' :isOnDuty ? 'on-duty-day' : 'day-cell'} 
        onClick={!(isWeekend || isOnDuty) ? () => handleDayClick(day) : undefined}>
        {day}
      </div>
    );
  });

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
