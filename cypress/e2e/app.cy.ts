describe('Root (e2e)', () => {
  beforeEach(() => {
    localStorage.setItem('access_token', 'TOKEN');
    cy.intercept('http://localhost:3000/auth/refresh', {fixture: 'login-fixture.json'}).as('implicitLogin');
    cy.intercept('http://localhost:3000/posts/feed/uuid1', {fixture: 'feed-fixture.json'}).as('getUserFeed');
    cy.intercept('http://localhost:3000/posts/uuid1', {fixture: 'posts-fixture.json'}).as('getUserPosts');
    cy.visit('localhost:4200');
  });

  it('should render rspui-root', () => {
    cy.get('rspui-root').should('be.visible');
  });

  it('should login if token present in localStorage', () => {
    cy.wait('@implicitLogin');
    cy.wait('@getUserFeed');
    cy.wait('@getUserPosts');
    cy.get('h1').should('contain', "What's on your mind,");
    cy.get('.snackbar-success').should('contain.text', 'Welcome Back!');
  });

  it('should logout on logout button click', () => {
    cy.wait('@implicitLogin');
    cy.wait('@getUserFeed');
    cy.wait('@getUserPosts');
    cy.get('h1').should('contain', "What's on your mind,");
    cy.get('.logout-button').click({force: true});
    cy.get('rspui-login').should('be.visible');
    cy.get('.snackbar-success').should('contain.text', 'Successfully logged out!');
  });
});
