describe('Characters page ', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000');
    })

    it('The header should be Rickipedia', () => {
        cy.get('h1').contains('Rickipedia')
    })

    it('The search query should show correct characters', () => {

        cy.get('.grid-item').should('have.length', 20);

        cy.get('input').type('Albert Einstein');

        cy.get('.grid-item').should('have.length', 1);

        cy.get('.grid-item h2').contains('Albert Einstein')

        cy.contains('Current status:').invoke('text').then((text) => {

            expect(text).to.include('Dead');
        });

        cy.contains('Species:').invoke('text').then((text) => {

            expect(text).to.include('Human');
        });

        cy.contains('Origin:').invoke('text').then((text) => {

            expect(text).to.include('Earth (C-137)');
        });

        cy.contains('Last known location:').invoke('text').then((text) => {

            expect(text).to.include('Earth (Replacement Dimension)');
        });

        cy.get('input').type('{esc}');

        cy.get('.grid-item').should('have.length', 20);

        cy.get('input').type('Butter Robot');

        cy.get('.grid-item').should('have.length', 1);

        cy.get('.grid-item h2').contains('Butter Robot')

        cy.contains('Current status:').invoke('text').then((text) => {

            expect(text).to.include('Alive');
        });

        cy.contains('Species:').invoke('text').then((text) => {

            expect(text).to.include('Robot');
        });

        cy.contains('Origin:').invoke('text').then((text) => {

            expect(text).to.include('Earth (Replacement Dimension)');
        });

        cy.contains('Last known location:').invoke('text').then((text) => {

            expect(text).to.include('Earth (Replacement Dimension)');
        });
    });

    it('When pressing on the buttons it should paginate correctly', () => {

        cy.get('.MuiButtonBase-root:last').click();

        cy.wait(1000);

        cy.window().then((win) => {
            const localStoragePage: any = win.localStorage.getItem('currentPage');
            expect(parseInt(localStoragePage, 10)).to.equal(2);
        })

        cy.get('.MuiButtonBase-root:first').click();

        cy.wait(1000);

        cy.window().then((win) => {
            const localStoragePage: any = win.localStorage.getItem('currentPage');
            expect(parseInt(localStoragePage, 10)).to.equal(1);
        })

        // third button
        cy.get('.MuiButtonBase-root:eq(2)').click();

        cy.wait(1000);

        cy.window().then((win) => {
            const localStoragePage: any = win.localStorage.getItem('currentPage');
            expect(parseInt(localStoragePage, 10)).to.equal(2);
        })

        cy.get('.MuiButtonBase-root:eq(3)').click();

        cy.wait(1000);

        cy.window().then((win) => {
            const localStoragePage: any = win.localStorage.getItem('currentPage');
            expect(parseInt(localStoragePage, 10)).to.equal(3);
        })

        cy.get('.MuiButtonBase-root:eq(4)').click();

        cy.wait(1000);

        cy.window().then((win) => {
            const localStoragePage: any = win.localStorage.getItem('currentPage');
            expect(parseInt(localStoragePage, 10)).to.equal(4);
        })

        cy.get('.MuiButtonBase-root:eq(5)').click();

        cy.wait(1000);

        cy.window().then((win) => {
            const localStoragePage: any = win.localStorage.getItem('currentPage');
            expect(parseInt(localStoragePage, 10)).to.equal(5);
        })

        // the sixth button will be the last page.
        cy.get('.MuiButtonBase-root:eq(5)').click();

        cy.wait(1000);

        cy.window().then((win) => {
            const localStoragePage: any = win.localStorage.getItem('currentPage');
            expect(parseInt(localStoragePage, 10)).to.equal(42);
        })
    });

    it('When clicking on Albert Einstein it should route to his specific detail page', () => {

        cy.get('.grid-item').eq(10).find('a').click();

        cy.url().should('include', '/character/11');
    })

})