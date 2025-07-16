/**
 * @fileoverview Authentication API tests for /login endpoint
 * @description
 * Verifies the login functionality by testing various scenarios:
 * - Successful login with valid credentials
 * - Login failure due to invalid credentials
 * - Login failure when username or password is missing
 * - Login failure when request body is empty
 */

import { loginRequest, verifyFailedLogin, verifySuccessfulLogin } from "../support/apiHelpers.js";

describe("Authentication API Tests", () => {
  const endpoint = "/login";
  const baseUrl = Cypress.config("apiUrl");
  const fullUrl = `${baseUrl}${endpoint}`;

  it("should login successfully with valid credentials", () => {
    const validCredentials = {
      username: Cypress.env("username"),
      password: Cypress.env("password"),
    };
    loginRequest(validCredentials).then(verifySuccessfulLogin);
  });

  it("should return 401 for invalid credentials", () => {
    const invalidCredentials = {
      username: "randomuser@mail23.com",
      password: "1234#",
    };
    loginRequest(invalidCredentials, true).then((response) => {
      verifyFailedLogin(response, "Invalid credentials response:");
    });
  });

  it("should return 401 when username is missing", () => {
    const invalidCredentials = {
      password: Cypress.env("password"),
    };
    loginRequest(invalidCredentials, true).then((response) => {
      verifyFailedLogin(response, "Missing username response:");
    });
  });

  it("should return 401 when password is missing", () => {
    const invalidCredentials = {
      username: Cypress.env("username"),
    };
    loginRequest(invalidCredentials, true).then((response) => {
      verifyFailedLogin(response, "Missing password response:");
    });
  });

  it("should return 401 when request body is empty", () => {
    const emptyBody = {};

    loginRequest(emptyBody, true).then((response) => {
      verifyFailedLogin(response, "Empty body response:");
    });
  });
});
