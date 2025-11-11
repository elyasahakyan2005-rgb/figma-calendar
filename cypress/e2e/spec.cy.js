// describe('React Counter App', () => {
//   it('Visits the app and increments the counter', () => {
//     // Visit the app (make sure your dev server is running)
//     cy.visit('http://localhost:5173')

//     // Check the header
//     cy.contains('Counter App')

//     // Check initial count
//     cy.get('[data-testid="count"]').should('have.text', '0')

//     // Click the increment button
//     cy.contains('Increment').click()

//     // Verify the count increased
//     cy.get('[data-testid="count"]').should('have.text', '1')
//   })
// })


// describe('Menu with Submenu Test', () => {
//   it('Counts main menu and submenu items', () => {
//     cy.visit('http://localhost:5173');

    
//     cy.contains('My Website');

   
//     cy.get('[data-testid="menu"]')
//       .find('.menu-item')
//       .should('have.length', 4);

   
//     cy.get('[data-testid="submenu"]') 
//       .find('.submenu-item')
//       .should('have.length', 3);

//     cy.get('.submenu-item').eq(0).should('have.text', 'Web Development');
//     cy.get('.submenu-item').eq(1).should('have.text', 'Design');
//     cy.get('.submenu-item').eq(2).should('have.text', 'Marketing');
//   });
// });



// describe('Displays submenu when main menu is clicked', () => {
//   it('Shows submenu items after clicking main menu', () => {
//     cy.visit('http://localhost:5173');

//     // Verify header
//     cy.contains('My Website');

//     // Submenu should not exist initially
//     cy.get('[data-testid="submenu"]').should('not.exist');

//     // Click "Services" to show submenu
//     cy.contains('Services').click();

//     // Submenu should now appear
//     cy.get('[data-testid="submenu"]')
//       .find('.submenu-item')
//       .should('have.length', 3);

//     // Verify submenu item texts
//     cy.get('.submenu-item').eq(0).should('have.text', 'Web Development');
//     cy.get('.submenu-item').eq(1).should('have.text', 'Design');
//     cy.get('.submenu-item').eq(2).should('have.text', 'Marketing');

//     // Click "Services" again to hide submenu
//     cy.contains('Services').click();
//     cy.get('[data-testid="submenu"]').should('not.exist');
//   });
// });


describe('Calendar shows real weekdays and today highlight', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });

  it('Displays all 12 months', () => {
    cy.get('[data-testid="month-grid"]').find('h2').should('have.length', 12);
  });

  it('Displays weekdays headers (Sun–Sat)', () => {
    cy.get('.weekday-header').first().find('div').then(($divs) => {
      const days = $divs.toArray().map((d) => d.innerText);
      expect(days).to.deep.equal(["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]);
    });
  });

  it('Highlights today correctly', () => {
    const today = new Date();
    const monthName = today.toLocaleString("default", { month: "long" });
    const day = today.getDate();

    cy.get(`[data-testid="day-${monthName}-${day}"]`)
      .should('have.css', 'background-color')
      .and('match', /rgb\(25, 118, 210\)/); 
  });

  it('Allows selecting a different date', () => {
    cy.get('[data-testid="day-January-5"]').click();
    cy.get('[data-testid="selected-date"]').should('contain', '5 January');
  });
});
