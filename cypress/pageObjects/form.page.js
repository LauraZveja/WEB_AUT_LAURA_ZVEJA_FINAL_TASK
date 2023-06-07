import BasePage from "./base.page";
import FormElements from "./form.elements";
import 'cypress-file-upload';

class FormPage extends BasePage {
    static get url() {
        return "/automation-practice-form";
    }

    static fillForm() {
        cy.get(FormElements.firstName).type('Laura');
        cy.get(FormElements.lastName).type('Zveja');
        cy.get(FormElements.email).type('laurazveja@example.com');
        cy.get(FormElements.genderFemale).click();
        cy.get(FormElements.mobileNumber).type('1234567890');

        // Set Date of Birth to 28th of February, 1930
        cy.get('#dateOfBirthInput').click();
        cy.get('.react-datepicker__month-select').select('February');
        cy.get('.react-datepicker__year-select').select('1930');
        cy.get('.react-datepicker__day--028').eq(1).click();

        cy.get(FormElements.subjectsInput).type('Economics');
        cy.get(FormElements.subjectsAutoComplete).contains('Economics').click();

        cy.get(FormElements.hobbiesWrapper).contains('Music').click();

        const imageFilePath = 'files/random-image.jpg';
        cy.get(FormElements.uploadPicture).attachFile(imageFilePath);

        cy.get(FormElements.currentAddress).type('Inženieru iela 101A, Ventspils, LV-3601');

        cy.get(FormElements.state).click();
        cy.get(FormElements.stateOptionNCR).click();

        cy.get(FormElements.city).click();
        cy.get(FormElements.cityOptionDelhi).click();
    }

    static submitForm() {
        cy.get(FormElements.submitButton).click();
    }

    static validateFormData() {
        cy.get(FormElements.tableResponsive).within(() => {
            cy.contains('Student Name').next('td').should('have.text', 'Laura Zveja');
            cy.contains('Student Email').next('td').should('have.text', 'laurazveja@example.com');
            cy.contains('Gender').next('td').should('have.text', 'Female');
            cy.contains('Mobile').next('td').should('have.text', '1234567890');
            cy.contains('Date of Birth').next('td').should('have.text', '28 February,1930');
            cy.contains('Subjects').next('td').should('have.text', 'Economics');
            cy.contains('Hobbies').next('td').should('have.text', 'Music');
            cy.contains('Picture').next('td').should('contain', 'random-image.jpg');
            cy.contains('Address').next('td').should('have.text', 'Inženieru iela 101A, Ventspils, LV-3601');
            cy.contains('State and City').next('td').should('have.text', 'NCR Delhi');
        });
    }
}

export default FormPage;