// import { useState } from 'react'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <div>
    
//     <h1>Counter App</h1>
//     <p data-testid="count">{count}</p>
//     <button onClick={()=>setCount(count+1)}>Increment</button>
//     </div>
//   )
// }

// export default App


// import React from "react";

// function App() {
//   const menuItems = [
//     { name: "Home" },
//     { 
//       name: "Services",
//       submenu: ["Web Development", "Design", "Marketing"]
//     },
//     { name: "About" },
//     { name: "Contact" }
//   ];

//   return (
//     <div>
//       <h1>My Website</h1>
//       <ul data-testid="menu">
//         {menuItems.map((item, index) => (
//           <li key={index} className="menu-item">
//             {item.name}
//             {item.submenu && (
//               <ul data-testid="submenu">
//                 {item.submenu.map((sub, subIndex) => (
//                   <li key={subIndex} className="submenu-item">{sub}</li>
//                 ))}
//               </ul>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;


// import React, { useState } from "react";
// import "./App.css"; // optional for styling

// function App() {
//   const menuItems = [
//     { name: "Home" },
//     { 
//       name: "Services",
//       submenu: ["Web Development", "Design", "Marketing"]
//     },
//     { name: "About" },
//     { name: "Contact" }
//   ];

//   const [activeMenu, setActiveMenu] = useState(null);

//   const toggleSubmenu = (index) => {
//     setActiveMenu(activeMenu === index ? null : index);
//   };

//   return (
//     <div>
//       <h1>My Website</h1>
//       <ul data-testid="menu">
//         {menuItems.map((item, index) => (
//           <li 
//             key={index} 
//             className="menu-item" 
//             onClick={() => toggleSubmenu(index)}
//             style={{ cursor: 'pointer', margin: '5px 0' }}
//           >
//             {item.name}
//             {item.submenu && activeMenu === index && (
//               <ul data-testid="submenu" style={{ marginLeft: '20px', borderLeft: '1px solid #ccc', paddingLeft: '10px' }}>
//                 {item.submenu.map((sub, subIndex) => (
//                   <li key={subIndex} className="submenu-item">{sub}</li>
//                 ))}
//               </ul>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;


import React, { useState } from "react";
import "./calendar.css"; 
function Calendar() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [selected, setSelected] = useState({ month: null, day: null });

  const today = new Date();
  const todayDay = today.getDate();
  const todayMonth = today.getMonth();
  const todayYear = today.getFullYear();

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDaysInMonth = (monthIndex, year) =>
    new Date(year, monthIndex + 1, 0).getDate();

  const getFirstDayOfMonth = (monthIndex, year) =>
    new Date(year, monthIndex, 1).getDay();

  const handlePrevYear = () => setYear(year - 1);
  const handleNextYear = () => setYear(year + 1);

  return (

    <div className="calendar-container">
      <div className="global-page">
        <h1>Hello, Aqeel , Start planning today</h1>
      </div>
    
      
      <h1 data-testid="calendar-title">Calendar {year}</h1>

      <div className="year-buttons">
        <button onClick={handlePrevYear} data-testid="prev-year">
          Previous Year
        </button>
        <button onClick={handleNextYear} data-testid="next-year">
          Next Year
        </button>
      </div>

      <div className="month-grid" data-testid="month-grid">
        {months.map((month, monthIndex) => {
          const daysInMonth = getDaysInMonth(monthIndex, year);
          const firstDay = getFirstDayOfMonth(monthIndex, year);
          const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
          const emptySlots = Array.from({ length: firstDay });

          return (
            <div key={month} className="month-box" data-testid={`month-${month}`}>
              <h2>{month}</h2>

              <div className="weekday-header">
                {weekDays.map((day) => (
                  <div key={day}>{day}</div>
                ))}
              </div>

              <div className="days-grid">
                {emptySlots.map((_, i) => (
                  <div key={`empty-${i}`}></div>
                ))}

                {days.map((day) => {
                  const isToday = day === todayDay && monthIndex === todayMonth && year === todayYear;
                  const isSelected = selected.month === month && selected.day === day;

                  return (
                    <div
                      key={day}
                      data-testid={`day-${month}-${day}`}
                      onClick={() => setSelected({ month, day })}
                      className={`${isToday ? "today" : ""} ${isSelected ? "selected" : ""}`}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {selected.month && (
        <p className="selected-date" data-testid="selected-date">
          Selected date: {selected.day} {selected.month} {year}
        </p>
      )}
    </div>

  );
}

export default Calendar;
