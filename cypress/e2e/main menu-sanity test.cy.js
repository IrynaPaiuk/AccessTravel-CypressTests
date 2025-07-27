describe('Main menu sanity test - Access Travel', () => {

    beforeEach(() => {
        cy.visit('https://www.accesstravel.com/en-US/Home/Index');
    });
    it('Verify display of main menu options', () => {
        cy.get('.hotels').should('be.visible');
        cy.get('.guides').should('be.visible');
        cy.get('.js-list-tours').should('be.visible');
        cy.get('.attraction-link').should('be.visible');
    });
    it('Verify click on Hotels navigates to correct page', () => {
        cy.get('.hotels').click();
    })
    it('Verify click on Guides navigates to correct page', () => {
        cy.get('.guides').click();

    })
    it('Verify click on Tours navigates to correct page', () => {
        cy.get('.js-list-tours').click();
    })
    it('Verify click on Things to do navigates to correct page', () => {
        cy.get('.attraction-link').click();
    })
    it('Verify click on Login opens sign in page', () => {
        cy.get('.nav-access a[href="/en-US/Account/Login"]').click({ force: true });
        cy.get('#Email').should('be.visible');
        cy.get('#Password').should('be.visible');
        cy.get('.justify-content-between > .btn').should('be.visible');
    });
    it('Verify click on Signup opens registration page', () => {
        cy.get('.nav-access a[href="/en-US/Account/Register"]').click({ force: true });
        cy.get('#Email').should('be.visible');
        cy.get('#FirstName').should('be.visible');
        cy.get('#LastName').should('be.visible');
        cy.get('#DisplayName').should('be.visible');
        cy.get('#Phone').should('be.visible');
        cy.get('input[name="DateOfBirth"]').should('be.visible');
        cy.get('#Address_CountryId').should('be.visible');
        cy.get('#Address_CityId').should('be.visible');
        cy.get('#Password').should('be.visible');
        cy.get('#ConfirmPassword').should('be.visible');
        cy.get('button[name="submit"]').should('be.visible');

    });
})