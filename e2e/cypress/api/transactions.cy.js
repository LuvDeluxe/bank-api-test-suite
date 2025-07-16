/**
 * @fileoverview Transactions API tests for CRUD operations
 * @description
 * Tests the `/transactions` endpoint for creating new transactions,
 * including authentication, validation, and response structure.
 */
import { authenticatedRequest } from "../support/apiHelpers.js";

describe("test transactions functionality", () => {
  let authToken;
  let accountIds = [];

  beforeEach(() => {
    cy.request({
      method: "POST",
      url: `${Cypress.config("apiUrl")}/login`,
      body: {
        username: Cypress.env("username"),
        password: Cypress.env("password"),
      },
    })
      .then((loginResponse) => {
        authToken = loginResponse.body.data.accessToken;
        cy.log("Auth token received:", authToken);

        return cy.request({
          method: "GET",
          url: `${Cypress.config("apiUrl")}/accounts`,
          headers: {
            token: authToken,
          },
        });
      })
      .then((accountsResponse) => {
        expect(accountsResponse.status).to.eq(200);
        accountIds = accountsResponse.body.map((account) => account.id);
        cy.log("Available account IDs", accountIds);
      });
  });

  it("should create a new transaction successfully", () => {
    expect(accountIds.length).to.be.at.least(2);

    const transactionData = {
      amount: 100.5,
      fromAccountId: accountIds[0],
      toAccountId: accountIds[1],
    };

    authenticatedRequest(
      "POST",
      `${Cypress.config("apiUrl")}/transactions`,
      authToken,
      transactionData,
    ).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.exist;
      if (response.body.id) {
        expect(response.body).to.have.property("id");
        cy.log("Created Transaction ID:", response.body.id);
      }

      cy.log("Created Transaction ID:", response.body.id);
    });
  });

  it("should retrieve all transactions successfully", () => {
    const transactionData = {
      amount: 50,
      fromAccountId: accountIds[0],
      toAccountId: accountIds[1],
    };

    authenticatedRequest(
      "POST",
      `${Cypress.config("apiUrl")}/transactions`,
      authToken,
      transactionData,
    )
      .then((createResponse) => {
        expect(createResponse.status).to.eq(201);

        return authenticatedRequest(
          "GET",
          `${Cypress.config("apiUrl")}/transactions`,
          authToken,
        );
      })
      .then((getResponse) => {
        expect(getResponse.status).to.eq(200);
        expect(getResponse.body).to.be.an("array");
        expect(getResponse.body.length).to.be.at.least(1);
        const transaction = getResponse.body[0];
        expect(transaction).to.have.property("id");
        expect(transaction).to.have.property("amount");
        expect(transaction).to.have.property("fromAccountId");
        expect(transaction).to.have.property("toAccountId");
        expect(transaction).to.have.property("currency", "USD");
        expect(transaction).to.have.property("status", "PAID");
        expect(transaction).to.have.property("createdAt");
      });
  });

  it("should retrieve a specific transaction by ID", () => {
  let createdTransactionId;

  const transactionData = {
    amount: 75,
    fromAccountId: accountIds[0],
    toAccountId: accountIds[1],
  };

  authenticatedRequest(
    "POST",
    `${Cypress.config("apiUrl")}/transactions`,
    authToken,
    transactionData,
  ).then((createResponse) => {
    expect(createResponse.status).to.eq(201);
    createdTransactionId = createResponse.body.id;

    return authenticatedRequest(
      "GET",
      `${Cypress.config("apiUrl")}/transactions/${createdTransactionId}`,
      authToken
    );
  }).then((getResponse) => {
    expect(getResponse.status).to.eq(200);
    expect(getResponse.body.id).to.eq(createdTransactionId);
    expect(getResponse.body.amount).to.eq(75);
    expect(getResponse.body.fromAccountId).to.eq(accountIds[0]);
    expect(getResponse.body.toAccountId).to.eq(accountIds[1]);
  });
  });

  it("should update transaction status successfully", () => {
  let createdTransactionId;

  const transactionData = {
    amount: 200,
    fromAccountId: accountIds[0],
    toAccountId: accountIds[1],
  };

  authenticatedRequest(
    "POST",
    `${Cypress.config("apiUrl")}/transactions`,
    authToken,
    transactionData,
  ).then((createResponse) => {
    expect(createResponse.status).to.eq(201);
    createdTransactionId = createResponse.body.id;
    expect(createResponse.body.status).to.eq("SEND");

    return authenticatedRequest(
      "PUT",
      `${Cypress.config("apiUrl")}/transactions/${createdTransactionId}`,
      authToken,
      { status: "RECEIVED" }
    );
  }).then((updateResponse) => {
    expect(updateResponse.status).to.eq(200);
    expect(updateResponse.body.status).to.eq("RECEIVED");
    expect(updateResponse.body.id).to.eq(createdTransactionId);
  });
  });

  it("should return 401 when accessing transactions without token", () => {
  cy.request({
    method: "GET",
    url: `${Cypress.config("apiUrl")}/transactions`,
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.status).to.eq(401);
    expect(response.body.message).to.eq("Unauthorized");
  });
});
});
