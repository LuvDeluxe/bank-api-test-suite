/**
 * @fileoverview Tests for dashboard and verification functionality in the PEACHTREE BANK app.
 * @module e2e/dashboard
 */

describe("should group tests responsible for the dashboard", () => {
  beforeEach(() => {
    cy.login(Cypress.env("username"), Cypress.env("password"));
    cy.visit("/dashboard/transactions");
  });
  it("should test creating transactions", () => {
    cy.get('[id=":R1dttb:-form-item"]').click();
    cy.get('[aria-labelledby="radix-:r6:"]').click();

    cy.get('[id=":R2dttb:-form-item"]').click();
    cy.get('[aria-labelledby="radix-:rd:"]').click();

    cy.get('[id=":R3dttb:-form-item"]').clear().type("200");

    cy.get('button[type="submit"]').click();

    cy.wait(1000);
    cy.reload();

    cy.contains("200");
    cy.contains("Account A");
    cy.contains("Account B");
    cy.contains("SEND");
  });
  it("should verify the transaction && change status", () => {
    cy.get("tbody > .border-b").first().click();
    cy.wait(1000);

    cy.contains("Amount");
    cy.contains("Date");
    cy.contains("From Account");
    cy.contains("To Account");
    cy.contains("State");
    cy.contains("200");
    cy.contains("Account A");
    cy.contains("Account B");
    cy.contains("SEND");

    cy.get(".bg-card .space-y-2").eq(3).click();
    cy.get('[aria-labelledby="radix-:rd:"]').click();
    cy.contains("button", "Update status").click();
  });

  it("should verify updated transaction", () => {
    cy.contains("PAID");
  });
});
