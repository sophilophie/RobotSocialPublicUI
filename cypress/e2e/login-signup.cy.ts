describe('Login and Signup (e2e)', () => {
  beforeEach(() => cy.visit('localhost:4200'));

  context('login', () => {
    it("should show warning if credentials aren't input", () => {
      cy.get('.submit-button').click();
      cy.get('.snackbar-warn').should('contain.text', 'Please enter your credentials!');
      cy.get('.username-input').type('e2eUserName');
      cy.get('.submit-button').click();
      cy.get('.snackbar-warn').should('contain.text', 'Please enter your credentials!');
      cy.get('.username-input').focus();
      cy.get('.password-input').type('password', {force: true});
      cy.get('.submit-button').click();
      cy.get('.snackbar-warn').should('contain.text', 'Please enter your credentials!');
    });

    it('should login on proper credentials', () => {
      cy.intercept('http://localhost:3000/auth/login', {fixture: 'login-fixture.json'});
      cy.get('.username-input').type('e2eUserName');
      cy.get('.password-input').type('password', {force: true});
      cy.get('.submit-button').click();
      cy.get('.snackbar-success').should('contain.text', 'Login Successful!');
    });
  });

  context('signup', () => {
    beforeEach(() => cy.visit('localhost:4200/sign-up'));
    it('should show error if fields are empty', () => {
      cy.get('rspui-signup').should('be.visible');
      cy.get('.first-name-input').focus();
      cy.get('.last-name-input').focus();
      cy.get('mat-error').should('contain.text', 'First name is required');
      cy.get('.email-input').focus();
      cy.get('mat-error').should('contain.text', 'Last name is required');
      cy.get('.username-input').focus();
      cy.get('mat-error').should('contain.text', 'Email is required');
      cy.get('.password-input').focus();
      cy.get('mat-error').should('contain.text', 'Username is required');
      cy.get('.confirm-password-input').focus();
      cy.get('mat-error').should('contain.text', 'Password is required');
    });

    it('should validate username length', () => {
      cy.get('.username-input').type('a');
      cy.get('.password-input').focus();
      cy.get('mat-error').should('contain.text', 'Username must be between 8 and 32 characters');
      cy.visit('localhost:4200/sign-up');
      cy.get('.username-input').type('somethingSoMuchLongerThan32CharactersInFactItIsQuiteLargeOMG');
      cy.get('.password-input').focus();
      cy.get('mat-error').should('contain.text', 'Username must be between 8 and 32 characters');
    });

    it('should validate password length', () => {
      cy.get('.password-input').type('a', {force: true});
      cy.get('.confirm-password-input').focus();
      cy.get('mat-error').should('contain.text', 'Password must be between 8 and 32 characters');
      cy.visit('localhost:4200/sign-up');
      cy.get('.password-input').type('somethingSoMuchLongerThan32CharactersInFactItIsQuiteLargeOMG', {force: true});
      cy.get('.confirm-password-input').focus();
      cy.get('mat-error').should('contain.text', 'Password must be between 8 and 32 characters');
    });

    it('should validate email', () => {
      cy.get('.email-input').type('abc');
      cy.get('.username-input').focus();
      cy.get('mat-error').should('contain.text', 'Please enter a valid email address');
      cy.get('.email-input').type('@def.co');
      cy.get('mat-error').should('not.contain.text', 'Please enter a valid email address');
    });

    it('should match passwords', () => {
      cy.get('.password-input').type('password', {force: true});
      cy.get('.confirm-password-input').type('wrongPassword', {force: true});
      cy.get('.username-input').focus();
      cy.get('mat-error').should('contain.text', 'Passwords must match');
      cy.visit('localhost:4200/sign-up');
      cy.get('.password-input').type('password', {force: true});
      cy.get('.confirm-password-input').type('password', {force: true});
      cy.get('.username-input').focus();
      cy.get('mat-error').should('not.exist');
    });

    it('should show warning if invalid form is submitted', () => {
      cy.get('.username-input').type('someValidUsername');
      cy.get('.password-input').type('someValidPassword', {force: true});
      cy.get('.submit-button').click();
      cy.get('.snackbar-warn').should('contain.text', 'Please fix any errors to continue signing up!');
    });

    it('should log in and sign up if everything is correct', () => {
      cy.intercept('http://localhost:3000/users', {fixture: 'login-fixture.json'});
      cy.get('.first-name-input').type('e2e');
      cy.get('.last-name-input').type('Test');
      cy.get('.username-input').type('e2eUserName');
      cy.get('.email-input').type('e2euser@test.com');
      cy.get('.password-input').type('password', {force: true});
      cy.get('.confirm-password-input').type('password', {force: true});
      cy.get('.submit-button').click();
      cy.get('h1').should('contain.text', "What's on your mind, e2e?");
    });
  });
});
