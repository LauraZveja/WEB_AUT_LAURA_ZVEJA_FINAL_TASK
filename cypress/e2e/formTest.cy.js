import FormPage from "../pageObjects/form.page";
import DynamicFormPage from "../pageObjects/dynamic.form.page";

describe('Form Test', () => {
    beforeEach(() => {
        FormPage.visit();
    });

    it('fill out the form and validate data  with constant variables', () => {
        FormPage.fillForm();
        FormPage.submitForm();
        FormPage.validateFormData();
    });

    it('fills out the form and validates data with dynamic variables', () => {
        DynamicFormPage.fillFormWithDynamicData("Laura", "Zveja", "laurazveja@example.com", "Female", "1234567890", "6 April 1991", "Economics", "Reading", "files/random-image.jpg", "Inženieru iela 101A, Ventspils, LV-3601", "NCR", "Delhi");
        DynamicFormPage.submitForm();
        DynamicFormPage.validateFormData("Laura", "Zveja", "laurazveja@example.com", "Female", "1234567890", "06 April,1991", "Economics", "Reading", "random-image.jpg", "Inženieru iela 101A, Ventspils, LV-3601", "NCR", "Delhi");
    });

});