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

  const getDaysInMonth = (monthIndex, year) => new Date(year, monthIndex + 1, 0).getDate();
  const getFirstDayOfMonth = (monthIndex, year) => new Date(year, monthIndex, 1).getDay();

  const handlePrevYear = () => setYear(year - 1);
  const handleNextYear = () => setYear(year + 1);

  const colors = {
    brown: "#8B5E3C",
    lightBrown: "#D2B48C",
    offWhite: "#FFF8F0",
    lighterBrown: "#A47150",
    hoverLight: "#F5DEB3",
    textDark: "#3E2723",
  };

  const containerStyle = {
    textAlign: "center",
    padding: "20px",
    fontFamily: "Segoe UI, Roboto, Helvetica, Arial, sans-serif",
    backgroundColor: colors.offWhite,
    color: colors.textDark,
    minHeight: "100vh",
  };

  const buttonStyle = {
    backgroundColor: colors.brown,
    color: colors.offWhite,
    border: "none",
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: 500,
    marginLeft: "10px",
  };

  const monthBoxStyle = {
    border: `1px solid ${colors.lightBrown}`,
    borderRadius: "10px",
    padding: "10px",
    backgroundColor: colors.offWhite,
    boxShadow: `0 2px 6px rgba(139, 94, 60, 0.3)`,
  };

  const weekdayHeaderStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    fontWeight: "bold",
    marginBottom: "5px",
    backgroundColor: colors.lightBrown,
    borderRadius: "5px",
    padding: "5px 0",
    color: colors.textDark,
  };

  const daysGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: "5px",
  };

  const dayCellStyle = (isToday, isSelected) => ({
    padding: "8px",
    border: `1px solid ${colors.lightBrown}`,
    borderRadius: "4px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    backgroundColor: isToday
      ? colors.brown
      : isSelected
      ? colors.lighterBrown
      : colors.offWhite,
    color: isToday || isSelected ? colors.offWhite : colors.textDark,
    fontWeight: isToday ? "bold" : "normal",
  });

  const dayHoverStyle = {
    backgroundColor: colors.hoverLight,
  };

  return (
    <div style={containerStyle}>
      <h1 data-testid="calendar-title" style={{ color: colors.brown }}>
        Calendar {year}
      </h1>

      <div style={{ marginBottom: "20px" }}>
        <button onClick={handlePrevYear} style={buttonStyle} data-testid="prev-year">
          Previous Year
        </button>
        <button onClick={handleNextYear} style={buttonStyle} data-testid="next-year">
          Next Year
        </button>
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
            <div key={month} data-testid={`month-${month}`} style={monthBoxStyle}>
              <h2 style={{ color: colors.brown }}>{month}</h2>

              <div style={weekdayHeaderStyle}>
                {weekDays.map((day) => (
                  <div key={day}>{day}</div>
                ))}
              </div>

              <div style={daysGridStyle}>
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
                      style={dayCellStyle(isToday, isSelected)}
                      onMouseEnter={(e) => {
                        if (!isToday && !isSelected) e.target.style.backgroundColor = colors.hoverLight;
                      }}
                      onMouseLeave={(e) => {
                        if (!isToday && !isSelected) e.target.style.backgroundColor = colors.offWhite;
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
        <p style={{ marginTop: "20px", fontSize: "1.1rem", fontWeight: "500", color: colors.brown }} data-testid="selected-date">
          Selected date: {selected.day} {selected.month} {year}
        </p>
      )}
    </div>
  );
}

export default Calendar;
