describe('Posts (e2e)', () => {
  beforeEach(() => {
    window.localStorage.setItem('access_token', 'TEST_TOKEN');
    cy.intercept('http://localhost:3000/auth/refresh', {fixture: 'login-fixture.json'}).as('implicitLogin');
    cy.intercept('http://localhost:3000/posts/feed/0', {fixture: 'feed-fixture.json'}).as('getUserFeed');
    cy.intercept('http://localhost:3000/posts/0', {fixture: 'posts-fixture.json'}).as('getUserPosts');
    cy.visit('localhost:4200');
  });

  it('should show posts on login', () => {
    cy.get('.rspui-feed-item').should('have.length', 4);
  });

  it('should allow posting new posts', () => {
    cy.get('.rspui-post-input textarea').type('This is a test');
    cy.intercept('POST', 'http://localhost:3000/posts', {statusCode: 201});
    cy.intercept('http://localhost:3000/posts/feed/0', {fixture: 'feed-fixture-post.json'});
    cy.intercept('http://localhost:3000/posts/0', {fixture: 'posts-fixture.json'});
    cy.get('.rspui-post-input button').click();
    cy.get('.rspui-feed-item').should('have.length', 5);
  });

  it('should show user posts on profile', () => {
    cy.visit('localhost:4200/profile');
    cy.get('.rspui-header-container h1').should('contain', 'e2e user');
    cy.get('.rspui-post-header').should('have.text', 'Your Posts:');
    cy.get('mat-card.rspui-post-item').should('have.length', 4);
  });

  it('should show profile and be able to edit profile', () => {
    cy.visit('localhost:4200/profile');
    cy.get('.rspui-profile-data').should('contain', 'e2euser@test.com');
    cy.get('.rspui-profile-data').should('contain', 'e2eUserName');
    cy.get('.rspui-profile-data button').click();
    cy.get('rspui-edit-profile-dialog').should('be.visible');
    cy.get('input.first-name-input').clear().type('EndTwoEnd');
    cy.intercept('PUT', 'http://localhost:3000/users/0', {fixture: 'edited-user-fixture.json'});
    cy.get('button.rspui-submit-button').click();
    cy.get('.rspui-header-container h1').should('contain', 'EndTwoEnd user');
  });
});
