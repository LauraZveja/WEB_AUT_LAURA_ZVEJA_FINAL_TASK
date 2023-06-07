import FormElements from "./form.elements";
import BasePage from "./base.page";
import "cypress-file-upload";

class DynamicFormPage extends BasePage {
    static get url() {
        return "/automation-practice-form";
    }

    static fillFormWithDynamicData(firstName, lastName, email, gender, mobileNumber, dateOfBirth, subjects, hobbies, imageFilePath, currentAddress, state, city) {
        cy.get(FormElements.firstName).type(firstName);
        cy.get(FormElements.lastName).type(lastName);
        cy.get(FormElements.email).type(email);

        if (gender === "Male") {
            cy.get(FormElements.genderMale).click();
        } else if (gender === "Female") {
            cy.get(FormElements.genderFemale).click();
        } else {
            cy.get(FormElements.genderOther).click();
        }

        cy.get(FormElements.mobileNumber).type(mobileNumber);

        const dobParts = dateOfBirth.split(" ");
        const dobDay = dobParts[0];
        const dobMonth = dobParts[1];
        const dobYear = dobParts[2];
      
        cy.get(FormElements.dateOfBirth).click();
        cy.get(FormElements.datePickerMonth).select(dobMonth);
        cy.get(FormElements.datePickerYear).select(dobYear);
        cy.get(FormElements.datePickerDay).contains(dobDay).click();

        cy.get(FormElements.subjectsInput).type(subjects);
        cy.get(FormElements.subjectsAutoComplete).contains(subjects).click();

        cy.get(FormElements.hobbiesWrapper).contains(hobbies).click();

        cy.get(FormElements.uploadPicture).attachFile(imageFilePath);

        cy.get(FormElements.currentAddress).type(currentAddress);

        cy.get(FormElements.state).click();
cy.get(FormElements[`stateOption${state}`]).click();

cy.get(FormElements.city).click();
cy.get(FormElements[`cityOption${city}`]).click();
    }

    static submitForm() {
        cy.get(FormElements.submitButton).click();
    }

    static validateFormData(firstName, lastName, email, gender, mobileNumber, dateOfBirth, subjects, hobbies, imageFilePath, currentAddress, state, city) {
        cy.get(FormElements.tableResponsive).within(() => {
            cy.contains('Student Name').next('td').should('have.text', `${firstName} ${lastName}`);
            cy.contains('Student Email').next('td').should('have.text', email);

            if (gender === "Male") {
                cy.contains('Gender').next('td').should('have.text', 'Male');
            } else if (gender === "Female") {
                cy.contains('Gender').next('td').should('have.text', 'Female');
            } else {
                cy.contains('Gender').next('td').should('have.text', 'Other');
            }

            cy.contains('Mobile').next('td').should('have.text', mobileNumber);
            cy.contains('Date of Birth').next('td').should('have.text', dateOfBirth);
            cy.contains('Subjects').next('td').should('have.text', subjects);
            cy.contains('Hobbies').next('td').should('have.text', hobbies);
            cy.contains('Picture').next('td').should('have.text', imageFilePath);
            cy.contains('Address').next('td').should('have.text', currentAddress);
            cy.contains('State and City').next('td').should('have.text', `${state} ${city}`);
        });
    }
}

export default DynamicFormPage;