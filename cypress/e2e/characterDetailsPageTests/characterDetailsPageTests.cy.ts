describe('Character details page ', () => {

    it('The image of the character should be of Albert Einstein and the alt should be Albert Einstein', () => {
        cy.visit('http://localhost:3000/character/11');

        cy.get('.center-image img').should('have.attr', 'src', 'https://rickandmortyapi.com/api/character/avatar/11.jpeg');
        cy.get('.center-image img').should('have.attr', 'alt', 'Albert Einstein');

    })

    it('The characters name should be Albert Einstein', () => {
        cy.visit('http://localhost:3000/character/11');

        const characterName = 'Albert Einstein';

        cy.get('h2').contains(characterName);
    })

    it('The table head names should contain Episode, Episode Name and Air Date', () => {
        cy.visit('http://localhost:3000/character/11');

        cy.get('.MuiTableCell-root')
            .eq(0)
            .contains('Episode');

        cy.get('.MuiTableCell-root')
            .eq(1)
            .contains('Episode Name');

        cy.get('.MuiTableCell-root')
            .eq(2)
            .contains('Air Date');
    });

    it('The table cells should contain the correct data', () => {
        cy.visit('http://localhost:3000/character/11');

        cy.get('.MuiTableCell-root')
            .eq(3)
            .contains('S02E01');

        cy.get('.MuiTableCell-root')
            .eq(4)
            .contains('A Rickle in Time');

        cy.get('.MuiTableCell-root')
            .eq(5)
            .contains('July 26, 2015');


    })
})


