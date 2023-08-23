describe('Posts (e2e)', () => {
  beforeEach(() => {
    window.localStorage.setItem('access_token', 'TEST_TOKEN');
    cy.intercept('http://localhost:3000/auth/refresh', {fixture: 'login-fixture.json'});
    cy.intercept('http://localhost:3000/posts/feed/0', {fixture: 'feed-fixture.json'});
    cy.visit('localhost:4200');
  });

  it('should show posts on login', () => {
    cy.get('.rspui-feed-item').should('have.length', 4);
  });

  it('should allow posting new posts', () => {
    cy.get('.rspui-post-input textarea').type('This is a test');
    cy.intercept('POST', 'http://localhost:3000/posts', {statusCode: 201});
    cy.intercept('http://localhost:3000/posts/feed/0', {fixture: 'feed-fixture-post.json'});
    cy.get('.rspui-post-input button').click();
    cy.get('.rspui-feed-item').should('have.length', 5);
  });
});
