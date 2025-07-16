/**
 * @fileoverview API helper functions for Cypress tests
 * @description Reusable functions for API testing including authentication and response validation
 */

export const loginRequest = (body, shouldFail = false) => {
  const endpoint = '/login';
  const baseUrl = Cypress.config('apiUrl');
  const fullUrl = `${baseUrl}${endpoint}`;

  return cy.request({
    method: 'POST',
    url: fullUrl,
    body: body,
    failOnStatusCode: !shouldFail
  });
};

export const verifySuccessfulLogin = (response) => {
  expect(response.status).to.eq(200);
  expect(response.body.message).to.eq('Login successful');
  expect(response.body.data.accessToken).to.exist;
  cy.log('Access Token:', response.body.data.accessToken);
};

export const verifyFailedLogin = (response, logMessage = 'Failed login') => {
  expect(response.status).to.eq(401);
  expect(response.body.message).to.eq('Invalid credentials');
  expect(response.body.data).to.not.exist;
  cy.log(logMessage, response.body.message);
};

export const authenticatedRequest = (method, url, token, body = null) => {
  const requestOptions = {
    method: method,
    url: url,
    headers: {
      'token': token
    },
    failOnStatusCode: false
  };

  if (body) {
    requestOptions.body = body;
  }

  return cy.request(requestOptions);
};
