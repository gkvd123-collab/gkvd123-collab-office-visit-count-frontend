// src/components/Calendar.tsx
import React, { useEffect, useState } from 'react';
import MonthView from '../components/MonthView';
import { monthNames } from '../utils';
import Header from '../components/Header';
import Modal from '../components/modal';
import { DateEntry, fetchDates } from '../services/api';
import Loader from '../components/Loader';

interface CalendarProps {
  year: number;
}

const Calendar: React.FC<CalendarProps> = ({ year }) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [onDutyDates, setGetData] = useState<DateEntry[]>([]);
  useEffect(() => {
    const token =  localStorage.getItem('token');
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetchDates(token || '');
        setGetData(response);
      } catch (err) {
        console.error('Login error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  

  const handleDateClick = (date: string) => {
    setSelectedDate(date);
    console.log(`You clicked on: ${date}`); // Or replace with more logic (e.g., modal)
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


  return (
    <>
     <Header /> 
    <div className="calendar">
      <h1 className='calender-title'>Yearly Calendar - {year}</h1>
      {/* {selectedDate && <p className='calender-title'>Selected Date: {selectedDate}</p>} */}

      <div className="months-grid">
        {monthNames.map((month, index) => (
          <MonthView
            key={index}
            year={year}
            monthIndex={index}
            monthName={month}
            onDateClick={handleDateClick}
            onDutyDates={onDutyDates}
          />
        ))}
      </div>

      {loading && <Loader />} {/* Display loader during login */}
    </div>

    /* Use the Modal component */
    {isModalOpen && (
        <Modal 
          date={selectedDate || ''} 
          onClose={handleCloseModal}
          // onConfirm={handleConfirm} 
        />
      )}


    </>
  );
};

export default Calendar;
