describe('Friends (e2e)', () => {
  beforeEach(() => {
    window.localStorage.setItem('access_token', 'TEST_TOKEN');
    cy.intercept('http://localhost:3000/auth/refresh', {fixture: 'login-fixture.json'}).as('implicitLogin');
    cy.intercept('http://localhost:3000/posts/feed/1', {fixture: 'feed-fixture.json'}).as('getUserFeed');
    cy.intercept('http://localhost:3000/posts/1', {fixture: 'posts-fixture.json'}).as('getUserPosts');
    cy.intercept('http://localhost:3000/users/friendship', {fixture: 'friendship-fixture.json'}).as('postFriendship');
    cy.visit('http://localhost:4200/friends');
  });

  it('should show current friends', () => {
    cy.get('mat-card-content').should('contain.text', 'Friends since');
  });

  it('should show a badge for received friend requests', () => {
    cy.get('.mat-badge-content').should('have.length', 2);
  });

  it('should be able to accept friend requests', () => {
    cy.get('.mat-mdc-tab').eq(1).click();
    cy.get('.mat-mdc-icon-button').click();
    cy.get('.mat-mdc-tab').eq(0).click();
    cy.get('mat-card').should('have.length', 2);
  });
});
