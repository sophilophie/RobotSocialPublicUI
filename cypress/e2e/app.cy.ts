describe('Root (e2e)', () => {
  before(() => {
    cy.visit('localhost:4200');
  });

  it('should render rspui-root', () => {
    cy.get('rspui-root').should('be.visible');
  });

  it('should login if token present in localStorage', () => {
    localStorage.setItem('access_token', 'TOKEN');
    cy.intercept('http://localhost:3000/auth/refresh', {fixture: 'login-fixture.json'}).as('implicitLogin');
    cy.visit('localhost:4200');
    cy.wait('@implicitLogin');
    cy.get('h1').should('contain', 'Welcome');
    cy.get('.snackbar-success').should('contain.text', 'Welcome Back!');
  });

  it('should logout on logout button click', () => {
    localStorage.setItem('access_token', 'TOKEN');
    cy.intercept('http://localhost:3000/auth/refresh', {fixture: 'login-fixture.json'}).as('implicitLogin');
    cy.visit('localhost:4200');
    cy.wait('@implicitLogin');
    cy.get('h1').should('contain', 'Welcome');
    cy.get('.logout-button').click({force: true});
    cy.get('rspui-login').should('be.visible');
    cy.get('.snackbar-success').should('contain.text', 'Successfully logged out!');
  });
});
