describe('Hotels Page - Search functionality tests', () => {
    const jerusalemOption = 'select[name="Filter.DestinationId"] option[value="8"]';
    const londonOption = 'select[name="Filter.DestinationId"] option[value="31"]';
    const newYorkOption = 'select[name="Filter.DestinationId"] option[value="51"]';
    const dropdown = 'select[name="Filter.DestinationId"]';
    const checkInDate = "2025-10-10";
    const checkOutDate = "2025-10-17";
    const cities = [
        { value: '8', name: 'Jerusalem' },
        { value: '31', name: 'London' },
        { value: '51', name: 'New York' }
    ];


    beforeEach(() => {
        cy.visit('https://www.accesstravel.com/en-US/Hotel/List');
    });
    it('Dropdown contains cities and returns results after search', () => {

        cy.get(jerusalemOption).should('contain', 'Jerusalem');
        cy.get(londonOption).should('contain', 'London');
        cy.get(newYorkOption).should('contain', 'New York');
        cities.forEach(({ value, name }) => {
            cy.get(dropdown).select(value);
            cy.get('input[name="Filter.CheckIn"]').clear().type("2025-10-10").invoke('val').should('eq', checkInDate);
            cy.get('input[name="Filter.CheckOut" ]').clear().type("2025-10-17").invoke('val').should('eq', checkOutDate);
            cy.get('input[name="Filter.AdultNum"]').clear().type('1').should('have.value', '1');
            cy.get('button[type="submit"]').click();
        })
    })
});
it('Selecting 1 child shows age input and allows successful search', () => {
    const dropdown = 'select[name="Filter.DestinationId"]';
    const checkInDate = "2025-10-10";
    const checkOutDate = "2025-10-17";

    cy.visit('https://www.accesstravel.com/en-US/Hotel/List');
    cy.get('#Filter_ChildrenNum').should('be.visible');
    cy.get('#Filter_ChildrenNum').clear().type('1', { force: true }).should('have.value', '1');
    cy.get('.hotels-wrap').click();
    cy.get('[name="Filter.ChildrensAge[0]"]').clear().type('5', { force: true });
    cy.get(dropdown).select('8');
    cy.get('input[name="Filter.CheckIn"]').clear().type(checkInDate);
    cy.get('input[name="Filter.CheckOut"]').clear().type(checkOutDate);
    cy.get('input[name="Filter.AdultNum"]').clear().type('1');
    cy.get('button[type="submit"]').click();
});
it('Check-out before Check-in triggers an error', () => {
    cy.visit('https://www.accesstravel.com/en-US/Hotel/List');
    cy.get('select[name="Filter.DestinationId"]').select('8');
    cy.get('input[name="Filter.CheckIn"]').clear().type('2025-10-17');
    cy.get('input[name="Filter.CheckOut"]').clear().type('2025-10-10');
    cy.get('input[name="Filter.AdultNum"]').clear().type('1');
    cy.get('button[type="submit"]').click();
    cy.get('span[data-valmsg-for="Filter.CheckOut"]').should('be.visible').and('contain.text', 'Invalid Check out Date');
});
it('Invalid number of adults will trigger an error', () => {
    cy.visit('https://www.accesstravel.com/en-US/Hotel/List');
    cy.get('select[name="Filter.DestinationId"]').select('8');
    cy.get('input[name="Filter.CheckIn"]').clear().type('2025-10-10');
    cy.get('input[name="Filter.CheckOut"]').clear().type('2025-10-17');
    cy.get('input[name="Filter.AdultNum"]').clear().type('0');
    cy.get('button[type="submit"]').click();
    cy.get('span[data-valmsg-for="Filter.AdultNum"]').should('be.visible').and('contain.text', 'Invalid value');
});
it('Invalid number of children will trigger an error', () => {
    cy.visit('https://www.accesstravel.com/en-US/Hotel/List');
    cy.get('select[name="Filter.DestinationId"]').select('8');
    cy.get('input[name="Filter.CheckIn"]').clear().type('2025-10-10');
    cy.get('input[name="Filter.CheckOut"]').clear().type('2025-10-17');
    cy.get('input[name="Filter.AdultNum"]').clear().type('1');
    cy.get('#Filter_ChildrenNum').clear().type('-1');
    cy.get('button[type="submit"]').click();
    cy.get('span[data-valmsg-for="Filter.ChildrenNum"]').should('be.visible').and('contain.text', 'Invalid number');
});



