export class RegisterPage  {
    registerHeaderSelector = "h1";
    usernameSelector = "#usernameInput";
    passwordSelector = "#passwordInput";
    submitButtonSelector = "button";

    enterUsername(username) {
        cy.get(this.usernameSelector).type(username);
    }

    enterPassword(password) {
        cy.get(this.passwordSelector).type(password);
    }

    clickSubmitButton(){
        return cy.get(this.submitButtonSelector).click();
    }
}