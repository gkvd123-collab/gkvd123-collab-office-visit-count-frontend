// src/components/Calendar.tsx
import React, { useState } from 'react';
import MonthView from '../components/MonthView';
import { monthNames } from '../utils';
import Header from '../components/Header';

interface CalendarProps {
  year: number;
}

const Calendar: React.FC<CalendarProps> = ({ year }) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const handleDateClick = (date: string) => {
    setSelectedDate(date);
    console.log(`You clicked on: ${date}`); // Or replace with more logic (e.g., modal)
  };

  return (
    <>
     <Header /> 
    <div className="calendar">
      <h1 className='calender-title'>Yearly Calendar - {year}</h1>
      {selectedDate && <p className='calender-title'>Selected Date: {selectedDate}</p>}

      <div className="months-grid">
        {monthNames.map((month, index) => (
          <MonthView
            key={index}
            year={year}
            monthIndex={index}
            monthName={month}
            onDateClick={handleDateClick}
          />
        ))}
      </div>
    </div>
    </>
  );
};

export default Calendar;
