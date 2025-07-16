/**
 * @fileoverview Smoke test for the critical path of the PEACHTREE BANK app (login to dashboard).
 * @module e2e/smoke
 *
 */
describe("should group quick smoke tests", () => {
  it("should verify inputs accept values, submit button works", () => {
    cy.visit("/login");

    cy.get('input[name="username"]').should("be.visible");
    cy.get('input[name="password"]').should("be.visible");
    cy.get('button[type="submit"]').should("be.visible");

    cy.get('input[name="username"]').clear().should("have.value", "");
    cy.get('input[name="password"]').clear().should("have.value", "");

    cy.get('input[name="username"]')
      .type(Cypress.env("username"))
      .should("have.value", Cypress.env("username"));
    cy.get('input[name="password"]')
      .type(Cypress.env("password"))
      .should("have.value", Cypress.env("password"));

    cy.get('button[type="submit"]').should('be.visible');
  });

  it("should login on the dashboard, perform smoke test", () => {
    cy.login(Cypress.env("username"), Cypress.env("password"));
    cy.visit('/dashboard/transactions');
    cy.get(".bg-card").should("be.visible");
    cy.get("[placeholder='Search by typing']").should('be.visible');
    cy.get("th").should("have.length", 5);
    cy.get("table").should("be.visible");
    cy.contains('button', 'Previous').should('be.visible');
    cy.contains('button', 'Next').should('be.visible');
  });
});
