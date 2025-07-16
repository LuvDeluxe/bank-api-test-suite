/**
 * @fileoverview Custom Cypress commands for reusable test logic.
 * @module support/commands
 */

/**
 * @description Logs in to the PEACHTREE banking app
 * @param {string} username - The username for login.
 * @param {string} password - The password for login.
 * @param {string} redirectPath - Optional path to visit after login (defaults to 'auth/login')
 */

Cypress.Commands.add('login', (username, password, redirectPath = '/auth/login') => {
  cy.session(
    [username, password],
    () => {
      cy.visit(redirectPath);
      cy.get('input[name="username"]').clear().type(username);
      cy.get('input[name="password"]').clear().type(password);
      cy.get('button[type="submit"]').click();
      cy.wait(1000);
      cy.url().should('include', '/dashboard/transactions');
    });
});

