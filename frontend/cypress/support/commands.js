// ***********************************************
// This example commands.js shows you how to
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

const devEnv = 'http://43cb8b5b88af.ngrok.io'
const prodEnv = 'https://fore-finder-be.herokuapp.com'

Cypress.Commands.add('setReadStubs', () => {
  cy.intercept(
    { method: 'GET', url: `${prodEnv}/api/v1/players`},
    { fixture: '../fixtures/players.json' }
  )

  cy.intercept(
    { method: 'GET', url: `${prodEnv}/api/v1/courses`},
    { fixture: '../fixtures/courses.json'}
  )

  cy.intercept(
    { method: 'GET', url: `${prodEnv}/api/v1/players/1/events`},
    { fixture: '../fixtures/Events/initial.json'}
  ).as('getInitialEvents')
})

Cypress.Commands.add('setInviteActionStub', (action) => {
  cy.wait('@getInitialEvents')

  cy.intercept(
    { method: 'GET', url: `${prodEnv}/api/v1/players/1/events`},
    { fixture: `../fixtures/Events/after_${action}.json`}
  )
})

Cypress.Commands.add('setUpdateStub', () => {
  cy.intercept('PATCH', `${prodEnv}/api/v1/player-event`, {})
})

Cypress.Commands.add('setDeleteStub', () => {
  cy.intercept('DELETE', `${prodEnv}/api/v1/event/1`, {})
})

Cypress.Commands.add('setFriendshipStub', () => {
  cy.intercept({
    method: 'POST',
    url: `${prodEnv}/api/v1/friendship` 
  })
  cy.intercept({
    method: 'DELETE', 
    url: `${prodEnv}/api/v1/friendship`
  }, {})
})