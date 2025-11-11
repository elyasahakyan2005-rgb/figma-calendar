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

  const getDaysInMonth = (monthIndex, year) => {
    return new Date(year, monthIndex + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (monthIndex, year) => {
    return new Date(year, monthIndex, 1).getDay(); 
  };

  const handlePrevYear = () => setYear(year - 1);
  const handleNextYear = () => setYear(year + 1);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1 data-testid="calendar-title">Calendar {year}</h1>

      <div style={{ marginBottom: "20px" }}>
        <button onClick={handlePrevYear} data-testid="prev-year">Previous Year</button>
        <button onClick={handleNextYear} style={{ marginLeft: "10px" }} data-testid="next-year">Next Year</button>
      </div>

      <div
        data-testid="month-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
        }}
      >
        {months.map((month, monthIndex) => {
          const daysInMonth = getDaysInMonth(monthIndex, year);
          const firstDay = getFirstDayOfMonth(monthIndex, year);
          const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
          const emptySlots = Array.from({ length: firstDay });

          return (
            <div
              key={month}
              data-testid={`month-${month}`}
              style={{
                border: "1px solid #ccc",
                borderRadius: "10px",
                padding: "10px",
              }}
            >
              <h2>{month}</h2>

              <div
                className="weekday-header"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(7, 1fr)",
                  fontWeight: "bold",
                  marginBottom: "5px",
                }}
              >
                {weekDays.map((day) => (
                  <div key={day}>{day}</div>
                ))}
              </div>

             
              <div
                className="days-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(7, 1fr)",
                  gap: "5px",
                }}
              >
                {emptySlots.map((_, i) => (
                  <div key={`empty-${i}`}></div>
                ))}

                {days.map((day) => {
                  const isToday =
                    day === todayDay &&
                    monthIndex === todayMonth &&
                    year === todayYear;

                  return (
                    <div
                      key={day}
                      data-testid={`day-${month}-${day}`}
                      onClick={() => setSelected({ month, day })}
                      style={{
                        padding: "8px",
                        border: "1px solid #eee",
                        cursor: "pointer",
                        backgroundColor: isToday
                          ? "#1976d2"
                          : selected.month === month && selected.day === day
                          ? "#4caf50"
                          : "white",
                        color:
                          isToday || (selected.month === month && selected.day === day)
                            ? "white"
                            : "black",
                        borderRadius: "4px",
                        fontWeight: isToday ? "bold" : "normal",
                      }}
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
        <p data-testid="selected-date" style={{ marginTop: "20px" }}>
          Selected date: {selected.day} {selected.month} {year}
        </p>
      )}
    </div>
  );
}

export default Calendar;
