import "cypress-file-upload";

describe('template spec', () => {
  it('fills out the form', () => {
    cy.visit('https://demoqa.com/automation-practice-form');

    // Fill out the form fields
    cy.get('#firstName').type('Laura');
    cy.get('#lastName').type('Zveja');
    cy.get('#userEmail').type('laurazveja@example.com');
    cy.get('.custom-radio').contains('Female').click();
    cy.get('#userNumber').type('1234567890');

    // Set Date of Birth to 28th of February, 1930
    cy.get('#dateOfBirthInput').click();
    cy.get('.react-datepicker__month-select').select('February');
    cy.get('.react-datepicker__year-select').select('1930');
    cy.get('.react-datepicker__day--028').eq(1).click();

    // Set Subjects to Economics
    cy.get('#subjectsInput').type('Economics');
    cy.get('.subjects-auto-complete__menu-list').contains('Economics').click();

    // Set Hobbies to Music
    cy.get('#hobbiesWrapper').contains('Music').click();

    // Upload an image
    const imageFilePath = 'files/random-image.jpg';
    cy.get('#uploadPicture').attachFile(imageFilePath);

    // Fill Current Address field
    cy.get('#currentAddress').type('Inženieru iela 101A, Ventspils, LV-3601');

    cy.get('#stateCity-wrapper').within(() => {
      cy.get('#state').click(); // Click on the state select to open the dropdown
      cy.get('#react-select-3-option-0').click(); // Click on the option with the text 'NCR'
    });

    cy.get('#stateCity-wrapper').within(() => {
      cy.get('#city').click(); // Click on the city select to open the dropdown
      cy.get('#react-select-4-option-0').click(); // Click on the option with the text 'Delhi'
    });

    cy.get('#submit').click();


    // Validate First Name
    cy.get('.table-responsive').contains('Student Name').parent().within(() => {
      cy.get('td').eq(1).should('have.text', 'Laura Zveja');
    });

    // Validate Email
    cy.get('.table-responsive').contains('Student Email').parent().within(() => {
      cy.get('td').eq(1).should('have.text', 'laurazveja@example.com');
    });

    // Validate Gender
    cy.get('.table-responsive').contains('Gender').parent().within(() => {
      cy.get('td').eq(1).should('have.text', 'Female');
    });

    // Validate Mobile
    cy.get('.table-responsive').contains('Mobile').parent().within(() => {
      cy.get('td').eq(1).should('have.text', '1234567890');
    });

    // Validate Date of Birth
    cy.get('.table-responsive').contains('Date of Birth').parent().within(() => {
      cy.get('td').eq(1).should('have.text', '28 February,1930');
    });

    // Validate Subjects
    cy.get('.table-responsive').contains('Subjects').parent().within(() => {
      cy.get('td').eq(1).should('have.text', 'Economics');
    });

     // Validate Hobbies
     cy.get('.table-responsive').contains('Hobbies').parent().within(() => {
      cy.get('td').eq(1).should('have.text', 'Music');
    });

    // Validate Picture
    cy.get('.table-responsive').contains('Picture').parent().within(() => {
      cy.get('td').eq(1).should('contain', 'random-image.jpg');
    });

    // Validate Address
    cy.get('.table-responsive').contains('Address').parent().within(() => {
      cy.get('td').eq(1).should('have.text', 'Inženieru iela 101A, Ventspils, LV-3601');
    });

    // Validate State and City
    cy.get('.table-responsive').contains('State and City').parent().within(() => {
      cy.get('td').eq(1).should('have.text', 'NCR Delhi');
  });
});
});
