/// <reference types="Cypress" />

context('Header search', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/')
  })

  it('should not show results counter initially', () => {
    cy.get('.footer').should('not.have.descendants', '.footer__total-counter')
  })

  it('should not show back to top button initially', () => {
    cy.get('.footer').should('not.have.descendants', '.back-to-top-button')
  })

  it('shows counter of the results in the footer after search with results', () => {
    cy.get('input[name="byNameFilter"]').type('a')
    cy.get('.header .button--search').click()
    cy.request('https://api.openbrewerydb.org/breweries?sort=name&per_page=50&by_name=a').then((resp) => {
      if (resp && resp.data && resp.data.length) {
        cy.get('.footer__total-counter').should('be.visible')
      }
    })
  })

  it('shows back to top button if results list is higher than screen height', () => {
    cy.get('input[name="byNameFilter"]').type('a')
    cy.get('.header .button--search').click()
    cy.wait(2000)
    cy.document().then((doc) => {
      cy.window().then((win) => {
        if (doc.body.scrollHeight > win.innerHeight) {
          cy.get('.footer .back-to-top-button').should('be.visible')
        } else {
          cy.get('.footer').should('not.have.descendants', '.back-to-top-button')
        }
      })
    })
  })

  it('should scroll to top when back to top button is clicked', () => {
    // cy.fixture('response.json').as('response')
    // cy.window().should('have.property', '__store__')
    cy.get('input[name="byNameFilter"]').type('a')
    cy.get('.header .button--search').click()
    cy.wait(2000)
    cy.window().then((win) => {
      cy.document().then((doc) => {
        // win.__store__.dispatch('searchResults/updateResults', '@response')
        // expect(win.__store__.state.searchResults.results.length).to.be.greaterThan(0)
        win.scrollTo({ top: doc.body.scrollHeight })
        cy.get('.footer .back-to-top-button').click()
        cy.wait(3000)
        cy.window().then(updatedWin => {
          expect(updatedWin.scrollY).to.equal(0)
        })
      })
    })
  })
})