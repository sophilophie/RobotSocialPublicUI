describe('Profile (e2e)', () => {
  beforeEach(() => {
    window.localStorage.setItem('access_token', 'TEST_TOKEN');
    cy.intercept('http://localhost:3000/auth/refresh', {fixture: 'login-fixture.json'}).as('implicitLogin');
    cy.intercept('http://localhost:3000/posts/feed/uuid1', {fixture: 'feed-fixture.json'}).as('getUserFeed');
    cy.intercept('http://localhost:3000/posts/uuid1', {fixture: 'posts-fixture.json'}).as('getUserPosts');
    cy.visit('localhost:4200/profile');
  });

  it('should show user posts on profile', () => {
    cy.get('.rspui-header-container h1').should('contain', 'e2e user');
    cy.get('.rspui-post-header').should('have.text', 'Your Posts:');
    cy.get('mat-card.rspui-post-item').should('have.length', 4);
  });

  it('should show profile and be able to edit profile', () => {
    cy.get('.rspui-profile-data').should('contain', 'e2euser@test.com');
    cy.get('.rspui-profile-data').should('contain', 'e2eUserName');
    cy.get('.rspui-profile-data button').click();
    cy.get('rspui-edit-profile-dialog').should('be.visible');
    cy.get('input.first-name-input').clear().type('EndTwoEnd');
    cy.intercept('PUT', 'http://localhost:3000/users/uuid1', {fixture: 'edited-user-fixture.json'});
    cy.get('button.rspui-submit-button').click();
    cy.get('.rspui-header-container h1').should('contain', 'EndTwoEnd user');
  });

  it('should validate username length', () => {
    cy.get('.rspui-profile-data button').click();
    cy.get('.username-input').focus().clear().type('a');
    cy.get('.first-name-input').focus();
    cy.get('mat-error').should('contain.text', 'Username must be between 8 and 32 characters');
    cy.get('.username-input').type('somethingSoMuchLongerThan32CharactersInFactItIsQuiteLargeOMG');
    cy.get('.first-name-input').focus();
    cy.get('mat-error').should('contain.text', 'Username must be between 8 and 32 characters');
  });

  it('should validate email', () => {
    cy.get('.rspui-profile-data button').click();
    cy.get('.email-input').focus().clear().type('abc');
    cy.get('.username-input').focus();
    cy.get('mat-error').should('contain.text', 'Please enter a valid email address');
    cy.get('.email-input').type('@def.co');
    cy.get('mat-error').should('not.exist');
  });

  it('should show warning if invalid fields are present and submit is attempted', () => {
    cy.get('.rspui-profile-data button').click();
    cy.get('.username-input').clear().type('a');
    cy.get('.rspui-submit-button').click();
    cy.get('.snackbar-warn').should('contain.text', 'Cannot update user! Fields have errors.');
  });
});
