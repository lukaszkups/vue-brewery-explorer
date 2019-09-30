/// <reference types="Cypress" />

context('Initial state', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/')
  })

  it('fills the byNameFilter input', () => {
    cy.get('input[name="byNameFilter"]')
    .type('a').should('have.value', 'a')
  })

  it('shows loader on search query loading', () => {
    cy.get('input[name="byNameFilter"]').type('a')
    cy.get('.header .button--search').click()
    cy.get('.loader').should('be.visible')
  })

  it('shows reset button after successful search', () => {
    cy.get('input[name="byNameFilter"]').type('a')
    cy.get('.header .button--search').click()
    cy.get('.header .button--reset').should('be.visible')
  })

  it ('shows counter of the results in the footer', () => {
    cy.get('input[name="byNameFilter"]').type('a')
    cy.get('.header .button--search').click()
    cy.request('https://api.openbrewerydb.org/breweries?sort=name&per_page=50&by_name=a').then((resp) => {
      if (resp && resp.data && resp.data.length) {
        cy.get('.footer__total-counter').should('be.visible')
      }
    })
  })

})
