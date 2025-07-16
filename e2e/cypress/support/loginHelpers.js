/**
 * @fileoverview Login helper functions for test automation
 * @module support/loginHelpers
 */

export const loginHelpers = {
  visitLoginPage: () => {
    cy.visit('/auth/login');
  },

  fillUsername: (username) => {
    if (username) {
      cy.get('input[name="username"]').clear().type(username);
    } else {
      cy.get('input[name="username"]').clear();
    }
  },

  fillPassword: (password) => {
    if (password) {
      cy.get('input[name="password"]').clear().type(password);
    } else {
      cy.get('input[name="password"]').clear();
    }
  },

  clickLoginButton: () => {
    cy.get('button[type="submit"]').should('be.visible').click();
  },

  attemptLogin: (username, password) => {
    loginHelpers.fillUsername(username);
    loginHelpers.fillPassword(password);
    loginHelpers.clickLoginButton();
  },

  verifyUsernameError: (expectedMessage = '"username" is not allowed to be empty') => {
    cy.get('label[for="\\:Rbtttb\\:-form-item"]')
      .should('have.class', 'text-destructive');
    cy.get('p#\\:Rbtttb\\:-form-item-message')
      .should('be.visible')
      .and('have.text', expectedMessage);
    },

  verifyUsernameErrorEmail: (expectedMessage = '"username" must be a valid email') => {
    cy.get('label[for="\\:Rbtttb\\:-form-item"]')
      .should('have.class', 'text-destructive');
    cy.get('p#\\:Rbtttb\\:-form-item-message')
      .should('be.visible')
      .and('have.text', expectedMessage);
  },

  verifyPasswordError: (expectedMessage) => {
    cy.get('#\\:Rjtttb\\:-form-item-message')
      .should('be.visible')
      .and('contain', expectedMessage);
  },

  verifyGeneralError: (expectedMessage) => {
    cy.get('[data-testid="general-error"]')
      .should('be.visible')
      .and('contain', expectedMessage);
  },

  verifySuccessfulLogin: () => {
    cy.url().should('include', '/dashboard');
    cy.get('h1').should('contain', 'Dashboard');
  },

  verifyFieldValue: (fieldName, expectedValue) => {
    cy.get(`input[name="${fieldName}"]`).should('have.value', expectedValue);
  },

  clearAllFields: () => {
    cy.get('input[name="username"]').clear();
    cy.get('input[name="password"]').clear();
  },

  verifyFieldsAreEmpty: () => {
    loginHelpers.verifyFieldValue('username', '');
    loginHelpers.verifyFieldValue('password', '');
  }
};
