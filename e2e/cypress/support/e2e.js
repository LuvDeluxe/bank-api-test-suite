/**
 * @fileoverview Global setup for Cypress tests. Imports custom commands / configures global hooks.
 * @module support/e2e
 */

import './commands';

import { loginHelpers } from './loginHelpers';

// Make loginHelpers available globally
Cypress.loginHelpers = loginHelpers;
