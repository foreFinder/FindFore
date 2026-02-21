describe('Player List', () => {
  beforeEach('setup stubs and visit Dashboard', () => {
    cy.viewport(1920, 1080)
    cy.setReadStubs()
    cy.setFriendshipStub()
    cy.visit('http://localhost:3000/dashboard')
  })

  it('should render as sidebar in desktop view', () => {
    cy.get('[data-cy=player-list]')
      .should('be.visible')
  })

  it('should be accessible through hamburger menu mobile and tablet views', () => {
    cy.viewport(960, 540)
    // open ham and click Community link
    cy.get('[data-cy=ham-menu]').click()
      .get('[data-cy=community-link]').click()
    cy.get('[data-cy=player-list]')
      .should('be.visible')
  })
  
  it('should allow you to switch between friends and community players', () => {
    // check community
    cy.get('[data-cy=player-type]').eq(1).click()
    cy.get('[data-cy=player-card]').eq(0).contains('Andrew')
    // check friends
    cy.get('[data-cy=player-type]').eq(0).click()
    cy.get('[data-cy=player-card]').eq(0).contains('Andrew')
  })

  it('should allow you to add friends from the community', () => {
    // Add Amy to friends
    cy.get('[data-cy=player-type]').eq(1).click()
    cy.get('[data-cy=friend-option]').eq(0).click()
    // check friends for Amy
    cy.get('[data-cy=player-type]').eq(0).click().wait(2000)
    cy.get('[data-cy=player-card]').eq(0).contains('Amber')  
  })

  it('should allow you to remove friends', () => {
    // Make sure Andrew is up top, remove friend, check that Amber is now up top
    cy.get('[data-cy=player-card]').eq(0).contains('Andrew')
    cy.get('[data-cy=friend-option]').eq(0).click().wait(2000)
    cy.get('[data-cy=player-card]').eq(0).contains('Amber')
  })
})