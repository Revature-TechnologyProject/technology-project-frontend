import { RegisterPage } from '../pages/register_page';
import { URL } from '../../support/utilities';

const registerPage = new RegisterPage();

describe('Register', () => {
    beforeEach(() => {
        cy.visit(URL + "register");
    });

    it('Greets with Register header', () => {
        cy.contains('h1', 'Register');
    });

    it('Has input fields for username & password, and a submit button', () => {
        cy.get(registerPage.usernameSelector);
        cy.get(registerPage.passwordSelector);
        cy.get(registerPage.submitButtonSelector);
    });

    it('Cannot create account with blank username', () => {
        const password = "new_password";
        const errorMessage = "Invalid property username";

        registerPage.enterPassword(password);
        registerPage.clickSubmitButton();

        cy.contains(errorMessage);
    });

    it('Cannot create account with blank password', () => {
        const username = "valid_username";
        const errorMessage = "Invalid property password";

        registerPage.enterUsername(username);
        registerPage.clickSubmitButton();

        cy.contains(errorMessage);
    });

    it('Cannot register duplicate user', () => {
        const errorMessage = "Username already taken";

        cy.fixture("user").then((user)=> {
            registerPage.enterUsername(user.username);
            registerPage.enterPassword(user.password);
            registerPage.clickSubmitButton();
    
            cy.contains(errorMessage);
        });
    });

    it('Should return to homepage after successful register', () => {
        const message = "Successfully Registered Account, Returning to homepage in 3 seconds";

        const username = self.crypto.randomUUID();
        const password = "password"
        registerPage.enterUsername(username);
        registerPage.enterPassword(password);
        registerPage.clickSubmitButton();

        cy.contains(message);
        cy.url().should("eq", URL)
    });
});