describe('My First Test', function() {
  it('Does not do much!', function() {
    expect(true).to.equal(true);
  });

  it('should be able to visit the home page', () => {
    cy.visit('https://test-armadilo-arms.herokuapp.com');
    const values = cy.get('.sideBar__headerContainer');
    console.log(values);
  });
});
