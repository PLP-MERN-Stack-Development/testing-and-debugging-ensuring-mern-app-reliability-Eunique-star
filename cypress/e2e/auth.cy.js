// cypress/e2e/auth.cy.js

describe('Authentication Flow', () => {
  beforeEach(() => {
    // Reset database or ensure clean state if possible
    // For this assignment, we assume the server is running locally
    cy.visit('http://localhost:5173'); // Your Vite frontend URL
  });

  it('should allow a user to register and then login', () => {
    // 1. Go to Register Page
    cy.contains('Register').click();
    cy.url().should('include', '/register');

    // 2. Fill out Registration Form
    const testUser = {
      username: 'CypressUser',
      email: `cypress${Date.now()}@test.com`, // Unique email
      password: 'password123'
    };

    cy.get('input[type="text"]').first().type(testUser.username); // Username
    cy.get('input[type="email"]').type(testUser.email);
    cy.get('input[type="password"]').type(testUser.password);
    
    // 3. Submit and check redirect
    cy.get('button[type="submit"]').click();
    
    // Assuming success redirects to Login
    cy.url().should('include', '/login');

    // 4. Login with new account
    cy.get('input[type="email"]').type(testUser.email);
    cy.get('input[type="password"]').type(testUser.password);
    cy.get('button[type="submit"]').click();

    // 5. Verify we are logged in (Check for "Logout" button or "Home")
    cy.url().should('eq', 'http://localhost:5173/');
    cy.contains('Logout').should('be.visible');
  });
});