import { useState } from "react";
import { cn } from "@/lib/utils";

export const Calendar = () => {
  const [currentDate] = useState(new Date()); // Use current date
  
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = (firstDay.getDay() + 6) % 7; // Make Monday = 0
    
    const days = [];
    
    // Previous month days
    const prevMonth = new Date(year, month - 1, 0);
    const prevMonthDays = prevMonth.getDate();
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push({
        day: prevMonthDays - i,
        isCurrentMonth: false,
        isToday: false
      });
    }
    
    // Current month days
    const today = new Date();
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = today.getDate() === day && 
                     today.getMonth() === month && 
                     today.getFullYear() === year;
      days.push({
        day,
        isCurrentMonth: true,
        isToday
      });
    }
    
    // Next month days to fill the grid
    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      days.push({
        day,
        isCurrentMonth: false,
        isToday: false
      });
    }
    
    return days;
  };
  
  const days = getDaysInMonth(currentDate);
  
  return (
    <div className="p-4">
      <div className="text-center mb-4">
        <h3 className="font-medium text-foreground">
          {monthNames[currentDate.getMonth()]}
        </h3>
        <p className="text-sm text-muted-foreground">
          {currentDate.getFullYear()}
        </p>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((day) => (
          <div key={day} className="text-xs font-medium text-muted-foreground text-center p-1">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => (
          <button
            key={index}
            className={cn(
              "text-xs p-2 rounded hover:bg-muted transition-colors",
              !day.isCurrentMonth && "text-muted-foreground opacity-50",
              day.isCurrentMonth && "text-foreground",
              day.isToday && "bg-primary text-primary-foreground font-semibold"
            )}
          >
            {day.day}
          </button>
        ))}
      </div>
    </div>
  );
};