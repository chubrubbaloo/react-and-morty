describe('Character details page ', () => {

    // Write test for routing to alber
    it('When clicking on Albert Einstein it should route to his specific detail page', () => {
        cy.visit('http://localhost:3000');

        cy.get('.grid-item')
            .eq(10)
            .find('a')
            .click();

        cy.url().should('include', '/character/11');
    })

    it('The characters name should be Albert Einstein', () => {
        cy.visit('http://localhost:3000/character/11');

        const characterName = 'Albert Einstein';

        cy.get('h2').contains(characterName);
    })
})


