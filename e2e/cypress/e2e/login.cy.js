/**
 * @fileoverview Tests for login functionality in the PEACHTREE BANK app.
 * @module e2e/login
 */

describe('should group login tests', () => {
  beforeEach(() => {
    Cypress.loginHelpers.visitLoginPage();
  });
  it('should show error when username is empty', () => {
    Cypress.loginHelpers.fillUsername('');
    Cypress.loginHelpers.fillPassword(Cypress.env('password'));
    Cypress.loginHelpers.verifyFieldValue('username', '');
    Cypress.loginHelpers.verifyFieldValue('password', Cypress.env('password'));
    Cypress.loginHelpers.clickLoginButton();
    Cypress.loginHelpers.verifyUsernameError();
  });

  it('should show error when password is empty', () => {
    Cypress.loginHelpers.attemptLogin(Cypress.env('username'), '');
    Cypress.loginHelpers.verifyPasswordError('"password" is not allowed to be empty');
  });

  it('should validate unable to login with both username / password wrong', () => {
    cy.intercept('POST', '/auth/login').as('loginRequest');
    Cypress.loginHelpers.attemptLogin('wronguser@example.com', 'wrongpassword');

    cy.wait('@loginRequest').then((interception) => {
      expect(interception.response.statusCode).to.equal(500);
    });
  });

  it('should show error when username is invalid', () => {
    cy.intercept('POST', '/auth/login').as('loginRequest');
    Cypress.loginHelpers.attemptLogin('somewronguser@haha.com', Cypress.env('password'));

    cy.wait('@loginRequest').then((interception) => {
      expect(interception.response.statusCode).to.equal(500);
    });
  });

  it('should show error when password is invalid', () => {
    cy.intercept('POST', '/auth/login').as('loginRequest');
    Cypress.loginHelpers.attemptLogin(Cypress.env('username'), 'test12345?');

    cy.wait('@loginRequest').then((interception) => {
      expect(interception.response.statusCode).to.equal(500);
    });
  });

  it('should handle whitespace in credentials', () => {
    Cypress.loginHelpers.attemptLogin(Cypress.env('username') + ' ', Cypress.env(' username ') + ' ');
    Cypress.loginHelpers.verifyUsernameErrorEmail();
  });

  it('should verify username unless email not passable', () => {
    Cypress.loginHelpers.attemptLogin('admin-boss', Cypress.env('password'));
    Cypress.loginHelpers.verifyUsernameErrorEmail();
  });
});
