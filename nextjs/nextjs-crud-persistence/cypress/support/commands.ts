/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

/**
 * Generates a unique identifier with extremely low collision probability
 * Uses timestamp + random bytes + counter for uniqueness
 * Format: [timestamp]-[random]-[counter]
 * Example: 1760270123456-a3f9c2d1e4b5-0001
 */
export function generateUniqueId() {
  const timestamp = Date.now();

  const randomHex = Array.from(
    { length: 12 },
    () => Math.floor(Math.random() * 16).toString(16)
  ).join('');

  const counter = Math.floor(Math.random() * 10000).toString().padStart(4, '0');

  return `${timestamp}-${randomHex}-${counter}`;
}
