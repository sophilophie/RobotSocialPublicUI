describe('search (e2e)', () => {
  beforeEach(() => {
    window.localStorage.setItem('access_token', 'TEST_TOKEN');
    cy.intercept('http://localhost:3000/auth/refresh', {fixture: 'login-fixture.json'}).as('implicitLogin');
    cy.intercept('http://localhost:3000/posts/feed/uuid1', {fixture: 'feed-fixture.json'}).as('getUserFeed');
    cy.intercept('http://localhost:3000/posts/uuid1', {fixture: 'posts-fixture.json'}).as('getUserPosts');
    cy.intercept('http://localhost:3000/users/search?searchTerm=Test', {fixture: 'search-fixture.json'}).as(
      'getSearch',
    );
    cy.visit('http://localhost:4200/search');
    cy.get('textarea').type('Test');
    cy.get('mat-form-field button').click();
  });

  it('should be able to search for users', () => {
    cy.get('mat-card').should('have.length', 5);
    cy.get('mat-card').first().should('contain.text', 'Friends since');
  });

  it('should be able to send friend request', () => {
    cy.intercept('http://localhost:3000/users/friend-request', {fixture: 'friend-request-fixture.json'}).as(
      'sendFriendRequest',
    );
    cy.get('.rspui-add-friend').eq(0).click();
    cy.wait('@sendFriendRequest');
    cy.get('mat-card-content').eq(1).should('contain.text', 'Sent friend request');
  });
});
