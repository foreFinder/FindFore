describe('Header Navigation', () => {
  beforeEach('setup stubs and visit Dashboard', () => {
    cy.viewport(1920, 1080)
    cy.setReadStubs()
    cy.visit('http://localhost:3000/dashboard')
  })

  it('should render the mobile menu accordingly', () => {
    // check the hamburger menu is not rendered in desktop view
    cy.get('[data-cy=ham-menu]')
      .should('not.be.visible')
    // check the hamburger menu is rendered otherwise
    cy.viewport(960, 540)
    cy.get('[data-cy=ham-menu]')
      .should('be.visible')
    // check the menu opens as expected
    cy.get('[data-cy=ham-menu]').click()
    cy.get('[data-cy=nav-menu]').should('be.visible')
  })

  it('should display a logo that can take you the dashboard', () => {
    // target logo, click it, check url
    cy.get('[data-cy=logo]')
      .should('be.visible').click()
    cy.url().should('eq', 'http://localhost:3000/dashboard')
  })

  it('should have a route to dashboard', () => {
    // target dashboard link, click it, check url
    cy.get('[data-cy=nav-menu]')
    .get('[data-cy=dashboard-link]')
    .should('be.visible')
    .click()
    cy.url().should('eq', 'http://localhost:3000/dashboard')
  })

  it('should have a route to form', () => {
    // target form link, click it, check url
    cy.get('[data-cy=nav-menu]')
    .get('[data-cy=form-link]')
    .should('be.visible')
    .click()
    cy.url().should('eq', 'http://localhost:3000/event-form')
  })

  it('should have a route to community when not in desktop view', () => {
    // target ham menu, target community link, click it, check url
    cy.viewport(960, 540)
    cy.get('[data-cy=ham-menu]').click()
      .get('[data-cy=community-link]')
      .should('be.visible')
      .click()
    cy.url().should('eq', 'http://localhost:3000/community')
  })

  // it('should have a dropdown for user info and "logout"', () => {
  //   // target user dropdown, click it, check it opened
  //   cy.get('[data-cy=user-dropdown]').click()
  //   cy.get('[data-cy=user-options]')
  //     .should('be.visible')
  //   // target logout link, click it, check url
  //   cy.get('[data-cy=logout-link]').click()
  //   cy.url().should('eq', 'http://localhost:3000/login')
  // })

})