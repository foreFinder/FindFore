describe('When a user first accesses the Dashboard', () => {
  beforeEach('setup stubs and visit Dashboard', () => {
    cy.setReadStubs()
    cy.visit('http://localhost:3000/dashboard')
  })

  it('should display their committed tee times', () => {
    cy.get('.tt-containers').should('be.visible')
      .find('.tee-time-container').eq(0)
      .find('.container-title').contains('Committed Tee Times')

    cy.get('.tee-times').eq(0).should('be.visible')
      .find('.tee-time').should('have.length', 2)
      .eq(0).find('h3').contains('Green Valley Ranch Golf Club')

    cy.get('.tee-times').eq(0)
      .find('.tee-time').eq(0)
      .find('.date').contains('Aug 17')
      .parent().parent().find('.time-slot').contains('11:30 AM')
      .parent().parent().find('.hole-count').contains('9')
      .parent().parent().find('.host-name').contains('Amy')
      .parent().parent().find('.spot-counter').contains('1 of 3')

    cy.get('.tee-times').eq(0)
      .find('.tee-time').eq(0)
      .find('button').contains('Cancel')
  })

  it('should display available tee times hosted by friends', () => {
    cy.get('.tt-containers').should('be.visible')
      .find('.tee-time-container').eq(1)
      .find('.container-title').contains('Available Tee Times')

    cy.get('.tee-times').eq(1).should('be.visible')
      .find('.tee-time').should('have.length', 1)
      .eq(0).find('h3').contains('City Park Golf Course')

    cy.get('.tee-times').eq(1)
      .find('.tee-time').eq(0)
      .find('.date').contains('Aug 18')
      .parent().parent().find('.time-slot').contains('12:30 PM')
      .parent().parent().find('.hole-count').contains('18')
      .parent().parent().find('.host-name').contains('Andrew')
      .parent().parent().find('.spot-counter').contains('2 of 3')

    cy.get('.tee-times').eq(1)
      .find('.tee-time').eq(0)
      .find('button').eq(0).contains('Decline')
      .next('button').contains('Accept')
  })
})

describe('Invite type selector', () => {
  beforeEach('setup stubs and visit Dashboard', () => {
    cy.setReadStubs()
    cy.visit('http://localhost:3000/dashboard')
  })

  it('should render only public events when Public is selected', () => {
    cy.get('.invite-type-select')
      .find('button').eq(1)
      .contains('Public').click()
    
    cy.get('.tee-times').eq(1).should('be.visible')
      .find('.tee-time').should('have.length', 1)

    cy.get('.tee-times').eq(1)
      .find('.tee-time').eq(0)
      .find('h3').contains('Riverdale Golf Club')
  })

  it('should render private events when Friends is selected after selecting Public', () => {
    cy.get('.invite-type-select')
      .find('button').eq(1)
      .contains('Public').click()

    cy.get('.invite-type-select')
      .find('button').eq(0)
      .contains('Friends').click()

    cy.get('.tee-times').eq(1).should('be.visible')
      .find('.tee-time').should('have.length', 1)

    cy.get('.tee-times').eq(1)
      .find('.tee-time').eq(0)
      .find('h3').contains('City Park Golf Course')
  })
})

describe('Invite actions', () => {
  beforeEach('setup initial stubs and visit Dashboard', () => {
    cy.setReadStubs()
    cy.setUpdateStub()
    cy.setDeleteStub()
    
    cy.visit('http://localhost:3000/dashboard')
  })

  describe('Accept button', () => {
    beforeEach('setup stub for accept action', () => {
      cy.setInviteActionStub('accept')
    })

    it('should add an event to a player\'s commited tee times', () => {
      cy.get('.tee-times').eq(0)
        .find('.tee-time').should('have.length', 2)

      cy.get('.tee-times').eq(1)
        .find('.tee-time').eq(0)
        .find('.invitation-actions')
        .find('button').eq(1).contains('Accept').click()

      cy.get('.tee-times').eq(0)
        .find('.tee-time').should('have.length', 3)
        .eq(2).find('h3').contains('City Park Golf Course')
    })
  })

  describe('Decline button', () => {
    it('should remove an event from a player\'s available tee times', () => {
      cy.setInviteActionStub('decline')

      cy.get('.tee-times').eq(1)
        .find('.tee-time').should('have.length', 1)

      cy.get('.tee-times').eq(1)
        .find('.tee-time').eq(0)
        .find('.invitation-actions')
        .find('button').eq(0).contains('Decline').click()

      cy.get('.tee-times').eq(1)
        .find('.tee-time').should('not.exist')
    })
  })

  describe('Cancel button', () => {
    it('should remove an event from a player\'s committed tee times', () => {
      cy.setInviteActionStub('player_cancel')

      cy.get('.tee-times').eq(0)
        .find('.tee-time').should('have.length', 2)

      cy.get('.tee-times').eq(0)
        .find('.tee-time').eq(1)
        .find('.invitation-actions')
        .find('button').eq(0).contains('Cancel').click()

      cy.get('.tee-times').eq(0)
        .find('.tee-time').should('have.length', 1)
        .find('h3').contains('Green Valley Ranch Golf Club')
    })

    it('should delete an event if used by the host', () => {
      cy.setInviteActionStub('host_cancel')

      cy.get('.tee-times').eq(0)
        .find('.tee-time').eq(0)
        .find('.invitation-actions')
        .find('button').eq(0).contains('Cancel').click()

      cy.get('.tee-times').eq(0)
        .find('.tee-time').should('have.length', 1)
        .find('h3').contains('City Park Golf Course')
    })
  })
})
