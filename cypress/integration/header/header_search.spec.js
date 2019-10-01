/// <reference types="Cypress" />

context('Header search', () => {
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

  it('shows counter of the results in the footer', () => {
    cy.get('input[name="byNameFilter"]').type('a')
    cy.get('.header .button--search').click()
    // cy.request('https://api.openbrewerydb.org/breweries?sort=name&per_page=50&by_name=a').then((resp) => {
    //   if (resp && resp.data && resp.data.length) {
    //     cy.get('.footer__total-counter').should('be.visible')
    //   }
    // })
    cy.wait(2000)
    cy.window().then((win) => {
      cy.window().should('have.property', '__store__')
      if (win.__store__.state.searchResults.results.length) {
        cy.get('.footer__total-counter').should('be.visible')
      }
    })
  })

  it('disables submit search button when "byNameFilter" is empty', () => {
    cy.get('.header .button--search').should('be.disabled')
  })

  it('enables submit search buttn when "byNameFilter" is non-empty', () => {
    cy.get('input[name="byNameFilter"]').type('a')
    cy.get('.header .button--search').should('not.be.disabled')
  })

  it('disables "byStateFilter" select input until it has any options', () => {
    cy.get('select[name="byStateFilter"]').should('be.disabled')
  })

  it('enables "byStateFilter" select input when it has any options', () => {
    cy.get('input[name="byNameFilter"]').type('a')
    cy.get('.header .button--search').click()
    cy.request('https://api.openbrewerydb.org/breweries?sort=name&per_page=50&by_name=a').then((resp) => {
      if (resp && resp.data && resp.data.length) {
        cy.get('select[name="byStateFilter"]').should('not.be.disabled')
      }
    })
  })

  it('disables typing non-alphabetic characters in "byNameFilter" input', () => {
    cy.get('input[name="byNameFilter"]').type('ab123c').should('have.value', 'abc')
  })
})
