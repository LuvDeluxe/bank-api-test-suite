/**
 * @fileoverview Cypress configuration for end-to-end testing of PEACHTREE banking app.
 * Configures base URL, test file pattern, and environment variables for credentials.
 * @module cypress.config
 */

const { defineConfig } = require("cypress");

/**
 * @description Defines the Cypress configuration object.
 * @returns {object} Cypress configuration object.
 */

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: ["cypress/e2e/**/*.cy.{js,jsx,ts,tsx}", "cypress/api/**/*.cy.{js,jsx,ts,tsx}"],
    baseUrl: "http://localhost:3001",
    apiUrl: "http://localhost:3000",
    fixturesFolder: "e2e/fixtures",
    supportFile: "cypress/support/e2e.js",
    screenshotsFolder: "e2e/screenshots",
    videosFolder: "e2e/videos",
    viewportWidth: 1280,
    viewportHeight: 720,
  },
});
