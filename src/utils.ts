export const getDaysInMonth = (year: number, month: number): number => {
    return new Date(year, month + 1, 0).getDate(); // Last date of the month
  };
  
  export const getFirstDayOfMonth = (year: number, month: number): number => {
    return new Date(year, month, 1).getDay(); // Day index: 0 (Sun) to 6 (Sat)
  };
  
  export const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  export const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];