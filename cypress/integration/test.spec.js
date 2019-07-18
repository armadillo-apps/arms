describe('My First Test', function() {
  it('Does not do much!', function() {
    expect(true).to.equal(true);
  });

  it('should be able to see the sidebars correctly', () => {
    cy.visit('https://test-armadilo-arms.herokuapp.com');
    cy.contains('APARTMENT');
    cy.contains('OCCUPANTS');
    cy.contains('NEW APARTMENT');
    cy.contains('NEW OCCUPANT');
  })

  it('should be able to visit the apartment page ', () => {
    
  });
});
